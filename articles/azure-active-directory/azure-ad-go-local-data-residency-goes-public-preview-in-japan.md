---
title: Azure AD の Go Local データ保存機能が日本でパブリック プレビューを開始
date: 2023-05-02 07:00
tags:
    - Azure AD B2C
    - US Identity Blog
---

# Azure AD の Go Local データ保存機能が日本でパブリック プレビューを開始

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2023 年 4 月 24 日に米国の Microsoft Entra (Azure AD) の Discussion で公開された [Azure AD Go Local Data Residency Goes Public Preview in Japan](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/azure-ad-go-local-data-residency-goes-public-preview-in-japan/ba-p/3751028) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

[Microsoft Entra](https://www.microsoft.com/ja-jp/security/business/microsoft-entra) の一部である [Azure Active Directory (Azure AD) B2C](https://azure.microsoft.com/ja-jp/services/active-directory/external-identities/b2c/) を用いることで、世界中の企業や個人は主なセキュリティおよびプライバシー要件に対応でき、これまで以上に多くのことを達成できるようになります。この要件には、データの保存場所についても言えるはずです。本日、Go Local のデータ保存機能 (データを特定の地域に保存する機能) が日本向けにパブリック プレビューとなりましたことをお知らせします。

Azure AD では、データの保存場所はテナント作成時に選択した国/地域によって決定されます。Go Local の追加機能は、Azure AD Premium P1 および P2 のお客様が、ディレクトリのデータを特定の地域に保存するよう指定できる機能です。

本日、特定地域へのデータ保持を利用可能な地域の一覧に日本が追加されました。この Go-Local の追加機能を有効にするだけで、Azure AD B2C のデータが日本に保存されるようになります。

このアップデートにより、日本のお客様のデジタル トランスフォーメーションをさらなに加速できることとなります。弊社は、信頼できるクラウドの原則とコンプライアンスにおけるリーダーシップに引き続き注力しております。これにより、世界中のすべてのお客様に、ご自身のアプリケーションがコンプライアンスを達成できるよう必要なセキュリティ基盤を提供してまいります。 

どの地域においても Go Local は有料の追加機能であり、月間アクティブ ユーザーあたり 0.02 ドルの費用がかかります。

日本で Go Local の利用を開始するには、Azure REST API または Azure ポータルを使用して新しい Azure AD B2C テナントを作成する際に、GoLocal アドオンを有効に設定ください。

詳しくは、[利用可能なリージョンとデータの保存場所](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/data-residency#data-residency) をご覧ください。
