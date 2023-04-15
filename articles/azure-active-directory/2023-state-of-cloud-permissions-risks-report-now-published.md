---
title: 2023 State of Cloud Permissions Risks レポートを公開しました
date: 2023-04-18 09:00
tags:
    - Azure AD
    - US Identity Blog
---

# 2023 State of Cloud Permissions Risks レポートを公開しました

こんにちは、Azure Identity サポート チームの 五十嵐 です。

本記事は、2023 年 3 月 28 日に米国の Azure Active Directory Identity Blog で公開された [2023 State of Cloud Permissions Risks report now published](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/2023-state-of-cloud-permissions-risks-report-now-published/ba-p/1061397) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

組織がマルチクラウドのインフラを受け入れ、採用するようになったことで、3 つの主要なクラウド プラットフォーム: Microsoft Azure, アマゾン ウェブ サービス (AWS), Google Cloud Platform (GCP) において ID のアクセス許可の数が増加しています。この変化はイノベーションの新たな機会をもたらす一方で、組織がこれまで直面したことのない新たなアクセス許可に関する課題をもたらしています。

本日は、[2023 State of Cloud Permissions Risks レポート](https://aka.ms/CloudPermissionsRisksReport) を発表できることを大変うれしく思います。本レポートでは、マルチクラウドのインフラにおける ID とアクセス許可にまつわる主要なリスク所見を取り上げています。

![](./2023-state-of-cloud-permissions-risks-report-now-published/2023-state-of-cloud-permissions-risks-report-now-published.png)

今年は、ワークロード ID とスーパー管理者について、驚くべき知見が見つかりました。これらのリスクを見て、改善策を探っていきましょう:

**ワークロード ID**

今日のマルチクラウドの世界では、マルチクラウドのインフラにアクセスするのはもはや人間の ID だけではありません。アプリ、VM、スクリプト、コンテナ、サービスなど、クラウド上で動作するワークロード ID の数は指数関数的に増加しており、今や人間の ID の数を 10 対 1 で上回っています。

さらに、非アクティブなワークロード ID の平均割合は 80% に上っており、これは 2021 年から倍増しており、付与されたアクセス許可のうちワークロード ID が使用しているのは 5% 未満です。このリスクを低減するために、最近 Microsoft Entra ワークロード ID 内で [アプリの正常性に関する推奨事項](https://learn.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/recommendation-remove-unused-apps) のプレビューを開始し、非アクティブなアプリや期限切れの認証情報を簡単に特定できるようにしました。

クラウド インフラにアクセスするワークロード ID が増加する中、組織はそのアクセスを監視し、侵害のリスクを低減することが重要です。

**スーパー管理者**

スーパー管理者は、すべてのアクセス許可とすべてのリソースにアクセスできる人間またはワークロードの ID です。スーパー管理者はサービスに対する構成の作成と変更、ID の追加と削除、データへのアクセスと削除さえも行うことができます。これは非常に強すぎる権限ですが、私たちの調査では、このスーパー管理者に付与された権限のうち、実際に使用されているのは 2% 未満であり、スーパー管理者の 40% はワークロード ID であることが判明しました。

監視されないまま放置されたこれらの ID は、侵害された場合、アクセス許可が悪用される重大なリスクとなります。

## マルチクラウドにおける権限のリスクの管理と修復

アクセス許可のギャップを解消し、権限の誤用のリスクを減らすには、組織が最小特権の原則を実施する必要があります。これは、マルチクラウド環境におけるすべての人間およびワークロードの ID に対して一貫して行われる必要があります。組織は、クラウド インフラストラクチャ エンタイトルメント管理 (CIEM) ソリューションを採用し、マルチクラウドにまたがるすべての一意なユーザーおよびワークロード ID の活動を継続的に発見、修復、監視することによって、クラウド規模でこれを実現することが必要です。

マイクロソフトの CIEM ソリューションである Microsoft Entra Permissions Management は以下の 3 つの方法でクラウド上のアクセス許可に起因したマルチクラウドの攻撃範囲の拡大を防ぎます:

1. 発見する: アクセス許可のリスクを評価し、どのような ID がいつ、どこで、何をしたかを特定します。
2. 修復する: 最小特権の原則を実現するために、必要に応じた Just-In-Time の権限付与を行います。
3. 監視する: セキュリティの脅威を防ぐために、クラウド上での権限の使用状況を継続的に監視します。

Microsoft Entra Permission Management を通じ、弊社ではマルチクラウド環境全体で特に懸念されるアクセス許可のリスクを特定するためのマルチクラウドのリスク評価を無料で提供しています。マルチクラウドでのアクセス許可のリスクについての詳細は、[2023 State of Cloud Permissions Risks レポート](https://aka.ms/CloudPermissionsRisksReport) をダウンロードしてご覧ください。また、今すぐ無料のリスク評価を開始することでインフラの安全確保への第一歩を踏み出してください。

- 2023 State of Cloud Permissions Risks レポートは [こちら](https://aka.ms/CloudPermissionsRisksReport)
- クラウド権限リスクが組織に与える影響について詳しくは [こちら](https://aka.ms/PermissionRisksInfographic)
- Microsoft Entra Permission Management について詳しくは [こちら](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-permissions-management) 
- [マルチクラウドのリスク評価を無料で開始しましょう！](https://aka.ms/TryPermissionsManagement) 

Alex Simons (@Alex_A_Simons)  
Corporate Vice President of Program Management  
Microsoft Identity Division
