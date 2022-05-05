---
title: FIDO 標準の拡張と Microsoft のパスワードレス ソリューションへの新たなアップデート
date: 2022-05-06 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# FIDO 標準の拡張と Microsoft のパスワードレス ソリューションへの新たなアップデート

こんにちは、Azure Identity サポート チームの 村上 です。

本記事は、2022 年 5 月 5 日に米国の Azure Active Directory Identity Blog で公開された [Expansion of FIDO standard and new updates for Microsoft passwordless solutions](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/expansion-of-fido-standard-and-new-updates-for-microsoft/ba-p/3290633) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

皆さん、こんにちは。

そして、Happy World Password Day! 本日は、素晴らしいニュースをお伝えしたいと思います。Microsoft は、FIDO アライアンスと World Wide Web コンソーシアムによって作成された共通のパスワードレス標準の拡張を、FIDO アライアンスならびに他の主要なプラットフォームと共にサポートすることを発表いたしました。これらのマルチ デバイスの FIDO 資格情報は、パスキーとも呼ばれるものであり、パスワードのない世界に向けた記念すべき一歩を意味します。また、Azure Active Directory (Azure AD) とWindows におけるパスワードレス ソリューションにおいてもいくつかの素晴らしいアップデートが予定されており、パスワードレスをより多くのユース ケースで利用可能になる予定です。

パスワードは、私たちのデジタル世界での営みを守る上で、決して十分な仕組みではありません。Vasu Jakkal 氏が [本日報告](https://www.microsoft.com/security/blog/2022/05/05/this-world-password-day-consider-ditching-passwords-altogether/) したように、毎秒 921 回以上のパスワード攻撃が発生しています。多くの攻撃者があなたのパスワードを狙っており、あなたからそれを盗もうとし続けるでしょう。パスワードから脱却し、攻撃を断ち切ることが必要です。

## パスワードをパスキーに置き換える

パスキーは、より安全で速く、より簡単であり、パスワードの代わりとなるものです。パスキーを使えば、顔認証、指紋認証、デバイスの PIN を使うだけで、サポートされているあらゆるウェブサイトやアプリケーションにサインインすることができます。パスキーは、高速でフィッシング耐性があり、主要なデバイスとプラットフォームでサポートされる予定です。また、パスキーは同じプラットフォーム上の複数のデバイス間で同期することができるため、デバイスごとに登録する必要がなく、デバイスのアップグレードや紛失の際にも保護されます。現在、Windows Hello を利用することでパスキーをサポートするサイトにサインインが可能です。近い将来、Apple や Google のデバイス上からパスキーを使用して Microsoft アカウントにサインインできるようになります。
 
ぜひウェブサイトの所有者やアプリ開発者の皆様においては、Microsoft、Apple、Google および FIDO アライアンスに参加してパスキーをサポートし、私たちのビジョンである真のパスワードレスの世界の実現に貢献いただければと思っています。

![](./expansion-of-fido-standard-and-new-updates-for-microsoft/FIDO_passkey_image.jpg)

## パスワードレスにむけて

マイクロソフトは、Windows Hello の FIDO2 認証など、FIDO 標準の [初期からのサポーター](https://techcommunity.microsoft.com/t5/windows-it-pro-blog/windows-hello-fido2-certification-gets-you-closer-to/ba-p/534592) として取り組んできました。パスキーをサポートするよう FIDO 標準のエコ システムを進化させ、パスワードレス認証の普及が勢いを増しているのはとても喜ばしいことです。

約 5 年前にパスワードレス サインインの導入を開始して以来、毎月パスワードを使わずにサインインするユーザー数は、Microsoft のサービス全体で 2 億 4 千万人以上に達しています。また、この半年間で 33 万人以上の方が、Microsoft アカウントから [パスワードを削除する](https://www.microsoft.com/security/blog/2021/09/15/the-passwordless-future-is-here-for-your-microsoft-account/) という次のステップに進んでいます。結果として、パスワードがなければパスワード ベースの攻撃から完全に保護されるのです。

本日、併せて企業がより簡単に、そして完全なパスワードレスを実現するための新機能も発表いたします。

## Windows 365、Azure Virtual Desktop、Virtual Desktop Infrastructure 向けのパスワードレス

リモートもしくはハイブリッドでの業務が一般的となった今、多くの人がリモートもしくはバーチャルデスクトップを使用して業務を遂行してます。この度、パスワードレスを Windows 365、Azure Virtual Desktop、Virtual Desktop Infrastructure でサポートいたします。現在は Windows 11 Insider でプレビュー中ですが、今後 Windows 10 でも利用可能とする予定です。

## Windows Hello for Business クラウド信頼

Windows Hello for Business クラウド信頼は、ハイブリッド環境向けの Windows Hello の展開作業をよりシンプルにします。この新しい展開モデルでは、従来の要件であった公開鍵基盤 (PKI) に加え、Azure AD とオンプレミスの AD 間の公開鍵の同期が不要となります。この改善により、ユーザーが Windows Hello for Business をプロビジョニングしてから認証できるまでの遅延がなくなり、Windows Hello for Business を使用してオンプレミスのリソースやアプリケーションにアクセスすることがこれまで以上に容易になりました。[クラウド信頼](https://docs.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-cloud-trust) は、Windows 10 21H2 および Windows 11 21H2 において、プレビューとして利用可能です。

## Microsoft Authenticator で複数のパスワードレス アカウントを利用

Azure AD (職場または学校のアカウント) にパスワードレス サインインを導入した当初、Microsoft Authenticator では 1 つのパスワードレス アカウントしか利用できませんでした。この度その制限が撤廃され、いくらでも登録が可能となります。今月末から iOS ユーザーは、この機能を利用できるようになり、その後 Android でも利用できるようになる予定です。

![Microsoft Authenticator を使用した Azure AD アカウントでのパスワードレス電話サインイン_](./expansion-of-fido-standard-and-new-updates-for-microsoft/sdriggers_0-1651671669087.png)

## Azure AD 一時アクセス パス

Azure AD の一時アクセス パスは、[時間制限のあるパスコード](https://docs.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-temporary-access-pass) です。パブリック プレビューの時から企業で大きな反響を呼んでおり、今夏の機能リリースに向けて、さらに利用範囲を広げようと取り組んでいます。多くのお客様から、新しい Windows デバイスをセットアップする際にパスワードの代わりに一時アクセス パスを配布したいとの声をいただいています。一時アクセス パスは、初回サインイン、Windows Hello の設定、Azure AD へのデバイスの参加に使用できるようになります。このアップデートは来月提供される予定です。

![Windows 11 のオンボーディングにおける一時アクセス パスのユーザー体験](./expansion-of-fido-standard-and-new-updates-for-microsoft/sdriggers_1-1651671669096.png)

## パスワードレスの導入を進めているお客様

Microsoft の主要なお客様において、すでにパスワードレス ソリューションを導入している素晴らしい例がいくつかございます。例えば Avanade 社は、顧客のデータをセキュリティ侵害から保護するために [Feitian 社の支援を受けてパスワードレスを実現](https://customers.microsoft.com/en-us/story/1478724941851112337-avanade-partner-professional-services-teams) しました。在宅医療とホスピス ケアを提供する Amedisys 社は、患者の個人情報を保護するために [パスワードレスを導入](https://customers.microsoft.com/en-us/story/1429879293982833570-amedisys-health-provider-security) しました。両社とも、セキュリティの強化だけでなく、エンドユーザーにとってサインインがより簡単になるよう、パスワードレス認証の利用に取り組んでいます。

いつものように皆様のコメントをおまちしております。[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/authentication/howto-authentication-passwordless-deployment) をご覧いただき、さらに詳しい情報は [aka.ms/gopasswordless](https://aka.ms/gopasswordless) でご確認ください。
