---
title: Microsoft Entra の変更のアナウンス (2023 年 3 月の状況)
date: 2023-04-03 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# Microsoft Entra の変更のアナウンス (2023 年 3 月の状況)

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2023 年 3 月 31 日に米国の Azure Active Directory Identity Blog で公開された [Microsoft Entra Change Announcements – March 2023 Train](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-change-announcements-march-2023-train/ba-p/2967448) を意訳したものになります。

ご不明点等ございましたらサポート チームまでお問い合わせください。

----

皆さん、こんにちは。

本日は、3 月分の機能変更と重大な変更について紹介します。これらの変更は、[リリースノート](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new) や電子メールでもお伝えしています。また、お客様が新しい Entra 管理センターでライフサイクルの変更 (廃止、サポート終了、サービスの重大な変更) を管理しやすくするための取り組みも続けています。さらに今後、新機能のリリースをこのブログ記事の一部として掲載し、既存機能の変更と新機能の両方を 1 つのリストで確認できるようにする予定です。

2023 年 3 月の変更は以下のとおりです。

## セキュリティの改善

### 番号の一致機能に関するメッセージ センターへの投稿内容の更新

Microsoft Authenticator アプリの番号の一致機能は、2022 年 11 月に GA しました。Microsoft Authenticator のプッシュ通知を利用しているユーザーに番号の一致機能をスムーズに展開するために、まだ展開の制御機能 (Azure Portal の管理画面と Microsoft Graph API から利用可能) を利用されていない場合は、ぜひ活用されることをお勧めします。弊社では以前、2023 年 2 月 27 日から Microsoft Authenticator のプッシュ通知のすべての利用者に対して、管理者用の設定を削除し、テナント全体で番号の一致機能を強制すると発表していました。しかしながら、お客様の声に耳を傾けた結果、管理者用の設定を利用できる期間をあと数週間延長することにいたしました。組織は、**2023 年 5 月 8 日** まで、既存の展開の制御設定を使用して、組織で番号の一致機能を展開することができます。マイクロソフトは、2023 年 5 月 8 日以降、Microsoft Authenticator のプッシュ通知を利用するすべてのユーザーに対して、番号の一致機能の強制を開始する予定です。また、その日以降、番号の一致に関する管理者用の設定機能を削除する予定です。

お客様側で 2023 年 5 月 8 日より前にすべてのユーザーに Microsoft Authenticator プッシュ通知の番号一致機能を有効にしない場合、マイクロソフト側でこの変更を強制的に展開しますが、その間、ユーザーのサインイン時の動作が一貫性のないものになる可能性があります。すべてのユーザーで一貫した動作とするために、事前に Microsoft Authenticator のプッシュ通知の番号一致機能を有効にすることを強くお勧めします。詳細については、以下をご覧ください。

- [多要素認証 (MFA) 通知で数値の一致を使用する方法 - 認証方法ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-number-match)
- [Microsoft Authenticator の MFA 疲労攻撃対策 - 数値の一致による MFA が 有効化されます](https://jpazureid.github.io/blog/azure-active-directory/defend-your-users-from-mfa-fatigue-attacks/)

### Azure Multifactor Authentication (MFA) Server

2024 年 9 月 30 日より、展開済みの Azure Multifactor Authentication (MFA) Server は、多要素認証 (MFA) リクエストに応答しなくなり、お客様の組織では認証に失敗する可能性があります。認証機能の利用を中断させず、サポートされた状態を維持するため、お客様におかれましては、最新の [Azure MFA Server の更新](https://www.microsoft.com/en-us/download/details.aspx?id=55849) に含まれる移行ユーティリティを使用して、[ユーザーの認証データをクラウド ベースの Azure MFA サービスに移行](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-migrate-mfa-server-to-azure-mfa-user-authentication) ください。詳しくは、[Azure MFA Server の移行](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-migrate-mfa-server-to-azure-mfa-user-authentication) をご覧ください。

### システムが推奨する認証方式の有効化

現在、さまざまな認証方式をユーザーが選んだ既定の方法として選択できるようになっています。しかし、すべての認証方式が同じレベルのセキュリティを提供するわけではありません。特にフィッシングに強い認証方法の代わりに、安全性の低い認証方法が選択された場合には、組織に潜在的なリスクが生じます。

これに対処するため、MFA にシステムが推奨する認証方式 (システム優先 MFA 機能) を導入します。この機能が有効になると、MFA の実行時に、ユーザーの登録した認証方法のうち最も安全な認証方法が、第二認証要素として要求されるようになります。これにより、より安全な方法が登録され利用可能な場合でも、ユーザーが指定した既定の方法が選択され、常にその方法が最初に要求されるという、以前の機能が置き換えられます。この機能は、[Microsoft Graph API](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-system-preferred-multifactor-authentication?branch=pr-en-us-227476#enable-system-preferred-mfa) を使用することで、**本日より利用可能** です。この機能を有効にすると、ユーザーは、利用可能な最も推奨された認証方法を使用してサインインするよう促されます。詳しくは、[システム優先多要素認証の記事](https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-system-preferred-multifactor-authentication?branch=pr-en-us-227476) ご確認ください。

### 条件付きアクセスの「承認されたクライアント アプリが必要です」の廃止

**2026 年 3 月 31 日に、Azure Active Directory (Azure AD) 条件付きアクセスの 「承認されたクライアント アプリを要求する」の制御が提供終了となり、適用されなくなります。** この日までに、[アプリの保護ポリシーが必要](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-grant#require-app-protection-policy) の制御に移行して使用を開始する必要があります。[アプリの保護ポリシーが必要](https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-grant#require-app-protection-policy) は「承認されたクライアント アプリを要求する」の機能をすべて備えており、加えて以下のような利点もありますので、この恩恵を得るために、早めに移行することをお勧めします。

- 対応する Intune ポリシーも検証される。
- ユーザーにアクセスが許可される前に適用される。
- セキュリティが強化されている。

サービスの利用が中断されるのを避けるため、**2026 年 3 月 31 日までに Azure AD の条件付きアクセスで「アプリ保護ポリシーが必要」の制御を利用する**よう [移行](http://aka.ms/RetireApprovedClientApp) ください。ご質問がある場合は、[Microsoft Q&A](http://aka.ms/ApprovedClientAppRetirementQA) でコミュニティの専門家にもご質問ください。

### 従来の多要素認証 (MFA) およびセルフサービス パスワード リセット (SSPR) ポリシーにおける認証方法の管理の廃止

**2024 年 9 月 30 日** 以降、従来の [MFA](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-mfasettings#verification-methods) および [SSPR](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-sspr-howitworks#authentication-methods) ポリシーで認証方法を管理することはできなくなります。組織は、パスワードレス、多要素認証、セルフサービス パスワード リセットを含むすべての認証方法を一元的に管理できる、統合された認証方法のポリシーに管理方法を [移行する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-authentication-methods-manage) 必要があります。詳しくは、[Azure AD の認証方式を管理する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-methods-manage) をご覧ください。

### Azure AD で IPv6 がサポート

以前、弊社では Microsoft Azure AD に IPv6 サポートを導入し、お客様が IPv4、IPv6、またはデュアル スタックのエンドポイントを経由してAzure AD のサービスにアクセスできるようにする計画を [発表](https://jpazureid.github.io/blog/azure-active-directory/ipv6-coming-to-azuread/) しました。改めて、**2023 年 3 月 31 日** から段階的に Azure AD サービスに IPv6 サポートを導入し始めることをここでお知らせします。

ネットワークが IPv6 をサポートしていない場合、設定やポリシーを変更するためにアクションは必要はありません。ほとんどのお客様にとって、IPv4 の利用が完全に消えることはないため、Azure AD の機能やサービスにおいて IPv6 を必須としたり、IPv4 を非優先としたりすることは計画していません。Azure AD における IPv6 有効化に関する追加ガイダンスは、こちらの覚えやすいリンク ([https://aka.ms/azureadipv6](https://aka.ms/azureadipv6)) で引き続き共有していきます。

## ユーザー体験の改善

### 利用規約のユーザー体験を刷新

**2023 年 7 月** より、以下の利用規約のエンドユーザー体験を最新の PDF ビューアーに刷新し、URL を https://account.activedirectory.windowsazure.com から https://myaccount.microsoft.com に移行します。

- 以前に承認された利用規約を閲覧する
- サインインの流れの一環として利用規約を承認または拒否する

機能が削除されることはありません。新しい PDF ビューアには機能が追加されますが、エンドユーザーからの見た目の変化は限定的である旨も将来のアップデートで通知される予定です。特定のドメインのみを通信の許可リストに入れている場合、利用規約が期待どおりに機能するためには、許可リストにドメイン「myaccount.microsoft.com」および「*.myaccount.microsoft.com」が含まれていることを確認ください。詳細については、[https://aka.ms/touuiupdate](https://aka.ms/touuiupdate) をご覧ください。

### My Groups のユーザー体験の向上

新しく改良された **My Groups** のユーザー体験が [myaccount.microsoft.com/groups](https://myaccount.microsoft.com/groups) で利用可能でとなり、**2023 年 5 月** に古い画面は廃止となる予定です。以前の URL (**mygroups.microsoft.com**) にアクセスすると、**myaccount.microsoft.com/groups** の新しい画面にユーザーをリダイレクトします。

My Groups では、エンド ユーザーが参加するグループの検索、所有するグループの管理、既存のグループ メンバーシップの管理など、グループを簡単に管理することができます。また、お客様からのフィードバックに基づき、以下のような機能も追加されました:

- グループとグループ メンバーの一覧での並び替えとフィルタリング
- 巨大なグループに対するグループ メンバーの全リスト
- メンバー追加の要求に対して概要ページで対応可能

本日、ユーザーの皆様は、自身で **myaccount.microsoft.com/groups** に切り替えることで、新しい My Groups の恩恵を得ることができます。新旧の画面間のナビゲーションは、各サイトの通知バナーから利用できます。

注意: "セルフサービス グループ管理" の管理者用の設定は、新しい My Groups で利用できなくなり、**2023 年 5 月** に **廃止** される予定です。管理者は、グループの所有者やユーザーが My Groups にアクセスしたり利用したりすることを制限できなくなります。ただし、管理者は引き続き [こちら](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/groups-self-service-management) に記載されている設定を使用して、エンド ユーザーが M365 とセキュリティ グループを作成する権限を制御することが可能です。

**この変更はすべてのお客様で自動的に行われ、お客様側での操作は必要はありません。** 詳しくは、[My Apps ポータルでグループ情報を更新する](https://support.microsoft.com/ja-jp/account-billing/update-your-groups-info-in-the-my-apps-portal-bc0ca998-6d3a-42ac-acb8-e900fb1174a4) をご覧ください。

### My Apps ポータルの改善

貴社にて **myapps.microsoft.com** を使用してアプリの検索やアクセスを行っており、ネットワークにおいて特定の証明書やドメインのみを許可している場合、今後もアプリに期待どおりアクセスできるように、許可リストを更新する必要があります。弊社では、パフォーマンスと耐障害性を向上させるために、アプリの起動に新しいエンドポイントを導入しました。アプリにアクセスした際の要求は、新しいドメインである **launcher.myapps.microsoft.com** に今後送られます。

現在、お客様が **myapps.microsoft.com/signin** または **account.activedirectory.windowsazure.com/applications/signin** のディープ リンクを使用しており、加えて特定の証明書のみを許可している場合、許可リストを更新して **myapplications.microsoft.com** の証明書も許可リストに含める必要があります。特定のドメインまたは IP アドレスのみを許可している場合は、**launcher.myapps.microsoft.com** を含むように許可リストを更新する必要もあります。My Apps ポータルが期待どおりに動作するために、**2023 年 6 月 30 日** までに許可リストを更新ください。

証明書の許可リストを更新する必要があるかどうかを簡単に確認するには、[https://myapplications.microsoft.com](https://myapplications.microsoft.com) にアクセスください。期待どおりに読み込まれる場合は対応の必要はありません。問題が発生した場合は更新が必要です。

過去に My Apps の証明書を許可した経緯があるのであれば、今回も同様に My Apps から返される新しい証明書を許可するように同じように対応する必要があります。許可リストに登録する必要がある My Apps の証明書の取得処理は、使用しているブラウザによって異なります。Edge の場合、URL バーの左側にある鍵のアイコンを選択します。次に、ドロップダウンから「接続がセキュリティで保護されています」と表示されたオプションを選択します。「接続がセキュリティで保護されています」の詳細で、証明書のアイコンを選択すると、証明書の詳細を含む証明書ビューアーが開きます。その他の情報については、[Office 365 の URL と IP アドレスの範囲](https://learn.microsoft.com/ja-jp/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide) をご覧ください。

### My Apps Secure Sign-in Extension

2023 年 5 月より、[My Apps Secure Sign-in Extension](https://support.microsoft.com/en-us/account-billing/sign-in-and-start-apps-from-the-my-apps-portal-2f3b1bae-0e5a-4a86-a33e-876fbd2a4510) は、[Chromium の新しい Manifest Version 3 フォーマット](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/) に対応するためにアップデートされる予定です。この拡張機能を使用しているいくつかの機能でアップデートが発生しますが、現時点ではお客様側で対処の必要はありません。これらのアップデートは以下のとおりです: 

- Azure Marketplace または Azure AD アプリケーション ギャラリーからの一部の SAML アプリで利用可能だった、オプションの機能である [SAML シングル サインオンのワン クリックのアプリ構成](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/one-click-sso-tutorial) は、**2023 年 5 月** に提供が停止される予定です。この機能を使用して以前に構成されたすべてのアプリケーションは、引き続き動作し続けるため、現時点では追加の対応は必要ありません。
- My Apps のアプリ検索の機能は、MyApps のすべてのアプリを横断的に検索するようになり、新しく起動の機能も提供されます。検索クエリを入力すると、My Apps ポータルが新しいタブで開き、検索クエリがアプリの一覧に適用されるようになりました。そして、検索結果からアプリを起動することが可能となります。拡張機能の画面として、最近使ったものの表示がなくなります。  
- App Proxy のリンク変換機能で、動的かつセッションごとのルールが使用されるようになりました。これにより、1 テナントあたり上限として 2250 の一意なリンク変換の制限が導入されます。

[Edge アドオン](https://microsoftedge.microsoft.com/addons/detail/my-apps-secure-signin-ex/gaaceiggkkiffbfdpmfapegoiohkiipl?hl=en-gb) または [Chrome エクステンション](https://chrome.google.com/webstore/detail/my-apps-secure-sign-in-ex/ggjhpefgjjfobnfoldnjipclpcfbgbhl?hl=en-US) の最新バージョンを使用していることを確認ください。なお、この拡張機能の Firefox 版のサポートは 2021 年 9 月に終了しています。

### Azure AD 管理センターから Microsoft Entra 管理センターにリダイレクトされる

**2023 年 4 月 1 日** より、Azure AD Admin Center ([https://aad.portal.azure.com](https://aad.portal.azure.com])) へのアクセスは Microsoft Entra Admin Center ([https://entra.microsoft.com](https://entra.microsoft.com)) にリダイレクトされます。新しい管理センター内からは、これまでどおり Azure AD の管理タスクをすべて完了することができます。管理機能へ中断なくアクセス出来るようにするために、必要に応じてファイアウォール規則を更新ください。ファイアウォール規則の詳細は、[こちら](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/active-directory-faq#----------------------microsoft-entra---------url-------------------) をご覧ください。

**2023 年 4 月 1 日以降も Azure AD の管理ポータルにアクセスできるのでしょうか？**

- Azure AD 管理センター ([https://aad.portal.azure.com](https://aad.portal.azure.com)) は、**2023 年 5 月**まで機能を継続します。  
- Azure ポータル ([https://portal.azure.com](https://portal.azure.com)) でも、Azure のお客様向けに Azure AD の提供を継続します。

詳細は、[新しい管理センターにおける Azure AD および他の ID とアクセス製品の統合](https://jpazureid.github.io/blog/azure-active-directory/new-admin-center-unifies-azure-ad-with-other-identity-and-access-product/) をご確認ください。

## 開発者の体験の向上

### Azure AD Graph API

Azure AD Graph から Microsoft Graph へのスムーズな移行をお客様にお約束することを改めてお伝えしたいと思います。[以前に発表した](https://jpazureid.github.io/blog/azure-active-directory/Microsoft-Entra-change-announcements-September-2022-train/) ように、Azure AD Graph は **2023 年 6 月 30 日** まで利用可能です。弊社はこの日以降にいつでもサービスを停止する権利を有していますが、利用状況を監視し、お客様が API から移行するための十分な時間を提供したうえで、停止措置を行うようにいたします。その間、セキュリティ関連の修正を含めた Azure AD Graph のサポートを提供し続けますが、Azure AD Graph に依存した状態で運用環境を構成することは非推奨とします。すべての新機能と特徴は、[Microsoft Graph ](https://docs.microsoft.com/ja-jp/graph/overview) でのみ提供されます。すべてのお客様が、Microsoft Graph へ移行することを強く推奨します。詳しくは、[Azure AD Graph アプリを Microsoft Graph に移行する](https://docs.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview) をご覧ください。

### Azure AD (Preview) と MSOnline PowerShell の廃止

Azure AD、Azure AD Preview、MSOnline の 3 つの PowerShell モジュールのサポート期間の終了が近づいており、廃止予定日が **2023 年 6 月 30 日** であることを改めてお知らせしたいと思います。Azure AD API の状況によっては、2023 年 6 月 30 日以降、一部のコマンドレットが動作しなくなる可能性があります。弊社は、使用状況を確認し、お客様が 3 つの PowerShell モジュールから移行するための猶予を提供した上で、これらモジュールの利用を停止させる予定です。Microsoft Graph でこれら API の代替の機能が提供されない限り、API およびコマンドレットを停止させることはありません。

利用停止までは、セキュリティ関連の更新をサポートし続ける予定です。弊社はこれからも Microsoft Graph PowerShell SDK に対して、全ての PowerShell 関連の機能改善を行う予定であり、お客様においても移行を継続することを推奨します。

詳しくは、[Azure AD PowerShell から Microsoft graph PowerShell SDK への移行](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0) のドキュメントをご覧ください。

### ライセンス割り当て API/PowerShell の廃止

**既存テナント** の Azure AD Graph および MSOnline PowerShell ライセンス割り当て API と PowerShell コマンドレットの廃止予定日が **2023 年 3 月 31 日** であることを改めてお知らせします。2022 年 11 月 1 日以降に作成された **新規テナント** では、これら API とコマンドレットは既に動作しません。

[Azure AD Graph および MSOnline での従来のライセンスの割り当て方法が廃止され Microsoft Graph によるライセンス管理に変更される](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/) および [Azure AD と MSOnline コマンドレットに対応する Microosft Graph PowerShell を見つける](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0) のガイダンスに従って、Microsoft Graph への移行を速やかに行うことを推奨します。

以下は、弊社からの変更管理についての連絡予定の概要です。

| __カテゴリ__ | __定義__ | __連絡の予定__ |
|---|---|---|
| 製品の廃止の連絡 | **機能、性能、または製品を特定の期間後に廃止**することを指します。<br/><br/>これは、一般的に、新たなお客様に対してサービスや機能の提供を停止し、廃止予定の機能に対して技術的面での投資が削減されることを意味します。最終的には、EOL (end-of-life) の状態に至り、すべてのお客様に対してサービスや機能の提供が停止されます。 | 年に 2 回 (3 月、9 月) |
| 製品の既存の動作に影響を与える変更および機能変更のお知らせ | **既存の動作に影響を与える変更**: 継続的な運用のためにお客様が何らかの操作や変更を行わない場合、既存のユーザーおよびパートナー体験に影響が生じると想定される変更です。<br/>**機能の変更**: 既存の ID の機能に対する変更であり、お客様側での作業は必要はありませんが、ユーザー体験に変化が生じます。多くは、UI/UX (ユーザー インターフェイスおよびユーザー体験) への変更です。<br/>これらの変更は一般的に頻繁に発生するため、より頻繁に弊社からの通知が必要となります。 | 年に 4 回 (3 月、6 月、9 月、11 月) |  

毎月の更新については、リリースノートのページでご確認ください: [Azure Active Directory の新着情報](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new)

いつものように、フィードバックや提案をお待ちしています。以下のコメントまたは [Azure AD feedback forum](https://feedback.azure.com/d365community/forum/22920db1-ad25-ec11-b6e6-000d3a4f0789) でご意見をお聞かせください。また、Microsoft Q&A で、質問、未解決の問題や機能に関するご要望を #AzureADChangeManagementMar2023Train のタグを使用して送信することも可能です。
