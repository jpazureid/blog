---
title: Azure コマンド ライン ツールにおける Azure AD Graph から Microsoft Graph への移行について
date: 2021-10-21 3:00
tags:
  - Azure AD
---

# Azure コマンド ライン ツールにおける Azure AD Graph から Microsoft Graph への移行について

こんにちは、Azure Identity サポート チームの栗井です。

本記事は、2021 年 10 月 12 日に米国の Azure Tools Blog で公開された [Azure AD to Microsoft Graph migration for Azure command line tools.](https://techcommunity.microsoft.com/t5/azure-tools/azure-ad-to-microsoft-graph-migration-for-azure-command-line/ba-p/2836666)
 を意訳したものになります。

---

先日アナウンスされた [Azure AD Graph の廃止](https://azure.microsoft.com/en-us/updates/update-your-apps-to-use-microsoft-graph-before-30-june-2022/) に伴い、現在 Azure AD Graph を利用しているすべてのアプリケーションは、Microsoft Graph (Azure AD Graph の既存の機能と新しい機能を含みます) への切り替え対応が必要となります。この変更は各種 Azure コマンド ライン ツール (Azure CLI、Azure PowerShell、Terraform) にも当てはまります。現在弊社では、各種ツールが Microsoft Graph を利用するように切り替えの作業を進行中であり、皆様がお手持ちのコードを更新できるようなるべく早く公開するよう取り組んでいます。

> [!NOTE]
> 本記事内に登場する "Azure PowerShell" は、類似呼称の "Azure AD PowerShell" とは異なる、Azure リソース管理用の PowerShell モジュールです。
> 
> - [Azure PowerShell 公開情報](https://docs.microsoft.com/ja-jp/powershell/azure/)
> - [Azure AD PowerShell 関連記事](https://jpazureid.github.io/blog/azure-active-directory/powershell-module/)

## 既存のスクリプトへの影響

原則として**既存のスクリプトへの影響を最小限とする**ことを目標としています。そのため、アップグレードを実施しても可能な限り同じコマンド実行結果となるようにして、利用者の追加作業が必要無いように進めています。

しかし、一部のコマンドについては Microsoft Graph API と Azure AD Graph API の動作の違いによって、変更の発生が想定されます。例えば、Microsoft Graph API を利用した場合、従来とは異なり、[Azure AD にアプリケーションを登録](https://docs.microsoft.com/en-us/graph/api/application-post-applications?view=graph-rest-1.0&tabs=http) した際にクライアント シークレットは同時に自動作成されない動作となります。シークレット値を利用する場合は、アプリケーションの登録完了後、別途作成することが必要になります。上記例のような互換性への影響が懸念される変更点の一覧とお客様側で必要な対応については、ツールのプレビュー版と併せて情報を公開予定です。 

## Azure コマンド ライン ツールと Microsoft Graph のコマンドラインツールの比較

Azure AD に対する操作には Azure AD PowerShell や Microsoft Graph SDK PowrShell が用意されています。このため、Azure コマンド ライン ツールでの Azure AD 関連機能は、スクリプト開発者の利便性のためよく利用される一部の機能のみが提供されており、機能は限定的となっています。

今後の Azure コマンド ツールでも、Azure AD リソースに対する機能については、部分的に継続してサポートしてまいりますが、認証など基本的な部分については新しい Graph の機能を実装する予定もございます。そこで提供されない機能は、Microsoft Graph ツール (Microsoft Graph SDK PowerShell モジュール、もしくは Microsoft Graph CLI) をご利用ください。 

## 今後のタイムライン

### 2021 年 10 月

- MSAL を使用した Azure CLI のパブリック プレビュー (※ MS Graph への移行にあたって必要なため)。
- Microsoft Graph API を使用した Azure PowerShell のパブリック プレビュー

※ 各ツールのドキュメントが公開された際には、プレビューをインストールしてテストする方法についてのガイダンスが記載される予定です。

### 2021 年 12 月

- Microsoft Graph API を使用した Azure PowerShell の一般提供 (GA) 開始
- 古いコマンドを使用した Azure サービスの関連ドキュメントおよびスクリプトの更新対応

### 2022 年 1 月

- Microsoft Graph API を使用した Azure CLI のプレビュー

### 2022 年 Q1 (1 月 - 3 月) 中

- Microsoft Graph API を使用した Azure CLI の 一般提供 (GA) 開始

Terraform については、HashiCorp 社が Azure AD プロバイダ v2 で Microsoft Graph への移行をすでに完了しています。詳細については [AzureAD v2.0 and Microsoft Graph (terraform.io) ※外部リンク](https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/guides/microsoft-graph) をご覧ください。ご質問がある場合は、Azure CLI ([@azurecli](https://twitter.com/azurecli)) もしくは Azure PowerShell ([@azureposh](https://twitter.com/azureposh)) までご連絡ください。

## 参考情報など

Azure 各種製品の公式ドキュメントが更新されるまで、Microsoft Graph への移行に関する追加ガイダンスとして、以下のリソースをご参照いただけますと幸いです。

MSAL への移行に関する追加情報と Microsoft Graph への移行における重要性:

- [Update your applications to use Microsoft Authentication Library and Microsoft Graph API (英語記事)](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363)
- [Have you updated your applications to use the Microsoft Authentication Library and Microsoft Graph? (英語記事)](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/have-you-updated-your-applications-to-use-the-microsoft/ba-p/1144698)
- [MSAL への移行に関する概要](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/msal-migration)
- [アプリの移行計画チェックリスト (機械翻訳)](https://docs.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-planning-checklist?view=graph-rest-1.0)

Terraform における本変更への対応についての詳細情報 (※外部リンク):

- [Terraform AzureAD provider v2 is now using Microsoft Graph](https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/guides/microsoft-graph)

問題を発見した際には、各製品の Github リポジトリにて Issue をオープンいただけますと幸いです。

- Azure CLI: https://github.com/Azure/azure-cli/issues
- Azure PowerShell: https://github.com/Azure/azure-powershell/issues
- Terraform: https://github.com/hashicorp/terraform-provider-azuread/issues 

不明点がありましたら、サポート チームまでお知らせいただければ幸いです。

Damien  
on behalf of the Azure CLIs tools team
