########################################################
#
#Azure AD サインイン ログ取得スクリプト
#
#Lastupdate:2020/1/6
#詳細手順は https://github.com/jpazureid/blog/blob/microsoft-graph-api-signin-activity-reports-v2/articles/azure-active-directory/microsoft-graph-api-signin-activity-reports-v2.md を参照ください。
########################################################

## 環境に合わせ編集ください ##
$outfile = ".\outfile.csv" # ファイルエクスポート先パスです。任意の値を入力ください。
$daysago = "{0:s}" -f (get-date).AddDays(-7) + "Z"  # 例えば過去 30 日のデータを取得したい場合には $daysago = "{0:s}" -f (get-date).AddDays(-30) + "Z" とします。
## ここまで ##

# リソース・アクセス先 URL 設定
$resource = "https://graph.microsoft.com"
$authuri = "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=" + $resource

## 以下はユーザー割り当てマネージド ID 利用時　##
#16 行目「$authuri = "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=" + $resource」をコメントアウトし、以下の 20/21 行目のコメントアウトを削除ください。
#$usermanagedid = "<ユーザー割り当てマネージド ID のオブジェクト ID>"
#$authuri = "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=" + $resource　+ "`&client_id=" + $usermanagedid
###ここまで##

## トークン取得
$authContext = (Invoke-WebRequest -Uri $authuri -Method GET -Headers @{Metadata="true"})
$content = $authContext.Content | ConvertFrom-Json
$Token = $content.access_token

$data = @()

## アクセス先 URL 、必要に応じてフィルター条件を追記します。
## フィルター例 "$resource/beta/auditLogs/signIns?api-version=beta&`$filter=((createdDateTime gt $daysago) and (startswith(deviceDetail/operatingSystem, 'Ios') or startswith(deviceDetail/operatingSystem, 'Android')))"
$url = "$resource/beta/auditLogs/signIns?api-version=beta&`$filter=(createdDateTime gt $daysago)"


if ($null -ne $Token) {
    Do {
        $myReport = Invoke-WebRequest -UseBasicParsing -Headers @{ Authorization ="Bearer $Token"} -Uri $url
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
            correlationId,
            conditionalAccessStatus,
 
            @{Name = 'status.errorCode'; Expression = {$_.status.errorCode}},
            @{Name = 'status.failureReason'; Expression = {$_.status.failureReason}},
            @{Name = 'status.additionalDetails'; Expression = {$_.status.additionalDetails}},
 
            @{Name = 'deviceDetail.deviceId'; Expression = {$_.deviceDetail.deviceId}},
            @{Name = 'deviceDetail.displayName'; Expression = {$_.deviceDetail.displayName}},
            @{Name = 'deviceDetail.operatingSystem'; Expression = {$_.deviceDetail.operatingSystem}},
            @{Name = 'deviceDetail.browser'; Expression = {$_.deviceDetail.browser}},

            @{Name = 'location.city'; Expression = {$_.location.city}},
            @{Name = 'location.state'; Expression = {$_.location.state}}
 
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
            #
            #Get url from next link
            #
        }
        $url = ($myReport.Content | ConvertFrom-Json).'@odata.nextLink'
    }while ($url -ne $null)
}
else {
    Write-Host "ERROR: No Access Token"
}

$data | Sort-Object -Property createdDateTime  | Export-Csv $outfile -encoding "utf8" -NoTypeInformation