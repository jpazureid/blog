---
title: AD FS 移行ツールでクラウド認証に移行しましょう!
date: 2024-07-31 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# AD FS 移行ツールでクラウド認証に移行しましょう!

こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2024 年 6 月 26 日に米国の Microsoft Entra Blog で公開された [Move to cloud authentication with the AD FS migration tool!](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/move-to-cloud-authentication-with-the-ad-fs-migration-tool/ba-p/4174841) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

この度、Active Directory Federation Service (AD FS) をご利用のお客様のアプリケーションを、Microsoft Entra ID に移行するための[移行ツール](https://setup.cloud.microsoft/entra/migrate-ad-fs-to-microsoft-entra-id)が一般公開されました！今後お客様は、移行可能なアプリケーションを迅速に特定し、すべての AD  FS アプリケーションの互換性を評価することで、より広範囲な監視とセキュリティ インフラストラクチャによる ID 管理を開始することができます。

11 月に AD FS Application Migration のパブリック プレビューへの移行を発表しましたが、パートナーやお客様からは高評価をいただきました。つまり、クラウドベースのセキュリティへの移行は大変な作業ですが、このツールは Microsoft Entra ID への移行を非常に効率よく実施することが可能であることを証明しました。

ワークフローが簡素化され、手作業が減少し、（アプリケーションとエンドユーザーの）ダウンタイムが最小限に抑えられたことで、お客様のストレスが軽減されました。また、このツールは、お客様のアプリケーションと Entra ID の互換性をチェックするだけでなく、問題を検知した場合には解決方法も提案します。その後、移行の進捗を監視し、最新状態のアプリケーションへと変更されます。詳細な動作については[デモ](https://www.youtube.com/watch?v=qJYmEOK6UJo)をご覧いただき、ツールの実際の動作をご確認ください。
