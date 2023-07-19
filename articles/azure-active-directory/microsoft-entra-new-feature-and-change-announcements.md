---
title: Microsoft Entra の新機能と変更のアナウンス
date: 2023-07-11 09:00
tags:
    - US Identity Blog
---

# Microsoft Entra の新機能と変更のアナウンス

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2023 年 6 月 30 日に米国の Azure Active Directory Identity Blog で公開された [Microsoft Entra new feature and change announcements](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-new-feature-and-change-announcements/ba-p/3796396) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

Microsoft はこのほど、Entra 製品群に、組織のセキュリティ改善目的とした、さまざまな新しいセキュリティ ツールと機能を導入いたしました。サイバー攻撃がますます巧妙化し、クラウドベースのサービスやモバイル デバイスの利用が増加する中、組織がセキュリティを管理するための効果的なツールを導入することは不可欠です。

本日は、前四半期 (2023 年 4 月～ 6 月) の新機能リリースと既存機能の変更点 (2023 年 6 月の変更管理) をお伝えします。また、これらの変更点は [リリース ノート](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new) や電子メールでもお知らせしています。弊社では、新しい [Entra 管理センター](https://entra.microsoft.com/) においても、お客様がライフサイクルの変更 (廃止、引退、サービスの破壊的変更) を管理しやすくなるよう改善を続けています。

これらの最近のアップデートは、機能エリアまたはテーマごとにまとめておりますので、最新のアップデートを素早く見つけてアクセス出来るようになっています。これらの新機能により、先進的な ID およびアクセス ソリューションをお客様に提供することを目指してまいります。

## 製品アップデートの概要

- Azure Active Directory
- Microsoft Entra Permissions Management
- Microsoft Entra Workload Identities
- Microsoft Entra External ID
- Microsoft Entra Identity Governance

## Azure Active Directory

### 新機能のリリース

- [モバイルでの Azure AD 証明書ベースの認証 (CBA)](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-certificate-based-authentication-cba-on-mobile/)
- [Apple デバイスでのエンタープライズ SSO](https://learn.microsoft.com/ja-jp/mem/intune/configuration/use-enterprise-sso-plug-in-ios-ipados-macos?pivots=all)
- [SP-initiated フローでの SAML 要求署名の検証](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/howto-enforce-signed-saml-authentication)
- [条件付きアクセスの認証強度](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/authentication-conditional-access#assigning-conditional-access-policies-to-external-user-types)
- [条件付きアクセスにおける外部ユーザーの種類ごとのきめ細かな制御](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/authentication-conditional-access#assigning-conditional-access-policies-to-external-user-types)
- [Azure AD ID Protection: 検証済み脅威アクター IP のサインインの検知](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-risks#sign-in-risk)
- [既定で安全な構成: Azure RBAC におけるロール選択画面](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/role-assignments-portal#step-3-select-the-appropriate-role)
- [システム優先多要素認証](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-system-preferred-multifactor-authentication)
- [My Security Info の画面での Microsoft Authenticator の種類の表示](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new#general-availability---my-security-info-now-shows-microsoft-authenticator-type)
- [Authenticator Lite (Outlook)](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-authenticator-lite)
- [ID Protection と統合された疑わしいアクティビティの報告機能](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-mfasettings#report-suspicious-activity)
- [保留中のデバイスに対する自己修復機能](https://learn.microsoft.com/ja-jp/troubleshoot/azure/active-directory/pending-devices)
- [Azure AD プロビジョニング エージェントを通した PowerShell と Web サービス コネクターのサポート](https://learn.microsoft.com/ja-jp/azure/active-directory/app-provisioning/on-premises-powershell-connector)
- [ユーザーによる新規テナントの作成制限機能](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/users-default-permissions#restrict-member-users-default-permissions)
- [ユーザーによる BitLocker キーへのアクセス制限機能](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/users-default-permissions#restrict-member-users-default-permissions)

### 既存の機能の変更

#### My Security Info でのパスワード管理の操作性が向上

[お客様側での対応は必要なし]

**2023 年 10 月** より、段階的な展開を経て、エンドユーザーによるパスワード管理の体験を改善し、My Security Info 管理ポータル ([My Sign-Ins | Security Info | Microsoft.com](https://mysignins.microsoft.com/security-info) でパスワードを管理できるようにする機能を提供します。ユーザーはパスワードを変更できるようになり、多要素認証 (MFA) が可能なユーザーは My Security Info でパスワードをリセットできるようになります。**2023 年 12 月** までに、パスワードを変更するための従来の動作は、この新しい機能にリダイレクトされます。この変更はすべてのお客様に対して自動的に行われますので、お客様側での対応は不要です。

#### 音声ワンタイム パスワードの導入

[お客様側での対応が必要な場合があります]

音声通話は、最も安全性の低い認証方法です。MFA を行うには、Microsoft Authenticator (MFA とパスワードレスの両方の選択肢を提供) や、Windows Hello for Businessなど さらに優れた方法があります。弊社では、すべてのお客様に音声通話から別の方法への移行を推奨していますが、音声通話に依存しているお客様もいらっしゃるため、音声通話方式のセキュリティ改善を進めています。新しい方法では、"#" を押して認証を確認するのではなく、ワンタイム パスコード (OTP) が音声通話中にユーザーに読み上げられます。音声による OTP は、現在の SMS 認証方式の発展形である「電話 OTP」認証方式の一部として導入されます。この認証方式には 2 つの配信方法 (SMS と音声 OTP) があり、それらは自動的に最適な方式が選択されて配信されます。従来の # を押す方式は廃止されるため、音声 OTP に移行することをお勧めします。  

**2023 年 7 月** 以降、Azure AD の無償 (Free) ライセンスを使用するすべての新規テナントには、この新しい最適化された配信方法が提供されます。Azure AD Free ライセンスをご利用の既存のテナントには、**8 月** 上旬からこの機能の展開を開始します。Azure AD Premium ライセンスをご利用のお客様については、電話 OTP 認証方法に関するすべての構成が利用可能になった後で展開が開始されます。また別の公のアナウンスにて、今後数ヶ月間にわたるスケジュールをお知らせする予定です。この変更により影響を受けるお客様には、[Microsoft 365 管理センターのメッセージ センター](https://go.microsoft.com/fwlink/p/?linkid=2070717) から個別に管理者に通知いたします。

#### 登録キャンペーンの改善

[お客様側での対応が必要な場合があります]

ユーザーが [SMS や音声などの公衆交換電話網 (PSTN) から移行](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/it-s-time-to-hang-up-on-phone-transports-for-authentication/ba-p/1751752) できるように、[登録キャンペーン機能](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-registration-campaign) を改善します。最大 3 回までプロンプトをスキップできるようにし、それ以降は登録フローに進む必要があります。

次に、登録キャンペーンの設定が [Microsoft マネージド] に設定されている Azure AD テナントにおいて、この機能を有効に変更します。これにより、現在 MFA を PSTN 方式 (SMS と音声) に完全に依存しているユーザーに対して登録キャンペーンが有効になります。**2023 年 7 月** 以降、Azure AD の無償ライセンスを持つテナントから段階的にこの変更を開始し、世界中のすべての組織に展開する予定です。スケジュールについては、改めて公開する予定です。この変更がお客様の組織に影響を与えるタイミングになりましたら、[Microsoft 365 管理センターのメッセージ センター](https://go.microsoft.com/fwlink/p/?linkid=2070717) で管理者に通知しますので、ご注意ください。

#### Azure AD での IPv6 の有効化

[お客様側での対応が必要な場合があります]

すべての Microsoft リージョンで IPv6 ロールアウトが **6 月 30 日** に完了するため、Azure AD のお客様に影響が出る可能性があります。ユーザーがブロックされたり、通常よりも多くの MFA リクエストを受け取ったりする可能性があります。このような場合は、テナントのサインインログを確認することをお勧めします。

テナントの名前付きロケーションに設定されていない IPv6 範囲からエンドユーザーが接続していることが原因でこのような影響が生じている可能性があります。この問題に対処するには、[このページ](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition#identifying-ipv6-traffic-with-azure-ad-sign-in-activity-reports) で説明されている手順に従って、テナントの環境で IPv6 の範囲を特定し、必要な設定を構成ください。

以下のガイダンスを IT 管理チームの関連メンバーと共有することも検討ください: 

- **IT / セキュリティ管理者**: [Azure AD のサインイン アクティビティ レポートでの IPv6 トラフィックを特定する](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition#identifying-ipv6-traffic-with-azure-ad-sign-in-activity-reports) で説明したサインイン レポートを使用します。結果として取得したアドレスの一覧を使用して、[こちら](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition#ipv4-and-ipv6-address-ranges) の手順に従って、IPv6 範囲を Azure AD の ネームド ロケーションに追加する必要があるかどうかを判断ください。また、必要に応じて、社内のネットワーク チームと協力して、組織の IPv6 範囲を確認することも重要です。

- **ネットワーク管理者**: IT / セキュリティ管理者と協力して、ネットワーク基盤の IPv6 範囲を特定ください。[こちら](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition#ipv4-and-ipv6-address-ranges) の手順に従って、テナントの既存の Azure AD ネームド ロケーションにこれらの範囲を追加します。

#### My Account が従来のプロフィール ページに置き換わる

[お客様側での対応は必要なし]

継続的なサービス改善の一環として、**2023 年 10 月** に従来のプロフィール ページ (https://account.activedirectory.windowsazure.com/r/#/profile) を新しく先進的な My Account の画面に置き換えます。7 月から 10 月にかけて、プロフィール ページ上のバナーで、置き換え予定についてお知らせします。

10 月になりましたら、プロフィール ページの URL は自動的に My Account にリダイレクトされます。旧 URL を許可リストまたはブックマークに登録していない限り、対応は不要です。許可リストを設定している場合は、My Account を含むように許可リストを更新する必要があります。My Account は本日より [https://myaccount.microsoft.com](https://myaccount.microsoft.com) でアクセスできます。

#### ユーザーごとの多要素認証 (MFA) 設定の最新化

[お客様側での対応は必要なし]

継続的なサービス改善の一環として、**2023 年 10 月** より、[Microsoft Entra 管理センター](https://entra.microsoft.com/) の画面デザインに合わせた、最新の "[ユーザーごとの MFA](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-userstates) の設定デザインが展開されます。このユーザー体験のアップデートの一環として、機能が削除されることはありません。この変更はすべてのお客様に対して自動的に行われるため、必要なアクションはありません。

#### Azure AD Graph の廃止と PowerShell モジュールの非推奨

[お客様側での対応が必要な場合があります]

2019 年に、弊社では Azure AD Graph サービスの [非推奨を発表](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) し、Azure AD Graph が **2023 年 6 月 30 日** 以降のある時点で機能しなくなることを [お伝え](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) してきました。また、3 つのレガシー PowerShell モジュール (Azure AD、Azure AD Preview、MS Online) が 2023 年 6 月 30 日に非推奨となることも以前にお伝えしました。弊社では、多くのお客様がまだこれらの移行を完了していないことを理解しており、この移行期間中にお客様と協力して影響を最小限に抑え、回避するために引き続き取り組むことをお約束しています。

弊社は、Azure AD Graph の廃止プロセスと PowerShell モジュールの非推奨化に関するスケジュールおよび詳細に関する最新情報を公開しました。詳細は [こちら](https://jpazureid.github.io/blog/azure-active-directory/important-azure-ad-graph-retirement-and-powershell-module/) をご覧ください。

要約は以下のとおりです: 

- **PowerShell**: レガシー PowerShell モジュールでサポートされているいくつかのシナリオが、Microsoft Graph PowerShell SDK ではまだ利用できないことを認識しております。このため、レガシー PowerShell モジュールの非推奨日を **2024 年 3 月 30 日** に延期しました。
- **Azure AD Graph**: 2023 年 6 月 30 日をもって、Azure AD Graph は廃止サイクルに入ります。6 月 30 日にアプリケーションへの影響はありませんが、Azure AD Graph API には、セキュリティ関連の修正以外の SLA やメンテナンスの保証をいたしません。弊社は、段階的に Azure AD Graph をリタイアすることを宣言しており、各ステップについては 3 カ月前に予告します。最初のステップでは、新しく作成されたアプリケーションが Azure AD Graph を使用できないようにします。次回の更新で、このステップのスケジュールと詳細をお知らせします。

すべてのお客様に、Azure AD Graph を使用するアプリケーションを Microsoft Graph API に移行し、レガシー モジュールを使用する PowerShell スクリプトの移行を開始することを強くお勧めします。

## Microsoft Entra Permissions Management

### 新機能のリリース

- [Microsoft Entra Permissions Management Azure Active Directory Insights](https://learn.microsoft.com/ja-jp/azure/active-directory/cloud-infrastructure-entitlement-management/product-privileged-role-insights)
- [Microsoft Entra Permissions Management: 請求対象リソース](https://learn.microsoft.com/ja-jp/azure/active-directory/cloud-infrastructure-entitlement-management/product-data-billable-resources)

## Microsoft Entra Workload Identities

### 新機能のリリース

- [マネージド ID 用ワークロード ID フェデレーション](https://learn.microsoft.com/ja-jp/azure/active-directory/workload-identities/workload-identity-federation)
- [.NET 用 Microsoft Authentication Library のマネージド ID](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new#general-availability---managed-identity-in-microsoft-authentication-library-for-net)

## Microsoft Entra External ID

### 既存機能の変更

#### B2B サインイン体験の今後の変更点

[お客様側での対応は必要なし]

現在、B2B ゲスト ユーザーがリソース テナントにサインインするよう促されると、背景とロゴのブランドにリソース テナントのものが反映されます。B2B ゲストがユーザー プリンシパル名 (UPN) を入力すると、ロゴはホーム テナントのものに変わりますが、背景のブランドはそのまま変わりません。

弊社は、クロステナントのコラボレーションの認証リクエストにおけるこのブランドのユーザー体験の変更に取り組んでいます。新しいユーザー体験では、B2B ゲスト ユーザーがサインインを要求された場合、UPN を入力した後、ホーム テナントのログイン ページにリダイレクトされ、ブランドのユーザー体験はリソース テナントではなくホーム テナントのものが反映されます。サインインに成功すると、ユーザーはリソース テナントでアプリにサインインします。

この変更は **2023 年 7 月** から開始し、**2023 年 10 月** までに完了する予定です。B2B コラボレーションを理解するには、[Azure AD B2B コラボレーションの概要](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/what-is-b2b) をご覧ください。

## Microsoft Entra Identity Governance

### 新機能のリリース

- [Microsoft Entra ID Governance](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-id-governance-is-generally-available/ba-p/2466932)
- [ライフサイクル ワークフロー](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/what-are-lifecycle-workflows)
- [クロステナント同期によるシームレスなアプリケーション アクセス](https://learn.microsoft.com/ja-jp/azure/active-directory/multi-tenant-organizations/cross-tenant-synchronization-overview)
- [グループ用 PIM](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/concept-pim-for-groups)
- [PIM ロールのアクティブ化にはアクティブ化前に条件付きアクセス ポリシーの評価が必要](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#on-activation-require-azure-ad-conditional-access-authentication-context)
- [Azure でアクティブな永続的ロールの割り当てもしくは PIM 外での割り当てでアラートを発生](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-resource-roles-configure-alerts)
- [セルフ サービス パスワード リセット (SSPR) で PIM の資格ある割り当てと間接的なグループ ロール割り当てをサポート](https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-sspr-policy#administrator-reset-policy-differences)
- [エンタイトルメント管理のカスタム拡張属性](https://learn.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-logic-apps-integration)
- [条件付きアクセス ポリシーでエンタイトルメント管理を対象/除外可能に](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/entitlement-management-external-users#review-your-conditional-access-policies)
- [Azure AD Cloud Sync を使用したディレクトリ拡張のサポート](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/cloud-sync/custom-attribute-mapping)

2023 年 7 月 11 日 (火) に開催されるデジタル イベント [Reimagine secure access with Microsoft Entra](https://aka.ms/MSFTEntra) をお見逃しなく。ぜひご参加ください！

ライブまたはリプレイをご覧になるには、[今すぐご登録](https://aka.ms/MSFTEntra) ください。

Shobhit Sahay
