---
title: Microsoft Entra の更新情報 (2023 年 11 月)
date: 2023-12-03 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# Microsoft Entra の更新情報 (2023 年 11 月)

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2023 年 11 月 30 日に米国の Microsoft Entra (Azure AD) Blog で公開された [What’s new in Microsoft Entra](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/what-s-new-in-microsoft-entra/ba-p/3796394) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

Microsoft はこのほど、組織のセキュリティ態勢の改善を支援することを目的として、Microsoft Entra 製品ファミリーにさまざまな新しいセキュリティ ツールと機能を導入しました。サイバー攻撃がますます巧妙化し、クラウドベースのサービスやモバイル デバイスの利用が増加する中、組織には自らのセキュリティを管理するための効果的なツールの導入が不可欠となっています。

進化する脅威を先取りし、AI の時代に安全なアクセスを実現するために、今月の Microsoft Ignite では、いくつかの重要な発表を行いました:

- ID のリスクへの迅速な対応を支援する Microsoft Entra + Security Copilot。
- Microsoft Defender for Cloud と Microsoft Entra Permissions Management を統合し、マルチクラウド基盤の ID とアクセス許可に関する情報を統合。
- Microsoft マネージド条件付きアクセス ポリシーの自動展開によるお客様の保護
- Microsoft の Security Service Edge (SSE) 製品 (Microsoft Entra Internet Access および Microsoft Entra Private Access) の進化。
- Microsoft Entra 証明書ベース認証 (CBA)。

詳細は、ブログ「[Microsoft Ignite における ID: AI 時代におけるアクセスのセキュリティ保護](https://jpazureid.github.io/blog/azure-active-directory/identity-at-microsoft-ignite-securing-access-in-the-era-of-ai/)」をご覧ください。

本日は、過去 2 ヶ月間 (2023 年 10 月～ 11 月) の新機能リリースと、2023 年 11 月の変更管理を発表いたします。また、これらの変更点は [リリース ノート](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new) や電子メールでもお知らせしています。弊社では、お客様が新しい Entra 管理センター内で、非推奨、廃止、およびサービスの破壊的変更を含むライフサイクルの変更を管理しやすくするため、継続して取り組んでおります。

これらの最近のアップデートは、Microsoft Entra の製品エリアごとに整理しておりますので、最新のアップデートをすばやく見つけてアクセスいただけると存じます。これらの新機能が、より良い ID およびアクセス ソリューションの提供につながれば幸いです。

## 製品の更新情報のまとめ

- Microsoft Entra ID
- Microsoft Entra ID Governance
- Microsoft Entra Workload ID
- Microsoft Entra External ID
- Microsoft Entra Permissions Management

## Microsoft Entra ID

新機能の発表は以下のとおりです。

- [macOS および iOS におけるネイティブアプリでの FIDO2 サポート](https://jpazureid.github.io/blog/azure-active-directory/advancing-modern-strong-authentication/)
- [AVD と Windows 365 での SSO とパスワードレス認証](https://techcommunity.microsoft.com/t5/windows-it-pro-blog/what-s-new-with-windows-at-microsoft-ignite-2023/ba-p/3980507#2)
- [Microsoft 管理ポータルでの条件付きアクセスのサポート](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-conditional-access-cloud-apps#microsoft-admin-portals)
- [Microsoft Entra ID におけるカスタム セキュリティ属性](https://learn.microsoft.com/ja-jp/entra/fundamentals/custom-security-attributes-overview)
- [Microsoft Entra ID を用いた Windows Local Administrator Password ソリューション](https://jpazureid.github.io/blog/azure-active-directory/Windows-Local-Administrator-Password-Solution-with-Microsoft-Entra-ID-now-Generally-Available!/)
- [デバイスを一覧して管理する機能の改善](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---enhanced-devices-list-management-experience)
- [Windows MAM](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/how-to-app-protection-policy-windows)
- [場所ベースのアクセス管理を利用している場合に GPS の場所の書き変え不可](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---users-cant-modify-gps-location-when-using-location-based-access-control)
- [有料ライセンスを持つテナントのみ Microsoft Entra ID テナントを作成可能に](https://learn.microsoft.com/ja-jp/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions)
- [Android 版 Authenticator が FIPS-140 に準拠](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new)
- [Chrome の CloudAPAuthEnabled をデバイスベースの条件付きアクセスで利用可能に](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new)

### 変更のアナウンス

#### 条件付きアクセス ポリシーの自動展開

[お客様によっては対応が必要です]

2023 年 11 月初めに、リスク情報、ライセンス、および使用状況に基づいて、お客様のテナントを自動的に保護する条件付きアクセス ポリシーの展開を [発表](https://www.microsoft.com/en-us/security/blog/2023/11/06/automatic-conditional-access-policies-in-microsoft-entra-streamline-identity-protection/) しました。これは、Microsoft マネージド条件付きアクセス ポリシーと呼ばれるもので、お客様を自動的に保護することをお知らせするものです。このポリシーは、Microsoft が作成し、お客様のテナントで有効になるポリシーです。以下のポリシーが対象となる一部のテナントに展開されます:

| ポリシー | 対象のユーザー | 生じる動作 |
|:--|:--|:--|
| Require multifactor authentication for admin portals  | 管理者ユーザー | このポリシーは、特権ロールを持つ管理者を対象とし、それら管理者が Microsoft 管理者ポータルにサインインするときに多要素認証を要求します。 |
| Require multifactor authentication for per-user multifactor authentication users  | "ユーザーごとの MFA" 機能を使用しているユーザー | このポリシーは、"ユーザーごとの MFA" 機能を使用しているユーザーに適用され、すべてのクラウド アプリに多要素認証を要求します。これにより "ユーザーごとの MFA" 機能から条件付きアクセスへの移行を促進します。 |
| Require multifactor authentication for high-risk sign-ins | Microsoft Entra ID Premium P2 を十分な数お持ちのお客様 | このポリシーはテナントのすべてのユーザーを対象とし、リスクの高いサインイン時に多要素認証と再認証を要求します。 |

対象となるすべてのテナントに対して、事前に通知の上、これらのポリシーを段階的に展開していきます。テナントでポリシーが表示されるようになったら、90 日以内にポリシーを確認し、カスタマイズするか、無効にするようご対応ください。この 90 日間は、ポリシーはレポート専用モードとなります。つまり、条件付きアクセスはポリシーを適用することなく、ポリシーが仮に適用された場合の結果をログに記録します。詳細については、ブログ「[Automatic Conditional Access policies in Microsoft Entra streamline identity protection](https://www.microsoft.com/en-us/security/blog/2023/11/06/automatic-conditional-access-policies-in-microsoft-entra-streamline-identity-protection/)」を参照ください。

> [!NOTE]
> サポート チームによる訳注: Microsoft マネージド条件付きアクセス ポリシーの詳細については、サポート チームより日本語のブログ記事である [Microsoft マネージド条件付きアクセス ポリシー](https://jpazureid.github.io/blog/azure-active-directory/microsoft-managed-conditional-access-policies/) を公開しております。併せてご参照ください。

#### Azure AD Graph の廃止に関する更新情報

[お客様によっては対応が必要です]

2023 年 6 月、弊社は Azure AD Graph API サービスの非推奨化に関する 3 年にわたる事前通知の期間が完了したことを [発表](https://jpazureid.github.io/blog/azure-active-directory/important-azure-ad-graph-retirement-and-powershell-module/) しました。このサービスは現在、廃止サイクルに入っており、廃止 (シャットダウン) は段階的に行われる予定です。弊社は、この廃止とMicrosoft Graph への移行に際しお客様を可能な限りサポートするようお約束するとともに、この変更に取り組む中で高い透明性と対話の取り組みを進めて参ることをお約束します。

##### Azure AD Graph の廃止: 第一段階

Azure AD Graph の廃止の第一段階は、2024 年後半に開始される予定です。具体的な日付は、最低 3 ヶ月前に予告し、その後のアップデートで共有します。

この第一段階に入ると、特定の日付以降に作成されたアプリケーションは、Azure AD Graph API (https://graph.windows.net) へのリクエスト時にエラーが生じるようになります。弊社ではこの時点で Microsoft Graph への移行が完了していないアプリケーションがまだ存在する可能性があることも承知しておりますので、この時点以降に作成されたアプリケーションが Azure AD Graph API をしばらくの期間延長して利用できるようにするための **オプション設定** を提供する予定です。インストールやセットアップの一環としてアプリケーションを作成および登録するようなソフトウェアをお客様が開発または配布しており、さらにこれらのアプリケーションが Azure AD Graph API にアクセスする必要がある場合は、廃止の影響を避けるために、速やかに移行作業を開始ください。このオプション設定は、アプリケーションの作成後に設定することができ、構成の変更は [AuthenticationBehaviors](https://learn.microsoft.com/ja-jp/graph/applications-authenticationbehaviors?tabs=http) のインターフェイスを通して行います。

この計画の実施時期とオプション設定の構成に関するより詳細なガイダンスは、次回の更新でお知らせする予定です。

##### Azure AD Graph API を使用しているテナント内のアプリケーションを見つけるにはどうしたらよいか？

Azure AD Graph API を使用しているテナント内のアプリケーションを特定するための新しい機能の提供に取り組んでいます。この機能は、[Microsoft Entra の推奨事項](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/howto-use-recommendations) の機能を通じて利用可能になる予定です。この機能は、2024 年初頭に利用可能になる予定です。

##### その他に利用可能なツール

- [Azure AD Graph から Microsoft Graph にアプリを移行する](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview)
- [Azure AD Graph アプリ移行計画のチェックリスト](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-planning-checklist)
- [Azure AD Graph を使用している可能性のあるアプリを特定するためのスクリプト](https://github.com/microsoft/AzureADGraphApps)
- [Microsoft Graph PowerShell SDK の PowerShell コマンドレットへの対応表](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0)

#### カスタム セキュリティ属性に関する監査ログの動作変更

[お客様によっては対応が必要です]

2023 年 10 月より、一般公開に際してカスタム セキュリティ属性の監査ログに変更が加えられます。これにより監査ログを確認しているお客様においては日常業務に影響が出る可能性があります。プレビュー中にカスタム セキュリティ属性の監査ログを参照していた場合、監査ログの確認に関わる運用作業が中断されないようにするため、2024 年 2 月までに以下の対応を実行する必要があります:

- 監査ログの新しい出力場所を使用する。
- 監査ログを確認するユーザーに「Attribute Log」のロールを割り当てる。
- 監査ログをエクスポートする場合は新しい診断設定を作成する。

詳細については、[監査ログの動作に対する変更](https://learn.microsoft.com/ja-jp/entra/fundamentals/custom-security-attributes-manage?tabs=admin-center#changes-to-audit-logs-behavior) を参照ください。

#### 新規アプリケーションにおける signInAudience プロパティの既定値の変更

[お客様による対応は不要です]

2024 年 3 月以降、Microsoft Graph のアプリケーション API を使用して作成された新しいアプリケーションでは、アプリケーション登録時の「signInAudience」プロパティの既定値が「AzureADandPersonalMicrosoftAccount」から「AzureADMyOrg」に変更されます。弊社の分析によると、ほとんどの新規アプリケーションでは、アプリケーションがテナント外のユーザーに利用されることはありません。この対応により、アプリケーションの応答速度とセキュリティが向上します。アプリケーションの signInAudience についての詳細は、ドキュメント [アプリケーション リソースの種類 - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/api/resources/application?view=graph-rest-1.0#signinaudience-values) を参照ください。

#### アプリ インスタンス ロックが既定で有効になる

[お客様による対応は不要です]

2024 年 3 月以降、Microsoft Graph のアプリケーション API を使用して作成された新しいアプリケーションでは、既定で「アプリ インスタンス ロック」が有効になります。2023 年 9 月よりワークロード ID 用にアプリ インスタンス ロックと呼ばれる機能が提供されました。この機能により、アプリ開発者は、重要なプロパティを改竄しようとする攻撃者からマルチテナント アプリを保護できます。Entra ID ポータルを使用して作成されたアプリケーションは、すでにこの設定が既定で有効になっておりますので、今後は、MS Graph、PowerShell、SDK などの他のアプリ作成機能でも有効になる予定です。詳細については、[アプリケーションでアプリ インスタンス プロパティ ロックを構成する方法 - Microsoft identity platform | Microsoft Learn](https://learn.microsoft.com/ja-jp/entra/identity-platform/howto-configure-app-instance-property-locks) を参照ください。

#### 従来のプロフィール ページがマイ アカウントに置き換わる

[お客様による対応は不要です]

本年 6 月に、従来のプロフィール ページが新しいページに置き換えられることを [発表](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-new-feature-and-change-announcements/) しました。今後、**2024 年 1 月** までに既存のプロフィール ページ (https://account.activedirectory.windowsazure.com/r#/profile) がマイ アカウント (https://www.myaccount.microsoft.com) に置き換えられます。マイ アカウントでは、アカウントの詳細、言語、プライバシー設定、セキュリティ情報などを管理することが可能です。マイ アカウントは数年前から利用可能であり、従来のプロフィール ページのすべての機能を備えています。今回の廃止により、お客様はより良く、より先進的な体験に移行されます。自動的に新しいマイ アカウントに遷移するため、お客様による操作は必要ありません。

## Microsoft Entra ID Governance

新機能の発表は以下のとおりです。

- [API 駆動型のインバウンドプロビジョニング](https://learn.microsoft.com/ja-jp/entra/identity/app-provisioning/inbound-provisioning-api-concepts)
- [グループ用の PIM の API](https://learn.microsoft.com/ja-jp/graph/api/resources/privilegedidentitymanagement-for-groups-api-overview?view=graph-rest-1.0)
- [Microsoft Entra Cloud 同期が Exchange ハイブリッドの書き戻しをサポート](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/cloud-sync/exchange-hybrid)

## Microsoft Entra Workload ID

新機能の発表は以下のとおりです。

- [マネージド サービス ID のソフト デリート機能](https://learn.microsoft.com/ja-jp/entra/identity/enterprise-apps/restore-application?tabs=http&pivots=aad-powershell)

## Microsoft Entra External ID

新機能の発表は以下のとおりです。
 
- [ゲストに対するガバナンス - 利用されていないゲストのレビュー](https://learn.microsoft.com/ja-jp/entra/identity/users/clean-up-stale-guest-accounts#monitor-guest-accounts-at-scale-with-inactive-guest-insights-preview)

## Microsoft Entra Permissions Management

新機能の発表は以下のとおりです。

- [Microsoft Entra Permissions Management と ServiceNow の連携](https://learn.microsoft.com/ja-jp/entra/permissions-management/how-to-configure-servicenow-application)

以上の内容が参考になれば幸いです。

Shobhit Sahay
