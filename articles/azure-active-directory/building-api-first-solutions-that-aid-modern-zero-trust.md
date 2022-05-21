---
title: ゼロ トラスト基盤を支える API ファーストなソリューションの構築
date: 2022-05-22
tags:
  - Azure AD
  - US Identity Blog
---

# ゼロ トラスト基盤を支える API ファーストなソリューションの構築

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2022 年 2 月 7 日に米国の Azure Active Directory Identity Blog で公開された [Building API-first solutions that aid modern Zero Trust infrastructure](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/building-api-first-solutions-that-aid-modern-zero-trust/ba-p/2810641) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

こんにちは。

マイクロソフトの ID とネットワーク アクセスのプログラム マネジメント担当副社長の Sue Bohn と申します。この Voice of the ISV のブログ記事では、SentinelOne 社のプロダクト マーケティング マネージャーの Jeremy Goldstein とプロダクト マネジメント担当ディレクターの David Baldwin より、SentinelOne が生み出した API ファースト開発モデルによって、[Singularity XDR](https://www.sentinelone.com/platform) と [Azure Active Directory](https://www.microsoft.com/security/business/identity-access-management/azure-active-directory) が如何に連携し、大量のアラートの管理とセキュリティ ツール間のプロセス統合という課題を解決したかを解説します。

---

セキュリティ運用部門における最大の悩みの種は、大量のアラートと CTRL-C/CTRL-V の (コピー アンド ペーストに基づく) 業務フローと言われています。あるセキュリティ ツールで生成された情報を別のツールにコピー アンド ペーストして手動で連携することは、単調な繰り返し作業になり時間もかかるため、攻撃者に常に先手を取らせてしまうことになります。平均的なセキュリティ運用部門では、さまざまなベンダーが提供する数十種類のツールを使用していることを考えると、自動化と相互運用性の必要性は明らかです。SentinelOne は、組織が [ゼロ トラスト](https://www.microsoft.com/security/business/zero-trust) の原則 (明示的な検証、最小特権アクセスの使用、侵入の想定) を採用するよう支援しているセキュリティ プロバイダーとして、Microsoft や他のセキュリティ専門家と協力して、これらのニーズに対応しています。

[Azure Active Directory](https://www.microsoft.com/security/business/identity-access-management/azure-active-directory) (Azure AD) と連携し、AI と自動化でリアルタイムに改善策を実行する SentinelOne [Singularity XDR](https://www.sentinelone.com/platform) などのソリューションを作るため、SentinelOne は API ファーストの開発モデルを採用しています。画面デザインの前に、API として機能を作成するのです。この取り組みにより、顧客やパートナーは弊社とより円滑に連携することが可能となります。Microsoft が当社の Extended Detection Response (XDR) プラットフォームに関連する新しい API をリリースしたときも、同じことが当てはまります。これにより、弊社は有益な新機能を最短期間でお客様に提供することが可能です。Azure AD のすべての危険なユーザーへプログラム的にアクセスできるようにする [riskyUser API](https://docs.microsoft.com/graph/api/resources/riskyuser) は、API ファースト戦略の利点の典型的な例です。

Azure AD Identity Protection は、疑わしいと判別されたアカウント関連の動作を含む多くの要因を考慮して危険なユーザーを検出します。ユーザーとサインインの両方に紐づいたリスク検出を元に、ユーザー全体のリスク スコアが計算され、[Risky Users レポート](https://docs.microsoft.com/azure/active-directory/identity-protection/concept-identity-protection-risks) が生成されます。Azure AD の Identity Protection の詳細は [こちら](https://docs.microsoft.com/azure/active-directory/identity-protection/overview-identity-protection) をご覧ください。

## 顧客が必要とするサービスを顧客が期待するよりも早く提供する

Microsoft が riskyUser API と、それに付随する confirmCompromised API (Azure AD でユーザーを高リスクとしてマークする) をリリースした際、お客様側での手作業をなくすことが可能ではないかということに気づきました。これらの新しい API を使用すると、ユーザーのリスク スコアと侵害済みの状態を自動的に調整でき、その結果、お客様が選択した [条件付きアクセス](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/) のパラメータに波及して、そのユーザーのアクセスが制限されます。この後、SentinelOne が自動的に生成されたインシデント ノートにそのユーザーの新しいリスク状態を追加します。

API がどのように機能するかの例として、ここでは私が自分のノート PC にマルウェアを仕込んだと仮定します。悪意のある攻撃者からすると、すでに私の ID は非常に簡単に侵害できる状態になっています。私のノート PC (エンドポイント) が侵害された場合、私の資格情報および私のノート PC (エンドポイント) を共有するすべての人の資格情報も侵害されていると想定することが必要です。このように ID が侵害されると、悪意のある攻撃者は私の組織とその内部データへより広範囲にアクセス可能となります。そこで、自動化されたリスク管理の出番です。Singularity XDR は、私のマシンからマルウェアが検出され、私のアカウントが危険にさらされていることを riskyUser API を介して Azure AD に瞬時に通知します。そして、私の組織内で定義およびカスタマイズされた [修復アクション](https://docs.microsoft.com/ja-jp/azure/active-directory/identity-protection/howto-identity-protection-remediate-unblock) が自動的に実行されます。

当社のアジャイル開発手法に加え、この Microsoft の新しい API は非常に利用しやすいことから、riskyUser API の機能を知ってからわずか 3 週間で非常に堅実な POC (Proof of concept) を完了させることができました。この POC では、セキュリティ ツール間のコピー アンド ペーストによる手作業でのデータ入力を、1 件あたり 5 ～ 10 分短縮することができました。大企業では 1 日に何十回も繰り返す作業ですから、これは大きな節約になります。さらに、これらのアクションはリアルタイムで自動化されているため、このシステムを導入している企業は、特に洗練された攻撃者にも対応することが可能です。私たちのお客様は、セキュリティ運用部門の生産性に加えて、普段のセキュリティでも多くの利益を得ています。

## 相互運用と自動化により Zero Trust の原則が簡単に採用可能に

特に、Zero Trust の道のり初期段階にある顧客にとって、私たちが riskyUser API と confirmCompromised API で実現したような相互運用は、その効果以上のものがあります。確かに、これらの組織では、脅威が検出されると、侵害されたユーザー ID の動作が制御されるという直接的な利益を得ることができますが、ゼロ トラストの原則に対する信頼も増していきます。

これにより、条件付きアクセスに加え、Azure AD と統合された普段の業務アプリや SaaS アプリケーション全体にゼロ トラストの原則をさらに拡大することについて、より幅広い話し合いの扉が開かれることになるのです。例えば、明示的な検証では、アクセス可否の決定には、その妥当性を判断するために複数の入力データが必要です。ユーザーの実際の ID と同様に、侵害されたエンドポイントも容易に特定が可能となります。必要最小限の特権アクセスを使用することで、仮に資格情報が乗っ取られても、組織のシステムがさらに侵害されることを防ぐことができます。これにより、攻撃者が頻繁に標的とする「Super admin」アクセス権が利用されるのを防ぐことができます。侵害を想定するという観点では、潜在的な侵害が発生するのを待ってから資格情報に頼ったアクセスを強化するのではなく、既定でアクセスを禁止することで、潜在的な攻撃対象領域を減らすことができます。

Azure AD と Singularity XDR のような最高の組み合わせのソリューションをお客様が利用できるようになれば、それは大変喜ばしいことです。リアルタイムでのゼロ トラスト実装を機能させるためには、API ファーストの開発が生み出す相互運用性に注目する必要があります。だからこそ、Microsoft と足並みを揃えて、ゼロ トラストを採用する際の柔軟性、統合性、選択肢を生み出すことが私たちの理念なのです。

データ セキュリティの業界では、人材が圧倒的に不足しています。自動化、特に複数のプロバイダーのツールにまたがる自動化は、あらゆる規模のセキュリティ組織が人的資源を最大限に活用するために有効です。これにより組織全体のセキュリティも向上させます。SentinelOne では、Microsoft のようなセキュリティ ソリューション プロバイダーと協力して、あらゆる規模の組織がゼロ トラスト セキュリティの取り組みを始められるようにし、すべての人に利益をもたらすという共通の目標に取り組んでいます。

[SentinelOne](https://www.sentinelone.com/) の詳細については、[Twitter](https://twitter.com/SentinelOne)、[Facebook](https://www.facebook.com/SentinelOne)、[YouTube](https://www.youtube.com/c/Sentinelone-inc)、[LinkedIn](https://www.linkedin.com/company/sentinelone) でご確認ください。
