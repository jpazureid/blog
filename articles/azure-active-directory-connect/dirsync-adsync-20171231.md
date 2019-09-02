---
title: DirSync & ADSync – 2017/12/31 で終了のお知らせ
date: 2017-11-02
tags:
  - AAD Connect
  - ADSync
  - DirSync
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/11/02/dirsync-adsync-20171231-%e3%81%a7%e7%b5%82%e4%ba%86%e3%81%ae%e3%81%8a%e7%9f%a5%e3%82%89%e3%81%9b/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# DirSync & ADSync – 2017/12/31 で終了のお知らせ  

Azure Identity サポートチームの橋本です。  

もう 2 か月を切ったのでこちらでもご案内しておきます。  

2017 年の 4 月 13 日にサポートが終了した旧 Azure AD 同期ツールである DirSync と ADSync ですが、今年いっぱいで遂に Azure AD への通信も行えなくなります。  
公開情報としても 2017 年 7 月から掲載していますが、DirSync からの移行を検討中です、といった話をまだお客様から聞くことがあります。  
Azure AD Connect への移行が完了していない皆様、移行するなら今です！  

# Azure AD Connect への移行方法  

移行する方法は 2 通りあります。

1. **並列デプロイ (DirSync) / スウィング移行 (ADSync)**  
2. **インプレース アップグレード**  

それぞれの特徴をリストアップしてみました。  

1. **並列デプロイ/スウィング移行**

- 同期対象オブジェクトの数が 50,000 を超える場合に推奨します。  
- 安全性、ダウンタイムを考慮すると、おすすめはこちら。  
- Azure AD Connect 用のサーバーが 2 台必要。(ドメイン コントローラーにインストールすることも可能ですが、運用環境における実績はあまりありません。)  
- 同期を行えない時間を最小限に抑えることができる。  
- ステージングモードである程度同期処理を確認してから Azure AD Connect での同期を開始できる。  
- インプレース アップグレードと比較すると工数は増えます。  

2. **インプレース アップグレード**  

- 同期対象オブジェクトの数が 50,000 を超えない場合に推奨します。  
- 別途サーバーを準備する必要が無い。  
- 設定は自動的に移行され、完了後は自動的に同期を再開するため、工数が少なく済みます。  
- アップグレード中は同期が行われません。(一般的に 50,000 オブジェクトを同期するために約 3 時間要します)  

以下のサイトにアップグレード手順に関する詳細がありますのでご確認ください。

- [DirSync からのアップグレード](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-dirsync-upgrade-get-started)  
- [ADSync からのアップグレード](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-upgrade-previous-version)  

移行後によくあるお問い合わせ  

旧ツールから Azure AD Connect への移行後のお問い合わせとして、「読み仮名などの Exchange 関連の属性が消えた !」 というのがあります。  
Azure AD Connect では既定の同期ルールに「Exchange 関連属性は、属性 mailNickName に値が含まれる場合にのみ同期される」という項目が追加されています。  DirSync の場合には mailNickName 属性値が空白でも Exchange 関連属性が Azure AD に同期されていましたが、Azure AD Connect へアップグレードしますと、これらの属性情報を変更しても同期されなくなります。mailnickname が空白の場合は、sAMAccoutName などの属性値をコピーするといった対処を事前に行ってください。  

また、プロキシ サーバーをご利用の場合、C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\machine.config ファイルに設定を追加する必要があります。  
詳細については以下のサイトの "接続" をご確認ください。  

- [Azure AD Connect の前提条件](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-install-prerequisites)  

Azure AD Connect の各情報についてはこちら： [Azure AD Connect とは](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-hybrid-identity)  

現在、DirSync と ADSync に関するお問い合わせはお受けできませんが、Azure AD Connect に関するご質問でしたらもちろん対応させていただきますので、ご不明な点等がありましたら、ぜひ弊社サポート サービスをご利用ください。  
※本情報の内容（リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。  
