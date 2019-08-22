---
title: Azure AD Connect サーバーの全般情報
date: 2017-10-24
tags:
  - AAD Connect
  - サポート
  - 情報採取
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/10/24/azure-ad-connect-getserverinfo/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# [調査に有効な採取情報] Azure AD Connect サーバーの全般情報

こんにちは、Azure & Identity サポート チームの後藤です。

今回は Azure AD Connect サーバー構成に関わる情報採取についてご紹介します。
Azure AD Connect に関わる問題のときに有効ですが、同期のトラブルでは “Azure AD Connect でユーザー同期ができない問題” の情報取得も合わせてお願いします。

<採取情報>

以下の情報を Azure AD Connect サーバー上で採取します。

1. アプリケーション / システムのイベントログ
2. Azure AD Connect トレース ログ
3. Azure AD Connect の構成情報
4. Azure AD Connect のバージョン情報

## 1. アプリケーション / システムのイベントログ

1. Azure AD Connect サーバーに管理者権限にてログインします。
2. コマンド プロンプトを実行します。
3. 以下のコマンドを実行し、出力された .evtx ファイルを採取します。

```cmd
wevtutil epl system C:\SystemEvent.evtx
wevtutil epl Application C:\AppliEvent.evtx
```

## 2.Azure AD Connect トレース ログ

下記フォルダーおよびフォルダー配下のファイルを zip ファイルなどにまとめて保存します。

```cmd
C:\ProgramData\AADConnect
%localappdata%\AADConnect
```

例: C:\Users\admin001\AppData\Local\AADConnect

## 3.Azure AD Connect の構成情報

PowerShell にて以下のコマンドレットを実行し、出力されたフォルダーおよびファイルを Zip ファイル等にまとめて保存します。

```powershell
Get-ADSyncAutoUpgrade > c:\ADSyncAutoUpgrade.txt
(Get-ADSyncGlobalSettings).Parameters | select Name,Value > c:\ADSyncGlobalSettings.txt
Get-ADSyncScheduler > c:\ADSyncScheduler.txt
Get-ADSyncSchedulerConnectorOverride > c:\ADSyncSchedulerConnectorOverride.txt
Get-ADSyncServerConfiguration -Path c:\aadconnect
```

## 4.Azure AD Connect のバージョン情報

1. コマンド プロンプトを管理者として起動して、以下のコマンドを実行します。

```cmd
wmic product list > product.txt
```

2. カレント ディレクトリに product.txt として保存されます。

ここでご案内しました情報を事前に取得し、お問い合わせと合わせてご提供いただくことで次のようなメリットがあります。

1. お問い合わせに対する回答・問題解決をよりはやくできます。
2. 後々、再現できなくなり、問題発生時の情報がないために、問題の発生要因を追及できなくなるケースが減らせます。
3. サポート エンジニアより情報採取を案内される分のやり取りを減らせます。
4. 情報があるため、サポート エンジニアがより事象についてより把握した状態でお客様とゴール設定ができます。

「コミュニティにおけるマイクロソフト社員による発言やコメントは、マイクロソフトの正式な見解またはコメントではありません。」

※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
