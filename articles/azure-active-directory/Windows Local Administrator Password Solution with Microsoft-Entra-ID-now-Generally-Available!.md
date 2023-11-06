---
title: Microsoft Entra ワークロード ID の新しい App Health 推奨機能
date: 2023-11-08 10:00
tags:
    - Azure AD
    - US Identity Blog
---


こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2023 年 10 月 23 日に米国の Azure Active Directory Identity Blog で公開された [Solution with Microsoft Entra ID now Generally Available!](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/windows-local-administrator-password-solution-with-microsoft/ba-p/3911999) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

本日、Microsoft Entra ID と [Microsoft Intune](https://learn.microsoft.com/ja-jp/mem/intune/protect/windows-laps-overview) を使用した [Windows Local Administrator Password Solution (LAPS)](https://learn.microsoft.com/ja-jp/entra/identity/devices/howto-manage-local-admin-passwords) の一般提供を発表できることを嬉しく思います。この機能は、Microsoft Entra 参加済みデバイスと Microsoft Entra ハイブリッド参加済みデバイスの両方で使用できます。これにより、すべての組織が Windows 上のローカル管理者アカウントを保護してセキュリティを確保し、[Pass-the-Hash(PtH)](https://www.microsoft.com/en-us/download/details.aspx?id=36036) およびラテラル トラバーサル型の攻撃を軽減できるようになります。

2023 年 4 月のパブリック プレビューの発表以来、数千のお客様と数百万のデバイスで Windows LAPS の展開と利用が大幅に進んでいることに、感謝申し上げたいと思います。

この機能は、2023 年 4 月 11 日以降の Windows Update がインストールされた以下の Windows OS プラットフォームで利用可能です:

Windows 11 22H2 
Windows 11 21H2 
Windows 10 20H2, 21H2 and 22H2 
Windows Server 2022 
Windows Server 2019 

Windows LAPS のクライアント側設定を管理するには以下を使用します：


