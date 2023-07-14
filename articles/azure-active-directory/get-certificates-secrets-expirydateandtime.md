---
title: Azure AD に連携している各種証明書、クライアント シークレットの有効期限の抽出方法
date: 2023-07-14 9:00
tags:
  - Azure AD
  - Application
---

# Azure AD に連携している各種証明書、クライアント シークレットの有効期限の抽出方法

こんにちは。Azure Identity チームの栗井です。

Azure AD の \[アプリの登録\] から各アプリに連携している証明書・クライアント シークレット、ならびに \[エンタープライズ アプリケーション\] で SAML SSO を構成いただいている場合に登録している SAML 署名証明書は、いずれも有効期限があります。

Azure Portal の画面上では、有効期限を一覧で確認できないため、Microsoft Graph などの API を利用する必要がございます。

本記事では、下記公開情報内の Azure AD PowerShell を使用したサンプルをもとに、Microsoft Graph PowerShell を使用して各種証明書・シークレットの有効期限を CSV ファイルに出力する手順を紹介いたします。

- [アプリの登録用にシークレットと証明書をエクスポートする](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/scripts/powershell-export-all-app-registrations-secrets-and-certs)
- [エンタープライズ アプリのシークレットと証明書をエクスポートする](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/scripts/powershell-export-all-enterprise-apps-secrets-and-certs)

> [!NOTE]
> 2023/7/12 に上記の公開情報でも Microsoft Graph PowerShell を使用したサンプル スクリプトに書き換えられました。
> 公開情報内のサンプル スクリプトについてもサンプルの 1 つとしてご参照ください。

## 免責事項

> [!IMPORTANT]
> こちらで紹介するサンプル スクリプトについては、あくまでもサンプルの情報となります。
運用環境でそのまま利用されることは想定しておらず、ご利用の際には、十分な検証作業を実施をお願いします。
> 執筆時点以降のクラウド サービスの動作変更に伴い、大幅な改変が必要となることがあります。
> (本情報の執筆時点でテスト環境における検証作業は実施していますが、動作を保証するものではありません)

> [!NOTE]
> また、サンプルについてのサポート サービスの提供はしておりません。
> 恐れ入りますが、スクリプトを利用したことで生じる影響、スクリプトの改変や、スクリプトの動作に関するご質問については、 Azure 技術サポートにて受け付けることができない場合があります。
> サンプル スクリプトが動作しない場合などは、 Github Issue やプル リクエストでのレポートをお願いいたします。

## 事前準備: Microsoft Graph PowerShell SDK のインストール

PowerShell を使用する端末で、Microsoft Graph PowerShell SDK が未インストールの場合は、下記の手順を実施ください。

1. Windows 端末上で PowerShell を管理者権限で起動します。
1. 下記コマンドを実行します。

```powershell
Install-Module Microsoft.Graph
```

インストールの前提事項などの詳細情報は下記公開情報に記載がございますので、ご入用に応じて参照ください。

- [Install the Microsoft Graph PowerShell SDK](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/installation?view=graph-powershell-beta#installation)

## 操作の開始: Azure AD への認証

後述の手順を実施いただく前に、下記コマンドを実行のうえ、Azure AD テナントに接続ください。

```powershell
Connect-MgGraph -Scopes “Application.Read.All, User.Read.All”
```

テナント接続時のサインイン画面では、以下のいずれかのロールを持つ管理者ユーザーの資格情報で認証を実施ください。

- クラウド アプリケーション管理者
- アプリケーション管理者
- グローバル閲覧者
- グローバル管理者

認証に成功すると、下記メッセージが表示されます。

```
Welcome To Microsoft Graph!
```

テナントに接続後に後述のスクリプトを実行し、各種証明書・シークレットの有効期限を CSV ファイル出力することができます。

## \[アプリの登録\] から確認できるアプリケーションのクライアント シークレットおよび証明書の有効期限の一括出力

以下公開情報をもとに、\[アプリの登録\] から確認できるアプリケーションについての情報をエクスポートするサンプル スクリプトを案内いたします:
[アプリの登録用にシークレットと証明書をエクスポートする](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/scripts/powershell-export-all-app-registrations-secrets-and-certs)

処理順やエクスポートする項目については上記の公開情報となるべく同じにしております。

案内いたしますサンプルスクリプトでは以下の情報をエクスポートします:

- アプリケーションの表示名
- アプリケーション ID
- クライアント シークレットの有効期限の開始日時 (UTC)
- クライアント シークレットの有効期限の終了日時 (UTC)
- 所有者
- 所有者のオブジェクト ID

### サンプル スクリプト 1

\[アプリの登録\] の画面からはアプリケーション オブジェクトの確認ができます。  
アプリケーション オブジェクトについての説明は本ブログでは割愛いたしますが、詳細を確認されたい方は下記公開情報をご確認ください:  
[Azure Active Directory のアプリケーション オブジェクトとサービス プリンシパル オブジェクト](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/app-objects-and-service-principals)

Get-MgApplication コマンドを使用し、アプリケーション オブジェクトの一覧を取得します。    
その後、アプリケーション オブジェクト内のプロパティを読み取っています。    
アプリケーション オブジェクトのプロパティの一覧は下記公開情報にございます:  
[アプリケーション リソースの種類](https://learn.microsoft.com/ja-jp/graph/api/resources/application?view=graph-rest-1.0#properties)

サンプル スクリプト 1 を実行すると、"Add the Path you'd like us to export the CSV file to, in the format of <C:\Users\<USER>\Desktop\Users.csv>" と表示されますので、その後に、ファイルをエクスポートするパスを入力ください。

```powershell
$Applications = Get-MgApplication -ExpandProperty Owners -All
$Logs = @()

foreach ($app in $Applications)
{
  $AppName = $app.DisplayName
  $ApplID = $app.AppId
  $AppCreds = $app | Select-Object PasswordCredentials, KeyCredentials
  $secret = $AppCreds.PasswordCredentials
  $cert = $AppCreds.KeyCredentials

  $UserIDs = @()
  $Owners = @()
  foreach ($Owner in $app.Owners)
  {
    if ($Owner.AdditionalProperties["@odata.type"] -eq "#microsoft.graph.servicePrincipal")
    {
      $Owners += @{ID = $Owner.Id; Name = $Owner.AdditionalProperties["appDisplayName"]}
    }
    if ($Owner.AdditionalProperties["@odata.type"] -eq "#microsoft.graph.user")
    {
      $UserIDs += $Owner.Id
    }
  }
  $OwnerName = "<<No Owner>>"
  $OwnerID = "<<No Owner>>"
  if ($UserIDs.Count -ne 0)
  {
    $UserFilter = "id in ('$($UserIDs -join "','")')"
    # e.g) id in ('xxxx', 'yyyy')
    Get-MgUser -Filter $UserFilter | ForEach-Object {
      $Owners += @{
        ID = $_.Id;
        Name = $_.UserPrincipalName
      }
    }
    $OwnerName = $Owners.Name -join ";"
    $OwnerID = $Owners.ID -join ";"
  }

  ############################################
  $Log = New-Object System.Object

  $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
  $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
  $Log | Add-Member -MemberType NoteProperty -Name "Secret Start Date" -Value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Secret End Date" -value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $OwnerName
  $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

  $Logs += $Log


  ############################################
  foreach ($s in $secret)
  {
    $StartDate = $s.StartDateTime
    $EndDate = $s.EndDateTime

    $Log = New-Object System.Object

    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
    $Log | Add-Member -MemberType NoteProperty -Name "Secret Start Date" -Value $StartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Secret End Date" -value $EndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $OwnerName
    $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

    $Logs += $Log
  }

  foreach ($c in $cert)
  {
    $CStartDate = $c.StartDateTime
    $CEndDate = $c.EndDateTime

    $Log = New-Object System.Object

    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $CStartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $CEndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $OwnerName
    $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

    $Logs += $Log
  }
}

Write-host "Add the Path you'd like us to export the CSV file to" -ForegroundColor Green
Write-host "e.g <C:\Users\<USER>\Desktop\Users.csv>" -ForegroundColor Green
$Path = Read-Host
$Logs | Export-CSV $Path -NoTypeInformation -Encoding UTF8
```

## \[エンタープライズ アプリケーション\] から確認できる SAML アプリケーションのクライアント シークレットおよび証明書の有効期限の一括出力

以下公開情報をもとに、SAML 署名証明書の有効期限の一覧を出力するサンプルスクリプトを案内いたします:    
[エンタープライズ アプリのシークレットと証明書をエクスポートする](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/scripts/powershell-export-all-enterprise-apps-secrets-and-certs)

処理順やエクスポートする項目については上記の公開情報となるべく同じにしております。

案内いたしますサンプルスクリプトでは以下の情報をエクスポートします:

- アプリケーションの表示名
- アプリケーション ID
- アプリケーションの作成日時 (UTC)
- 証明書の有効期限の開始日時 (UTC)
- 証明書の有効期限の終了日時 (UTC)
- 所有者
- 所有者のオブジェクト ID

### サンプル スクリプト 2

\[エンタープライズ アプリケーション\] の画面からはサービス プリンシパル オブジェクトの確認ができます。

Get-MgServicePrincipal コマンドをフィルターを付けて使用し、サービス プリンシパル オブジェクトの一覧の中から SAML ベースの SSO を構成済みのサービスプリンシパルだけを取得します。    
サンプル スクリプト 2 内のコメントのとおり、2020 年初頭以降に作成されたアプリケーションでは PreferredSingleSignOnMode プロパティに値がセットされますが、それ以前に作成されたアプリケーションでは preferredSingleSignOnMode は null です。    
2020 年初頭以前に作成された SAML ベースの SSO を構成済みのアプリケーションの一覧については貴社にて管理をお願いいたします。

その後、サービス プリンシパル オブジェクト内のプロパティを読み取っています。  
サービス プリンシパル オブジェクトのプロパティの一覧は下記公開情報にございます:  
[servicePrincipal リソースの種類](https://learn.microsoft.com/ja-jp/graph/api/resources/serviceprincipal?view=graph-rest-1.0#properties)

サンプル スクリプト 2 を実行すると、"Add the Path you'd like us to export the CSV file to, in the format of <C:\Users\<USER>\Desktop\Users.csv>" と表示されますので、その後に、ファイルをエクスポートするパスを入力ください。

サンプル スクリプト 2 では、SAML ベースの SSO を構成されているアプリケーションを含め全てのアプリケーションを取得することもできます。    
その場合にはサンプル スクリプト上部の以下箇所のコメントアウトを外してください:    
`#$EnterpriseApps = Get-MgServicePrincipal -ExpandProperty Owners -All`

その後に以下箇所をコメントアウトしてください:    
`$EnterpriseApps = Get-MgServicePrincipal -ExpandProperty Owners -Filter "preferredSingleSignOnMode eq 'saml'"`

```powershell
# すべてのエンタープライズ アプリケーションを取得する場合は以下のコメントアウトを外してください。
#$EnterpriseApps = Get-MgServicePrincipal -ExpandProperty Owners -All

# SAML ベースのSSO を構成しているエンタープライズアプリケーションの一覧を取得
$EnterpriseApps = Get-MgServicePrincipal -ExpandProperty Owners -Filter "preferredSingleSignOnMode eq 'saml'"
#
# ※注意事項
# 2020 年初頭 (1 ～ 3 月) 以降に作成されたアプリのみ
# SAML を構成した際に preferredSingleSignOnMode に 値がセットされる動作になりました。
# そのため、2020 年初頭以前に作成されたアプリでは、
# 現在、SAML を構成していても preferredSingleSignOnMode が null となっております。
# 2020 年初頭以前に作成されたアプリの場合、
# PowerShell や Graph API などで SAML を構成していると判別できる値を取得することができず、
# SAML を構成しているアプリ一覧として取得することが難しい状況となります。
# 将来的には、古いアプリにおいても新しいアプリと同様に
# 正しい preferredSingleSignOnMode が取得できるようになることが計画されていることを確認しましたが、
# 対応時期などは未定です

$Logs = @()

foreach ($Eapp in $EnterpriseApps)
{
  $AppName = $Eapp.DisplayName
  $ApplID = $Eapp.AppId
  $CreatedDate = $Eapp.AdditionalProperties.createdDateTime

  $AppCreds = $Eapp | Select-Object PasswordCredentials, KeyCredentials

  $UserIDs = @()
  $Owners = @()
  foreach ($Owner in $Eapp.Owners)
  {
    if ($Owner.AdditionalProperties["@odata.type"] -eq "#microsoft.graph.servicePrincipal")
    {
      $Owners += @{ID = $Owner.Id; Name = $Owner.AdditionalProperties["appDisplayName"]}
    }
    if ($Owner.AdditionalProperties["@odata.type"] -eq "#microsoft.graph.user")
    {
      $UserIDs += $Owner.Id
    }
  }
  $OwnerName = "<<No Owner>>"
  $OwnerID = "<<No Owner>>"
  if ($UserIDs.Count -ne 0)
  {
    $UserFilter = "id in ('$($UserIDs -join "','")')"
    # e.g) id in ('xxxx', 'yyyy')
    Get-MgUser -Filter $UserFilter | ForEach-Object {
      $Owners += @{
        ID = $_.Id;
        Name = $_.UserPrincipalName
      }
    }
    $OwnerName = $Owners.Name -join ";"
    $OwnerID = $Owners.ID -join ";"
  }

  $secret = $AppCreds.PasswordCredentials
  $cert = $AppCreds.KeyCredentials

  ############################################
  $Log = New-Object System.Object

  $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
  $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
  #$Log | Add-Member -MemberType NoteProperty -Name "Created Date" -Value $CreatedDate
  $Log | Add-Member -MemberType NoteProperty -Name "Secret Start Date" -Value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Secret End Date" -value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $OwnerName
  $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

  $Logs += $Log

  ############################################
  foreach ($s in $secret)
  {
    $StartDate = $s.StartDateTime
    $EndDate = $s.EndDateTime

    $Log = New-Object System.Object

    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
    $Log | Add-Member -MemberType NoteProperty -Name "Created Date" -Value $CreatedDate
    $Log | Add-Member -MemberType NoteProperty -Name "Secret Start Date" -Value $StartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Secret End Date" -value $EndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $OwnerName
    $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

    $Logs += $Log
  }

  foreach ($c in $cert)
  {
    $CStartDate = $c.StartDateTime
    $CEndDate = $c.EndDateTime

    $Log = New-Object System.Object

    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
    $Log | Add-Member -MemberType NoteProperty -Name "Created Date" -Value $CreatedDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $CStartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $CEndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $OwnerName
    $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

    $Logs += $Log
  }
}

Write-host "Add the Path you'd like us to export the CSV file to" -ForegroundColor Green
Write-host "e.g <C:\Users\<USER>\Desktop\Users.csv>" -ForegroundColor Green
$Path = Read-Host
$Logs | Export-CSV $Path -NoTypeInformation -Encoding UTF8

```

以上です。  
上記内容が少しでも皆様の参考となりますと幸いです。ご不明な点がございましたら、弊社サポートまでお気軽にお問い合わせください。
