---
title: "[情報採取] Azure AD Connect に関わる問題などの際に採取、提供いただきたい情報"
date: 2020-09-16
tags:
  - AAD Connect
  - Azure AD Connect
  - 情報採取
---

# [情報採取] Azure AD Connect に関わる問題などの際に採取、提供いただきたい情報

こんにちは、日本マイクロソフトの金子です。

Azure AD Connect に関わる問題が発生した場合にテクニカル サポートにお問い合わせいただく際に下記の情報をご提供いただくことで問い合わせがスムーズに行われますので、予め採取をお願いいたします。
調査過程で追加で採取いただく情報が増える可能性がありますので、予めご了承ください。

Azure AD Connect トラブルシューティングは大区分として、Azure AD Connect サーバー全般に関わる問題か、特定のオブジェクトに関わる問題かにより調査に必要な情報が異なります。
各シナリオでの取得情報としては、下記の記事にてお纏めさせていただいています。

[Azure AD Connect サーバーの全般情報](../azure-active-directory-connect/general-information.md)

[\[調査に有効な採取情報\] Azure AD Connect でユーザー同期ができない問題](../azure-active-directory-connect/problem-user-synchronize.md)

上記内容をスクリプトで一括採取する方法につきましてもご用意させていただいています。

 AADC サーバー情報一括採取ツール
 https://github.com/jpazureid/aadconnect-diagnostic

運用環境にて見慣れないエラーやイベントが発生した場合には、まず、上記の "簡易取得" にて取得し、お問い合わせ起票時に下記の情報と合わせて取得済みの旨お知らせください。

a. エラーの画面またはログ抜粋
　 オブジェクト同期に関わる問題につきましては、Synchronization Service Manager のステータスや詳細が確認できる画面キャプチャなど
b. テナント名   (例 contoso.onmicrosoft.com)
c. 発生日時
d. 現在の状況 (事象が継続中 or 断続的に発生 or 解消済み)
e. 事象発生前後の状況 (構成変更やアップグレードをした場合には具体的なバージョンなど)

Azure AD Connect の構成ウィザードでは、Active Directory や Azure AD への接続に問題が起きている場合にエラーが発生します。
接続の問題が疑われる場合は、下記のスクリプトを実行することで Azure AD Connect が使用する接続先への疎通を一括して確認することができます。

 Azure AD Connect Network and Name Resolution Prerequistes Test
 https://gallery.technet.microsoft.com/Azure-AD-Connect-Network-150c20a3

1. 上記 URL にアクセスし、Azure AD Connect をインストールしたサーバーに “AADConnect-CommunicationsTest.ps1” をダウンロードします。
2. ダウンロードした PowerShell スクリプトを実行します。
3. Azure AD のグローバル管理者の ID /パスワードを入力します。
4. スクリプトが開始され、ローカル フォルダーに “20xx-xx-xx_AADConnectConnectivity.txt” のファイル名で実行結果が保存されます。

上記の情報を採取いただき、弊社サポートにお問い合わせいただけますと調査をスムーズに行うことができる可能性がありますので、参考にしていただければ幸いです。
