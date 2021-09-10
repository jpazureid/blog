---
title: HashiCorp 社の Azure AD プロバイダーがMicrosoft Graphに移行し、パフォーマンスとユーザーエクスペリエンスが向上保
date: 2021-09-13 9:00
tags:
  - Azure AD
  - US Identity Blog
　- Microsoft Graph
---

こんにちは、Azure Identity サポート チームの中井です。

本記事は、2021 年 9 月 1 日に米国の Azure Active Directory Identity Blog で公開された [HashiCorp’s Azure AD Provider Migrates to Microsoft Graph, Improving Performance and User Experience](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/hashicorp-s-azure-ad-provider-migrates-to-microsoft-graph/ba-p/2115720) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

------

こんにちは。Identity ＆ Access Management プログラム マネジメント担当 パートナーディレクターの Sue Bohn です。今回の Voice of the ISV ブログ記事では、HashiCorp 社のシニアエンジニアである Tom Bamford 氏をお招きし、同社の Terraform Azure AD プロバイダーの新しいMicrosoft Graph API への移行についてご紹介します。HashiCorp 社は、[2022年6月30日のサポート終了日](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) よりも大幅に前倒しで、Azure AD Graph と Azure Active Directory Authentication Library (ADAL) からの移行を表明しました。トム氏によると、この決断はすでに成果を上げているといいます。

# ソリューション型ソフトウェアの構築
[HashiCorp](https://www.hashicorp.com/) は、アプリケーションの開発、配信、保守などのデータセンター管理に革命を起こすことを目的として2012年に設立されたオープンソースソフトウェア企業です。同社のツールは、物理マシンと仮想マシン、Windows、Linux、SaaS、IaaSの両方を管理しており、ギャップを超えたソリューションを構築、次世代技術のサポートに尽力しています。本社はサンフランシスコにありますが、約1,500人の従業員のうち約 80 ％はリモートで勤務しています。

# Terraform の Azure AD との連携
[HashiCorp Terraform](https://www.hashicorp.com/products/terraform) は、インフラの構築、変更、バージョン管理を安全かつ効率的に行うことができる Infrastructure as Code (IaC）ツールです。Terraform を使用することで、企業の構造や目標に合わせて構成を設計し、チーム間で委任し、セルフサービスのインフラストラクチャを実現することができ、さらに説明責任を維持することができます。[Terraform Azure AD プロバイダー](https://www.hashicorp.com/blog/terraform-azuread-provider-now-supports-microsoft-graph)は、[Azure Active Directory（Azure AD)](https://azure.microsoft.com/en-us/services/active-directory/) のリソースを Terraform で管理できるようにします。私たちの目標は、Azure AD をより親しみやすく、利用しやすくし、お客様に素晴らしいワークフローを提供することです。また、[HashiCorp Vault](https://www.hashicorp.com/products/vault) はユーザーに代わって認証プリンシパルを管理し、Azure AD と密接に連携しています。
![](./hashicorp-s-azure-ad-provider-migrates-to-microsoft-graph/Hashcorp.png)

# 変化への対応
オープンソースのソフトウェア企業として、私たちはお客様に最大限の価値を提供するために、製品をオープンに構築しています。私たちは、マイクロソフトが、今後すべての新しいアイデンティティ管理機能が、[Microsoft Authentication Library（MSAL）](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-migration) と Microsoft Graphでのみ利用できると発表した 2019 年から、[Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) の開発を注視してきました。私たちは、Azure AD Graph APIとActive Directory Authentication Library（ADAL）の[サポート終了日である2022年6月30日](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) よりも十分に前に、お客様が良い状態で利用できるようにするために、早急に新しいAPI にコミットしたいと考えていました。Azure ADは常に更新されているため、古いAPIに頼ることは時間の経過とともに難しくなります。

# Microsoft Graphへの移行
Microsoft Graph への移行は、2年というスケジュールが私たちにはぴったりでした。マイクロソフトが[ドキュメントとサポート](https://docs.microsoft.com/en-us/graph/migrate-azure-ad-graph-planning-checklist?view=graph-rest-1.0) に多大な投資をしてくれたおかげで、移行作業は非常に簡単でした。私たちの最大の関心事は、移行の過程でお客様との互換性を保つことでした。現在では、お客様が新しい Microsoft Graph API への移行を選択した場合でも、ディレクトリ内のリソースに望ましくない変更を加えることなく、また設定を更新することなく移行することができます。

# お客様の成功のために
私たちは[包括的な移行ガイド](https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/guides/microsoft-graph) を作成し、Terraformが Graph API を認証するために必要なプリンシパルから、リソースの設定更新まで、お客様の構成の更新を支援しました。このガイドには、既存のリソースやデータソースに加えられた変更も含まれています。Microsoft Graph API へのプロバイダの移行は、メジャー バージョンのリリース（v2.0.0）に対応しているため、お客様は変更点を認識しています。また、移行ガイドには、Microsoft Graphのパーミッションの変更について説明するセクションがあります。移行作業中のお客様には、新機能のご紹介は控えさせていただきました。また、Azure AD Graphのサポートを終了する一方で、Microsoft Graphのファーストクラスのサポートを開始しています。

さらに、TerraformとAzure AD v2.0.0プロバイダの使用方法を説明したチュートリアル[「Manage Azure Active Directory Users and Groups Learn」](https://learn.hashicorp.com/tutorials/terraform/azure-ad) を作成しました。このチュートリアルでは、Terraform と Azure AD v2.0.0プロバイダーの使用方法を説明しています。本チュートリアルにて、Terraform の設定言語、Terraform Azure ADプロバイダー、およびワークフローの簡素化と自動化のために両者を活用する方法を学ぶことができます。

# パフォーマンスとユーザーエクスペリエンスの向上
Microsoft Graph に移行してからすぐ、パフォーマンスの向上が見られ、より良いユーザーエクスペリエンスを実現しています。従来の API では、リソースに加えられた変更を確認するために、カスタムのポーリングメカニズムを設定する必要がありました。 Microsoft Graph API では、応答時間が大幅に短縮され、データの一貫性が向上することでこれらの課題解決に寄与し、お客様から寄せられる多くの機能の要望を実現できるようになるでしょう。

お客様にとって最も大きなメリットは、Microsoft Graph APIの信頼性が向上したことです。Azure AD Graphを使用する以前のプロバイダーでは、お客様は特定の操作を行うために、プリンシパルに管理用のディレクトリロールを割り当てる必要がありました。Microsoft Graphでは、パーミッションがより細かく管理され、監査やメンテナンスが可能になります。また、お客様のテナントとその関連製品を自動化するために、より広範囲のサービス機能を提供することができるようになります。

# 教訓と今後の展望
今回の移行を計画している開発者は、スキーマの違いが、主にアプリケーションを中心としたテナントの特定の構成に影響を与える可能性があることを考慮してください。また、移行中も継続的な可用性を維持できることを確認し、追跡が困難な変更を不用意に行ってしまわないようにしてください。綿密な計画を立てれば、シームレスに移行することができます。
