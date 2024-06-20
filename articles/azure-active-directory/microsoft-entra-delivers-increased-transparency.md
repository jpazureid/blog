---
title: 透明性を向上させるMicrosoft Entra の機能紹介

date: 
tags:
    - US Identity Blog
---

# 透明性を向上させるMicrosoft Entra の機能紹介


こんにちは、Azure Identity サポートチームの 山下 です。

本記事は、2024 年 5 月 13 日に米国の Azure Active Directory Identity Blog で公開された [Microsoft Entra delivers increased transparency](onenote:#%5bBlog%20review%5d%20Microsoft%20Entra%20delivers%20increased%20transparency&section-id={982B5135-8FE1-45BB-A04B-E951DC6195C9}&page-id={15C8F756-53E2-47CA-A889-1C756A5AB81D}&object-id={36B1AD0C-681C-0C98-3845-4F50C919719C}&16&base-path=https://microsoft.sharepoint.com/teams/Azure2/SiteAssets/Azure%202%20Notebook/BlogReview.one) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----



[2023 ISC2 Cybersecurity Workforce Study](https://www.isc2.org/Insights/2023/10/ISC2-Reveals-Workforce-Growth-But-Record-Breaking-Gap-4-Million-Cybersecurity-Professionals) の報告によると、サイバーセキュリティの専門家の 75 % が、現在のサイバー攻撃の脅威は過去5年間で最も厳しい状況であると回答しています。おそらく、この文章をお読みのあなたも ID 攻撃の防止や最小権限アクセスの確保など、組織のセキュリティ保護に追われていることでしょう。大変なお仕事をされていると思います。

弊社は、正確で信頼性の高いタイムリーな情報を提供し、お客様の ID とネットワーク アクセス セキュリティの状態を監視および最適化できるよう支援しております。このような透明性により、サービスの性能やテナントの正常性、およびお客様による今後の改善計画を評価するにあたっての必要な見通しが得られるようになるのです。

本年は一連の取り組みを通して、このような透明性への取り組みをより強化してまいりました。このブログでは、以下の 3 つのパートに分けて、これらの改善点を紹介します。

    1. アップデートの透明性: Microsoft Entra の新機能や、近日公開予定の情報を提供。
    2. 導入における透明性: Microsoft Entra の新機能とライセンス使用に関する洞察を提供。
    3. 運用における透明性: SLA のパフォーマンス、サービスの正常性、サインインに関する情報を提供。

このブログで紹介されているすべての内容は、[Trust via Transparency](https://www.youtube.com/watch?v=M1ruDHdFdWk) の動画でも紹介されています。

[![](https://img.youtube.com/vi/M1ruDHdFdWk/0.jpg)](https://www.youtube.com/watch?v=M1ruDHdFdWk)

皆様がゼロ トラストのアプローチを検討および展開する際に、これらの追加された機能によりお客様が Microsoft Entra より最大限の価値を得られれば幸いです。

## アップデートの透明性

テクノロジー業界では、変化が絶えることはありません。[2023 年には、100 を超える Microsoft Entra のアップデートと新機能がリリース](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/microsoft-entra-s-top-50-features-of-2023/ba-p/3796392) され、アナウンスや四半期ごとのブログ、そして複数のドキュメントを通してこれらの情報をお伝えしました。透明性に関する最初の投資分野は、上記のようなコミュニケーションを効率化し、お客様が最も関連性の高い製品のアップデート情報を見つけ、フィルタリングできるようにすることを目的としています。



### Microsoft Entra 管理センターにおける「新機能」の画面

Microsoft Entra の 「新機能」の画面では、Entra 製品のイノベーションをすべて確認できるため、常に最新情報を入手して、最新技術を評価できるため、ご自身の手で更新情報を追っていく必要がなくなります。製品のアップデートは、ロードマップと変更点のアナウンスに分類されます。ロードマップには、パブリックレビューと最近の一般提供のリリース情報が含まれます。一方で、変更点のアナウンスには、既存の機能に関する変更の詳細が含まれています。

詳細はこちら: [Introducing "What's New" in Microsoft Entra - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/introducing-quot-what-s-new-quot-in-microsoft-entra/ba-p/3796389)

## 導入における透明性

2 つめの投資分野である「導入における透明性」は、Microsoft Entra のライセンスを最大限活用することに重点を置き、構成の改善や組織の保護に関する推奨事項を提供します。

### Microsoft Entra のライセンス活用状況に関する知見

Microsoft Entra のライセンス活用状況を把握することで、Entra ライセンスを最適化し、ライセンス違反とならないようにすることができます。現在、条件付きアクセスやリスクベースの条件付きアクセスなどの Entra ID 機能について、使用状況とライセンスを確認いただけます。将来的には、Microsoft Entra のその他の製品にもライセンス活用状況の知見を提供していく予定です。

詳細はこちら: [Microsoft Entra ライセンスの使用状況分析機能のご紹介](https://jpazureid.github.io/blog/azure-active-directory/introducing-microsoft-entra-license-utilization-insights/)

### Microsoft Entra の推奨事項

Microsoft Entra の推奨事項は、セキュリティ体制を強化し、従業員の生産性を向上させるための信頼できるアドバイザーとして機能します。この機能を利用することで、ベストプラクティスと業界標準に基づいた、実用的な知見を得ることができ、組織のセキュリティ確保に活用いただけます。さらに、Identity Secure Score を更新しましたので、Microsoft Entra 推奨事項のブレードでご確認いただけます。

詳細はこちら: [セキュリティと生産性を向上させる Microsoft Entra 「推奨設定 (レコメンデーション)」 の新規機能の紹介](https://jpazureid.github.io/blog/azure-active-directory/introducing-new-and-upcoming-entra-recommendations/)

## 運用における透明性

「運用における透明性」は、Microsoft Entra の実際の可用性と耐障害性をお客様が確認できるようにすること、また問題が発生したときには弊社が責任をもって改善を続けられるようにすること、さらにテナントの正常性を向上させるためにテナント内で取るべきアクションを把握することに重点を置いています。それでは、近日発表されたレポート、正常性、監視の機能を見てみましょう。

### テナントレベルの SLA レポート

テナントレベルの SLA レポートにより、ユーザー認証とトークン発行における 99.99 % の可用性という Entra ID の SLA 契約と比較して、お客様テナントのパフォーマンスを監視することができます。

詳細はこちら: [テナントの正常性に関する透明性と可視化](https://jpazureid.github.io/blog/azure-active-directory/tenant-health-transparency-and-observability/)

### 予め算出された正常性に関するメトリクス情報

新しい正常性のメトリクスは、アクティビティ ログから関連するシグナルを抽出し、監視する価値のあるシナリオに対して、15 分ごとに事前計算された低遅延の情報を提供します。弊社が用意した最初のシナリオは、多要素認証 (MFA)、管理済みまたは準拠済みデバイスのサインイン、および SAML (Security Assertion Markup Language) サインインです。認証関連のシナリオは、すべてのお客様にとって高可用性が求められるため、優先的に提供を始めていますが、エンタイトルメント管理、ディレクトリ構成、アプリの正常性などの他のシナリオも、データの異常なパターンに対応するインテリジェントなアラート機能とともに将来的に追加される予定です。 

詳細はこちら: [テナントの正常性に関する透明性と可視化](https://jpazureid.github.io/blog/azure-active-directory/tenant-health-transparency-and-observability/)

### Copilot を活用した評価

「運用における透明性」に対する弊社の取り組みの 3 つ目の例としては、ユーザーが組織のリソースをどのように利用しているかをよりよく把握できるよう支援するというものです。[Microsoft Copilot for Security は Microsoft Entra に組み込まれている](https://learn.microsoft.com/en-us/entra/fundamentals/copilot-security-entra) ため、より効率的に ID とアクセスを評価し、ID に関するリスクを調査して解決し、複雑なタスクを完了することもできます。この優れた例として、Copilot に特定のユーザーのサインイン ログを特定の期間だけ取得するよう依頼することで、レポート作成時間を短縮できるというものが挙げられます。

詳細はこちら: [Microsoft Entra が Copilot for Security に新しい ID スキルを追加](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-adds-identity-skills-to-copilot-for-security/)

## ご意見をお聞かせください

私のチームでは、「透明性」を一時的な流行語ではなく、お客様とのお約束であると捉えています。Microsoft Entra が進化し続ける中で、私どもの指針は常に透明性によってお客様の信頼を得ることなのです。

今回紹介した新機能をお試しいただき、普段の業務に組み込むことで ID およびネットワーク アクセスのセキュリティ ソリューションの複雑さを軽減いただけることを願っております。以下のコメント、または [Microsoft Entra 管理センターのホームページの 「Provide Feedback」 リンク](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/EntraDashboard.ReactView)から、ご意見やアイデアをお寄せいただけますと幸いです。

Shobhit Sahay









