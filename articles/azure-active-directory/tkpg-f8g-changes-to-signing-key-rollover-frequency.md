---
title: TKPG-F8G 署名キーのロールオーバー頻度の変更について
date: 2021-12-02 10:00
tags:
  - Azure AD
  - Security
---

# TKPG-F8G 署名キーのロールオーバー頻度の変更について

2021-12-01 にサービス正常性通知の TKPG-F8G にて通知されております、「Action recommended: Azure Changes to Signing Key Rollover Frequency description: Active: Action recommended: Azure Changes to Signing Key Rollover Frequency service」について、具体的な通知の内容について解説いたします。

> You're receiving this notice because you use Azure Active Directory (Azure AD).
At Microsoft, we want to ensure that we're providing our customers with frequently rotated signing keys for security tokens. This announcement is a courtesy notification to Azure AD application developers that we're making changes to the signing key rotation frequency.
> What is the Microsoft Identity change?
> To provide greater security for signing key rollover, there will be a gradual increase in the frequency of key rollovers starting in December until a one-week frequency is reached over the course of several months.
> Previously, Microsoft informed customers that the Microsoft identity platform's signing key rolls on a periodic basis and, in the case of an emergency, could be rolled over immediately. There will continue to be no set or guaranteed time between these key rolls. Any application that integrates with the Microsoft identity platform should be prepared to handle a key rollover event no matter how frequently it may occur.
> 
> Am I affected by this change?
> How your application handles key rollover depends on variables such as the type of application or what identity protocol and library was used. As such, not all Azure AD applications will be affected.
> Please reference our documentation and follow the instructions to assess if your application will be affected. If your application will be affected, follow the guidance on how to update the application to support automatic key rollover or manually update the key to prevent impact.
> If you have any questions or concerns, please contact us.

## OverView

Azure AD では OpenID Connect などの標準技術を利用し、公開鍵基盤を利用したアプリケーション間の信頼を構成しています。具体的には Azure AD が保持する秘密鍵を利用しトークンに署名を行い、連携先のアプリケーションはメタデータとして公開されている公開鍵を利用し、署名の検証を行いトークンの有効性を確認します。

メタデータとして公開されている公開鍵は、これまでもセキュリティ上の理由から定期的にロールオーバーされていました。一方でそのロールオーバーがより頻繁に行われるようになる旨を今回の通知ではご案内しております。具体的には、これまで約 6 週おきにロールオーバーされていたものが 12 月から順次更新間隔を短くし、数ヶ月かけて 1 週間の頻度に達するようにします。

- [Microsoft ID プラットフォームでの署名キーのロールオーバー | Microsoft Docs](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-signing-key-rollover?WT.mc_id=Portal-Microsoft_Azure_Health#overview-of-signing-keys-in-the-microsoft-identity-platform)

通常、ライブラリがメタデータの定期的なチェックし、公開鍵の自動更新を実装していることが一般的です。しかしながら、ライブラリがメタデータの定期チェックを実装していない、あるいはメタデータの自動更新を実装していない独自アプリは、今回の変更の影響を受ける可能性があります。

## 私のアプリは影響を受けますか？

本影響は貴社アプリ内にて、トークンの署名検証を行うアプリのみに影響があります。たとえば、 Web API や OpenID Connect で連携するアプリを開発している場合に影響を受ける可能性がございます。トークンの署名検証を行うアプリであっても、弊社の標準ライブラリなどでメタデータを定期的に更新するよう実装されている場合には影響を受けません。またこれまでもメタデータの公開鍵は、約 6 週間おきにロールオーバーされておりましたので、すでに 6 週間以上動作しているアプリは問題ないと判断いただけるものと存じます。

メタデータを利用した署名の検証をしているかは、Azure ポータル上で確認することはできず、アプリの実装観点での確認が必要です。上記公開情報に[一般的な実装パターンごとに確認方法と対処方法](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-signing-key-rollover?WT.mc_id=Portal-Microsoft_Azure_Health#how-to-assess-if-your-application-will-be-affected-and-what-to-do-about-it)をおまとめしておりますので、こちらをご確認ください。

## よくある質問

以下に、よくある質問をおまとめします。

### az login などでサービス プリンシパルを利用した認証を実施していますが影響を受けますか

いいえ、az login などクライアントではトークンの検証を行いませんので影響を受けません。

### エンタープライズ アプリケーションでシングル サインオン設定をしている SAML アプリには影響がありますか

いいえ、エンタープライズ アプリケーションのシングル サインオン設定にて、トークン署名証明書を生成している SAML アプリは、今回のロールオーバーの影響を受けません。個別の SAML アプリのトークン署名用証明書は引き続きお客さまにて管理いただけます。

### OpenID Connect で連携している SaaS アプリに影響はありますか

はい、OpenID Connect で連携している SaaS アプリが ID トークンの検証をしている場合、今回の影響を受ける可能性があります。ただ、通常は SaaS アプリベンダーにて対処が実施されるかと存じますので、ご不安な場合には各アプリベンダーまでご確認ください。

### Azure AD アプリケーション プロキシで公開されたアプリは影響を受けますか

公開されたアプリが OpenID Connect で Azure AD と連携しており、アプリ側でトークンの検証を実装している場合は確認が必要です。Azure AD アプリケーション プロキシの事前認証のみで認証を実施している場合、お客様での対処は不要です。
