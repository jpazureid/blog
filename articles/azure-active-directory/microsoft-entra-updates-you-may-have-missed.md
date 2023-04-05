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

マイクロソフトの第2四半期は、Microsoft Entra のセキュリティ機能のアップデートが行われ、また、組織のセキュリティ態勢を改善するためのセキュリティ分野の幅広い機能領域で一般提供の発表が行われた年でした。

以下にて、新しく追加された機能のリストをご案内しています。発表された内容を見逃した場合や、マイクロソフトが追加した内容を素早く確認したい場合は、以下のリストをご利用ください。これらのアップデートはエリアごとに整理されており、興味のある分野を簡単に見つけて確認することができます。

## ID の保護

- [条件付きアクセスの認証コンテキスト](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-cloud-apps#authentication-context)
- [段階的なロールアウトを利用した CBAのテスト](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-staged-rollout#enable-staged-rollout)
- [サインインログでNPS拡張機能とADFS MFAアダプターのMFAイベントを表示する](https://learn.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/concept-sign-ins)
- [ディレクトリの異常な変更に基づくユーザー侵害の検出](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-risks#user-linked-detections)
- [Azure多要素認証（MFA）サーバー移行](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-server-migration-utility)
- [Intune登録時の強制再認証、リスクのあるサインイン/ユーザーへの対応機能](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/howto-conditional-access-session-lifetime#require-reauthentication-every-time)
- [ユーザーを対象とした認証後の異常行動検知](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-risks)
- [サービスプリンシパルの異常なクレデンシャル変更を検出する](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-workload-identity-risk#workload-identity-risk-detections)
  

## ID の現代化 

- [Azure Blob Servicesの属性ベースのアクセス制御 - ABAC](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/conditions-overview)
- [単一のSAML/WS-FedベースのIdPを複数のドメインで構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/direct-federation)
- [全ユーザーのBitlockerセルフサービスリカバリーをブロックする](https://learn.microsoft.com/ja-jp/azure/active-directory/devices/device-management-azure-portal#configure-device-settings)  
- [管理単位でグループを作成する](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/admin-units-members-add)
- [AUの管理単位とデバイスの論理削除について](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/recover-from-deletions#administrative-units) 
- [正規表現を使ってトークン請求のグループ名をフィルタリングして変換する](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-fed-group-claims)  
- [アプリケーションの統合と移行のための多値属性に対するクレーム変換](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-saml-claims-customization#claim-transformations)
- [デバイスの管理単位でのサポート](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/administrative-units)
  

## Identity Governance 

- [Azure LighthouseのためのPIM 適格な認可について](https://learn.microsoft.com/ja-jp/azure/lighthouse/how-to/create-eligible-authorizations)
- [オンプレミスのアプリケーションにユーザーをプロビジョニングする](https://learn.microsoft.com/ja-jp/azure/active-directory/app-provisioning/on-premises-application-provisioning-architecture)  

## パスワードレス 

- [Windows Hello for Business（WHFB）のクラウド信頼性](https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-cloud-kerberos-trust)
- [AADJデバイスのWindows Web サインインを一時アクセス パスのみ使用するよう制限する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-temporary-access-pass)
- [iOS端末の複数パスワードレス電話サインインについて](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-passwordless-phone#multiple-accounts-on-ios)
  

## 外部 ID (B2B & B2C)
- [ゲストユーザーの引き換えステータスをリセットする](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/reset-redemption-status)
 

## 過去に発表されたアップデート 

さらに、マイクロソフトは以前、当社のセキュリティサービスを強化するためのいくつかのアップデートを発表しました。これらのアップデートには、証明書ベースの認証、FIPS 140への準拠、Microsoft Authenticatorアプリの高度な機能などが含まれています。これらのアップデートとその機能の詳細については、以下のリンクをご確認ください。
  

- [モバイル端末での Azure AD 証明書ベース認証 (CBA)](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-certificate-based-authentication-cba-on-mobile/)
- [Microsoft Authenticator が FIPS 140 に準拠しました](https://jpazureid.github.io/blog/azure-active-directory/microsoft-brings-fips-140-compliance/)
- [Microsoft Authenticatorの高度なセキュリティ機能が一般公開されました！](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/advanced-microsoft-authenticator-security-features-are-now/ba-p/2365673)
    日本語の記事は[こちら](https://jpazureid.github.io/blog/azure-active-directory/defend-your-users-from-mfa-fatigue-attacks/)にて解説しています。
- [アプリの条件付きアクセス フィルターがパブリック プレビューになりました](https://jpazureid.github.io/blog/azure-active-directory/ca-filter-for-apps/)
- [Microsoft Entra ワークロード ID の一般提供](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-workload-id-ga/)
