---
title: AD FS 移行ツールを利用してクラウド認証に移行しましょう！
date: 2024-07-23 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# AD FS 移行ツールを利用してクラウド認証に移行しましょう！‘

こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2024 年 6 月 26 日に米国の Microsoft Entra Blog で公開された [Move to cloud authentication with the AD FS migration tool!](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/move-to-cloud-authentication-with-the-ad-fs-migration-tool/ba-p/4174841) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

この度、Active Directory Federation Service (AD FS) をご利用のお客様のアプリケーションを、Microsoft Entra ID に移行するための [移行ツール](https://setup.cloud.microsoft/entra/migrate-ad-fs-to-microsoft-entra-id) が一般公開となりました！お客様は、Microsoft Entra ID に移行可能なアプリケーションを簡単に特定して、それらの AD  FS アプリケーションの互換性を評価することができるようになりますので、より高い監視機能とセキュリティ基盤を備えた ID 管理システムに乗り換えが可能となります。

11 月に [AD FS Application Migration](https://techcommunity.microsoft.com/t5/security-compliance-and-identity/introducing-ad-fs-application-migration-your-path-to-simplicity/ba-p/3980232) のパブリック プレビューへの移行を発表し、パートナーやお客様からは高評価をいただきました。クラウドベースのセキュリティへの移行は大変な作業ですが、このツールにより Microsoft Entra ID への移行を非常に効率よく実施することが可能であることが証明されました。

作業の内容が簡素化され、手作業が減少し、(アプリケーションとエンドユーザーの) ダウンタイムが最小限に抑えられたことで、お客様のストレスが軽減されました。またこのツールは、お客様のアプリケーションと Entra ID の互換性をチェックするだけでなく、問題を検知した場合には解決方法も提案します。その後、移行の進捗を監視し、アプリケーションに対して行われた最新の変更内容も反映します。詳細な動作については [デモ](https://www.youtube.com/watch?v=qJYmEOK6UJo) をご覧いただき、ツールの実際の動作をご確認ください。

![AD FS から、より柔軟で即応性のあるクラウドネイティブ ソリューションに移行することで、これまでの古い ID 管理固有の制限を克服できます。](./move-to-cloud-authentication-with-the-ad-fs-migration-tool!/1.jpg)

より強固なセキュリティに加え、一元化された管理センターによる可視性と管理性の向上、およびサーバー コストの削減も、最新の ID 管理に移行することで得られるメリットとして挙げられます。さらに、Entra ID の機能である多要素認証 (MFA) と条件付きアクセス ポリシーにより、お客様はより高いセキュリティとコンプライアンスを実現可能です。これらは、[ゼロ トラスト](https://www.microsoft.com/ja-jp/security/business/zero-trust) の重要な基盤ともなります。

Entra ID のその他の機能は以下のとおりです:

- より良いユーザー体験を実現するための [パスワードレス](https://www.microsoft.com/ja-jp/security/business/solutions/passwordless-authentication) および MFA
- カスタマイズと拡張のための豊富な [アプリ、API、SDK、コネクタ](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-integrated-apps)
- る条件付きアクセスを定義し監視するための [きめ細やかなアクセス制御機能](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-conditional-access)
- 従業員が自身の ID を安全に管理できる [セルフサービス ポータル](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-user-self-service-portals)

Microsoft Entra についてもっと知りたい場合には、[こちら](https://www.microsoft.com/ja-jp/security/business/microsoft-entra) をご覧ください。また、Microsoft Learn から、[AD FS アプリケーション移行ガイド](https://learn.microsoft.com/ja-jp/entra/identity/enterprise-apps/migrate-ad-fs-application-howto) も併せてご覧いただけますと幸いです。

ご不明な点等ございましたら、[こちら](https://feedback.azure.com/d365community/forum/22920db1-ad25-ec11-b6e6-000d3a4f0789) までお寄せください。

Melanie Maynes  
Director of Product Marketing
