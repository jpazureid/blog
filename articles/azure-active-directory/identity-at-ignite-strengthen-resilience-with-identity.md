---
title: Ignite における ID 関連の発表まとめ: Azure AD の技術革新による障害耐性の強化
date: 2021-11-07 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# Ignite における ID 関連の発表まとめ: Azure AD の技術革新による障害耐性の強化

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2021 年 10 月 28 日に米国の Azure Active Directory Identity Blog で公開された [Identity at Ignite: Strengthen resilience with identity innovations in Azure AD](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/identity-at-ignite-strengthen-resilience-with-identity/ba-p/2747271) を意訳したものになります。

---

脅威や攻撃が拡大し続ける中でハイブリッドな業務を実現するには、障害や攻撃からの復旧に多方面から取り組むことが必要です。どれほどサイバー セキュリティを強固にしても、セキュリティに起因する問題や危機的状況、あるいはビジネスの急激な成長など良い意味での課題を含め、様々な混乱は発生するものであり、組織の運営を継続しながら可能な限り迅速に状況を回復するため、それらあらゆる問題を抑え込んでいく必要があります。

当社は、お客様のパートナーとして、お客様の組織が安全かつ生産性を維持できるよう Azure AD への投資を行っています。今週の Microsoft Ignite での私のセッションでは、基盤となるプラットフォームの機能やセキュリティ、マルチ クラウドなど、これら多岐にわたる投資内容についてお話ししました。我々は、より耐障害性の高い ID サービス、特定が困難な攻撃も検知して対応するツール、デジタル資産全体のセキュリティ態勢を強化するシステムなどを構築しています。

## より耐障害性の高い ID サービス

マイクロソフトは Azure AD がお客様の組織にとっていかに重要であるかを理解しております。結局のところ、ユーザーがサインインできなければ、何のサービスも利用できなくなってしまいます。お客様の信頼を継続して得ていく必要があると考え、8 つの基本原則に基づいてサービスの信頼性を高める投資を継続しています。

![](./identity-at-ignite-strengthen-resilience-with-identity/Reliability principles.png)

[99.99% の SLA コミットメント](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/99-99-uptime-for-azure-active-directory/ba-p/1999628) を確実に実現するため、独自の技術革新を進めています。例えば、Azure AD サービス全体に **セル ベースのアーキテクチャ** を採用しました。これは、サービスの一部で予期せぬ障害が発生した場合、その障害を一部にとどめ、サービスの他の部分に影響を与えないようにするためです。現在、Azure AD は 107 のセルに分割されています。最大規模のセルであっても、ユーザー全体の最大 1.7% しか利用していないため、障害が発生しても大多数のお客様には影響がないようにしています。

また、**バックアップ認証サービス** にも投資しています。これは、プライマリの認証システムがダウンした場合でも、セッションを維持するためのセカンダリ システムです。このシステムもマイクロソフトのクラウドで稼働していますが、プライマリの Azure AD サービスとは完全に分離されています。停電時の発電機のような役割を果たし、アクティブなセッションを引き継ぐことで、ユーザーがアプリにアクセスする際に従来と変わりのないユーザー体験を提供します。また、セキュリティ設定やアクセスの準拠状態も維持されますので、例えば条件付きアクセス ポリシーの適用やロールの変更に基づくアクセス可否の制御なども可能です。このバックアップ サービスは、現在 Exchange と SharePoint のワークロード、およびすべてのネイティブ デスクトップ アプリとモバイル アプリに対して有効です。本年末までには、すべてのウェブ アプリケーションにも対応する予定です。

 
**発表内容** 
- 2021 年末までに Web アプリケーションのワークロードをサポートする Azure AD バックアップ認証サービスを提供予定

## 特定が困難な攻撃を検知して対応するツール

ID に対する攻撃は激化しています。実際、ID は新たなサイバー セキュリティの戦場となっており、攻撃の防止と検知のためのツールがこれまで以上に重要になっています。

攻撃を防止するため、マイクロソフトの [Zero Trust](https://www.microsoft.com/ja-jp/security/business/zero-trust) アーキテクチャの中核をなすアクセス ポリシー エンジンである Azure AD [条件付きアクセス](https://www.microsoft.com/ja-jp/security/business/identity-access-management/identity-compromise) にいくつかの機能強化を行っています。

- 新しい **条件付きアクセスの概要ダッシュボード** では、組織のサインイン パターンの分析に基づいて、ポリシーを強化するヒントを提供します。また、Azure AD のセキュリティのベスト プラクティスに基づいて作成された **テンプレート** を利用して、追加の保護機能を迅速に導入することもできます。ダッシュボードと [テンプレート](https://aka.ms/CATemplates/) は、共に現在パブリック プレビューです。
- **アプリケーションとデバイスに対する条件付きアクセス フィルター** を用いて、ポリシーの対象をよりきめ細かく設定し、特定のニーズに合わせてポリシーを改良することが可能です。このフィルターは、新しいアプリケーションやデバイスに動的に適用され、例えば、Intune のポリシーに準拠しているか、ハイブリッド ドメイン参加済みか、セキュア アクセス ワークステーションとして定義されているデバイスのいずれかでのみ、機密性の高いアプリケーションへのアクセスを許可するといったポリシーを構築することができます。[デバイス用のフィルター](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-condition-filters-for-devices) は現在一般提供済みとなっており、アプリ用のフィルターは年内にパブリック プレビューが開始される予定です。
- 人間以外の ID (アプリやサービスのワークロード ID) も、アクセス権限の付与が進むにつれ、悪意のある攻撃者から注目されるようになってきています。今月末にパブリックプレビューが開始される **ワークロード ID 用の条件付きアクセス** を使用して、これらの種類の ID を対象としたポリシーを設計することが可能となります。
- **継続的なアクセス評価** は、条件付きアクセスを個々のセッションに拡張し、新たなリスクが発生した場合に、ほぼリアルタイムでポリシーを適用する仕組みです。[この機能](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-continuous-access-evaluation) は年内に一般公開される予定です。

![](./identity-at-ignite-strengthen-resilience-with-identity/Conditional access.png)

強力な攻撃防止機能があっても、ゼロ トラストのアプローチでは常に侵害が起こることを想定します。Azure AD では、[Identity Protection](https://www.microsoft.com/ja-jp/security/business/identity-access-management/identity-compromise) がリアルタイムでインテリジェントなリスク評価を行い、脅威や攻撃を検知して修復します。今回、Identity Protection を強化し、新機能を追加しました。これらの機能は一般提供済みとなっています。

- [新しいプロアクティブな検知機能](https://docs.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-risks#sign-in-risk) を追加することで、**異常なトークンやセッション クッキーに対する見慣れないサインイン プロパティの検知** など、一般的な攻撃手法と新たな攻撃手法の両方に対応します。
- Identity Protection は、環境全体のユーザーおよびアクセス アクティビティを継続的に分析することで、リスクの特定や弱点の強化に利用できるデータを生成します。**Identity Protection の診断設定** では、選択した SIEM にワンクリックでリスク データをエクスポートしたり、データ保持期間を簡単にカスタマイズすることができます。Azure Monitor 上に構築された **新しい Identity Protection リスク分析ワークブック** は、リスク データと対応策の有効性を可視化するのに役立ちます。

 ![](./identity-at-ignite-strengthen-resilience-with-identity/Heatmap of risk detections.png)

耐障害性を維持するということは、破壊的な状況に直面したときも、従業員や社外のチーム メンバーと連携できる対応力を維持することでもあります。Azure AD は、Microsoft Teams での安全なコラボレーション体験をサポートします。

**発表内容**
- Identity Protection のトークン盗難検出機能の一般提供開始
- Identity Protection の診断設定の一般提供開始
- Identity Protection のリスク分析ワークブックの一般提供開始
- 条件付きアクセスのデバイス フィルターの一般提供開始
- 2021 年末までに継続的アクセス評価の一般提供開始
- 条件付きアクセスのが用ダッシュボードのプレビュー開始
- 条件付きアクセステンプレートのプレビュー開始
- 2021 年 11 月後半でのワークロード ID 用の条件付きアクセスのプレビュー開始
- 2021 年末までに条件付きアクセスのアプリケーション フィルターのプレビュー開始
 
## デジタル資産全体のセキュリティ対策を強化するシステム

攻撃がより巧妙になっているだけでなく、ハイブリッドやマルチ クラウド戦略の採用、人やワークロードの ID も爆発的に増加しており、お客様環境も同様の対応を迫られていると思います。クラウド プロバイダーはアクセス管理の仕組みに異なるオペレーション モデルを採用しているため、複雑な環境でゼロトラストの原則である最小特権の考え方を実現することは困難です。

ほとんどの企業は自社のビジネスに最も適したアプリケーションやソリューションを選択できるように、マルチ クラウド戦略を採用しています。私たちは、マイクロソフトのクラウドで実行される部分だけでなく、お客様の環境全体を確実に保護したいと考えています。そのために、今年の初めに [CloudKnox 社を買収](https://blogs.microsoft.com/blog/2021/07/21/microsoft-acquires-cloudknox-security-to-offer-unified-privileged-access-and-cloud-entitlement-management/) しました。CloudKnox 社のテクノロジーは、企業がすべての主要なクラウド上のすべての ID とリソースについて、アクセス許可の確認、リスクの評価と修正、異常なアクティビティの検出を支援します。これらの強力な機能を Azure AD や幅広いマイクロソフトのエコシステムと統合していく中で、来年にかけてより多くの情報を皆様に提供してまいります。

また、ID のプロビジョニング、ライフサイクル管理、ワークフローの自動化、権限管理、および分析を含む統合マルチクラウド ソリューションの提供に取り組んでいます。この戦略を推進するために、Azure AD Identity Governance を拡張し、**オンプレミスやプライベート クラウドでホストされているアプリへもプロビジョニング** を可能としました。個別のガバナンス システムを持つアプリ ([基礎となる SQL データベースやサードパーティの LDAP ディレクトリに依存しているアプリなど](https://docs.microsoft.com/en-us/azure/active-directory/app-provisioning/on-premises-application-provisioning-architecture)) へのプロビジョニングも提供します。これにより、すべてのアプリケーションに対して一貫したアクセスのプロビジョニングが可能になります。

また、Azure Logic Apps をベースにした **カスタム エンタイトルメント ワークフロー** により、ユーザーのプロビジョニングやライフサイクルの管理を容易に行えるようにしました。Azure Logic Apps は、Salesforce や Office 365、SQL など、何百もの既存システムとのコネクターを備えており、独自にコーディングする必要はありません。
 
**発表内容**
- Azure AD からのオンプレミス アプリケーション プロビジョニングのプレビュー開始
- Azure AD エンタイトルメント管理のカスタム割り当てワークフローのプレビュー開始

## 認証基盤の近代化

お客様がクラウドならではのセキュリティの進化を享受できるように、我々のチームでは、お客様がより多くのワークロードをクラウドに移行できるようにする新しい方法の検討を進めています。例えば、アプリの認証の流れをオンプレミスの Active Directory Federation Services (AD FS) から Azure AD に移行する際には、**新しいクレーム、クレーム変換、トークン フィルタリング、SAML 構成設定の追加** などのプレビューを利用して、[移行を加速](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-fed-group-claims) することができます。

また、特にワークロード ID に関連するシークレットをよりセキュアにする取り組みを採用することも検討ください。多くのアプリケーション開発者が、未だにアプリの登録にパスワード シークレットを使用しており、その中には有効期間が長いものもあります。[Microsoft Graph で利用できる](https://docs.microsoft.com/en-us/graph/api/resources/applicationauthenticationmethodpolicy?view=graph-rest-beta) **新しい認証方法ポリシー** のプレビューでは、パスワード シークレットの使用をブロックしたり、その有効期限を制限したり、ワークロード ID のキーの資格情報に最大の有効期限を設定したりすることができます。また、**GitHub Actions による Azure AD ワークロード ID 連携のサポート** もプレビューとなりました。これにより、アプリケーション開発者は、アプリケーションを Azure にデプロイする際に、GitHubのリポジトリに Azure AD の認証情報を作成および保存する必要がなくなります。 

**発表内容**
- Azure AD での新しいクレーム、クレーム変換、トークン フィルタリング、SAML 構成設定のプレビュー開始
- アプリとワークロード ID の新しい認証方法ポリシーのプレビュー開始
- ワークロード ID 連携による GitHub との統合のプレビュー開始
 
これらの機能をオンデマンドでご覧になりたい方は、[Microsoft Ignite](https://myignite.microsoft.com/home) に無料で登録し、太平洋時間の本日午後 1 時 30 分から始まる私のセッション [Strengthen resilience with identity innovations in Azure AD](https://myignite.microsoft.com/sessions/fe5951da-9fa5-4e09-b529-007fff7a2add?source=sessions) をご覧ください。また、今後数週間、[このブログ](https://aka.ms/identityblog) でこれらの機能の詳細の案内や、お客様の組織に導入するためのベストプラクティスをご紹介していきますのでご注目ください。
