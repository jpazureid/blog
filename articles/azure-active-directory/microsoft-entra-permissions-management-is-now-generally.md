---
title: Microsoft Entra Permissions Management が GA しました！
date: 2022-07-24 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# Microsoft Entra Permissions Management が GA しました！

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2022 年 7 月 7 日に米国の Azure Active Directory Identity Blog で公開された [Microsoft Entra Permissions Management is now generally available!](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-permissions-management-is-now-generally/ba-p/3290630) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

皆さん、こんにちは。

当社は、企業のマルチクラウド戦略を支援するというミッションの一環として、[昨年夏、Cloud Infrastructure Entitlement Management (CIEM) 分野のリーダーである CloudKnox Security 社を買収](https://blogs.microsoft.com/blog/2021/07/21/microsoft-acquires-cloudknox-security-to-offer-unified-privileged-access-and-cloud-entitlement-management/) しました。また、[2 月にはこのソリューションのパブリック プレビューを開始](https://jpazureid.github.io/blog/azure-active-directory/cloudknox-permissions-management-is-now-in-public-preview/) しました。それ以来、GDPR 対応、ローカライゼーション、自動でのオンボーディングなどの機能拡張を行い、GA に向けて準備を進めてきました。  

本日、[Microsoft Entra のポートフォリオ](https://www.microsoft.com/security/blog/2022/05/31/secure-access-for-a-connected-worldmeet-microsoft-entra/) の一部として、[Microsoft Entra Permissions Management](https://aka.ms/PermissionsManagement) (旧 CloudKnox) の一般提供 (GA) を発表できることを嬉しく思います。Permissions Management は、スタンドアロンのソリューションとして、1 リソースあたり年間 125 ドルで本日より提供されます。対応するリソースは、Amazon Web Services、Microsoft Azure、Google Cloud Platform のコンピュート リソース、コンテナ クラスター、サーバーレス機能、およびデータベースです。それでは、製品の特長とアップデートの一部をご紹介します。

[Microsoft Entra Permissions Management の紹介動画](https://www.microsoft.com/en-us/videoplayer/embed/RE50qYJ)

## 1 つの統一プラットフォームであらゆるクラウドに存在するあらゆる ID のアクセス許可を管理

Microsoft Entra Permissions Management は、マルチクラウド環境におけるすべての ID (人とワークロードの両方) とリソースのアクセス許可を検出、修復、監視します。アクセス許可の使用状況を継続的に監視し、履歴データを使用してクラウドの規模で最小特権の原則を適用することで、生産性を妨げることなくセキュリティ体制を強化することができます。

- **発見する**: すべての ID がすべてのリソースで実行したすべてのアクションを詳細に可視化し、許可されたアクセス権と使用されたアクセス権を監視して、アクセス許可に関するリスクを評価します。
- **修正する**: 実際の使用状況に基づいて最小特権の原則を適用し、追加許可が必要な場合はアクセス許可をその時のみ付与するオンデマンドのワークフローを活用して、アクセス許可のギャップ (付与されているアクセス許可と実際に必要なアクセス許可の差) を解消します。
- **監視する**: すべてのアクティビティを継続的に監視し、異常なアクセス許可の使用を検出し、詳細なフォレンジック レポートを作成して、迅速な調査と修正をサポートします。

![](./microsoft-entra-permissions-management-is-now-generally/Entra-Onboarding-GIF-v2A2.gif)

## オンボーディングと監視機能の機能強化

GA リリースの一環として、AWS、Azure、GCP 環境を Permissions Management に取り込むための、新しい自動化されたアプローチを導入しています。シンプルなワークフローにより、数回クリックするだけで、クラウド全体のアクセス許可のデータを効率的に収集することができます。

Microsoft のポートフォリオとの統合を進めるため、ユーザーは Permission Creep Index を監視し、[Defender for Cloud のダッシュボード](https://azure.microsoft.com/en-us/services/defender-for-cloud/) から直接 Permissions Management にアクセスすることも可能になりました。これにより、Defender for Cloud の保護を CIEM でさらに広げることができるようになりました。

これはまだ始まりに過ぎません。弊社では積極的に統合と機能を拡大しており、今年後半にそれらの展開を開始する予定です。GA リリースの詳細については、Permissions Management の [ドキュメント](https://aka.ms/CIEM) をご覧ください。

## Microsoft Entra Permissions Management を今すぐお試しください

Microsoft Entra Permissions Management の 90 日間無料トライアルを提供しています。これにより、包括的なリスク評価を実施し、マルチクラウド基盤全体でアクセス許可のリスクを特定することが可能となります。

オンボーディングから数時間以内に、Permissions Management が包括的な Permissions Analytics Report を生成し、お客様の組織の最大のリスク領域を特定し、環境を改善および保護するための具体的なアドバイスを提供します。無料のリスク アセスメントは、[aka.ms/TryPermissionsManagement](https://aka.ms/TryPermissionsManagement) からご用命ください。

Microsoft Entra Permissions Management の詳細については、[弊社の Web サイト](https://aka.ms/PermissionsManagement) および [製品ドキュメント](https://aka.ms/CIEM) をご覧ください。また、7 月 19 日午前 9 時 (太平洋標準時) に開催される [Ask Me Anything セッション](https://aka.ms/PermissionsManagementAMA) に、当社のセキュリティ専門家が参加し、ご質問をお受けいたしますので、ぜひご参加ください。

Alex Simons (Twitter: [@Alex_A_Simons](https://twitter.com/Alex_A_Simons))  
Corporate Vice President Product Management  
Microsoft Identity Division  
