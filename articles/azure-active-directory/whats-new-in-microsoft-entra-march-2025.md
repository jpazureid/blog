---
title: Microsoft Entra の新着情報 – 2025 年 3 月
date: 2025-04-12 04:00
tags:
  - US Identity Blog
---

# Microsoft Entra の新着情報 – 2025 年 3 月

こんにちは、Azure Identity サポート チームの高田です。

本記事は、2025 年 4 月 4 日に米国の Microsoft Entra Blog で公開された [What’s new in Microsoft Entra – March 2025](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/what%E2%80%99s-new-in-microsoft-entra-%E2%80%93-march-2025/4352581) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

## Microsoft Entra の最新機能と変更のお知らせ

Microsoft は、AI を活用したセキュリティと ID の保護を強化するために、Microsoft Entra に新機能を導入しています。これらのイノベーションは、AI を使用するアプリケーションのセキュリティを保護し、AI を活用してセキュリティ対策を強化するという 2 つの主要な領域に焦点を当てたものです。AI アプリケーションを保護するために、Microsoft Entra Internet Access ではきめ細かな ID ベースのアクセス制御を利用できるようになり、組織はユーザー ロールとリスク レベルに基づいてさまざまな AI アプリ用にポリシーをカスタマイズすることが可能です。さらに、Microsoft Security Copilot における AI 駆動型の機能では、条件付きアクセス ポリシーの最適化と ID ライフサイクル管理の自動化を支援します。これににより運用が簡素化され、進化する脅威に対する防御も強化されます。詳細については、ブログ「[New innovations in Microsoft Entra to strengthen AI security and identity protection](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/new-innovations-in-microsoft-entra-to-strengthen-ai-security-and-identity-protec/3827393)」もぜひご参照ください。

そして本日は、2024 年 12 月から 2025 年 3 月までの Microsoft Entra 全体でセキュリティの改善とイノベーションを、製品ごとに整理して共有します。

## Microsoft Entra ID

### 新着情報 

- [認証方法の移行ウィザード](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-authentication-methods-manage)
- [Microsoft Entra PowerShell](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-powershell-module-now-generally-available/)
- [SSPR ポリシーの監査ログの拡張](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---expansion-of-sspr-policy-audit-logging)
- [MyAccount でプロファイル画像を更新](https://learn.microsoft.com/ja-jp/graph/profilephoto-configure-settings)
- [内部ゲスト ユーザー向けの一時アクセス パス (TAP) のサポート](https://learn.microsoft.com/entra/identity/authentication/howto-authentication-temporary-access-pass)
- [完全削除に対する保護](https://learn.microsoft.com/ja-jp/entra/identity/role-based-access-control/protected-actions-overview)

### 変更のお知らせ

#### サービス プリンシパルなしの Microsoft Entra ID 認証のサポートは 2026 年 3 月に終了します

[お客様によっては対応が必要です]

2026 年 3 月以降、Microsoft Entra ID はサービス プリンシパルなしの認証動作をサポートしなくなります。テナント内でサービス プリンシパルなしの認証要求を行うすべてのアプリケーションが影響を受け、**2026 年 3 月 31 日** までにアクションを実行しない限り、ログイン フローが失敗するようになります。

**必要な対応**: テナント管理者の皆様にて、アプリケーションのアクセスとトークンを確認することで影響の有無を確認いただけます。サインイン ログを使用して、[サービス プリンシパルなしの認証における軽減策のドキュメント](https://aka.ms/splessauth) の手順に従い、影響を受けるアプリケーションを特定ください。また、管理者には影響を受けるアプリケーションの名前が一覧された E メールも送信されます。

すべての独立系ソフトウェア ベンダーにおかれましては、廃止についてお客様に通知するとともに、事前の措置を講じるように通知ください。

**この対応が重要な理由**: この変更は、テナントで利用されているすべてのアプリケーションがサービス プリンシパルと関連付けられるようにすることで、Microsoft Entra ID のセキュリティを強化することを目的としています。

廃止と対応の詳細については、[Microsoft Learn のドキュメント](http://aka.ms/SPLessAuth) を参照ください。

#### 重要な更新情報: AzureAD PowerShell と MSOnline PowerShell の廃止 – 2025 年 3 月

[お客様によっては対応が必要です]

**変更内容**

Microsoft Entra の [変更に関するお知らせ](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/ChangeManagementHubList.ReactView) と以前の [ブログの更新](https://jpazureid.github.io/blog/azure-active-directory/important-update-deprecation-of-azure-ad-powershell-and-msonline/) でお知らせしたように、MSOnline と Microsoft AzureAD の PowerShell モジュールは 2024 年 3 月 30 日に非推奨になりました。MSOnline PowerShell モジュールの廃止は **2025 年 4 月に開始** されます。この日以降に廃止の影響を受けないようにするには、MSOnline の使用をやめて [Microsoft Graph PowerShell SDK](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/installation?view=graph-powershell-1.0) または [Microsoft Entra PowerShell](https://learn.microsoft.com/ja-jp/powershell/entra-powershell/installation?view=entra-powershell&tabs=powershell&pivots=windows) (現在プレビュー段階) に移行する必要があります。

**キー ポイント**

- MSOnline PowerShell は、2025 年 4 月上旬から 2025 年 5 月に終了 (および動作を停止) します。
- AzureAD PowerShell は 2025 年 3 月 30 日以降はサポートされなくなりますが、2025 年 7 月 1 日以降に廃止されます。この延期は、MSOnline PowerShell の移行を完了するための時間を十分にお客様に確保いただくためです。
- MSOnline PowerShell の廃止に関してお客様が十分に準備いただけるよう、2025 年 1 月から 3 月の間にすべてのテナントに対して一連の一時的な停止テストが行われました。MSOnline PowerShell の廃止に向けた最終的な準備として、さらに 3 月 10 日から 26 日の間に最大 2 つの一時的な停止テストも行われました。

新しい [Microsoft Entra の推奨事項](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/overview-recommendations) である "**使用を中止する MSOnline および AzureAD PowerShell から PowerShell を Microsoft Graph に移行する**" では、過去 30 日間のテナントでのこれらのレガシーな PowerShell モジュールの使用状況が報告されます。この推奨事項にアクセスするには、Microsoft Entra 管理センターで [ID] > [概要] > [推奨事項] を参照ください。 

**注意**: 以前のバージョンの Microsoft Entra Connect Sync では、ウィザードの実行時に MSOnline PowerShell が使用されます。Microsoft Entra Connect Sync を使用している場合は、2025 年 4 月 7 日より前に最新バージョンにアップグレードください。この日付を過ぎると、Microsoft Entra Connect Sync クライアントが更新されるまで、ウィザードの使用ができなくなります。詳細については以下をご覧ください: [Microsoft Entra Connect Sync AD FS と PingFederate 構成の更新強化](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/harden-update-ad-fs-pingfederate)

> [!NOTE]
> サポート チームによる補足: 最終的にウィザードの使用ができなくなるのは 2025 年 4 月 30 日です。詳細は上記のドキュメントをご覧ください。

**次のステップ**

- 最新のアップデートはこちらでご確認ください: https://aka.ms/msonlineretirement
- Microsoft Graph への移行に関する参照ドキュメント: [Azure AD PowerShell から Microsoft Graph PowerShell への移行](https://learn.microsoft.com/en-us/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0)

#### 重要な更新情報: Azure AD Graph の廃止 - 2025 年 3 月 

[お客様によっては対応が必要です]

**変更内容** 

Azure AD Graph API サービスの廃止は 2024 年 9 月に開始され、この廃止の次のフェーズは 2025 年 2 月 1 日に開始されました。新しいアプリケーションと既存のアプリケーションの両方で、利用延長の措置が構成されていない限り、Azure AD Graph API の呼び出しがブロックされます。アプリケーションに [利用延長の措置を設定](https://learn.microsoft.com/ja-jp/graph/applications-authenticationbehaviors?tabs=http#allow-extended-azure-ad-graph-access-until-june-30-2025) すると、アプリは 2025 年 6 月まで Azure AD Graph API を引き続き使用できるようになります。  

Microsoft Graph は Azure AD Graph API に代わるものであり、Azure AD Graph API を使用している場合はすぐに Microsoft Graph に移行し、Azure AD Graph API を使用したさらなる開発を行わないようにすることを強くお勧めします。 

Microsoft Entra 管理センターでは推奨事項の機能をご利用いただけます。この機能を利用すると、テナント内で Azure AD Graph API を使用しており、なおかつアクションが必要なアプリケーションを特定いただけます。

利用延長が設定されたアプリケーションは、できるだけ早く Microsoft Graph に移行する必要があります。Microsoft を含むソフトウェア ベンダーが提供するアプリケーションの場合は、ソフトウェアを新しいバージョンに更新する必要があります。併せてブログ [Action required: Azure AD Graph API retirement |Microsoft Community Hub](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/action-required-azure-ad-graph-api-retirement/4090533) も参照ください。  

**次のステップ**

- Azure AD Graph の提供終了に関する最新の更新情報は、https://aka.ms/AzureADGraphRetirement でご覧いただけます。
- Azure AD Graph から Microsoft Graph への移行に関する参照ドキュメント: [Azure AD Graph から Microsoft Graph にアプリを移行する](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview)

#### サインインを行う際のユーザー インターフェイスの変更 

[お客様による対応は不要です]

Authenticator アプリでの認証の [サインイン ユーザー体験](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-authentication-authenticator-app) を更新しています。新しいサインイン UX では、"サインイン要求を受信しませんでしたか？下にスワイプしてアプリのコンテンツを更新してください。" という表示が出るようになり、これによりサインイン通知を受け取っていない場合に、Authenticator アプリまたは Outlook アプリで通知を再取得できることがユーザーに提示されます。この変更は 2025 年 4 月までに予定されており、すべてのお客様に自動的にロールアウトされます。この UX の変更について、お客様からのアクションは必要ありません。

## Microsoft Entra ID Protection

### 新機能のリリース

- [Microsoft Entra ID Protection でのリアルタイムでのパスワード スプレーの検出](https://learn.microsoft.com/ja-jp/entra/id-protection/overview-identity-protection)
- [デバイス コードとレガシー認証フローを制限する新しい Microsoft マネージド条件付きアクセス ポリシー](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/new-microsoft-managed-policies-to-raise-your-identity-security-posture/4286758)

## Microsoft Entra ID ガバナンス

### 新機能のリリース

- [ライフサイクル ワークフローにおけるきめ細かい Microsoft Graph アクセス許可](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---granular-microsoft-graph-permissions-for-lifecycle-workflows)
- [Microsoft Entra Connect バージョン 2.4.129.0](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---microsoft-entra-connect-version-241290)
- [Azure ロールベースのアクセス制御での Privileged Identity Management の統合](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---privileged-identity-management-integration-in-azure-role-based-access-control)

### 変更のお知らせ 

#### Microsoft Entra Connect での証明書ベースの認証 

[お客様によっては対応が必要です]

**変更内容** 

2025 年 4 月には、既存のディレクトリ サービス アカウントでの認証に加えて、Microsoft Entra Connect から Microsoft Entra ID への認証においてアプリケーションベースの認証が導入されます。この仕組みを利用するには、暗号化キーをハードウェアベースのストレージに保存する環境が必要です。これは、[TPM](https://learn.microsoft.com/windows/security/hardware-security/tpm/trusted-platform-module-overview) またはハードウェア セキュリティ モジュール (HSM) のいずれかを指します。 

この認証方法の使用に関心のあるお客様は、まず現在の環境でこのような仕組みを受け入れ可能かを確認し、上記の暗号化キーのストレージのどちらが利用かを検討ください。追加の情報は、2025 年 4 月に新しい Microsoft Entra Connect バージョンがリリースされるときに共有されますのでしばらくお待ちください。

#### エンタイトルメント管理における代理 (On-Behalf-Of) でのアクセス パッケージ ポリシーのライセンス要件 

[お客様によっては対応が必要です]

代理 (On-Behalf-Of) ポリシーを含むアクセス パッケージのライセンス要件を更新しています。今後は、代理での要求を許可するアクセス パッケージ ポリシーを構成する際は、適切なライセンスを保持している必要があります。 

エンタイトルメント管理のアクセス許可を持ち、アクセス パッケージ ポリシーを作成または編集するユーザーが代理 (On-Behalf-Of) 要求を有効にするには、**Microsoft Entra ID Governance** または **Microsoft Entra Suite** ライセンスが必要となります。

代理 (On-Behalf-Of) ポリシーを持つ既存のアクセス パッケージに変更は加わらず、引き続き機能します。ただし、この機能が一般提供 (GA) に達すると、必要なライセンスがない場合に、新しい代理 (On-Behalf-Of) ポリシーを作成したり有効にしたりすることはできなくなります。

プレビューのフェーズ以降も代理 (On-Behalf-Of) 機能を引き続き使用するには、組織が **Microsoft Entra ID Governance** または **Microsoft Entra Suite** ライセンスを持っていることを確認ください。GA の日付が近づくにつれ、さらに追加情報を提供する予定です。ライセンスの詳細については、[Microsoft Entra ID Governance ライセンスの基礎](https://learn.microsoft.com/ja-jp/entra/id-governance/licensing-fundamentals) を参照ください。

## Microsoft Entra External ID

### 新機能のリリース

- [Microsoft Entra 外部 ID カスタム URL ドメイン](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---microsoft-entra-external-id-custom-url-domains)

### 変更のお知らせ

#### 提供終了のお知らせ: Azure AD External Identities P2 

[お客様によっては対応が必要です]

**2026 年 3 月 15 日** に予定されている B2C テナントでの Azure AD External Identities P2 の廃止に備え、2025 年 5 月 1 日より新規のお客様への Azure AD External Identities P2 の販売を停止します。 

**お客様への影響**

- **2025 年 5 月 1 日 – 新規のお客様への販売終了**: 新規のお客様に対する Identity Protection (Azure AD External Identities P2) の販売が終了します。この日付は、[以前に発表された新規のお客様への Azure AD B2C の販売終了](https://learn.microsoft.com/ja-jp/entra/external-id/customers/faq-customers#whats-happening-to-azure-ad-b2c-and-azure-ad-external-identities) に沿うものです。
- **2026 年 3 月 15 日 – この日付まで既存の B2C のお客様向けのサービスに変更はありません**: この日付よりも前に移行先を検討される場合は、代替の ID Protection の提供元として以下をご覧ください。
- **2026 年 3 月 16 日 – サービスの廃止**: サービスの継続性を確保するために、この日までに Azure AD B2C の ID Protection の代替となる提供元 (以下に列挙) に移行を完了ください。Azure AD B2C の廃止は 2030 年以降に予定されており、ID Protection は従業員テナントで引き続き利用可能であることに注意ください。

**必要なアクション**

弊社ではこれらの変更がお客様の業務に影響を与える可能性があることを理解しており、スムーズな移行を実現することをお約束します。以下に、P2 の代わりに検討できるパートナー企業と移行ガイダンスの詳細なリストを示します。 

**パートナー企業への移行**

B2C テナントにおける Microsoft Entra ID Protection から移行するには、Azure AD B2C と統合している [以下のパートナー](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/partner-gallery#identity-verification-and-proofing) の利用をお勧めします。

- [Deduce](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/partner-deduce): アカウントの乗っ取りと登録詐欺の阻止に焦点を当てた ID 検証および証明プロバイダーです。ID 詐欺を防ぎ、信頼できるユーザー体験を提供いただけます。
- [eID-Me](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/partner-eid-me?pivots=b2c-custom-policy): カナダ市民向けの ID 検証および分散型デジタル ID ソリューションです。これにより、組織は ID 保証レベル (IAL) 2 および顧客確認 (KYC) の要件を満たすことができます。
- [Experian](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/partner-experian): ユーザー属性に基づいてリスク評価を行い、不正行為を防止する ID 検証および証明プロバイダーです。
- [IDology](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/partner-idology): ID 検証ソリューション、不正防止ソリューション、コンプライアンス ソリューションなどを備えた ID 検証および証明プロバイダーです。
- [Jumio](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/partner-jumio): リアルタイムの自動 ID 検証を可能にし、顧客データを保護する ID 検証サービスです。
- [LexisNexis](https://learn.microsoft.com/en-us/azure/active-directory-b2c/partner-lexisnexis): ユーザーの ID を検証し、ユーザーのデバイスに基づいて包括的なリスク評価を提供するプロファイリングおよび ID 検証プロバイダーです。
- [Onfido](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/partner-onfido): 企業が Know Your Customer とリアルタイムでの ID 要件を満たすことを可能にする、ドキュメント ID および顔の生体認証検証ソリューションです。

**Azure AD External Identities P1 への切り替え**

B2C テナントで ID Protection を使用する必要がなく、Azure AD External Identities P1 に切り替える場合は、 価格レベルを変更する手順について [こちらのドキュメント](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/billing#change-your-microsoft-entra-pricing-tier) を参照ください。 

**ヘルプとサポート**

追加のサポートが必要な場合は、Microsoft の営業担当者に問い合わせることをお勧めします。その他の質問がある場合は、[弊社までお問い合わせ](https://learn.microsoft.com/ja-jp/azure/azure-portal/supportability/how-to-create-azure-support-request) ください。 

リソースに影響を与える可能性のあるサービスの廃止の詳細については、[Azure Retirement Workbook](https://aka.ms/ServicesRetirementWorkbook) をご覧ください。廃止は、発表されてからブックに反映されるまで最大 2 週間かかる場合があることにご注意ください。

この変更は、[公開ドキュメント](https://learn.microsoft.com/ja-jp/entra/external-id/customers/faq-customers#whats-happening-to-azure-ad-b2c-and-azure-ad-external-identities) でも言及されています。2026 年 3 月の廃止および移行オプションの詳細については、今後情報提供が可能となったときに再度共有される予定です。

## Microsoft Entra Permissions Management

### 変更のお知らせ

#### 廃止のお知らせ: Microsoft Entra Permissions Management 

[お客様によっては対応が必要です]

2025 年 4 月 1 日より、Microsoft Entra Permissions Management (MEPM) は、新しい Enterprise Agreement または直接購入のお客様への販売が終了します。さらに、5 月 1 日以降、新しい CSP のお客様への販売も終了します。2025 年 10 月 1 日をもって、Permissions Management は廃止され、この製品のサポートは終了します。 

既存のお客様は、2025 年 9 月 30 日までこの製品にアクセスでき、現在の機能は引き続きサポートされます。Microsoft は [Delinea](https://delinea.com/microsoft-ciem) と提携し、[Privilege Control for Cloud Entitlements (PCCE)](https://delinea.com/products/privilege-control-for-cloud-entitlements) を提供します。これは Microsoft Entra Permissions Management が提供する機能と同様の機能を提供する代替ソリューションです。Microsoft Entra Permissions Management を段階的に廃止するという決定は、弊社が持つイノベーション ポートフォリオを深く検討し、加えて弊社が最高のイノベーションを提供していくにあたり、差別化領域と周辺のエコシステムとの連携を十分に検討した上で行われました。Microsoft は、Microsoft Entra ポートフォリオ全体でトップクラスのソリューションを提供することに引き続き注力してまいります。詳細については、[こちらをクリック](https://aka.ms/MEPMretire) ください。

## Microsoft Entra Domain Services

### 新機能のリリース

- [Entra Domain Services のカスタム属性のサポート](https://learn.microsoft.com/ja-jp/entra/identity/domain-services/concepts-custom-attributes)

以上のとおりお知らせいたします。

Shobhit Sahay
