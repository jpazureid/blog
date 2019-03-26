---
title: Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートを CSV ファイルで取得する PowerShell スクリプト
date: 2018-08-09
tags:
  - Azure AD
  - graph api
  - signin log
---

# Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートを CSV ファイルで取得する PowerShell スクリプト

こんにちは Azure & Identity サポート チームの 姚 ヨウです。

前回、Azure AD のサインイン アクティビティ レポートと監査アクティビティ レポートを Azure AD Graph API を経緯し、PowerShell で csv 形式で取得できるスクリプトを紹介しました。

既にご存知の方もいらっしゃると思いますが、マイクロソフトとしては、Azure AD Graph API ではなく、 Microsoft Graph API の利用を推進しています。
 
今回は、PowerShell スクリプトで Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートを csv 形式で取得する方法を紹介します。

今回のスクリプトは前回紹介しましたスクリプトと比較して以下の利点があります。

- サインイン アクティビティ レポートの内容をより詳細に csv ファイルに格納します
- アプリケーションのキーではなく証明書を利用することでセキュリティを高めています (※)

※ セキュリティ観点で 平文のキーではなく証明書を用いたトークン取得を推奨しています。
 
以下に一連の手順を大まかに 3 つに分けて解説します。

事前に、`C:\SignInReport` フォルダーなど作業用のフォルダーを作成し、以下の手順にお進みください。
 
### **1. 認証に使用する証明書の準備**
トークン取得に証明書を用います。

これは、これまでの平文のキーを用いる方法よりもセキュリティ的に強固であり、推奨している方法です。以下の PowerShell スクリプトは、自己署名証明書を生成し、ユーザーの証明書ストア (個人) に格納します。

さらに、公開鍵を含む証明書 (SelfSignedCert.cer ファイル) をカレント  ディレクトリに出力します。


エディターを開き、下記内容をコピーして貼り付けください。そのファイルを `CreaterCert.ps1` として `C:\SignInReport` フォルダー配下に保存します。

保存したら、このスクリプトを実行ください。

```powershell
##
## Create self signed certificate
##
$cert = New-SelfSignedCertificate -Subject "CN=SelfSignedCert" -CertStoreLocation "Cert:\CurrentUser\My"  -KeyExportPolicy Exportable -KeySpec Signature
$cert

##
## Export new self signed certificate as .cer file
##
$cerfile = ".\SelfSignedCert.cer"
Export-Certificate -Cert $cert -FilePath $cerfile
```

### **2. 処理に必要なライブラリを nuget で取得するスクリプトの準備と実行**

証明書を用いたトークン取得処理はライブラリを用いて行います。

処理に必要なライブラリは nuget で取得します。

テキスト エディターを開き、下記内容をコピーして貼り付けください。

そのファイルを GetModuleByNuget.ps1 として C:\SignInReport フォルダー配下に保存および実行ください。本スクリプトを実行すると、C:\SignInReport 配下に Tools というフォルダーが作成され、Microsoft.IdentityModel.Clients.ActiveDirectory.dll などのファイルが保存されます。

```powershell
##
## Download NuGet.exe
##
$sourceNugetExe = "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe"
$targetNugetExe = ".\nuget.exe"
Remove-Item .\Tools -Force -Recurse -ErrorAction Ignore
Invoke-WebRequest $sourceNugetExe -OutFile $targetNugetExe
Set-Alias nuget $targetNugetExe -Scope Global -Verbose

##
## Download Microsoft.IdentityModel.Clients.ActiveDirectory.dll
##
./nuget install Microsoft.IdentityModel.Clients.ActiveDirectory -O .\Tools
md .\Tools\Microsoft.IdentityModel.Clients.ActiveDirectory
$prtFolder = Get-ChildItem ./Tools | Where-Object {$_.Name -match 'Microsoft.IdentityModel.Clients.ActiveDirectory.'}
move .\Tools\$prtFolder\lib\net45\*.* .\Tools\Microsoft.IdentityModel.Clients.ActiveDirectory
Remove-Item .\Tools\$prtFolder -Force -Recurse

##
## Remove NuGet.exe
##
Remove-Item nuget.exe
```

### **3. サインイン ログを取得するスクリプトの準備**

1 および 2 の手順を実行し、証明書および実行に必要なライブラリの準備が整いましたら、以下の手順で、アプリケーションおよびスクリプトを準備します。

まず、以下の公開情報の手順に従って、アプリケーションを登録します。
 
- Azure AD Reporting API にアクセスするための前提条件
  https://docs.microsoft.com/ja-jp/azure/active-directory/active-directory-reporting-api-prerequisites-azure-portal


今回はアプリケーションのクライアント シークレットとして証明書を利用します。

そのため、 上記の公開情報では "アプリケーションのクライアント シークレットを取得する" の手順において 5 でキーを生成していますが、その代わりに [公開キーのアップロード] を実行します。

ここで、このブログ記事の "1. 認証に使用する証明書の準備" の手順を実行した結果作成される SelfSignedCert.cer を指定してアップロード後、 [保存] をクリックします。
 
アプリケーションの登録、証明書の登録が完了しましたら、テキスト エディタを開き、次の中身をコピーして貼り付け、環境に合わせて赤字部分の内容を設定します (環境に合わせた設定は前提条件に関する公開情報の "構成設定を収集する" に情報があります)。

設定が完了しましたら、 `GetSignInLogs.ps1` ファイルとして` C:\SignInReport` 配下に保存し、実行します。

これによりサインイン アクティビティ レポートを csv ファイルとして取得できます。

```powershell
Add-Type -Path ".\Tools\Microsoft.IdentityModel.Clients.ActiveDirectory\Microsoft.IdentityModel.Clients.ActiveDirectory.dll"

#
# Authorization & resource Url
#
$tenantId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
$resource = "https://graph.microsoft.com" 
$clientID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
$thumprint = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$outfile = "output.csv"
$data = @()

# tenantID は [Azure Active Directory] - [プロパティ] よりディレクトリ ID を取得します。
# clientID は "Azure AD Reporting API にアクセスするための前提条件" の "アプリケーションのクライアント ID を取得する" の手順で取得します。
# thumbprint は公開キーのアップロードを実行後の "キー" のページで "公開鍵" にサムプリントとして表示されている情報です。

#
# Authorization & resource Url
#
$authUrl = "https://login.microsoftonline.com/$tenantId/" 

#
# Get certificate
#
$cert = Get-ChildItem -path cert:\CurrentUser\My | Where-Object {$_.Thumbprint -eq $thumprint}

#
# Create AuthenticationContext for acquiring token 
# 
$authContext = New-Object Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext $authUrl, $false

#
# Create credential for client application 
#
$clientCred = New-Object Microsoft.IdentityModel.Clients.ActiveDirectory.ClientAssertionCertificate $clientID, $cert

#
# Acquire the authentication result
#
$authResult = $authContext.AcquireTokenAsync($resource, $clientCred).Result 

if ($null -ne $authResult.AccessToken) {
    #
    # Compose the access token type and access token for authorization header
    #
    $headerParams = @{'Authorization' = "$($authResult.AccessTokenType) $($authResult.AccessToken)"}
    $url = "$resource/beta/auditLogs/signIns"
    
    Write-Output "Fetching data using Uri: $url"
 
    Do {
        $myReport = (Invoke-WebRequest -UseBasicParsing -Headers $headerParams -Uri $url)
        $myReportValue = ($myReport.Content | ConvertFrom-Json).value
        $myReportVaultCount = $myReportValue.Count
 
        for ($j = 0; $j -lt $myReportVaultCount; $j++) {
            $eachEvent = @{}
 
            $thisEvent = $myReportValue[$j]
            $canumbers = $thisEvent.conditionalAccessPolicies.Count
 
            $eachEvent = $thisEvent |
            select id,
            createdDateTime,
            userDisplayName,
            userPrincipalName,
            userId,
            appId,
            appDisplayName,
            ipAddress,
            clientAppUsed,
            mfaDetail,
            correlationId,
            conditionalAccessStatus,
            isRisky,
            riskLevel,
 
            @{Name = 'status.errorCode'; Expression = {$_.status.errorCode}},
            @{Name = 'status.failureReason'; Expression = {$_.status.failureReason}},
            @{Name = 'status.additionalDetails'; Expression = {$_.status.additionalDetails}},
 
            @{Name = 'deviceDetail.deviceId'; Expression = {$_.deviceDetail.deviceId}},
            @{Name = 'deviceDetail.displayName'; Expression = {$_.deviceDetail.displayName}},
            @{Name = 'deviceDetail.operatingSystem'; Expression = {$_.deviceDetail.operatingSystem}},
            @{Name = 'deviceDetail.browser'; Expression = {$_.deviceDetail.browser}},
 
            @{Name = 'location.city'; Expression = {$_.location.city}},
            @{Name = 'location.state'; Expression = {$_.location.state}},
            @{Name = 'location.countryOrRegion'; Expression = {$_.location.countryOrRegion}},
            @{Name = 'location.geoCoordinates.altitude'; Expression = {$_.location.geoCoordinates.altitude}},
            @{Name = 'location.geoCoordinates.latitude'; Expression = {$_.location.geoCoordinates.latitude}},
            @{Name = 'location.geoCoordinates.longitude'; Expression = {$_.location.geoCoordinates.longitude}}
 
            for ($k = 0; $k -lt $canumbers; $k++) {
                $temp = $thisEvent.conditionalAccessPolicies[$k].id
                $eachEvent = $eachEvent | Add-Member @{"conditionalAccessPolicies.id$k" = $temp} -PassThru
 
                $temp = $thisEvent.conditionalAccessPolicies[$k].displayName
                $eachEvent = $eachEvent | Add-Member @{"conditionalAccessPolicies.displayName$k" = $temp} -PassThru
 
                $temp = $thisEvent.conditionalAccessPolicies[$k].enforcedGrantControls
                $eachEvent = $eachEvent | Add-Member @{"conditionalAccessPolicies.enforcedGrantControls$k" = $temp} -PassThru
 
                $temp = $thisEvent.conditionalAccessPolicies[$k].enforcedSessionControls
                $eachEvent = $eachEvent | Add-Member @{"conditionalAccessPolicies.enforcedSessionControls$k" = $temp} -PassThru
 
                $temp = $thisEvent.conditionalAccessPolicies[$k].result
                $eachEvent = $eachEvent | Add-Member @{"conditionalAccessPolicies.result$k" = $temp} -PassThru
            }
            $data += $eachEvent
        }
        
        #
        #Get url from next link
        #
        $url = ($myReport.Content | ConvertFrom-Json).'@odata.nextLink'
    }while ($url -ne $null)
}
else {
    Write-Host "ERROR: No Access Token"
}
 
$data | Sort -Property createdDateTime  | Export-Csv $outfile -encoding "utf8" -NoTypeInformation
```

このスクリプトで取得できるサインイン アクティビティ レポートをさらに詳細にフィルターしたい場合、以下の公開情報を参照いただければと思います。

- signIn resource type
  https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/signin
 
次回は監査アクティビティ レポートの取得方法を紹介いたします。

このブログの情報がお客様の検証や運用のお役に少しでもお役に立てばと思います。
 
製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。

※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。