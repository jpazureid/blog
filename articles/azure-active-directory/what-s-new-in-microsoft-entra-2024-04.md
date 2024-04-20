---
title : Microsoft Entra の更新情報 (2024 年 4 月)
date : 2024-04-22 10:00
tags : 
    - Azure AD
    - US Identity Blog
---

# Microsoft Entra の更新情報  (2024 年 4 月)

本記事は、2024 年 4 月 1 日に米国の Microsoft Entra (Azure AD) Blog で公開された [What’s new in Microsoft Entra](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/what-s-new-in-microsoft-entra/ba-p/3796391) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

サイバー攻撃が日々巧妙化し、さらにクラウドベースのサービスの利用増加やモバイル デバイスの普及が進む中、組織は、オンプレミスとクラウドのすべてのリソースに対して、人と人以外の両方の ID の安全なアクセスを確保するとともに、セキュリティ体制の継続的な改善に取り組むことが不可欠です。

本日は、2024 年 1 月～ 3 月の機能リリース情報、および第 1 四半期の変更点をお知らせします。また、[リリースノート](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new)、メール、[Microsoft Entra 管理センター](https://entra.microsoft.com/)でも同様の情報をお知らせしています。

このブログでは、Microsoft Entra の製品別に内容をおまとめしておりますので、お客様の導入に関連する内容を素早く確認いただけると思います。今期のアップデートは以下のとおりです:

- Microsoft Entra ID
- Microsoft Entra ID ガバナンス
- Microsoft Entra 外部 ID
- Microsoft Entra Permissions Management
- Microsoft Entra ワークロード ID

## Microsoft Entra ID

新機能の発表は以下のとおりです。

- [Microsoft Entra ID Protection の新しいオフライン検出 不審な送信パターン](https://learn.microsoft.com/ja-jp/entra/id-protection/concept-identity-protection-risks#suspicious-sending-patterns)
- [Microsoft Entra ID Protection : Real-time threat intellgence](https://learn.microsoft.com/ja-jp/entra/id-protection/howto-identity-protection-investigate-risk#investigate-microsoft-entra-threat-intelligence-detections)
- [Microsoft Entra ID Protection に新しいプレミアム ユーザー リスク検出 Suspicious API Traffic](https://learn.microsoft.com/ja-jp/entra/id-protection/concept-identity-protection-risks#suspicious-api-traffic)
- [一般提供 - モバイルアプリにおけるアイデンティティ保護とリスク修復](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---identity-protection-and-risk-remediation-on-the-azure-mobile-app)
- [条件付きアクセス ポリシー の一覧でフィルタ可能な項目を追加](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/overview#administrator-experience)
- [条件付きアクセス: アプリケーションのフィルター](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-filter-for-applications)
- [MostRecentlyUsed (MRU) 方法での証明書ベースの認証](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-certificate-based-authentication-technical-deep-dive#certificate-based-authentication-in-mostrecentlyused-mru-methods)
- [Android 上の Microsoft Authenticator アプリの FIPS 140-3 エンタープライズ準拠](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-authentication-authenticator-app#fips-140-compliant-for-microsoft-entra-authentication)
- [管理グループのスコープでデータ アクションを持つ Azure カスタムロールを定義する](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/custom-roles)

### 変更のアナウンス

#### Azure AD Graph Retirement

[お客様によっては対応が必要です]

2023 年 6 月、Azure AD Graph API サービスの非推奨化に関する 3 年間の通知期間完了に関する [最新情報](https://jpazureid.github.io/blog/azure-active-directory/important-update-azure-ad-graph-api-retirement/) を共有した。このサービスは現在廃止サイクルに入っており、廃止 (停止) は段階的に行われます。この廃止サイクルの最初の段階では、2024 年 6 月 30 日以降に作成されたアプリケーションで、Azure AD Graph API (https://graph.windows.net) へのリクエストに対してエラー (HTTP 403) を受け取ることになります。

アプリケーションによっては、Microsoft Graph への移行が完了していない場合があることを理解しています。私たちは、2024 年 6 月 30 日以降に作成されたアプリケーションが、2025 年 6 月まで Azure AD Graph API の使用を再開できるようにするオプション構成を提供しています。 インストールやセットアップの一環としてアプリケーションを作成する必要があるソフトウェアを開発または配布し、これらのアプリケーションがAzure AD Graph APIにアクセスする必要がある場合は、影響を避けるために今すぐ準備する必要があります。

テナントの状態を監視し、テナントで Azure AD Graph API を使用しているアプリケーションとサービス プリンシパルに関する情報を提供する [Microsoft Entra レコメンデーション](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/overview-recommendations) の展開を開始しました。これらの新しい推奨事項は、影響を受けるアプリケーションとサービス プリンシパルを Microsoft Graph に移行する取り組みをサポートするよう情報を提供します。

Azure AD Graph の廃止、Azure AD Graph の新しい推奨事項、および 2024 年 6 月 30 日以降に作成されたアプリケーションで Azure AD Graph API の利用を延長する構成についての詳細は、[こちら](https://jpazureid.github.io/blog/azure-active-directory/important-update-azure-ad-graph-api-retirement/) の投稿を参照ください。

**参考情報**

- [Azure AD Graph から Microsoft Graph にアプリを移行する](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview)
- [Azure AD Graph アプリ移行計画のチェックリスト](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-planning-checklist)
- [Azure AD Graph から Microsoft Graph への移行に関する FAQ](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-faq)

#### 重要な更新: Azure AD PowerShell と MS Online PowerShell モジュールの非推奨

[お客様によっては対応が必要です]

2021 年、今後の Entra の PowerShell エクスペリエンスとして Microsoft Graph PowerShell SDK に投資し、[Azure AD と MS Online PowerShell モジュールへの投資を終了する予定であることを説明](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/automate-and-manage-azure-ad-tasks-at-scale-with-the-microsoft/ba-p/1942489) しました。2023 年 6 月、Azure AD と MS Online PowerShell モジュールの非推奨化を 2024 年 3 月 30 日まで延期すると [発表](https://jpazureid.github.io/blog/azure-active-directory/important-update-azure-ad-graph-api-retirement/) しました。その後、Microsoft Graph PowerShell SDK 不足している機能の解消を大幅に進めてきました。

**2024 年 3 月 30 日をもって、これらのPowerShellモジュールは非推奨となります**

- [Azure AD PowerShell](https://learn.microsoft.com/ja-jp/powershell/azure/active-directory/overview?view=azureadps-2.0) (AzureAD)
- [Azure AD PowerShell Preview](https://www.powershellgallery.com/packages/AzureADPreview/2.0.2.149) (AzureADPreview)
- [Azure Active Directory](https://learn.microsoft.com/ja-jp/powershell/azure/active-directory/install-msonlinev1?view=azureadps-1.0) (MSOnline)

[Microsoft Graph PowerShell SDK](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/overview?view=graph-powershell-1.0) はこれらのモジュールの移行先となるため、できるだけ早くスクリプトを Microsoft Graph PowerShell SDK に移行する必要があります。これらのモジュールの廃止に関する情報は以下を参照ください。

Azure AD PowerShell、Azure AD PowerShell Preview、および MS Online は、2025 年 3 月 30 日に廃止されるまで機能し続けます。**注意:** MS Online の 1.1.166.0 (2017) 以前のバージョンはサポートされておりませんので、2024 年 6 月 30 日以降、これらのバージョンの使用には支障が生じる可能性があります。

私たちは、Microsoft Entra を管理するための PowerShell エクスペリエンスに大幅な新規投資と将来的な投資を行っています。今後数ヶ月のうちにエキサイティングな改善を発表します。追加の情報については、[こちらのページ](https://jpazureid.github.io/blog/azure-active-directory/important-update-deprecation-of-azure-ad-powershell-and-msonline/) をご覧ください。

**参考情報**

- [Microsoft Graph PowerShell SDK overview](https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview?view=graph-powershell-1.0)
- [Migrate from Azure AD PowerShell to Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0)
- [Azure AD PowerShell to Microsoft Graph PowerShell migration FAQ](https://learn.microsoft.com/ja-jp/powershell/azure/active-directory/migration-faq?view=azureadps-2.0)
  • [Find Azure AD and MSOnline cmdlets in Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0)

#### Azure Multi-Factor Authentication Server 利用者への事前通知

[お客様によっては対応が必要です]

**2024 年 9 月 30 日** 以降、Azure Multi-Factor Authentication Server は多要素認証 (MFA) リクエストに対応しなくなり、お客様によっては認証に失敗する可能性があります。MFA サーバーの SLA に制限が生じ、Azure Portal の MFA アクティビティ レポートは利用できなくなります。認証サービスを中断せず、サポートされた状態を維持するためには、最新の [Azure MFA Server アップデート](https://www.microsoft.com/en-us/download/details.aspx?id=5584) に含まれる最新の移行ユーティリティを使用して、[ユーザーの認証データをクラウドベースの Azure MFA サービスに移行](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-migrate-mfa-server-to-mfa-user-authentication) する必要があります。その他の情報につきましては。[こちら](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-migrate-mfa-server-to-azure-mfa) をご参照ください。

#### Microsoft Entra Connect 2.x バージョンの廃止

[お客様によっては対応が必要です]

2023 年 3 月、マイクロソフトは過去の Microsoft Entra Connect Sync 2.x を新しいバージョンがリリースされた日から 12 ヶ月で廃止とするようアナウンスし始めました。現在は、ビルド 2.1.20.0 (2022 年 11 月 9 日リリース) 以降のみがサポートされています。 詳細については、[Microsoft Entra Connect 2.x バージョンの廃止](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/reference-connect-version-history#retiring-microsoft-entra-connect-2x-versions) を参照ください。

#### Microsoft Entra 条件付きアクセスを使用したリスク ベースのポリシーの管理

[お客様によっては対応が必要です]

2023 年 10 月に [発表](https://jpazureid.github.io/blog/azure-active-directory/what-s-new-in-microsoft-entra/) されたように、お客様は [これらの手順](https://learn.microsoft.com/ja-jp/entra/id-protection/howto-identity-protection-configure-risk-policies#migrate-risk-policies-to-conditional-access) に従って、レガシーな Entra ID Protection のユーザー リスク ポリシーとサインイン リスク ポリシーを、条件付きアクセスの最新のリスクベース ポリシーにアップグレードすることをお勧めします。レガシーなリスク ポリシーは今後廃止されます。

**2024 年 5 月 1 日** 以降、Entra ID Protection で新しくレガシー ユーザー リスク ポリシーやサインイン リスクポリシーを作成することはできません。新しいリスク ベースのポリシーを作成して有効にするには、条件付きアクセスを使用ください。

**2024 年 7 月 1 日** 以降、Entra ID Protection の既存のレガシー ユーザー リスク ポリシーまたはサインイン リスク ポリシーは編集できなくなります。これらを変更するには、以下の手順に従って条件付きアクセスに移行し、そこで管理ください。 

今すぐ移行を開始し、[Microsoft Entra ID Protection のリスクベースアクセスポリシー](https://learn.microsoft.com/ja-jp/entra/id-protection/concept-identity-protection-policies) でリスクベース ポリシーの詳細をご覧ください。

#### My Apps Secure Sign-in Extension

[お客様によっては対応が必要です]

**2024 年 6 月**、サポート対象外のバージョンの My Apps Secure Sign-in Extension を使用しているユーザーでは、拡張機能が動作を停止します。Microsoft Edge および Chrome の拡張機能を使用している場合は、機能に変更はありません。この拡張機能のサポートされていない Firefox バージョンを使用している場合、すべての機能が 2024 年 6 月に動作しなくなります (Firefox のサポートは 2021 年 9 月に終了していることにご注意ください)。Edge または Chrome バージョンの拡張機能を使用することを推奨いたします。

#### 動的グループのルール ビルダーにおける変更

[お客様によっては対応が必要です]

効率的な動的グループのルールを推奨するため、Microsoft Entra および Intune 管理センターの動的グループ ルール ビルダーのユーザー体験が更新されました。'match' および 'notMatch' 演算子は効率が悪く、必要な場合にのみ使用する必要があるため、**2024 年 7 月** をもって、ルールビルダーから削除されます。しかし、これらの演算子はまだ API レベルではサポートされておりますので、両方の管理センターのテキスト ボックスからルールを直接記載して利用することは可能です。したがって、これらの演算子を使用する必要がある場合は、継続して使用することができます！テキスト ボックスを使ったルールの書き方については、[こちら](https://learn.microsoft.com/ja-jp/entra/identity/users/groups-dynamic-membership#rule-builder-in-the-azure-portal) のドキュメントをご参照ください。

#### 条件付きアクセス '場所' の条件が変更

[お客様による対応は必要ありません。]

**2024 年 4 月** 中旬より、条件付きアクセスの「場所」条件が繰り上がります。場所は「ネットワーク」の割り当てとなり、新しいグローバル セキュア アクセスの割り当てである「準拠しているすべてのネットワークの場所」の箇所になります。

この変更は自動的に行われるため、管理者の対応は必要ありません。詳細は以下のとおりです:

- おなじみの「場所」条件に変更はなく、「場所」条件のポリシーを更新すると「ネットワーク」割り当てに反映され、その逆も同様です。
- 機能的な変更はなく、既存のポリシーの動作は変更なく機能し続けます。

詳しくは [こちら](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/location-condition#all-compliant-network-locations) をご参照ください。

#### Microsoft Entra ID Protection: "低" リスク検出の期限切れ

[お客様による対応は必要ありません。]

[こちら](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#plan-for-change---microsoft-entra-id-identity-protection-low-risk-age-out) でお知らせしたとおり、**2024 年 3 月 31 日** より、Microsoft Entra ID Identity Protection において 6 カ月以上経過した「低」リスクの検出およびユーザーはすべて自動的に期限切れとなり、無視されます。これにより、お客様はより重要度の高いリスクに焦点を当て、弊社としてもノイズを省いた調査環境を提供できるようになります。詳細については、[リスク検出とは](https://learn.microsoft.com/ja-jp/entra/id-protection/concept-identity-protection-risks) のページをご参照ください。

#### My Security Info ページにてパスワード変更を可能に

[お客様による対応は必要ありません。]

[こちら](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/microsoft-entra-new-feature-and-change-announcements/ba-p/3796396) でお知らせしたとおり、[My Security Info 管理ポータル](https://mysignins.microsoft.com/security-info) でパスワードを管理および変更する機能が **GA** となりました。継続的なサービス改善の一環として、**2024 年 4 月** より、従来の [パスワード変更エクスペリエンス](https://account.activedirectory.windowsazure.com/ChangePassword.aspx) を、新しく刷新した My Security Info エクスペリエンスに置き換えます。4 月から 6 月にかけて、段階的なロールアウトにより、従来のパスワード変更エクスペリエンスが My Security Info のページにリダイレクトされます。この変更は自動的に行われます。2024 年 6  月以降、従来のパスワード変更ページは利用できなくなります。

## Microsoft Entra ID Governance

新機能の発表は以下のとおりです。

- [API 駆動型インバウンド プロビジョニング](https://learn.microsoft.com/ja-jp/entra/identity/app-provisioning/inbound-provisioning-api-concepts)
- [グループの PIM を使用した Just-In-Time (JIT) アプリケーション アクセス](https://learn.microsoft.com/ja-jp/entra/identity/saas-apps/aws-single-sign-on-provisioning-tutorial#just-in-time-jit-application-access-with-pim-for-groups-preview)
- [クラウド同期を使用した Exchange ハイブリッドの書き戻し](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/cloud-sync/exchange-hybrid)

### 変更のアナウンス

#### サポート終了 - Forefront Identity Manager (FIM WAAD Connector) 用の Windows Azure Active Directory コネクター

[お客様によっては対応が必要です]

2014 年から提供されていた Windows Azure Active Directory Connector for Forefront Identity Manager (FIM WAAD Connector) が、2021 年に非推奨となりました。このコネクタの標準サポートは **2024 年 4 月** に終了します。お客様は、MIM 同期からこのコネクターを削除し、代わりに別のプロビジョニング メカニズムを使用する必要があります。詳細については、[Microsoft Entra プロビジョニング シナリオを FIM Connector for Microsoft Entra ID から移行する](https://learn.microsoft.com/ja-jp/microsoft-identity-manager/migrate-from-the-fim-connector-for-azure-active-directory) を参照ください。

## Microsoft Entra External ID

### 変更のアナウンス

#### B2B 招待メールの今後の変更

[お客様による対応は必要ありません。]

**2024 年 6 月** より、組織からの招待時のメールにおいて、フッターに **今後の招待をブロックする** オプションが表示されなくなります。以前は招待メールの送付これ以上しないように要望していたゲスト ユーザーに対しても、この変更に伴い、今後はメッセージが送付されるようになります。過去に https://invitations.microsoft.com/unsubscribe/manage で管理されていた配信停止リストにユーザーが追加されることは今後ありません。

この変更は自動的に行われますので、管理者とユーザーの対応は不要です。詳細は以下のとおりです:

- 今後、E メールには配信停止リンクは表示されません。
- すでに送信された E メールのリンクは機能しません。
- すでに E メール通知を要望しないと登録したお客様も今後は E メールを受信することになります。

詳しくは、公開情報 [B2B コラボレーションの招待メールの要素](https://learn.microsoft.com/ja-jp/entra/external-id/invitation-email-elements) をご覧ください。

#### Microsoft Entra Permissions Management

新機能の発表は以下のとおりです。

- Microsoft Entra Permissions Management: [アクセス許可分析レポートの表示およびダウンロード](https://learn.microsoft.com/ja-jp/entra/permissions-management/product-permissions-analytics-reports)

#### Microsoft Entra Workload ID

新機能の発表は以下のとおりです。

- [Soft Delete capability for Managed Service Identity](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/delete-recover-faq#are-managed-identities-soft-deleted-)

よろしくお願いいたします。

Shobhit Sahay
