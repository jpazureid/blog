---
title: テナント内の Azure AD デバイスの状態を素早く把握
date: 2022-04-08 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# テナント内の Azure AD デバイスの状態を素早く把握

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2022 年 4 月 8 日に米国の Azure Active Directory Identity Blog で公開された [Understand the state of devices across your organization in seconds](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/understand-the-state-of-devices-across-your-organization-in/ba-p/3118020) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

こんにちは。

ゼロ トラストを用いたセキュリティへのアプローチを採用するには、リスクを十分に把握するために、組織全体を見通せる可視性を確保し、適切な制御をおこなうことが重要です。弊社では Azure AD 製品をご利用いただくうえでお客様が全体をスムーズに見渡せるように取り組んでおります。この度、この新しい方法として、デバイスの概要ブレードが GA となりましたことをお知らせしたいと思います。

![](./understand-the-state-of-devices-across-your-organization/pic.jpg)

デバイスの概要では、テナント全体でのデバイスの ID について主要な情報が表示されます。これにより、現在の状態を簡単に確認し、必要に応じて何らかの対応を取ることも可能です。この概要ページでは、テナント全体での非準拠のデバイスの数や使用されていないデバイスの数、アンマネージド デバイスの数が表示されますので、これらリスクのあるデバイスを通した攻撃から組織を守ることが可能です。このブレードでは、監視のタブより参加の方法や OS の種別ごとにデバイスの分類を確認でき、さらに監査ログの情報や関連するドキュメントにもアクセスが可能です。

デバイスの概要や、今回改善された機能をより活用したい場合は、こちらの [ドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/device-management-azure-portal) をご覧ください。この機能をお試しいただけましたら、感想についてもぜひ共有いただければ幸いです。
