---
title: エラー コード AADSTS1002016 が発生した際の対処策について
date: 2022-7-28 09:00
tags:
    - Azure AD
    - PowerShell
    - TLS 1.2
---


こんにちは、 Azure Identity サポート チームの小出です。
今回は、最近多くお問い合わせをいただいております AADSTS1002016 のエラーについてご案内します。

## 事象
Powershell で Connect-AzureAD や Connect-Msolservice、 Connect-ExchangeOnline などのコマンドを実行した際に、正しくサインインが完了せず、以下のようなエラー メッセージが表示される事象です。

エラー コード
```
AADSTS1002016: You are using TLS version 1.0, 1.1 and/or 3DES cipher which are deprecated to improve the security posture of Azure AD. Your TenantID is: XXXXXXXXX. Please refer to https://go.microsoft.com/fwlink/?linkid=2161187 and conduct needed actions to remediate the issue. For further questions, please contact your administrator.
```


## 原因
エラー メッセージに記載されております通り、古い TLS バージョンを利用しているために発生しているエラーです。
TLS1.0 / 1.1 につきましては、廃止となる旨情報をご案内しておりますが、 6 月下旬より実際の展開が順次開始されております。
そのため、以前は問題なく実行できていた場合であっても、直近では上記エラーが発生しているようなシナリオもございます。

## 技術資料
[Azure AD TLS 1.1 および 1.0 の非推奨の環境で TLS 1.2 のサポートを有効にする](https://docs.microsoft.com/ja-jp/troubleshoot/azure/active-directory/enable-support-tls-environment?tabs=azure-monitor
)

[.NET Framework で TLS 1.1 および TLS 1.2 を有効化する方法 - まとめ -](https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/dotnet-framework-tls12/
)

[.NET Framework のバージョンおよび依存関係](https://docs.microsoft.com/ja-jp/dotnet/framework/migration-guide/versions-and-dependencies
)



## 対処策
TLS 1.2 にて通信を行うことで、本エラーの解消が見込めます。
お客様のご利用シナリオにもよりますが、まずご確認いただきたい確認ポイントとしては、以下の 2 点となります。
・Windows (Server) OS が TLS 1.2 が有効 かつ 利用できる状態か
・アプリ側で TLS 1.2 が有効でかつ利用できる状態か

### OS 上の TLS 1.2 設定を確認・変更する方法
現在サポートされておりますすべての Windows OS / Windows Server OS で は、既定で TLS 1.2 が有効化されております。
そのため、この場合は OS 観点では問題なく TLS 1.2 を利用できる状態です。

Windows 7 / Windows Server 2008 R2 の場合は、OS として TLS 1.2  を利用できますが有効化されていません。
以下のレジストリ値を設定し、 Windows OS として既定で利用できるよう設定を変更してください。

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


### アプリケーション 上の TLS 1.2 設定を確認・変更する方法
アプリケーションがどのようなフレーム ワークを使用して利用して作成されているかにもよりますが、主に本エラーが発生しているシナリオとしては、 PowerShell で  Connect-AzureAD や Connect-Msolservice、 Connect-ExchangeOnline など、 Azure AD への接続コマンドを実施しているシナリオが多く見受けられます。
この場合上記 OS 側の設定を確認後、下記手順を実施いただき、その後再度コマンドが実施できるかご確認ください。

1.  PowerShell を管理者権限で起動します。
2. 以下のコマンドを実行します。
 
  ```
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
  ```

3. Connect-AzureAD をはじめ Azure AD への接続コマンドを再度実行いただき、正しく接続できるか確認します。


お客様のご利用環境・バージョンなどによって、追加でのご案内が必要となる場合があります。
そのため、もし上記内容をご確認いただいても接続できない場合などは、ご利用の環境情報を記載のうえ、お問い合わせを起票ください。
