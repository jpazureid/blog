
---
title: Azure AD から Amazon Managed Grafana へのアクセス保護について
date: 2021-09-05 12:00
tags:
  - Azure AD
  - US Identity Blog
---

# Azure AD から Amazon Managed Grafana へのアクセス保護について

こんにちは、Azure Identity サポート チームの竜です。

本記事は、2021 年 6 月 23 日に米国の Azure Active Directory Identity Blog で公開された [Secure access to Amazon Managed Grafana with Azure AD
](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/secure-access-to-amazon-managed-grafana-with-azure-ad/ba-p/2115721) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

お客様が利用しているアプリケーションやサービスは、クラウドやプラットフォームなどに幅広くわたっています。そのため、私たちのアイデンティティ・ソリューションは、プラットフォーム間でシームレスかつ安全に動作し、すべてのクラウドやアプリケーションに拡張することをお約束します。 弊社の目標は、お客様がアプリケーションの構築にどのクラウド プロバイダーを使用していても、[お客様のすべてのアプリケーション、サービス、データのセキュリティを確保すること](https://www.microsoft.com/ja-jp/security/business/identity-access-management/secure-app-access?rtc=1)です。そのため、本日、[Azure AD の アプリ ギャラリーにてAmazon Managed Grafana が利用できるようになりました](https://docs.microsoft.com/ja-jp/azure/active-directory/saas-apps/amazon-managed-grafana-tutorial) ことを発表いたしました。


[Amazon Managed Grafana](https://aws.amazon.com/grafana/) を Azure AD のアプリ ギャラリーに統合済みのアプリとして提供することで、シングル サインオンの設定や条件付きアクセス ポリシーの適用を迅速に行い、適切なユーザーが Amazon Managed Grafana にアクセスできるようになりました。Grafana は人気の高いオープン ソースの分析プラット フォームです。Grafana をご利用いただくことで、メトリックの保存場所に関わらず、メトリックに対してクエリー、アラート、可視化することが可能になり、メトリックを理解することができます。さらに、Amazon Managed Grafana を利用しますと、お客様はサーバーのプロビジョニング、ソフトウェアの設定と更新、および本番環境において Grafana のセキュリティとスケーリングに関わる作業をすることなく、メトリック、ログ、トレースを分析することができます。

![](./secure-access-to-amazon-managed-grafana-with-azure-ad/BrowseAADGallery.png)


弊社の Azure AD と Amazon Managed Grafana の統合は、今年初めに発表した [AWS SSO 統合](https://docs.microsoft.com/ja-jp/azure/active-directory/saas-apps/aws-single-sign-on-tutorial)を補完するものです。お客様は Azure AD と Amazon Managed Grafana を直接統合いただくこともできますし、AWS SSO 統合を利用してAWS サービス全体で Azure AD のユーザーとグループを一元管理することもできます。

Amazon Managed Grafana を Azure AD で保護する方法の詳細につきましては、[公開資料](https://docs.microsoft.com/ja-jp/azure/active-directory/saas-apps/amazon-managed-grafana-tutorial) や [Amazon Managed Grafana の ウェブ ページ](https://aws.amazon.com/grafana/)でにてご確認ください。

いつものように、コメントや [Twitter（@AzureAD)](https://twitter.com/azuread) にて皆様のご意見やご感想をお聞かせください。