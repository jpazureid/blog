---
title: "最終サインイン日時を一括で取得する方法"
date: 2020-09-30 00:00
tags:
  - Azure AD
  - signin log
  - ログ取得
---

# 最終サインイン日時を一括で取得する方法

こんにちは、Azure Identity サポート チームの谷です。

Microsoft Graph API の lastSignInDateTime プロパティを取得することで、実際に Azure AD に長期間サインインを行っていないユーザーを取得することが可能です。
  
 Azure AD で非アクティブなユーザー アカウントを管理する  
 https://docs.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/howto-manage-inactive-user-accounts  
  
上記 API を利用し、組織内のユーザーとその最終サインイン日時、最後に利用したクラウド アプリケーションを一覧で CSV 形式ファイルで取得するまでを GitHub にサンプルとしてお纏めしました。  
  
具体的な設定手順も README.md に記載しておりますので、以下のページをご確認くださいませ。

- [Get last-sign-in activity reports (SignInActivity から取得)](https://github.com/jpazureid/get-last-signin-reports/tree/master)


なお、上記 signInActivity が一般公開されるまでは、サインイン ログから逆算し最終サインイン ログを求めるスクリプトをご案内しておりました。
制限がある従来のサンプルについては、old タグにて保存しておりますので旧来のスクリプトを確認されたい場合には以下をご確認ください。

- [Get last-sign-in activity reports (サインイン ログから取得)](https://github.com/jpazureid/get-last-signin-reports/tree/old)

> [!IMPORTANT]
> こちらで紹介するサンプル スクリプトについては、あくまでもサンプルの情報となります。
> 運用環境でそのまま利用されることは想定しておらず、ご利用の際には、十分な検証作業を実施をお願いします。
> 執筆時点以降のクラウド サービスの動作変更に伴い、大幅な改変が必要となることがあります。
> (本情報の執筆時点でテスト環境における検証作業は実施していますが、動作を保証するものではありません)

> [!NOTE]
> また、サンプルについてのサポート サービスの提供はしておりません。
> 恐れ入りますが、スクリプトを利用したことで生じる影響、スクリプトの改変や、スクリプトの動作に関するご質問については、 Azure 技術サポートにて受け付けることができない場合があります。
> サンプル スクリプトが動作しない場合などは、 Github Issue やプル リクエストでのレポートをお願いいたします。
