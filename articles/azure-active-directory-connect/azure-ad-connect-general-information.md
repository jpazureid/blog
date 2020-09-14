---
title: "[情報採取] Azure AD Connect に関わる問題などの際に採取、提供いただきたい情報"
date: 2020-08-21
tags:
  - Azure AD Connect
  - 情報採取
---

# [情報採取] Azure AD Connect に関わる問題などの際に採取、提供いただきたい情報

Azure AD Connect に関わる問題が発生した場合にテクニカル サポートにお問い合わせいただく際に下記の情報をご提供いただくことで問い合わせがスムーズに行われますので、予め採取をお願いいたします。
調査過程で追加で採取いただく情報が増える可能性があります。予めご了承ください。

Azure AD Connect トラブルシューティングは大区分として、Azure AD Connect サーバー全般に関わる問題か、特定のオブジェクトに関わる問題かにより調査に必要な情報が異なります。
各シナリオでの取得情報としては、下記の記事にてお纏めさせていただいています。

 Azure AD Connect サーバーの全般情報
 https://jpazureid.github.io/blog/azure-active-directory-connect/general-information/


 [調査に有効な採取情報] Azure AD Connect でユーザー同期ができない問題
 https://jpazureid.github.io/blog/azure-active-directory-connect/problem-user-synchronize/



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

