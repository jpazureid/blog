---
title: "Microsoft Entra PowerShell モジュールが一般提供 (GA) されました"
date: 2025-02-13 09:00
tags:
    - Microsoft Entra
    - US Identity Blog
---
# Microsoft Entra PowerShell モジュールが一般提供 (GA) されました

こんにちは、Azure Identity サポート チームの 五十嵐 です。

本記事は、2025 年 1 月 30 日に米国の Microsoft Entra (Azure AD) Blog で公開された [Microsoft Entra PowerShell module now generally available](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/microsoft-entra-powershell-module-now-generally-available/4365718) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

## シナリオに特化した Microsoft Entra PowerShell モジュールを用いて Microsoft Entra のリソースをプログラム的に管理および自動化しましょう

Microsoft Entra PowerShell モジュールは、Microsoft Entra の管理と自動化を効率化するために設計された、シナリオに特化した新しい PowerShell モジュールです。2021 年に、弊社は将来の PowerShell への投資はすべて Microsoft Graph PowerShell SDK に対して行われると発表しました。今回の GA というマイルストーンは、この取り組みの大きな一歩を反映したものです。

Microsoft Entra のお客様から、PowerShell の使用感について多くのフィードバックをいただき、感謝しております。今後も Microsoft Entra PowerShell モジュールへの投資を続け、より多くのリソースとシナリオをカバーできるよう拡大していきます。

## Microsoft Entra PowerShell とは

Microsoft Entra PowerShell モジュールは、管理者や開発者が Microsoft Entra リソースをプログラムで管理し、自動化するためのコマンドライン ツールです。これにより、ユーザー、グループ、アプリケーション、サービス プリンシパル、ポリシーなどを効率的に管理できるようになります。このモジュールは Microsoft Graph PowerShell SDK をベースにしていますので、Microsoft Graph PowerShell SDK のすべてのコマンドレットと完全に相互運用可能であり、シンプルかつ十分にドキュメントも整備されたコマンドを用いて複雑な操作を実行できます。また、このモジュールは、[廃止される AzureAD PowerShell モジュール](https://jpazureid.github.io/blog/azure-active-directory/msonline-and-azuread-powershell-retirement/) からの移行をスムーズに行うための下位互換性オプションも提供しています。Microsoft Entra PowerShell は、Windows PowerShell 5.1 および PowerShell 7 以降で動作します。Windows、Linux、および macOS で最高のエクスペリエンスを得るには、PowerShell 7 以降の使用をお勧めします。

## Microsoft Entra PowerShell のメリット

- **使いやすさを重視**: Microsoft Entra PowerShell は、理解しやすいパラメーター、意図が伝わりやすいパラメーター セットの定義、インライン ドキュメント、パイプラインのような PowerShell の基本機能を提供します。
- **AzureAD PowerShell モジュールとの下位互換性**: Microsoft Entra PowerShell を用いると、[廃止される AzureAD PowerShell モジュール](https://jpazureid.github.io/blog/azure-active-directory/msonline-and-azuread-powershell-retirement/) からより移行しやすくなります。
- **柔軟できめ細かな権限付与**: Microsoft Graph PowerShell SDK と同様に、Microsoft Entra PowerShell は、アプリケーションに権限を付与する際に、管理者の同意を要求することが可能です。また、独自のサービス プリンシパルまたはユーザー割り当てマネージド ID を使用して Microsoft Entra PowerShell を実行することもできます。
- **オープン ソース**: Microsoft Entra PowerShell モジュールはオープン ソースであり、PowerShell を強化し、イノベーションを共有するためのコミュニティのコラボレーションを可能にします。Microsoft によるカスタマイズをお客様側で確認し、ニーズに合わせて利用することもできます。

## 使ってみる

**インストール**: 次のコマンドを実行して、[PowerShell Gallery](https://www.powershellgallery.com/packages/Microsoft.Entra/1.0.1) から "/v1.0" API バージョンを使用して Microsoft Graph リソースを管理する Microsoft Entra PowerShell をインストールします。

```PowerShell
Install-Module -Name Microsoft.Entra -Repository PSGallery -Scope CurrentUser -Force -AllowClobber
```

または、次のコマンドを実行して、"/beta" API バージョンを使用して Microsoft Graph リソースを管理する [Beta モジュール](https://www.powershellgallery.com/packages/Microsoft.Entra.Beta/1.0.1) をインストールします。

```PowerShell
Install-Module -Name Microsoft.Entra.Beta -Repository PSGallery -Scope CurrentUser -Force -AllowClobber
```

**認証**: Connect-Entra コマンドを使用して、委任されたアクセス (対話型) またはアプリケーションのみのアクセス (非対話型) で Microsoft Entra ID にサインインします。

```PowerShell
Connect-Entra -Scopes 'User.Read.All'
```

独自に登録したアプリケーション、マネージド ID、およびその他の認証方法を使用する例については、[認証シナリオのドキュメント](https://learn.microsoft.com/en-us/powershell/entra-powershell/authentication-scenarios?view=entra-powershell) を参照ください。

**利用可能なすべてのコマンドを検索**: 次のコマンドを使用して、Microsoft Entra PowerShell モジュールで使用可能なすべてのコマンドを一覧表示できます。

```PowerShell
Get-Command -Module Microsoft.Entra*
```

**ヘルプを取得**: 構文、パラメーター、説明、例など、特定のコマンドレットに関する詳細情報を表示するには、Get-Help コマンドを使用します。たとえば、Get-EntraUser コマンドレットについて確認するには、次のコマンドを実行します。

```PowerShell
Get-Help Get-EntraUser -Full
```

**AzureAD PowerShell モジュールからの移行**: Enable-EntraAzureADAlias コマンドを使用することで、Microsoft Entra PowerShell を使用して、最小限の変更で既存の AzureAD PowerShell モジュール スクリプトを実行できます。たとえば、次のようになります。

```PowerShell
Import-Module -Name Microsoft.Entra.Users
Connect-Entra #Replaces Connect-AzureAD for auth
Enable-EntraAzureADAlias #enable aliasing
Get-AzureADUser -Top 1
```

## 今すぐお試しください！

[新しいバージョン](https://www.powershellgallery.com/packages/Microsoft.Entra/1.0.1) をお試しいただき、[GitHub](https://github.com/microsoftgraph/entra-powershell/issues) でフィードバックをぜひ共有ください。皆様のニーズをより満たすためにモジュールの改善と強化を続けていく上で、皆様からのご意見が非常に貴重です。

## Microsoft Entra PowerShell モジュールの詳細を確認する

Microsoft Entra PowerShell モジュールのインストール方法、使用可能な認証方法、特定のシナリオに使用するコマンドレット、ハウツー ガイドなどについては、[公開情報](https://learn.microsoft.com/ja-jp/powershell/entra-powershell/?view=entra-powershell) を参照ください。

また、[よくある質問 (FAQ)](https://learn.microsoft.com/en-us/powershell/entra-powershell/entra-powershell-faqs?view=entra-powershell) も参照してください。

## ありがとうございます！

パブリック プレビュー中に [GitHub](https://github.com/microsoftgraph/entra-powershell/issues) で問題を報告し、このリリースの改善にご協力いただいたすべてのコミュニティ メンバーに感謝します。今後ともよろしくお願いいたします！

Steve Mutungi, Product Manager, Microsoft Entra PowerShell
