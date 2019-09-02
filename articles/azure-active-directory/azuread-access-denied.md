---
title: 「アクセス権がありません」のエラーについて
date: 2017-11-20
tags:
  - Azure AD
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/11/20/azuread-access-denied/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# 「アクセス権がありません」のエラーについて

こんにちは、Azure & Identity サポート チームの坂井です。



今回は Azure ポータル上で表示される Azure AD に関するエラーメッセージについて説明します。

Azure ポータル上で、[Azure Active Directory] を選択した際に、下記のエラーが表示される場合があります。



---------------------

アクセスが拒否されました



アクセス権がありません



このコンテンツへのアクセス権がないようです。アクセス権を得るには、所有者に連絡してください。

---------------------



画面は下記のような表示です。

![](./azuread-access-denied/azuread-access-denied.png)

こちらは、エラーメッセージの通りアクセスしようとしたユーザーの権限が不足している状況を示すエラーになります。

ここでいう、権限とはサブスクリプションの権限 (RBAC で付与した所有者の権限など) とは異なる、Azure AD の権限となります。

サブスクリプションの管理者と Azure AD の管理者の説明については、下記のブログをご確認ください。



- 参考情報

[Azure サブスクリプションと Azure AD の管理者](./subscription-azure-ad-relationship.md)





詳細
下記、 [Azure AD 管理ポータルへのアクセスを制限する] が「はい」に設定されている場合は、Azure AD の管理者権限を持ったユーザーのみが [Azure Active Directory] を参照できるようになります。

こちらを「いいえ」に設定することで、一般のユーザーでも [Azure Active Directory] 配下の参照が可能になりますが、設計上「はい」にする必要がある場合は、個別のユーザー毎に下記の回避策をご実施ください。


![](./azuread-access-denied/azuread-portal.png)




回避策
Azure AD ディレクトリの全体管理者の権限をもつユーザーで、Azure ポータル (https://portal.azure.com) へサインインします。
[Azure Active Directory] - [ユーザーとグループ] - [すべてのユーザー] - [（権限を付与する）ユーザー] の順に選択します。
[ディレクトリ ロール] をクリックします。
全体管理者 (または制限付き管理者) を選択して [保存] をクリックします。


管理者の種類と役割については、下記の弊社公開情報をご確認ください。



Azure Active Directory での管理者ロールの割り当て

https://docs.microsoft.com/ja-jp/azure/active-directory/active-directory-assign-admin-roles







上記内容が少しでもお客様の参考となりますと幸いです。