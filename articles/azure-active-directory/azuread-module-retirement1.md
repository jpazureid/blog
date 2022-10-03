---
title: MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要
date: 2022-10-03 09:00
tags:
    - Azure AD
    - PowerShell
---


# MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要

こんにちは、 Azure ID チームの小出です。

今回は、MSOnline (以降 MSOL) および Azure AD PowerShell の廃止スケジュールについてご案内します。

以前より、下記の弊社ブログにて、本内容については案内を行っていますが、情報のアップデートにより、複数の記事に分かれてしまうなどわかりにくくなっている状況でした。

そこで今回は、現時点での最新情報と実施いただきたいこと、関連記事の URL などをまとめてご紹介します。


## 最新情報 (2022/10/3 最終更新) についてのまとめ


### MSOL / Azure AD PowerShell のライセンス割り当て関連のコマンドについて
ライセンス割り当てに関する MSOL / Azure AD PowerShell コマンド（Set-MsolUserLicense や Set-AzureADUserLicense など）は、 2023/3/31 に利用できなくなる見込みです。

- 廃止日を 2022/6/30 や 2022/8/26 などと記載している情報もありますが、廃止日は 2023/3/31 に延期されました。
- 現時点での予定では 2023/3/31 を過ぎると MSOL / Azure AD のライセンス割り当ての PowerShell コマンドは使用できなくなる見込みです。2023/4/1 以降も引き続き動作はする可能性はありますが、それ以降はいつ使えなくなってもおかしくない状況になる見込みです。
- 2022/11/1 以降に新しく作成するテナントでは、MSOL / Azure AD PowerShell コマンドによるライセンス割り当て関連のコマンドが、テナント作成時点から正常に動作しない見込みです。

対象となるコマンドの詳細は、[こちらの記事](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/)の下記該当箇所をご確認ください。

![](./azuread-module-retirement1/azuread-modure-retirement1-image1.png)


### MSOL / Azure AD PowerShell のライセンス割り当て関連「以外」のコマンドについて
ライセンス割り当てに関するコマンド以外（例: Connect-MsolService や Get-AzureADUser など）は、2023 年 6 月 30 日 に廃止となる予定です。(2022/10/3 更新）

- 廃止予定日までは、これまでと同様にコマンドを利用可能です。
- 廃止後は、動作の保証はされませんが、動作し続けるコマンド・動作しなくなるコマンドの双方がある見込みです。実際に動作しなくなる具体的なコマンドの情報などはありません。


## いまできること・確認すること
1. 現在利用しているコマンド・スクリプトなどを確認する。[こちらの記事](https://jpazureid.github.io/blog/azure-active-directory/how-to-determine-depreacated-azuread-msol/)をもとに、MSOL や Azure AD の PowerShell コマンドを利用していないか確認する
2. MSOL や Azure AD の PowerShell コマンドを利用している場合、[こちらの公開情報](https://docs.microsoft.com/en-us/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0) にて対応するコマンドを探す
3. 既存のスクリプトの書き換え、コマンドの置き換えを実施し、新しいモジュールで動作するよう修正する
4. 利用中の MSOL や Azure AD コマンドの置き換えとなるものが見つからない、想定したように動作しない場合は、お問い合わせください


##  本廃止に関する弊社ブログ記事リンク
### アップデート情報（英語記事翻訳）
[Azure AD Graph および MSOnline での従来のライセンスの割り当て方法が廃止され Microsoft Graph によるライセンス管理に変わります](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/)
[Azure AD の変更管理を簡素化します](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-change-management-simplified/)  
[Microsoft Entra の変更管理のアナウンス (2022 年 9 月の状況)](https://jpazureid.github.io/blog/azure-active-directory/Microsoft-Entra-change-announcements-September-2022-train/#Azure-AD%E3%80%81Azure-AD-Preview%E3%80%81MSOnline-PowerShell-%E3%81%AE%E5%BB%83%E6%AD%A2%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

### 既存モジュール使用状況について
[Azure AD Graph / MSOnline PowerShell モジュール利用状況の調べ方](https://jpazureid.github.io/blog/azure-active-directory/how-to-determine-depreacated-azuread-msol/)

### 新しいモジュールへの移行導入
[MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 2_移行導入編](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement2/)  
[MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 3_インストール・接続編](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement3/)

### 新しいモジュールの使用方法（ライセンスに関する操作について）
[Microsoft Graph PowerShell SDK を使用したライセンス管理操作の紹介](https://jpazureid.github.io/blog/azure-active-directory/operating-license-with-microsoft-graph/)

### 新しいモジュールの使用方法（ライセンス以外の操作について）
今後アップデート次第更新します。

