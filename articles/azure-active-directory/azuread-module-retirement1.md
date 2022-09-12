---
title: MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要
date: 2022-9-14 09:00
tags:
    - Azure AD
    - PowerShell
---


# MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要

こんにちは、 Azure ID チームの小出です。

今回は、MSOnline / AzureAD PowerShell モジュールから Graph PowerShell SDK モジュールへの移行についてご案内します。

以前より、下記の弊社ブログにて、本内容については案内を行っていますが、情報のアップデートにより、複数の記事に分かれてしまうなどわかりにくくなっている状況でした。

そこで今回は、現時点での最新情報と実施いただきたいこと、関連記事の URL などをまとめてご紹介します。


## 最新情報 (2022/9/9 最終更新) についてのまとめ


### ライセンス割り当て関連のコマンドについて
ライセンス割り当てに関するコマンド（Set-MsolUserLicense や Set-AzureADUserLicense など）は、 2023/3/31 に利用できなくなる見込みです。

- 廃止日を 2022/6/30 や 2022/8/26 とご案内している記事・公開情報などがありますが、廃止日は 2023/3/31 に延期されました。
- 現時点での予定では、 2023/3/31 を過ぎると、ライセンス割り当てのコマンドは使用できなくなります。2023/4/1 以降も動作はするかもしれませんが、いつ使えなくなってもおかしくない状況になります。
- 2022/11/1 以降に新しく作成されたテナントでは、これらのコマンドを利用してライセンス割り当てが動作しない見込みです。
- 対象となるコマンドの詳細は、[こちらの記事](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/)の下記該当箇所をご確認ください。

![](./azuread-module-retirement1/azuread-modure-retirement1-image1.png)


### ライセンス割り当て関連「以外」のコマンドについて
ライセンス割り当てに関するコマンド以外（例: Connect-MsolService や Get-AzureADUser など）は、2022/12 以降に廃止となる予定です。

- 2022/12 以降に廃止されることは公開されていますが、具体的にいつ廃止されるのかはスケジュールが未定です。2022/12 前後までに具体的な廃止日などを含め、情報のアップデートを予定しています。
- 現時点では、少なくとも 2022/12 までは廃止にならない方針が決定されており、 2023/1 以降に直ちに廃止されることが決定しているわけではありません。
- 廃止になった後にコマンドが動作しない状態になるかは、現状決まっておりません。


## いまできること・確認すること
1. 現在利用しているコマンド・スクリプトなどを確認する。[こちらの記事](https://jpazureid.github.io/blog/azure-active-directory/how-to-determine-depreacated-azuread-msol/)をもとに、MSOL や AzureAD が含まれるコマンドがないか確認する。
2. MSOL や AzureAD が含まれるコマンドがある場合、[こちらの公開情報](https://docs.microsoft.com/en-us/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0)にて対応するコマンドを探す
3. 既存のスクリプトの書き換え、コマンドの置き換えを実施し、新しいモジュールで動作するよう修正する
4. 利用中の MSOL や AzureAD コマンドの置き換えとなるものが見つからない、想定したように動作しない場合は、お問い合わせください


##  本廃止に関する弊社ブログ記事リンク
### アップデート情報（英語記事翻訳）
[Azure AD Graph および MSOnline での従来のライセンスの割り当て方法が廃止され Microsoft Graph によるライセンス管理に変わります](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/)
[Azure AD の変更管理を簡素化します](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-change-management-simplified/)

### 既存モジュール使用状況について
[Azure AD Graph / MSOnline PowerShell モジュール利用状況の調べ方](https://jpazureid.github.io/blog/azure-active-directory/how-to-determine-depreacated-azuread-msol/)

### 新しいモジュールの使用方法（ライセンスに関する操作について）
[Microsoft Graph PowerShell SDK を使用したライセンス管理操作の紹介](https://jpazureid.github.io/blog/azure-active-directory/operating-license-with-microsoft-graph/)

### 新しいモジュールの使用方法（ライセンス以外の操作について）
今後アップデート次第更新します。

