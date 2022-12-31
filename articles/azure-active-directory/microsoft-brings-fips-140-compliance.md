---
title: Microsoft Authenticator が FIPS 140 に準拠しました 
date: 2023-01-01 09:00
tags:
    - Azure AD
    - US Identity Blog
---

# Microsoft Authenticator が FIPS 140 に準拠しました 

こんにちは、Azure Identity サポート チームの小出です。

本記事は、2022 年 12 月 8 日に米国の Azure Active Directory Identity Blog で公開された [Microsoft brings FIPS 140 Compliance to Authenticator supporting Federal Agencies](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-brings-fips-140-compliance-to-authenticator-supporting/ba-p/2365671) を意訳したものになります。日本語での情報は、下記でも用意されております。併せてご確認ください。

- [新機能 リリース ノート - Azure Active Directory - Microsoft Entra | Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new#general-availability---authenticator-on-ios-is-fips-140-compliant)
- [Microsoft Authenticator の認証方法 - Azure Active Directory - Microsoft Entra | Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-authenticator-app#fips-140-compliant-for-azure-ad-authentication)

---

多くのお客様が、セキュリティやコンプライアンスに配慮し、認証機能には連邦情報処理標準 (FIPS) 140 (参考: NIST SP 800-63B) で検証済みの暗号を使用する必要のある環境で業務を行っています。この度、iOS 版の Microsoft Authenticator が FIPS 140 に準拠したことをお知らせいたします (Android 版の対応は近日公開予定です)。iOS 版 Authenticator のバージョン 6.6.8 以降は、プッシュ型多要素認証 (MFA)、パスワードレス電話サインイン (PSI)、時間ベースのワンタイム パスコード (TOTP) を用いた Azure Active Directory (Azure AD) のすべての認証において FIPS 140 に準拠しています。

Authenticator が FIPS 140 に準拠したことで、連邦政府機関が [大統領令 (EO) 14028 "国家のサイバー セキュリティの改善"](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/) の要件を満たすこと、ならびに医療機関が [EPCS (Electronic Prescriptions for Controlled Substances](https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-epcs-us) の要件を満たす事がより容易となります。

この機能を有効にするために、Authenticator アプリや Azure ポータルで設定を変更する必要はありません。iOS の Authenticator バージョン 6.6.8 以降のユーザーは、Azure AD 認証において既定で FIPS 140 に準拠した状態になります。

Authenticator は、Apple のネイティブ暗号機能を活用し、Apple iOS デバイスで FIPS 140 (Security Level 1) への準拠を実現します。使用されている認証の詳細については、[Apple CoreCrypto モジュール](https://support.apple.com/guide/certifications/ios-security-certifications-apc3fa917cb49/1/web/1.0) を参照ください。

皆様からのご意見をお待ちしています。コメントをお寄せいただくか、aka.ms/AzureADFeedback までお気軽にご連絡ください。

Alex Weinert ([@Alex_T_Weinert](https://twitter.com/Alex_T_Weinert))  
VP Director of Identity Security, Microsoft
