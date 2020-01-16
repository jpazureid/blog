---
title: \[ベースライン ポリシー\] から \[セキュリティの既定値\] への移行
date: 2020-01-16
tags:
  - Azure AD
---

# \[ベースライン ポリシー\] から \[セキュリティの既定値\] への移行

機能を限定版の Azure AD の多要素認証 (MFA) を実現するためのものとして 2020 年 1 月時点では、”ベースライン ポリシー” (条件付きアクセスの [ベースライン ポリシー] プレビュー機能) があります。  
ベースライン ポリシーを有効にすることで、特定のディレクトリ ロールを持つユーザーに対して MFA を要求するなどのベースライン レベルのセキュリティを、追加の費用なしで有効にすることができます。

※ベースラインポリシーの詳細はこちらでご確認ください。

ベースライン ポリシーとは ?  
https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-baseline-protection

しかし、ベースライン ポリシーはプレビュー機能として公開していましたが、[セキュリティの既定値] という新機能 (無料) に置き換えられており、2020 年 2 月 29 日に機能が削除されることが予定されております。  
これにより、すべてのテナントからベースライン ポリシーが削除されます。

現在、ベースライン ポリシーを有効にしているテナントでは、ポリシーが削除されることにより MFA の要求がされなくなりますので、  
ベースライン ポリシーを有効にしているテナントの管理者は、お早めに [セキュリティの既定値] への移行をご検討いただければと思います。


[セキュリティの既定値] の有効化手順:
1. Azure ポータル (https://portal.azure.com) にグローバル管理者でサインインします。
2. [その他のサービス] – [Azure Active Directory] をクリックします。
3. [プロパティ] をクリックします。
4. [セキュリティの既定値の管理] をクリックします。
5. [セキュリティの既定値の有効化] を [はい] に設定します。
6. [保存] をクリックします。

セキュリティの既定値の詳細はこちらでご確認ください。

セキュリティ デフォルトとは  
https://docs.microsoft.com/ja-jp/azure/active-directory/fundamentals/concept-fundamentals-security-defaults


なお、ベースライン ポリシーを有効にしていないテナントでは、特に影響はありません。  
ただし、セキュリティ強化のため、[セキュリティの既定値] を有効にすることをお勧めいたします。

また、Azure AD Premium ライセンスをお持ちの場合、[セキュリティの既定値] よりも高度かつ柔軟なセキュリティ機能をご利用いただくことができます。(条件付きアクセスや Azure AD Identity Protection など)  
Azure AD Premium ライセンスをまだお持ちでない方も、是非ご検討いただければと思います。

Azure AD Premium の機能  
https://azure.microsoft.com/ja-jp/pricing/details/active-directory/

[よくあるご質問]  
ここからは、よくいただきご質問と回答をご紹介します。

質問  
ベースライン ポリシーが現在有効となっているかは、どうやって確認しますか？

回答  
1. Azure ポータル (https://portal.azure.com) にグローバル管理者でサインインします。
2. [その他のサービス] – [Azure Active Directory] をクリックします。
3. 左メニューの [セキュリティ] をクリックします。
4. 左メニューの [条件付きアクセス] をクリックします。
次のポリシーの状態がオンになっていれば有効です。オフの場合は無効です。

Baseline policy: Require MFA for admins (プレビュー)  
Baseline policy: End user protection (プレビュー)  
Baseline policy: Block legacy authentication (プレビュー)  
Baseline policy: Require MFA for Service Management (プレビュー)

質問  
[セキュリティの既定値] を有効にできない ([保存] をクリックできない)

回答  
Azure AD Premium ライセンスのあるディレクトリで、条件付きアクセスや ID 保護ポリシーが有効になっている場合、[セキュリティの既定値] を有効にできません。  
これらの機能は、[セキュリティの既定値] よりも高度かつ柔軟な設定が可能ですので、[セキュリティの既定値] は無効のままとして、引き続きこれらの機能をご利用ください。


質問  
[セキュリティの既定値] を有効にする際にベースライン ポリシーが削除されると表示されるが、実行しても大丈夫か。

回答  
ベースライン ポリシーは、間もなく (2020 年 2 月 29 日) の段階で削除を予定しているプレビュー機能になります。  
セキュリティの既定値を有効にすると、自動的にすべてのベースライン ポリシーが削除され、[セキュリティの既定値] を無効にしても、ベースライン ポリシーは復元されません。


質問  
[セキュリティの既定値] を有効にした後に、Azure にサインインをすると、[詳細情報が必要] という画面が表示される。

 << OLE Object: Picture (Device Independent Bitmap) >> 


回答  
[セキュリティの既定値] の機能により、グローバル管理者など管理者アカウントは、サインイン時に MFA が要求されるようになります。  
また、それ以外のユーザーも Azure ポータルや Azure CLI 等の利用を試みる際に MFA が要求されます。  
対象となるアカウント、操作については以下の情報を参照ください。

セキュリティ デフォルトとは  
https://docs.microsoft.com/ja-jp/azure/active-directory/fundamentals/concept-fundamentals-security-defaults

また、初回サインイン時に、MFA 認証用のモバイル アプリ (Microsoft Authenticator) のインストールとアカウントの追加の操作が必要となりますので、iOS、Android デバイスをご用意ください。

Microsoft Authenticator アプリの使い方  
https://support.microsoft.com/ja-jp/help/4026727/microsoft-account-how-to-use-the-microsoft-authenticator-app

[詳細情報が必要] 画面で画面の指示に従い、Authenticator アプリにアカウントを追加することで、Azure にサインインすることができます。  
次回以降は、パスワード認証後に、Authenticator アプリに通知が送信されるので、これに応答することで Azure にサインインすることができます。

