---
title: Azure AD 条件付きアクセスを利用してセキュリティと生産性のバランスをとる 3 つの方法
date: 2020-03-04
tags:
  - Azure AD
  - Security
  - Zero Trust
  - Conditional Access
---

> 本記事は、 2020 年 2 月 10 日に Azure Active Directory Identity Blog に公開された記事 (Three ways Azure AD Conditional Access balances security and productivity) を翻訳したものです。原文は [こちら](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/three-ways-azure-ad-conditional-access-balances-security-and/ba-p/1144689) より参照ください。

# Azure AD 条件付きアクセスを利用してセキュリティと生産性のバランスをとる 3 つの方法

こんにちは！

パートナー ブログ シリーズへようこそ。貴社では現在 ID と IAM (Identity and Access Management) のソリューションをお使いと思いますが、もしそれらがユーザーの生産性とセキュリティの適切なバランスを実現していないとお考えの場合は、この記事を読んでいただければと思います。今回は Content and Code 社のテクノロジー アーキテクチャ責任者である Ben Athawes 氏をお招きし、なぜ Ben 氏の顧客の多くが Azure Active Directory (Azure AD) 条件付きアクセスに切り替えを進めているのか、その理由についてお話するとともに、アプリとユーザーを Azure AD 条件付きアクセスに安全に移行する方法についてもアドバイスをいただきます。

## オンプレミスおよびクラウド アプリを Azure AD 条件付きアクセスで保護するべき理由

Ben Athawes 氏 (テクノロジーアー キテクチャ責任者、Content and Code 社) による寄稿

Content and Code 社は、数々の賞を受賞した Microsoft ゴールド パートナーであり、Microsoft 365 コンサルティングサービスに重点を置いた企業です。我々はロンドンに拠点を置き、お客様がクラウドにアプリケーションを安全に移行できるよう10 年以上にわたり支援しています。

ここ数年、Azure AD を認証プロバイダーとして使用したいというお客様が非常に多くいらっしゃいます。この傾向は特に業界に限らず、金融サービス、法律、建設、市場調査、小売など、さまざまな分野で見られます。Azure AD には革新的な機能がいくつもありますが、特に Azure AD 条件付きアクセスがリリースされてから、この傾向が非常に強くなっています。

Office 365 サービスに条件付きアクセスが組み合わされることで生産性とセキュリティのバランスがもたらされ、お客様は今その他のアプリでも Azure AD を統合しようとしています。お客様は、Azure AD の条件付きアクセスを、オンプレミス アプリとクラウド アプリの両方の「入口」として考え始めています。

この投稿では、我々のお客様が Azure AD 条件付きアクセスを利用して Azure AD とアプリを統合する動機となった 3 つの理由をお話ししようと思います。また、アプリの認証を [条件付きアクセス](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/overview) で保護された Azure AD に安全に移行するために概要となる手順をお伝えいたします。

## Azure AD 条件付きアクセスを利用する 3 つの理由

### 1．ID およびデバイス ベースのアクセス モデルが実現する

Azure AD 条件付きアクセスが最初に登場した当初、ほとんどのお客様が企業ネットワークに接続されたデバイスはすべて信頼できると思い込んでいました。これらの企業ネットワーク内のデバイスは、ユーザー体験を可能な限りスムーズにするため、しばしば多要素認証 (MFA) などの制御から除外されていました。

近年、この「ネットワーク内は安全」というアクセス モデルを前提としているお客様があまり多くないことがわかりました。これは主に次の理由によると思います。

- ユーザーが私物のデバイスを信頼できるネットワークに接続しているなど物理ネットワークの統制が不足している、または信頼できるネットワークと信頼できないネットワークが同じパブリック IP アドレスを共有している状況にお客様が気づいた。
- ハイブリッド Azure AD 参加や [Microsoft エンドポイント マネージャー](https://www.microsoft.com/en-us/microsoft-365/microsoft-endpoint-manager) の準拠などデバイス ベースの Azure AD 条件付きアクセス制御が成熟してきた。つまり、お客様の中で「信頼できる」デバイスの定義に、オペレーティング システムのバージョンや暗号化の有無、ウイルス対策などの要件が含まれるようになってきた。

多くのお客様で採用されてている、この「ネットワーク内は安全で信頼できるという前提を捨てる」(ゼロ トラスト) というアプローチは、ネットワーク境界ベースではなく、アイデンティティおよびデバイスをベースにしたアクセス モデルです。従来の境界制御のソリューションとは対照的に、Azure AD 条件付きアクセスを使用すると ID およびデバイスとの信頼性を確実に確立することがはるかに簡単になります。

### 2.クラウド アプリとオンプレミス アプリの両方に一貫したサインイン体験を提供する

クラウドベースの SaaS アプリの保護に加えて、条件付きアクセス制御は、[Application Proxy](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-proxy) を介して Azure AD と統合されたオンプレミス アプリにも適用できます。このアプローチは、ユーザーがクラウド アプリとオンプレミス アプリの両方で一貫したサインイン体験を享受できるため、ユーザビリティの観点から非常に効果的です。

20,000 人を擁する建設会社の Kier Group は、Azure AD と Application Proxy、オンプレミスのイントラネットで動作する Microsoft SharePoint Server 2013 の組み合わせでこれを実現しました。

> Kier Group は以前より SharePoint Server 環境を外部に公開するために従来のオンプレミス リバース プロキシのソリューションに依存していましたが、このせいで Office 365 とオンプレミスの SharePoint を行ったり来たりする際に一貫性のないエクスペリエンスとなっていました。そこで、事前認証と MFA などの条件付きアクセス制御を活用した Azure AD App Proxy を展開することにより、イントラネットの SharePoint Server 2013 と Office 365 で一貫性のあるセキュアなエクスペリエンスが従業員に提供できました。また、複数のコネクターとコネクター グループを展開することで、高いレベルの可用性も確保できています。  
> － Kier Group シニア テクニカル アーキテクト Mark Bentley 氏

お客様は、Azure AD App Proxy に加えて、レガシー アプリ向けに "[安全なハイブリッド アクセス](https://azure.microsoft.com/en-us/services/active-directory/sso/secure-hybrid-access/)" のアプローチを採用することで、ネットワーク セキュリティ ソリューションへの既存の投資を有効活用することもできます。マイクロソフトと様々なベンダーとの新しい統合機能により、お客様は、Kerberos、NTLM、リモート デスクトップ プロトコル (RDP)、LDAP、SSH、ヘッダー ベースおよびフォーム ベース認証などのレガシー認証をサポートするアプリへのアクセスを効率化したり標準化したりできます。

### 3. データの流出を防ぎながらアクセスをシンプルにする

セキュリティは重要な要件ですが、ユーザーにとって満足いくものである必要もあります。そのため、Azure AD 条件付きアクセスでは、信頼していないデバイスから SharePoint Online および Exchange Online への [ブラウザーベースのアクセスを制限](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/controls#session-controls) し、ダウンロードや印刷、同期などのアクションをブロックすることが可能です。これは仕事用のメールを確認したいが、会社が管理するデバイスを保持していない人にとっては非常に便利です。

このアプローチは、Office 365 にも適用でき、さらには Microsoft Cloud App Security (MCAS) と密接に機能統合している [アプリの条件付きアクセス制御](https://docs.microsoft.com/en-us/cloud-app-security/proxy-intro-aad) を使用することで、現在急速に成長しているサードパーティ SaaS アプリにも拡張が可能です。MCAS は、クラウドでのアクセスのセキュリティを司る製品であり、Microsoft の Azure Information Protection を使用してコンテンツのダウンロードを保護する機能などを含んでいます。

## アプリを Azure AD の条件付きアクセスに移行する手順

条件付きアクセスが貴社にとって適切なソリューションであることがわかったら、次は Azure AD への移行を具体的に計画していきましょう。アプリを安全に移行するには、系統立ったアプローチを取ることが重要です。 お客様に推奨する手順は次のとおりです。

1. 現在のアプリの ID プロバイダーおよび構成済みアプリ (AD FS の "証明書利用者信頼") の棚卸をします。
2. アプリを Azure AD に移行する順序に優先順位を付けます。ビジネスの重要性、使用状況、今後どれほどの期間そのアプリを使うかなどを考慮して決めます。
3. 各アプリについて以下のことを行います:
    1. 現在のコントロールと構成を Azure AD にマッピングします。例えば、MFA、レガシー認証のブロック (Azure AD 条件付きアクセスを使用して実施可能)、クレーム変換 (Azure AD 要求変換ポリシーを使用して置換可能) などが挙げられます。Microsoft は、AD FS をご利用のお客様向けにこの手順を簡素化する [移行準備スクリプト](https://github.com/AzureAD/Deployment-Plans/tree/master/ADFS%20to%20AzureAD%20App%20Migration) を提供しています。
    2. Azure AD にアプリを追加します。アプリがアプリ ギャラリー内に既に存在する場合は、シングル サインオンの方法などのプロパティが事前に組み込まれているため最も簡単に追加が可能です。もちろん、ギャラリー以外のアプリも追加いただけます。
    3. 必要な Azure AD の構成を行い、Azure AD 条件付きアクセスのコントロールを設定します。[レポート専用モード](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-report-only) を使用してさまざまなアクセスのシナリオをテストします。
    4. Azure AD のシングル サインオンを構成してテストします。マイクロソフトは、[一連のチュートリアル](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/) を作成しておりますので活用ください。
    
    > 特定のアプリでは ID プロバイダーを一斉に切り替えること (Azure AD への "カットオーバー") が必要です。このステップは通常はピーク時を避けて実行します。SharePoint Server などの他のアプリでは、ID プロバイダーを細かい粒度で構成できるため、Azure AD との統合を最初にテスト可能です。
    
    > SaaS アプリ ベンダーのサポートを得ることをお勧めします。もしかしたら、他のお客様が既にアプリを Azure AD と統合しており、ベンダーに事例がある可能性があります。
    
    5. すべてのアプリについて上記の手順を繰り返し実行します。
    6. 他の ID プロバイダーが不要になったら、それらの廃止を検討ください。

マイクロソフトは、上記の手順の一部を詳細に説明する独自の [ドキュメント](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/migration-resources) を提供しています。

## より詳細をご要望の場合

我々のお客様からの成功事例をお読みいただき、本記事が Azure AD 条件付きアクセスの採用を検討するきっかけになれば幸いです。より詳細については、[Azure AD 条件付きアクセス](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/overview) または [Microsoft Intune](https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/microsoft-intune) をご覧ください。また、興味がありましたら、Edgile 氏による [アプリの移行のためのリスク管理戦略](https://techcommunity.microsoft.com/t5/Azure-Active-Directory-Identity/Develop-a-risk-management-strategy-for-your-Azure-AD-application/ba-p/566488) のアドバイスもご覧ください。

*マイクロソフト パートナー ネットワークに所属するメンバーと企業は、さまざまな業界の大小の企業と連携しています。この経験を通じ、パートナー ネットワークのメンバーは今日のセキュリティ専門家が直面する主要な課題ついて独自の知見を得ています。[パートナー ブログ シリーズ](https://techcommunity.microsoft.com/t5/Azure-Active-Directory-Identity/bg-p/Identity/label-name/Customer%20%20%20Partner) は、これらのセキュリティ トレンドをより広く社会に浸透させ、読者の皆様がすぐに行動できる知見やヒントを提供することを目的としています。我々のパートナーがどのようにしてアイデンティティを保護しているか、最新の知見を得るために毎月このページをチェックいただくか、次のブログが投稿されたときに通知を受けらっるよう [シリーズをフォロー](https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=09213cdc-9f30-4e82-aa6f-9b6e8d82dab3&redirect_uri=https%3A%2F%2Ftechcommunity.microsoft.com%2Fauth%2Foauth2callback&response_type=code&state=https%3A%2F%2Ftechcommunity.microsoft.com%2Ft5%2FAzure-Active-Directory-Identity%2Fbg-p%2FIdentity%2Flabel-name%2FCustomer%2520%2520%2520Partner&scope=User.Read+openid+email+profile+offline_access) ください。*