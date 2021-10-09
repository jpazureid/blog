---
title: ゼロ トラスト ソリューション提供パートナーを支援する統合ガイダンスのご紹介
date: 2021-10-10 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# ゼロ トラスト ソリューション提供パートナーを支援する統合ガイダンスのご紹介

こんにちは、Azure Identity サポート チームの 村上 です。

本記事は、2021 年 10 月 6 日に米国の Azure Active Directory Identity Blog で公開された [Integration guidance helps partners deliver Zero Trust solutions](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/integration-guidance-helps-partners-deliver-zero-trust-solutions/ba-p/2810650) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

優れた製品を作るには、お客様のニーズに耳を傾けることが大切です。弊社では、お客様よりゼロ トラストの導入がこれまで以上に重要であるという強い声をいただいております。2021 の [ゼロ トラスト導入レポート](https://www.microsoft.com/security/blog/2021/07/28/zero-trust-adoption-report-how-does-your-organization-compare/) より、セキュリティの意思決定者の 96% が、企業の成功にはゼロ トラストが不可欠であると述べており、76% の企業が少なくともゼロ トラスト戦略の導入を開始していることがわかっています。今後 2、3 年の間、ゼロ トラスト戦略はセキュリティの最優先事項であり続けると予想され、企業はそれに対する投資を増やすと考えられています。

ゼロ トラストの導入は、米国政府でも加速しています。2021 年 5 月、ホワイト ハウスは、ゼロ トラスト アーキテクチャへの移行を含む、国のサイバー セキュリティの改善を求める [大統領令](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/) に署名しました。直近では、アメリカ合衆国行政管理予算局 (Office of Management and Budget) が、2024 年 までに達成すべき主要な目標として、ゼロ トラスト アーキテクチャに向けた [連邦戦略のドラフト](https://www.whitehouse.gov/omb/briefing-room/2021/09/07/office-of-management-and-budget-releases-draft-federal-strategy-for-moving-the-u-s-government-towards-a-zero-trust-architecture/) を発表しました。マイクロソフトは、[大統領令の目標を達成するための顧客ガイダンスとリソース](https://www.microsoft.com/en-us/federal/CyberEO.aspx) を公開しています。

お客様がエンド ツー エンド (end-to-end) でゼロ トラストのセキュリティ体制を目指すなか、このような政府や業界の要請は、お客様へのサポートを強化する上で、マイクロソフトとパートナーにとって大きな機会となります。マイクロソフトでは、お客様が最も包括的なセキュリティ ソリューションを容易に導入できるよう、独立系ソフトウェア ベンダーなどのパートナーとの連携に努めています。私たちは、お客様がゼロ トラストという目標に到達するために様々な道筋を経る必要があること、そして、すでに複数のセキュリティ ソリューションをお持ちであることを認識しています。私たちが協力し、お客様のニーズに応えることで、企業や国家をより強固に守ることができるのです。

パートナーの統合とゼロ トラストへの対応をサポートするために、ゼロ トラスト ガイダンス センターにおいて [パートナー統合ガイダンス](https://docs.microsoft.com/ja-jp/security/zero-trust/integrate/overview) を公開しました。このガイダンスは、ゼロ トラストの基本概念に沿って構成されており、さまざまな製品やパートナーとの統合を支援するものです。以下にその例を示します。

- [貴社のソリューションを Azure Active Directory と統合](https://docs.microsoft.com/ja-jp/security/zero-trust/integrate/identity) することで、リスク シグナルを共有し、顧客の信頼を高めると共に、高度なソリューション シナリオをサポートします。
- [Microsoft Endpoint Manager](https://docs.microsoft.com/ja-jp/security/zero-trust/integrate/endpoints#microsoft-endpoint-manager) API を使用して、従業員が使用しているデバイスのコンプライアンスを確保します。
- [Azure Sentinel との統合](https://docs.microsoft.com/ja-jp/security/zero-trust/integrate/visibility-automation-orchestration) により、顧客がよりデジタル資産全体を俯瞰できるよう強化します。

セキュリティ ソリューションにゼロ トラスト アプローチを取り入れている企業を非常に嬉しく思います。以下にこれら企業の例として、ISV パートナーである F5 と Yubico が、ゼロ トラスト ガイダンス センターのパートナー統合ガイダンスからどのように活用したかご紹介します。

## F5 とマイクロソフトがマルウェアからダーラム郡 (ノース カロライナ州) を救う 

![](./integration-guidance-helps-partners-deliver-zero-trust-solutions/F5.PNG)

多くの企業では、SAML や OIDC などの最新の認証プロトコルが採用される前に開発された基幹業務アプリケーションに依存しています。これは、ユーザを認証するために複数の方法を管理しなければならないことを意味し、結果としてユーザー体験を複雑にし、さらに、コストも増加させます。
[BIG-IP Access Policy Manager (APM)](https://www.f5.com/products/security/access-policy-manager) は、アプリケーション、API、データへのアクセスを一元化する F5 のアクセス管理プロキシ ソリューションです。BIG-IP APM を、Microsoft Azure AD と統合することで、BIG-IP APM のユーザー インターフェイスへの [条件付きアクセス](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/overview) を実現できます。

ダーラム郡 (アメリカ合衆国ノース カロライナ州に位置する郡) は昨年、深刻なサイバー セキュリティ事件をきっかけに、[Azure AD と F5 BIG-IP APM を用いて、ハイブリッド環境のセキュリティを強化](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/durham-county-enhances-security-across-a-hybrid-environment-with/ba-p/1633530) しました。F5 BIG-IP APM により、従業員は従来のレガシーなオンプレミスのアプリにアクセスするために必要な統合ソリューションを得ることができました。F5 は、Azure AD を使用して、すべてのアプリにセキュリティ制御を適用するとともに多要素認証を強制し、従業員のログイン場所などの状況に順応したポリシーを適用しています。さらに、このソリューションを利用したセルフ サービスのパスワード リセットにより、パスワードに関するヘルプデスクへの問い合わせが 80% 減少しました。

【動画】 [F5 and Microsoft Rescue a County From Malware](https://www.youtube.com/watch?v=jokwi85vVTA)

## ヌナブト州政府、ランサムウェア攻撃を受けて Yubico と Microsoft にフィッシング対策を依頼

![](./integration-guidance-helps-partners-deliver-zero-trust-solutions/yubico.png)

2019 年、カナダのヌナブト州政府はスピア フィッシング攻撃を受け、同州の重要な IT リソースがダウンした状態となりました。この攻撃を受け、ID とアプリケーションの保護が同州の最優先課題となりました。

Azure AD と YubiKey が共同し、ヌナブト州政府のセキュリティをアップグレードし、独自のニーズに合ったソリューションを提供することができました。同州政府は、フィッシングに強い認証ソリューションを導入したいと考えていました。また、政府機関では、さまざまな Windows ベースのシステムを使用していましたが、それらは遠隔地にあるため、アクセスする際のネットワークが安定していませんでした。これらの課題に対応するために、ネットワーク、電源、クライアント ソフトウェアを必要とせずに、多要素認証に使用できるハードウェア デバイスである YubiKeys を採用しました。詳しくは [Yubico の記事](https://www.yubico.com/resources/reference-customers/government-of-nunavut/) と以下の動画をご覧ください。

【動画】 [The Government of Nunavut turns to phishing-resistant YubiKeys after ransomware attack](https://www.youtube.com/watch?v=BmdlVrepPhg)

## より詳細について

私たちは、パートナーの皆様がゼロ トラストの原則を用いて、重要なサイバーセキュリティ ソリューションをお客様に提供していることを非常に誇りに思っています。ゼロ トラストへの対応については、新しく発行された [パートナー統合ガイダンス](https://docs.microsoft.com/ja-jp/security/zero-trust/integrate/overview) をご覧ください。
