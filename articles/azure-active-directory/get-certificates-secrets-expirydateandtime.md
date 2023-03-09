---
title: Azure AD に連携している各種証明書、クライアント シークレットの有効期限の抽出方法
date: 2023-03-09
tags:
  - Azure AD
  - Application
---

# Azure AD に連携している各種証明書、クライアント シークレットの有効期限の抽出方法

こんにちは。Azure Identity チームの栗井です。

Azure AD の「アプリの登録」から各アプリに連携している証明書・クライアント シークレット、ならびに「エンタープライズ アプリケーション」で SAML SSO を構成いただいている場合に登録している SAML 署名証明書は、いずれも有効期限がございます。

Azure Portal の画面上では、有効期限を一覧で確認できないため、Microsoft Graph などの API を利用する必要がございます。

本記事では、下記公開情報内の Azure AD PowerShell を利用したサンプルをもとに、Microsoft Graph PowerShell を利用して各種証明書・シークレットの有効期限を CSV ファイルに出力する手順を紹介いたします。

- [アプリの登録用にシークレットと証明書をエクスポートする](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/scripts/powershell-export-all-app-registrations-secrets-and-certs)
- [エンタープライズ アプリのシークレットと証明書をエクスポートする](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/scripts/powershell-export-all-enterprise-apps-secrets-and-certs)

## 免責事項

上記の公開情報内サンプル スクリプトに記載されている免責次項についてのコメントを翻訳したものを以下 NOTE に記載いたします:

> [!NOTE]
> 免責事項：これは公式の PowerShell スクリプトではありません。あなたが今遭遇している状況のために特別に設計されたものです。  
> プリセットされたパラメータを修正したり変更したりしないでください。  
> このスクリプトが何らかの形で変更、修正されたり、他の手段で別の状況で使用された場合、私たちはサポートすることができないことに注意してください。  
> 本サンプルは、商品性、特定目的への適合性の保証を含むがこれに限定されない、明示または黙示のいかなる保証もない「AS IT IS」で提供されます。  
> 本サンプルは、マイクロソフトの標準サポートプログラムまたはサービスではサポートされていません。  
> マイクロソフトはさらに、商品性または特定目的への適合性に関する黙示的な保証を含むがこれに限定されない、すべての黙示的な保証を否認している。  
> 本サンプルおよびドキュメントの使用または性能から生じるすべてのリスクは、お客様が負うものとします。  
> マイクロソフト、その著作者、またはスクリプトの作成、制作、配信に関与した者は、いかなる場合においても、サンプルまたはドキュメントの使用または使用不能から生じるいかなる損害（事業利益の損失、事業の中断、事業情報の損失、その他の金銭的損失を含むがこれに限定されない）についても、マイクロソフトがその損害発生の可能性を知らされていたとしても、責任を負いません。

弊社から案内いたしますサンプル スクリプトはあくまでお客様でのスクリプト作成の際に参照いただくためのサンプルであり、動作保証やカスタマイズのご依頼には非対応であることにご了承をいただけますと幸いです。

## 事前準備: Microsoft Graph PowerShell SDK のインストール

PowerShell をご利用いただく端末で、Microsoft Graph PowerShell SDK が未インストールの場合は、下記の手順を実施ください。

1. Windows 端末上で PowerShell を管理者権限で起動します。
1. 下記コマンドを実行します。

```
Install-Module Microsoft.Graph
```

インストールの前提事項などの詳細情報は下記公開情報に記載がございますので、ご入用に応じて参照ください。

- [Install the Microsoft Graph PowerShell SDK](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/installation?view=graph-powershell-beta#installation)

## 操作の開始: Azure AD への認証

後述の手順を実施いただく前に、下記コマンドを実行のうえ、Azure AD テナントに接続ください。

```
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

テナントに接続後に後述のコマンドを実行し、各種証明書・シークレットの有効期限を CSV ファイル出力することができます。

各コマンドの -Path で指定する出力先は一例です。環境に応じてカスタマイズください。

## \[アプリの登録\] から確認できるアプリケーションのクライアント シークレットおよび証明書の有効期限の一括出力

### サンプル スクリプト 1

```powershell
# 既に Connect-MgGraph コマンドを実施済みである場合不要です。
Connect-MgGraph -Scopes “Application.Read.All, User.Read.All”

$Applications = Get-MgApplication -ExpandProperty Owners -All
$Logs = @()

foreach ($app in $Applications)
{
  $AppName = $app.DisplayName
  $ApplID = $app.AppId
  $AppCreds = $app | Select-Object PasswordCredentials, KeyCredentials
  $secret = $AppCreds.PasswordCredentials
  $cert = $AppCreds.KeyCredentials

  $OwnerIDs = $app.Owners.ID
  $Username = "<<No Owner>>"
  $OwnerID = ""
  if ($OwnerIDs.Count)
  {
    $Filter = "id in ('$($OwnerIDs -join "','")')"
    $Owners = Get-MgUser -Filter $Filter
    $Username = $Owners.UserPrincipalName -join ";"
    $OwnerID = $OwnerIDs -join ";"
  }

  ############################################
  $Log = New-Object System.Object

  $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
  $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
  $Log | Add-Member -MemberType NoteProperty -Name "Secret Start Date" -Value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Secret End Date" -value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $Null
  $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $Username
  $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

  $Logs += $Log


  ############################################
  foreach ($s in $secret)
  {
    $StartDate = $s.StartDateTime
    $EndDate = $s.EndDateTime

    #$operation = $EndDate - $now
    #$ODays = $operation.Days

    $Log = New-Object System.Object

    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
    $Log | Add-Member -MemberType NoteProperty -Name "Secret Start Date" -Value $StartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Secret End Date" -value $EndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $Username
    $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

    $Logs += $Log
  }

  foreach ($c in $cert)
  {
    $CStartDate = $c.StartDateTime
    $CEndDate = $c.EndDateTime
    #$COperation = $CEndDate - $now
    #$CODays = $COperation.Days

    $Log = New-Object System.Object

    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationName" -Value $AppName
    $Log | Add-Member -MemberType NoteProperty -Name "ApplicationID" -Value $ApplID
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $CStartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $CEndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $Username
    $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

    $Logs += $Log
  }
}

Write-host "Add the Path you'd like us to export the CSV file to, in the format of <C:\Users\<USER>\Desktop\Users.csv>" -ForegroundColor Green
$Path = Read-Host
$Logs | Export-CSV $Path -NoTypeInformation -Encoding UTF8
```

## \[エンタープライズ アプリケーション\] から確認できるアプリケーションのクライアント シークレットおよび証明書の有効期限の一括出力

### サンプル スクリプト 2

```powershell
# 既に Connect-MgGraph コマンドを実施済みである場合不要です。
Connect-MgGraph -Scopes “Application.Read.All, User.Read.All”

$EnterpriseApps = Get-MgServicePrincipal -ExpandProperty Owners -All

# SAML ベースのSSO を構成しているエンタープライズアプリケーションの一覧を取得
#$EnterpriseApps = Get-MgServicePrincipal -ExpandProperty Owners -Filter "preferredSingleSignOnMode eq 'saml'"
#
# ※注意事項
# 2020 年初頭 (1 ～ 3 月) 以降に作成されたアプリのみ SAML を構成した際に preferredSingleSignOnMode に 値がセットされる動作になりました。
# そのため、2020 年初頭以前に作成されたアプリでは、現在、SAML を構成していても preferredSingleSignOnMode が null となっております。
# 2020 年初頭以前に作成されたアプリの場合、PowerShell や Graph API などで SAML を構成していると判別できる値を取得することができず、SAML を構成しているアプリ一覧として取得することが難しい状況となります。将来的には、古いアプリにおいても新しいアプリと同様に正しい preferredSingleSignOnMode が取得できるようになることが計画されていることを確認しましたが、対応時期などは未定となっております。

$Logs = @()

foreach ($Eapp in $EnterpriseApps)
{
  $AppName = $Eapp.DisplayName
  $ApplID = $Eapp.AppId
  $CreatedDate = $Eapp.AdditionalProperties.createdDateTime

  $AppCreds = $Eapp | Select-Object PasswordCredentials, KeyCredentials

  $OwnerIDs = $Eapp.Owners.ID
  $Username = "<<No Owner>>"
  $OwnerID = ""
  if ($OwnerIDs.Count)
  {
    $Filter = "id in ('$($OwnerIDs -join "','")')"
    # e.g) id in ('xxxx', 'yyyy')
    $Owners = Get-MgUser -Filter $Filter
    $Username = $Owners.UserPrincipalName -join ";"
    $OwnerID = $OwnerIDs -join ";"
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
  $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $Username
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
    #$Log | Add-Member -MemberType NoteProperty -Name "Created Date" -Value $CreatedDate
    $Log | Add-Member -MemberType NoteProperty -Name "Secret Start Date" -Value $StartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Secret End Date" -value $EndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $Null
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $Username
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
    #$Log | Add-Member -MemberType NoteProperty -Name "Created Date" -Value $CreatedDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate Start Date" -Value $CStartDate
    $Log | Add-Member -MemberType NoteProperty -Name "Certificate End Date" -value $CEndDate
    $Log | Add-Member -MemberType NoteProperty -Name "Owner" -Value $Username
    $Log | Add-Member -MemberType NoteProperty -Name "Owner_ObjectID" -value $OwnerID

    $Logs += $Log
  }
}

Write-host "Add the Path you'd like us to export the CSV file to, in the format of <C:\Users\<USER>\Desktop\Users.csv>" -ForegroundColor Green
$Path = Read-Host
$Logs | Export-CSV $Path -NoTypeInformation -Encoding UTF8

```

### SAML 署名証明書の有効期限を一括出力

SAML 署名証明書の有効期限の一括出力の可否について多くのお問い合わせをいただいております。

サンプル スクリプト 2 の下記箇所のコメントアウトを外すことで SAML 署名証明書の有効期限の一覧出力ができます。
`#$EnterpriseApps = Get-MgServicePrincipal -ExpandProperty Owners -Filter "preferredSingleSignOnMode eq 'saml'"`

スクリプト内にも注意事項として記載をしておりますが、2020 年初頭以降に作成されたアプリケーションでは PreferredSingleSignOnMode プロパティに値がセットされますが、それ以前に作成されたアプリケーションでは preferredSingleSignOnMode は null です。
お手数をおかけし恐縮ですが、2020 年初頭以前に作成された SAML ベースの SSO を構成済みのアプリケーションの一覧については貴社にて管理をお願いいたします。

エンタープライズ アプリケーションの作成日時をお調べいただく際に参考になればと思い、作成日時を出力するための記述をサンプル スクリプト 2 に追加しております。
サンプル スクリプト 2 の中で、エンタープライズ アプリケーションが Azure AD テナントに作成された日時 (Created Date) を出力される場合には、以下箇所のコメントアウトを外してください:  
`#$Log | Add-Member -MemberType NoteProperty -Name "Created Date" -Value $CreatedDate`
複数個所ございますのでご注意ください。

上記内容が少しでも皆様の参考となりますと幸いです。ご不明な点がございましたら、弊社サポートまでお気軽にお問い合わせください。
