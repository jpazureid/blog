---
title: Microsoft Entra の最新情報
date: 2023-04-07 09:00
tags:
    - Azure AD
    - US Identity Blog
---

# Microsoft Entra の最新情報

こんにちは、Azure Identity サポート チームの 小出 です。

本記事は、2023 年 3 月 24 日に米国の Azure Active Directory Identity Blog で公開された [microsoft-entra-updates-you-may-have-missed](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-updates-you-may-have-missed/ba-p/2967449) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

マイクロソフトの第 2 四半期は、Microsoft Entra のセキュリティ機能のアップデートが行われ、また、組織のセキュリティ態勢を改善するためのセキュリティ分野の幅広い機能領域で一般提供の発表が行われた年でした。

以下にて、新しく追加された機能のリストをご案内しています。発表された内容を見逃した場合や、マイクロソフトが追加した内容を素早く確認したい場合は、以下のリストをご利用ください。これらのアップデートはエリアごとに整理されており、興味のある分野を簡単に見つけて確認することができます。

## ID の保護

- [条件付きアクセスの認証コンテキスト](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-cloud-apps#authentication-context)
- [段階的なロールアウトを利用した CBA のテスト](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-staged-rollout#enable-staged-rollout)
- [サインイン ログで NPS 拡張機能と AD FS MFA アダプターの MFA イベントを表示する](https://learn.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/concept-sign-ins)
- [ディレクトリの異常な変更に基づくユーザー侵害の検出](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-risks#user-linked-detections)
- [Azure 多要素認証 (MFA) サーバー移行](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-server-migration-utility)
- [Intune 登録時の強制再認証とリスクのあるサインイン/ユーザーへの対応機能](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/howto-conditional-access-session-lifetime#require-reauthentication-every-time)
- [ユーザーを対象とした認証後の異常行動検知](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-risks)
- [サービス プリンシパルの異常な資格情報の変更を検出する](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-workload-identity-risk#workload-identity-risk-detections)
  
## ID の刷新 

- [Azure Blob Services の属性ベースのアクセス制御 - ABAC](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/conditions-overview)
- [単一の SAML/WS-Fed ベースの IdP を複数のドメインで構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/direct-federation)
- [全ユーザーの Bitlocker セルフサービス リカバリーをブロックする](https://learn.microsoft.com/ja-jp/azure/active-directory/devices/device-management-azure-portal#configure-device-settings)  
- [管理単位でグループを作成する](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/admin-units-members-add)
- [管理単位とデバイスの論理削除について](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/recover-from-deletions#administrative-units) 
- [正規表現を使ってトークン要求のグループ名をフィルタリングして変換する](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-fed-group-claims)  
- [アプリケーションの統合と移行のための複数値に対するクレーム変換](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-saml-claims-customization#claim-transformations)
- [デバイスの管理単位でのサポート](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/administrative-units)

## Identity Governance 

- [Azure Lighthouse のための PIM における権限ある認可について](https://learn.microsoft.com/ja-jp/azure/lighthouse/how-to/create-eligible-authorizations)
- [オンプレミスのアプリケーションにユーザーをプロビジョニングする](https://learn.microsoft.com/ja-jp/azure/active-directory/app-provisioning/on-premises-application-provisioning-architecture)  

## パスワードレス 

- [Windows Hello for Business (WHFB) のクラウド信頼性](https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-cloud-kerberos-trust)
- [AADJ デバイスの Windows Web サインインを一時アクセス パスのみ使用するよう制限する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-temporary-access-pass)
- [iOS 端末の複数パスワードレス電話サインインについて](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-passwordless-phone#multiple-accounts-on-ios)

## 外部 ID (B2B & B2C)
- [ゲストユーザーの引き換えステータスをリセットする](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/reset-redemption-status)

## 過去に発表されたアップデート 

さらに、マイクロソフトは以前、当社のセキュリティ サービスを強化するためのいくつかのアップデートを発表しました。これらのアップデートには、証明書ベースの認証、FIPS 140 への準拠、Microsoft Authenticator アプリの高度な機能などが含まれています。これらのアップデートとその機能の詳細については、以下のリンクをご確認ください。

- [モバイル端末での Azure AD 証明書ベース認証 (CBA)](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-certificate-based-authentication-cba-on-mobile/)
- [Microsoft Authenticator が FIPS 140 に準拠しました (サポート チームによる翻訳)](https://jpazureid.github.io/blog/azure-active-directory/microsoft-brings-fips-140-compliance/)
- [Microsoft Authenticator の MFA 疲労攻撃対策 - 数値の一致による MFA が 有効化されます (サポート チームによる翻訳)](https://jpazureid.github.io/blog/azure-active-directory/defend-your-users-from-mfa-fatigue-attacks/)
- [アプリの条件付きアクセス フィルターがパブリック プレビューになりました (サポート チームによる翻訳)](https://jpazureid.github.io/blog/azure-active-directory/ca-filter-for-apps/)
- [Microsoft Entra ワークロード ID の一般提供 (サポート チームによる翻訳)](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-workload-id-ga/)
