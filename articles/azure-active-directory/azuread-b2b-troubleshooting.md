---
title: 招待したユーザーが利用できない
date: 2017-11-27
tags:
  - Azure AD B2B
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/11/27/azuread-b2b-troubleshooting/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# 招待したユーザーが利用できない

こんにちは、Azure & Identity サポート チームの坂井です。

今回は Azure AD に招待したはずのユーザーが利用できない際の確認ポイントについて説明します。

Azure AD へのユーザー招待は、明示的に Azure Active Directory の管理画面からゲストユーザーを追加した場合だけでなく、 Azure のサブスクリプションに対して 「所有者」 や 「仮想マシン共同作成者」 の役割を追加したときにも、その追加したユーザーが Azure AD にすでに追加済みでなければ、この役割を追加したタイミングでユーザーの招待も行われます。

ユーザーの招待処理が完了していないと、役割を割り当てたが、サブスクリプションの利用ができないというような状況になります。
そのような状況の場合は、まずはじめに Azure ポータルにて招待状況を確認しましょう。

## 詳細

招待先のディレクトリの管理者権限を持つユーザーで下記を確認します。

[Azure Active Directory] – [ユーザーとグループ] – [すべてのユーザー] から該当のユーザーを選択します。

「ソース」 (赤枠) の項目が「ユーザーが招待されました」の場合は、招待メールは送信されているものの、該当のユーザーが招待を受け付けたという操作を完了していない状態を示します。
招待を受けたユーザーは送信されたメールに含まれる [はじめに] のリンクをクリックしてウィザードを完了させる必要があります。

なお、招待メールが届いていない場合、緑枠部分の「招待の再送信」から再送も可能です。

![](./azuread-b2b-troubleshooting/resend.png)

招待メールは下記のようなメールです。

<!-- textlint-disable -->
アドレス：invites@microsoft.com
件名　　：<テナント名>組織に招待されました

![](./azuread-b2b-troubleshooting/sampleEmail.png)
<!-- textlint-enable -->

もし、メールが利用できない場合や、メール ボックス作成前の場合は、「招待の再送信」後に表示される下記、「招待の URL ※」をコピーした後　その URL にブラウザーアクセスすることで招待作業を進めることができます。

※招待メールの「はじめに」を押す場合と同等の操作になります。

![](./azuread-b2b-troubleshooting/invitationURL.png)

ソース部分が 「ユーザーが招待されました」 ではなく、「外部の Azure Active Directory」となっている場合は、ユーザーの招待は完了しています。

「外部の Azure Active Directory」の状態で、期待したサブスクリプションの操作や Azure AD テナントの確認ができない問題の場合は、適切なアカウントや Azure AD を選択できていない可能性がありますので、一度こちらのリンクの内容をご確認ください。

## 参考

招待メールに含まれるリンクをクリックし、ウィザードを進めた結果、次のような「管理者にお問い合わせください」との画面が表示されることがありますが、こちらは問題なく招待が完了していますのでご安心ください。

![](./azuread-b2b-troubleshooting/accesspanel.png)

これは、特に割り当てられたアプリケーションがないことを意味しており、招待自体は正常に完了したことを示します。

## おわりに

上記内容でもご要望の動作が完了しない場合は、ぜひ弊社サポートサービスをご利用ください。

なお、その際は下記の情報を事前にご提供いただけると幸いです。

<!-- textlint-disable -->
- 招待先のディレクトリ (例：xxx.onmicrosoft.com)
- 招待操作を行ったユーザー名 (例：xxx@contoso.com)
- 招待したいユーザーのメールアドレス (例：xxx@test.co.jp)
- 問題となっている状況の詳細と問題なっている動作の画面ショット

例：招待メールの操作が完了しない
    招待後にディレクトリにアクセスできない
<!-- textlint-enable -->

また、招待メールを使用しないユーザーの追加や CSV を使用した一括招待の方法については、下記の情報を参照ください。
招待メールを使用しないユーザーの追加方法

https://blogs.technet.microsoft.com/jpazureid/2017/11/27/azuread-b2b-add-user-without-invite

Azure Active Directory B2B collaboration code and PowerShell samples
https://docs.microsoft.com/en-us/azure/active-directory/active-directory-b2b-code-samples

上記内容が少しでも皆様の参考となりますと幸いです。
