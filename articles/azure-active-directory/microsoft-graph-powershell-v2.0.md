# Microsoft Graph PowerShell v2.0 でサポートされた認証方法と変更点

こんにちは。Azure Identity チームの沓澤です。    
多くのお客様にお使いいただいている Microsoft Graph PowerShell モジュールの v2.0 が 2023/7/5 にリリースされました！    
モジュールの再インストールやアップデートを実施した際に Microsoft Graph PowerShell v2.0 がインストールされるようになります。

Microsoft Entra ID 関連の変更点としては、サポートされる認証方法が増えます。    
一方で、Microsoft Entra ID を含め全てのサービスに関連いたしますが、今回のアップデートでは破壊的変更があります。

本記事では Microsoft Graph PowerShell v2.0 のインストール方法の説明した後、サポートされるようになった認証方法と破壊的変更の内容について説明します。

## Microsoft Graph PowerShell v2.0 のインストール

Microsoft Graph PowerShell は Microsoft Graph Rest API (v1.0/Beta) を呼び出すためのモジュールです。    
Microsoft Graph PowerShell v1.x では 1 つのモジュール (Microsoft Graph PowerShell) で Microsoft Graph Rest API v1.0 と Microsoft Graph Rest API Beta の両方を呼び出します。    
一方、Microsoft Graph PowerShell v2.0 では Microsoft Graph PowerShell モジュールは Microsoft Graph Rest API v1.0 の呼び出しに使用され、Microsoft Graph Rest API Beta の呼び出しには Microsoft Graph PowerShell Beta モジュールが必要です。

そのため、Microsoft Graph Rest API Beta の呼び出しを計画している場合には Microsoft Graph PowerShell Beta のインストールが必要です。    
Microsoft Graph PowerShell モジュールおよび Microsoft Graph PowerShell Beta モジュールのインストール方法を説明します。

公開情報では既に v2.0 を前提とした説明に更新されていますので詳細は以下をご確認ください:    
[Install the Microsoft Graph PowerShell SDK](https://learn.microsoft.com/en-us/powershell/microsoftgraph/installation?view=graph-powershell-1.0#installation)

### Microsoft Graph PowerShell モジュールのインストール
Microsoft Graph PowerShell を始めて使用する場合は以下コマンドでインストールください:    
`Install-Module Microsoft.Graph`    
既に Microsoft Graph PowerShell v1.x を使用中の場合は以下コマンドでアップデートできます:    
`Update-Module Microsoft.Graph`

### Microsoft Graph PowerShell Beta モジュールのインストール
Microsoft Graph PowerShell モジュールと別々にインストールできます。    
言い換えますと Microsoft Graph PowerShell と Microsoft Graph PowerShell Beta は共存できます。

インストールするには以下コマンドを実行します:    
`Install-Module Microsoft.Graph.Beta` 


## v2.0 からサポートされる認証方法

以下 2 つの認証方法がサポートされるようになりました:    
- マネージド ID
- クライアント シークレット

### マネージド ID

### クライアント シークレット


## 破壊的変更
Microsoft Graph PowerShell を使用し Microsoft Entra ID 関連のデータ操作をする際に関連するものを数点ピックアップします。

### Select-MgProfile コマンドの廃止

### Microsoft Graph Rest API Beta を呼び出す際のコマンドの命名規則が <Verb>-Mg**Beta**<Noun> に

### Connect-MgGraph コマンドにおける -ForceRefresh オプションの廃止

### Connect-MgGraph コマンドにおける -AccessToken オプションでは SecureString 型の引数が必要に

詳細については GitHub の [v2.0 へのアップグレード ガイド](https://github.com/microsoftgraph/msgraph-sdk-powershell/blob/dev/docs/upgrade-to-v2.md) をご確認ください