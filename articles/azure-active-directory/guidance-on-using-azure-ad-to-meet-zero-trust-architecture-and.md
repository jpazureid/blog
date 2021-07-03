
---
title: Azure AD を使用して Zero Trust アーキテクチャと MFA の要件を満たすためのガイダンス
date: 2021-07-04 18:00
tags:
  - Azure AD
  - US Identity Blog
---

# Azure AD を使用して Zero Trust アーキテクチャと MFA の要件を満たすためのガイダンス

こんにちは、Azure Identity サポート チームの村上です。

本記事は、2021 年 6 月 23 日に米国の Azure Active Directory Identity Blog で公開された [Guidance on using Azure AD to meet Zero Trust Architecture and MFA requirements](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/guidance-on-using-azure-ad-to-meet-zero-trust-architecture-and/ba-p/1751676) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

皆さん、こんにちは。
 
最近発表された [国家のサイバー セキュリティ向上に関する大統領令](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/) では、ゼロトラスト アーキテクチャと多要素認証が義務付けられていますが、これらの要件はどのようなもので、基準を満たすため、Azure AD のツールをどのように使用すればよいのか気にされている方もいらっしゃると思います。

我々の公開文書の中で、この新しいガイダンスを紹介できることを嬉しく思います。このガイダンスは、Azure Active Directory を使用して政府や業界の ID 要件を満たすためのものです。マイクロソフトは、 [自社が](https://docs.microsoft.com/en-us/compliance/regulatory/offering-home) いかにこれら多くの標準を満たしているかをドキュメントにまとめて公開しています。貴社でもマイクロソフトがこれら標準に準拠していることを前提に、弊社サービスを活用いただくことができますが、マイクロソフトがいくらこれら標準へ準拠しているといっても、時に 「"共同責任" (貴社とマイクロソフトでともに標準への準拠に責任を負う)」の概念が生じる場合があります。この新しいガイダンスは、貴社が **Azure Active Directory を使用して、これらの ID 要件を満たすことができる**ように設計されたものです。また、Microsoft が連邦政府向けに作成した、クラウドと Zero Trust の刷新に関するガイド  [Mapping the Cybersecurity Executive Order Milestones](https://cloudblogs.microsoft.com/industry-blog/microsoft-in-business/government/2021/06/24/mapping-the-cybersecurity-executive-order-milestones/) もご覧ください。 

例として、 FedRAMP High controls IA-2 (1-4) の要件を満たすことを考えてみましょう。これらの要件を理解するには、[FedRAMP セキュリティ・コントロール・ベースライン](https://www.fedramp.gov/assets/resources/documents/FedRAMP_Security_Controls_Baseline.xlsx) に始まり、[NIST SP 800-53 Rev.4](https://csrc.nist.gov/publications/detail/sp/800-53/rev-4/final) から、このベースとなっている [NIST SP 800-63 Rev.3](https://pages.nist.gov/800-63-3/sp800-63-3.html)、さらにこの基盤となる  [NIST FIPS 140-2](https://csrc.nist.gov/publications/detail/fips/140/2/final) をにまで踏み込まなければなりません。お分かりのとおり... とてつもない量の読解が必要です。他には、[スタンダードとコンプライアンスのセクション](https://aka.ms/AzureADStandards) を活用することもできます。このセクションでは、以下の方法でこの管理を満たすための規定のガイダンスを提供しています。

1. MFA を必要とするように Conditional Access (CA) ポリシーを設定する。
2. デバイス管理ポリシーと CA ポリシーを設定し、これらの管理対象デバイスへのサイ ンインに MFA を必要とするようにする。
3. FedRAMP High で要求される [NIST 認証保証レベル](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/10-reasons-to-love-passwordless-2-nist-compliance/ba-p/2115725) (AAL) 3 を満たす実行可能な MFA オプション
4. PIM を使用して、PIM のアクティブ化なしに特権的なローカル アクセスを行わないようにする。

**新しい標準およびコンプライアンス分野に関し、まず 2 つのコンテンツを以下のとおり発表いたします:**

 [NIST Authenticator Assurance Levels を満たすように Azure Active Directory を構成する](https://docs.microsoft.com/ja-jp/azure/active-directory/standards/nist-overview) 

	まず、NIST 800-63 - Digital Identity Guidelines  より取り掛かりました。NIST 800-63 は、他の多くの規格や規制が前提としているガイドラインで、デジタル  アイデンティティのフレームワークとして認知されています。 
	
	このガイダンスでは、Azure Active Directory を使用して NIST 認証保証レベル (AAL) を満たす方法を詳細に説明し、これらの AAL を利用可能なすべての認証方法に対応付けます。
 
[FedRAMP High Impact Level を満たすための Azure Active Directory の構成](https://docs.microsoft.com/ja-jp/azure/active-directory/standards/configure-azure-active-directory-for-fedramp-high-impact) 

	米国の多くの連邦政府機関、およびこれらの機関にクラウド サービスを提供するクラウド ソリューション プロバイダー (CSP) は、FedRAMP  プログラムの要件を満たす必要があります。私たちは、FedRAMP High のベースラインに沿ってガイダンスを作成し、最も厳格な ID 管理もカバーできるようにしました。このアプローチにより、より低い FedRAMP ベースラインを遵守する必要のあるお客様にも、このガイダンスをご利用いただけます。
 
近々、米国政府機関では、多要素認証の完全導入が求められます。ゼロ トラスト アプローチの一環として明示的に認証情報を検証する必要が生じますので、貴社においても [MFA を有効にする](https://www.microsoft.com/en-us/security/business/identity-access-management/mfa-multi-factor-authentication) ためのリソースをご確認ください。
 
お客様が Azure Active Directory を利用して実現したいアイデンティティ要件に関する規格、規制、その他のコンプライアンス フレームワークについて、皆様からのご意見をお待ちしております。今後も、標準、規制、その他のコンプライアンス フレームワークの内容を確認し、必要に応じて、お客様が Azure Active Directory を使用してアイデンティティ要件を満たせるようなガイダンスを作成していきます。

