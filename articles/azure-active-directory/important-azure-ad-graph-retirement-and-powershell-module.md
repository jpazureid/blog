---
title: 重要 - Azure AD Graph の廃止と PowerShell モジュールの非推奨
date: 2023-06-18 09:00
tags:
    - US Identity Blog
---

# 重要 - Azure AD Graph の廃止と PowerShell モジュールの非推奨

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2023 年 6 月 15 日に米国の Azure Active Directory Identity Blog で公開された [Important: Azure AD Graph Retirement and Powershell Module Deprecation](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/important-azure-ad-graph-retirement-and-powershell-module/ba-p/3848270) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

2019 年に、弊社では Azure AD Graph サービスの [非推奨を発表](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) しました。さらに 1 年前、Azure AD Graph が 2023 年 6 月 30 日以降に廃止され機能しなくなることも [お伝え](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363) しました。また、3 つのレガシーな PowerShell モジュール (Azure AD、Azure AD Preview、MS Online) が 2023 年 6 月 30 日に非推奨になることも以前にお伝えしました。

この度、これら変更のタイムラインに関して最新情報を提供するとともに、今後生じる対応についてさらに明確な情報を提供したいと思います。Azure AD Graph と 3 つの PowerShell モジュールに新たな投資は行われないため、**すべてのお客様** が Microsoft Graph API と Microsoft Graph PowerShell SDK への移行を優先し、サポートと機能の継続を確保することが非常に重要となっています。  

しかし、弊社としてまだ多くのお客様がこれらの移行を完了していないことを認識しております。この移行期間中にお客様と協力し、影響を最小限に抑えるために引き続きお客様と共に取り組むことを確認いたします。

## Azure AD Graph に関する更新情報

- 2023 年 6 月 30 日に Azure AD Graph の利用に変更はなく、この日に Azure AD Graph を使用するアプリケーションに影響は生じません。
- 2023 年 6 月 30 日は、Azure AD Graph の非推奨が通知されてから 3 年間が経過したことを意味します。今後、Azure AD Graph API は廃止に向けたサイクルに入ります。
- 当社は Azure AD Graph にこれ以上投資することはなく、Azure AD Graph API にはセキュリティ関連の修正を除き、SLA やメンテナンスの保証は致しません。
- Azure AD Graph は段階的に廃止されていき、アプリケーションが Microsoft Graph API に移行できるよう十分な時間を確保できるようにします。最初のステップでは、今後新規に作成されたアプリケーションで Azure AD Graph API を使用できないようにする予定です。この最初のステップの実施日程は今後発表する予定で、実施日の 3 ヶ月前にはお知らせいたします。
- この廃止に向けたサイクルの各ステップについては、期待されることや必要なアクションの詳細を定期的に発表していきます。

## PowerShell モジュールに関する更新情報

- 以前に [お知らせ](https://jpazureid.github.io/blog/azure-active-directory/migrate-your-apps-to-access-the-license-managements/) したとおり、レガシーな **ライセンス割り当て** PowerShell コマンドレット (Set-AzureADUserLicense、Set-MsolUserLicense、-LicenseAssignment または New-MsolUser の -LicenseOptions パラメーター）および Azure AD Graph API (assignLicense) は廃止されました。これらのコマンドレットおよび API の利用延長を申請されていたお客様については、**2023 年 9 月 30 日** までに Microsoft Graph のライセンス割り当て API/PowerShell への移行を完了する必要があります。
- 当社では Microsoft Graph PowerShell SDK でまだ実現できないいくつかのシナリオにおいて、レガシーな PowerShell モジュールが必要であることを認識しています。そのため、MS Online、AzureAD、AzureAD Preview の PowerShell モジュールの非推奨の期限を **2024 年 3 月 30 日** に延期します。

## 2023 年 6 月 30 日に Azure AD Graph を使用しているアプリケーションはどうなりますか？

2023 年 6 月 30 日のマイルストーンにおいて、Azure AD Graph を使用しているアプリケーションに影響はありません。アプリケーションは引き続き機能しますが、Azure AD Graph API には SLA やメンテナンスの提供がなくなります (セキュリティ関連の修正を除く)。当社は近い将来、廃止に向けた最初のステップ (新しく作成されたアプリケーションが Azure AD Graph を使用しないようにブロックする) のタイムラインと詳細を明確にするべく追加情報を提供する予定です。

## 2023 年 6 月 30 日に Azure AD、Azure AD Preview、または MS Online モジュールを使用する PowerShell スクリプトはどうなりますか？

2023 年 6 月 30 日以降もこれらのレガシー モジュールを使用する PowerShell スクリプトには何の影響もありません。これらのモジュールは、非推奨のアナウンスがあるまで機能し続け、サポートされます。

## 2024 年 3 月 30 日以降、Azure AD、Azure AD-Preview、または MS Online モジュールを使用する PowerShell スクリプトはどうなりますか？

Azure AD、Azure AD Preview、MS Online の PowerShell モジュールは、2024 年 3 月 30 日に非推奨となる予定です。この日以降、これらの PowerShell モジュールに対して提供されるサポートは、Microsoft Graph PowerShell SDK への移行サポートのみとなります。非推奨の発表後、これらの PowerShell モジュールにはセキュリティ修正のみが提供されます。これらのモジュールが非推奨となった後も、最低 6 ヶ月間は動作し続け、その後に廃止される予定です。

当社は、Microsoft Graph プラットフォームへのスムーズな移行を可能にするため、お客様との協力に努めてまいります。弊社はこのプロセスを通じて、さらなるコミュニケーション、移行を支援するツールのアップデート、および明確な情報を定期的に提供する予定です。

## Azure AD Graph とレガシー PowerShell モジュールの現在のサポート状況

- Azure AD Graph は現在非推奨であり、セキュリティ関連の修正のみ提供される予定です。
- Azure AD、Azure AD Preview、および MS Online PowerShell モジュールは、まだ非推奨ではありませんが今後非推奨となります。これらのモジュールはサポートされていますが、新しい機能は追加されません。

## 必要な対応

1. Azure AD Graph を使用しているアプリケーションを特定し、同等の Microsoft Graph API を使用するように移行ください。Microsoft Graph は機能が豊富な API プラットフォームであり、Microsoft Entra、Exchange、Teams、SharePoint、および Microsoft 365 を含む多くの Microsoft サービスで統一された API を提供します。  参考情報: [Azure AD Graph から Microsoft Graph にアプリを移行する](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-overview)
2. レガシー モジュールを使用する PowerShell スクリプトを特定し、Microsoft Graph PowerShell SDK を使用するように更新ください。  参考情報: [Azure AD PowerShell から Microsoft Graph PowerShell に移行する](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/migration-steps?view=graph-powershell-1.0)

最後に、利用可能なツールとして以下をご参照ください。

- Microsoft Graph PowerShell SDK への PowerShell コマンドレットの [マッピング](https://learn.microsoft.com/ja-jp/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0)
- [Microsoft Graph PowerShell 互換性アダプター](https://www.powershellgallery.com/packages/Microsoft.Graph.Compatibility.AzureAD/0.3.0-preview)
- [Azure AD Graph アプリ移行計画のチェックリスト](https://learn.microsoft.com/ja-jp/graph/migrate-azure-ad-graph-planning-checklist)
- [Azure AD Graph を使用している可能性のあるアプリを特定するスクリプト](https://github.com/microsoft/AzureADGraphApps)
