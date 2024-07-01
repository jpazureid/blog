---
title: "Azure ポータル (および Azure CLI 等) の MFA 義務付けに関する最新情報"
date: 2024-07-01 09:00
tags:
    - Microsoft Entra
    - US Identity Blog
---
# Azure ポータル (および Azure CLI 等) の MFA 義務付けに関する最新情報

こんにちは、Azure Identity サポート チームの 五十嵐 です。

本記事は、2024 年 6 月 27 日に米国の Core Infrastructure and Security Blog で公開された [Update on MFA requirements for Azure sign-in](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/update-on-mfa-requirements-for-azure-sign-in/ba-p/4177584) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

Microsoft が Azure ポータルおよび Azure CLI 等にサインインするユーザーに多要素認証 (MFA) を義務付けるという [発表](https://jpazureid.github.io/blog/azure-active-directory/microsoft-will-require-mfa-for-all-azure-users/) について、最新情報をお伝えします。この投稿では、その適用範囲、タイミング、実装の詳細、および準備のためのガイダンスについて説明します。

## タイミング

Azure ポータルおよび Azure CLI 等にサインインする際の MFA の義務付けは、段階的に展開されます:

**フェーズ 1**: 2024 年 7 月から、[Azure ポータル](https://portal.azure.com/) のサインイン時のみ MFA の実施が義務付けられ、すべてのテナントに順次展開されます。このフェーズでは、[Azure CLI](https://learn.microsoft.com/ja-jp/cli/azure/)、[Azure PowerShell](https://learn.microsoft.com/ja-jp/powershell/azure/?view=azps-12.0.0)、[IaC](https://learn.microsoft.com/ja-jp/devops/deliver/what-is-infrastructure-as-code) ツールなど、他の Azure クライアントには影響を与えません。

**フェーズ 2**: 2025 年初頭から、[Azure Command Line Interface](https://learn.microsoft.com/ja-jp/cli/azure/) (CLI)、[Azure PowerShell](https://learn.microsoft.com/ja-jp/powershell/azure/?view=azps-12.0.0)、[Infrastructure as Code](https://learn.microsoft.com/ja-jp/devops/deliver/what-is-infrastructure-as-code) (IaC) ツールのサインイン時に MFA の実施が義務付けられ、すべてのテナントに順次展開されます。

両フェーズとも、Microsoft は、お客様のテナントの施行予定日の 60 日前に電子メールおよび Azure Service Notification でグローバル管理者に通知します。この最初の通知をお客様が受け取るまで、お客様のテナントの施行までのカウントダウンは開始されません。さらに、最初の通知からお客様のテナントの実施開始までの間に、定期的にグローバル管理者にリマインダーを送信します。

また、ワークアラウンドが容易に利用できないユースケースで、Azure ポータルおよび Azure CLI 等のサインイン時の MFA 要求に備えるための追加時間 (テナントの施行開始日を超えて) が必要な一部のお客様には、猶予期間を設けます。弊社からの最初の通知には、お客様のテナントに対する施行日が記載され、猶予期間を申請するためのリンクも含まれます。猶予期間の対象となる顧客タイプ、ユースケース、シナリオの詳細については、通知に記載される予定です。

## 適用範囲

### ユーザー アカウント

どのユーザーが今回の変更の影響を受けるのかわかりにくいというフィードバックを得ていますので、改めて対象を明確にしますが、[Azure ポータル](https://portal.azure.com/)、[Azure CLI](https://learn.microsoft.com/ja-jp/cli/azure/)、[Azure PowerShell](https://learn.microsoft.com/ja-jp/powershell/azure/?view=azps-12.0.0)、および [Azure Developer CLI](https://learn.microsoft.com/ja-jp/azure/developer/azure-developer-cli/overview)、[Bicep](https://learn.microsoft.com/ja-jp/azure/azure-resource-manager/bicep/overview?tabs=bicep)、[Terraform](https://learn.microsoft.com/ja-jp/azure/developer/terraform/overview)、[Ansible](https://learn.microsoft.com/ja-jp/azure/developer/ansible/overview) などの [IaC](https://learn.microsoft.com/ja-jp/devops/deliver/what-is-infrastructure-as-code) ツールにサインインして CRUD (Create、Read、Update、Delete) 操作を行うすべてのユーザーが MFA 義務化の対象です。Azure ポータル、CLI、PowerShell にサインインしていないが、Azure でホストされているアプリ、Web サイト、サービスにアクセスしているというエンド ユーザーはこの変更の対象ではありません。それ以外に必要となる認証要件は、アプリ、Web サイト、またはサービスの所有者によって管理されます。

### オートメーション アカウント

マネージド ID やサービス プリンシパルなどの [ワークロード ID](https://learn.microsoft.com/ja-jp/entra/workload-id/workload-identities-overview) は、この変更による影響を受けません。自動化 (スクリプトやその他の自動化タスクを含む) を実行するサービス アカウントとしてユーザー ID を使用している場合、自動化が開始されると、それらのアカウントで MFA を使用する必要があります。当社のガイダンスでは、ユーザー ID を自動化に使用することを推奨しておらず、ユーザー ID を利用して自動化している場合には [ワークロード ID](https://learn.microsoft.com/ja-jp/entra/workload-id/workload-identities-overview) に移行する必要があります。

## 実装

サインイン時の MFA の要求は、Azure によって実装されます。[Microsoft Entra ID のサインイン ログ](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/concept-sign-ins) には、MFA 要求のソースとして表示されます。

MFA の要求は、テナントで管理者が設定したアクセス ポリシーの要件に追加されるかたちで行われます。すでに設定しているアクセス ポリシーで MFA の要求が含まれている場合にはこれまでの動作と変更がありません。たとえば、Microsoft の [セキュリティの既定値群](https://jpazureid.github.io/blog/azure-active-directory/security-default-2022/) を維持することを選択し、現在もセキュリティの既定値群を有効にしている場合、Azure の管理にはすでに MFA が必要であるため、ユーザーの動作に変更はありません。テナントが Microsoft Entra で [条件付きアクセス ポリシー](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/overview) を使用しており、ユーザーが MFA を使用して Azure にサインインする条件付きアクセス ポリシーがすでにある場合、ユーザーには変更はありません。同様に、フィッシングに強い MFA のような、より強力な認証を必要とする Azure をターゲットとした、より制限の厳しい条件付きアクセス ポリシーを既に導入している場合、それらのポリシーは引き続き適用され、ユーザーには変更はありません。

## 利用可能な MFA の方法

[サポートされているすべての MFA メソッド](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-mfa-howitworks#available-verification-methods) が使用可能であり、この変更の一環として認証方法の機能が変更されることはありません。外部 MFA ソリューションのサポートは、[外部認証方法](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-authentication-external-method-manage) のパブリック プレビューにあり、MFA 要件を満たすために使用できます。Microsoft Entra ID で外部ソリューションを使用するには、外部認証方法のプレビューに移行する必要があります。

Active Directory Federation Services などのフェデレーション ID プロバイダー (IdP) を使用しており、MFA プロバイダーがこのフェデレーション ID プロバイダーと直接統合されている場合、[フェデレーション ID プロバイダーは MFA クレームを送信する必要があります](https://learn.microsoft.com/ja-jp/entra/identity/authentication/howto-mfaserver-adfs-windows-server#secure-microsoft-entra-resources-using-ad-fs)。

## テナント内で影響を受ける Azure ユーザーの特定

以下のリソースを使用して、Azure に MFA を使用してサインインしているユーザーと MFA を使用せずにサインインしているユーザーを特定できます:

1. こちらの PowerShell コマンドを使用して、ユーザーとその認証方法のリストをエクスポートします: <https://aka.ms/AzMFA>
2. こちらの多要素認証ギャップ ブックを使用します: [多要素認証ギャップ ブック - Microsoft Entra ID | Microsoft Learn](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/workbook-mfa-gaps)
3. クエリでこれらのアプリケーション ID を使用します:
   1. Azure portal: c44b4083-3bb0-49c1-b47d-974e53cbdf3c
   2. Azure CLI: 04b07795-8ddb-461a-bbee-02f9e1bf7b46
   3. Azure PowerShell: 1950a258-227b-4e31-a9cf-717495945fc2

## 緊急用アカウントと特別なシナリオ

弊社では break glass (緊急事態) や「緊急アクセス」アカウントに関するご質問を伺いました。これらのアカウントは、長いパスワードだけに頼るのではなく、[FIDO2](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-authentication-passwordless) または [証明書ベースの認証](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-certificate-based-authentication) ([MFA として設定されている場合](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-certificate-based-authentication#step-3-configure-authentication-binding-policy)) を使用するように更新することをお勧めします。どちらの方法も MFA の要件を満たします。

さらに、以下のシナリオについては、現在もガイダンスの作成に取り組んでおり、8 月中旬に予定されている次回のブログ記事で取り上げる予定です:

- 権限委譲管理による特権アクセス管理、または複数人が共有するアカウントに対する追加セキュリティを備えたその他のセキュリティ アプローチを使用している組織。
- 短期間で作成・削除されるユーザー ID を利用した、Azure の実践的な学習とラボ。
- Entra ユーザー ID を必要とする Azure API や、アプリケーションのアクセス許可に対応していない API の活用。

## 準備のためにできること

クラウド リソースを保護するために、今すぐ MFA を設定することをお勧めします。[Microsoft Entra の MFA ウィザード](https://aka.ms/EntraIDMFAWizard) を使用して MFA を設定し、[MFA 導入ガイド](https://learn.microsoft.com/ja-jp/entra/identity/authentication/howto-mfa-getstarted) を参照してユーザーとデータの安全を確保してください。 自動化のためにユーザー ID を使用している場合は、[マネージド ID またはサービス プリンシパル](https://learn.microsoft.com/ja-jp/azure/devops/integrate/get-started/authentication/service-principal-managed-identity?view=azure-devops) への移行プロセスを開始してください。

Azure ポータルおよび Azure CLI 等のサインイン時に MFA が義務付けられることに関するブログ記事、投稿、およびお客様への直接の通知については引き続き公開し、クラウド リソースの効果的な準備と安全性の確保を支援します。

Naj Shahid / Greg Kinasewitz
