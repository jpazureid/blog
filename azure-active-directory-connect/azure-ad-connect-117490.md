---
title: Azure AD Connect ビルド 1.1.749.0 の注意点
date: 2018-02-26
tags:
  - AAD Connect
---
# Azure AD Connect ビルド 1.1.749.0 の注意点  
  
こんにちは！Azure Identity サポートの橋本です。  

リリースが予定されている Azure AD Connect  ビルド 1.1.749.0 へのアップグレードについて事前に共有しておいたほうが良いと思ったことがありましたので、Azure AD Connect をご利用の方はぜひご確認ください。  
  
近々、Azure AD Connect の最新ビルド 1.1.749.0 がリリースされることが予定されておりますが、アップグレード後は完全同期が必要となる点にご注意ください。  
  
このビルドでは多くの機能の追加とバグ修正が行われているため、ぜひアップグレードいただきたいのですが、アップグレードすると、アップグレード完了後の最初の同期は完全同期が実行されます。  
  
追加される設定や同期ルールなどに伴い完全同期が必要となるのですが、完全同期は、同期しているオブジェクト数によっては数日要することもある (参考: 40,000 オブジェクトで約 3~5 時間) ため、必要に応じて Azure AD Connect の自動アップグレードは無効化 (Disabled) いただき、手動でのアップグレードを後日計画いただくことを推奨いたします。  
  
自動アップグレードを無効化するには、Azure AD Connect サーバー上で以下の PowerShell コマンドレットを実行します。  
なお、自動アップグレード機能は既定で有効になっておりますのでご注意ください。  
```
Set-ADSyncAutoUpgrade disabled  
```
  
なお、現在の設定は以下のコマンドレットで確認できます。  
```
Get-ADSyncAutoUpgrade  
```
  
コマンド実行結果例:  
![](./azure-ad-connect-117490/autoupgrade.png)  
参考情報: [Azure AD Connect: 自動アップグレード](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-install-automatic-upgrade)  
  
  
ご不明な点等がありましたら、ぜひ弊社サポート サービスをご利用ください。  
※本情報の内容（リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。  
