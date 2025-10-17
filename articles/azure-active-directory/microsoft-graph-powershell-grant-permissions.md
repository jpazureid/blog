---
title: Microsoft Graph PowerShell アクセス許可の付与
date: 2025-10-17 15:00
tags:
    - PowerShell
    - Microsoft Graph
---

# Microsoft Graph PowerShell アクセス許可の付与

こんにちは、 Azure Identity サポート チームの三輪です。

Microsoft Graph PowerShell を利用したオブジェクト管理について、グローバル管理者等の強いロール権限を持たないユーザーに PowerShell を使用させたい場面などもあるかと思います。多くの Microsoft Graph PowerShell コマンドの利用には、管理者によるアクセス許可への同意が必要となりますが、対象ユーザーが自身でアクセス許可に同意できない場合には、管理者（クラウド アプリケーション管理者、特権ロール管理者、グローバル管理者 等）の操作により予め特定のユーザーにアクセス許可を付与しておくことが可能です。具体的な操作例を以下にご紹介いたします。

<br>

## 操作手順例
1. PowerShell を開きます。
2. Connect-MgGraph -Scopes "DelegatedPermissionGrant.ReadWrite.All,Directory.ReadWrite.All" コマンドを実行します。
コマンドレットが PC 環境にない場合には、以下のコマンドレットを管理者権限にて実行し、Microsoft Graph PowerShell SDK をインストールします。   
Install-module Microsoft.Graph
3. サインイン画面が表示された際には、管理者（クラウド アプリケーション管理者、特権ロール管理者、グローバル管理者 等）のユーザー名とパスワードを入力してサインインします。   
※[組織の代理として同意する] が表示された場合、こちらはオフのままで問題ありません。
4. 下記のコマンドを実行します。

### 事前準備
```
#付与したいアクセス許可を指定
$scopes = "User.ReadWrite.All Group.ReadWrite.All"
 
#対象ユーザーを指定
$targetUserObjectId = "<アクセス許可を付与したいユーザーのオブジェクトID>"

## 同意を付与するアプリケーションの指定、以下では Microsoft Graph PowerShell を指定しています
$TargetServicePrincipalId = (Get-MgServicePrincipal -Filter "appId eq '14d82eec-204b-4c2f-b7e8-296a70dab67e'").Id

# Microsoft Graph API のリソース情報の取得
$GraphResourceId = (Get-MgServicePrincipal -Filter "appId eq '00000003-0000-0000-c000-000000000000'").Id
```

### 初めてアクセス許可を付与する場合
```
New-MgOauth2PermissionGrant -ClientId $TargetServicePrincipalId -ConsentType "Principal" -PrincipalId $targetUserObjectId -ResourceId $GraphResourceId -Scope $scopes
```

### 付与されているアクセス許可の確認
```
Get-MgOauth2PermissionGrant -filter "PrincipalId eq '$targetUserObjectId' and ResourceId eq '$GraphResourceId' and ClientId eq '$TargetServicePrincipalId'" |fl
```

### 既に Microsoft Graph PowerShell のアクセス許可が付与されている場合
2回目以降は New-MgOauth2PermissionGrant 使えませんので Update-MgOauth2PermissionGrant コマンドに代えて以下を利用します。   
こちらを実行すると、以前付与していたアクセス許可は引き継がれません。以前から付与されているアクセス許可を引継ぎ、新しいアクセス許可を追加して付与したい場合には、$scopes にて利用させたいアクセス許可すべてを指定する必要があります。
```
$OAuth2PermissionGrantId = (Get-MgOauth2PermissionGrant -filter "PrincipalId eq '$targetUserObjectId' and ResourceId eq '$GraphResourceId' and ClientId eq '$TargetServicePrincipalId'").Id
Update-MgOauth2PermissionGrant -OAuth2PermissionGrantId $OAuth2PermissionGrantId -Scope $scopes
```
<br>

## Graph Explorer のアクセス許可付与

尚、Graph Explorer のアクセス許可を管理したい場合には、Graph Explorer のアプリケーション識別子（ de8bc8b5-d9f9-48b1-a8ad-b748da725064 ）を TargetServicePrincipalId  のフィルター部分で指定します。   
ご参考までに、アプリケーション識別子は以下の公開情報に記載の通りです。   
[サインイン レポート中の Microsoft ファースト パーティー アプリケーションを検証する | Microsoft Learn](https://learn.microsoft.com/ja-jp/troubleshoot/entra/entra-id/governance/verify-first-party-apps-sign-in#application-ids-of-microsoft-tenant-owned-applications)


   
### Graph Explorer のアクセス許可を付与するコマンド例
```
Connect-MgGraph -Scopes "DelegatedPermissionGrant.ReadWrite.All,Directory.ReadWrite.All"

#付与したいアクセス許可を指定 (User.ReadWrite.All と Group.ReadWrite.All の 2 つを付与する例)
$scopes = "User.ReadWrite.All Group.ReadWrite.All"

#対象ユーザーを指定
$targetUserObjectId = "<アクセス許可を付与したいユーザーのオブジェクトID>"

#アプリの指定
$TargetServicePrincipalId = (Get-MgServicePrincipal -Filter "appId eq 'de8bc8b5-d9f9-48b1-a8ad-b748da725064'").Id
$GraphResourceId = (Get-MgServicePrincipal -Filter "appId eq '00000003-0000-0000-c000-000000000000'").Id
 
#初めてアクセス許可を付与する場合
New-MgOauth2PermissionGrant -ClientId $TargetServicePrincipalId -ConsentType "Principal" -PrincipalId $targetUserObjectId -ResourceId $GraphResourceId -Scope $scopes

#付与されているアクセス許可の確認
Get-MgOauth2PermissionGrant -filter "PrincipalId eq '$targetUserObjectId' and ResourceId eq '$GraphResourceId' and ClientId eq '$TargetServicePrincipalId'" |fl

#既に Graph Explorer のアクセス許可がユーザーに付与されている場合、2 回目以降は New-MgOauth2PermissionGrant の代わりに以下のコマンドをご利用ください。
#以前付与していたアクセス許可は引き継がれない点にもご注意ください。
$OAuth2PermissionGrantId = (Get-MgOauth2PermissionGrant -filter "PrincipalId eq '$targetUserObjectId' and ResourceId eq '$GraphResourceId' and ClientId eq '$TargetServicePrincipalId'").Id
Update-MgOauth2PermissionGrant -OAuth2PermissionGrantId $OAuth2PermissionGrantId -Scope $scopes
```
<br>
   
## 付与したアクセス許可の削除
特定のユーザーに対して付与したアクセス許可をすべて削除したい場合には、以下の形式で削除用のコマンドを実行します。
```
$OAuth2PermissionGrantId = (Get-MgOauth2PermissionGrant -filter "PrincipalId eq '$targetUserObjectId' and ResourceId eq '$GraphResourceId' and ClientId eq '$TargetServicePrincipalId'").Id
Remove-MgOauth2PermissionGrant -OAuth2PermissionGrantId $OAuth2PermissionGrantId
```

一部のアクセス許可を残したい場合には、残したいアクセス許可をすべて指定し、『既にアクセス許可が付与されている場合』の方のコマンドを実行します。   

<br><br>
   
ご紹介したコマンドの oAuth2PermissionGrant リソースにつきましては、必要に応じて以下公開情報もご参照ください。   
[oAuth2PermissionGrant リソースの種類 - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/api/resources/oauth2permissiongrant?view=graph-rest-1.0)

