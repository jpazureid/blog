---
title: Azure AD の ExpressRoute サポート
date: 2018-07-19
tags:
  - Azure AD
  - ExpressRoute
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/07/19/azuread-expressroute/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Azure AD の ExpressRoute サポート

こんにちは、 Azure ID チームの三浦です。

[2018 年 5 月の Azure AD に対する更新情報](https://docs.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new#may-2018) に記載の  ExpressRoute 利用環境における Azure AD への認証トラフィックの変更について、その変更の内容、変更の影響を受ける場合の対応策についてご案内します。

## 変更の内容

Azure AD の認証トラフィックを処理するエンドポイント (IP アドレス) について、これまで ExpressRoute で Public ピアリング、 Microsoft ピアリングのいずれにおいてもルート情報がアドバタイズされていました。
言い換えますと ExpressRoute で Public ピアリングや Microsoft ピアリングを有効にして利用している環境では、 Azure AD に対する認証トラフィックが ExpressRoute を経由していました。

これが 2018 年 8 月 1 日から次のように変更されます。

- **Microsoft ピアリング、かつ ExpressRoute を利用するサービスとして “その他の Office 365 Online サービス (12076:5100)” の BGP コミュニティを利用するように構成されている場合のみ ExpressRoute を経由する**

結果として、上記のような構成以外では、 ExpressRoute を経由することなく、インターネットを利用して通信するようになります。
なお、 Azure AD にはリージョンが無いため、その認証トラフィックは必ずしも指定したリージョンに留まりません。そのため、これまでも ExpressRoute の構成として [ExpressRoute Premium アドオン](https://azure.microsoft.com/ja-jp/pricing/details/expressroute/) を利用していなかった場合には、 Azure AD への認証トラフィックは必ずしも ExpressRoute を経由しませんでした。つまり、現状でも ExpressRoute を利用している環境でも今回の変更とは関係なく、Azure AD への通信はインターネット経由となっている可能性があります。

## 何をするべきか

基本的にはそれほど注意することはありません。注意しなければいけないのは以下の条件を全て満たすケースです。

- ExpressRoute を利用している
- ExpressRoute で Public ピアリングを利用している、または Microsoft ピアリングを利用しているが、 “その他の Office 365 Online サービス (12076:5100)” コミュニティを有効にしていない
- インターネットへのアクセスを特定の URL のみを通すようにプロキシなどで URL フィルターを実施している

これまでは、上記条件を全て満たしている場合でも  ExpressRoute を経由して Azure AD への認証通信がおこなわれていたため、インターネットへのアクセス フィルターなどで、 Azure AD 認証に利用される URL を許可していなくとも問題ありませんでした。

2018 年 8 月 1 日以降は、上記条件を満たしている場合、 Azure AD への認証が通らなくなる恐れがあり、その結果として Azure や Office 365 などの各種サービスが利用できなくなる可能性があります。
対応策としては、次の公開情報で記載されています URL のうち **Office 365 ポータルと共有** と **Office 365 の認証と ID** に含まれるものについて、利用しているネットワークからインターネットにアクセスができるように、利用しているプロキシなどの設定変更を実施します。

Office 365 URL および IP アドレス範囲  
https://support.office.com/ja-jp/article/Office-365-URL-%e3%81%8a%e3%82%88%e3%81%b3-IP-%e3%82%a2%e3%83%89%e3%83%ac%e3%82%b9%e7%af%84%e5%9b%b2-8548a211-3fe7-47cb-abb1-355ea5aa88a2

## 補足

現状は Azure AD の認証トラフィックに関連した経路は次の種類の ExpressRoute にてアドバタイズされています。

1. Public ピアリング
2. Microsoft ピアリングの Azure の全てのリージョン コミュニティ
3. Microsoft ピアリングでの “その他の Office 365 Online サービス (12076:5100)” コミュニティ

2018 年 8 月 1 日以降は 3 のみが ExpressRoute でアドバタイズされることになります。
各ピアリングについても 2018 年 4 月 1 日以降に考え方が変わり、例えば Public ピアリングについての新規構成が停止されているなどありますので、こちらについての詳細は以下の記事を参照ください。

ExpressRoute の Public Peering と Microsoft Peering に関するアナウンス  
https://blogs.technet.microsoft.com/jpaztech/2018/03/02/expressroute-announcement-march-2018/
