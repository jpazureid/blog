---
title: Microsoft Entra PowerShell の紹介
date: 2024-07-31 10:00
tags:
    - US Identity Blog
    - PowerShell
---

# Microsoft Entra PowerShell の紹介

こんにちは！ Azure ID チームの小出です。

今回は、2024 年 6 月 27 日に米国の Microsoft Entra (Azure AD) Blog で公開された [Introducing the Microsoft Entra PowerShell module](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/introducing-the-microsoft-entra-powershell-module/ba-p/4173546) を分かりやすく日本語におまとめしなおしたものになります。ご不明点などございましたらお気軽にサポートへお問い合わせをいただけますと幸いです。

---

## はじめに

Microsoft Entra PowerShell モジュールのパブリック プレビューが開始されました。このモジュールは、Microsoft Entra 製品の合理的な管理と自動化のために設計された、高品質でシナリオに特化した新しい PowerShell モジュールです。
 
2021 年、今後の PowerShell への投資はすべて Microsoft Graph PowerShell SDK で行うと発表しました。これにより、MSOL や AzureAD モジュールといった以前の古いモジュールは非推奨となり、以前日本語のブログでもシリーズとしてご案内いたしました [MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement1/) でも、 Microsoft Graph PowerShell SDK への移行について案内いたしました。

今回パブリック プレビューが開始された新しい Microsoft Entra PowerShell は、Microsoft Entra を利用したお客様のエクスペリエンスを向上させ、自動化を強化するモジュールとなっています。

## Microsoft Entra PowerShell とは？
 
Microsoft Entra PowerShell モジュールは、管理者が Microsoft Entra をプログラムで管理し、自動化するためのコマンド ライン ツールです。ユーザー、グループ、アプリケーション、サービス プリンシパル、ポリシーなど Entra ID に関するリソースを効率的に管理するコマンドが含まれています。このモジュールは、Microsoft Graph PowerShell SDK をベースにしており、Microsoft Graph PowerShell SDK のすべてのコマンドレットと完全に相互運用が可能です。シンプルで、ドキュメントもよくまとめられていますので、これらのコマンドで複雑な操作を実行できます。具体的なコマンドの使用例などを下記にてご紹介しておりますので併せてご確認ください。

## サポートされる PowerShell のバージョン

Microsoft Entra PowerShell は、PowerShell バージョン 5.1 とバージョン 7 以降をサポートしています。Microsoft Entra PowerShell モジュールでは、Windows、Linux、macOS を含むすべてのプラットフォームで PowerShell バージョン 7 以上を使用することをお勧めします。

## Microsoft Entra PowerShell の利点

Microsoft Entra PowerShell には、下記 4 つの利点があります。

### 1. ユーザビリティと品質の重視

Microsoft Entra PowerShell は、人間からも読みやすいパラメーター、わかりやすくまとめられたパラメーターのグループ、インライン ドキュメント、パイプラインなど PowerShell の基本となる機能を提供します。

### 2. AzureAD モジュールとの下位互換性

Microsoft Entra PowerShell は、以前利用されていた AzureAD モジュールと下位互換性があります。このため、最近発表された AzureAD モジュールの非推奨（[Important update: Deprecation of Azure AD PowerShell and MSOnline PowerShell modules](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/important-update-deprecation-of-azure-ad-powershell-and-msonline/ba-p/4094536)）に伴う移行作業も効率よく行えます。

### 3. 柔軟できめ細かな権限付与

Microsoft Graph PowerShell SDK と同様に、Microsoft Entra PowerShell では、アプリケーションに付与したい権限に対して「管理者の同意」を利用します。また、アプリケーションの権限割り当てを可能な限り細かく制御できるよう、独自のアプリケーション ID の指定もサポートしています。認証においては、証明書、サービス プリンシパル、マネージド ID も利用可能です。

### 4. オープン ソース

Microsoft Entra PowerShell モジュールはオープン ソースです。コミュニティからの貢献によって優れた PowerShell エクスペリエンスを作成し、皆と共有することができます。オープンソースは、コラボレーションを促進し、革新的なビジネス ソリューションの開発を促進します。Microsoft のカスタマイズをもとに、ニーズに合わせて変更することができます。

## インストール

以下のコマンドを実行して、PowerShell ギャラリーから Microsoft Entra PowerShell をインストールします。Graph API や Microsoft Graph PowerShell SDK と同様に、v1.0 と beta があるので、どちらのモジュールをインストールするか決定のうえ、下記いずれかのコマンドを実行ください。

```PowerShell
# V1.0 をインストールしたい場合:
Install-Module Microsoft.Graph.Entra -AllowPrerelease -Repository PSGallery -Force
```

```PowerShell
# Beta をインストールしたい場合:
Install-Module Microsoft.Graph.Entra.Beta -AllowPrerelease -Repository PSGallery -Force
```

## 認証（サインイン）

Connect-Entra コマンドを使用して、委任されたアクセス (対話型) またはアプリケーションのみのアクセス (非対話型) で Microsoft Entra ID にサインインします。

```PowerShell
Connect-Entra -TenantId 'your-tenant-id' -Scopes 'User.Read.All'
```

独自の登録アプリケーション、サービス プリンシパル、マネージド ID、およびその他の認証方法を使用する詳細な例については、[Connect-Entra コマンドのドキュメント](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.graph.entra/connect-entra?view=entra-powershell) 内の例文を参照ください。

## 利用可能なコマンドの検索

コマンドを使用すると、Microsoft Entra PowerShell モジュールで使用可能なすべてのコマンドを一覧表示できます。

```PowerShell
Get-Command -Module Microsoft.Graph.Entra
```

## ヘルプの取得

Get-Help コマンドは、構文、パラメータ、コマンドレットの説明、使用例など、特定のコマンドに関する詳細情報を表示します。たとえば、Get-EntraUser コマンドの詳細を知るには、次のコマンドを実行します:

```PowerShell
Get-Help Get-EntraUser -Full
```

## 基本的なコマンド

下記のように、基本的なコマンドの表記の違いとして、 Microsoft Graph PowerShell SDK には Mg がつきますが、 Microsoft Entra Powershell には Entra の文字がつく特徴があります。

| Microsoft Graph PowerShell SDK | Microsoft Entra PowerShell |
|---|---|
| Get-MgUser | Get-EntraUser | 
| Get-MgGroup | Get-EntraGroup | 
| Get-MgGroupMember | Get-EntraGroupMember | 

## AzureAD PowerShell モジュールからの移行

Enable-EntraAzureADAlias コマンドを使用すると、Microsoft Entra PowerShell を使用して、既存の AzureAD PowerShell スクリプトを最小限の変更で実行できます。たとえば、次の例では、Get-AzureADUser コマンドを利用したスクリプトを実行しています。以前は Get-AzureADUser に対応する Microsoft Graph PowerShell SDK (この場合 Get-MgUser) コマンドを探し、そのコマンドに合うようにコマンドのパラメーターなどを変更するなどスクリプトに大きな改変が必要でした。今回のモジュールでは、Enable-EntraAzureADAlias を先に実行することで、以前のコマンドをそのままに、新しいモジュールで実行できるようになっています。

```PowerShell
Import-Module -Name Microsoft.Graph.Entra
Connect-Entra #Replaces Connect-AzureAD for auth
Enable-EntraAzureADAlias #enable aliasing 
Get-AzureADUser -Top 1
```

## よくある質問 (FAQ)

### Q. Microsoft Graph PowerShell SDK と Microsoft Entra PowerShell モジュールの違いは何ですか?

A. Microsoft Entra PowerShell は、Microsoft Graph PowerShell SDK への投資拡大の一環で作成された新しいモジュールです。Microsoft Graph PowerShell SDK と比較すると、上述のとおりパイプラインが利用できるようになったり、以前の AzureAD 関連のコマンド群からの移行が容易になったなど、より Entra ID のリソースを効率よく管理できるようになりました。

加えて、認可、接続管理、エラー処理、API カバレッジなど、Microsoft Graph PowerShell SDK の利点はすべて維持されているため、Microsoft Graph PowerShell SDK から必ず移行しなければならないわけではありません。Microsoft Entra PowerShell は Microsoft Graph PowerShell SDK をベースにしているため、どちらのモジュールを利用することもできます。

### Q. Microsoft Entra PowerShell モジュールは Microsoft Graph PowerShell と互換性がありますか？

A. はい、互換性があり、どちらのモジュールも連携して動作します。すでに Microsoft Graph PowerShell モジュールを使用している場合は、必ずしも切り替える必要はありません。Entra リソースに Microsoft Entra PowerShell モジュール コマンドレットを使用するか、Microsoft Graph PowerShell SDK コマンドレットを使用するかは、お客様の好みでお選びいただけます。お客様の利用されたいコマンドに応じてモジュールを選択ください。

### Q. 非推奨の AzureAD または MSOnline モジュールから移行する必要があります。Microsoft Entra PowerShell を待つべきですか？

A. いいえ、Microsoft Entra PowerShell を待たず、できるだけ早く移行を開始ください。レガシーの AzureAD および MSOnline PowerShell モジュールは非推奨であり、3 月 30 日以降に引退 (動作停止) する予定です。Microsoft Entra PowerShell の目標の 1 つは、Enable-EntraAzureADAlias を設定することで、Azure AD PowerShell からの移行をより迅速に行うことです。Microsoft Entra PowerShell は、AzureAD PowerShell を使用していたスクリプトの簡易移行をサポートしており、98% 以上の互換性があります。

まだ以前の AzureAD モジュールを利用しているお客様においては、Microsoft Entra PowerShell モジュールを利用する方が移行が容易になりますので、 Microsfot Entra PowerShell をご利用いただくことも検討いただけます。ただし、Microsoft Entra PowerShell はまだプレビュー段階のため、予告なくコマンドの動作が変更される場合がある点、本番環境での利用は推奨されない点などはあらかじめご理解ください。本モジュールをプレビューで利用されることに懸念がある場合や本番および運用環境での利用については、 Microsoft Entra PowerShell の更新を待つのではなく、すでに一般公開されている Microsoft Graph PowerShell SDK への移行を今すぐ実施することをお勧めいたします。どちらのモジュールも、最新の Microsoft Graph API を使用しているため、Microsoft Entra PowerShell の一般公開を待つ必要はありません。

まとめると下記の通りになります。

**検証環境やテスト環境の場合**: 現在プレビューが開始された Microsoft Entra PowerShell に移行できます。

**運用環境の場合**: スクリプトを Microsoft Graph PowerShell SDK に移行するか、一般提供開始後に Microsoft Entra PowerShell モジュールに移行することをお勧めします。ただし、一般公開日時は現状未定であるため、早めに Microsoft Graph PowerShell SDK への移行を開始することをお勧めします (Microsoft Entra PowerShell は Microsoft Graph PowerShell SDK を強化するものであり、Microsoft Graph PowerShell SDK を置き換えるものではないため、Microsoft Graph PowerShell SDK のスクリプトに更新した後、再度 Microsoft Entra PowerShell に更新する必要はありません)。

### Q. Microsoft Graph PowerShell スクリプトを Microsoft Entra PowerShell に更新する必要がありますか？

 A. いいえ、必ずしも更新する必要はありません。Microsoft Entra PowerShell は Microsoft Graph PowerShell ソリューションの一部であり、2 つのモジュールは相互運用可能です。両方のモジュールを並行してインストールすることができます。お客様環境の要望および各コマンドの動作を確認のうえ、より利用しやすいモジュールのコマンドを利用ください。

### Q. Microsoft Entra PowerShell は将来もっと多くのリソースをサポートするようになりますか？

 A. はい。より多くのリソースとシナリオのサポートについて、今後時間をかけて拡大していきます。特権 ID 管理 (PIM)、エンタイトルメント管理、テナント構成設定、ユーザごとの多要素認証(MFA)などの新しいコマンドレットが今後追加されていく予定です。また、既存のコマンドレットについても、パラメーターの追加、詳細なヘルプ、直感的な名前の追加などの機能強化を行います。継続的な更新については GitHub リポジトリをチェックください。

### Q. Microsoft Entra PowerShell は AzureAD や MSOnline モジュールのように、事前に許可されたアプリを使用しますか？

A. いいえ。Microsoft Entra PowerShell の権限は事前に許可されておらず、ユーザーは必要なアプリケーションの権限をリクエストする必要があります。このきめ細かさにより、アプリケーションは必要な権限のみを持つことができ、リソース管理のきめ細かな制御が可能になります。アプリケーションの権限の柔軟性ときめ細かさを最大化するには、Entra PowerShell で独自のアプリケーション ID を使用することをお勧めします。テナント内で PowerShell の用途ごとに異なるアプリケーションを作成することで、特定のシナリオで付与されるアプリケーション権限を厳密に制御できます。Microsoft Entra PowerShell で独自のアプリケーション ID を使用するには、Connect-Entra コマンドレットを使用します:

```PowerShell
Connect-Entra -ClientId 'YOUR_APP_ID' -TenantId 'YOUR_TENANT_ID'
```

### Q. Microsoft Entra PowerShell は初めてですが何から始めればいいですか？

A. まずは Microsoft Entra PowerShell モジュールのインストール方法、認証方法、特定のシナリオに使用するコマンドレットの確認方法、ハウツー ガイドなど、[公開されているドキュメント](https://learn.microsoft.com/ja-jp/powershell/entra-powershell/?view=entra-powershell) を参照ください。インストールやサインインのコマンドは、上記でもご案内しているので、まずは PowerShell ギャラリーからインストールを実施ください。

### Q. フィードバックはどのように提供したらいいですか？ 

A. フィードバックを提供するには、GitHub リポジトリの issues セクションにアクセスください。フィードバック、提案、遭遇した問題などを新しい課題として作成ください。

### Q. このモジュールをより発展させていくにあたりユーザーはどのような貢献ができますか？

A. バグ レポートの提出、新機能の提案、シナリオやサンプルの改善など、コミュニティからの貢献を歓迎します。まずは GitHub リポジトリにアクセスし、コントリビューション ガイドラインをご確認の上、変更を加えたプル リクエストを作成ください。

## 参考情報

- [microsoftgraph/entra-powershell: Microsoft Entra PowerShell (github.com)](https://github.com/microsoftgraph/entra-powershell)
- [Microsoft Entra PowerShell documentation - Microsoft Entra PowerShell | Microsoft Learn](https://learn.microsoft.com/ja-jp/powershell/entra-powershell/?view=entra-powershell)
