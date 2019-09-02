---
title: テナント制限
date: 2018-09-13
tags:
  - Azure AD
  - Tenant Restrictions
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/09/13/tenant-restrictions/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# テナント制限について

こんにちは！ Azure & Identity サポート チームの三浦 大です。

今回はテナント制限の機能に関して、よくあるお問い合わせと、その回答をまとめさせていただきました。

## テナント制限とは

まず、テナント制限とは、 Azure AD に対する認証の通信をプロキシ経由させ、そのプロキシから送信されるデータに、アクセスを許可する Azure AD テナントの情報を付与しておくことで、それ以外の Azure AD テナントへのアクセスをブロックする機能を指しています。

詳細については、以下の公開情報をご参照ください。

自社テナント以外へのアクセス制御 – “テナントの制限” 機能 (Tenant Restrictions)  
https://blogs.technet.microsoft.com/office365-tech-japan/2017/02/06/tenant-restrictions/

テナント制限が機能しており、アクセスを許可しないテナントの  Office 365 や Azure へのサインイン時に 「ここからアクセスすることはできません」 のエラーメッセージが表示されます。

![](./tenant-restriction/tenant-restrictions01.png)

以下にて、テナント制限に関連する、よくあるお問い合わせをまとめました。ぜひご参照ください！

## よくあるお問い合わせ

<font color="DeepSkyBlue">Q</font> : MS アカウントを利用すると、制限の画面が表示されますが、回避策はありませんか？

<font color = "red">A</font> : MS アカウントを許可する場合には、以下をテナント制限の許可するリストに追加します。

("Restrict-Access-To-Tenants" ヘッダーに含まれるようにします)

microsoftservices.onmicrosoft.com  
MSARealms.onmicrosoft.com

<font color="DeepSkyBlue">Q</font> : 制限されるのは Office 365 だけですか？

<font color = "red">A</font>  : いいえ。以下の認証エンドポイントを使用する、すべてのサービスが制限されます。

login.microsoftonline.com  
login.windows.net  
login.microsoft.com

例えば Azure ポータル、EA ポータルにアクセスする際も制限されます。また、ゲストユーザーの場合、招待されたテナントではなく、管理元のテナントで認証が行われるため、ゲストユーザーの招待元テナントも、テナント制限で許可する必要があります。

<font color="DeepSkyBlue">Q</font> : (クライアントですが)、テナント制限によってアクセスできないテナントにアクセスできるようにしてほしい。

<font color = "red">A</font> : 接続元のクライアントが利用するプロキシサーバーの設定変更が必要です。プロキシ サーバーを管理している IT 部門へ申請をあげるなどで、テナント制限の許可するリストに該当のテナントを追加してもらってください。

<font color="DeepSkyBlue">Q</font> : Azure AD 側での設定変更は必要ですか？

<font color = "red">A</font> : いいえ。プロキシの設定のみで、テナント制限が機能します。

<font color="DeepSkyBlue">Q</font> : "Restrict-Access-To-Tenants" に、ワイルドカードは利用できますか？

<font color = "red">A</font> : いいえ。テナント名かテナント ID を不足なく、入力する必要がございます。

<font color="DeepSkyBlue">Q</font> : テナント制限で許可をすることができるテナント数に上限はありますか？

<font color = "red">A</font> : テナント制限にて、許可をするテナント数自体には上限は設けられていません。しかし、ヘッダーの長さの上限 (MaxFieldLength) と、リクエストとヘッダーを含めた合計のサイズの上限 (MaxRequestBytes) があるため、多数のディレクトリを追加する場合、この上限を超えないように注意が必要です。

※ テナント名の平均を 30 文字 (30 バイト) とすると、ヘッダーにはテナント名を約 2,000 個追加できます。

MaxFieldLength の最大値: 65534 バイト (6K バイト)  
MaxRequestBytes 最大値: 16777216 バイト (16M バイト)

上記内容が、皆様のご参考になれば幸甚です。
