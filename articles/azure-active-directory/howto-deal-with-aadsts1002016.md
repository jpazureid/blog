---
title: Azure AD への認証が失敗する (エラー コード AADSTS1002016) 際の対処策について
date: 2022-7-28 09:00
tags:
    - Azure AD
    - PowerShell
    - TLS 1.2
---


こんにちは、 Azure Identity サポート チームの小出です。

現在 (2022 年 7 月現在) Azure AD の認証サービスにおける TLS 1.0 /1.1 の無効化の処理を進めています。TLS 1.0/1.1 による接続ができなくなることは、以前より Microsoft 365 のメッセージセンター、 Azure ポータルの Azure Active Directory ブレードでアナウンスをしており、 2022 年 1 月 31 日までに対策を実施するよう通知をしておりました。無効化の処理は段階的におこなわれており、 TLS1.0 /1.1 が利用されているために Azure AD の認証サービスが接続を受け付けない場合には Azure AD は AADSTS1002016 のエラーを返します。

```
AADSTS1002016: You are using TLS version 1.0, 1.1 and/or 3DES cipher which are deprecated to improve the security posture of Azure AD. Your TenantID is: XXXXXXXXX. Please refer to https://go.microsoft.com/fwlink/?linkid=2161187 and conduct needed actions to remediate the issue. For further questions, please contact your administrator.
```

ここ最近、突然 Azure AD の認証ができなくなった、ただ何度かリトライすると接続できることもあるというケースでは、この措置に伴い生じている可能性があります (段階的に展開しているため、リトライで TLS 1.0 /1.1 無効化の措置が未適用のサーバーに接続した場合、エラーとならず接続できます)。

サポート窓口では特に PowerShell を利用した自動化処理で問題が発生するようになったというお問い合わせを多く受けていますが、それ以外でも発生する可能性があります。処理が複数のシステムを介して行われている場合には、AADSTS1002016 のエラーが見えないものもありますし、 PowerShell でも実行するコマンドによっては、AADSTS1002016 という情報は含まれずに、例えば Connect-MSolService では次のようなエラーが返されます。
  ```
Connect-MsolService : Authentication Error: Unexpected authentication failure.
  ```

他には Web アプリケーションでこの措置の影響を受けて問題が発生している場合に次のようなエラーの発生が確認できています。
  ```
IDX20803: Unable to create to obtain configuration from: 'https://login.microsoftonline.com/{Tenant-ID}/.well-known/openid-configuration'
  ```

PowerShell で TLS 1.2 が利用できる状態かは PowerShell を起動し、次のコマンドの実行により確認ができます。
  ```
[System.Net.ServicePointManager]::SecurityProtocol
  ```
実行した結果、TLS12 が含まれている、あるいは SystemDefault となっている場合には PowerShell としては TLS 1.2 を利用できる状態と判断できます (OS でも利用できるように構成されていることが前提です)。実行結果として Ssl3, Tls のみなど TLS12 が含まれない場合には TLS 1.2 は利用されない状態のため、後述します 「PowerShell (.NET Framework) で TLS 1.2 が利用されるように設定する方法」 にしたがってレジストリ設定を実施ください。

IDX20803 が記録されているパターンなどでは問題が発生している Web アプリケーションが TLS 1.2 を利用するようになっているか確認を実施ください。

## 技術資料
[Azure AD TLS 1.1 および 1.0 の非推奨の環境で TLS 1.2 のサポートを有効にする](https://docs.microsoft.com/ja-jp/troubleshoot/azure/active-directory/enable-support-tls-environment?tabs=azure-monitor
)

[.NET Framework で TLS 1.1 および TLS 1.2 を有効化する方法 - まとめ -](https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/dotnet-framework-tls12/
)

[.NET Framework のバージョンおよび依存関係](https://docs.microsoft.com/ja-jp/dotnet/framework/migration-guide/versions-and-dependencies
)

## 対処策
TLS 1.2 にて通信を行われるように設定します。
確認ポイントとしては、以下の 2 点となります。

- OS が TLS 1.2 が有効 かつ 利用できる状態か
- アプリ側で TLS 1.2 が有効でかつ利用できる状態か

### OS 上の TLS 1.2 設定を確認・変更する方法
現在サポートされているすべての Windows OS / Windows Server OS では、既定で TLS 1.2 が有効化されております。
そのため、サポート対象の Windows OS 観点では TLS 1.2 を利用できる状態です。

Windows 7 / Windows Server 2008 R2 の場合は、OS として TLS 1.2  を利用できますが有効化されていません。
以下のレジストリ値を設定し、 Windows OS として既定で利用できるよう設定を変更してください。

それ以降の OS ではレジストリ キーが存在していない場合も TLS 1.2 は有効化されています。DisabledByDefault = 1 または Enabled = 0 が設定されているときのみ設定変更を実施ください。

    キー : HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client
    名前 : DisabledByDefault
    種類 : REG_DWORD
    値 : 0

    キー : HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client
    名前 : Enabled
    種類 : REG_DWORD
    値 : 1

    キー : HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Server
    名前 : DisabledByDefault
    種類 : REG_DWORD
    値 : 0

    キー : HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Server
    名前 : Enabled
    種類 : REG_DWORD
    値 : 1

### PowerShell (.NET Framework) で TLS 1.2 が利用されるように設定する方法
アプリケーションがどのようなフレーム ワークを使用して利用して作成されているかに依存しますが、主に本エラーが発生しているシナリオとして PowerShell で  Connect-AzureAD や Connect-Msolservice、 Connect-ExchangeOnline など、 Azure AD への接続コマンドを実施しているシナリオが多く見受けられます。PowerShell で TLS 1.2 を利用するためには .NET Framework で TLS 1.2 が利用されるように設定されている必要があります。

問題が生じた環境では、OS の設定に加えて、次のレジストリ設定を実施の上、再起動します。

    キー : HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework\v4.0.30319
    名前 : SchUseStrongCrypto
    種類 : REG_DWORD
    値 : 1
    
    キー : HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\.NETFramework\v4.0.30319
    名前 : SchUseStrongCrypto
    種類 : REG_DWORD
    値 : 1

なお、 PowerShell を実行時に事前に以下のコマンドを実行すれば、明示的に TLS 1.2 を指定して接続ができますので、この方法でも構いません。
  ```
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
  ```
#### 注意事項: 
.NET Framework 4.6 以降であれば特にこのレジストリを設定しなくとも TLS 1.2 に対応しています。しかし、.Net Framework に依存するアプリケーション (Powershell もその 1 つです) と OS の組み合わせによっては 4.6 以降のバージョンを利用していても明示的にレジストリを設定しないと TLS 1.2 を利用してくれません。
具体的には Windows Server 2016 (およびそれ以前) 上で PowerShell を利用する場合には、 .Net Framework のバージョンに依らずレジストリ設定 (または PowerShell の場合事前にコマンドで明示的に TLS 1.2 を指定) が必要です。また、 ADAL ライブラリで Microsoft.IdentityModel.Clients.ActiveDirectory を利用している場合にも既定では TLS 1.0/1.1 が利用されるため、そのようなケースでもレジストリ設定を行います。 

### TLS 1.0/1.1 を利用した Azure AD への認証要求の有無を確認する方法 
対処策の設定ををしても問題が解消しない場合には、 Azure AD への認証までの経路にあるプロキシ サーバーが TLS1.2 を利用していない、ご利用のシステムのバックエンドで TLS 1.0/1.1 を利用している可能性があります。TLS 1.0/1.1 を利用した認証要求が Azure AD に来ているかはサインインログで判断ができます。

1. Azure portal (https://portal.azure.com) に全体管理者でサインインし、 [Azure Active Directory] を開きます。
2. [サインイン ログ] を選択します。
3. "ユーザーのサインイン (対話型)" を選択して、認証に失敗するアカウントのサインイン ログ エントリを選択します。
4. [追加の詳細情報] タブを選択します (このタブが表示されない場合は、最初に右隅の省略記号 (...) を選択して、タブの完全なリストを表示します)。
5. レガシ TLS (TLS 1.0, 1.1, 3DES) True という表示が含まれる場合は、TLS 1.0/1.1 を使用してサインインが行われています。 TLS 1.2 を使用している場合には何も表示されません。
6. 同様に "ユーザーのサインイン (非対話型)" を選択して、同様に確認を実施します。PowerShell を利用して失敗しているケースでは (非対話型) のほうに "レガシ TLS (TLS 1.0, 1.1, 3DES)" で接続していることを示す情報が表示されます。

### テナントでこの影響を受けて認証に失敗しているか確認する方法 
本影響を受けてサインインに失敗した場合、 Azure AD のサインイン ログにサインインのエラーコードとして 1002016 を含む失敗のエントリが記録されます。
サインイン ログを csv 形式でダウンロードし、サインインのエラーコードとして 1002016 が含まれているか確認することで TLS 1.0/1.1 無効化の影響を受け認証失敗しているか確認できます。

1. Azure portal (https://portal.azure.com) に全体管理者でサインインし、 [Azure Active Directory] を開きます。
2. [サインイン ログ] を選択します。
3. フィルタとして "許可された時刻:過去 24 時間" が既定で設定されていますので適宜 "過去 7 日間" などに変更します。
4. [ダウンロード] - "CSV のダウンロード" をクリックします。
5. InteractiveSignIns_20xx-xx-xx_20xx-xx-xx、NonInteractiveSignIns_20xx-xx-xx_20xx-xx-xx、ApplicationSignIns_20xx-xx-xx_20xx-xx-xx、MSISignIns_20xx-xx-xx_20xx-xx-xx の 4 つをそれぞれダウンロードします。
6. ダウンロードした CSV ファイルを開き、"サインインのエラー コード" として 1002016 が含まれていないか確認します。

### テナントでこの影響を受けて認証に失敗しているか確認する方法 (PowerShell を利用してサインインログを抽出)
Azure AD Premium をテナントで利用されていることが前提ですが、 PowerShell コマンドを利用して TLS 1.0/1.1 が利用されたことを示すエントリのみをフィルタして CSV 形式でダウンロードするスクリプトを紹介します。

1. [管理者として実行] オプションを使用して、[スタート] メニューから Windows PowerShell を開きます。

2. 次のコマンドを実行して、Microsoft Graph SDK をインストールし、実行ポリシーを設定します。
  ```
Install-Module Microsoft.Graph -Scope AllUsers
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
  ```

3. 次のスクリプトを PowerShell スクリプト (.ps1) ファイルに保存します。最初の 3 行は、取得対象テナントのテナント ID、何日分のログを取得するかの日数 (例では 7 日になっています)、出力先のフォルダ名 (例では c:\temp\) を環境に合わせて編集します。
  ```
$tId = "テナント ID"  # テナント ID を入れてください。テナント ID は Azure ポータルの Azure Active Directory の概要から取得できます。 
$agoDays = 7  # 何日前からのログを取得するか日数を指定します。
$pathForExport = "c:\temp\"  # CSV ファイルの出力先フォルダ名を入力します。
$startDate = (Get-Date).AddDays(-($agoDays)).ToString('yyyy-MM-dd')  # $agoDays で指定した日数を元に取得対象の開始日を得ます

Connect-MgGraph -Scopes "AuditLog.Read.All" -TenantId $tId 
Select-MgProfile "beta"  # ベータのエンドポイントへの接続が必要です

# フィルタ条件を定義しています。サインイン ログに TLS 1.0 / 1.1 が利用されたことを示すエントリのみをフィルタするようにしています
$procDetailFunction = "x: x/key eq 'legacy tls (tls 1.0, 1.1, 3des)' and x/value eq '1'"
$clauses = (
    "createdDateTime ge $startDate",
    "signInEventTypes/any(t: t eq 'nonInteractiveUser')",
    "signInEventTypes/any(t: t eq 'servicePrincipal')",
    "(authenticationProcessingDetails/any($procDetailFunction))"
)

# フィルタ条件に従って対話型、非対話型、 ServicePrincipal のそれぞれのログを取得します。
$signInsInteractive = Get-MgAuditLogSignIn -Filter ($clauses[0,3] -Join " and ") -All
$signInsNonInteractive = Get-MgAuditLogSignIn -Filter ($clauses[0,1,3] -Join " and ") -All
$signInsWorkloadIdentities = Get-MgAuditLogSignIn -Filter ($clauses[0,2,3] -Join " and ") -All

$columnList = @{  # 対話型、非対話型の出力ファイルに含むカラムを定義しています
    Property = "CorrelationId", "createdDateTime", "userPrincipalName", "userId",
              "UserDisplayName", "AppDisplayName", "AppId", "IPAddress", "isInteractive",
              "ResourceDisplayName", "ResourceId", "UserAgent"
}

$columnListWorkloadId = @{ # Service Principal の出力ファイルに含むカラムを定義しています
    Property = "CorrelationId", "createdDateTime", "AppDisplayName", "AppId", "IPAddress",
              "ResourceDisplayName", "ResourceId", "ServicePrincipalId", "ServicePrincipalName"
}

$signInsInteractive | ForEach-Object {
    foreach ($authDetail in $_.AuthenticationProcessingDetails)
    {
        if (($authDetail.Key -match "Legacy TLS") -and ($authDetail.Value -eq "True"))
        {
            $_ | Select-Object @columnList -ExpandProperty Status
        }
    }
} | Export-Csv -Path ($pathForExport + "Interactive_lowTls_$tId.csv") -NoTypeInformation

$signInsNonInteractive | ForEach-Object {
    foreach ($authDetail in $_.AuthenticationProcessingDetails)
    {
        if (($authDetail.Key -match "Legacy TLS") -and ($authDetail.Value -eq "True"))
        {
            $_ | Select-Object @columnList -ExpandProperty Status
        }
    }
} | Export-Csv -Path ($pathForExport + "NonInteractive_lowTls_$tId.csv") -NoTypeInformation

$signInsWorkloadIdentities | ForEach-Object {
    foreach ($authDetail in $_.AuthenticationProcessingDetails)
    {
        if (($authDetail.Key -match "Legacy TLS") -and ($authDetail.Value -eq "True"))
        {
            $_ | Select-Object @columnListWorkloadId -ExpandProperty Status
        }
    }
} | Export-Csv -Path ($pathForExport + "WorkloadIdentities_lowTls_$tId.csv") -NoTypeInformation
  ```
4. スクリプトを保存して実行します。 スクリプトの実行時にメッセージが表示されたら、グローバル管理者としてサインインします。 次に、Microsoft Graph に監査ログ情報を読み取らせることに同意します。

5. 指定したフォルダに Interactive_lowTls_<テナント ID>.csv、 NonInteractive_lowTls_<テナント ID>.csv、WorkloadIdentities_lowTls_<テナント ID>.csv の 3 ファイルが作成されます。このファイルには TLS 1.0/1.1 を利用したサインイン エントリのみが含まれます。認証が失敗した場合には ErrorCode のカラムに 1002016 が含まれますので、本問題が該当のテナントでいつから生じているかも確認が可能です。

### TLS 1.0 を利用した Azure AD への認証を試みる方法 
TLS 1.0/1.1 の無効化は段階的に進められています。接続先のデータセンターによって事象が発生の有無が変わります (そのため事象が突然発生したり、発生しなくなったりもします)。すでに Azure AD PowerShell がインストールされている前提で、 TLS 1.0 での接続を試したい場合には、次のような方法で明示的に TLS 1.0 を利用した接続テストを行うことができます (TLS 1.0 を利用すること自体は推奨されません)。

1. PowerShell を起動します。
2. 次のコマンドを実行します。
  ```
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls
  ```
3. connect-azuread を実行して表示されるポップアップでユーザー名、パスワードを入力します。
4. TLS 1.0/1.1 が利用されているために接続できない場合にはエラー画面が表示され、そこにはエラーコード AADSTS1002016 が含まれます。 
