---
title: Azure AD B2B ゲストユーザーの連絡先情報更新方法について
date: 2020-10-22
tags:
  - Azure AD
  - B2B
---

# Azure AD B2B ゲストユーザーの連絡先情報更新方法について

こんにちは、Azure Identity サポート チームの小田です。
今回は、Azure AD B2B ゲストユーザーの連絡先情報（電子メール / 連絡用メールアドレス）の更新方法についてご案内いたします。

Azure AD にて別組織のユーザーを招待しますと、テナントにゲストユーザーが作成されます。
ゲストユーザーの連絡先情報（電子メール / 連絡用メールアドレス）には、招待したときに指定したメールアドレスが設定され、
これらは Azure 側からの通知メール（計画メンテナンス、MFA の通知など）の宛先として使用されます。

ゲストユーザーが招待を承諾した後で、そのユーザーの実体が登録されているホームテナント側でメールアドレスの変更があった場合、
そのユーザーをゲストとして登録しているリソーステナント側では、メールアドレスの変更は反映されません。

そのため、ゲストユーザーがホームテナント側で持っている属性値（メールアドレス等）を修正する場合、
これまではゲストユーザーを一旦削除して「再招待」を実施するか、Microsoft Graph API、Exchange 管理センター、
または Exchange Online PowerShell 経由で更新する必要がありました。

しかしながら、2020 年 10 月現在、ゲストユーザーの連絡先情報（電子メール / 連絡用メールアドレス）は、Azure AD 管理センターにて編集可能になりました。
再招待を実施することなく、ゲストユーザーのメール アドレスの変更を変更する、その具体的な手順は、下記の通りです。

1. Azure ポータル（https://portal.azure.com/）にアクセスし、グローバル管理者もしくはユーザー管理者にてサインインします。
2. [Azure Active Directory] - [ユーザー] - [すべてのユーザー] - [編集対象のゲストユーザー] をクリックし、[プロパティ] を開きます。
3. [編集] をクリックし、「連絡先情報」を編集します。

![](./update-B2B-user-address/address-update-in-AzurePortal.png)

4. [保存] をクリックします。


参考情報

Azure Active Directory B2B コラボレーション ユーザーのプロパティ
https://docs.microsoft.com/ja-jp/azure/active-directory/external-identities/user-properties#can-i-update-a-guest-users-email-address


Changelog for Microsoft Graph
https://docs.microsoft.com/en-us/graph/changelog



なお、Azure ポータルでは、ゲストユーザーだけではなく、組織内ユーザーにおきましても電子メールを変更することが可能です。
組織内ユーザーは、Exchange Online のライセンスが割り当たっている可能性もありますので、このような場合は、 Exchange Online 側でメールアドレス操作を実施ください。


上記内容が少しでも参考となりますと幸いです。
※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。