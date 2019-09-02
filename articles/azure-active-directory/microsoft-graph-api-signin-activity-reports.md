---
title: Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートをファイルに出力する PowerShell スクリプト
date: 2019-05-23
tags:
  - Azure AD
  - graph api
  - signin log
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/08/09/microsoft-graph-api-signin-activity-reports/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートをファイルに出力する PowerShell スクリプト

> 2019/05/22: サインインアクティビティレポートを取得するための Graph API エンドポイントが beta から v1.0 に移動したため、サンプルコードの一部を変更しました。また、アプリ登録の手順も変更されたため併せて記載内容を変更しています。

こんにちは Azure & Identity サポート チームの 姚 ヨウ です。

前回、Azure AD のサインイン アクティビティ レポートと監査アクティビティ レポートを Azure AD Graph API を経緯し、PowerShell で JSON 形式で取得できるスクリプトを紹介しました。

既にご存知の方もいらっしゃると思いますが、マイクロソフトとしては、Azure AD Graph API ではなく、 Microsoft Graph API の利用を推進しています。今回は、PowerShell スクリプトで Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートを JSON 形式で取得する方法を紹介します。

今回のスクリプトは前回紹介しましたスクリプトと比較して以下の利点があります。

- サインイン アクティビティ レポートの内容をより詳細に JSON ファイルに格納します
- アプリケーションのキーではなく証明書を利用することでセキュリティを高めています (※)

※ セキュリティ観点で 平文のキーではなく証明書を用いたトークン取得を推奨しています。

以下に一連の手順を大まかに 3 つに分けて解説します。

事前に、C:\SignInReport フォルダーなど作業用のフォルダーを作成し、以下の手順にお進みください。

### 1. 認証に使用する証明書の準備

トークン取得に証明書を用います。

これは、これまでの平文のキーを用いる方法よりもセキュリティ的に強固であり、推奨している方法です。以下の PowerShell スクリプトは、自己署名証明書を生成し、ユーザーの証明書ストア (個人) に格納します。さらに、公開鍵を含む証明書 (SelfSignedCert.cer ファイル) をカレント  ディレクトリに出力します。

エディターを開き、下記内容をコピーして貼り付けください。そのファイルを CreateAndExportCert.ps1 として C:\SignInReport フォルダー配下に保存します。

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

### 2. 処理に必要なライブラリを nuget で取得するスクリプトの準備と実行

証明書を用いたトークン取得処理はライブラリを用いて行います。処理に必要なライブラリは nuget で取得します。テキスト エディターを開き、下記内容をコピーして貼り付けください。

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

### 3. サインイン ログを取得するスクリプトの準備

1 および 2 の手順を実行し、証明書および実行に必要なライブラリの準備が整いましたら、以下の手順で、アプリケーションおよびスクリプトを準備します。

まず、以下の手順に沿って、アプリケーションを登録します。

1. Azure ポータルに、全体管理者の権限を持つアカウントでサインインします。
2. Azure Active Directory のブレードを選択します。
3. [App registrations] を選択します。
4. [+ 新規登録] を選択します。
5. 表示名と、アカウントの種類を入力して、[登録] を選択します。
6. アプリが作成されたら [API のアクセス許可] を選択します。
7. API のアクセス許可の画面で、[+ アクセス許可の追加] を選択します。
8. [Microsoft Graph] を選択し[アプリケーションの許可] を選択します。
9. AuditLog.Read.All と Directory.Read.All にチェックをつけます。
10. [アクセス許可の追加] を選択します。
11. [<Tenant> に管理者の同意を与えます] をクリックし [はい] を選択します。

今回はアプリケーションの認証に証明書を利用します。
証明書を利用した認証は、アプリケーションのクライアント シークレットを利用する認証に比べ、より安全であり推奨される方法です。

ここで、このブログ記事の "1. 認証に使用する証明書の準備" の手順を実行した結果作成される SelfSignedCert.cer を以下の手順で Azure AD にアップロードします。

1. Azure ポータルに、アプリケーションを登録したアカウントでサインインします。
2. Azure Active Directory のブレードを選択します。
3. [App registrations] を選択します。
4. 上記手順で登録したアプリを選択します。
5. [証明書とシークレット] を選択します。
6. [証明書のアップロード] を選択し、SelfSignedCert.cer をアップロードします。

アプリケーションの登録、証明書の登録が完了しましたら、テキスト エディターを開き、次の中身をコピーして貼り付け、環境に合わせて冒頭部分の内容を設定します。

設定が完了しましたら、 GetSignInLogs.ps1 ファイルとして C:\SignInReport 配下に保存し、実行します。これによりサインイン アクティビティ レポートを JSON ファイルとして取得できます。

```powershell
Add-Type -Path ".\Tools\Microsoft.IdentityModel.Clients.ActiveDirectory\Microsoft.IdentityModel.Clients.ActiveDirectory.dll"

#
# Authorization & resource Url
#
$tenantId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
$resource = "https://graph.microsoft.com" 
$clientID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
$thumprint = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$outfile = "output.json"
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
    $url = "$resource/v1.0/auditLogs/signIns"

    Write-Output "Fetching data using Uri: $url"

    Do {
        $myReport = (Invoke-WebRequest -UseBasicParsing -Headers $headerParams -Uri $url)
        $myReportValue = ($myReport.Content | ConvertFrom-Json).value

        for ($j = 0; $j -lt $myReportValue.Count; $j++) {
            $data += $myReportValue[$j]
        }

        #
        # Get url from next link
        #
        $url = ($myReport.Content | ConvertFrom-Json).'@odata.nextLink'
    } while ($null -ne $url)
}
else {
    Write-Host "ERROR: No Access Token"
}

$data | ConvertTo-Json | Out-File -FilePath $outfile
Write-Host "Sign-in log is exported to $outfile"
```

このスクリプトで取得できるサインイン アクティビティ レポートをさらに詳細にフィルターしたい場合、以下の公開情報を参照いただければと思います。

signIn resource type  
https://docs.microsoft.com/en-us/graph/api/resources/signin?view=graph-rest-1.0

次回は監査アクティビティ レポートの取得方法を紹介いたします。このブログの情報がお客様の検証や運用のお役に少しでもお役に立てばと思います。

製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。

> 本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
