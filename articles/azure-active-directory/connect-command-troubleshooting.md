---
title: "Microsoft Entra ID 認証コマンドのトラブルシューティング ガイド"
date: 2024-8-19
---

# Microsoft Entra ID 認証コマンドのトラブルシューティング ガイド

こんにちは。Azure & Identity サポート チームの栗井です。

Microsoft Azure の各種リソース操作や情報取得を行う方法として、多くのお客様に、各種 PowerShell モジュール (Azure PowerShell, Microsoft Graph PowerShell SDK、Azure CLI etc...) をご利用いただいてます！本記事では、各種認証用コマンド (az login、Connect-AzAccount、Connect-MgGraph) の実行に失敗する際のトラブルシューティング Tips をご紹介します。

- [az login (learn.microsoft.com)](https://learn.microsoft.com/ja-jp/cli/azure/authenticate-azure-cli)
- [Connect-AzAccount (learn.microsoft.com)](https://learn.microsoft.com/ja-jp/powershell/module/az.accounts/connect-azaccount)
- [Connect-MgGraph (learn.microsoft.com)](https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.authentication/connect-mggraph)

以下では最初に、これらモジュールの扱いと弊社技術サポートからの支援範囲についてお知らせし、そのあと Tips をおまとめいたします。

## Azure CLI、Azure PowerShell、Microsoft Graph PowerShell SDK の扱い

いずれのモジュールもオープンソース プロジェクトとして、Github Community による継続的な開発・改良が重ねられ、新しいバージョンがリリースされています。

- [Microsoft Azure PowerShell (github.com)](https://github.com/Azure/azure-powershell) / [issues](https://github.com/Azure/azure-powershell/issues)
- [Feedback 専用フォーム (バグ報告、機能のリクエスト など)](https://github.com/Azure/azure-powershell/issues/new/choose)
- [Microsoft Azure CLI (github.com)](https://github.com/Azure/azure-cli) / [issues](https://github.com/Azure/azure-cli/issues)
- [Feedback 専用フォーム (バグ報告、機能のリクエスト など)](https://github.com/Azure/azure-cli/issues/new/choose)
- [Powershell SDK for Microsoft Graph (github.com)](https://github.com/microsoftgraph/msgraph-sdk-powershell) / [issues](https://github.com/microsoftgraph/msgraph-sdk-powershell/issues)

## 弊社技術サポートからの支援範囲

コマンド実行時に発生する Microsoft Entra ID に対する認証処理の問題については弊社サポートでの技術支援が可能です。一方で、モジュール自体の動作や実装に依存するご質問、トラブルシューティングについては、これらのモジュールがオープンソース プロジェクトであるという性質上、支援ができかねる (もしくは支援範囲が限定的となる) 場合がございます。

支援ができかねる (支援範囲が限定的となる) 場合の例は以下のとおりです。

1. 公開情報 (learn.microsoft.com) 上に記載の無い、モジュールの実装および仕様に関する Q&A
2. モジュール自体の動作に問題がある判断される事象のトラブルシューティングおよび調査
3. モジュールの問題修正や機能改善を目的とした実装変更のリクエスト
4. GitHub issues 上での既知事例の調査
5. GitHub 上で記載のある英語情報の翻訳や要約作業
6. モジュールのソースコード解析や仕様確認

弊社サポートでのご支援が困難と判断した際には、GitHub Community への相談 (issue 起票) へ誘導する場合がございますことを、予めご承知おきいただきますようお願いいたします。

## 認証用コマンドのエラー時に考えられる原因

これらのモジュールが提供する認証用コマンドとしては、az login、Connect-AzAccount、Connect-MgGraph などがあります。順に考えられる原因を上げていきますのでご確認ください。

### 考えられる原因 1. 古いモジュールのバージョンを利用している

既存の不具合は、新しいバージョンで改修が行われます。古いバージョンをご利用の環境で事象が発生する場合は、最新バージョンへのアップグレードをお試しください。各モジュールのリリース履歴は以下をご参照ください。

- Azure CLI: [Azure CLI リリース ノート (learn.microsoft.com)](https://learn.microsoft.com/ja-jp/cli/azure/release-notes-azure-cli)
- Azure PowerShell:
    - [Azure PowerShell リリース ノート (learn.microsoft.com)](https://learn.microsoft.com/ja-jp/powershell/azure/release-notes-azureps?view=azps-12.0.0)
    - [Az (powershellgallery.com)](https://www.powershellgallery.com/packages/Az)
    - [Az.Accounts (powershellgallery.com)](https://www.powershellgallery.com/packages/Az.Accounts)
- Microsoft Graph PowerShell: [Microsoft.Graph (powershellgallery.com)](https://www.powershellgallery.com/packages/Microsoft.Graph/)

反対に、最新バージョンの動作に何らかの不具合がある場合も考えられます。問題が発生し始めた時期とバージョン アップのタイミングが合致している場合は、以前のバージョンへの切り戻しによる動作確認が有効な切り分けとなりますのでお試しください。

### 考えられる原因 2. Microsoft Entra 側で認証処理が失敗している

いずれのモジュールも、Microsoft Entra ID による認証処理が行われます。そのため、例えばユーザー認証やサービス プリンシパル認証の処理が失敗している場合には、コマンドの実行も失敗します。Microsoft Entra として認証処理が正常に完了しているかどうかは、Microsoft Entra ID のサインイン ログから確認します。

- 該当画面: [Azure ポータル > Microsoft Entra ID > サインイン ログ](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/SignIns)

認証コマンドに失敗した時刻近辺で出力されているサインイン ログを確認します。

- サインイン ログに [成功] の出力が出ている場合: Microsoft Entra ID による認証処理は自体成功しています。クライアントの画面上でエラーが表示されている場合は、認証処完了後のコマンド側の処理で何らかの処理が失敗している可能性が考えられます。
- サインイン ログに [失敗] の出力が出ている場合: Microsoft Entra ID による認証処理が失敗しているため、サインイン ログのエラー内容に応じて対処します。
- サインイン ログにログが出力されていない場合: Microsoft Entra ID による認証処理が開始する以前の段階で、何らかの失敗が発生していることが考えられます。

3 つ目のサインイン ログにログが出力されていない場合は、以下のような要因が考えられます。

- クライアントと Microsoft Entra ID 間の通信に問題があり、認証要求が Microsoft Entra ID に到達していない。
- 認証先の Microsoft Entra ID テナントに誤りがあり、別テナントに対しての認証試行が発生している (= 別テナントにサインイン ログが記録されている)。
- PowerShell 側での処理が認証処理の開始前の段階で失敗している。

### 考えられる原因 3. ネットワークに問題がある

コマンド実行時に発生するインターネット宛の通信に何らかの問題があり、コマンドの実行に失敗するパターンです。認証要求が Microsoft Entra ID に到達していないため、Microsoft Entra ID のサインイン ログに記録が残りません。

要因としては様々なものが考えられますが、最もよくあるシナリオは、 **クライアントからインターネット宛の通信にプロキシを利用し、プロキシ側でアクセス可能な URL を制限している** ケースです。この場合、プロキシを利用せずにインターネットへのダイレクト接続が可能なネットワーク環境でコマンドを実行し、事象が解消されるかどうかを試しましょう。プロキシ側でコマンド実行時に何らかの URL へのアクセスがブロックされていないかどうか、プロキシ側で記録されるログを確認することも有効です。

### 考えられる原因 4. その他の理由で失敗している

多くのパターンでは上記 1 ～ 3 のいずれかが該当しますが、その他の原因によってコマンドが失敗する場合もあります。この場合は、上述のとおり、いずれのモジュールも OSS として Github Community による開発が行われているため、GitHub issues より事例を検索ください。事例が無い場合は、issue を Open することでコミュニティに相談することも可能です。

- [Microsoft Azure PowerShell | issues (github.com)](https://github.com/Azure/azure-powershell/issues)
- [Microsoft Azure CLI | issues (github.com)](https://github.com/Azure/azure-cli/issues)
- [Powershell SDK for Microsoft Graph |issues (github.com)](https://github.com/microsoftgraph/msgraph-sdk-powershell/issues)

## デバッグ ログを活用しよう

いずれの認証用コマンドにも、デバッグ用のオプションがあります。認証用コマンドの実行時にエラーが出て予期せず認証処理が失敗する場合、このデバッグ出力を確認することが有効です。それぞれ以下のようにして出力が可能です。

Azure CLI  の場合:

```powershell
az login --debug
```

Azure PowerShell の場合:

```powershell
Connect-AzAccount -Debug
```

Microsoft Graph PowerShell の場合:

```powershell
Connect-MgGraph -Debug
```
    
デバッグ ログより、以下のような内容が判明する場合があります。

- 上記の [考えられる原因 1 ～ 3] の該当有無
- Entra ID 側での認証に失敗している場合は Microsoft Entra ID のエラーコードやエラー文面
- 各 URL に対しての HTTP 接続試行のログとその結果 (200 OK、400 Bad Request など)
- (.NET ベースのモジュールの場合) .NET のエラー

## 事象調査にあたって有用な情報採取

弊社サポートより認証コマンド失敗のトラブルシューティング調査を行う際は、事象発生環境における以下の情報採取を依頼する場合がございます。

1. 事象発生時のネットワーク パケット
1. デバッグ オプションを有効化した状態でのコマンド実行結果

お問い合わせ起票時にこれらの情報を提供いただけましたら、スムーズなご支援開始が可能です。以下にて採取手順をご紹介します。

なお、Windows 端末上での手順を想定しています。もし他プラットフォーム上で事象が発生している場合は、netsh コマンド以外の方法でパケット調査を依頼する場合がございます。


     
### 情報採取の手順
1. 管理者権限を持つアカウントでコマンド プロンプトを開きます。
     
2. 次のコマンドを実行し、ネットワーク キャプチャーの記録を開始します。

    netsh trace start capture=yes maxSize=2000M
     
3. 以下 4 つのコマンドを実行してキャッシュ情報を削除します。

    ipconfig /flushdns

    nbtstat -R

    klist purge

    klist purge -li 0x3e7
     
4. 別途 PowerShell を起動し、問題事象を再現します。認証コマンドをデバッグ オプション付きで実行します。その他にご利用のオプションがある場合には、それらも併せて追記をします。


    <再掲>
    - Azure CLI  の場合: az login --debug
    
    - Azure PowerShell の場合: Connect-AzAccount -Debug
    
    - Microsoft Graph PowerShell の場合: Connect-MgGraph -Debug

     
5. 以下のコマンドでネットワーク キャプチャーを停止します。
    
    netsh trace stop

トレース ファイルの収集処理が完了しましたら "ファイルの場所" に出力された "NetTrace.etl" 、及び "NetTrace.cab" の 2 つのファイルを弊社までお寄せください。

また、プロンプト上にデバッグログが出力されるため、すべての出力をテキスト ファイル (.txt) として保存のうえ、こちらもご提供ください。


## 事例紹介
ここからは「あるある事例」をピックアップ形式でご紹介します。


###  management.azure.com への通信失敗
該当モジュール: Azure CLI、Azure PowerShell

az login ならびに Connect-AzAccount では、認証処理が正常に終了した後に、Azure サブスクリプションの情報を取得します。この時、management.azure.com 宛の HTTPS (443) の通信が発生します。

認証処理に必要な URL を全て許可しているにもかかわらず、当 URL へのアクセスを禁止していたことが原因でコマンドが失敗する事例は、お問い合わせいただく中でも指折りの「あるある」シナリオです。


### プロキシを利用して通信する環境で、Azure CLI の az login が失敗する。
該当モジュール: Azure CLI
#### 【エラー例】
```
HTTPSConnectionPool(host='login.microsoftonline.com', port=443): Max retries exceeded with url: /organizations/v2.0/.well-known/openid-configuration (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1006)')))
Certificate verification failed. This typically happens when using Azure CLI behind a proxy that intercepts traffic with a self-signed certificate. Please add this certificate to the trusted CA bundle. More info: https://docs.microsoft.com/cli/azure/use-cli-effectively#work-behind-a-proxy.
```
#### 【原因】
Azure CLI による、プロキシ証明書の検証失敗。

#### 【解説】
Azuer CLI は Windows 既定の証明書ストアではなく、環境変数 REQUESTS_CA_BUNDLE が指す .pem ファイルを参照して CA 証明書を取得します。.pem ファイル内にプロキシ証明書のルート証明書が含まれない場合、TLS/SSL 通信の確立に失敗し、コマンドが失敗します。

[Error: SSLError "bad handshake...certificate verify failed" (Proxy blocks connection)](https://learn.microsoft.com/ja-jp/cli/azure/use-azure-cli-successfully-troubleshooting#error-sslerror-bad-handshakecertificate-verify-failed-proxy-blocks-connection)


上記公開情報に記載のとおり、.pem ファイルをご自身で作成いただき、REQUESTS_CA_BUNDLE にそのパスを設定することは有効な手段です。

 
もしくは別の手段として、既定で参照される .pem ファイル (ファイル パスは上記公開情報を参照) への、プロキシ証明書のルート証明書情報 (Base64 形式) の追記も有効です。この方法では、既存の .pem ファイルに含まれる CA 証明書情報を引き継いだまま、プロキシ証明書の検証も可能となります。


<豆知識>

Azure CLI コマンド実行時の通信を Fiddler によって採取する際にも、この問題が発生します。Fiddler はローカル プロキシとして動作するためです。

###  TLS 1.0/1.1 を利用した通信
該当モジュール: Azure CLI、Azure PowerShell、Microsoft Graph PowerShell ならびに Microsoft Entra ID 認証を利用するすべてのシナリオ

Microsoft Entra ID は TLS 1.0/1.1 の利用をサポートしておりません。該当する場合は TLS 1.2 へ切り替えのうえコマンドを実行ください。

参考情報: [Azure AD への認証が失敗する (エラー コード AADSTS1002016) 際の対処策について](https://jpazureid.github.io/blog/azure-active-directory/howto-deal-with-aadsts1002016/#%E5%AF%BE%E5%87%A6%E7%AD%96)


### 異なるテナントに対してサインインしようとしていた
該当モジュール: Azure CLI、Azure PowerShell、Microsoft Graph PowerShell 

ゲストユーザー アカウントを利用したシナリオで発生する場合があります。

一例として、ゲスト ユーザーとして参加している「テナント A」に対してのアクセスを試みていたものの、コマンド実行時は自身がメンバーとして所属している「テナント B」に対しての認証試行が発生していた、等が該当します。


この場合、コマンドのオプションでアクセス先のテナントを明示的に指定することが有効です。

- Azure CLI  の場合
    ```powershell
    az login --tenant "YOUR_TENANT_ID"
    ```

- Azure PowerShell の場合
    ```powershell
    Connect-AzAccount -Tenant "YOUR_TENANT_ID"
    ```

- Microsoft Graph PowerShell の場合
    ```powershell
    Connect-MgGraph -TenantId "YOUR_TENANT_ID"
    ```

### 認証キャッシュによる影響
以前にモジュールを利用した際の認証キャッシュが残存することで、認証コマンドの実行に影響を及ぼす場合があります。該当する場合は、認証キャッシュの削除が有効です。

- Azure CLI  の場合
    ```powershell
    az account clear
    ```

- Azure PowerShell の場合
    ```powershell
    Clear-AzContext
    ```

- Microsoft Graph PowerShell の場合

    Microsoft Graph PowerShell には、認証キャッシュ削除専用のコマンドがありません。


    Get-MgContext コマンドを実行することで、サインイン済みのアカウント・プリンシパル情報を取得可能です。何らかの認証セッションが残っていないかどうかを確認するためには、当コマンドを実行して、何も出力が返されないことを確かめます。
    
    もし何らかのアカウント・プリンシパル情報が表示される場合は、サインアウト用のコマンド Disconnect-MgGraph を実行します。


#### ワンポイント アドバイス
いずれのモジュールをご利用の場合も、必要な操作が完了した後は、サインアウト コマンドを実行しましょう。
不要な認証キャッシュが残存することによる影響や、誤操作・悪用のリスクを防ぐためです。


- Azure CLI  の場合
    ```powershell
    az logout
    ```

- Azure PowerShell の場合
    ```powershell
    Disconnect-AzAccount
    ```

- Microsoft Graph PowerShell の場合
    ```powershell
    Disconnect-MgGraph
    ```
