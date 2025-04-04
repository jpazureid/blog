---
title: クラウド Kerberos 信頼デプロイ方法 
date: 2024-06-10 10:00
tags:
  - Windows Hello for Business
  - Azure AD
  - Microsoft Entra ID
  - Cloud Kerberos Trust
toc:
  enabled: true
min_depth: 1
max_depth: 4
list_number: false
---

# クラウド Kerberos 信頼デプロイ方法

こんにちは。 Azure Identity サポート チームです。 こちらのブログでは Windows Hello for Business のクラウド Kerberos 信頼の展開方法についてご紹介します。

ハイブリッド構成では、キー信頼および証明書信頼を含め計 3 つの信頼モデルがあります。もし証明書認証のシナリオをサポートする必要がない場合、クラウド Kerberos 信頼が最も推奨される信頼モデルです。公開情報をご参照いただいてもクラウド Kerberos 信頼を展開することは可能ですが、情報が複数のページに分かれており、また展開をおこなう手順も複数あることから必要なポイントをお纏めしてわかりやすくお伝えできればと思い本ブログを執筆しました。

## 構成ステップ概要

クラウド Kerberos 信頼は下記 2 つのステップを経て構成することができます。

1. Microsoft Entra Kerberos サーバー オブジェクトの構成
2. クライアント側でのクラウド Kerberos 信頼の有効化

※上記ステップを実施する前に、[こちら](https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/deploy/hybrid-cloud-kerberos-trust#prerequisites) の公開情報をご参照の上、前提条件が満たされているか事前にご確認ください。

各ステップの詳細について以下に記載いたします。

## 1. Microsoft Entra Kerberos サーバー オブジェクトの構成

オンプレミスのドメイン環境に、PowerShell モジュールを使用し Kerberos サーバー オブジェクトを構成します。複数ドメインが存在する環境では各ドメインに同サーバー オブジェクトを構成する必要があります。事前に下記 2 つの資格情報を手元にご用意ください。

(a) Domain Admins および Enterprise Admins グループのメンバーである Active Directory ユーザー  
    ※ 後述の $domainCred で使用される資格情報です。
    
(b) Microsoft Entra テナントのグローバル管理者の権限が割り当てられている Microsoft Entra ID ユーザー  
    ※ 後述の $cloudCred で使用される資格情報です。

上記 2 つの資格情報は PowerShell コマンド実行時に使用されます。

まずは、[こちら](https://learn.microsoft.com/ja-jp/entra/identity/authentication/howto-authentication-passwordless-security-key-on-premises#install-the-azureadhybridauthenticationmanagement-module) に記載されている手順に沿って、オンプレミス AD にアクセス可能な任意のコンピューターへモジュールをインストールください。インストールが完了しましたら、プロンプト例 (以下に抜粋して記載) に沿って PowerShell コマンドを実行し Kerberos サーバー オジェクトを作成します。

こちらの [公開情報](https://learn.microsoft.com/ja-jp/entra/identity/authentication/howto-authentication-passwordless-security-key-on-premises#create-a-kerberos-server-object) を参照いただくと 4 つのプロンプト例があることが確認できます。最適なプロンプト例を選択する上で考慮すべきポイントは下記二点であり、これらの組み合わせによりプロンプト例が 4 つに分かれています。

- 上述の資格情報 (a) を使用して Windows へログインをおこなうか ($domainCred = Get-Credential を指定しない場合、 Windows にログインしている資格情報が PowerShell コマンドを実行時に使用されます)。
- 上述の資格情報 (b) での認証時に多要素認証が要求されるか ($cloudCred = Get-Credential はパスワード認証のみに対応しており、多要素認証には対応しておりません)。

お客様の構成などによっては適していないプロンプト例もあるため、もし未確定の要素がある場合は、すべてのシナリオに対応しているプロンプト例 3 を選択されることをお勧めします。

以下にプロンプト例 3 で想定されているシナリオについて説明します。その他プロンプト例の詳細については後述の [その他プロンプト例に関する補足] をご参照ください。

### プロンプト例 3

$domainCred = Get-Credential  のみが指定されており、$cloudCred = Get-Credential は指定されていないため、下記の条件に合致するシナリオで使用できます。

- PowerShell コマンドを実行する Windows 端末へ資格情報 (a) でログインしていない (ログインしている場合も可)
- グローバル管理者の認証時に多要素認証が要求される (要求されない場合も可)

```powershell
# Specify the on-premises Active Directory domain. A new Azure AD
# Kerberos Server object will be created in this Active Directory domain.
$domain = $env:USERDNSDOMAIN

# Enter a UPN of an Azure Active Directory global administrator
$userPrincipalName = "administrator@contoso.onmicrosoft.com"
# Enter a domain administrator username and password.
$domainCred = Get-Credential

# Create the new Azure AD Kerberos Server object in Active Directory
# and then publish it to Azure Active Directory.
# Open an interactive sign-in prompt with given username to access the Azure AD.
Set-AzureADKerberosServer -Domain $domain -UserPrincipalName $userPrincipalName -DomainCredential $domainCred
```

> [!NOTE]
> $domain = $env:USERDNSDOMAIN は、実行する環境のドメイン名を取得するコマンドとなりますが、ドメイン ユーザーで Windows 端末へログオンしている場合のみ有効です。ドメイン ユーザー以外で Windows 端末へログオンしている場合は、$domain = "contoso.com" のようにドメインを指定ください。

コマンドの実行が正常に完了されたら、[こちら](https://learn.microsoft.com/ja-jp/entra/identity/authentication/howto-authentication-passwordless-security-key-on-premises#view-and-verify-the-microsoft-entra-kerberos-server) のコマンドからサーバー オブジェクトが作成されていることが確認いただけます。

## 2. クラウド Kerberos 信頼の有効化

Windows Hello for Business の機能は既定で無効となっています。グループ ポリシーまたは Microsoft Intune の構成プロファイルなどを使用して同機能を有効化ください。クラウド Kerberos 信頼を展開する際に必須となるレジストリは後述の 2 つのみ、その他のレジストリはオプションとなりますのでお客様のご要件に応じて適宜構成ください。グループ ポリシーまたは Microsoft Intune の構成手順については [こちら](https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/deploy/hybrid-cloud-kerberos-trust?tabs=intune#configure-windows-hello-for-business-policy-settings) をご確認ください。

**Windows Hello  for Business を有効化するレジストリ**

ハイブ: HKEY_LOCAL_MACHINE or HKEY_CURRENT_USER  
キーのパス (GPO): SOFTWARE\Policies\Microsoft\PassportForWork  
キーのパス (Intune): SOFTWARE\Microsoft\Policies\PassportForWork\\\<Tenant-ID>\Device\Policies  
値の名前: Enabled  
値の種類: REG_DWORD  
値のデータ: 00000001

**クラウド Kerberos 信頼を有効化するレジストリ**

ハイブ: HKEY_LOCAL_MACHINE  
キーのパス (GPO): SOFTWARE\Policies\Microsoft\PassportForWork  
キーのパス (Intune): SOFTWARE\Microsoft\Policies\PassportForWork\\\<Tenant-ID>\Device\Policies  
値の名前: UseCloudTrustForOnPremAuth  
値の種類: REG_DWORD  
値のデータ: 00000001

上記レジストリ構成後、ユーザーが Windows へサインインがおこなわれたタイミングで Windows Hello for Business のプロビジョニングが開始されます。正常に構成が完了している場合は、下図イベント ログ 358 の赤線箇所のメッセージが "Yes" と表示されます。

![](./how-to-deploy-cloud-kerberos-trust/01.jpg)

## その他プロンプト例に関する補足

プロンプト例 3 以外について想定されているシナリオについて以下に記載いたします。

### プロンプト例 1

$domainCred = Get-Credential および $cloudCred = Get-Credential が指定されていますので、下記の条件に合致するシナリオで選択いただけます。

- PowerShell コマンドを実行する Windows 端末へ資格情報 (a) でログインしていない  (ログインしている場合も可)
- グローバル管理者の認証時に多要素認証が要求されない (要求される場合は不可)

```powershell
# Specify the on-premises Active Directory domain. A new Azure AD # Kerberos Server object will be created in this Active Directory domain.
$domain = $env:USERDNSDOMAIN

# Enter an Azure Active Directory global administrator username and password.
$cloudCred = Get-Credential -Message 'An Active Directory user who is a member of the Global Administrators group for Azure AD.'

# Enter a domain administrator username and password.
$domainCred = Get-Credential -Message 'An Active Directory user who is a member of the Domain Admins group.'

# Create the new Azure AD Kerberos Server object in Active Directory # and then publish it to Azure Active Directory.
Set-AzureADKerberosServer -Domain $domain -CloudCredential $cloudCred -DomainCredential $domainCred
```

### プロンプト例 2

$domainCred = Get-Credential は指定されておらず、$cloudCred = Get-Credential のみが指定されていますので、下記の条件に合致するシナリオで選択いただけます。

- PowerShell コマンドを実行する Windows 端末へ資格情報 (a) でログインしている (ログインしていない場合は不可)
- グローバル管理者の認証時に多要素認証が要求されない  (要求される場合は不可)
  
```powershell
# Specify the on-premises Active Directory domain. A new Azure AD
# Kerberos Server object will be created in this Active Directory domain.
$domain = $env:USERDNSDOMAIN

# Enter an Azure Active Directory global administrator username and password.
$cloudCred = Get-Credential

# Create the new Azure AD Kerberos Server object in Active Directory
# and then publish it to Azure Active Directory.
# Use the current windows login credential to access the on-prem AD.
Set-AzureADKerberosServer -Domain $domain -CloudCredential $cloudCred
```

### プロンプト例 4

$domainCred および $cloudCred = Get-Credential は指定されていませんので、下記の条件に合致するシナリオで選択いただけます。

- PowerShell コマンドを実行する Windows 端末へ資格情報 (a) でログインしている  (ログインしていない場合は不可)
- グローバル管理者の認証時に多要素認証が要求される  (要求されない場合も可)

```powershell
# Specify the on-premises Active Directory domain. A new Azure AD
# Kerberos Server object will be created in this Active Directory domain.
$domain = $env:USERDNSDOMAIN

# Enter a UPN of an Azure Active Directory global administrator
$userPrincipalName = "administrator@contoso.onmicrosoft.com"

# Create the new Azure AD Kerberos Server object in Active Directory # and then publish it to Azure Active Directory.
# Open an interactive sign-in prompt with given username to access the Azure AD.
Set-AzureADKerberosServer -Domain $domain -UserPrincipalName $userPrincipalName
```

## 最後に

上記の内容がお客様のお役に立てれば幸いです。製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供しますので、ぜひ弊社サポート サービスをご利用ください。
