---
title: Azure コマンドラインツールにおける、Azure AD Graph から Microsoft Graph への移行について
date: 2020-10-20
tags:
  - Azure AD
---

# Azure コマンドラインツールにおける、Azure AD Graph から Microsoft Graph への移行について

こんにちは、Azure Identity サポート チームの栗井です。

本記事は、2021 年 10 月 12 日に米国の Azure Tools Blog で公開された [Azure AD to Microsoft Graph migration for Azure command line tools.](https://techcommunity.microsoft.com/t5/azure-tools/azure-ad-to-microsoft-graph-migration-for-azure-command-line/ba-p/2836666)
 を意訳したものになります。

---

先日アナウンスされた Azure AD Graph の廃止に伴い、現在 Azure AD Graph を利用しているすべてのアプリケーションは、Microsoft Graph (Azure AD Graph の既存の機能と、新しい機能を含みます) への切り替え対応が必要となります。

この変更は各種 Azure コマンドライン ツール（Azure CLI、Azure PowerShell、Terraform）にも適用されます。

現在弊社では、各種ツールが Microsoft Graph を利用するように、切り替えの作業を進行中です。

> [!NOTE]
> 本記事内に登場する "Azure PowerShell" は、類似呼称の "Azure AD PowerShell" とは異なる PowerShell モジュールです。
> 
> - [Azure PowerShell 公開情報](https://docs.microsoft.com/ja-jp/powershell/azure/)
> - [Azure AD PowerShell 関連記事](https://jpazureid.github.io/blog/azure-active-directory/powershell-module/)



## 既存のスクリプトへの影響

原則として既存のスクリプトへの影響を最小限とすることを目標としています。そのため、可能な限りアップグレードを実施しても同じコマンドとなるようにして利用者の追加作業が必要無いように進めます。

しかし一部のコマンドについては、Microsoft Graph API とAzure AD Graph API の動作の違いによって、一部のコマンドについては、Microsoft Graph API とAzure AD Graph API の動作の違いによって、変更の発生が想定されます。 


> 例 : Graph API を利用した場合、従来とは異なり、Azure AD にアプリケーションを登録する際、クライアント シークレットは同時に自動作成されない動作となります。シークレット値を利用する場合、アプリケーションの登録完了後、別途作成することが必要になります。 

上記例のような、互換性への影響が懸念される変更点の一覧と、お客様側で必要な対応については、各種ツールのプレビュー版と併せて公開予定です。 

 

## Azure コマンドラインツールと Microsoft Graph のコマンドラインツールの比較

Azure AD に対するコマンドは別途 Azure AD PowerShell や Graph SDK PowrShell が用意されており、Azure コマンドライン ツールでの Azure AD 関連機能は、利用者の利便性のために、よく利用される一部の機能のみを提供しています。

今後の Azure コマンド ツールでも、Azure AD リソースに対する機能については、部分的なサポートとなり、そこで提供されない機能は、Microsoft Graph ツール（Microsoft Graph SDK PowerShell モジュール、もしくは Microsoft Graph CLI）をご利用ください。 


## 今後のタイムライン

### 2021年10月

- MSAL を使用した Azure CLI のパブリック プレビュー (※ MS Graphへの移行にあたって必要です)。
- Microsoft Graph API を使用した Azure PowerShell のパブリックプレビュー

※ 各ツールのドキュメントには、プレビューをインストールしてテストする方法についてのガイダンスが記載される予定です。

### 2021年12月

- Microsoft Graph API を使用した Azure PowerShell の一般提供 (GA) 開始
- Azure サービスの関連ドキュメント、古いコマンドを使用したスクリプトの更新対応

### 2022年1月

- Microsoft Graph API を使用した Azure CLI のプレビュー

### 2022 年 Q1 (1 月 - 3 月) 中

- Microsoft Graph API を使用したAzure CLI の 一般提供 (GA) 開始


Terraformについては、HashiCorp 社が Azure AD プロバイダ v2 で Microsoft Graph への移行をすでに完了しています。
- [AzureAD v2.0 and Microsoft Graph (terraform.io) ※外部リンク](https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/guides/microsoft-graph)


## 参考情報など

Azure 各種製品のの公式ドキュメントが更新されるまで、Microsoft Graph への移行に関する追加ガイダンスとして、以下のリソースをご参照いただけますと幸いです。

### MSAL への移行に関する追加情報と、Microsoft Graph への移行における重要性について

- [Update your applications to use Microsoft Authentication Library and Microsoft Graph API (英語記事)](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363)
- [Have you updated your applications to use the Microsoft Authentication Library and Microsoft Graph? (英語記事)](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/have-you-updated-your-applications-to-use-the-microsoft/ba-p/1144698)
- [MSAL への移行に関する概要](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/msal-migration)
- [アプリの移行計画チェックリスト (機械翻訳)](https://docs.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-planning-checklist?view=graph-rest-1.0)


Terraform における本変更への対応についての詳細情報 (※外部リンク)
- [Terraform AzureAD provider v2 is now using Microsoft Graph](https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/guides/microsoft-graph)


問題を発見した際には、各製品の Github リポジトリにて Issue をオープンいただけますと幸いです。

- Azure CLI: https://github.com/Azure/azure-cli/issues
- Azure PowerShell: https://github.com/Azure/azure-powershell/issues
- Terraform: https://github.com/hashicorp/terraform-provider-azuread/issues 

---

以上の内容がご参考になりましたら幸いです。ご不明点等ございましたらサポート チームまでお問い合わせください。
