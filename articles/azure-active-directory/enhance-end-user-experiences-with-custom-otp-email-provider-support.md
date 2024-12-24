---
title: カスタム OTP E メール プロバイダーのサポートでエンドユーザー体験が向上
date: 2024-12-25 01:00
tags:
  - Microsoft Entra
  - Device
  - Microsoft Entra

# カスタム OTP E メール プロバイダーのサポートでエンドユーザー体験が向上

---

# カスタム OTP E メール プロバイダーのサポートでエンドユーザー体験が向上



## 消費者向けアプリケーションでワン タイム パスコード用にカスタム E メール プロバイダーを設定する

現代のデジタル時代において、シームレスなユーザー体験を提供することは、ブランドの強化、ユーザーの信頼獲得、ビジネスの成長にとって非常に重要です。Microsoft External ID の一般提供 (GA) により、一般消費者向けに高度なセキュリティとコンプライアンスを備えたユーザー体験が構築可能となりました。弊社は管理者と開発者の両方にとってシンプルでシームレスな体験を提供することを目指しており、直近のブログでは、モバイル アプリケーション向けに完全にカスタマイズ可能な [ネイティブ認証](https://devblogs.microsoft.com/identity/native-auth-for-external-id-ga/) や [管理者向けの組み込みセキュリティ コントロール](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-external-id) を紹介しました。
本記事は、2024 年 12 月 5 日に米国の Microsoft Entra Blog で公開された [Enhance end-user experiences with Custom OTP Email Provider Support](https://techcommunity.microsoft.com/blog/identity/enhance-end-user-experiences-with-custom-otp-email-provider-support/3627346) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。
この取り組みの次のステップとして、External ID を利用しているアプリで、よりブランドのカスタマイズが行えるよう、新しいカスタム認証拡張機能を追加しました。カスタマイズとブランディングは、エンドユーザーがアプリケーションをスムーズに利用し、そこに企業ブランドのアイデンティティを反映させるという意味で非常に重要な機能です。ここからは、シニア プロダクト マネージャーの Sasha Mars より、Microsoft Entra 管理センターでこの新しい拡張機能の利用方法について紹介してもらいます。

----
## 消費者向けアプリケーションでワン タイム パスコード用にカスタム E メール プロバイダーを設定する
## 外部向けアプリケーションで利用できる新しいカスタム認証拡張機能





### ユーザーにユニークな体験を

今回お話しするカスタマイズ機能は、ユーザー体験をより細かくコントロールしたいというフィードバックに基づいて追加されました。顧客向けアプリを構築する場合、Azure AD B2C プラットフォームでの経験から、企業ブランドごとにカスタマイズされたユーザー体験を提供するということが顧客と企業の間の信頼関係を構築する上で非常に重要であることがわかっています。

この新しいカスタム認証拡張機能を使用すると、Microsoft Entra External ID が既定で提供する E メール サービスの代わりに、Azure Communication Services や他のサード パーティーの E メール プロバイダーなどお好みの E メール プロバイダーを利用でき、カスタマイズしたデザインと操作感を実現可能になります。

### カスタム E メール プロバイダーへのゲートウェイとして機能する API を作成する



### EmailOtpSend カスタム認証拡張機能の構成する

EmailOtpSend カスタム認証拡張機能は、Microsoft Entra 管理センターのカスタム認証拡張のブレードで設定できます。そこで新しいカスタム認証拡張機能を登録し、それをアプリケーションに接続し、カスタム E メール プロバイダーをアプリケーションに割り当てます。

ここで、管理者が実際に独自の Email プロバイダーを設定 - BYOE (Bring Your Own Email) - し、API を使用して自動化する流れを見てみましょう。

- **基本設定** - ここでは EmailOtpSend のイベントの種類を選択できます。
    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/1.png)

- **エンドポイントの設定** - API エンドポイントを設定します。
    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/2.png)

- **API の認証** - API エンドポイントへの呼び出しを安全に行うためのフローを構成します。
    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/3.png)

- **アプリケーション** - EmailOtpSend のイベントを割り当てるアプリケーションを指定します。
    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/4.png)

ここで、管理者が実際に独自の Email プロバイダーを設定 - BYOE (Bring Your Own Email) - し、API を使用して自動化する流れを見てみましょう。


- **基本設定** - ここでは EmailOtpSend のイベントの種類を選択できます。

    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/1.png)
Sasha Mars  
Senior Product Manager, Microsoft Identity and Network Access  
LinkedIn: Sasha Mars | LinkedIn

    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/2.png)


- **API の認証** - API エンドポイントへの呼び出しを安全に行うためのフローを構成します。

    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/3.png)


- **アプリケーション** - EmailOtpSend のイベントを割り当てるアプリケーションを指定します。

    ![](./enhance-end-user-experiences-with-custom-otp-email-provider-support/4.png)


Microsoft Entra External ID テナントをまずご用意の上、ぜひ EmailOtpSend によるカスタム認証拡張機能をお試しください。

カスタム認証拡張機能の詳細については、[こちら](https://learn.microsoft.com/ja-jp/entra/identity-platform/custom-extension-email-otp-get-started?tabs=azure-communication-services%2Cazure-portal) をご覧ください。

いつも皆様からのフィードバックをお待ちしております。以下のリンクより新機能に関するご意見をお寄せください。

Sasha Mars  

Senior Product Manager, Microsoft Identity and Network Access  

LinkedIn: Sasha Mars | LinkedIn
