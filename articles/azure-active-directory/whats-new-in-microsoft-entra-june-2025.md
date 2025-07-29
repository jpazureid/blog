---
title: Microsoft Entra の新機能 – 2025 年 6 月
date: 2025-07-30 05:00
tags:
  - Azure AD
  - US Identity Blog
---

#  Microsoft Entra の新機能 – 2025 年 6 月

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2025 年 7 月 1 日に米国の Microsoft Entra Blog で公開された [What's new in Microsoft Entra – June 2025](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/what%E2%80%99s-new-in-microsoft-entra-%E2%80%93-june-2025/4352579) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

## Microsoft Entra 全体の最新機能と変更についてのお知らせ

Microsoft は先日、AI エージェントに ID とアクセス管理をもたらす新機能である Microsoft Entra Agent ID を発表しました。これは、AI エージェントがデータ、システム、ユーザーとやり取りする方法を組織が管理できるようにすることを目的としています。エージェント ID は、各 AI エージェントに一意かつ一貫した識別子を提供し、このエージェント ID はツールや環境全体で使用できると共に、認証、承認、ライフサイクル管理などのコアとなる ID 機能をサポートしています。Entra の ID 保護の機能を AI エージェントにも拡張することで、組織は、人間のユーザーの場合と同様に、AI エージェントに対しても条件付きアクセス ポリシーを適用したり、最小特権のアクセスを適用したり、エージェントのアクティビティを監視したりできます。これにより可視性と制御を維持しながら、AI をより安全に導入できるようになります。詳細については、[こちら](https://jpazureid.github.io/blog/azure-active-directory/announcing-microsoft-entra-agent-id-secure-and-manage-your-ai-agents/) をクリックください。 

また、本日は 2025 年 4 月から 2025 年 6 月までの Microsoft Entra 全体のセキュリティの改善とイノベーションを製品別に整理してお知らせします。 

## Microsoft Entra ID

### 新機能のリリース

- [Microsoft Entra アプリでマネージド ID を資格情報として使用する](https://learn.microsoft.com/ja-jp/entra/workload-id/workload-identity-federation-config-app-trust-managed-identity)

### 変更のお知らせ

#### 認証方法ポリシーでパスキーのプロファイルをサポートするための変更 (プレビュー)

[お客様によっては対応が必要です]

**変更の内容**

2025 年 11 月に Microsoft Entra ID のパスキー (FIDO2) 認証方法ポリシーを拡張し、パブリック プレビューとしてパスキーのプロファイルをサポートする予定です。このアップデートによりパスキー構成をグループごとにきめ細かく制御できるようになると共に、新しく API のスキーマ変更も実施されます。このロールアウト後、ユーザーのグループごとに異なるパスキー構成を適用できるようになります。たとえば次のことが可能になります。 

- ユーザーのグループ A に特定の FIDO2 セキュリティ キーのモデルを使用させる
- ユーザーのグループ B には Microsoft Authenticator でのパスキーの使用を許可する 

プレビュー中に組織が Microsoft Azure ポータルまたは Microsoft Entra 管理センターを使用してパスキーのポリシーを変更すると、新しいスキーマが有効になります。Graph API またはサード パーティのツールを使用してポリシーを変更する場合、スキーマは一般提供 (GA) まで変更されません。 

2025 年 11 月のこの更新の一環として、「構成証明の適用」の設定が無効になっている場合、[WebAuthn に準拠](https://www.w3.org/TR/webauthn-2/#sctn-defined-attestation-formats) したあらゆるセキュリティ キーまたはパスキー プロバイダーの受け入れを開始します。これにより、Microsoft Entra ID への登録および認証において、より幅広いセキュリティ キーとパスキー プロバイダーを利用することができるようになります。この今後の更新プログラムの動作を現在のものと比較するには、[FIDO2 セキュリティ キー ベンダーに対する Microsoft Entra ID による構成証明](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-fido2-hardware-vendor#attestation-requirements) を参照ください。  

#### サインイン リスク ポリシーとユーザー リスク ポリシーを Entra ID Protection から条件付きアクセスに移行する 

[お客様によっては対応が必要です]

**変更の内容**

2023 年 10 月に [発表](https://jpazureid.github.io/blog/azure-active-directory/what-s-new-in-microsoft-entra/) しましたように、現在 Entra ID Protection (旧称 Identity Protection) でユーザー リスク ポリシーまたはサインイン リスク ポリシーを有効にして利用している場合は、それらを条件付きアクセスに移行ください。移行を行い、メリットを享受するには [こちらのステップ](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies#migrate-risk-policies-from-identity-protection-to-conditional-access) を参照ください。  

この移行に際して重要となる日付は以下のとおりです。

- 2025 年 7 月 31 日以降: Entra ID Protection の [ユーザー リスク ポリシー] ページと [サインイン リスク ポリシー] ページは読み取り専用になります。Entra ID Protection でこれらのポリシーを作成または変更することはできなくなります。条件付きアクセスに移行し、そこで管理ください。 
- 2026 年 10 月 1 日まで: Entra ID Protection のこれら 2 つのリスクポリシーのユーザー インターフェイスが廃止されます。

今すぐ移行を開始ください。リスクベースのポリシーの詳細については、[Microsoft Entra ID Protection のリスクベースのアクセス ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-policies) を参照ください

#### セキュリティ既定値群では B2B ゲスト ユーザーに対する MFA 登録を求めなくなる

[お客様によっては対応が必要です]

**変更の内容**

2025 年 7 月 29 日より、新規に作成されたテナントにおいてセキュリティ既定値群の動作が変更されます。セキュリティ既定値群では、[ゲスト ユーザーにおける MFA の登録が不要](https://learn.microsoft.com/ja-jp/entra/fundamentals/security-defaults#require-all-users-to-register-for-microsoft-entra-multifactor-authentication) になります。この変更は、ゲスト ユーザーが共有ファイルにアクセスする際に MFA 登録を必要としないようにし、コラボレーションをより効率的に行えるようにすることを目的としています。セキュリティ既定値群で MFA が必要になるその他のシナリオ (ユーザーが [特権管理者ロール](https://learn.microsoft.com/ja-jp/entra/fundamentals/security-defaults#require-administrators-to-do-multifactor-authentication) を持っている場合、または [Azure リソースにアクセスしている](https://learn.microsoft.com/ja-jp/entra/fundamentals/security-defaults#protect-privileged-activities-like-access-to-the-azure-portal) 場合) では、ゲスト ユーザーは引き続き MFA を登録および実行する必要があります。

この変更は、2025 年 7 月 29 日以降に作成された新しいテナントに適用され始めます。この後、既存のテナントにも同様の変更が適用され始め、数週間にわたって徐々に展開される予定です。

**変更されないこと**

ゲスト ユーザーに対する MFA は、特権管理者ロールの利用や Azure リソースへのアクセスなど、MFA が必要なシナリオで引き続き適用されます。

**対応が必要なこと**

テナントにサインインする B2B ゲスト ユーザーに対し、管理者が追加の要件を課したい場合は、[条件付きアクセス](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/overview) へのアップグレードを検討ください。これにより、制御のカスタマイズが可能となります。このようなご要望がない場合は、テナント管理者によるアクションは必要ありません。

**詳細情報**

- [Microsoft Entra ID での既定のレベルのセキュリティの提供 - Microsoft Entra |Microsoft Learn](https://learn.microsoft.com/ja-jp/entra/fundamentals/security-defaults)
- [Microsoft Entra ID の条件付きアクセスとは - Microsoft Entra ID |Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview)
- [Microsoft Entra B2B のベスト プラクティスと推奨事項 - Microsoft Entra 外部 ID |Microsoft Learn](https://learn.microsoft.com/en-us/entra/external-id/b2b-fundamentals)
 
#### iOS 上の Authenticator アプリのバックアップおよび復元エクスペリエンスの向上

[お客様による対応は必要ありません]

**変更の内容**

2025 年 9 月以降、ユーザーは iCloud と iCloud Keychain を使用して、Authenticator アプリ内のすべてのアカウント (職場または学校アカウント、Microsoft 個人アカウント、Amazon や Google などの Microsoft 以外のアカウントを含む) のアカウント名を安全にバックアップできるようになります。 

このアップデートにより次のことが行われます:

- Microsoft の個人アカウントを必要とする既存のアプリ内でのバックアップ機能は削除されます。
- ユーザーは、iCloud と iCloud Keychain を介してバックアップを有効にすることで、アカウント名とサードパーティの TOTP (時間ベースのワンタイム パスワード) 資格情報をエンドツーエンドの暗号化を介して安全に保存できるようになります。他の資格情報はバックアップに含まれません。必要に応じて、ユーザーはいつでも iCloud のデバイス設定から Authenticator アプリのバックアップを無効にすることが可能です。 
- Authenticator アプリで iCloud と iCloud キーチェーンのバックアップをすでに有効にしているユーザーは、この改善されたエクスペリエンスが自動的に適用されます。 

ユーザーが新しい iOS デバイスをセットアップすると、Microsoft アカウントを必要とせずともアカウント名が Authenticator アプリに自動的に表示され、各アカウントにサインインすることでセットアップを完了できます。この変更により、バックアップと復元のプロセスが簡素化され、Microsoft の個人アカウントへの依存がなくなります。このため、デバイスを切り替える際のエクスペリエンスがよりスムーズになります。 

**注意**: このアップデートは iOS デバイスにのみ適用されます。Android のサポートは後日行われる予定です。この iOS 機能のプライベート プレビューは 2025 年 8 月に開始され、その後 2025 年 9 月に一般提供 (GA) される予定です。 

Authenticator アプリのバックアップと復元に関する変更についての詳細は、[こちら](https://support.microsoft.com/ja-jp/account-billing/back-up-account-credentials-in-microsoft-authenticator-bb939936-7a8d-4e88-bc43-49bc1a700a40) をご覧ください。 

### ID の刷新

#### Azure AD Graph の廃止

[お客様によっては対応が必要です]

**変更内容**

[Azure AD Graph API サービスの廃止](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-graph-api-retirement/) は 2024 年 9 月に開始され、この廃止の第 1 フェーズはすでに完了しました。Azure AD Graph API をまだ使用しているすべてのアプリケーションは利用延長の構成がなされている状況です。今後数か月にわたって、Azure AD Graph API サービスを段階的に廃止するにあたり、追加の作業が予定されています。ご注意いただきたい日付は次のとおりです。

- 利用延長が構成されており、引き続き **Azure AD Graph** API に依存しているアプリケーションは、**2025 年 9 月** 初旬以降、本 API を使用できなくなります。 
- 2025 年 7 月下旬から 9 月上旬にかけて、8 〜 24 時間の一時的な停止テストが 1 度か 2 度行われる予定です。
- 移行が完了していない場合は、テナント内で Azure AD Graph API へのアクセスに依存しているアプリケーションを確認するとともに、2025 年 9 月までにこれらを Microsoft Graph に移行することが急務となります。今後数か月にわたり、対象となるテナントには具体的なタイムラインを追加で提供いたします。M365 メッセージ センターに更新情報や具体的なタイムラインを定期的に提供しますので、[M365 メッセージ センター](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/message-center?view=o365-worldwide) をチェックください。詳細については、https://aka.ms/AzureADGraphRetirement でもご覧いただけます。  
 
#### AzureAD PowerShell の廃止 

[お客様によっては対応が必要です]

**変更内容**

**AzureAD** と **AzureAD-Preview PowerShell** モジュールは 2024 年 3 月に [非推奨](https://jpazureid.github.io/blog/azure-active-directory/important-update-deprecation-of-azure-ad-powershell-and-msonline/) となり、2025 年 10 月には廃止が始まります。AzureAD PowerShell を利用している場合は [Microsoft Graph PowerShell SDK](https://learn.microsoft.com/powershell/microsoftgraph/installation?view=graph-powershell-1.0) または [Microsoft Entra PowerShell](https://learn.microsoft.com/powershell/entra-powershell/installation?view=entra-powershell&tabs=powershell&pivots=windows) に移行し、この廃止による影響が生じないよう措置を講じる必要があります。  

- AzureAD と AzureAD-Preview PowerShell モジュールは、2025 年 10 月中旬から廃止 (動作を停止) されます。  
- 2025 年 9 月には、8 〜 24 時間の一時的な停止テストが 1 回以上行われることが計画されています。 

[M365 メッセージ センター](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/message-center?view=o365-worldwide) で、具体的なタイムラインを随時提供しますので、定期的にチェックください。詳細については、https://aka.ms/AzureADPowerShellRetirement でもご覧いただけます。  

#### Microsoft Entra ID での B2B コラボレーションのゲスト認証エクスペリエンスの変更 

[お客様によっては対応が必要です]

**変更内容**

**2025 年 7 月** より、Microsoft Entra ID B2B コラボレーションを介してテナントにサインインする **ゲスト ユーザーに関して認証エクスペリエンスに動作変更** を加えます。この変更は **2025 年末** まで各テナントに徐々に展開されます。変更が適用されると、ゲスト ユーザーはまずアクセス先テナントのブランドが適用されたサインイン画面でサインイン操作を開始することになります。E メール アドレスを入力して「次へ」をクリックすると、次にゲスト ユーザーのホーム組織のサインインページにリダイレクトされ、そこで資格情報を入力します。これにより、ホーム テナントのブランドと URL のエンドポイントが確実に画面に表示されるようになり、ユーザーはどの資格情報を利用するべきかがより分かりやすくなります。認証が成功すると、サインイン プロセスが完了し、アクセス先の組織にリダイレクトされます。この変更により、使いやすさが向上し、テナント間サインイン時のユーザーの混乱が軽減されます。 

**必要な対応**

このロールアウトに際して管理者としての対応は必要ありません。念のため現在の B2B コラボレーション構成を確認するとともに、関連するドキュメントを更新してユーザーが混乱しないようにしておくことをお勧めします。 

#### Microsoft Entra ID のパスワードベース SSO でアプリのサインイン フィールドを自動的にキャプチャする機能の廃止 

[お客様によっては対応が必要です]

**変更内容**

最新かつ安全な認証エクスペリエンスを提供するという継続的な取り組みの一環として、Microsoft Entra ID のギャラリー外のアプリについて、パスワードベース SSO の構成で使用される **アプリのサインイン フィールドを自動的にキャプチャする機能** を廃止します。**2025 年 7 月 1 日** から **2025 年 8 月 30 日** にかけ、アプリのサインイン フィールドを自動的にキャプチャする機能が管理ポータルから削除されます。今後は、新しいパスワードベース SSO のアプリケーションを構成するにあたっては、**MyApps セキュア サインイン拡張機能** を使用し **アプリのサインイン フィールドを手動でキャプチャする** よう対応する必要があります。 

**変わらないこと**

アプリのサインイン フィールドを自動的にキャプチャする機能を使用してすでに構成された既存のアプリは引き続き機能します。この変更は、新しいパスワードベース SSO アプリの構成時にのみ影響します。 

**必要な対応**

- 管理ポータルで [**アプリのサインイン フィールドを手動でキャプチャする**] オプションを使用する  
- **MyApps セキュア サインイン拡張機能** (Edge/Chrome) をインストールしてログイン フィールドをキャプチャする
- 管理者向けの手順書があればそれらを更新してお客様社内に通知する
- 今後のよりよいセキュリティのために **パスワードレス** またはフェデレーション認証方法への移行を検討する

**詳細情報**

- 手動でのキャプチャに関するガイド: [アプリのサインインフィールドを手動でキャプチャする](https://learn.microsoft.com/ja-jp/entra/identity/enterprise-apps/troubleshoot-password-based-sso#manually-capture-sign-in-fields-for-an-app)
- パスワードレス認証の概要: [Microsoft Entra パスワードレス サインイン](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-authentication-passwordless)

不明点がある場合や移行についてサポートが必要な場合は、Microsoft アカウント チームに問い合わせるか、サポート リクエストを送信ください。  

#### Teams Web を利用するコンシューマー向けに Apple と Google でのサインインのサポート

[お客様による対応は必要ありません]

**変更内容**

新しいサインイン エクスペリエンスが Teams Web に導入され、コンシューマーのお客様は Apple と Google の資格情報を使用してサインインが可能になります。この機能は、Microsoft アカウントを使用するコンシューマー ユーザーを対象としたものです。プライベート プレビューのロールアウトが、**2025 年 8 月中旬** より一部の Teams Web ユーザーに対して開始され、2025 年後半以降には他の Microsoft アプリケーションにもこの機能を拡張していく予定です。 

**影響を受けるユーザー**

この新しいサインイン オプションは、Teams on the Web (teams.microsoft.com または teams.com) を介してサインインする一部のユーザーに対して表示され、これらのユーザーは https://login.microsoftonline.com/common にリダイレクトされます。お客様独自の URL を経由して login.microsoftonline.com にアクセスするユーザーには、この機能は表示されません。また、この機能はテナント ID を指定してアクセスしているお客様には表示されません。 

**ユーザー インターフェイスの変更内容**

Teams Web にサインインする際に、特定のユーザーには、サインイン画面の下部に [**Apple で続行**] と [**Google で続行**] という 2 つの新しいオプションが表示されるようになります。いずれかのオプションを選択すると、ユーザーは Apple または Google の資格情報を使用してサインインするか、個人の Microsoft アカウントに登録するかを促されます。一部のユーザーでは、個人アカウントと職場/学校アカウントのどちらを使用するかかを確認する画面が表示される場合があります。

**お客様からのアクションは必要ありません。** サインイン画面の上部に E メール アドレスまたはユーザー名を入力するか、[サインイン オプション] を選択して特定の組織にログインすることで、いつもどおりサインインを続けることができます。 

## Microsoft Entra ID Protection

### 新機能のリリース

- [条件付きアクセス ポリシーの影響分析](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-conditional-access-report-only#policy-impact-preview)

### 変更のお知らせ

#### 条件付きアクセスの概要における [監視] タブの今後の廃止 

[お客様によっては対応が必要です]

**変更内容**

Entra 管理センターにおける条件付きアクセスの概要の監視タブが、7 月 18 日から 8 月 1 日の間に廃止されます。この期間を過ぎると、管理者はこのタブにアクセスできなくなります。これは、弊社によるレポート機能改善の取り組みの一環です。今後は [ポリシーごとの条件付きアクセス レポート](https://learn.microsoft.com/ja-jp/entra/id/conditional-access/howto-conditional-access-policy-report) と [分析情報とレポート ダッシュボード](https://learn.microsoft.com/ja-jp/entra/id/conditional-access/reports-insights) に移行ください。いずれも信頼性および精度が高く、多くのお客様はこちらの機能を利用されています。

**必要な対応**

監視タブを利用しているユーザーがいる場合はそれらのユーザーに通知し、併せて内部ドキュメントを更新して、推奨されるレポート ツールを代わりに利用ください。

**詳細情報**

- https://learn.microsoft.com/ja-jp/entra/id/conditional-access/howto-conditional-access-policy-report 
- https://learn.microsoft.com/ja-jp/entra/id/conditional-access/reports-insights

## Microsoft Entra ID Governance

### 新機能のリリース 

- [Microsoft Entra Connect Sync でのアプリケーション ベースの認証 ](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/reference-connect-accounts-permissions)
- [Entra の Microsoft Security CoPilot を使用したライフサイクル ワークフローの管理](https://learn.microsoft.com/ja-jp/entra/fundamentals/copilot-entra-lifecycle-workflow)

### 変更のお知らせ

#### アクセス レビューにおけるデータ保持ポリシーの更新 

[お客様によっては対応が必要です]

**変更内容**

2025 年 9 月以降、Microsoft Entra ID アクセス レビューでは、過去 1 年間のレビュー履歴のみを保持するようになります。1 年以上経過したデータは保存されず、Microsoft Graph API またはその他の方法を使用しても取得できなくなります。

**必要な対応**

お客様がより長い保存期間を必要とする場合は、レビュー データを事前にエクスポートしてアーカイブください。Azure Data Explorer (ADX) などのソリューションをご利用いただけます。Microsoft が提供するサンプル スクリプトとクエリについては [ADX と Entra ID を使用したカスタムのエンタイトルメント レポート](https://learn.microsoft.com/ja-jp/entra/id-governance/custom-entitlement-report-with-adx-and-entra-id#example-various-queries-that-use-access-reviews) をご参照ください。

#### Microsoft Entra エンタイトルメント管理に対する今後の変更 

[お客様によっては対応が必要です]

**変更内容**

2025 年 9 月 30 日以降、[特定のユーザーとグループ] を選択して構成されたアクセス パッケージは、マイ アクセス ポータルのすべてのメンバー (ゲストを除く) に表示されるようになります。これらのアクセス パッケージをすべてのメンバーに表示したくない場合は、この日付までにアクセス パッケージを非表示にする必要があります。 

この変更と同時に、アクセス パッケージに含まれるリソース ロール (グループ名やアプリ名など) のエンド ユーザーからの見え方を制御できる新しいテナント全体の設定を導入する予定です。2025 年 9 月下旬に展開を開始し、2025 年 10 月中旬までに展開が完了する予定です。 

スコープが [特定のユーザーとグループ] に設定されているアクセス パッケージは、マイ アクセス ポータルのすべてのメンバー (ゲストを除く) に表示されるようになります。つまり、一部のメンバーは、要求できないアクセス パッケージを閲覧できるようになります。

**必要な対応**

これらのアクセス パッケージをすべてのメンバーに表示したくない場合は、この日付までにアクセス パッケージを非表示に設定ください。アクセス パッケージを確認し、設定を変更する方法の詳細については、[Learn の記事](https://go.microsoft.com/fwlink/?linkid=2321837) を参照ください。  

## Microsoft Entra External ID

**新機能のリリース**

- [SAML/WS-Fed ID プロバイダーによるユーザー認証](https://learn.microsoft.com/ja-jp/entra/external-id/direct-federation-overview)
- [事前/事後で属性を収集するカスタム拡張機能のサポート](https://learn.microsoft.com/ja-jp/entra/identity-platform/custom-extension-attribute-collection)

## Microsoft Entra Domain Services

**新機能のリリース**

- [Microsoft Entra Domain Services の双方向フォレスト信頼](https://learn.microsoft.com/ja-jp/entra/identity/domain-services/concepts-forest-trust)

Shobhit Sahay
