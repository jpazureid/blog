---
title: Azure AD のメンバー ユーザーとゲスト ユーザー
date: 2023-04-10
tags:
  - Azure AD B2B
---

> [!NOTE]
> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/12/12/azuread-member-guest/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

> [!NOTE]
> 2017/12/12: 本記事の初版を投稿  
> 2018/02/26: Microsoft Connect のリタイアに伴い MSOnline モジュールのダウンロードができなくなったため記載を変更  
> 2018/10/31: メンバーとゲストの既定のアクセス許可の比較情報のリンクを追加  
> 2023/04/10: Msol コマンドのリタイアに伴い Microsoft Graph コマンドでの実施方法に更新  

# Azure AD のメンバー ユーザーとゲスト ユーザー

こんにちは、Azure & Identity サポート チームの三輪です。

Azure AD に所属しているユーザーの種類として、下記のように「メンバー」と「ゲスト」があります。今回は、こちらのユーザーの種類について説明します。

![](./member-and-guest-user/member-and-guest-new.png)

## はじめに

下記のように、個人アカウントや別テナントの職場または学校アカウント (組織アカウント) を追加した (Azure AD B2B の機能を利用した) 場合に、ユーザーの種類が「ゲスト」として追加されます。

![](./member-and-guest-user/personal-work-account.png)

これ以外の Azure のサブスクリプションのサインアップで利用した個人アカウントや組織内のドメイン (上記の例の場合: contso.com) をユーザー名 (例: test@contoso.com) に持つユーザーは「メンバー」として登録されます。また、現在は利用できないクラシック ポータル (旧ポータル) より追加した外部ユーザーについては「メンバー」として登録されております。

## 詳細

既定ではゲスト ユーザーに対しては、 Azure AD のデータへのアクセスが制限されています。このため、ゲスト ユーザーで Azure AD テナントにサインインした場合、招待された Azure AD のユーザーの一覧を参照することはできませんし、各種設定の参照および変更も制限されています。もちろん、サブスクリプションに対する権限を付与していない場合は、サブスクリプションのリソースを操作することもできません。一般ユーザーとゲスト ユーザーがそれぞれできること (アクセス許可の比較) は、[こちら](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions)をご参照ください。

![](./member-and-guest-user/access-denied-new.png)

![](./member-and-guest-user/no-access-permission-new.png)

ゲストに対するアクセス制限は、[すべてのユーザー] - [ユーザー設定] - [外部コラボレーションの設定を管理します] と辿り [ゲストのアクセス制限] で変更できます。この設定が "ゲスト ユーザーは、ディレクトリ オブジェクトのプロパティとメンバーシップへのアクセスが制限されます" (既定値) の場合には「ゲスト」の操作は上記のように制限されています。外部コラボレーションの設定については、[こちら](https://jpazureid.github.io/blog/azure-active-directory/external-collaboration-setting-b2b-access/) をご参照ください。

![](./member-and-guest-user/guest-users-permissions-are-limited1-new.png)

![](./member-and-guest-user/guest-users-permissions-are-limited2-new.png)

ユーザーの属性については、Azure ポータル上での操作、または PowerShell の実行により、メンバーからゲスト、またその逆についても変更が可能です。ゲストからメンバーに変更する際は「ゲスト」に対して行っていた制御の対象外のユーザーとなるため、セキュリティ ポリシーに沿った対応や特定のユーザーに絞った設定変更をお勧め致します。

## ユーザー タイプの変更手順

### Azure ポータル上の操作で該当ユーザーを ゲストからメンバーに変更する手順

1. 管理者権限で Azure ポータルにサインインします。
2. Azure Active Directory を開き、[ユーザー] を開きます。
3. ユーザー タイプを変更したいユーザーを開きます。
4. [プロパティの編集] をクリックします。
ユーザーの種類のタブを [メンバー] に変更し、[保存] をクリックします。

### PowerShell を実行して該当ユーザーをゲストからメンバーに変更する手順

この作業を実施するためには、Azure AD 用の PowerShell を利用する必要がありますが、 PowerShell を利用する際には Microsoft アカウントではなく、組織アカウントでのグローバル管理者が必要です (Azure AD の PowerShell については [リンク](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement3/) も参照ください)。そのために次の手順で実施する必要があります。

1. Azure AD のグローバル管理者アカウントを作成する (※すでに組織アカウントのグローバル管理者が存在する場合はスキップ)
2. PowerShell を実行し、該当ユーザーを Guest から Member に変更する

まず、1. の手順として、Azure AD のグローバル管理者アカウントを作成します。すでに組織アカウントのグローバル管理者が存在する場合はスキップください。

1. [ユーザー] - [＋新しいユーザー] と辿り、 [ 新しいユーザーの作成]  をクリックします。
2. ユーザー名と名前欄に admin などの任意の値を入力します。
3. [役割]をクリックし、ディレクトリ ロール欄で "グローバル管理者" を選択し、 [選択] をクリックします。
4. "パスワードを表示" をクリックし、パスワードを控えて [作成] をクリックします。

次に、2. の手順として、PowerShell を実行し、該当ユーザーを Guest から Member に変更します。以下の手順を順に実行ください。

1. PowerShell を起動します。

    ※ モジュールの入手方法については、弊社[ブログ](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement3/) をご参照ください。Graph PowerShell SDK のモジュールの利用をお願いします。

2. 以下のコマンドを実行します。

    Connect-MgGraph -Scope "User.ReadWrite.All"

3. 資格情報の入力を求められるため、1 で作成したアカウントの情報を入力します。パスワードの変更が求められるはずですので、パスワードを新しく設定します。
4. 以下のコマンドを実行して、対象ユーザーの UserPrincipalName および UserType 属性値を確認します。

    ```powershell
    Get-MgUser -All -Property UserPrincipalName,UserType | Format-Table UserPrincipalName,UserType
    ```

    出力例:

    ```powershell
    UserPrincipalName                             UserType
    user_live.com#EXT#@contoso.onmicrosoft.com    Guest  -> 「Guest」 であることが確認できます。
    ```

5. 以下のコマンドを実行して、対象ユーザーの UserType を 「Member」 に変更します。

    ```powershell
    Update-MgUser -UserId <対象ユーザーの オブジェクトID または UserPrincipalName> -UserType Member
    ```

    実行例:

    ```powershell
    Update-MgUser -UserId user_live.com#EXT#@contoso.onmicrosoft.com -UserType Member
    ```

 6. 再度以下のコマンドを実行して、対象ユーザーの UserType を確認します。

    ```powershell
    Get-MgUser -All -Property UserPrincipalName,UserType | Format-Table UserPrincipalName,UserType
    ```

    出力例:

    ```powershell
    UserPrincipalName                             UserType
    user_live.com#EXT#@contoso.onmicrosoft.com    Member  -> 変更されたことを確認します。
    ```

なお、「Member」から「Guest」に変更する場合は、UserType に「Guest」を指定します。

```powershell
Update-MgUser -UserId <対象ユーザーの オブジェクトID または UserPrincipalName> -UserType Guest
```

上記内容が少しでも皆様の参考となりますと幸いです。
