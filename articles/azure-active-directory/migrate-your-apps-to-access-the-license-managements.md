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

本日は、2021 年 8 月 26 日に米国の Azure Active Directory Identity Blog で公開された [Migrate your apps to access the license managements APIs from Microsoft Graph](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/migrate-your-apps-to-access-the-license-managements-apis-from/ba-p/2464366) を意訳したものになります。

> [!NOTE]
> 2021/10/07: Microsoft Graph PowerShell を使用したライセンス管理操作のより詳細な手順につきましては、以下の技術ブログにて紹介しておりますので、こちらもぜひ参照ください。<br>
> [Microsoft Graph PowerShell を使用したライセンス管理操作の紹介](https://jpazureid.github.io/blog/azure-active-directory/operating-license-with-microsoft-graph/)

> [!NOTE]
> MSOnline および Azure AD PowerShell におけるライセンス割り当て API の廃止は 2022 年 6 月 30 日から 2023 年 3 月 31 日に延期されました。
> 詳しくは [Azure AD の変更管理を簡素化します](../azure-active-directory/azure-ad-change-management-simplified.md) の記事を参照ください。

ご不明点等ございましたらサポート チームまで遠慮なくお問い合わせください。

## ライセンス割り当て API の廃止

[Azure Active Directory (Azure AD) Graphのサポートが 2022 年 6 月 30 日に終了する](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) ため、Microsoft Graph を使用するようアプリケーションをアップデートするよう [6 月にご案内いたしました](https://jpazureid.github.io/blog/azure-active-directory/have-you-updated-your-applications-to-use-the-microsoft/)。これ以降、Azure AD Graph を使用するアプリは、Azure AD Graph エンドポイントからの応答を受け取れなくなります。 

Azure AD Graph API の廃止に伴い、MSOnline および Azure AD PowerShell モジュールでのライセンス割り当て操作も利用できなくなります。運用への影響を軽減するために、Microsoft Graph エンドポイントのライセンス割り当て API を使用するよう既存のアプリケーションを更新するとともに、Microsoft Graph PowerShell モジュールを使用できるようにスクリプトを更新することをお勧めいたします。MSOnline および Azure AD PowerShell モジュールにおけるその他の操作には影響はありません。

> [!IMPORTANT]
> MSOnline および Azure AD PowerShell モジュール自体も 2023 年 6 月 30 日に廃止されることが発表されておりますので Microsoft Graph API への移行を検討ください。
> 詳しくは [Microsoft Entra の変更管理のアナウンス (2022 年 9 月の状況)](../azure-active-directory/Microsoft-Entra-change-announcements-September-2022-train.md) の記事を参照ください。

以下の表は、2023 年 3 月 31 日以降、利用できなくなる操作の一覧です

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

