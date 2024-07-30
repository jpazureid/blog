---
title: "Microsoft Entra の新機能 – 2024年6月"
date: 2024-07-25 09:00
tags:
    - Microsoft Entra
    - US Identity Blog
---

# Microsoft Entra の新機能 – 2024 年 6 月

こんにちは、Azure Identity サポート チームの 夏木 です。
 
本記事は、2024 年 7 月 1 日に米国の Microsoft Entra (Azure AD) Blog で公開された [What’s new in Microsoft Entra – June 2024](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/what-s-new-in-microsoft-entra-june-2024/ba-p/3796387) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

Microsoft Entra 管理センターの[「新機能」を紹介しているページ](https://aka.ms/entra/whatsnew) では、Microsoft Entra の Identity およびネットワーク アクセス ポートフォリオ全体にわたるロードマップや変更アナウンスを一元的に表示しているため、最新のアップデートや実行可能なインサイトを通じてセキュリティ態勢を強化するための情報を得ることができます。

Microsoft Entra のブログでは、四半期ごとに新機能のリリース情報や変更アナウンスをお届けしています。本日の投稿では、2024 年 4 月から 6 月にかけてのアップデートを取り上げています。Microsoft Entra 製品ごとに整理されているので、それぞれの開発環境に関連する内容をすぐに確認できます。

- Microsoft Entra ID
- Microsoft Entra ID Governance 
- Microsoft Entra External ID 
- Microsoft Entra Permissions Management
- Microsoft Entra Verified ID

## 新しいリリース

- [Microsoft Entra ID Protection: リスクを修復してユーザーをブロック解除する](https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-remediate-unblock)
- [オンプレミスのパスワードリセット: ユーザーリスクの軽減](https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-remediate-unblock)
- [Android デバイス用の複数のパスワードレスサインイン](https://learn.microsoft.com/ja-jp/entra/identity/authentication/howto-authentication-passwordless-phone)
- [Windows アカウント拡張機能が Microsoft シングル サインオンに](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---windows-account-extension-is-now-microsoft-single-sign-on)
- [カスタムクレームプロバイダー: 外部データソースからのトークンクレームの拡張を可能に](https://learn.microsoft.com/ja-jp/entra/identity-platform/custom-extension-overview)
- [条件付きアクセスにおける詳細な証明書ベースの認証構成](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-authentication-strength-advanced-options)
- [新しいロール: 組織のブランド管理者](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration#configure-redemption-order)
- [Microsoft Graph アクティビティログ](https://learn.microsoft.com/en-us/graph/microsoft-graph-activity-logs-overview)
- [signIn API での $select](https://learn.microsoft.com/en-us/entra/fundamentals/whats-new#general-availability---select-in-signin-api) 
- [ユーザーの最後のサインイン日時のプロパティ](https://learn.microsoft.com/en-us/graph/api/resources/signinactivity?view=graph-rest-1.0)
- [セルフサービス パスワード リセットの管理者ポリシー拡大: 追加のロールを含むように](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy#administrator-reset-policy-differences)
- [動的グループの上限: 15,000 に増加](https://learn.microsoft.com/en-us/entra/identity/users/directory-service-limits-restrictions)
- [更新されたサインイン ワークブックで ADAL 移行を簡素化](https://learn.microsoft.com/en-us/entra/identity-platform/howto-get-list-of-all-auth-library-apps#step-2-access-sign-ins-workbook-in-azure-portal)

## 変更点のアナウンス

### Entra ID のセキュリティ アップデートによるパッチが適用されていない古い Windows を実行しているクライアントへの影響

[対応が必要な場合があります]

Entra ID へのサインインにおいて、パッチの適用されていない古いバージョンの Windows を使用する場合、旧式の Key Derivation Function v1 (KDFv1) を利用することはサポートされなくなります。このアップデートが展開されると、非サポートおよびパッチが適用されていない Windows 10 および 11 クライアントは Entra ID にサインインできなくなります。世界的に見て、Entra ID にサインインする Windows クライアントの 99% 以上が、必要なセキュリティ パッチを適用しています。  

必要なアクション:

2021 年 7 月以降のセキュリティ パッチが適用された Windows デバイスの場合、アクションは不要です。  

**2021 年 7 月以降のセキュリティ更新プログラムが適用されていない Windows デバイスの場合、最新のサポートされている Windows バージョンに更新してください。**

現在サポートされているすべての Windows バージョンには必要なパッチが含まれています。Windows をセキュリティ更新プログラムで最新の状態に保つことをお勧めします。  

背景: 2021 年 7 月に発行されたセキュリティ アップデート (CVE-2021-33781) では、クライアント内のプライマリ リフレッシュ トークンのセキュアな保存に関する脆弱性が修正されました。パッチ適用後、Windows クライアントはより強力な KDFv2 アルゴリズムを使用するようになりました。それ以降にリリースされたすべての Windows バージョンにはこのアップデートが含まれており、トークンを安全に処理します。

少数の Windows デバイスがまだ更新されておらず、古い v1 キー派生関数を使用しています。システムのセキュリティを向上させるため、KDFv1 アルゴリズムを使用しているパッチ未適用のデバイスは、プライマリ リフレッシュ トークンを使用して Entra ID にサインインできなくなります。

**この変更が展開された場合、サポートされていない Windows デバイスのユーザー エクスペリエンスはどうなりますか？**

2021 年 7 月以降のパッチが適用されていない Windows デバイスのユーザーは、Entra ID ユーザー アカウントでサインインに失敗する可能性があります。サインイン ログに表示されるエラー コードは「AADSTS5000611: Symmetric Key Derivation Function version 'KDFV1' is invalid. Update the device for the latest updates.」です。上記状況に該当する場合、このエラーから診断できます。

### エンタープライズにおける Apple デバイスのセキュリティ強化 - 2026 年 6 月開始

[対応が必要な場合があります]

デバイス ID は、Entra ID の基本概念の 1 つであり、デバイスのコンプライアンス ポリシー、アプリの保護ポリシー、PRT ベースの SSO など、複数の Entra ID および MDM/MAM セキュリティ機能を可能にします。セキュリティを強化するために、Entra ID はデバイス ID キーを Apple の Secure Enclave ハードウェアにhることをサポートする作業を行いました。これにより、以前のキーチェーン ベースのメカニズムが置き換わります。

2026 年 6 月以降、新しい Entra ID 登録はすべて Secure Enclave にバインドされます。その結果、すべての顧客は Microsoft Enterprise SSO プラグインを採用する必要があり、一部のアプリは新しい Secure Enclave ベースのデバイス アイデンティティを採用するためにコード変更を行う必要があるかもしれません。

**オプトインしてフィードバックを提供ください**

Entra が新しいデバイス登録において既定で Secure Enclave を有効にする前に、learn.microsoft.com のドキュメントを使用して早期にテストを行うことをお勧めします。これにより、アプリや MDM ベンダーにコード変更を依頼する必要がある互換性の問題を特定できます。問題の報告、質問、懸念事項については、サポート チケットを開くか、Microsoft アカウント チームに連絡ください。

### 2024 年 9 月 23 日までに Microsoft Entra Connect の最新バージョンにアップグレードください

[対応が必要な場合があります]

2023 年 9 月以降、Microsoft Entra Connect Sync と Microsoft Entra Connect Health を最新ビルドに自動アップグレードしています。これには、予防的なセキュリティ関連のサービス変更が含まれます。自動アップグレードをオプトアウトしたか、自動アップグレードに失敗した顧客に対しては、**2024 年 9 月 23 日までに最新バージョンにアップグレードすることを強くお勧めします。**

この日までに最新バージョンにアップグレードすることで、サービス変更が有効になったときに以下の機能の中断を避けることができます:

| サービス | 推奨バージョン | サービス変更によって影響を受ける機能 |
| --- | --- | --- |
| Microsoft Entra Connect Sync | [2.3.2.0 以上](https://aka.ms/connectsync-download) | 自動アップグレードが機能しなくなります。同期は影響を受けません。 |
| Microsoft Entra Connect Health agent for Sync | [4.5.2487.0 以上](https://aka.ms/connecthealth-download) | 次の [アラート](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-health-alert-catalog) のサブセットが影響を受けます： <br> - 認証失敗のため Microsoft Entra ID への接続に失敗 <br> - 高い CPU 使用率が検出されました <br> - 高いメモリ消費が検出されました <br> - パスワード ハッシュ同期が停止しました <br> - Microsoft Entra ID へのエクスポートが停止しました。偶発的な削除の閾値に達しました <br> - 過去 120 分間でパスワード ハッシュ同期のハートビートがスキップされました <br> - 無効な暗号化キーのため Microsoft Entra Sync サービスを開始できません <br> - Microsoft Entra Sync サービスが実行されていません : Windows サービス アカウントのクレデンシャルの期限が切れました |
| Microsoft Entra Connect Health agent for ADDS | [4.5.2487.0 以上](https://aka.ms/connecthealth-adds-download) | [全てのアラートが影響を受けます](https://aka.ms/connecthealth-adds-alerts) |
| Microsoft Entra Connect Health agent for ADFS | [4.5.2487.0 以上](https://aka.ms/connecthealth-adfs-download) | [全てのアラートが影響を受けます](https://aka.ms/connecthealth-adfs-alerts) |

**注意: 2024 年 9 月 23 日までにアップグレードできない場合でも、その後、推奨バージョンに手動でアップグレードすることで、上記の機能を完全に回復させることができます。**

アップグレードに関するガイダンスについては、当社の [ドキュメント](https://aka.ms/connecthealth-pks-servicechange) をご参照ください。

### 重要なアップデート: Azure AD Graph の廃止  

[対応が必要な場合があります]

2023 年 6 月時点で、Azure AD Graph API サービスは段階的に廃止されるサイクルに入っており、段階的に停止（シャットダウン）されます。この廃止サイクルの最初の段階では、新しく作成されたアプリケーションが Azure AD Graph API (<https://graph.windows.net>) へのリクエストに対してエラー (HTTP 403) を受け取ります。最初の段階の日付を 2023 年 6 月 30 日から **2024 年 8 月 31 日** に変更しました。したがって、 2024 年 8 月 31 日以降に作成されたアプリケーションのみが影響を受けます。Azure AD Graph サービスの廃止サイクルの第 2 段階は **2025 年 1 月 31 日** 以降に開始されます。この時点で、Azure AD Graph API を使用しているすべてのアプリケーションが AAD Graph サービスへのリクエストでエラーを受け取ります。Azure AD Graph は **2025 年 6 月 30 日** 以降完全に廃止され（動作を停止し）ます。

一部のアプリケーションが Microsoft Graph への移行を完全に完了していないことは理解しています。そのため、アプリケーションが 2025 年 3 月 30 日まで Azure AD Graph API を使用し続けることができるオプション設定（[authenticationBehaviors](https://learn.microsoft.com/en-us/graph/applications-authenticationbehaviors) 設定を通じて）を提供しています。Azure AD Graph API を使用し続けているソフトウェアを開発または配布している場合は、**停止を回避するためにすぐに対応する必要があります**。アプリケーションを Microsoft Graph に移行する (強く推奨) か、拡張のための設定を行い、お客様が変更に備えていることを確認ください。

Azure AD Graph API を使用しているアプリケーションを特定するために、テナント内で Azure AD Graph API を積極的に使用しているアプリケーションとサービス プリンシパルに関する情報を提供する 2 つの **[Entra 推奨事項](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/overview-recommendations)** を提供しています。

詳細については、以下の参考資料をご覧ください:

- [2024年6月の Azure AD Graph API 廃止に関する更新情報](https://aka.ms/AApjqqx)
- [Azure Active Directory (Azure AD) Graph から Microsoft Graph への移行](https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-overview)
- [Azure AD Graph アプリ移行計画チェックリスト](https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-planning-checklist)
- [Azure AD Graph から Microsoft Graph への移行 FAQ](https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-faq)

### 重要なアップデート: AzureAD および MSOnline PowerShell の廃止

[対応が必要な場合があります]

2024 年 3 月 30 日時点で、レガシー Azure AD PowerShell、Azure AD PowerShell Preview、および MS Online モジュールは [非推奨](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/important-update-deprecation-of-azure-ad-powershell-and-msonline/ba-p/4094536) となります。これらのモジュールは 2025 年 3 月 30 日まで **動作を続けます** が、その後は廃止され、動作を停止します。[Microsoft Graph PowerShell SDK](https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview?view=graph-powershell-1.0) がこれらのモジュールの代替となりますので、できるだけ早くスクリプトを Microsoft Graph PowerShell SDK に移行ください。

注意: 4 月の更新情報で示されたように、「レガシー認証」を使用する MS Online は 2024 年 6 月 30 日以降数週間で動作を停止します。レガシー認証は通常、バージョン 1.1.166.0 以前のバージョンに関連し、**Microsoft Online サインイン アシスタント** パッケージをインストールした MS Online PowerShell に関連します。バージョン 1.1.166.0 以前の MS Online またはレガシー認証を使用している場合は、直ちに Microsoft Graph PowerShell SDK へ移行するか、MS Online バージョンを最新バージョン（[1.1.183.81](https://www.powershellgallery.com/packages/MSOnline/1.1.183.81)）に更新ください。

テナント内で Azure AD PowerShell の使用を特定するために、[Entra 推奨事項](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/overview-recommendations) である **Migrate Service Principals from the retiring Azure AD Graph APIs to Microsoft Graph** を使用できます。この推奨事項は、テナント内で Azure AD Graph API を使用しているベンダーアプリケーションを示し、AzureAD PowerShell も含まれます。

弊社は、Entra の管理のための PowerShell エクスペリエンスに多大な新規投資と将来の投資を行っています。[Microsoft Entra PowerShell モジュールのパブリック プレビュー](https://aka.ms/EntraPSPreview) が最近開始されました。この新しいモジュールは Microsoft Graph PowerShell SDK の一部であり、すべてのコマンドレットと完全に互換性があります。これにより、簡単でよく文書化されたコマンドで複雑な操作を実行できます。このモジュールは、非推奨となる AzureAD モジュールからの移行を簡素化するための後方互換オプションも提供しています。また、一部のお客様が MSOnline からユーザーごとの MFA を管理するスクリプトへ完全に移行できていないことも認識しています。Microsoft Graph API では最近、ユーザーごとの MFA 設定を読み取りおよび構成することが [可能](https://developer.microsoft.com/en-us/graph/changelog?search=e22b3741-9f9a-4d25-af9d-e935018a8b68) になり、Microsoft Graph PowerShell SDK コマンドレットでの利用もまもなく可能となります。

### プライベート プレビュー – QR コード サインイン、フロントライン ワーカー向けの新しい認証方法

[対応が必要な場合があります]

Microsoft Entra ID において、フロントライン ワーカー が QR コードと PIN で認証する新しい簡単な方法を導入します。これにより、シフト中に長い UPN や英数字のパスワードを何度も入力する必要がなくなります。

この機能のプライベート プレビュー リリースは 2024 年 8 月であり、すべてのユーザーが https://login.microsoftonline.com の「サインインオプション」 > 「組織にサインイン」ページに移動すると「QR コードでサインイン」という新しいリンクが表示されます。この「QR コードでサインイン」というリンクは、モバイル デバイス (Android/iOS/iPadOS) のみで表示されます。プライベート プレビューに参加していない場合、プライベート プレビュー中はテナントのユーザーはこの方法でサインインできず、サインインを試みるとエラーメッセージが表示されます。

この機能には「プレビュー」タグが付いており、一般提供されるまでその状態が続きます。お使いの組織はこの機能をテストするために有効化する必要があります。広範なテストはパブリック プレビューで利用可能となり、後日発表します。

プライベート プレビュー中は技術サポートは提供されません。プレビュー中のサポートについての詳細は、こちらをご覧ください：[Microsoft Entra ID プレビュー プログラム情報 - Microsoft Entra | Microsoft Learn](https://learn.microsoft.com/en-us/entra/fundamentals/licensing-preview-info).

### 電話設定の変更: カスタム グリーティングと発信者 ID

[対応が必要な場合があります]

2024 年 9 月から、Entra の多要素認証ブレードにある電話設定 (カスタム挨拶メッセージと発信者 ID) が、認証方法ポリシーの音声認証方法の下に移動します。これらの設定にアクセスするには、Entra ID や Azure ポータルを通じてではなく、MS Graph API を通じて行う必要があります。組織でカスタム挨拶メッセージや発信者 ID を使用している場合、新しいエクスペリエンスがリリースされ次第、[公開情報](https://learn.microsoft.com/entra/identity/authentication/howto-mfa-mfasettings#phone-call-settings) を確認して MS Graph を通じてこれらの設定を管理する方法を確認ください。

### ユーザーごとの MFA の MS Graph API サポート

[対応が必要な場合があります]

2024 年 6 月から、ユーザーの状態（強制、有効、無効）を MS Graph API を通じて管理する機能をリリースします。これにより、廃止予定の従来の MS Online PowerShell モジュールが置き換えられます。Microsoft Entra MFA でユーザーを保護するための推奨方法は、ライセンスを持つ組織には条件付きアクセス、ライセンスを持たない組織にはセキュリティ デフォルトを利用することです。新しいエクスペリエンスがリリースされ次第、[公開情報](https://learn.microsoft.com/entra/identity/authentication/howto-mfa-userstates) が更新されます。  

### Azure Multi-Factor Authentication Server

[対応が必要な場合があります]

**2024 年 9 月 30 日** から、Azure Multi-Factor Authentication Server のデプロイメントは MFA リクエストに対応しなくなり、組織の認証が失敗する可能性があります。MFA Server の SLA は制限され、Azure ポータルでの MFA アクティビティレポートは利用できなくなります。認証サービスが中断されないようにし、サポートされる状態を維持するために、最新の [Azure MFA Serverアップデート](https://www.microsoft.com/en-us/download/details.aspx?id=55849) に含まれる最新の移行ツールを使用して、[ユーザーの認証データをクラウドベースの Azure MFA サービスに移行する](https://learn.microsoft.com/en-us/azure/active-directory/authentication/how-to-migrate-mfa-server-to-azure-mfa-user-authentication) 必要があります。詳しくは [Azure MFA Server Migration](https://learn.microsoft.com/en-us/azure/active-directory/authentication/how-to-migrate-mfa-server-to-azure-mfa) をご覧ください。

### Entra Connect Sync のグループ書き戻し V2 (パブリックプレビュー) の廃止 – リマインダー

[対応が必要な場合があります]

Entra Connect Sync における Group Writeback V2 のパブリックプレビューは利用できなくなり、Connect Sync は Active Directory へのクラウド セキュリティ グループのプロビジョニングをサポートしなくなります。

これに代わる機能として、Entra Cloud Sync に「Group Provision to AD」という機能が提供されており、クラウド セキュリティ グループを AD にプロビジョニングするために使用できます。Cloud Sync の拡張機能とその他の新機能が開発されています。

このプレビュー機能を Connect Sync で使用している顧客は、[設定を Connect Sync から Cloud Sync に切り替える](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/migrate-group-writeback) 必要があります。すべてのハイブリッド同期を Cloud Sync に移行するか、Cloud Sync を並行して実行し、AD へのクラウド セキュリティ グループのプロビジョニングのみを Cloud Sync に移行するかを選択できます。Microsoft 365 グループを AD にプロビジョニングするお客様は、この機能に Group Writeback V1 を使用し続けることができます。

### ユーザーごとの MFA 管理構成エクスペリエンスのビジュアルの改善

[対応不要]

サービスの継続的な改善の一環として、ユーザーごとの MFA 管理構成エクスペリエンスを Entra ID の外観に合わせて更新します。この変更にはコア機能の変更は含まれず、視覚的な改善のみが含まれます。2024 年 8 月から、Entra 管理センターおよび Azure ポータルの両方から新しいエクスペリエンスにリダイレクトされます。最初の 30 日間は旧エクスペリエンスに切り替えるためのバナーが表示され、その後は新しいエクスペリエンスのみが使用可能になります。新しいエクスペリエンスをリリース次第、[公開情報](https://learn.microsoft.com/entra/identity/authentication/howto-mfa-userstates) を更新します。

### Microsoft Entra 条件付き条件付きアクセスにおける「ターゲットリソース」の更新

[対応不要]

2024 年 9 月から、Microsoft Entra 条件付きアクセスの「ターゲットリソース」割り当てが、「クラウド アプリ」と「Global Secure Access」オプションを統合し、「リソース」という新しい名前になります。

お客様は、「Global Secure Access を利用したすべてのインターネット リソース」、「すべてのリソース (旧「すべてのクラウドアプリ」)」、または特定のリソース（旧「特定のアプリ」）をターゲットにすることができます。条件付きアクセス API の一部の Global Secure Access 属性も廃止される予定です。

この変更は 2024 年 9 月に開始され、自動的に実行されます。管理者は特に対応する必要はありません。既存の条件付きアクセス ポリシーの動作には変更はありません。詳しくは[こちら](https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/overview)をご覧ください。

### Entra IDデバイス コード フローの改善

[対応不要]

セキュリティへの継続的なコミットメントの一環として、Entra ID デバイス コード フローの改善を発表します。これらの改善は、より安全で効率的な認証エクスペリエンスを提供することを目的としています。

メッセージングを改善し、デバイス コード フロー内にアプリの詳細を含めることで、ユーザーがセキュリティ脅威をより効果的に認識し対応できるようにしました。特に、ヘッダーとお客様への確認事項の個所を調整し、ユーザーがセキュリティの脅威を認識し、対応するためのより安全で正確なユーザー体験を提供します。これらの変更は、ユーザーがより多くの情報に基づいた意思決定を行い、フィッシング攻撃を防止できるように設計されています。

これらの変更は 2024 年 7 月から段階的に導入され、2024 年 8 月 30 日までに完全に実装される予定です。対応は特に必要ありません。

### Microsoft Entra IDガバナンス

新しいリリース

- [Microsoft Entra IDのマルチテナント組織](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/collaborate-across-m365-tenants-with-entra-id-multi-tenant/ba-p/4120309)
- [クラウド同期を使用したActive Directoryへのセキュリティグループのプロビジョニング](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-configure-entra-to-active-directory)
- [Azureモバイルアプリ（iOSおよびAndroid）でのPIM承認および有効化のサポート](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-activate-your-roles)
- [ライフサイクルワークフロー: ワークフロー履歴データのCSVファイルへのエクスポート](https://learn.microsoft.com/en-us/entra/id-governance/download-workflow-history)
- [Entitlement ManagementにおけるB2Bスポンサーを属性および承認者として追加](https://learn.microsoft.com/en-us/entra/external-id/b2b-sponsors)
- [ライフサイクルワークフローの最大ワークフロー数が100に増加](https://learn.microsoft.com/en-us/entra/id-governance/governance-service-limits)
- [Microsoft Entraアプリケーションギャラリーに新しいプロビジョニングコネクタ](https://learn.microsoft.com/en-us/entra/fundamentals/whats-new#general-availability---new-provisioning-connectors-in-the-microsoft-entra-application-gallery---may-2024)

### Microsoft Entra External ID

新しいリリース

- [Microsoft Entra External ID](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/announcing-general-availability-of-microsoft-entra-external-id/ba-p/3974961)
- [B2Bコラボレーションの引き換え順序の設定](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration#configure-redemption-order)

### Microsoft Entra Permissions Management

新しいリリース

- [Microsoft Entra Permissions ManagementでのPIM有効グループのサポート](https://learn.microsoft.com/en-us/entra/permissions-management/)

### Microsoft Entra Verified ID

新しいリリース

- [Microsoft Entra Verified IDセットアップの迅速化](https://learn.microsoft.com/en-us/entra/verified-id/verifiable-credentials-configure-tenant-quick)

## お気に入りに追加ください: Microsoft Entra の新着情報

[最新情報](https://aka.ms/entra/whatsnew) を参照して、Microsoft Entra の製品更新情報や知見をぜひご確認ください。この新しいサイトでは、Microsoft Entra 管理センターで Microsoft Entra の ID およびネットワーク アクセス製品全体のロードマップと変更通知を一元的に表示できます。

## Microsoft Entraについてさらに詳しく知る

ID への攻撃の防止、最小特権アクセスの確保、アクセス制御の統一、およびオンプレミスおよびクラウド全体で包括的な ID およびネットワーク アクセス ソリューションを使用してユーザー体験を向上ください。

- [Microsoft Entra News and Insights | Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/)
- [Microsoft Entra blog | Tech Community](https://techcommunity.microsoft.com/t5/azure-active-directory/ct-p/Azure-Active-Directory)
- [Microsoft Entra documentation | Microsoft Learn](https://learn.microsoft.com/en-us/azure/active-directory/)
- [Microsoft Entra discussions | Microsoft Community](https://learn.microsoft.com/en-us/answers/products/azure)
