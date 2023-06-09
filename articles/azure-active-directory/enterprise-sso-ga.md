---
title: Apple デバイス向けの Microsoft Enterprise SSO 一般提供開始のお知らせ
date: 2023-06-08 09:00
tags:
    - US Identity Blog
---

# Apple デバイス向けの Microsoft Enterprise SSO 一般提供開始のお知らせ


こんにちは、Azure Identity サポート チームの 長谷川 です。

本記事は、2023 年 5 月 31 日に米国の Microsoft Entra (Azure AD) Blog で公開された [Microsoft Enterprise SSO for Apple Devices Is Now Available for Everyone](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-enterprise-sso-for-apple-devices-is-now-available-for/ba-p/3827395) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

皆さん、こんにちは。

本日は Apple デバイス用の [Microsoft Enterprise SSO プラグイン](https://learn.microsoft.com/ja-jp/mem/intune/configuration/use-enterprise-sso-plug-in-ios-ipados-macos?pivots=all) の一般提供を発表できることを嬉しく思います。このプロダクトは、[Apple のエンタープライズ シングル サインオン](https://developer.apple.com/documentation/authenticationservices) 機能をサポートするすべてのアプリケーションにおいて、macOS、iOS、iPadOS 上の Azure Active Directory (Azure AD) アカウントにシングルサインオン (SSO) を提供します (Azure AD は現在 Microsoft Entra ブランドに統合されています)。
これには最新のライブラリやプロトコルを使用しておらず最新の Microsoft Entra の機能を利用できない可能性のある組織が依存している古いアプリケーションも含まれます。

これにより、互換性のあるアプリケーションは、コードを 1 行も変更することなく、当社が提供する最新のセキュリティおよびアイデンティティ機能の恩恵を受けることができます。また、Microsoft Office、Edge for macOS、Safari など、あなたのお気に入りのアプリケーションもサポートされています。さらに、[Microsoft Intune や JAMF](https://learn.microsoft.com/ja-jp/mem/intune/configuration/use-enterprise-sso-plug-in-macos-with-intune?tabs=prereq-intune%2Ccreate-profile-intune#prerequisites) など、組織が利用しているほとんどのモバイルデバイス管理 (MDM) プロバイダーにも対応しています。  

本プロダクトは、Microsoft と Apple の緊密な連携に加え、金融、航空宇宙、小売の各分野で本製品を利用した数千人のお客様からの素晴らしいフィードバックから生まれました。[こちら](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/apple-sso-plugin)でご確認いただけます。

## アプリケーションを変更することなく、従業員に優れたモバイルSSOを提供することができます！

多くのお客様の組織では、iOS、iPadOS、macOS 上で動作するビジネスに欠かせない基幹業務アプリケーションを開発されていると思いますが、これらのアプリケーションを最新のセキュリティとアイデンティティ機能に対応させることは容易ではありません。場合によっては、これらのアプリケーションはすでに組織を離れたベンダー/従業員によって開発されたものであり改修が困難であることもあります。また、これらのアプリケーションを最新のセキュリティとアイデンティティのベストプラクティスに対応させるためにアップデートするリソースが組織にない場合もあります。

Apple デバイス向けの Microsoft Enterprise SSO の素晴らしいところは、最新機能やセキュリティアップデートのサポート作業を組織から取り除いて、お客様に代わって行うことです。私たちは最新のアップデートを Microsoft Enterprise SSO Plug-In として提供し、常に更新され、管理下にあるあなたの組織のすべてのデバイスに配信されます。このプラグインは、Microsoft Authenticator や Microsoft Company Portal アプリケーションなど、組織がすでに使用しているアプリケーションに提供されます。MDM プロバイダーを正しく設定すると、Microsoft Enterprise SSO Plug-In はネットワークレベルですべての認証要求をリスニングし、必要に応じてプラグインを実行するように動作します。私たちはデバイス上のユーザーを自動的に保持し、利用可能な最新の認証情報でサインインされるようにします。 これによりユーザーに優れた SSO ユーザーエクスペリエンスと優れたセキュリティを同時に提供します！

![](./enterprise-sso-ga/macos-sso-animated.gif)


## Office をはじめ、ご愛用のアプリケーションのほとんどがすでにサポートされています！

自社のアプリケーションだけにとどまらず、[Apple のエンタープライズ シングル サインオン](https://developer.apple.com/documentation/authenticationservices)機能をサポートするあらゆるアプリケーションは、SSO を含む上記のすべてのメリットを得ることができます。これには、すべての macOS、iOS、iPad の Office アプリケーション、macOS の Microsoft Edge、Safari、その他多くのアプリケーションが含まれます。Apple のネットワークライブラリを使用していないアプリケーションは今のところこの機能を利用することはできませんが、将来的にはすべてのアプリケーションが Apple のエンタープライズ SSO 機能をサポートするようになると見込んでいます。

最新のアプリが従業員に最高の Entra エクスペリエンスを提供します。


## さあ、はじめよう
このプロダクトはマイクロソフトとアップルの間で 5 年以上かけて実現したものであり、お客様に導入していただけることを楽しみにしています。Microsoft Enterprise SSO Extension の詳細については[こちらをご覧ください](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/apple-sso-plugin) 。また、導入の準備が整った段階でご利用いただける MDM に特化した導入ガイダンスを[こちら](https://learn.microsoft.com/ja-jp/mem/intune/configuration/use-enterprise-sso-plug-in-ios-ipados-macos?pivots=all)でご案内しています。

Microsoft Enterprise SSO Extension をより深く理解したい方は、[SSO for Azure AD on Apple Platforms](https://www.youtube.com/watch?v=1k2EDEnRgz8) に関するビデオをご覧ください。また、[Apple デバイスを条件付きアクセスと統合する](https://www.youtube.com/watch?v=7_ec_qFbvGw&t=279s)ことをお勧めします。最後に、Microsoft Enterprise SSO Extension のトラブルシューティングが必要な場合は、[トラブルシューティング ガイド](https://learn.microsoft.com/ja-jp/azure/active-directory/devices/troubleshoot-mac-sso-extension-plugin)を参照してください。


よろしくお願いします。
Alex Simons (@alex_a_simons) 
CVP of Product 
Microsoft Identity and Network Access Division
