---
title: テナントの正常性の透明性と監視
date: 2024-05-25 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# テナントの正常性の透明性と監視

こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2024 年 5 月 8 日に米国の Microsoft Entra Blog で公開された [Tenant health transparency and observability](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/tenant-health-transparency-and-observability/ba-p/4127612) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

今までの回復性に関するブログ記事では、[地域ごとに分離された認証エンドポイント](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-resilience-update-workload-identity-authentication/)に関する最新のアップデートや、昨年の業界初の[バックアップ認証サービス](https://jpazureid.github.io/blog/azure-active-directory/advances-in-azure-ad-resilience/)に関する発表など、継続的に耐障害性と信頼性に関する改善に努め、最新の情報をお伝えしてきました。このような、水面下でのイノベーションにより、毎月世界全体で安定した非常に高い可用性の提供を実現しております。

この記事では、Microsoft Entra がどのようにして可用性と耐障害性を確保しているかをお客様にもお分かりいただけるよう、概要をお話ししてまいりたいと思います。これは、障害が発生した際に弊社が説明責任を果たせるようにするためというだけでなく、お客様のテナントにてどのようなアクションを取ることで正常性を高めていけるのかということを、よりよく理解するためでもあります。グローバル レベルでは、過去の可用性を [SLA レポート](https://learn.microsoft.com/ja-jp/entra/identity/monitoring-health/reference-sla-performance)で確認することが可能です。認証の可用性が、お約束している 99.99% ([2021年春に開始](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/99-99-uptime-for-azure-active-directory/ba-p/1999628)) を大きく上回り、ほとんどの月で 99.999% に到達しています。しかし、各テナントのレベルで可用性を確認しなければ、説得力も実効性もありません。自社テナントのアプリやデバイスを使うユーザーに対する稼働時間はどうなのか？サインインの数が急増したときに自社のテナントはきちんとそれに対応できているのか？というのが大事なポイントなのです。
