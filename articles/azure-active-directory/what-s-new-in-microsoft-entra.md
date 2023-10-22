---
title: Microsoft Entra の更新情報
date: 2023-10-22 09:00
tags:
    - US Identity Blog
---

# Microsoft Entra の更新情報

こんにちは、Azure Identity サポート チームの 高田 です。
 
本記事は、2023 年 10 月 2 日に米国の Microsoft Entra (Azure AD) Blog で公開された [What’s new in Microsoft Entra](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/what-s-new-in-microsoft-entra/ba-p/3796395) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

マイクロソフトはこのほど、お客様のセキュリティ態勢の改善を目的として、Microsoft Entra 製品ファミリーにさまざまな新しいセキュリティ ツールと機能を導入しました。サイバー攻撃がますます巧妙化し、クラウドベースのサービスやモバイル デバイスの利用が増加する中、組織がセキュリティを管理するための効果的なツールを導入することは不可欠となっています。

本日は、前四半期 (2023 年 7 月～ 9 月) の新機能リリースと変更アナウンス (2023 年 9 月の変更管理) を紹介します。また、これらの変更点は [リリースノート](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new) や電子メールでもお知らせしています。弊社では、お客様が新しい [Entra 管理センター](https://entra.microsoft.com/) 内でライフサイクルの変更 (非推奨、廃止、サービスの破壊的変更) をより簡単に管理できるように引き続き取り組んでおります。

これらの最近のアップデートは、Microsoft Entra の製品エリアごとに整理されており、より簡単に最新のアップデートを見つけてアクセス出来るようにいたしました。これらの新機能により、お客様に対し ID およびアクセス ソリューションを提供してまいります。

## 製品の更新情報のまとめ

- Microsoft Entra ID
- Microsoft Entra ID Governance
- Microsoft Entra Workload ID
- Microsoft Entra External ID

## Microsoft Entra ID

新機能のリリース

- [認証方法アクティビティのダッシュボード](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-methods-activity#how-it-works)
- [iOS および macOS ブラウザーでの FIDO2 サポート](https://jpazureid.github.io/blog/azure-active-directory/advancing-modern-strong-authentication/)
- [Windows 用の Web サインイン](https://learn.microsoft.com/ja-jp/education/windows/federated-sign-in?tabs=intune)
- [条件付きアクセスの概要ダッシュボード](https://jpazureid.github.io/blog/azure-active-directory/conditional-access-overview-and-templates/)
- [条件付きアクセスのテンプレート](https://jpazureid.github.io/blog/azure-active-directory/conditional-access-overview-and-templates/)
- [条件付きアクセスにおける Microsoft 管理ポータルのサポート](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-cloud-apps#microsoft-admin-portals-preview)
- [条件付きアクセス ポリシーにおける My Apps の対象/対象外](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-cloud-apps)
- [M365 Defender における Identity Protection アラート](https://learn.microsoft.com/ja-jp/microsoft-365/security/defender/investigate-alerts?view=o365-worldwide)
- [保護されたアクションのための条件付きアクセス](https://jpazureid.github.io/blog/azure-active-directory/conditional-access-for-protected-actions/)
- [テナント制限 v2](https://learn.microsoft.com/ja-jp/entra/global-secure-access/how-to-universal-tenant-restrictions)
- [感謝のブランドにおけるサインインとサインアップページの先進的な拡張機能](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/how-to-customize-branding)
- [セルフサービス パスワード リセット (SSPR) のハイパーリンクのカスタマイズ機能](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/how-to-customize-branding)
- [カスタム ロールを用いたユーザー管理の委任](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/custom-user-permissions)
- [ユーザー作成とユーザー招待機能の改善](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/add-users)
- [以前に付与されたテナント全体でのアクセス許可の取り消し](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/manage-application-permissions?pivots=portal#review-and-revoke-permissions)
- [新しい My Groups のユーザー体験](https://support.microsoft.com/ja-jp/account-billing/%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%81%A7%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E6%83%85%E5%A0%B1%E3%82%92%E6%9B%B4%E6%96%B0%E3%81%99%E3%82%8B-bc0ca998-6d3a-42ac-acb8-e900fb1174a4)
- [新しい Azure AD 推奨事項: ADAL から MSAL への移行](https://learn.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/recommendation-migrate-from-adal-to-msal?tabs=Microsoft-Graph-API)
- [Saas アプリ用に SAML トークンにグループ名を埋め込む](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/connect/how-to-connect-fed-group-claims)
- [OIDC を用いたエンタープライズ アプリ用のクレームのカスタマイズ](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/jwt-claims-customization#claim-transformations)
- [削除済みアプリケーションとサービス プリンシパルの復元](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/delete-recover-faq#how-do-i-restore-deleted-applications-or-service-principals-)
- [認証方法のレポート API](https://learn.microsoft.com/ja-jp/graph/api/authenticationmethodsroot-list-userregistrationdetails?view=graph-rest-1.0&tabs=http)
- [Microsoft Authentication Library for .NET 4.55.0](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new#general-availability---microsoft-authentication-library-for-net-4550)
- [Microsoft Authentication Library for Python 1.23.0](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new#general-availability---microsoft-authentication-library-for-python-1230)

### 変更のアナウンス

#### FIDO2 認証方法の変更

[お客様によっては対応が必要です]

**2024 年 1 月** より、Microsoft Entra ID は、従来の FIDO2 セキュリティ キーのサポートに加え、パブリック プレビューの認証方法として、コンピューターやモバイル デバイスに保存された [デバイスに紐づくパスキー](https://passkeys.dev/docs/reference/terms/#device-bound-passkey) をサポートします。これにより、ユーザーは既に保持しているデバイスを使ってフィッシング耐性のある認証を利用することができるようになります。

このプレビュー リリースに際し、既存の FIDO2 認証方法ポリシーとエンドユーザー向けの登録エクスペリエンスを拡張する予定です。お客様の組織が物理的なセキュリティ キーのみを使用した FIDO2 認証を必要とする、もしくは要望する場合は、許容できるセキュリティ キー モデルのみを FIDO2 ポリシーにて許可するようキーの制限を実施ください。そうでない場合は、新しいプレビュー機能により、Windows、macOS、iOS、Android に保存されたデバイスに紐づくパスキーの登録が可能になります。FIDO2 キー制限の詳細については、[こちら](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-passwordless-security-key) をご覧ください。

#### Azure AD Graph の新着情報

[お客様によっては対応が必要です]

3 年間の非推奨期間の後、Azure AD Graph API が廃止 (シャットダウン) `のサイクルに入ることを [2023 年 6 月に発表](https://jpazureid.github.io/blog/azure-active-directory/important-azure-ad-graph-retirement-and-powershell-module/) しました。これは、API の廃止までに最低 2 年間の非推奨期間を約束するという [破壊的変更に関するポリシー](https://learn.microsoft.com/ja-jp/graph/versioning-and-support) に沿ったものです。また 6 月には、この廃止は段階的に行われ、各段階の合間には事前通知を行うと説明しました。最初の段階では、新しく作成されたアプリケーションは既定で Azure AD Graph API を使用できなくなります。
 
現時点で共有できる実質的なアップデートは限られていますが、ここで暫定的なアップデートを提供したいと思います。弊社の目標は、このサービス終了を通してお客様と協力しサポートする中で、透明性を保ち、定期的なコミュニケーションの流れを確立することです。

##### 2023 年 9 月の情報

1. 一部のお客様から、廃止される Azure AD Graph API を使用しているアプリケーションを特定したり、どのような規模で使用しているのかを確認したりするのが難しいとのご意見をいただいております。弊社では現在、さらなる混乱を避けるために [ID の推奨事項機能](https://learn.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/overview-recommendations) を通じて、更新や修正が必要なアプリケーションを特定し、優先順位をつけるために必要な情報を提供する分析機能の提供に取り組んでいます。この機能のリリース予定日は近日中にお知らせします。
2. 事前の連絡で説明したように、Azure AD Graph API 廃止の第一段階では、新規に作成された [アプリケーション](https://learn.microsoft.com/ja-jp/graph/api/resources/application?view=graph-rest-1.0) が既定で Azure AD Graph API を使用できないようにする変更が行われます。この変更が行われる際は最低 3 ヶ月の事前通知を提供します。この最初の段階では、新しく作成されたアプリケーションのみが影響を受け、既存のアプリケーションは影響を受けません。

近い将来に、Microsoft Graph にまだ移行していない (新規) アプリケーションで混乱が生じないよう必要なタイムラインとアクションの詳細をお知らせします。新規に作成されたアプリケーションが Azure AD Graph API を使用できなくなる日付はまだ決まっていませんが、明確な情報の提供に向けて鋭意努力しております。この終了予定の API サービスからアプリケーションを移行されているお客様を支援する機能を提供してまいります。

##### 必要なアクション

Azure AD Graph を使用しているアプリケーションを特定し、同等の Microsoft Graph API を使用するように移行ください。Microsoft Graph は、Microsoft Entra、Exchange、Teams、SharePoint、および Microsoft 365 の全ポートフォリオを含む、多くの Microsoft サービスに統一された機能豊富な API プラットフォームです。

参考: [Azure Active Directory (Azure AD) Graph から Microsoft Graph への移行](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview)

その他のリソース:

- [Azure AD Graph アプリの移行計画チェックリスト](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-planning-checklist)
- [Azure AD Graph を使用している可能性のあるアプリを特定するスクリプト](https://github.com/microsoft/AzureADGraphApps)

#### Entra ID Protection から Conditional Access にサインイン リスク ポリシーとユーザー リスク ポリシーを移行

[お客様によっては対応が必要です]

現在 Entra ID Protection (旧 Identity Protection) でユーザー リスク ポリシーまたはサインイン リスク ポリシーを有効にしている場合は、[これらの手順](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies#migrate-risk-policies-from-identity-protection-to-conditional-access) に従って 条件付きアクセスに移行することをお勧めします。 Entra ID Protection のこれら 2 つのリスク ポリシーの画面は、**2026 年 10 月 1 日** に廃止されます。

条件付きアクセスでのサインイン リスクとユーザー リスク ポリシーの設定には以下のような利点があります。

- すべてのアクセス ポリシーを 1 か所で管理できます。
- レポート専用モードと Graph API がサポートされます。
- 場所などの他の条件と組み合わせて、きめ細かいアクセス制御が可能になります。
- 異なるユーザー グループやリスク レベルに対して複数のリスクベースのポリシーを適用して、セキュリティを強化できます。
- サインイン ログでどのリスクベースのポリシーが適用されたかを表示できるため、詳細の把握が容易です。

今日から移行を開始しください。リスクベースのポリシーについての詳細は [Microsoft Entra リスクベースのアクセス ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-policies) をご覧ください。

#### レガシーな多要素認証 (MFA) とセルフサービスパスワードリセット (SSPR) ポリシーでの認証方法の管理の廃止日が更新

[お客様によっては対応が必要です]

[2023 年 3 月の変更通知](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-change-announcements-march-2023-train/) で、レガシーな [MFA](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-mfasettings#verification-methods) および [SSPR](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-sspr-howitworks#authentication-methods) ポリシーでの認証方法の管理を 2024 年 9 月 30 日に廃止すると発表しました。この日付は **2025 年 9 月 30 日** に延期されました。

組織は、パスワードレス、多要素認証、セルフサービス パスワード リセットなど、すべての認証シナリオで認証方法を一元的に管理できる統合された認証方法ポリシーに [移行](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-authentication-methods-manage) する必要があります。[Azure AD での認証方法の管理](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-methods-manage) について詳しくはこちらをご覧ください。

#### 登録キャンペーンの改善

[お客様によっては対応が必要です]

ユーザーが [SMS や音声などの公衆交換電話網 (PSTN) を極力利用しないようにする](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/it-s-time-to-hang-up-on-phone-transports-for-authentication/ba-p/1751752) ため、[登録キャンペーン機能](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-registration-campaign) の改善に取り組んでいます。ユーザーはプロンプトを最大 3 回までスキップできますが、その後は登録操作を実行する必要があります。なお、管理者は、最大 3 回のスキップ設定を無効にするか、エンド ユーザーが無期限にスキップ出来るようにするかを選択可能です。

次に、Microsoft マネージド状態にある Entra ID テナントについては、MFA に SMS や音声などの PSTN メソッドのみを使用しているユーザーに対して、この登録キャンペーン機能を自動的に有効にします。**2023 年 9 月** から、Entra ID Premium テナント向けにこの変更を段階的に展開していきます。

#### ユーザーごとの MFA ポリシーにおける Authenticator Lite のサポート

[お客様によっては対応が必要です]

[Authenticator Lite](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-authenticator-lite) は、Microsoft Authenticator のような認証のプッシュ通知を他の Microsoft アプリケーションにも提供する比較的新しい機能です。最初にサポートされるアプリケーションは Outlook モバイルです。電話に別の仕事用アプリをダウンロードできないか、あるいはダウンロードしたくないユーザーいる場合、すでにモバイル デバイスに Outlook を設定していれば、Microsoft Authenticator の代わりとして Outlook Mobile を利用いただけます。

現在、Authenticator Lite は、[新しい認証方法ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-methods-manage#authentication-methods-policy) で Microsoft Authenticator を管理している組織でのみ利用可能です。今後は、ユーザーごとの MFA ポリシーの「モバイル アプリによる通知」設定の一部としても利用可能になります。**2023 年 9 月中旬** から、「モバイル アプリによる通知」設定をユーザーごとの MFA ポリシーで有効にしていると、Authenticator Lite も有効になるように動作します。Authenticator Lite を使用したくない組織は、[こちらの手順](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-authenticator-lite#disabling-authenticator-lite-in-azure-portal-ux) に従って無効にする必要があります。

#### WhatsApp 経由の MFA OTP 配信の最適化

[お客様によっては対応が必要です]

現在、Entra ID (Azure AD) MFA は、[テキスト メッセージ (SMS)](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-phone-options#sms-message-verification) を介してワン タイム パスコード (OTP) を配信しています。これらのテキスト (SMS) は、ユーザーの電話の OS に応じて、電話の既定のメッセージング アプリに送信されます。しかし、国によってはこれらの既定のアプリが必ずしもユーザーがよく使うメッセージ アプリとは限りません。ユーザーがよく使用するメッセージ プラットフォームで OTP を受け取れるようにするため、Entra ID は一部の地域で WhatsApp への OTP 配信を展開します。

**2023 年 9 月中旬** から、インド、インドネシア、ニュージーランドのユーザーは WhatsApp 経由で MFA テキスト メッセージを受け取るようになる可能性があります。以下の基準に当てはまるユーザーには、この新しい変更が適用される可能性がありますが、必ずその動作となるわけではありません。

- 認証方法としてテキスト メッセージ/SMS を有効にしている
- すでに WhatsApp を使用している
- 上に挙げた国のいずれかの国コードを持つ電話番号を保持している

上にあげた国にユーザーがいる組織で、ユーザーに WhatsApp 経由で MFA テキスト メッセージを受け取らせたくない場合は、テナント内でテキスト メッセージを認証方法として無効にする必要があります。認証方法を管理する場所によりますが、[ユーザーごとの MFA ポリシー](https://account.activedirectory.windowsazure.com/UserManagement/MfaSettings.aspx) をご利用の場合は「電話へのテキスト メッセージ」を無効にし、[認証方法ポリシー](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/~/AdminAuthMethods/fromNav/Identity) を利用されている場合は「SMS」の設定を無効にする必要があります。

#### My Groups 管理コントロールの変更

[お客様側での対応は不要です]

**2024 年 6 月** から、Microsoft Entra 管理センターにあるグループ管理の設定から「[自分のグループ] でのグループ機能に対するユーザー アクセス権を制限します。」という文言が廃止されます。これは、My Groups を無効にすることができなくなることを意味します。6 月には、My Groups でのセキュリティ グループの表示と管理をエンド ユーザーから出来ないようにする新しい設定が優先されるようになります。

この変更は自動的に行われます。管理者やユーザーは何もする必要はありません。

- [自分のグループ] からグループ機能に対するユーザー アクセスを制限するという既存の設定が はい に設定されている場合、新しい設定でも、ユーザーが My Groups でセキュリティ グループを表示および編集出来ないように制限します。 既存の設定が いいえ に設定されている場合、新しい設定では、My Groupsでセキュリティ グループが表示されます。

詳細については、[このドキュメント](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/groups-self-service-management#make-a-group-available-for-user-self-service) を参照ください。なお、管理者は引き続き [グループ設定](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/groups-self-service-management#group-settings) から、エンドユーザーが Microsoft 365 およびセキュリティ グループを作成できるかどうかを管理可能です。

#### Graph サービスエンドポイントでの HTTP/2 の有効化

[お客様によっては対応が必要です]

[2022 年 9 月の変更通知](https://jpazureid.github.io/blog/azure-active-directory/Microsoft-Entra-change-announcements-September-2022-train/) で事前にお知らせしたとおり、Microsoft Graph のエンジニアリング チームは、**2023 年 9 月 15 日** から Microsoft Graph サービス エンドポイントで HTTP/2 のサポートを開始する予定です。HTTP/2 のサポートは、既存の HTTP/1.1 バージョンのサポートに加えて行われます。Microsoft Grap hエンドポイントで HTTP/2 が有効になると、HTTP/2 をサポートするクライアントは、Microsoft Graph へのリクエスト時にこのバージョンをネゴシエーションします。HTTP/2 仕様の改善の焦点は、パフォーマンス (特に遅延の改善) やネットワークおよびサービス リソースの使用料の低減 (参照: https://http2.github.io) に関するものであり、多重化、並列化、バイナリ エンコーディングやヘッダー圧縮による効率性などが含まれます。これらの利点は、Microsoft Graph のクライアントと顧客にとって大きな価値を提供するものです。HTTP/2 は、HTTP/1.1 と完全に後方互換性があり、クライアント アプリケーションでコードの変更を必要としないことが期待されます。ただし、まれに、アプリケーションがヘッダー キーに関する HTTP 仕様 (大文字小文字を区別しない比較) に従っていない場合、一部のクライアント アプリケーションに悪影響が及ぶ可能性もあります。

## Microsoft Entra ID Governance

新機能のリリース

- [エンタイトルメント管理での Verified ID のチェック機能](https://jpazureid.github.io/blog/azure-active-directory/entitlement-management-ga/)
- [条件付きアクセスにおけるエンタイトルメント管理のサポート](https://jpazureid.github.io/blog/azure-active-directory/entitlement-management-ga/)
- [レビュー担当者に対する機械学習に基づく推奨事項の提示](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-id-governance-introduces-two-new-features-in-access-reviews/)
- [利用されていないユーザーに対しるアクセス レビュー](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-id-governance-introduces-two-new-features-in-access-reviews/)
- [ユーザーによるアクセス要求ではなく自動的にアクセス パッケージを割り当てる](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-id-governance-entitlement-management-new/ba-p/2466929)
- [お客様組織に特化したプロセスとビジネス ロジックでアクセス ライフサイクルを拡張する](https://jpazureid.github.io/blog/azure-active-directory/entitlement-management-ga/)
- [My Access の検索機能の改善](https://jpazureid.github.io/blog/azure-active-directory/entitlement-management-ga/)
- [エンタイトルメント管理の Graph API](https://learn.microsoft.com/ja-jp/graph/api/resources/entitlementmanagement-overview?view=graph-rest-1.0)

## Microsoft Entra Workload ID

新機能のリリース

- [Workload ID に対する継続的アクセス評価](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-continuous-access-evaluation-workload)
- [Workload ID 用のアプリケーション インスタンスのロック](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/howto-configure-app-instance-property-locks)

## Microsoft Entra External ID

新機能のリリース

- [カスタムロールの作成とクロステナント アクセス設定管理の保護](https://jpazureid.github.io/blog/azure-active-directory/xtap-new-feature/)
- [クロステナント アクセス設定におけるパートナー数上限の撤廃](https://jpazureid.github.io/blog/azure-active-directory/xtap-new-feature/)
- [B2B 招待がクロステナント アクセスの設定を考慮](https://jpazureid.github.io/blog/azure-active-directory/xtap-new-feature/)

### 変更のアナウンス

#### B2B サインイン体験の変更

[お客様側での対応は不要です]

**2023 年 9 月 30 日** から、B2B コラボレーションを使用してテナントをまたいだサインインを行うエンドユーザーは、テナントのブランドの表示が変更されたことに気づくと思われます。サインイン時に、リソース テナントのブランドではなく、ホーム テナントのブランド（カスタマイズされていいない場合でも）が表示されるようになります。これは、ユーザーが自身のホーム アカウントにサインインしていることを明確にするためのものです。

この通知はお客様への通知を目的としたものであり、対応は必要ありません。[詳細はこちら](https://learn.microsoft.com/ja-j/azure/active-directory/fundamentals/how-to-customize-branding#user-experience) をご覧ください。

よろしくお願いいたします。

Shobhit Sahay
