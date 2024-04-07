---
title: "重要なお知らせ: Azure AD PowerShell および MSOnline PowerShell モジュールの廃止"
date: 2024-04-07 10:00
tags:
    - US Identity Blog
---

# 重要なお知らせ: Azure AD PowerShell および MSOnline PowerShell モジュールの廃止

こんにちは！ Azure ID チームの小出です。

本記事は 2024 年 4 月 1 日に米国の Microsoft Entra (Azure AD) Blog で公開された [Important update: Deprecation of Azure AD PowerShell and MSOnline PowerShell modules](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/important-update-deprecation-of-azure-ad-powershell-and-msonline/ba-p/4094536) をの抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

なお、日本語での詳細情報のまとめは、[MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 1_概要](https://jpazureid.github.io/blog/azure-active-directory/azuread-module-retirement1/) にて案内しております。この記事の内容も反映しておりますので、併せてご確認ください。

---

2021 年に、Microsoft Entra の PowerShell 提供元として、今後は Microsoft Graph PowerShell SDK に投資すること、また Azure AD および MSOnline PowerShell モジュールからの [移行計画について発表](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/automate-and-manage-azure-ad-tasks-at-scale-with-the-microsoft/ba-p/1942489) いたしました。2023 年には、Azure AD と MSOnline PowerShell モジュールの非推奨化を 2024 年 3 月 30 日に行うと [発表](https://jpazureid.github.io/blog/azure-active-directory/important-azure-ad-graph-retirement-and-powershell-module/) しました。その後、Microsoft Graph PowerShell SDK に不足していた機能の解消が大幅に進み、**2024 年 3 月 30 日をもって、これらの PowerShell モジュールは非推奨となりました**:

- [Azure AD PowerShell](https://learn.microsoft.com/ja-jp/powershell/azure/active-directory/overview?view=azureadps-2.0) (AzureAD)
- [Azure AD PowerShell Preview](https://www.powershellgallery.com/packages/AzureADPreview/2.0.2.149) (AzureADPreview)  
- [MS Online](https://learn.microsoft.com/ja-jp/powershell/azure/active-directory/install-msonlinev1?view=azureadps-1.0) (MSOnline)  

以前のコマンドを利用しているスクリプトは、速やかに Microsoft Graph PowerShell SDK に移行ください。これらのモジュールの廃止に関する情報は、以下を参照ください。

## 2024 年 3 月 30 日以降に MSOnline と Azure AD モジュールはどうなりますか？

2024 年 3 月 30 日をもって、Azure AD、Azure AD Preview、および MS Online PowerShell モジュールは非推奨となりました。重要なセキュリティ修正に対してのみサポートが提供されます。これらのモジュールは 2025 年 3 月 30 日まで機能し続けます。

**注**: 2025 年 3 月 30 日まで機能することが保証されているのは、MSOnline バージョン 1.1.166.0 (2017 年) 以降のみです。1.1.166.0 より前のバージョンを使用すると、2024 年 6 月 30 日以降にモジュールが動作しないなどの問題が発生する可能性があります。

下記の対応をできるだけ早く実施ください。

1. Azure AD または MS Online PowerShell モジュールを使用しているスクリプトを環境内で特定します。
2. 1.1.166.0 未満の MS Online バージョンを使用しているスクリプトを移行するために早急に措置を講じてください。Microsoft Graph PowerShell に移行する準備ができていない場合は、MSOnline PowerShell の最新バージョン ([1.1.183.81](https://www.powershellgallery.com/packages/MSOnline/1.1.183.81)) に更新することで、2024 年 6 月 30 日以降の影響を回避できます。MS Online モジュールのバージョンを調べるには、Get-InstalledModule MSOnline  の PowerShell コマンドを使用ください。
3. 2025 年 3 月 30 日までに、すべての MS Online (最新バージョン) と Azure AD PowerShell スクリプトを Microsoft Graph に移行するよう計画ください。
4. これらのスクリプトを Microsoft Graph PowerShell SDK を使用するように移行します。

弊社では、Entra を管理するための PowerShell に対して、現在も将来も大きな投資を行ってまいります。今後数ヶ月のうちに新たな改善について発表しますので、今後の情報にご期待ください。

## Microsoft Graph PowerShell SDK について

Microsoft Graph PowerShell SDK は、Microsoft Entra ID を含む Microsoft Graph の API 全面に対するコマンドレットを提供します。クロスプラットフォームと PowerShell 7 をサポートし、最新の認証機能を提供すると共に、今後も定期的に更新されます。Microsoft Graph PowerShell SDK については、下記に様々なリソースが用意されておりますので併せてご確認ください。

- [Microsoft Graph PowerShell SDK overview](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/overview?view=graph-powershell-1.0)
- [Migrate from Azure AD PowerShell to Microsoft Graph PowerShell](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0)
- [Azure AD PowerShell から Microsoft Graph PowerShell への移行に関する FAQ](https://learn.microsoft.com/ja-jp/powershell/azure/active-directory/migration-faq?view=azureadps-2.0)
- [Find Azure AD and MSOnline cmdlets in Microsoft Graph PowerShell](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0)
- [Microsoft Graph Compatibility Adapte](https://www.powershellgallery.com/packages/Microsoft.Graph.Compatibility.AzureAD/0.6.0-preview)
