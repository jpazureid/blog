---
title: Azure AD Connect インストール前の確認事項
date: 2020-05-23
tags:
  - AAD Connect
---

# Azure AD Connect インストール前の確認事項

こんにちは、 Azure & Identity サポート チームです。
Azure AD Connect の新規構築、サーバー移行時に多くお問い合わせいただく事前に確認点をお纏めいたしました。
大きく分けて要件としては下記となります。

- A. Azure AD Connect の要件
- B. Azure AD Connect Health Agent の要件
- C. 認証方法による要件
- D. パスワードライトバック機能

それぞれの要件につきまして、良くあるご質問、技術情報を含め纏めさせていただきました。

## A. Azure AD Connect の要件

Azure AD Connect 自体の要件としては下記技術情報のとおりとなります。

- Azure AD Connect の前提条件
  https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-install-prerequisites

### [Q&A]

---
- Q. Azure AD Connect をドメイン コントローラー上にインストールして問題ないか ?
- A. 弊社としては推奨していません。
---


- Q. Azure AD Connect を他のサービスが稼働している既存のサーバーに構成しても問題か？
- A. 各要件を満たしている場合には特に制約はありません。
   運用面にてメンテナンスやセキュリティ面での可用性を確保できるように構成してください。

---

- Q. Azure AD Connect をスタンドアローン (ワークグループ) で構成可能か。
- A. 構成自体はカスタム インストールにて行うことが可能ですが、ドメイン メンバー サーバーに構成する必要があります。
---

## B. Azure AD Connect Health Agent for Sync の要件

Azure AD Connect に同梱されている Azure AD Connect Health Agent for Sync を構成するには、プロキシ構成や要件は Azure AD Connect とは別にあります。
弊社に Azure AD Connect インストール時にこの要件 (主にネットワーク関連の設定箇所) を満たしていないことでインストール ウィザードで警告が表示されるなどのお問い合わせを多くいただいております。
各エンドポイント、プロキシの設定をインストール前に確認をお願いします。

- Azure AD Connect Health エージェントのインストール
  https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-health-agent-install

### [Q&A]

---
- Q. Azure AD Connect Health Agent をインストールし、同期対象となるテナントにて Azure AD Premium ライセンスがないが問題ないか ?
A. インストール自体の処理やライセンス規約などに問題は起きません。
   Azure ポータルからの監視機能が使用できないなどの制約が生じます。
---
 
- Q. Azure AD Connect Health Agent for Sync を誤ってアンインストールしてしまった場合の対象方法。
- A. Azure AD Connect のインストール ウィザードを再試行することで再インストールされます。

---

- Q. Azure AD Connect Health Agent for Sync 単体でアップグレード可能か ?
- A. Azure AD Connect に同梱となり単体でのアップグレードは行えません。
 
---

## C. 認証方法による要件

Azure AD Connect で構成する認証方式 (パスワード ハッシュ同期 (PHS) かパススルー認証) により要件は異なります。

### C-1. パスワード ハッシュ同期 (PHS)

パスワード ハッシュ同期では Azure AD Connect のインストール要件を満たしていれば、追加でポートの開放や設定は不要となります。

- Azure AD Connect 同期を使用したパスワード ハッシュ同期の実装
  https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-password-hash-synchronization
 
### C-2. パススルー認証

パススルー認証エージェント (PTA) は Azure AD Connect をインストールするサーバーが 1 台目となり、PTA を別途インストールすることにより複数台で構成することを推奨しています。
PTA をインストールするサーバーでは上述の A. B. とは別にネットワーク要件を満たす必要があります。
 
ファイアウォールでの構成にて各エージェントの要件は下記となります。

- Azure Active Directory パススルー認証: クイック スタート - 手順 1: 前提条件を確認する
  https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-pta-quick-start#step-1-check-the-prerequisites

プロキシを経由し Azure AD と接続する場合には、WPAD が構成されていない環境の場合には下記技術情報に記載のとおり構成ファイルを編集する必要があります。

- パススルー認証エージェントは、送信 Web プロキシ サーバーで通信できますか。
  https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-pta-faq#can-the-pass-through-authentication-agents-communicate-over-an-outbound-web-proxy-server

### [Q&A]

---
- Q. パスワードハッシュ同期を複数の Azure AD Connect サーバーで構成することが可能か。
- A. 構成できません。Azure AD Connect は 1 台でパスワード同期を有効、その他 Azure AD Connect サーバーはステージング サーバーとしての構成となります。
---

- Q. PTA の必要数は ?
- A. 1 台で動作はしますが、下記技術情報のとおり、運用環境では 3 つ以上実行することを推奨しております。
   
  Azure AD Connect 1 台 (PTA 1 台目) + PTA 2 台目 + PTA 3 台目
  https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-pta-quick-start#step-1-check-the-prerequisites

## D. パスワードライトバック機能

パスワードの書き戻しを有効とした場合には、Azure AD から Active Directory へのパスワードの書き戻し処理のために下記の要件を満たす必要があります。
 
- オンプレミス Active Directory への書き込み権限
  Azure AD Connect に対するアカウントのアクセス許可を構成する
  https://docs.microsoft.com/ja-jp/azure/active-directory/authentication/tutorial-enable-sspr-writeback#configure-account-permissions-for-azure-ad-connect

> [補足]
セルフパスワード リセット サービス (SSPR) を構成する場合には、下記 URL およびデータセンター IP  アドレスへの送信 HTTPS アクセスが許可される必要があります。
  *.passwordreset.microsoftonline.com
  *.servicebus.windows.net
 
  Microsoft Azure Datacenter IP Ranges
  <https://www.microsoft.com/en-us/download/details.aspx?id=41653> 
