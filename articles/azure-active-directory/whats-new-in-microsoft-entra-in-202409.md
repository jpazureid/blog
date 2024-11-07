---
title: Microsoft Entra の新機能（2024 年 9 月）
date: 2024-11-08 09:00
tags:
    - Azure AD
    - US Identity Blog
---


こんにちは！ Azure ID チームの小出です。今回は、2024 年 10 月 9 日に米国の Microsoft Entra (Azure AD) Blog で Shobhit Sahay によって公開された [What's new in Microsoft Entra - September 2024](https://techcommunity.microsoft.com/blog/identity/whats-new-in-microsoft-entra---september-2024/4253153) を分かりやすく日本語におまとめしなおしたものになります。ご不明点などございましたらお気軽にサポートへお問い合わせをいただけますと幸いです。




# Microsoft Entra の新機能（2024 年 9 月） 

まず、業界で最も包括的なセキュア アクセス ソリューションの一つである [Microsoft Entra Suite](https://techcommunity.microsoft.com/blog/identity/microsoft-entra-suite-now-generally-available/2520427) の一般提供を開始したことをお知らせします。攻撃経路の 66 %が十分に安全でない資格情報に関与しているなか、Microsoft Entra Suite は、クラウドおよびオンプレミスのアプリへの最小特権アクセスを可能にすることで、セキュリティ侵害を防ぎます。これにより、ネットワーク アクセス、ID 保護、ガバナンス、および資格情報の検証が統合され、オンボーディングの効率化、リモート アクセスの刷新、アプリおよびリソースへの安全なアクセスが実現されます。[Microsoft Entra Suite のトライアル](https://aka.ms/EntraSuiteTrial) をぜひ開始ください。

また、昨年 11 月、弊社はサイバー攻撃の増加に対抗するために Secure Future Initiative (SFI) を立ち上げました。セキュリティは今や弊社のすべての意思決定を左右する要因となっており、2024 年 9 月に発行された [SFI の進捗報告書](https://www.microsoft.com/en-us/security/blog/2024/09/23/securing-our-future-september-2024-progress-update-on-microsofts-secure-future-initiative-sfi/) に詳細がまとめられています。本日は、2024 年 7 月から 9 月にかけての Microsoft Entra における新しいセキュリティ改善と革新を製品ごとに整理して共有します。

[「Microsoft Entra の新機能」](https://aka.ms/entra/whatsnew/sept24) ビデオもぜひご覧になり、製品のアップデートの概要を確認するとともに、詳細情報については Microsoft Entra 管理センターの [新機能ブレード](https://entra.microsoft.com/?Microsoft_AAD_IAM_clientoptimizations=false&feature.customportal=false&feature.canmodifyextensions=true&cmhisenabled=true&cmhusemsgraphapi=true#view/Microsoft_AAD_IAM/ChangeManagementHubList.ReactView) や[公開情報](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new) もご覧ください。

下記に、各サービスの新機能と、変更についてのアナウンスをおまとめしました。利用環境によって対応が必要なものもございますので、利用している機能について確認のうえ、必要に応じて対処してください。

## 新機能の紹介


### Microsoft Entra ID の新機能

- [FIDO2 セキュリティキー（パスキー）の管理者プロビジョニング](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/public-preview-microsoft-entra-id-fido2-provisioning-apis/ba-p/4062699)
- [条件付きアクセスにおける内部リスク条件](https://learn.microsoft.com/en-us/entra/identity/conditional-access/how-to-policy-insider-risk)
- [Red Hat Enterprise Linux 上の M365/Azure リソースへのデバイス ベースの条件付きアクセス](https://learn.microsoft.com/en-us/entra/identity/devices/concept-device-registration)
- [ID Protection における中間者攻撃の検出](https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks#attacker-in-the-middle)
- [Active Directory フェデレーション サービス (AD FS) アプリケーション移行ウィザード](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/migrate-ad-fs-application-howto)
- [Microsoft Authenticator の Android 版が Entra 認証において FIPS 140 準拠](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-authenticator-app#fips-140-compliant-for-microsoft-entra-authentication)

### Microsoft Entra ID ガバナンスの新機能

- [ライフサイクル ワークフローで同期されたユーザー アカウントの有効化、無効化、削除](https://learn.microsoft.com/en-us/entra/id-governance/manage-workflow-on-premises)
- [カスタム セキュリティ属性を使用してライフサイクル ワークフロー スコープを構成](https://learn.microsoft.com/en-us/entra/id-governance/manage-workflow-custom-security-attribute)
- [ライフサイクル ワークフローにおけるワークフロー履歴のインサイト](https://learn.microsoft.com/en-us/entra/id-governance/lifecycle-workflow-insights)
- [ユーザの職務内容変更時に異動タスクを実行するカスタム ワークフローの設定](https://learn.microsoft.com/en-us/entra/id-governance/tutorial-mover-custom-workflow-portal)
- [エンタイトルメント管理の管理下にあるゲスト ユーザーの猶予期間のサポート](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-external-users#manage-the-lifecycle-of-external-users)
- [クロス テナントでのマネージャーの同期](https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-overview#attributes)
 
### Microsoft Entra External ID の新機能

- [Azure App Service と Microsoft Entra External ID 間での簡単な認証](https://learn.microsoft.com/en-us/azure/app-service/scenario-secure-app-authentication-app-service?toc=%2Fentra%2Fexternal-id%2Ftoc.json&bc=%2Fentra%2Fexternal-id%2Fbreadcrumb%2Ftoc.json&tabs=external-configuration)
- [Visual Studio Code 用の Microsoft Entra External ID 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.ms-entra)
 
### Microsoft Entra Verified ID の新機能

- [Verified ID 顔チェック](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/face-check-is-now-generally-available/ba-p/4175880)
- [管理ポータル UI 経由でカスタム認証情報の公開が可能に](https://learn.microsoft.com/en-us/entra/verified-id/how-use-vcnetwork) 

### Microsoft Entra Internet Access の新機能

- [Microsoft Entra Internet Access](https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access#microsoft-entra-internet-access)
 
### Microsoft Entra Private Access の新機能

- [Microsoft Entra Private Access](https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access#microsoft-entra-private-access)



## 変更のお知らせ（まとめ）

### セキュリティの改善

| 内容	| 対応が必要かどうか|
| -----|-----| 
|Microsoft Entra 管理センターでの MFA 強制適用	| お客様によっては対応が必要| 
|アップル社製デバイスのキーチェーン・バッキング・デバイスIDの廃止 | お客様によっては対応が必要 |
|Microsoft Entra Connectの最新バージョンにアップグレード | お客様によっては対応が必要 |
|login.microsoftonline.comの新しい認証局（CA） | お客様によっては対応が必要 |
|Microsoft Copilot、企業向けデータ保護機能を更新 | 対応の必要なし |
|すべてのAndroidユーザーに対してデフォルトでブラウザアクセス（EBA）を有効にする |対応の必要なし |
|Microsoft Entra Connect Sync および Cloud Sync の Directory Synchronization Accounts (DSA) ロールの権限制限	 | 対応の必要なし |
|SSO登録ダイアログの今後の改善予定	| 対応の必要なし |


    
###  ID の最新化

| 内容	| 対応が必要かどうか|
| -----|-----| 
| 重要な更新: Azure AD グラフのリタイアメント | お客様によっては対応が必要 | 
| 重要な更新：AzureAD PowerShell および MSOnline PowerShell のリタイアメント | お客様によっては対応が必要 | 
| ライセンス割り当ての変更は、Microsoft Entra Admin Center ではサポートされなくなります。 | お客様によっては対応が必要 | 
| Microsoft Graph用Bicepテンプレートでの動的な型のバージョン管理 | お客様によっては対応が必要 | 
| Entra Portalでのレガシーユーザー認証方法の管理経験の廃止 | 対応の必要なし | 
| ブラウザ アクセスの有効化 (EBA) UI の廃止	| 対応の必要なし | 
| マイ グループ管理コントロールの変更延期 | 対応の必要なし | 
| マイ セキュリティ情報 サインイン方法の追加ピッカーのユーザー インターフェイスの更新	| 対応の必要なし | 
| プロビジョニングUXの近代化	| 対応の必要なし | 

### ユーザー エクスペリエンスの向上


| 内容	| 対応が必要かどうか|
| -----|-----| 
アクセス・パッケージ・ディスカバリーのためのブラウズ・ベースから検索ベースのソリューションへの移行	|  お客様によっては対応が必要 | 

### Microsoft Entra Internet Access と Microsoft Entra Private Access に関する変更

| 内容	| 対応が必要かどうか|
| -----|-----| 
| Microsoft Entra Internet Access および Microsoft Entra Private Access の今後のライセンス実施について	 |  お客様によっては対応が必要 | 


## 変更のお知らせ（詳細）

### セキュリティの改善

#### Microsoft Entra 管理センターでの MFA 強制適用の予定

[対応が必要な場合があります］

お客様に最高レベルのセキュリティを提供するという弊社のコミットメントの一環として、Azure にサインインするユーザーに多要素認証 (MFA) を要求することを [以前に発表](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/update-on-mfa-requirements-for-azure-sign-in/ba-p/4177584) しました。MFA の適用範囲には、Azure ポータルと Intune 管理センターに加え、[Microsoft Entra 管理センター](https://entra.microsoft.com/) も含まれます。この変更は段階的に展開されるため、お客様においては対応を順次進めるようご対応ください。段階的な展開フェーズの詳細は下記のとおりです:

**フェーズ 1** : **2024 年 10 月 15 日** 以降、Entra 管理センター、Azure ポータル、および Intune 管理センターへのサインインに MFA が必要になります。この施行は、全世界の全テナントに順次展開されていきます。このフェーズでは、Azure Command Line Interface、Azure PowerShell、Azure モバイルアプリ、Infrastructure as Code（IaC）ツールなど、他の Azure クライアントには影響を及ぼしません。

**フェーズ 2**：2025 年初頭から、Azure CLI、Azure PowerShell、Azure モバイルアプリ、および Infrastructure as Code（IaC）ツールのサインイン時にMFAを段階的に実施します。

弊社からは、すべての Entra のグローバル管理者に電子メールおよび Azure サービス正常性の通知をとおして 60 日の事前通知を送付し、強制の開始日と必要な対応についてお知らせする予定です。加えて、Azure ポータル、Entra 管理センター、M365 メッセージセンターでも追加の通知を行う予定です。

弊社では、この MFA の強制に備えるにあたり一部のお客様でより長い準備期間が必要なことも承知しております。このため、複雑な環境や技術的障壁のあるお客様向けに延長期間を設けます。弊社からの通知には、お客様テナントでの MFA 強制の開始時期を延長する手順、延長期間、そのリンクも含まれる予定です。詳細については、
[MC862873 - Azure ポータル (および Azure CLI 等) の MFA 義務付けの延長申請について](https://jpazureid.github.io/blog/azure-active-directory/MC862873-azure-portal-mfaenforcement-update-grace-period/) もご覧ください。


#### 日付変更のお知らせ: Apple 社製デバイスのキーチェーンに基づくデバイス ID の廃止

[対応が必要な場合があります］

今年初め、Microsoft Entra ID プラットフォームにおける Apple デバイスのキーチェーンに基づくデバイス ID の廃止を[発表](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/what-s-new-in-microsoft-entra-june-2024/ba-p/3796387) しました。 以前発表した 2026 年 6 月の非推奨の日程は、弊社がコミットメントとする安全な設計と既定の設定への対応の一環として、2025 年 6 月に前倒しされました。この変更は、デバイスのセキュリティを強化し、お客様のデータをより適切に保護するために行われます。

この変更が実施されると、Microsoft Entra ID によって管理される新規登録された Apple デバイスは、Apple の Secure Enclave に基づく、強力なハードウェア ベースのシークレットを使用するようになります。詳細については、[この非推奨に関する最新のドキュメント](https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin#upcoming-changes-to-device-identity-key-storage) をご覧ください。お客様とアプリケーションの開発ベンダーの皆様におかれましては、この新しいデータ ストアとの互換性に問題がないかソフトウェアのテストを進めることをお勧めします。
 
#### 2025 年 4 月 2 日までに Microsoft Entra Connect を最新バージョンにアップグレード

[対応が必要な場合があります］

2024 年 10 月上旬に Microsoft Entra Connect Sync の新バージョンをリリースする予定です。このバージョンでは、バックエンドのサービス変更が含まれており、当社のセキュリティがさらに強化されます。サービスの中断を避けるため、お客様は 2025 年 4 月上旬までにそのバージョン (2.4.XX.0) にアップグレードする必要があります (正確な期限はバージョン リリース時に発表されます)。

今後のリリース予定については、[ロードマップ](https://entra.microsoft.com/?Microsoft_AAD_IAM_clientoptimizations=false&feature.customportal=false&feature.canmodifyextensions=true&cmhisenabled=true&cmhusemsgraphapi=true#view/Microsoft_AAD_IAM/ChangeManagementHubList.ReactView) をご覧ください。Connect Sync の 2025 年初頭のリリースと同時に、サポートされているお客様には自動アップグレードを行います。自動アップグレードをご希望のお客様は、[自動アップグレードが構成されていること](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-install-automatic-upgrade) をご確認ください。

サービス変更の最小要件と予想される影響の一覧については、[こちらの記事](https://aka.ms/connectsync-bec-servicechange-blog) をご覧ください。アップグレード関連のガイダンスについては、[ドキュメント](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-upgrade-previous-version) をご覧ください。

> [!NOTE]
> Microsoft Entra Connect のバージョンアップに関するお知らせは、 Microsoft 365 管理センター上のメッセージ センターにおいても、MC906491 にてお知らせいたしております。
>
> なお、 Entra Connect のアップグレードに関しては、期限の直前に通知に気が付いた、期限を過ぎてしまったがどうしたらよいかといった内容をよくお問い合わせいただいております。手順の詳細などは下記ブログでもご案内しておりますので、期限に余裕をもって準備・対処を実施いただけますようお願い申し上げます。
>
> [Microsoft Entra Connect アップグレード手順詳細](https://jpazureid.github.io/blog/azure-active-directory-connect/how-to-upgrade-details/)
>
> [Microsoft Entra Connect 2.3.20 のインストールおよびアップグレードに失敗する際の対応方法](https://jpazureid.github.io/blog/azure-active-directory-connect/azure-ad-connect-2-3-20/)


#### login.microsoftonline.com の新しい認証局 (CA):  DigiCert 証明書のみを信頼するお客様は対応が必要

[対応が必要な場合があります］

Microsoft Entra ID は、login.microsoftonline.com ドメインのサーバー証明書に新しい認証局 (CA) を導入します。現在、login.microsoftonline.comへの接続には、DigiCert の証明書が使用されています。2024 年 10 月 1 日以降、Microsoft Azure CA によって発行された証明書も提示される可能性があります。このアップデートは、Entra ID のセキュリティを強化し、耐障害性を向上させるためのものです。これにより、Microsoft Azure CA を信頼していないお客様や、クライアント側を DigiCert の証明書に固定しているお客様は、認証に失敗する可能性があるため、影響を受ける可能性があります。

**推奨される対策:**

問題の発生を防ぐために、[Azure 証明書の公開ドキュメント](https://learn.microsoft.com/en-us/azure/security/fundamentals/azure-ca-details?tabs=root-and-subordinate-cas-list) に記載されているすべてのルート認証局および下位認証局を信頼することを推奨します。この文書には、1 年以上前から Microsoft Azure CA が含まれています。login.microsoftonline.com ドメインを使用している Entra ID ユーザーにおいては、シームレスな移行のために、DigiCert へのクライアント側の固定をすべて解除し、新しい Azure CA を信頼することが重要です。中断のない安全なサービスを保証する方法の詳細については、[パブリック PKI のクライアント互換性に関するドキュメント](https://learn.microsoft.com/en-us/azure/security/fundamentals/azure-ca-details?tabs=root-and-subordinate-cas-list#client-compatibility-for-public-pkis) をご確認ください。

####  Microsoft Copilot、企業向けデータ保護機能を更新

[対応不要です］

先月、Microsoft Entra アカウントを持つユーザー向けの無料の Microsoft Copilot サービスにいくつかのアップデートを行い、データ セキュリティ、プライバシー、コンプライアンスを強化し、ユーザー体験をよりシンプルなものにしました。ユーザーが Entra アカウントでサインインすると、Microsoft Copilot によりエンタープライズ データ保護 (EDP) が提供され、エンタープライズ環境および教育向けに設計された、より新しくシンプルな、広告なしのユーザー インターフェイスにユーザーは誘導されます。

Microsoft Copilot の EDP を使用すると、データは外部で利用されることなく、基盤モデルの学習に使用されることもありません。EDP の詳細については、当社の[ドキュメント](https://aka.ms/EDPLearn) を参照してください。

また、お客様が Entra アカウントに加えて Microsoft 365 サブスクリプションをお持ちの場合、Microsoft Copilot をピン留めすることでアプリ内アクセスを有効にできます。Microsoft Copilot をピン留めすると、9 月中旬から Microsoft 365 アプリ内でも Microsoft Copilot が表示されるようになり、Microsoft Teams と Outlook にも近日中にこの機能が追加される予定です。Microsoft Copilot のチャット履歴などの追加機能は、Microsoft 365 のサブスクリプションを契約しているユーザーも利用できます。

Microsoft 365 サブスクリプションの有無にかかわらず、これらの変更に関する追加情報については、当社の[ブログおよび FAQ](https://aka.ms/MsftCopilot-MTCBlog) をご覧ください。

Microsoft Copilot のこれらのアッププデートについては、今後のさらなる機能をお楽しみにお待ちください。9 月中旬より前に、エンタープライズ データ保護機能を搭載した Microsoft Copilot のアップデートを試用されたい場合は、プライベート プレビューをご利用いただけます (数に限りがあります)。お申し込みは[フォーム](https://aka.ms/CopilotPreviewSignup)にご記入ください。

#### すべての Android ユーザーにおける既定でのブラウザー アクセス (EBA) の廃止

[対応不要です］

継続的なセキュリティ強化の一環として、Android 用の Authenticator および Company Portal アプリにおける Enable Browser Access (EBA) のユーザー インターフェイスが廃止されます。その結果、すべての Android ユーザーでブラウザーでのアクセスが既定で有効になります。この変更は自動的に行われるため、管理者や Android ユーザーからの対応は必要ありません。

#### Microsoft Entra Connect Sync および Cloud Sync の Directory Synchronization Accounts (DSA) ロールの権限制限

[対応不要です］

継続的なセキュリティ強化の一環として、特権をもつ "ディレクトリ同期アカウント" ロールから未使用の権限を削除しました。このロールは、Connect Sync および Cloud Sync が Entra ID と Active Directory オブジェクトを同期するためにのみ使用されます。この機能強化の恩恵を受けるために、お客様が何らかの対応を行う必要はありません。変更されたロール権限の詳細については、[ドキュメント](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#directory-synchronization-accounts) を参照ください。

#### SSO登録ダイアログの今後の改善予定

[対応不要です］

ユーザーが Windows デバイスにアカウントを追加する際のエンド ユーザー体験について、いくつかの改善を行っています。SSO 登録ダイアログ (同意) の表示内容を改善し、エンドユーザーから見える選択項目とその影響をわかりやすくする予定です。この変更には、画面上に 'Learn more' のリンクを表示する変更も含まれます。このリンクをクリックすると、ユーザーが十分な情報を得た上で項目を選択できるよう、より詳細な情報を提供する Microsoft Learn の記事が開きます。新しい SSO 登録ダイアログは、2024 年 10 月から順次導入される予定です。詳細は[こちら](https://learn.microsoft.com/en-us/mem/intune/user-help/sso-dialog-faqs) をご覧ください。

### ID の刷新 

#### 重要な更新: Azure AD Graph の廃止

[対応が必要な場合があります］

[Azure AD Graph API サービスの廃止](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/june-2024-update-on-azure-ad-graph-api-retirement/ba-p/4094534) は 2024 年 9 月 1 日に開始され、最終的には新規および既存のアプリケーションの両方に影響を与えます。今後数週間かけて廃止に向けたフェーズを開始します。新しいアプリケーションは、アクセスを延長するよう設定されていない限り、Azure AD Graph API を使用できなくなります。 Microsoft Graph が Azure AD Graph APIs の移行先です。Azure AD Graph API を利用されているお客様は直ちに Microsoft Graph に移行し、Azure AD Graph APIs を使用した今後の開発を行わないようにすることを強く推奨します。

##### Azure AD Graph APIサービスの段階的廃止のタイムライン 

| フェーズ開始日  |	既存アプリへの影響  |	新規アプリへの影響 |
| -----|-----|-----|  
| 2024 年 9 月 1 日  |  	なし。  	| なし。  |  
| 2025 年 2 月 1 日   |	アプリケーションは、[blockAzureAdGraphAccess](https://learn.microsoft.com/en-us/graph/applications-authenticationbehaviors) を false に設定して Azure AD Graph へのアクセスを延長して許可するようにアプリが構成されている場合を除き  Azure AD Graph API へのリクエストを行うことができなくなります。  | 	新しいアプリでは、[blockAzureAdGraphAccess](https://learn.microsoft.com/en-us/graph/applications-authenticationbehaviors) を false に設定して Azure AD Graph アクセスを延長して許可するようにアプリが構成されている場合を除き、 Azure AD Graph API の使用がブロックされます。新しいアプリでは Microsoft Graph を使用するとを強く推奨します。
| 2025 年 7 月  |	Azure AD Graph が完全に廃止されます。Azure AD Graph API リクエストは機能しなくなります。  	| Azure AD Graph が完全に廃止されます。Azure AD Graph API リクエストは機能しなくなります。 

##### 必要な対応:
サービスの中断を避けるために、アプリケーションを Microsoft Graph API に[移行する手順](https://aka.ms/AzureADGraphMigration) に従って、アプリを移行ください。 

**アプリの Azure AD Graph アクセスを 2025 年 7 月まで延長する必要があるお客様へ**

アプリがまだ Microsoft Graph に移行を完了していない場合は、この廃止期限を延長可能です。アプリケーションの [authenticationBehaviors](https://learn.microsoft.com/en-us/graph/applications-authenticationbehaviors?tabs=http) の構成で blockAzureADGraphAccess 属性を false に設定すると、アプリケーションは 2025 年 6 月 30 日まで Azure AD Graph API を使用できます。詳細なドキュメントはこちらをご覧ください。 

この設定を false に設定しない限り、新しいアプリケーションは Azure AD Graph API にアクセスしようとすると 403 エラーを受け取ります。2024 年に Microsoft Graph への移行が完了しない既存のアプリケーションについては、今すぐこの設定を行うようご対応ください。

**Azure AD Graph API を使用しているテナント内のアプリケーションを特定する必要があるお客様へ**

[Microsoft Entra の推奨機能](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/overview-recommendations) は、テナントを安全で健全な状態にするための推奨事項を提供し、同時に、Entra ID で利用可能な機能の価値をお客様が最大化できるようにする機能です。

この機能では、テナント内で Azure AD Graph API を頻繁に使用しているアプリケーションとサービス プリンシパルに関する情報を表示する [2 つの Entra の推奨事項](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/recommendation-migrate-to-microsoft-graph-api) を提供します。これらの新しい推奨事項は、影響を受けるアプリケーションとサービス プリンシパルを特定し、お客様が Microsoft Graph に移行しやすくするよう支援します。

参考:
- [Azure Active Directory（Azure AD）グラフからMicrosoftグラフへの移行](https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-overview)
- [Azure AD Graphアプリケーション移行計画チェックリスト](https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-planning-checklist)
- [Azure AD GraphからMicrosoft Graphへの移行に関するFAQ](https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-faq)  

#### 重要な更新: AzureAD PowerShell および MSOnline PowerShell の廃止

[対応が必要な場合があります］

2024 年 3 月 30 日をもって、レガシーの Azure AD PowerShell、Azure AD PowerShell Preview、および MS Online モジュールは[非推奨](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/important-update-deprecation-of-azure-ad-powershell-and-msonline/ba-p/4094536) となりました。これらのモジュールは 2025 年 3 月 30 日まで機能し続けますが、それ以降は廃止され、機能しなくなります。[Microsoft Graph PowerShell SDK](https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview?view=graph-powershell-1.0) が、これらのモジュールの代替となるため、できるだけ早くスクリプトを Microsoft Graph PowerShell SDK に移行する必要があります。

テナントでの Azure AD PowerShell の使用状況を確認するために、**「Migrate Service Principals from the retiring Azure AD Graph API to Microsoft Graph」** と題された [Entra Recommendation](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/overview-recommendations) を使用することができます。この推奨事項は、AzureAD PowerShell を含め、テナント内で Azure AD Graph API を使用しているアプリケーションを表示します。

最近ですが、[Microsoft Entra PowerShell](https://aka.ms/EntraPSPreview) モジュールのパブリック プレビューが開始されました。この新しいモジュールは、Microsoft Graph PowerShell SDK をベースに構築され、シナリオに特化したコマンドレットを提供します。Microsoft Graph PowerShell SDK のすべてのコマンドレットと完全に相互運用可能で、シンプルでドキュメント化されたコマンドで複雑な操作を実行できます。また、このモジュールは、非推奨の AzureAD モジュールからの移行をより簡単にするための下位互換性オプションも提供しています。

Microsoft Graph API は、最近、「ユーザーごとの MFA」設定の読み取りおよび構成が[可能となりました。](https://developer.microsoft.com/en-us/graph/changelog?search=e22b3741-9f9a-4d25-af9d-e935018a8b68)Microsoft Graph PowerShell SDK コマンドレットでも近日中に利用できるようになる予定です。

#### Microsoft Entra Admin Center でのライセンス割り当ての変更が非サポートに

[対応が必要な場合があります]

これは、9 月中旬に Microsoft Entra 管理センターおよび Microsoft Azure 管理ポータルでのユーザーおよびグループのライセンス割り当ての変更がサポートされなくなったことの再度のお知らせです。今後は、これらのポータルでのライセンス割り当ては読み取り専用となります。ポータルからユーザーとグループのライセンス割り当てを変更する場合は、[Microsoft 365 管理センター](https://admin.microsoft.com/) にアクセスする必要があります。なお、この変更は API や PowerShell モジュールには影響しません。ライセンス割り当てに関する問題が発生した場合は、Microsoft 365 サポートまでご連絡ください。詳細については、[こちらをクリック](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/assign-licenses-to-users?view=o365-worldwide) してください。
 
#### Microsoft Graph 用 Bicep テンプレートでの動的な型のバージョン管理

[対応が必要な場合があります］

2024 年 10 月に、Microsoft Graph 用の Bicep テンプレート (パブリック プレビュー) に機能更新が実施されます。この動的な型の機能は、ベータ版と v1.0 の両方で、Microsoft Graph Bicep 型のセマンティック バージョニングを可能にします。Bicep ファイルの編集中に、現在の方法である Nuget パッケージを使用するのでなく、[Microsoft artifact レジストリ](https://mcr.microsoft.com/) から参照される Microsoft Graph Bicep 型のバージョンを指定可能になります。動的な型を使用することで、将来は快適変更が生じても、古いバージョンのリソース型を使用する既存の Bicep ファイルのデプロイに影響を与えることなく、既存の Microsoft Graph Bicep リソース型を使用し続けることができます。

既定で用意されている型は非推奨になり、2025 年 1 月 24 日に廃止されます。廃止日まで、現在の既定の型は新しい動的な型と共存します。Microsoft Graph Bicep の型の変更は、新しいバージョンの動的型でのみ利用可能となります。

##### 必要なアクション:
Bicep テンプレートの展開が失敗しないようにするため、2025 年 1 月 24 日までに新しい動的な型に切り替えるようご対応ください。この切り替えには、bicepconfig.json とメインの Bicep ファイルを少し更新する必要があります。さらに、更新された、または新しい Microsoft Graph リソース タイプを利用するには、Bicep ファイルが使用する型バージョンを更新する必要があります。次のステップについては、[こちらをクリック](https://aka.ms/graphBicepDynamicTypes) ください。

#### Entra ポータルでのレガシーなユーザー認証方法の管理画面の廃止

[対応不要です］

2024 年 10 月 31 日より、Entra ポータルのレガシーなユーザー インターフェイス (UI) でユーザーの認証方法を管理する機能を廃止します。その代わりに、レガシーな UI と完全な互換性を持ち、最新の方法 (Temporary Access Pass、パスキー、QR+Pin など) と設定を管理できる新しい UI を提供します。これは、エンド ユーザーが自身の認証方法を管理する方法や、Entra にサインインする機能には影響しません。詳しくは、[Microsoft Entra 多要素認証のユーザー認証方法の管理](https://learn.microsoft.com/entra/identity/authentication/howto-mfa-userdevicesettings) をご覧ください。
 
#### ブラウザ アクセスの有効化 (EBA) UI の廃止

[対応不要です］

EBA は、Android ブローカー アプリ (Company Portal や Authenticator など) の機能で、Entra ID のデバイス登録証明書を Android デバイス上のグローバル キーチェーンに複製する機能です。これにより、Chrome などのブローカーと統合されていないブラウザでも、Entra のデバイス準拠ポリシーに対応するために必要なデバイス認証用の証明書にアクセスできるようになります。

全体的なセキュリティ強化の一環として、Entra ID のデバイス登録証明書と Android デバイス ID をハードウェアに固定して紐づけるよう移行を進めています。これにより、将来的にトークン保護ポリシーが適用可能になり、さらにデバイス準拠ポリシーを迂回できないようにすることも可能になります。この移行により、デバイス ID がハードウェアにバインドされるようになるため、EBA UI では鍵を複製してエクスポートすることができなくなります。Authenticator および Company Portal アプリの Enable Browser Access (EBA) UI は廃止され、ブラウザー アクセス (Chrome など) はデバイス登録時に自動的に有効化される予定です。

 この機能は、Intune MDM ユーザーには既に提供されています。今回の変更は、VMWare や Jamf モバイル デバイス管理 (MDM) ソフトウェアを使用しているユーザーなど、Intune 以外のユーザーを対象としたものです。この変更は、2025 年上半期にすべてのお客様に適用されます。現時点では、お客様側での対応は何も必要ありません。

#### 自分のグループにおける管理者設定の変更延期

[対応不要です］

Microsoft Entra 管理センターのセルフサービスのグループ管理の設定には「My Groups のグループ機能にアクセスできるユーザーを制限する」という設定があり、この設定は 2024 年 6 月に廃止予定であるということが [2023 年 10 月に発表](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/what-s-new-in-microsoft-entra/ba-p/3796395)されました。この変更は現在も引き続き検討中であり、当初の廃止予定は一旦延期されました。新しい廃止予定日は今後発表される予定です。

#### セキュリティ情報におけるサインイン方法の選択画面のユーザー インターフェイスの更新

[対応不要です］
 
2024 年 8 月より、セキュリティ情報ページの「サインイン方法の追加」ダイアログが更新されました。サインイン方法の説明が改善され、新しい見た目や使い心地になりました。この変更により、ユーザーが「サインイン方法の追加」をクリックすると、最初に、組織の認証方法ポリシーで許可されている、利用可能な最も強力な方法の登録が推奨されます。また、ユーザーは「その他のオプションを表示」を選択し、ポリシーで許可されているすべての利用可能なサインイン方法から選択することもできます。管理者の操作は必要ありません。

#### プロビジョニング UX の刷新

[対応不要です］

現在のアプリケーション/HR プロビジョニングとクロステナント同期の UX を刷新します。この変更には、新しい概要ページに加え、アプリケーションへの接続、スコープ、および属性マッピングを構成するユーザー体験の刷新が含まれます。新しいユーザー体験には、現在お客様が利用可能なすべての機能が含まれており、お客様による対応は必要ありません。新しいユーザー体験は、2024 年 10 月末から順次提供を開始しますが、2024 年 1 月までは既存のユーザー体験をご利用いただけます。

### ユーザー体験の向上
 
#### アクセス パッケージの探し方が一覧からの選択ベースから検索ベースに移行

[対応が必要な場合があります]
 
[My Access](https://myaccess.microsoft.com/) において、ユーザーにお勧めのアクセス パッケージが一覧で表示されるという新機能が追加されます。これにより、ユーザーはアクセス パッケージの一覧をスクロールして探すことなく、最も関連性の高いアクセス パッケージを素早く閲覧できるようになります。  テナントにあるすべてのアクセス パッケージを一覧して検索することも可能です。この変更は、10 月末までにプレビュー (オプトイン) としてすべてのお客様に展開され、展開後はこの変更についてお知らせする製品内のメッセージが画面上に表示されます。11 月末までにオプトアウトのプレビューに移行し、12 月に一般提供を開始する予定です。

Global Secure Access:  Microsoft Entra Internet および Microsoft Entra Private Access


#### Microsoft Entra Internet Access および Microsoft Entra Private Access の今後のライセンス強制

[対応が必要な場合があります]

2024 年 10 月初旬より、[Microsoft Entra Internet Access](https://go.microsoft.com/fwlink/?linkid=2282543) および [Microsoft Entra Private Access](https://go.microsoft.com/fwlink/?linkid=2282541) のライセンス強制が Microsoft Entra 管理センターで開始されます。これは、2024 年 7 月に開始された Microsoft Entra Internet Access および Microsoft Entra Private Access の一般提供から 90 日間の通知期間に続くものです。Global Secure Access の詳細については、[こちら](https://learn.microsoft.com/entra/global-secure-access/overview-what-is-global-secure-access#licensing-overview) をご覧ください。

どちらのライセンスも 30 日間のトライアルが可能です。 価格については[こちら](https://go.microsoft.com/fwlink/?linkid=2282542) をご覧ください。 


