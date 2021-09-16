---
title: Azure AD Graph および MSOnline での従来のライセンスの割り当て方法が廃止され Microsoft Graph によるライセンス管理に変わります
date: 2021-09-17 9:00
tags:
 - Azure AD
 - US Identity Blog
 - Microsoft Graph
---

# Azure AD Graph および  MSOnline での従来のライセンスの割り当て方法が廃止され Microsoft Graph によるライセンス管理に変わります

こんにちは、Azure Identity サポート チームの 馮 です。

本日は、2021 年 8 月 26 日に米国の Azure Active Directory Identity Blog で公開された [Migrate your apps to access the license managements APIs from Microsoft Graph](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/migrate-your-apps-to-access-the-license-managements-apis-from/ba-p/2464366) を元に、今後推奨されるライセンス割り当て方法について紹介いたします。英語記事の翻訳内容に加え、Microsoft Graph PowerShell を用いた今後の推奨手順をお纏めしましたので、ぜひご参照ください。

ご不明点等ございましたらサポート チームまで遠慮なくお問い合わせください。

## ライセンス割り当て API の廃止

[Azure Active Directory (Azure AD) Graphのサポートが 2022 年 6 月 30 日に終了する](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) ため、Microsoft Graph を使用するようアプリケーションをアップデートするよう [6 月にご案内いたしました](https://jpazureid.github.io/blog/azure-active-directory/have-you-updated-your-applications-to-use-the-microsoft/)。これ以降、Azure AD Graph を使用するアプリは、Azure AD Graph エンドポイントからの応答を受け取れなくなります。 

Azure AD Graph API の廃止に伴い、MSOnline および Azure AD PowerShell モジュールでのライセンス割り当て操作も利用できなくなります。運用への影響を軽減するために、Microsoft Graph エンドポイントのライセンス割り当て API を使用するよう既存のアプリケーションを更新するとともに、Microsoft Graph PowerShell モジュールを使用できるようにスクリプトを更新することをお勧めいたします。MSOnline および Azure AD PowerShell モジュールにおけるその他の操作には影響はありません。

以下の表は、2022 年 6 月 30 日以降、利用できなくなる操作の一覧です。

<table>
  <thead>
    <tr>
      <th>既存のコマンド (2022 年 6 月 30 日以降、利用できなくなる操作)</th>
      <th>今後使用が推奨される Microsoft Graph PowerShell および API</th>
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

## 次のステップ: 新しいライセンス管理プラットフォーム

現在のライセンス管理機能は、グループベースのライセンスなど新機能の登場によりお客様のニーズに対応して成長してきました。しかし、お客様のニーズの変化に伴い、私たちはオンライン サービスのライセンス割り当てプラットフォームを再構成することを決定しました。将来のプラットフォームの変更は以下 4 つの主要な目標を念頭に置き設計されています。

- 柔軟性: 単一の管理構造や一つの巨大なユーザー グループ、単一のテナントを超えた拡張性を提供する。
- 簡潔性: 不必要な複雑さを減らし、エンド ユーザーへのライセンス割り当てをシンプルにする。
- 迅速性: 購入したライセンスに迅速にアクセスできるようにする。
- 正確性: 購入したライセンスと割り当て可能なライセンスをわかりやすく表示する。

このビジョン全体を実現するには時間を要しますが、本日、ビジョンの実現に向けた最初のマイルストーンをご紹介します。2022 年の第 1 四半期から、お客様は新しいライセンス管理プラットフォームの使用を選択できるようになります。このマイルストーンの一環として以下の機能が提供されます。

- ライセンスの分配機能により、ライセンスを小さな単位に分けて使用するライセンス数に制限を設けたり、所有権を委任して管理できるようになります。
- グループベースのライセンス割り当て機能が拡張されます。新しいライセンス割り当てプラットフォームでは、グループ ベースのライセンス割り当てに Azure AD Premium または Office 365 E3 ライセンスは必要なくなります。加えて、ライセンス割り当て対象として入れ子 (ネスト) グループが利用可能となります。
- 新しいライセンスの種類として、[デバイスベースのライセンス](https://docs.microsoft.com/ja-jp/deployoffice/device-based-licensing) や [ISV アプリのライセンス](https://powerapps.microsoft.com/en-us/blog/partners-introducing-a-new-way-to-manage-and-enforce-licenses-for-your-products/) などが新プラットフォームにてネイティブに動作します。
  
今後は、新しいライセンス管理プラットフォームの利用方法や、新機能を活用するための新しい API や PowerShell オプションの詳細などをご紹介していく予定です。

## Microsoft Graph PowerShell を用いたライセンス割り当て手順

[PowerShell を用いた従来のライセンス割り当て操作](https://docs.microsoft.com/ja-jp/microsoft-365/enterprise/assign-licenses-to-user-accounts-with-microsoft-365-powershell?view=o365-worldwide) の代替として、Microsoft Graph PowerShell を用いた手順をお纏めしましたので皆様のご参考となれば幸いです。参考情報としては [Set-MgUserLicense](https://docs.microsoft.com/ja-jp/powershell/module/microsoft.graph.users.actions/set-mguserlicense?view=graph-powershell-1.0) をご覧ください。

以下では、テンプレート ユーザー（templateuser@contoso.com）に割り当てられたライセンス情報に基づいて、ユーザー (user@contoso.com) に新たにライセンスを追加する例を説明します。

1. 準備として Microsoft Graph PowerShell モジュールをインストールします。
   
```powershell
Install-Module -Name Microsoft.Graph
```

参考情報：[Microsoft Graph PowerShell SDK をインストールする](https://docs.microsoft.com/ja-jp/graph/powershell/installation)

2. 下記のコマンドを実行し、サインインとライセンス管理に必要なアクセス許可への同意を行います。認証画面がポップアップしますので、グローバル管理者アカウントでサインインします。アクセス許可の同意が求められますので、[承諾] をクリックします。
   
```powershell
Connect-MgGraph -Scopes "User.ReadWrite.All"
```

3. ライセンスを割り当てるためには、割り当てるライセンスの SkuId が必要となるので、Get-MgUserLicenseDetail コマンドを利用し、Skuld プロパティを取得します。

```powershell
$LicenseDetail = Get-MgUserLicenseDetail -UserId templateuser@contoso.com
$SkuId = $LicenseDetail.SkuId
```

4. SkuId を指定した MicrosoftGraphAssignedLicense オブジェクトを作成します。
   
```powershell
$License = New-Object -TypeName Microsoft.Graph.PowerShell.Models.MicrosoftGraphAssignedLicense -Property @{SkuId = $SkuId}
```

5. AddLicenses パラメーターに手順  4 にて作成した $Licenses オブジェクトを指定し、 ユーザーに割り当てます。なお、RemoveLicenses パラメータは必須なので、空の配列を指定します。
   
```powershell
Set-MgUserLicense -UserId User@contoso.com -AddLicenses @($License) -RemoveLicenses @()
```

以上で、ライセンス割り当ては完了となります。

なお、Microsof Graph PowerShell では、手順５にて [Set-MgGroupLicense](https://docs.microsoft.com/ja-jp/powershell/module/microsoft.graph.groups/set-mggrouplicense?view=graph-powershell-1.0) を実行することで、グループに対するライセンス割り当てを行うことも可能です。

上記手順が皆様の参考となれば幸いです。
