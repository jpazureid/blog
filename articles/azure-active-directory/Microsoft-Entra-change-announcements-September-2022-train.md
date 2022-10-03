---
title: Microsoft Entra の変更管理のアナウンス (2022 年 9 月の状況)
date: 2022-10-02 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# Microsoft Entra の変更管理のアナウンス (2022 年 9 月の状況)

こんにちは、Azure Identity サポート チームの 竜 です。

本記事は、2022 年 09 月 30 日に米国の Azure Active Directory Identity Blog で公開された [Microsoft Entra change announcements – September 2022 train](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-change-announcements-september-2022-train/ba-p/2967454) を意訳したものになります。

----

皆さん、こんにちは。

2022 年 3 月に、お客様がより展開の計画を立てやすくするよう、[簡素化された変更管理プロセスを発表](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/azure-ad-change-management-simplified/ba-p/2967456) し、6 月には Microsoft の ID とアクセスの機能をすべて包含する新しい製品群として [Microsoft Entra を発表](https://www.microsoft.com/security/blog/2022/05/31/secure-access-for-a-connected-worldmeet-microsoft-entra/) しました。

前回の発表以降、弊社では Azure Active Directory (Azure AD) の継続的な改善、[さらにユーザー体験が向上した My Apps](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/public-preview-enhanced-quot-my-apps-quot-experience/ba-p/3118022) のパブリック プレビューのリリース、そして [Microsoft Entra Permissions Management](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-permissions-management-is-now-generally/ba-p/3290630) や [Microsoft Entra Verified ID](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-verified-id-now-generally-available/ba-p/3295506) の一般提供開始などを行ってきました。

ID とアクセス管理の製品群の拡大に合わせて、Microsoft Entra のすべての機能を含めるよう、変更管理のプロセスもその範囲を広げてまいりました。本日は機能変更および既存の動作に影響を与える変更について、9 月の状況をご紹介します。

これらの変更は、四半期ごとに、ブログ、リリース ノート、そして電子メールにてお客様にお伝えしています。また、お客様が、[Entra ポータル](https://entra.microsoft.com/#home) 内でライフ サイクルの変更 (廃止、提供停止、および既存の動作に影響を与える変更) により簡単に対応できるよう継続して取り組んでいます。 

以下に、「年 2 回の製品の廃止」および「年 4 回の機能変更および既存の動作に影響を与える変更」の連絡予定について情報をまとめました。

| __カテゴリ__ | __定義__ | __連絡の予定__ |
| --- | --- | --- |
| 製品の廃止の連絡 | **機能、性能、または製品を特定の期間後に廃止**することを指します。これは、一般的に、新たなお客様に対してサービスや機能の提供を停止し、廃止予定の機能に対して技術的面での投資が削減されることを意味します。最終的には、EOL (end-of-life) の状態に至り、すべてのお客様に対してサービスや機能の提供が停止されます。 | 年に 2 回 (3 月、9 月) |
| 製品の機能変更および既存の動作に影響を与える変更のお知らせ | **既存の動作に影響を与える変更**: 継続的な運用のためにお客様が何らかの操作や変更を行わない場合、既存のユーザーおよびパートナー体験に影響が生じると想定される変更です。<br>**機能の変更**: 既存の ID の機能に対する変更であり、お客様側での作業は必要はありませんが、ユーザー体験に変化が生じます。多くは、UI/UX (ユーザー インターフェイスおよびユーザー体験) への変更です。<br><br>これらの変更は一般的に頻繁に発生するため、より頻繁に弊社からの通知が必要となります。 | 年に 4 回 (3 月、6 月、9 月、11 月) | 

以下に、2022 年 9 月分として発表された機能変更の一覧をご紹介します。

## Azure MFA Server について

2024 年 9 月 30 日以降、Azure Multi-Factor Authentication (MFA) Server は、多要素認証 (MFA) のサービスを停止するため、MFA Server を利用した認証が失敗する状況となります。認証が中断なく処理され、サポートされた状態を維持するためには、最新の [Azure MFA Server のアップデート](https://www.microsoft.com/en-us/download/details.aspx?id=55849) に含まれる MFA Server 移行ツールを使用して、[ユーザーの認証データをクラウド ベースの Azure MFA サービスに移行する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-migrate-mfa-server-to-azure-mfa-user-authentication) 必要があります。詳細は「[MFA Server から Azure AD Multi-Factor Authentication に移行する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-migrate-mfa-server-to-azure-mfa)」をご参照ください。

## Graph サービス エンドポイントでの HTTP/2 の有効化について

2023 年 9 月 15 日より、Microsoft Graph のエンジニアリング チームは、Graph サービスのエンドポイントにおいて HTTP/2 のサポートを開始する予定です。既存の HTTP/1.1 バージョンのサポートに加えて、HTTP/2 のサポートが追加される予定です。Microsoft Graph のエンドポイントで HTTP/2 が有効になると、HTTP/2 をサポートするクライアントは、Microsoft Graph にリクエストを行う際に、このバージョンをネゴシエートするようになります。HTTP/2 の改善はパフォーマンスに焦点を当てたもので、遅延や帯域およびリソース消費 (参考: https://http2.github.io) の低下に加え、多重化や並列化、バイナリ エンコーディングとヘッダー圧縮による効率化も含まれています。これらの利点により、Microsoft Graph クライアントとお客様に大きな価値をもたらすことが期待されます。また、HTTP/2 は HTTP/1.1 と完全に後方互換性があり、クライアント アプリケーションでコード変更は特に必要ないと期待されます。なお、稀な事例として、アプリケーションが Header キーの大文字と小文字を区別せずに比較する HTTP の仕様に準拠していない場合に、一部のクライアント アプリケーションで悪影響が発生する可能性があります。  

## Azure AD Graph API について

Azure AD Graph は、**2023 年 6 月 30 日** まで **継続して** 機能する予定です。これは、当初の Azure AD Graph API の [廃止の発表](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) から 3 年後となります。Azure サービスにおける廃止の [ガイドライン](https://learn.microsoft.com/ja-jp/lifecycle/) に基づき、2023 年 6 月 30 日以降は、事前通知なく Azure AD Graph の提供を停止する可能性があります。弊社では 2023 年 6 月 30 日以降に Azure AD Graph の提供を停止することとなりますが、すべてのお客様が移行を完了し、運用環境のアプリケーションが Azure AD Graph を利用しないようにしたいと考えています。新機能の開発は  [Microsoft Graph](https://learn.microsoft.com/ja-jp/graph/overview) に対してのみ行われます。今後も Azure AD Graph のセキュリティ関連の修正は引き続きサポートしますが、Microsoft Graph への移行を推奨します。詳細は「[Azure AD Graph アプリをMicrosoft Graphに移行する](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview)」を参照ください。

## Azure Active Directory Authentication Library (ADAL) のサポート終了 (end-of-life) について

[以前発表しました](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/azure-ad-change-management-simplified/ba-p/2967456) ように、ADAL のサポート終了 (end-of-life) は 2022 年 12 月 31 日です。ADAL を使用したアプリは引き続き動作しますが、サポートやセキュリティ修正は end-of-life 以降は提供されません。また、ADAL の end-of-life 前に、ADAL の機能リリースや、新しいプラットフォーム バージョンへの対応予定もございません。このため、Microsoft Authentication Library (MSAL) への移行を優先することを推奨します。詳細は「[Microsoft Authentication Library (MSAL) へのアプリケーションの移行](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/msal-migration)」をご参照ください。

## ライセンスの割り当て API/PowerShell の廃止について

**既存のテナント** における、Azure AD Graph および MSOnline PowerShell における **ライセンスの割り当て** API および PowerShell コマンドレットの廃止は、2023 年 3 月 31 日に延長されました。2022 年 11 月 1 日以降に作成された **新しいテナント** では、これらの API と PowerShell コマンドレットは最初から機能しなくなる予定です。Microsoft Graph からライセンス管理 API にアクセスするためにアプリを移行するためには、["Migrate your apps to access the license managements APIs from Microsoft Graph"](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/migrate-your-apps-to-access-the-license-managements-apis-from/ba-p/2464366) と ["Find Azure AD and MSOnline cmdlets in Microsoft Graph PowerShell"](https://learn.microsoft.com/en-us/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0) のガイダンスに沿って、MS Graph への移行を優先することを推奨します。

## Azure AD、Azure AD Preview、MSOnline PowerShell の廃止について

引き続きお客様の移行作業をサポートするために、3 つの PowerShell モジュール (Azure AD、Azure AD Preview、MSOnline) の廃止予定日を 2023 年 6 月 30 日まで延長いたしました。この 3 つのモジュールは、セキュリティ アップデートが提供された場合に更新の必要が生じますが、それを除き、廃止予定日までお客様側の対応は特段なく継続して機能します。Azure AD API の状況によっては、2023 年 6 月 30 日以降、一部のコマンドレットが動作しなくなる可能性があることにご注意ください。今後、PowerShell におけるすべての投資は Microsoft Graph PowerShell SDK に対して行われるため、Microsoft Graph PowerShell SDK への移行を継続することを推奨します。また、弊社では Azure AD Graph および MSOnline モジュールに依存する既存のスクリプトおよび PowerShell プロセスを、Microsoft Graph PowerShell SDK に移行するためのツールおよびドキュメントの作成にも取り組んでいます。詳細は、["Find Azure AD and MSOnline cmdlets in Microsoft Graph PowerShell"](https://learn.microsoft.com/en-us/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0) と ["Upgrade from Azure AD PowerShell to Microsoft Graph PowerShell"](https://learn.microsoft.com/en-us/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0) をご参照ください。

## Azure AD Domain Services クラシック仮想ネットワークのサポートについて

以前発表したように、2017 年に Azure AD Domain Services (Azure AD DS) が Azure Resource Manager ネットワークでホスト可能になりました。それ以降、弊社では Azure Resource Manager の最新の機能を使用して、より安全なサービスを構築してきました。今後クラシック デプロイは Azure Resource Manager デプロイに完全に移行するため、Azure AD DS クラシック仮想ネットワークのデプロイは 2023 年 3 月 1 日に廃止される予定です。クラシック仮想ネットワークからの Azure AD DS の移行についての詳細は「[クラシック仮想ネットワーク モデルから Resource Manager への Azure Active Directory Domain Services の移行](https://learn.microsoft.com/ja-jp/azure/active-directory-domain-services/migrate-from-classic-vnet)」をご参照ください。

毎月の更新については、リリースノートのページでご確認ください: [Azure Active Directory の新着情報](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new)

いつものように、フィードバックや提案をお待ちしています。以下のコメントまたは [Azure AD feedback forum](https://feedback.azure.com/d365community/forum/22920db1-ad25-ec11-b6e6-000d3a4f0789) でご意見をお聞かせください。また、Microsoft Q&A で、質問、未解決の問題や機能に関するご要望を #AzureADChangeManagementSept2022Train のタグを使用して送信することも可能です。
 
[10 月 12 日から 10 月 14 日](https://ignite.microsoft.com/ja-JP/home) の間に開催される Microsoft Ignite でも、Microsoft Entra のニュースをお届けします。
