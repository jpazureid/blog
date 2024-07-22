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

![](./move-to-cloud-authentication-with-the-ad-fs-migration-tool!/1.jpg)
AD FS から、より機敏で応答性の高いクラウドネイティブ ソリューションに移行すると、以前までの ID 管理方法に存在した制限の一部を克服できます。

より強固なセキュリティに加え、一元化された管理センターによる可視性と制御の向上、およびサーバーコストの削減も、最新の ID 管理に移行することで得られるメリットとして挙げられます。さらに、Entra ID の機能は、[ゼロ・トラスト](https://www.microsoft.com/ja-jp/security/business/zero-trust)の重要な基盤となる多要素認証 (MFA) と条件付きアクセス ポリシーによって、組織がより良いセキュリティとコンプライアンスを実現することに役立ちます。

Entra ID のその他の機能は以下の通りです：
・より良いユーザーエクスペリエンスのための[パスワードレス](https://www.microsoft.com/ja-jp/security/business/solutions/passwordless-authentication)および MFA
・カスタマイズと拡張のための豊富な[アプリ、API、SDK、コネクタ](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-integrated-apps)のセット
・[詳細なアクセス制御](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-conditional-access)による条件付きアクセスの定義と監視
・従業員自身の ID を安全に管理できる[セルフサービス・ポータル](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-user-self-service-portals)

Microsoft Entra についてもっと知りたい場合には、[こちら](https://www.microsoft.com/ja-jp/security/business/microsoft-entra)をご覧ください。また、Microsoft Learn から、[AD FS アプリケーション移行ガイド](https://learn.microsoft.com/ja-jp/entra/identity/enterprise-apps/migrate-ad-fs-application-howto)も併せてご覧いただけますと幸いです。

ご不明な点等ございましたら、[こちら](https://feedback.azure.com/d365community/forum/22920db1-ad25-ec11-b6e6-000d3a4f0789)までお寄せください。

Melanie Maynes
Director of Product Marketing
