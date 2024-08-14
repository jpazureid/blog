---
title: MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要
date: 2023-04-13 09:00
tags:
    - Azure AD
    - PowerShell
---

> [!NOTE]
> 2022-10-03: 本記事の初版を投稿  
> 2023-04-13: MSOL/AzureAD PowerShell の最新の非推奨情報を反映  
> 2023-06-19: 非推奨の日程の延期情報を反映  
> 2024-04-07: 非推奨のスケジュールのアップデートを反映
> 2024-08-14: 最新のアップデートについて更新しました 

# MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要

こんにちは、 Azure ID チームの小出です。

今回は、MSOnline (以降 MSOL) および Azure AD PowerShell の非推奨スケジュールについてご案内します。以前より、下記の弊社ブログにて、本内容については案内を行っていますが、情報のアップデートにより、複数の記事に分かれてしまうなどわかりにくくなっている状況でした。そこで今回は、現時点での最新情報と実施いただきたいこと、関連記事の URL などをまとめてご紹介します。

## 最新情報 (2024/8/14 最終更新) のまとめ

### MSOL / Azure AD PowerShell のライセンス割り当て関連のコマンド (2023/6/19 最終更新)

ライセンス割り当てに関する MSOL / Azure AD PowerShell コマンド (Set-MsolUserLicense や Set-AzureADUserLicense など) は、2023/3/31 にすでに廃止されました。まだこのコマンドを利用しているお客様は、早急に新しいコマンドに移行ください。これらのコマンドは今後予告なく動作しなくなります。

新しいコマンドでのライセンス割り当て方法は、[本ブログ記事](https://jpazureid.github.io/blog/azure-active-directory/operating-license-with-microsoft-graph/) にてサンプルを用意しておりますので、併せてご確認ください。

- 廃止日を 2022/6/30 や 2022/8/26 などと記載している情報もありますが、ライセンス割り当てに関する MSOL / Azure AD PowerShell コマンドの廃止日は 2023/3/31 です。それ以降の延長はなく 2023/3/31 にすでに廃止されました。
- 2023/3/31 を過ぎると MSOL / Azure AD のライセンス割り当ての PowerShell コマンドは予告なく使用できなくなる見込みです。2023/4/1 以降も引き続きテナントによっては動作はする可能性はあり、2023/4/13 現在、弊社検証環境では引き続き Set-MsolUserLicense コマンドでのライセンス付与は実施できています。しかし、いつ利用できなくなってもおかしくない状況です。
- 2022/11/1 以降に新しく作成するテナントでは、MSOL / Azure AD PowerShell コマンドによるライセンス割り当て関連のコマンドが、テナント作成時点から正常に動作しません。
- 業務への影響などから延長についてサポートへ相談いただき、弊社側での要件を満たした一部のお客様については API の利用延長申請を行いました。延長申請を行ったお客様も、 2023 年 9 月 30 日までに移行を完了する必要があります。なお、すでに API 自体は廃止されておりますので、新たな延長申請は原則お受けしていません。

対象となるコマンドの詳細は、[こちらの記事](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/)の下記該当箇所をご確認ください。

<table>
  <thead>
    <tr>
      <th>既存のコマンド (2023 年 3 月 31 日以降に利用できなくなる操作)</th>
      <th>今後推奨される Microsoft Graph PowerShell および API</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href ="https://docs.microsoft.com/ja-jp/powershell/module/msonline/?view=azureadps-1.0" target="_blank">MSOnline Powershell</a>
      <br/>・Set-MsolUserLicense
      <br/>・New-MsolUser (-LicenseAssignment か -LicenseOptions を指定)</td>
      <td rowspan="2">Microsoft Graph PowerShell
      <br/>・<a href="https://docs.microsoft.com/ja-jp/powershell/module/microsoft.graph.users.actions/set-mguserlicense?view=graph-powershell-1.0" target="_blank">Set-MgUserLicense</a>
      </td>
    </tr>
    <tr>
      <td><a href="https://docs.microsoft.com/en-us/powershell/azure/active-directory/overview?view=azureadps-2.0">Azure AD Powershell</a>
      <br/>・Set-AzureADUserLicense
      </td>
    </tr>
    <tr>
      <td>Azure AD Graph API (graph.windows.net)
      <br/>・assignLicense</td>
      <td>Microsoft Graph API
      <br/>・<a href="https://docs.microsoft.com/ja-jp/graph/api/user-assignlicense?view=graph-rest-1.0&tabs=http">assignLicense</a></td>
    </tr>	
  </tbody>
</table>

### MSOL / Azure AD PowerShell のライセンス割り当て関連「以外」のコマンドについて (2024/8/14 最終更新) 

ライセンス割り当てに関するコマンド以外 (例: Connect-MsolService や Get-AzureADUser など) は、**2024 年 3 月 30 日 をもって非推奨となりました**。当初 2023 年 6 月 30 日 に非推奨となる予定でしたが、まだ Microsoft Graph API や新しい PowerShell モジュールで利用できないコマンドがあるために、対応も含め非推奨の日が 2024 年 3 月 30 日まで延期されていました。 

現在は MSOnline モジュール、AzureAD モジュールだけでなく、 AzureADPreview モジュールのコマンドも非推奨になりましたが、新しいコマンドの用意がなく引き続き以前のモジュールを利用しなければならないシナリオにおいて、コマンドの動作や今後の対応について多くお問い合わせをいただいております。今後は、MSOnline バージョン 1.1.166.0 (2017 年) 以降のみ、2025 年 3 月 30 日まで、重要なセキュリティ修正に対してのみサポートが提供されます。なお、1.1.166.0 より前のバージョンを使用すると、**2024 年 6 月 30 日以降、数週間程度でコマンドが動作しなくなるため、現在はコマンドが利用できないといった影響が発生する** 点にご注意ください。 1.1.166.0 以前のモジュールはレガシー認証を利用しており、Microsoft Online サインイン アシスタント パッケージがインストールされていることが特徴です。これらのバージョンを利用している場合は、1.1.166.0 以降の新しいバージョンを利用し、可能な限り早めに新しいモジュール・コマンドに移行してください。

対象となるコマンドは、Connect-MsolService や Get-AzureADUser コマンドだけでなく、 MSOL や AzureAD がつくコマンドすべてです。各モジュールのコマンド一覧は、下記公開情報にて紹介しています。

[MSOnline モジュールのコマンド一覧](https://learn.microsoft.com/ja-jp/powershell/module/msonline/?view=azureadps-1.0#msonline)  
[Azure AD モジュールのコマンド一覧（一般提供版）](https://learn.microsoft.com/en-us/powershell/module/azuread/?view=azureadps-2.0&preserve-view=true)  
[Azure AD モジュールのコマンド一覧（プレビュー版）](https://learn.microsoft.com/en-us/powershell/module/azuread/?view=azureadps-2.0-preview&preserve-view=true)

- MSOnline 1.1.166.0 以降のみ、今後も重要なセキュリティ修正に限定したサポートを提供しますが、それ以外はすべて 2024 年 3 月 30 日をもってすでに非推奨となります。以前のコマンドに関するご質問についてはお答えせず、新しいコマンドを利用するよう案内する場合がございます。 
- 非推奨後は、動作の保証はされません。マイクロソフトは任意のタイミングで、MSOL / Azure AD (Preview) PowerShell の動作を停止する権利を有します。
- ただし、マイクロソフトは使用状況を確認し、お客様が 3 つの PowerShell モジュールから移行するための猶予を提供した上で、これらモジュールの利用を停止させる予定です。
- MSOnline 1.1.166.0 より前のバージョンは、 2024 年 6 月 30 日を目途に動作を停止する見込みです。1.1.166.0 より前のバージョンを使用すると、2024 年 6 月 30 日以降にコマンドが動作しないなど影響が生じる可能性があることをご理解ください。 
- 従来の MSOL / AzureAD モジュールのコマンドでは実施できた操作が、Microsoft Graph API では実施できないものがあります。こうした操作を行う MSOL / Azure AD モジュールのコマンドも最終的には廃止されますが、Microsoft Graph でこれら API の代替の機能が提供されない限り、API およびコマンドレットを停止させることはありません。この対応に際し、非推奨の日付が 2024 年 3 月 30 日に延期されました。現時点でも代替コマンドがないものがあり、それについては引き続き提供されるまで以前のコマンドを利用できます。
- 新しいモジュールのコマンドや代替 API があるものについては、2024/3/30 を過ぎるとすぐに利用できなくなる可能性があるため、引き続き早めに移行ください。
- 2024/3/30 を過ぎても引き続き利用できるコマンド一覧の情報、実際に動作しなくなる具体的なコマンド一覧の情報などはありません。

## いまできること & 確認すること

今すぐ Microsoft Graph PowerShell に移行する準備をお進めください。具体的には下記内容を実施ください。 

1. 現在利用しているコマンドおよびスクリプトなどを確認する。[こちらの記事](https://jpazureid.github.io/blog/azure-active-directory/how-to-determine-depreacated-azuread-msol/) をもとに、MSOL や Azure AD の PowerShell コマンドを利用していないか確認する。
2. MS Online モジュールのバージョンを調べるために、Get-InstalledModule MSOnline  の PowerShell コマンドを実行する。 
3. 古いバージョンを利用している場合は、MSOnline PowerShell の最新バージョン（1.1.183.81）に更新する。これにより、2024 年 6 月 30 日以降の影響を回避できます。 
4. MSOL や Azure AD の PowerShell コマンドを利用している場合、[こちらの公開情報](https://docs.microsoft.com/en-us/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0) にて対応するコマンドを探す。[Find-MgGraphCommand コマンド](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/find-mg-graph-command?view=graph-powershell-1.0) などを利用してコマンドを探す方法などもあります。
5. 2025 年 3 月 30 日までに、既存のスクリプトの書き換え、コマンドの置き換えを実施し、新しいモジュールで動作するよう修正する。もしくは、[Microsoft Entra PowerShell](https://jpazureid.github.io/blog/azure-active-directory/introducing-entra-powershell/) を活用し、以前のコマンドをそのまま実行できるような形に置き換える。
6. 利用中の MSOL や Azure AD コマンドの置き換えとなるものが見つからない、想定したように動作しない場合はマイクロソフト サポートに問い合わせる。

##  本廃止に関する弊社ブログ記事リンク

### アップデート情報 (英語記事翻訳)

- [Azure AD Graph および MSOnline での従来のライセンスの割り当て方法が廃止され Microsoft Graph によるライセンス管理に変わります](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/)
- [Azure AD の変更管理を簡素化します](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-change-management-simplified/)  
- [Microsoft Entra の変更管理のアナウンス (2022 年 9 月の状況)](https://jpazureid.github.io/blog/azure-active-directory/Microsoft-Entra-change-announcements-September-2022-train/#Azure-AD%E3%80%81Azure-AD-Preview%E3%80%81MSOnline-PowerShell-%E3%81%AE%E5%BB%83%E6%AD%A2%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [Microsoft Entra の変更のアナウンス (2023 年 3 月の状況)](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-change-announcements-march-2023-train/)  
- [重要 - Azure AD Graph の廃止と PowerShell モジュールの非推奨](https://jpazureid.github.io/blog/azure-active-directory/important-azure-ad-graph-retirement-and-powershell-module/)
- [重要なお知らせ: Azure AD PowerShell および MSOnline PowerShell モジュールの廃止](https://jpazureid.github.io/blog/azure-active-directory/important-update-deprecation-of-azure-ad-powershell-and-msonline/)
- [Microsoft Entra の更新情報 (2024 年 4 月)](https://jpazureid.github.io/blog/azure-active-directory/what-s-new-in-microsoft-entra-2024-04/)
- [Microsoft Entra の新機能 – 2024年6月](https://jpazureid.github.io/blog/azure-active-directory/whats-new-in-microsoft-entra%E2%80%93june2024/)

### 既存モジュール使用状況について

- [Azure AD Graph / MSOnline PowerShell モジュール利用状況の調べ方](https://jpazureid.github.io/blog/azure-active-directory/how-to-determine-depreacated-azuread-msol/)

### 新しいモジュールへの移行導入

- [MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 2_移行導入編](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement2/)  
- [MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 3_インストール・接続編](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement3/)

### 新しいモジュールの使用方法 (ライセンスに関する操作について)

- [Microsoft Graph PowerShell SDK を使用したライセンス管理操作の紹介](https://jpazureid.github.io/blog/azure-active-directory/operating-license-with-microsoft-graph/)
- [Microsoft Graph PowerShell SDK を使用したライセンス管理操作の紹介 (一括設定編)](https://jpazureid.github.io/blog/azure-active-directory/operating-license-with-microsoft-graph2/)

### 新しいモジュールの使用方法 (ライセンス以外の操作について)

- [MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 4_ユーザー管理](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement4/)
- [MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 5_グループ管理](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement5/)
- [Microsoft Graph PowerShell SDK への移行について 6_ロール割り当て](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement6/)

### Microsoft Entra PowerShell について
- [Microsoft Entra PowerShell の紹介](https://jpazureid.github.io/blog/azure-active-directory/introducing-entra-powershell/)

### よくある質問
- [Azure AD Graph から Microsoft Graph への移行に関する FAQ](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-faq)
