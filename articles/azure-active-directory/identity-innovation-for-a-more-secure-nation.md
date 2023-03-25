---
title: より安全な国家を実現するための ID の技術革新
date: 2023-02-13 09:00
tags:
    - Azure AD
    - US Identity Blog
---

# より安全な国家を実現するための ID の技術革新

こんにちは、Azure Identity サポート チームの 星野です。

本記事は、2023 年 2 月 28 日に米国の Azure Active Directory Identity Blog で公開された [Identity Innovation for a More Secure Nation](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/identity-innovation-for-a-more-secure-nation/ba-p/2365670) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

毎秒 1,000 件以上の ID 攻撃 (※ 1) が発生しており、政府機関は史上最も厳しいサイバーセキュリティ環境の中で国民に向けサービスを提供しています。インフラに対する国家規模の攻撃から個人情報の漏洩まで、サイバー攻撃のすべてのエコシステムにおいて、政府が市民の自由を守る行為それ自体が、このような脅威者の格好のターゲットとなっています。拡大するセキュリティの脅威により、連邦政府機関とその最も重要なデータが危険にさらされているのです。

Microsoft Entra の 1 サービスである Azure Active Directory のフィッシング耐性のある多要素認証 (MFA) のような最近の技術革新により、政府機関のお客様はサイバーセキュリティのガイドラインと規制を順守しながら、政策目標を達成することができます。

2022 年 1 月、パスワードレスでフィッシング耐性のある多要素認証 (MFA) を使用するよう省庁に指示する国家安全保障の覚書 ([NSM-8](https://www.nsa.gov/Press-Room/News-Highlights/Article/Article/2904637/president-biden-signs-cybersecurity-national-security-memorandum/)) が発表されました。各機関は 2023 年 1 月に準拠の期限を迎えました。私たちは、公共への奉仕を目指すこれら多くの機関に対して、この目標達成を支援する重要な機能を提供できることを嬉しく思っています。

## 最新の強力な認証が生み出す信頼

サイバーセキュリティの向上に関する大統領令 (EO 14028) および NSM-8 への対応として、マイクロソフトは、各機関が以下のことを実現するにあたり役立つ強力な認証方式を開発しました。

### レガシーなオンプレミス連携サーバーの脅威とコストを取り除く

米国連邦政府機関ならびに米国国防総省で使用されている Common Access Card (CAC) や Personal Identity Verification (PIV) カードなどの証明書を使った **Certificate-Based Authentication (CBA)** で、ユーザーを安全に認証することができます。これにより、レガシーなオンプレミス IT インフラに関連する攻撃リスクやコストを削減しながら、CBA をサポートできます。

### 適切なリソースに適切な MFA 方式を使用する

最新で使いやすく、フィッシングに強い認証方式を展開しましょう。**条件付きアクセスの認証強度機能**により、フィッシング耐性のある MFA に移行しながら、重要な資産を確実に保護しセキュリティを向上させることができます。

### 政府機関を超えた連携を促進する

フィッシング耐性のある認証 (Azure Active Directory CBA、FIDO2、Windows Hello for Business など) と条件付きアクセスの認証強度を**テナント間のアクセス ポリシー**と組み合わせることで、コンプライアンスを維持しながら、他の政府機関や商業パートナー/請負業者との、あらゆる Microsoft サービスでの安全なコラボレーションをクラウド上で実現できます。

## マイクロソフトがお手伝いできること

公務員が働く環境では、最新の ID ツールおよびモビリティを使用して柔軟に仕事を行うことが必要です。最高レベルのセキュリティを実現しながらも生産性を最大化し、ID への攻撃を心配することなく国民への奉仕に集中できるようにする必要があります。

私たちは、最も深刻なセキュリティの脅威からも、データと ID を確実に保護できる強力な認証 ID ソリューションを活用し、政府機関とのパートナーシップを継続していくことを誇りに思います。

サイバーセキュリティの向上に関する大統領令 (EO 14028) およびフィッシング耐性のある MFA の実装におけるマイクロソフトの取り組みについては、こちらをご覧ください。

- [Azure Active Directory でパスワードレス認証のデプロイを計画する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-passwordless-deployment?source=recommendations)
- [Azure Active Directory の多要素認証のデプロイを計画する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-getstarted)
- (英語/ 米国事例) [US Government sets forth Zero Trust architecture strategy and requirements.](https://www.microsoft.com/en-us/security/blog/2022/02/17/us-government-sets-forth-zero-trust-architecture-strategy-and-requirements/)

Alex Weinert ([@Alex_T_Weinert](https://twitter.com/Alex_T_Weinert))  
VP Director of Identity Security, Microsoft

※ 1: 2022 年の Azure AD の認証ログデータより
