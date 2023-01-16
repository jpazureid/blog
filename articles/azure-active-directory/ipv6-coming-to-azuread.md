---
title: Azure AD に IPv6 が導入されます
date: 2023-01-19 09:00
tags:
    - Azure AD
    - US Identity Blog
---

# Azure AD に IPv6 が導入されます

こんにちは、Azure Identity サポート チームの 五十嵐 です。
本記事は、2023 年 1 月 10 日に米国の Azure Active Directory Identity Blog で公開された [IPv6 Coming to Azure AD](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/ipv6-coming-to-azure-ad/ba-p/2967451) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。


---

企業ネットワーク、サービス プロバイダー、デバイスの間で IPv6 の導入とサポートが進む中、多くのお客様が、自社のユーザーが IPv6 クライアントや IPv6 ネットワークから自社のサービスやアプリケーションに引き続きアクセスできるのかどうか、疑問に思われていることでしょう。

本日、Microsoft Azure Active Directory (Azure AD) に IPv6 のサポートを導入する計画を発表することができ、大変うれしく思います。これにより、お客様は IPv4、IPv6、またはデュアルスタックのエンドポイントを介して Azure AD サービスにアクセスできるようになります。 

ほとんどのお客様にとって、IPv4 が IT 環境から完全に消えることはないと思われます。そのため、**Azure AD の機能やサービスにおいて IPv6 を必須としたり、IPv4 の優先順位を下げたりすることは計画していません。**
しかし、このブログの推奨事項にのっとり、[こちらのリンク](https://aka.ms/azureadipv6) から最新のガイダンスを確認することで、IPv6 サポートにむけた計画および準備を始めることが重要です。

Azure AD サービスへの IPv6 サポートの導入は、**2023 年 3 月 31 日** から段階的に開始される予定です。 

IPv6 アドレスを使用していることに加え、条件付きアクセス ポリシーでネームド ロケーションを使用している Azure AD のお客様に向けたガイダンスを以下に記載します。 

**組織内の特定のネットワーク境界を識別するために[ネームド ロケーション](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition)を使用しているお客様は、以下のことを行う必要があります。**

1. 既存のネームド ロケーションの監査を実施し、潜在的な影響を予測する。
2. ネットワークパートナーと協力して、お客様の環境で使用されている外向きの IPv6 アドレスを特定する。
3. 既存の[ネームド ロケーション](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition#ip-address-ranges)を見直して、確認した IPv6 範囲を含める。

**特定のネットワークからのアプリへのアクセスを制限し、保護するために、[場所に基づく条件付きアクセス ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition)を使用しているお客様は、以下のことを行う必要があります。**

1. 既存の条件付きアクセス ポリシーの監査を実施し、[ネームド ロケーション](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition)を使用している場合は、潜在的な影響がないかを確認する。
2. 既存の[場所に基づく条件付きアクセス ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/location-condition)を見直して、組織のセキュリティ要件を引き続き満たすようにする。
 

Azure AD における IPv6 の有効化に関する追加のガイダンスを引き続き共有するために、覚えやすいリンクを作成しました。これらの詳細については、こちら(https://aka.ms/azureadipv6) にアクセスください。なお、日本語の情報は[こちら](https://learn.microsoft.com/ja-jp/troubleshoot/azure/active-directory/azure-ad-ipv6-support)をご確認ください。
