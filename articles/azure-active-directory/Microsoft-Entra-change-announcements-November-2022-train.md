---
title: Microsoft Entra の変更管理のアナウンス (2022 年 11 月の状況)
date: 2022-12-04 12:00
tags:
  - Azure AD
  - US Identity Blog
---

#  Microsoft Entra の変更管理のアナウンス (2022 年 11 月の状況)  

こんにちは、Azure Identity サポート チームの 竜 です。

本記事は、2022 年 11 月 30 日に米国の Azure Active Directory Identity Blog で公開された [MMicrosoft Entra Change Announcements – November 2022 Train](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-change-announcements-november-2022-train/ba-p/2967452) を意訳したものになります。

----

皆さん、こんにちは。

Microsoft Entra の変更管理に関するアナウンスは、[Microsoft Entra](https://www.microsoft.com/en-us/security/blog/2022/05/31/secure-access-for-a-connected-worldmeet-microsoft-entra/) のすべての変更を含めて、半年に一度の製品廃止のお知らせと、四半期に一度の機能変更のお知らせをお伝えしています。これらのアナウンスの合間には、新製品や新機能のリリースに関するブログ記事を公開しています。たとえば、[9 月の変更管理のブログ記事](https://jpazureid.github.io/blog/azure-active-directory/Microsoft-Entra-change-announcements-September-2022-train/) では、[日本での新しいリージョンの一般提供](https://jpazureid.github.io/blog/azure-active-directory/Announcing-a-New-Azure-AD-part-of-Microsoft-Entra-region-in-Japan/) を開始したことを発表しました。

本日は、機能変更との既存の動作に影響を与える 11 月分の変更についてお知らせします。これらの変更は、リリース ノートや電子メールでもお知らせしています。また、お客様が新しい [Entra 管理センター](https://entra.microsoft.com/) で、ライフサイクルの変更 (廃止、サポート終了、サービスの破壊的な変更) を管理しやすくなるよう、引き続き取り組んでいます。

以下に、2022 年 11 月分として発表された機能変更の一覧をご紹介します。    

## Microsoft Authenticator における番号の一致機能

Microsoft Authenticator で [「番号の一致 (Number Matching)」機能](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-number-match) と [「追加のコンテキスト (Additional Context)」機能](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-additional-context) の一般提供を開始しました (2022 年 10 月 24 日現在)。番号の一致機能では、Authenticator アプリで多要素認証を承認する際に、サインイン画面に表示される数値の入力をユーザーに求めることで、誤って通知を承認するのを防ぐことができます。また、Authenticator の通知でユーザーに追加のコンテキストを表示することで、誤って承認するのを減らすことも可能です。管理者は以下の機能の有効化を選択できるようになりました。

1. アプリケーションのコンテキスト: ユーザーがどのアプリケーションにサインインしているかを表示します。
2. 地理的な位置のコンテキスト: サインインしているデバイスの IP アドレスに基づき、ユーザーのサインイン場所を表示します。

[MFA 疲労攻撃が増加している](https://jpazureid.github.io/blog/azure-active-directory/defend-your-users-from-mfa-fatigue-attacks/) 中、これらの機能は組織を守るために非常に重要です。Azure ポータルの管理者画面と Microsoft Graph API を活用することで、これらの重要なセキュリティ機能を組織でスムーズに導入することができますので、ぜひご検討ください。
 
Microsoft は、2023 年 2 月 27 日より、Microsoft Authenticator アプリを利用するすべてのユーザーを対象に、番号の一致機能を有効化する予定です。 詳しくは、[Microsoft Authenticator の MFA 疲労攻撃対策](https://jpazureid.github.io/blog/azure-active-directory/defend-your-users-from-mfa-fatigue-attacks/) をご参照ください。

## Azure AD への IPv6 の導入

企業ネットワーク、サービス プロバイダー、およびデバイスにおける IPv6 の普及とサポートが進む中、ユーザーが IPv6 クライアントや IPv6 ネットワークを使用して自社のサービスやアプリケーションに引き続きアクセスできるかどうか気にされているお客様も多くいらっしゃいます。

本日、Azure AD (Microsoft Entra) に IPv6 のサポートを導入する計画を発表しました。この変更により、お客様は IPv4 と IPv6 の両方のネットワーク プロトコル (デュアルスタック) で Azure AD のサービスにアクセスすることができるようになります。

ほとんどのお客様において、IPv4 が完全に利用されなくなることはないと想定しているため、Azure AD の機能やサービスにおいて、**IPv6 を必須としたり、IPv4 の優先順位を下げたりすることは予定していません**。

**2023 年 3 月 31 日** から、段階的に、Azure AD のサービスに IPv6 対応を導入していく予定です。 

> [!NOTE]
> サポート部門による注釈: 一部の Azure AD のサービスでは、IPv6 はすでにサポートされています。上記発表は今後、より多くのサービスにおいて、IPv6 がサポートされることを示しています。

IPv6 アドレスおよび条件付きアクセス ポリシーで [ネームド ロケーション](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition#named-locations) を使用している Azure AD のお客様向けに、以下のガイダンスを用意しました。

組織内で、特定のネットワーク境界を識別するためにネームド ロケーションを使用しているお客様は、以下の作業が必要となります: 

1. 既存の **ネームド ロケーション** の確認を行い潜在的な影響を予期すること
2. ネットワーク パートナーと協力してお客様の環境で使用されている外部向けの IPv6 アドレスを特定すること
3. 既存の [ネームド ロケーション](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition#ip-address-ranges) の見直しと変更を行い確認した IPv6 の範囲を含めること

[条件付きアクセス ポリシーにおける場所の条件](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition) を使用して特定のネットワークからのアクセスのみを許可するよう制限しているお客様は、以下の作業が必要となります: 

1. 既存の条件付アクセス ポリシーの確認を行いネームド ロケーションの利用による想定される影響を確認すること
2. 場所の条件を使用した既存の条件付きアクセス ポリシーの見直しと更新を行いそれらが組織のセキュリティ要件を引き続き満たしているかどうかを確認すること

Azure AD における IPv6 の有効化に関する追加のガイダンスは、こちらの覚えやすい URL (https://aka.ms/azureadipv6) にて引き続き共有していく予定です。

## Azure AD Domain Services のクラシック仮想ネットワーク サポート

以前発表したように、2017 年に Azure AD Domain Services (Azure AD DS) が Azure Resource Manager ネットワークでホスト可能になりました。それ以降、弊社は Azure Resource Manager の最新の機能を使用して、より安全なサービスを構築してきました。今後クラシック デプロイは Azure Resource manager デプロイに完全に移行するため、Azure AD DS クラシック仮想ネットワークのデプロイは 2023 年 3 月 1 日に廃止される予定です。クラシック仮想ネットワークからの Azure AD DS の移行についての詳細は [クラシック仮想ネットワーク モデルから Resource Manager への Azure Active Directory Domain Services の移行](https://learn.microsoft.com/ja-jp/azure/active-directory-domain-services/migrate-from-classic-vnet) をご参照ください。

以下は、弊社からの Microsoft Entra の変更管理についての連絡予定の概要です。

| __カテゴリ__ | __定義__ | __連絡の予定__ |
|---|---|---|
| 製品の廃止の連絡 | **機能、性能、または製品を特定の期間後に廃止**することを指します。これは、一般的に、新たなお客様に対してサービスや機能の提供を停止し、廃止予定の機能に対して技術的面での投資が削減されることを意味します。最終的には、EOL (end-of-life) の状態に至り、すべてのお客様に対してサービスや機能の提供が停止されます。 | 年に 2 回 (3 月、9 月) |
| 製品の機能変更および既存の動作に影響を与える変更のお知らせ | **既存の動作に影響を与える変更**: 継続的な運用のためにお客様が何らかの操作や変更を行わない場合、既存のユーザーおよびパートナー体験に影響が生じると想定される変更です。<br>**機能の変更**: 既存の ID の機能に対する変更であり、お客様側での作業は必要はありませんが、ユーザー体験に変化が生じます。多くは、UI/UX (ユーザー インターフェイスおよびユーザー体験) への変更です。<br><br>これらの変更は一般的に頻繁に発生するため、より頻繁に弊社からの通知が必要となります。 | 年に 4 回 (3 月、6 月、9 月、11 月) |  

毎月の更新については、リリースノートのページでご確認ください: [Azure Active Directory の新着情報](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new)

いつものように、フィードバックや提案をお待ちしています。以下のコメントまたは [Azure AD feedback forum](https://feedback.azure.com/d365community/forum/22920db1-ad25-ec11-b6e6-000d3a4f0789) でご意見をお聞かせください。

また、Microsoft Q&A で、質問、未解決の問題や機能に関するご要望を #AzureADChangeManagementNov2022Train のタグを使用して送信することも可能です。
