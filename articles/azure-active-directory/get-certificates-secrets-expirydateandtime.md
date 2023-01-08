---
title: Azure AD に連携している各種証明書、クライアント シークレットの有効期限の抽出方法
date: 2022-11-20
tags:
  - Azure AD
---

# Azure AD に連携している各種証明書、クライアント シークレットの有効期限の抽出方法

こんにちは。Azure Identity チームの栗井です。

Azure AD の「アプリの登録」から各アプリに連携している証明書・クライアント シークレット、ならびに「エンタープライズ アプリケーション」で SAML SSO を構成いただいている場合に登録している SAML 署名証明書は、いずれも有効期限がございます。

Azure Portal の画面上では、有効期限を一覧で確認することができません。本記事では、PowerShell コマンドを利用して各種証明書・シークレットの有効期限を CSV ファイルに出力する手順をご紹介いたします。

有効期限の管理などにご活用いただければ幸いです。


## 事前準備: Microsoft Graph PowerShell SDK のインストール
各種有効期限の出力には、Microsoft Graph PowerShell SDK を利用します。


PowerShell をご利用いただく端末で、Microsoft Graph PowerShell SDK が未インストールの場合は、下記の手順を実施ください。

1. Windows 端末上で PowerShell を管理者権限で起動します。
2. 下記コマンドを実行します。
```
Install-Module Microsoft.Graph
```

インストールの前提事項など、詳細情報は下記公開情報に記載がございますので、ご入用に応じて参照ください。
- [Install the Microsoft Graph PowerShell SDK](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/installation?view=graph-powershell-beta#installation)

## 操作の開始: Azure AD への認証
後述の手順を実施いただく前に、下記コマンドを実行のうえ、Azure AD テナントに接続ください。
```
Connect-MgGraph -Scopes “Application.Read.All”
```
テナント接続時のサインイン画面では、以下のいずれかのロールを持つ管理者ユーザーの資格情報で認証を実施ください。

- クラウド アプリケーション管理者
- アプリケーション管理者
- グローバル閲覧者
- グローバル管理者

認証に成功すると、下記メッセージが表示されます。
```
Welcome To Microsoft Graph!
```

テナントに接続後、後述のコマンドを実行いただくことで、各種証明書・シークレットの有効期限をCSV ファイル出力いただくことが可能です。

各コマンドの -Path で指定する出力先は一例です。環境に応じてカスタマイズください。


## クライアント シークレットの有効期限を一括出力
```
Get-MgApplication -All | Where-Object {$_.PasswordCredentials} | Select-Object -Property AppId -ExpandProperty PasswordCredentials | Export-Csv -Encoding Default -NoTypeInformation -Path "C:\Users\tmp\secretlist.csv"
```

## 証明書の有効期限を一括出力
```
Get-MgApplication -All | Where-Object {$_.KeyCredentials} | Select-Object @{n="appDisplayName"; e={$_.DisplayName}}, AppId -ExpandProperty KeyCredentials | Export-Csv -Encoding Default -NoTypeInformation -Path "C:\Users\tmp\certlist.csv"
```

## SAML 署名証明書の有効期限を一括出力
```
Get-MgServicePrincipal -All | Where-Object {$_.PreferredSingleSignOnMode -eq 'saml'} | Select-Object AppId,@{n="appDisplayName"; e={$_.DisplayName}} -ExpandProperty PasswordCredentials | Export-Csv -Encoding Default -NoTypeInformation -Path "C:\Users\tmp\samlcertlist.csv"
```


上記内容が少しでも皆様の参考となりますと幸いです。ご不明な点がございましたら、弊社サポートまでお気軽にお問い合わせください。