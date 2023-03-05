---
title: テナント制限について
date: 2023-03-02
tags:
  - Azure AD
  - Tenant Restrictions
  - テナント制限
---

> [!NOTE]
> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/09/13/tenant-restrictions/ の内容を移行したものです。
> 
> また本記事は 2018 年に公開したものですが、サポートへのお問い合わせ状況ならびにエラー画面の変更などをふまえ、2023 年 3 月時点での最新の情報にアップデートいたしました。

# テナント制限について

こんにちは！ Azure & Identity サポート チームの栗井です。

今回は Azure AD のテナント制限の機能に関して、よくあるお問い合わせと、その回答をご紹介いたします。

## テナント制限とは

テナント制限の機能では、ユーザーがアクセス可能な Azure AD テナントを制限することが可能です。

具体的には、クライアント端末から Azure AD に対する認証の通信をプロキシ経由させ、そのプロキシから送信されるデータに許可対象の Azure AD テナントの情報を付与します。その結果、それ以外の Azure AD テナントへのアクセスがブロックされる動作となります。

テナント制限の機能の詳細については、以下の公開情報をご参照ください。

- [公開情報: テナント制限を使用して SaaS アプリへのアクセスを管理する - Microsoft Entra | Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/tenant-restrictions)

テナント制限によって許可されていないテナントへアクセスを試行すると、下記のように 「ネットワーク管理者によってアクセスがブロックされました」というエラーメッセージが表示されます (エラーコード: AADSTS500021)。

![](./tenant-restriction/AADSTS500021.png)

以下にて、テナント制限に関連する FAQ をまとめました。ぜひご参照ください！

## よくあるお問い合わせ
<font color="DeepSkyBlue">Q</font> : テナント制限の機能のライセンス要件はありますか？

<font color = "red">A</font> : テナント制限のご利用には、Azure AD Premium P1 もしくは P2 相当のライセンスが必要です。

<font color="DeepSkyBlue">Q</font> : Microsoft アカウント (コンシューマー向けアカウント) によるアクセスを制限することは可能ですか。

<font color = "red">A</font> : はい、可能です。この場合は login.live.com 宛への通信に対してヘッダーを設定しますが、 “Restrict-Access-To-Tenants" とは異なるヘッダーを利用します。

Microsoft アカウントによるアクセスを制限する場合は、"sec-Restrict-Tenant-Access-Policy" ヘッダーに "restrict-msa" という値が含まれるように構成ください。
この設定によって、 Microsoft アカウントの認証エンドポイント (login.live.com) へのアクセスがブロックされます。

アクセス ブロック時のメッセージとエラーコードは下記の通りです。
- メッセージ: "ここからアクセスすることはできません お客様の IT 部門によって承認されていない組織に属するリソースへのアクセスを試みているようです。" 
- エラーコード: 80045C4D

![](./tenant-restriction/80045C4D.png)

<font color="DeepSkyBlue">Q</font> : 制限されるのは Office 365 だけですか？

<font color = "red">A</font>  : いいえ。以下の認証エンドポイントを使用する、すべてのサービス、言い換えますと Azure AD と連携するサービスが制限されます。

- login.microsoftonline.com  
- login.windows.net  
- login.microsoft.com

例えば Azure ポータル、EA ポータルにアクセスする際も制限されます。また、ゲストユーザーの場合、招待されたテナントではなく、管理元のテナントで認証が行われるため、ゲストユーザーの招待元テナントも、テナント制限で許可する必要があります。

<font color="DeepSkyBlue">Q</font> : (クライアントですが)、テナント制限によってアクセスできないテナントにアクセスできるようにしてほしい。

<font color = "red">A</font> : 接続元のクライアントが利用するプロキシサーバーの設定変更が必要です。プロキシ サーバーを管理している IT 部門へ申請をあげるなどで、テナント制限の許可するリストに該当のテナントを追加してもらってください。

テナント制限は設定をおこなったプロキシ経由でのアクセスに制限を加えるものですので、プロキシサーバーによる制限を受けないネットワーク環境から接続することでもテナント制限による制御は回避できます。

<font color="DeepSkyBlue">Q</font> : Azure AD 側での設定変更は必要ですか？

<font color = "red">A</font> : いいえ。プロキシの設定のみで、テナント制限が機能します。

<font color="DeepSkyBlue">Q</font> : "Restrict-Access-To-Tenants" に、ワイルドカードは利用できますか？

<font color = "red">A</font> : いいえ。テナント名かテナント ID を不足なく、入力する必要があります。

<font color="DeepSkyBlue">Q</font> : テナント制限で許可をすることができるテナント数に上限はありますか？

<font color = "red">A</font> : テナント制限にて、許可をするテナント数自体には上限は設けられていません。しかし、ヘッダーの長さの上限 (MaxFieldLength) と、リクエストとヘッダーを含めた合計のサイズの上限 (MaxRequestBytes) があるため、多数のディレクトリを追加する場合、この上限を超えないように注意が必要です。


上記内容が、皆様のご参考になれば幸甚です。
