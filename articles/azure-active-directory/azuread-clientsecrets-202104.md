---
title: クライアント シークレット作成画面の変更について
date: 2021-04-20
tags:
  - Azure AD
  - Application
  - Client Secrets
---

# クライアント シークレット作成画面の変更について

こんにちは。Azure Identity チームの栗井です。

この度、Azure AD アプリケーション (Service Principal) のクライアント シークレットの作成画面の変更、設定可能な有効期限の変更がありましたので、本記事にて紹介します。

## 新旧画面の比較
該当画面 : [Azure Active Directory] > [アプリの登録] > (任意のアプリケーション) > [証明書とシークレット]

![該当画面](./azuread-clientsecrets-202104/clientsecrets.png)

- 従来の画面では、有効期限が「1 年」「2 年」「なし (= 無期限)」が選択いただけました。
- 新しい画面では、1, 12, 18, 24 ヶ月が選択肢として表示されます。

    [カスタム] を選択することで更にきめ細かく開始日と終了日を選択可能です。
     - 開始日 : 現在の日付 ～ 1 年 6 ヶ月後の範囲内を指定します。(現在の日時が 2021/04/20 の場合、2021/04/20 ～ 2022/10/20 の範囲)
     - 終了日 : 開始日 ～ 開始日 ＋ 2 年後 の範囲内を指定します。(開始日を 2021/04/20 にした場合、2021/04/20 ～ 2023/04/20 の範囲)

## 最大の変更点 : "無期限" のクライアント シークレットが作成不可になりました

上記の変更によって、 **新しい画面では無期限 (= 失効日を持たない永続的な) クライアント シークレットを作成することができなくなりました。** 最大でも 2 年ごとに、クライアント シークレットを更新する必要があります。

## 動作変更に至った経緯

上記の動作変更は「同じクライアント シークレットを長期間利用し続けることは、セキュリティ リスクである」という考えに基づきます。

クライアント シークレットは、アプリケーションが Azure AD へアクセスするために利用するための資格情報です。万が一この情報が漏洩することで、その登録されたアプリケーションに許可された操作をおこなうことができます。

特に、利用されなくなったアプリケーションが、有効な資格情報 (クライアント シークレット) を保持し続けることは、リスクと考えられます。

Azure AD に登録されたアプリケーションについて、利用されなくなった時点で適宜削除することが理想的ではありますが、現実問題、多かれ少なかれ残存してしまう現状があります。このようなアプリケーションが、無期限の資格情報を持つ、アプリケーションに許可された操作を行える状態になっていることは、望ましくない状態です。


## 過去に作成した "無期限" のクライアント シークレットはどうなりますか？

結論から言いますと、過去に作成した、有効期限が無期限のクライアント シークレットの有効期限は変わりません。

有効期限が無期限のクライアント シークレットは、これまでも内部的には "2299 年 12 月 31 日" が有効期限とされていたので、新しい画面ではこの日付に置き換わります。

今回の動作変更 (選択できるのは最長 2 年、無期限は選べない) は、これから新たな画面で作成される、新しいクライアント シークレットが対象です。

## PowerShell からは、有効期限が 2 年以上のクライアント シークレットが作成できるようですが...

はい、現在は PowerShell コマンドでクライアントシークレットを作成する際は、2 年以上の有効期限を指定することが可能です。

1. PowerShell を管理者権限で起動します
2. 下記コマンドで  Micorosft Graph PowerShell モジュール をインストールします (すでにインストール済みである場合は必要ありません)
   ```powershell
    Install-Module -Name Microsoft.Graph
    ```
3. 下記コマンドでテナントに接続します
    ```powershell
    Connect-MgGraph -Scopes 'Application.ReadWrite.All'
    ```
4. 下記コマンドでシークレットを作成します
```powershell
$passwordCred = @{
    displayName = 'キーの説明'
    endDateTime = [System.DateTime]::new(2099,12,31,23,59,59,[System.DateTimeKind]::Utc)
}
$secret = Add-MgApplicationPassword -applicationId $apps[0].Id -PasswordCredential $passwordCred
$secret | fl *
```

※ 出力される SecretText をシークレットとして保存します。

ただし、いずれは PowerShell コマンドによるクライアントシークレット作成にも、Azure ポータル上と同じ制限がかかるようになる方針です (制限が反映された際には、この項目は削除する予定です)。この制限が実施されるスケジュールについては、現時点では未定です。

## 作成したシークレットの有効期限をメールなどで通知する方法はありますか？

開発部門でもご要望は認識しておりますが、現時点ではシークレットの有効期限をメールなどで通知する機能は実装されておりません。また現時点では具体的な提供予定についての情報もございません。

以下の弊社ブログで Power Automate を使ってシークレットと証明書の期限切れの状態を確認する処理を自動化する方法を案内しておりますので、代替案として検討ください。

- Use Power Automate to Notify of Upcoming Azure AD App Client Secrets and Certificate Expirations - Microsoft Tech Community
 <https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/use-power-automate-to-notify-of-upcoming-azure-ad-app-client/ba-p/2406145>

## "Updates to converged applications are not allowed in this version." が発生する場合

アプリの [サポートされているアカウントの種類](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/supported-accounts-validation) が `任意の組織ディレクトリ内のアカウント (任意の Azure AD ディレクトリ - マルチテナント) と個人の Microsoft アカウント (Skype、Xbox など)` または `個人用 Microsoft アカウントのみ` 
の場合 New-AzureADApplicationPasswordCredential コマンドレットや New-AzADAppCredential (v6.6.0 以前) によるシークレットの追加は行えません。

この場合シークレットの作成は上述の、Microsoft Graph API 経由で実施いただく必要があります。

> [!NOTE]
> Azure CLI および Az モジュールの最新版では Microsoft Graph API を利用したシークレット更新に対応しております。

## "You can only add a maximum of 2 encrypted credentials." が発生する場合

アプリの [サポートされているアカウントの種類](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/supported-accounts-validation) が `任意の組織ディレクトリ内のアカウント (任意の Azure AD ディレクトリ - マルチテナント) と個人の Microsoft アカウント (Skype、Xbox など)` または `個人用 Microsoft アカウントのみ` 
の場合に、3 つ以上のクライアント シークレットを登録しようとするとこのエラーが発生します。

前項での内容の通り、Microsoft Graph REST API を利用することでクライアント シークレットの追加が可能ですが、登録できるクライアント シークレットの数の上限は 2 つです。
エラーが発生した場合には、既存のシークレットを削除するなどし上限を超えないよう設定ください。

## 今後のアップデートについて

本変更についての公開情報やアナウンス等は、現在 (2022/12/21) の時点で公開されておりません。新たな情報が入り次第、本記事内でアップデートさせていただきます。

## おわりに

上記の内容がご参考になれば幸いです。
ご不明点などございます場合は、ぜひ弊社サポートサービスをご利用ください。
