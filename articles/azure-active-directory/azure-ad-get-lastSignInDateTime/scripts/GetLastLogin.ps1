Param(
    [Parameter(ValueFromPipeline = $true,mandatory=$true)][ValidateSet("Cert", "Key")][String]$authMethod,
    [Parameter(ValueFromPipeline = $true,mandatory=$true)][String]$clientSecretOrThumbprint
)

 

# Authorization & resource Url
$tenantId = ""  
$resource = "https://graph.microsoft.com" 
$clientID = ""
$outfile = "C:\SignInReport\lastLogin1.csv"
$authUrl = "https://login.microsoftonline.com/$tenantId/" 
$data = @()

 

switch ($authMethod)
{
    "cert" {
        Add-Type -Path ".\Tools\Microsoft.IdentityModel.Clients.ActiveDirectory\Microsoft.IdentityModel.Clients.ActiveDirectory.dll"

        # Get certificate
        $cert = Get-ChildItem -path cert:\CurrentUser\My | Where-Object {$_.Thumbprint -eq $clientSecretOrThumbprint}
    
        # Create AuthenticationContext for acquiring token  
        $authContext = New-Object Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext $authUrl, $false
    
        # Create credential for client application 
        $clientCred = New-Object Microsoft.IdentityModel.Clients.ActiveDirectory.ClientAssertionCertificate $clientID, $cert
    
        # Acquire the authentication result
        $authResult = $authContext.AcquireTokenAsync($resource, $clientCred).Result
        $accessTokenType = $authResult.AccessTokenType
        $accessToken = $authResult.AccessToken
    }
    "key" {
        $postParams = @{
            client_id     = $clientID; 
            client_secret = $clientSecretOrThumbprint;
            grant_type    = 'client_credentials';
            resource      = $resource
        }
        $authResult = (Invoke-WebRequest -Uri ($authUrl + "oauth2/token") -Method POST -Body $postParams) | ConvertFrom-Json
        $accessTokenType = $authResult.token_type
        $accessToken = $authResult.access_token
    }
}

 

if ($null -ne $accessToken) {
    #
    # Compose the access token type and access token for authorization header
    #
    $headerParams = @{'Authorization' = "$($accessTokenType) $($accessToken)"}
    $reqUrl = "$resource/beta/users/?`$select=userPrincipalName,signInActivity"

    do {
        #
        # Get data of all user's last sign-in activity events
        #
        $signInActivityJson = (Invoke-WebRequest -UseBasicParsing -Headers $headerParams -Uri $reqUrl).Content | ConvertFrom-Json
        $signInActivityJsonValue = $signInActivityJson.Value
        $numEvents = $signInActivityJsonValue.length

        #
        # Create title for the out put file
        #
        $data += "UserPrincipalName,Last sign-in event date in UTC,Cloud Application"
        #
        # Process data of each user's last sign-in activity event
        #
        for ($j = 0; $j -lt $numEvents; $j++) {

            #
            # Get user and event information
            #
            $userUPN = $signInActivityJsonValue.userPrincipalName[$j]
            $allSignInAct = $signInActivityJsonValue.signInActivity[$j]
            $lastRequestID = $allSignInAct.lastSignInRequestId
            $lastSignin = $allSignInAct.lastSignInDateTime
            #Write-Output "User number $j" "We have UPN is $userUPN"
            #Write-Output "We have Last is $lastSignin"
            #Write-Output "We have LastID is $lastRequestID"

            #
            # Check if event's request id. if id is null then it means the user never had a sctivity event.
            #
            if ($lastRequestID -ne $null)
            {
                $eventReqUrl = "$resource/v1.0/auditLogs/signIns/$lastRequestID"
                #Write-Output "we have eventReqUrl is $eventReqUrl"

                try
                {
                    $signInEventJasonRaw = Invoke-WebRequest -UseBasicParsing -Headers $headerParams -Uri $eventReqUrl
                }
                catch [System.Net.WebException]
                {
                    $requstStatusCode = $_.Exception.Response.StatusCode.value__
                }

                if ($requstStatusCode -eq 404)
                {
                    #Write-Output "This user does not have sign in activity event in last 30 days."
                    $appDisplayName = "This user does not have sign in activity event in last 30 days."
                    $data += $userUPN + "," + $lastSignin + "," + $appDisplayName
                }
                else 
                {
                    $signInEventJason = $signInEventJasonRaw.Content
                    #Write-Output "we have signInEventJason is $signInEventJason"

                    $signInEvent = ($signInEventJason | ConvertFrom-Json)
                    #Write-Output "we have signInEvent is $signInEvent"
                    
                    $appDisplayName = $signInEvent.appDisplayName
                    #Write-Output "we have appDisplayName is $appDisplayName"

                    $data += $userUPN + "," + $lastSignin + "," + $appDisplayName
                }
                $requstStatusCode = $null
            }
            else {
                #Write-Output "This user never had sign in activity event."
                $lastSignin = "This user never had sign in activity event."
                $appDisplayName = $null

                $data += $userUPN + "," + $lastSignin + "," + $appDisplayName
            }
        }
       
        $reqUrl = ($signInActivityJson.'@odata.nextLink') + ''

    }while ($reqUrl.IndexOf('https') -ne -1)

    $data | Out-File $outfile -encoding "utf8"
}
else {
    Write-Host "ERROR: No Access Token"
}


