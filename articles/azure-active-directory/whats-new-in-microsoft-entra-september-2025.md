---
title: "Microsoft Entra の新情報 – 2025 年 9 月"
date: 2025-12-07 09:00
tags:
    - Microsoft Entra
    - US Identity Blog
---

# Microsoft Entra の新情報 – 2025 年 9 月

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2025 年 10 月 17 日に米国の Microsoft Entra Blog で公開された [What’s new in Microsoft Entra – September 2025](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/what%E2%80%99s-new-in-microsoft-entra-%E2%80%93-september-2025/4352576) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

## Microsoft Entra の最新機能や変更発表についてお知らせします

マイクロソフトは Microsoft Entra に高度な AI 駆動のセキュリティ機能を導入し、インテリジェントな自動化を通じて ID 保護を強化しています。Microsoft Entra の Security Copilot は、アクセスのガバナンスを改善するために AI に基づく知見と推奨事項を組織に提供し、加えて条件付きアクセスの最適化エージェントは、新たな脅威に効果的に対応するとともに、対応プロセスをより効率化するために継続的にポリシーを分析します。これらのソリューションにより、セキュリティ運用の中核に AI が統合され、より効率的な意思決定、強固な防御、そして ID 管理におけるより高い保証レベルの実現を支援します。

ここでは、2025 年 7 月から 2025 年 9 月までの Microsoft Entra における最新のセキュリティ改善と革新を、製品別に整理してご紹介いたします。

## Microsoft Entra – セキュリティを高める AI

### 新機能のリリース

- [Microsoft Entra における Security Copilot](https://learn.microsoft.com/ja-jp/entra/security-copilot/security-copilot-in-entra)
- [Microsoft Entra の条件付きアクセスの最適化エージェント](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/agent-optimization)
- [条件付きアクセス エージェントがエージェントによるレポート専用ポリシーの作成を無効化する機能をサポート](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/agent-optimization#agent-capabilities)

## Microsoft Entra ID

### 新機能のリリース

- [Microsoft Entra ID を用いた macOS 向けのプラットフォーム SSO](https://learn.microsoft.com/ja-jp/entra/identity/devices/macos-psso)
- [フロントラインワーカー向けの QR + PIN のシンプルな認証方法](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-authentication-qr-code)
- [Microsoft Graph リソース用の Bicep テンプレート](https://learn.microsoft.com/ja-jp/graph/templates/bicep/overview-bicep-templates-for-graph)
- [条件付きアクセスの What If API](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---conditional-access-what-if-api)
- [事前統合されたギャラリー アプリやカスタムの SAML アプリを使ったエンタープライズ アプリの SSO](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---enterprise-app-sso-via-pre-integrated-gallery-app-or-customer-saml-apps)
- [制限付きの管理単位](https://learn.microsoft.com/ja-jp/entra/identity/role-based-access-control/admin-units-restricted-management)

### 変更のお知らせ

#### 2026 年 9 月 30 日までに最新バージョンの Microsoft Entra Connect へアップグレードが必要

[お客様によっては対応が必要です]

Microsoft は、Active Directory と Microsoft Entra ID 間の安全な同期をサポートするために、ファーストパーティーのサービス プリンシパルである Microsoft Entra AD Synchronization Service (アプリ ID: 6bf85cfa-ac8a-4be5-b5de-425a0d0dc016) を導入しました。このアプリケーションは、Microsoft Entra Connect を経由したオンプレミスから Entra ID への同期に不可欠であり、管理センターのエンタープライズ アプリケーションの個所から管理可能です。

Microsoft Entra Connect は現在、このファーストパーティ アプリケーションを使って Active Directory と Microsoft Entra ID 間の同期を行っています。お客様は **2026 年 9 月** までにバージョン **2.5.79.0** 以降へのアップグレードが必要です。

今後のリリースのタイムラインについては [ロードマップ](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/ChangeManagementHubList.ReactView) をご確認いただき、アップグレード計画をお立てください。サポートされている場合は、弊社からお客様環境を自動アップグレードする予定です。自動アップグレードを希望するお客様は、自動アップグレードの設定を必ず実施ください。

サービス変更による最低要件および予想される影響の一覧については、[この記事](https://aka.ms/aws1stpartyapp) をご参照ください。アップグレードに関するアドバイスについては、[当社のドキュメント](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-upgrade-previous-version) をご覧ください。

#### すべての Android ユーザーに対してブラウザー アクセスが既定で有効化

[お客様によっては対応が必要です]

[2024 年 9 月](https://jpazureid.github.io/blog/azure-active-directory/whats-new-in-microsoft-entra-in-202409/) に発表されたとおり、継続的なセキュリティ強化の一環として、Android 向けの Authenticator および Company Portal アプリにおける Enable Browser Access (EBA) ユーザー インターフェースを廃止します。したがって、2026 年 3 月からすべての Android ユーザーに対して既定でブラウザー アクセスが有効になります。この変更は自動的に行われるため、管理者や Android ユーザーの対応は不要です。

お客様が Android モバイル デバイス管理 (MDM) の提供事業者である場合は、デバイス登録時にブラウザー アクセスを有効にするための [ドキュメント](https://aka.ms/MDMBrowserAccessGuidance) をご確認ください。

#### ADAL から MSAL への移行に関する推奨事項 API の廃止

[お客様によっては対応が必要です]

ADAL から MSAL への移行に関する推奨事項の API は **2025 年 12 月 15 日** に廃止されます。この日以降、管理者は Microsoft Entra Recommendations の機能において「ADAL から MSAL への移行」の推奨事象を確認できなくなり、API 経由でも取得できなくなります。

代わりに、**サインイン ログを Microsoft Graph API 経由で直接照会する** ことをお勧めします。管理者は Entra のサインイン ログで、特に **Azure AD App Authentication Library** フィールドの配下にある authenticationProcessingDetails フィールドを参照することで、各リクエストに使用されている認証ライブラリを特定いただけます。

以下の対応を実施ください:

- API を無効化するためにお客様側での対応は不要であり、自動的に廃止されます。
- ユーザーに通知し、ドキュメントを更新するとともに、認証ライブラリを追跡を行う際は Microsoft Graph API によるクエリに移行します。

#### 廃止 - Microsoft Entra 管理センターにおけるアプリのサインイン フィールドの自動取得

[お客様によっては対応が必要です]

Microsoft Entra 管理センターにおける、アプリのサインイン フィールドを自動的に取得する機能が廃止されました。すでにこの機能を用いて設定されている既存のアプリは引き続き動作しますが、新規での設定においてはこの機能は利用できません。今後は、[サインイン フィールドの取り込み] をご利用ください。これには Microsoft Edge と Chrome で利用可能な MyApps Secure Sign-In の拡張機能が必要です。

詳細は [アプリのサインイン フィールドをキャプチャする](https://learn.microsoft.com/ja-jp/entra/identity/enterprise-apps/troubleshoot-password-based-sso#capture-sign-in-fields-for-an-app) をご覧ください。

#### リクエストの送信者が My Access で自身のアクセス パッケージの承認者が誰かを確認可能に

[お客様によっては対応が必要です]

[以前にお知らせした](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#plan-for-change---new-end-user-homepage-in-my-account) とおり、リクエストの送信者が My Access ポータルで、保留中のアクセス パッケージの承認者の名前と E メール アドレスを直接確認できるようになります。この機能は、透明性を高め、依頼者と承認者間のコミュニケーションを効率化することを目的としています。既定では、ゲストを除くすべてのメンバーはテナント レベルで承認者を確認でき、この設定は Microsoft Entra 管理センターのエンタイトルメント管理にて変更することも可能です。アクセス パッケージのレベルでは、管理者や所有者が詳細設定を使用することで、承認者の見える/見えないを変更したり、テナント設定を上書きしたりが可能です。 

#### My Account の新しいエンド ユーザー向けホームページ

[お客様によっては対応が必要です]

[以前にお知らせした](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#plan-for-change---new-end-user-homepage-in-my-account) とおり、https://myaccount.microsoft.com のホームページはよりタスクに特化したユーザー体験を提供するために更新される予定です。ユーザーは、期限切れのグループの更新や、アクセス パッケージの承認、MFA の設定など、保留中のアクションをホームページ上で直接確認できるようになります。アプリ、グループ、アクセス パッケージ、サインイン情報へ素早くアクセスできるリンクがより見つけやすく、使いやすくなります。この変更によりアカウント管理が効率化し、ユーザーがアクセスやセキュリティに関するタスクを常に把握できるようになります。

#### ライセンスの使用状況ブレードの UI および Entra のライセンス指標に対する更新

[お客様による対応は不要です]

ライセンスの使用状況のブレードを更新し、UI を改善するとともに、上部のウィジェットに Entra 全体の新しいライセンス指標を導入します。これによりすべてのライセンスにわたり機能の使用状況を表示します。これにより管理者やマネージャーは製品の採用状況と利用状況を包括的に把握できるようになります。お客様側での対応は必要ありません。

#### Microsoft Entra ID 無料サブスクリプションの展開

Microsoft は、Microsoft Entra テナントの所有権の追跡を目的として、請求に使用されているアカウント情報を活用し、無料の Microsoft Entra ID Free サブスクリプションを今後各テナントに展開します。10 月から Microsoft 365 および Azure ポータルにこのサブスクリプションが登場しますが、お客様側の対応は不要で、請求や機能にも影響を与えません。これはテナントの所有権を安全に管理するためのものです。

#### Microsoft Entra: 認証情報の登録と管理の UX を刷新

[お客様による対応は不要です]

Microsoft Entra は 2025 年 11 月に認証情報の登録および管理インターフェースを更新し、使いやすさとアクセシビリティを向上させます。お客様側での対応は特に必要ありませんが、スムーズな移行のため、事前にヘルプデスクに情報を共有しておくことをお勧めします。本変更に関してコンプライアンス上の懸念はございません。

## Microsoft Entra ID Protection

### 新機能のリリース

- [Microsoft Entra ID Protection: 検出品質の向上](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---microsoft-entra-id-protection-improved-detection-quality)

## Microsoft Entra ID ガバナンス

### 新機能のリリース

- [テナント間同期 (クラウド間)](https://learn.microsoft.com/ja-jp/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure)
- [Microsoft Entra Connect Sync におけるアプリケーションベースの認証](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---application-based-authentication-on-microsoft-entra-connect-sync)
- [リフレッシュ トークンを取り消す新しいライフサイクル ワークフロー タスク](https://learn.microsoft.com/ja-jp/entra/id-governance/lifecycle-workflow-tasks#revoke-all-refresh-tokens-for-user)
- [Microsoft Entra Connect Sync における管理者イベントの監査](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---audit-administrator-events-in-microsoft-entra-connect-sync)

## Microsoft Entra External ID

### 新機能のリリース

- [Microsoft Entra External ID におけるサインイン、サインアップ、サインアウト体験を実現するネイティブ認証 JavaScript SDK の有効化](https://learn.microsoft.com/ja-jp/entra/identity-platform/quickstart-native-authentication-single-page-app-sdk-sign-in?tabs=react)
- [Microsoft Entra External ID: カスタム サードパーティ E メール OTP プロバイダー](https://learn.microsoft.com/ja-jp/entra/identity-platform/custom-extension-email-otp-get-started?tabs=azure-communication-services%2Cazure-portal)

よろしくお願いいたします

Shobhit Sahay
