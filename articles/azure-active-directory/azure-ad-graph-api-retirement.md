---
title: Azure AD Graph API の廃止
date: 2024-07-29 09:00
tags:
    - Azure AD Graph API retirement
    - US Identity Blog
---

# Azure AD Graph API の廃止

こんにちは、Azure Identity サポート チームの 中村 です。 

 
本記事は、2024 年 7 月 1 日に米国の Microsoft Entra Blog で公開された [June 2024 update on Azure AD Graph API retirement - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/june-2024-update-on-azure-ad-graph-api-retirement/ba-p/4094534) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

1 年前、私たちは Azure AD Graph API サービスの非推奨化に関する 3 年間の通知期間が完了したという最新情報を共有しました。Azure AD Graph API サービスは、現在、リタイアメント サイクルに入っており、リタイアメント(停止) は段階的に行っていく予定です。このリタイアメント サイクルの最初の段階では、新しく作成されたアプリケーションは、Azure AD Graph APIへのリクエストに対してエラー（HTTP 403）を受け取るようになる予定です。この最初の段階の日付は 2024 年 6 月 30 日から 2024 年 8 月 31 日に変更されており、この最初の段階では 2024 年 8 月 31 日以降に作成されたアプリケーションのみが影響を受ける予定です。2025 年 1 月 31 日以降は、Azure AD Graph の延長アクセスを許可するように設定されていない限り、新規および既存のすべてのアプリケーションで、Azure AD Graph API へのリクエストがエラーになります。 

 お客様の環境で、まだ Azure AD Graph API を使用しているソフトウェアを開発または配布している場合は、中断を避けるために、Azure AD Graph API の廃止に向けて今すぐ対処する必要があります。以下に記載しておりますとおり、アプリケーションを Microsoft Graph に移行するか (強く推奨)、拡張機能用にアプリケーションを構成し、お客様が変更に備えられるようにする必要があります。Azure AD Graph API を使用するベンダーから提供されたアプリケーションを使用している場合は、ソフトウェア ベンダーと協力して、Microsoft Graph API に移行したバージョンに更新してください。  


お客様環境では、Microsoft Graph への移行が完全に完了していないアプリケーションがあるかと思います。[authenticationBehaviors プロパティ](https://learn.microsoft.com/ja-jp/graph/applications-authenticationbehaviors?tabs=http)を通じて、2025 年 6 月 30 日までアプリケーションが Azure AD Graph API を使用できるようにするオプション設定を提供しています。Azure AD Graph は 2025 年 6 月 30 日以降に完全に廃止され、アプリケーションの設定にかかわらず、この時点で API へのリクエストは機能しなくなります。 

### テナント内で Azure AD Graph API を使用しているアプリケーションを探すにはどのようにすればよいですか？ 

[Microsoft Entra の推奨設定機能](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/overview-recommendations)は、テナントが安全で健全な状態にあることを確認するための推奨事項を提供するのと同時に、Entra ID で利用可能な機能の価値を最大化するのに役立ちます。

お客様のテナントで Azure AD Graph API  をアクティブに使用しているアプリケーションとサービス プリンシパルに関する情報を表示する 2 つの Entra 推奨事項が用意されています。これらの新しい推奨事項は、影響を受けるアプリケーションとサービス プリンシパルを特定し、Microsoft Graph に移行する取り組みを支援します。 

![図1: Azure AD Graph 移行に関する Microsoft Entra 推奨事項 ](./azure-ad-graph-api-retirement/azure-ad-graph-api-retirement.png)

詳細は、[Microsoft Graph API への移行に関する推奨事項](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/recommendation-migrate-to-microsoft-graph-api)を参照してください。 

### Azure AD Graph アクセスの拡張機能のためのアプリケーションの構成 

お客様環境で作成されたアプリケーションに、2025 年 6 月 30 日まで Azure AD Graph API にアクセスするための拡張機能を持たせるには、作成後にアプリケーションの構成を変更する必要があります。この構成の変更は [authenticationBehaviors](https://learn.microsoft.com/ja-jp/graph/applications-authenticationbehaviors?tabs=http) インターフェイスを介して行われます。blockAzureADGraphAccess フラグを false に設定することで、新しく作成されたアプリケーションは、廃止サイクルが進むまで Azure AD Graph API を引き続き使用することができます。  

:::note warn
注意：この最初の段階では、2024 年 8 月 31 日以降に作成されたアプリケーションのみが影響を受けます。既存のアプリケーションは、authenticationBehaviors プロパティが構成されていない場合でも、Azure AD Graph API を引き続き使用できます。この変更がロールアウトされますと、テストのために blockAzureADGraphAccess を true に設定したり、既存のアプリケーションで Azure AD Graph API を使用しないようにしたりすることもできます。 
:::

### Microsoft Graph REST API の例 

**シングル アプリケーションの authenticationBehaviors プロパティを読み取ります。**

```json
GET https://graph.microsoft.com/beta/applications/afe88638-df6f-4d2a-905e-40f2a2d451bf/authenticationBehaviors
```

**authenticationBehaviors プロパティを設定して、新しいアプリケーションに拡張 Azure AD Graph アクセスを許可します。**

```json
PATCH https://graph.microsoft.com/beta/applications/afe88638-df6f-4d2a-905e-40f2a2d451bf/authenticationBehaviors  
Content-Type: application/json 
{ 
    "blockAzureADGraphAccess": false 
} 
```

### Microsoft Graph PowerShell の例 

**シングル アプリケーションの authenticationBehaviors プロパティを読み取ります。**

```powershell
Import-Module Microsoft.Graph.Beta.Applications 

Connect-MgGraph -Scopes "Application.Read.All" 

Get-MgBetaApplication -ApplicationId afe88638-df6f-4d2a-905e-40f2a2d451bf -Property "id,displayName,appId,authenticationBehaviors" 
```

**authenticationBehaviors プロパティを設定して、新しいアプリケーションに拡張 Azure AD Graph アクセスを許可します。**

```powershell
Import-Module Microsoft.Graph.Beta.Applications  

Connect-MgGraph -Scopes "Application.ReadWrite.All"  

$params = @{  

authenticationBehaviors = @{  

blockAzureADGraphAccess = $false  

}  

}  

Update-MgBetaApplication -ApplicationId $applicationId -BodyParameter $params
```

**2024 年 8 月 31 日以降、Azure AD Graph を使用するアプリケーションはどうなりますか？**

- Azure AD Graph API を使用し、この日付より前に作成された既存のアプリケーションは、廃止サイクルのこの段階では影響を受けません。 

- 2024 年 8 月 31 日以降に作成されたアプリケーションでは、アプリケーションの authenticationBehaviors のプロパティで blockAzureADGraphAccess 属性が false に設定されていない限り、Azure AD Graph API  に要求を行うときにエラーが発生します。 

**2025 年 1 月 31 日以降、Azure AD Graph を使用するアプリケーションはどうなりますか？**

- 2025 年 1 月 31 日以降、アプリケーションの authenticationBehaviors プロパティで blockAzureADGraphAccess 属性が false に設定されていない限り、新規および既存のすべてのアプリケーションで、Azure AD Graph API へのリクエスト時にエラーが発生します。 

**2025 年 6 月 30 日以降、Azure AD Graph を使用するアプリケーションはどうなりますか？**

- 2025 年 6 月 30 日以降、Azure AD Graph API  はどのアプリケーションでも使用できなくなり、アプリケーションの authenticationBehaviors 構成に関係なく、Azure AD Graph API への要求はエラーを受け取ります。 

**Azure AD Graph の現在のサポート**

Azure AD Graph API は廃止サイクルにあり、セキュリティ関連の修正プログラム以外の SLA やメンテナンスのコミットメントはありません。 

**Microsoft Graphについて**

Microsoft Graph は、ベスト オブ ブリードの API サーフェスです。Microsoft Graph は、Entra と Microsoft Teams や Microsoft Intune のような Microsoft 365 サービスにアクセスするための単一の統合エンドポイントを提供します。すべての新機能は、Microsoft Graph を通じてのみ利用できます。また、Microsoft Graph は Azure AD Graph よりも安全性と弾力性があります。 

Microsoft Graph は、Azure AD Graph で利用可能であったすべての機能と、ID の保護や認証方法などの新しい API を備えています。クライアント ライブラリは、再試行処理、セキュア リダイレクト、透過的認証、ペイロード圧縮などの機能を既定でサポートしています。 

**Azure AD と Microsoft Online PowerShell モジュールはどうなりますか？**

2024 年 3 月 30 日をもって、AzureAD、AzureAD Preview、Microsoft Online（MSOL）の PowerShell モジュールは非推奨となっており、セキュリティ修正のみのサポートとなっております。これらのモジュールは、2025 年 3 月 30 日以降に廃止され、動作しなくなります。これらを Microsoft Graph PowerShell に移行する必要があります。詳細については、こちらの更新情報をご確認ください。

**利用可能なツール**

- [Azure AD Graph から Microsoft Graph にアプリを移行する](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview)
- [Azure AD Graph アプリ移行計画のチェックリスト](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-planning-checklist)
- [Azure AD Graph から Microsoft Graph への移行に関する FAQ](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-faq)



**2023 年 10 月 4 日の更新**: お客様の要望により、ドキュメントやコンテンツ内の Azure AD の名前を置換する PowerShell スクリプト (Microsoft 社内でも使用) を共有いたします。[Microsoft Learn で Azure AD の名称変更のサンプル コード](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/how-to-rename-azure-ad) を入手いただき、必要に応じてカスタマイズください。

![](./azure-ad-rename-rollout/azure-ad-rename-rollout1.png)

Azure Active Directory (Azure AD) から Microsoft Entra ID への名称変更は、[7 月 11 日の Azure AD の名称変更に関する発表](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/azure-ad-is-becoming-microsoft-entra-id/ba-p/2520436) で説明された実施スケジュールに従って、現在 Microsoft のコンテンツと製品エクスペリエンスで展開されています。名称の更新の大部分は今年の 11 月中旬までに完了し、オンプレミス ソフトウェアの更新は 2024 年に完了すると予測しています。パートナー、アナリスト、インフルエンサーも、Azure AD の代わりに Microsoft Entra ID の名前を使い始めています。

Microsoft Azure、Azure Marketplace、Microsoft 365、Microsoft セキュリティ管理センターに新しい製品名とアイコンが表示されることに加えて、2023 年 10 月 1 日にサービス プラン (SKU) の表示名が Microsoft Entra ID Free、Microsoft Entra ID P1、Microsoft Entra ID P2 に更新されます。 

すでに発表されているように、これは単なる新しい名称であり、導入や日常業務への影響はなく、機能、ライセンス、サービス条件、サポートにも変更はありません。 

この移行期間中、多くのお客様やパートナーの皆様からいただいたフィードバックに感謝いたします。Microsoft Entra のネーミングを反映するために、自社のドキュメントやエクスペリエンスのアップデートを検討されている場合、その支援をするためのリソースをご用意しました。また、このコミュニティからの質問に基づき、名称変更について不明点を解消してまいります。

### お客様のコンテンツ内の Azure AD の名称を更新するためのリソース

名称変更が広く展開されている状況のため、お客様の組織でも、ドキュメントやコンテンツで Azure AD の名称を正確に更新したいとお考えと存じます。現在、Microsoft Learn 上の公開情報 "[Azure AD の名前を変更する](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/how-to-rename-azure-ad)" で、Microsoft のベスト プラクティス、ツール、ヒントを共有しています。 

組織のコンテンツ全体で必要に応じて名前を変更するのにこのドキュメントを活用いただければと思います。Azure AD という文字列や画像アイコンを見つけて更新するためのベスト プラクティスも含まれています。もう 1 つの重要な参考ドキュメントとしては、Microsoft Learn の "[Azure Active Directory の新しい名前](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/new-name)" があり、スタイル ガイド、更新された製品と機能の名前付けの包括的な用語集、名称変更の例外の一覧、新しい製品アイコンのダウンロード、Microsoft が名称変更を実施するための主要なマイルストーンのタイムラインが含まれています。 

これらのリソースを用いて、お客様の社内プロセスに沿ってアップデートの範囲と計画を進めていただければと思います。 

**以下ではコミュニティからのご質問に回答します:**

### 引き続き管理者の皆様は Azure ポータルを使用して Microsoft Entra ID を管理できます。 

Microsoft 365 管理センターで利用可能な ID の管理エクスペリエンスと同様に、Azure ポータルを好むお客様や、Microsoft Entra の機能の一部のみを必要とするお客様のために、Azure ポータルで Microsoft Entra ID を管理する機能を引き続きサポートします。Azure ポータルでの操作内容の変更は最小限とし、利便性を維持しつつ、Microsoft Entra ID が以前は Azure AD として提供されていたというメッセージをしばらくの間継続します。 

すべてのお客様に、包括的な [Microsoft Entra 管理センター](https://entra.microsoft.com/) のご利用をお勧めしますが、既存のポータル内での ID に関するユーザー体験はそのままとします。 

### オンプレミスの ID も Microsoft Entra ID で引き続きサポートされます。 

多くの組織が引き続きオンプレミス製品を利用いただしておりますので、オンプレミスの ID とアクセスの管理、および Azure やその他のクラウドへの接続のために、[Windows Server Active Directory](https://learn.microsoft.com/ja-jp/windows-server/identity/identity-and-access) を引き続きサポートし、強化していきます。 

Active Directory の名称は変更されません。Azure Active Directory の新しい名称として Microsoft Entra ID を採用するに際し多くのフィードバックをいただきました。多くのお客様にとって、この名称の変更により、オンプレミス (Active Directory) とマルチクラウド ID (Microsoft Entra ID) のソリューションをより明確に区別できるようになるはずです。 

### ID 開発者と DevOps エクスペリエンスの名称は変更されません。 

シームレスな移行を実現するため、既存のログイン URL、API、PowerShell コマンドレット、Microsoft Authentication Libraries (MSAL) はすべてそのままで、開発者エクスペリエンスやツールもそのままです。詳細はこちらをご覧ください: [ID 開発者と DevOps エクスペリエンスの変更点](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/new-name#whats-changing-for-identity-developer-and-devops-experience)) 

お客様は詳細な技術面をほとんど意識していない (サインイン URL など) 事に加え、それら個別の技術は API と同じくブランド化されていません。例として、Microsoft Entra 条件付きアクセス (旧称 Azure AD 条件付きアクセス) の API が Microsoft Graph にどのように表示されるかを次に示します。 

```json
{
  "conditions": {"@odata.type": "microsoft.graph.conditionalAccessConditionSet"},
  "createdDateTime": "String (timestamp)",
  "displayName": "String",
  "grantControls": {"@odata.type": "microsoft.graph.conditionalAccessGrantControls"},
  "id": "String (identifier)",
  "modifiedDateTime": "String (timestamp)",
  "sessionControls": {"@odata.type": "microsoft.graph.conditionalAccessSessionControls"},
  "state": "string"
}
```

ソース: [conditionalAccessPolicy リソースの種類 - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/api/resources/conditionalaccesspolicy?view=graph-rest-1.0)

### Azure AD PowerShell コマンドレットは改名されません。

現在、ID タスクを管理するための PowerShell モジュールとして、2024 年 3 月に廃止予定の Azure AD PowerShell モジュールと Microsoft Graph PowerShell モジュールの 2 つを提供しています。 

Azure AD PowerShell for Graph モジュールでは、ほぼすべての [Azure AD コマンドレット](https://learn.microsoft.com/ja-jp/powershell/module/azuread/?view=azureadps-2.0) の名前に "AzureAD" が入っています。これらは変更されることはなく、正式な製品名が Microsoft Entra ID になった現在も、同じコマンドレットを使い続けることができます。 

6 月に、Microsoft Graph チームの Kristopher Bash が、[Azure AD Graph の廃止と Azure AD PowerShell モジュールの非推奨に関する最新情報](https://jpazureid.github.io/blog/azure-active-directory/important-azure-ad-graph-retirement-and-powershell-module/) を公開しました。いずれのモジュールも Microsoft Graph テクノロジーに移行できるように、数年という計画で廃止される予定であり、Kristopher の記事では、そのタイミングとお客様側で利用できる情報を明確にし、さらに、移行期間中にお客様と弊社が最大限協力するという弊社のコミットメントを示しています。 

Azure AD PowerShell の廃止日は、2024 年 3 月 30 日を予定しています。それ以降も動作はしますが、サポートは制限されます。 

今後、Microsoft Entra ID を操作するための推奨モジュールとして、Microsoft Graph PowerShell を試すことをお勧めします。皆様からのフィードバックに基づき、Azure AD PowerShell から Microsoft Graph PowerShell に [移行](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0) する際にスムーズに移行できるよう [Microsoft Graph PowerShell で Microsoft Entra ID を管理する機能を引き続き追加していきます](https://learn.microsoft.com/ja-jp/powershell/azure/active-directory/migration-faq?view=azureadps-2.0#azure-ad---microsoft-graph-powershell---------------------microsoft----------)。 

### Microsoft は引き続き Azure AD B2C をサポートします。

以前に発表したとおり、Azure AD B2C という名称に変更はありませんし、サービスとお客様に対する当社のコミットメントにも変更はありません。Azure AD B2C のサービスレベル契約は変更されず、Azure AD B2Cと、現在パブリックプレビュー中の外部 ID 向け次世代ソリューションである [Microsoft Entra External ID](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/customers/overview-customers-ciam) の両方で、セキュリティ、可用性、信頼性を確保するための投資を継続します。[External ID](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/customers/quickstart-trial-setup) および [Azure AD B2C](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/overview) の利用開始については、当社のドキュメントをご覧ください。

### すべての人があらゆる場所でセキュアなアクセスを実現できるよう注力 

Azure AD の名称変更は、ID とアクセス管理の状況が時間とともにどのように変化してきたかを示すものです。ファイアウォールの内側で ID を管理する時代を経て、現在は信頼性の高い相互作用を複雑に組み合わせて実現することが可能となり、人々は安全にコラボレーションし、生産性を高めることができるようになりました。従来の ID およびアクセス管理サービスでは、もはや十分ではありません。 

弊社は、Microsoft Entra IDという名称が、製品のマルチクラウドおよびマルチプラットフォーム機能をより正確に表し、オンプレミスの ID ソリューションである Active Directory との混同を緩和すると共に、Microsoft Entra ID およびネットワーク アクセス製品を拡大する中で、あらゆる ID を保護し、あらゆるアクセス拠点を保護する、よりシンプルな方法を提供する道筋を作れると信じています。 

Microsoft Entra という製品群の名称が機能の明確化に役立っている例として、[Microsoft Entra 条件付きアクセス](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/overview) (旧 Azure AD 条件付きアクセス) があります。条件付きアクセス ポリシーを、ID と新しいセキュリティ サービスエッジ (SSE) の製品 ([Microsoft Entra Internet Access](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-internet-access) と [Microsoft Entra Private Access](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-private-access) ) 間で一貫して適用および活用できるようになりました。制御対象がクラウド　アプリケーションだけでなく [ネットワーク トラフィックにまで広がり](https://learn.microsoft.com/ja-jp/entra/global-secure-access/concept-universal-conditional-access)、ポリシーがアプリケーションやユーザー操作だけでなくトラフィックの種類に基づくようになりました。このことから、この製品横断的な機能には、統合された ID とネットワーク アクセスの名称である Microsoft Entra が使用されるようになりました。 

デジタル環境が拡大し、アクセス拠点が多様化するにつれて、弊社は革新を続け、製品ポートフォリオを拡大していきます。 

是非覚えていただきたいのは、アクセスを保護するための最も包括的なアプローチは、[Microsoft Entra](https://www.microsoft.com/ja-jp/security/business/microsoft-entra-pricing) であるということです。 

### Microsoft Entra ID のお客様への継続的なコミットメント 

Microsoft Entra IDは、グローバルで 72 万を超える様々な規模の組織にサービスを提供しており、[業界アナリストからリーダーとして認められ続けています](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-id)。新機能と機能改善は、名称変更に留まらず、お客様がより安全かつ効果的で、より柔軟に変化に対応できるよう支援します。四半期ごとに [新機能のリリースやアップデートについてブログでお知らせしています](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-new-feature-and-change-announcements/) が、最近のハイライトをいくつかご紹介します: 

- [保護されたアクションのための条件付きアクセス](https://jpazureid.github.io/blog/azure-active-directory/conditional-access-for-protected-actions/) が一般提供 (GA) されました。 
- [サインインエクスペリエンスにおける企業ブランディングの強化](https://jpazureid.github.io/blog/azure-active-directory/company-branding-ga/) が一般提供 (GA) されました。 
- [iOS および macOS ブラウザでの FIDO2 サポート](https://jpazureid.github.io/blog/azure-active-directory/advancing-modern-strong-authentication/) が一般提供 (GA) されました。 
- [継続的アクセス評価における場所に基づくポリシーの厳密な適用できる機能](https://jpazureid.github.io/blog/azure-active-directory/public-preview-strictly-enforce-location-policies-with-contiunuous-access-evaluation/) が一般提供 (GA) されました。 
- [Microsoft Entra ID Protection](https://jpazureid.github.io/blog/azure-active-directory/what-s-new-with-microsoft-entra-id-protection/) と [Microsoft Entra ID Governance](https://jpazureid.github.io/blog/azure-active-directory/entitlement-management-ga/) に新機能が追加されました。 

組織の従業員を保護し、アプリとデータへのアクセスを確保するための皆様の継続的な取り組みに感謝いたします。この名称の移行を最大限スムーズに実現できるよう、引き続き皆様のご意見をいただければ幸いです。 
