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

以前の記事 [Get last-sign-in activity reports](https://github.com/jpazureid/get-last-signin-reports) でユーザーの最終サインイン日時の取得をご紹介させていただきましたが、下記の制約がありました。

- サインイン ログの保存期間により、30 日以上前のサインイン日時は確認できません。  
- サインインのログから一覧を取得しているため、厳密な ”最終アクセス日時” とは異なります。  

新たに Microsoft Graph API の lastSignInDateTime プロパティを取得することで、上述の制約を解消し、実際に Azure AD に長期間サインインを行っていないユーザーを取得することが可能となりました。
  
 Azure AD で非アクティブなユーザー アカウントを管理する  
 https://docs.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/howto-manage-inactive-user-accounts  
  
上記 Beta API を利用し、組織内のユーザーとその最終サインイン日時、最後に利用したクラウド アプリケーションを一覧で CSV 形式ファイルで取得するまでを GitHub にサンプルとしてお纏めしました。  
  
具体的な設定手順も README.md に記載しておりますので、以下のページをご確認くださいませ。

- [Get last-sign-in activity reports (beta API 利用)](https://github.com/jpazureid/get-last-signin-reports/tree/beta)

なお、前述の制限がある従来のサンプルも、新たに設定手順をスクリーンショット付きで記載しておりますので、こちらもぜひご確認くださいませ。

- [Get last-sign-in activity reports (v1.0 API 利用)](https://github.com/jpazureid/get-last-signin-reports/tree/master)
