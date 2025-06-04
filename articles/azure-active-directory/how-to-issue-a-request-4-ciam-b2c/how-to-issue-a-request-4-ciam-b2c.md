---
title: "Microsoft Entra External ID / Azure AD B2C のサポート リクエスト発行方法"
date: 2025-05-27 19:00
tags:
    - Microsoft Entra External ID
    - Azure AD B2C
---

# Microsoft Entra External ID / Azure AD B2C のサポート リクエスト発行方法

こんにちは、Azure Identity サポート チームの 金子 です。今回は Microsoft Entra External ID / Azure AD B2C のお問い合わせを発行いただく際の注意点についてご説明します。

Microsoft Entra External ID または Azure AD B2C テナントは、組織の Microsoft Entra ID テナントに紐づく Azure サブスクリプションのリソースとなりますため、起票はサブスクリプションが紐づくテナント (従業員テナント) にて行う必要がございます。しかしながら、弊社サポートでは起票いただいたテナントの情報以外を閲覧することができません。これは、弊社 Microsoft 側で顧客データを保護するための制限となります。

従いまして、Entra External ID または Azure AD B2C テナントに関する調査をご希望される際は、公開情報の [手順](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/find-help-open-support-ticket#how-to-open-a-support-ticket-for-azure-ad-b2c-in-the-azure-portal) でお問い合わせを起票いただいた上で以下の 2 点が対応済みであるか事前にご確認いただけますと幸いです。未対応の場合は、弊社サポートより改めて対応のお願いやお問い合わせ起票をお願いさせていただく場合がございますので予めご了承ください。

## 必要事項

1. お問い合わせを起票したユーザーが問題が発生した Entra External ID または Azure AD B2C テナントへのゲスト登録が完了していること。
2. ゲスト登録したアカウントに、以下のいずれかの Entra ID 管理者ロールが付与されていること。
    - グローバル管理者（Global Administrator）
    - サービス サポート管理者（Service Support Administrator）

> [!NOTE]
> これらのロールは Entra External ID または Azure AD B2C テナント側にて付与する必要があります。

また、下記の公開情報に記載しておりますが、エラーの原因調査等のお問い合わせを発行いただく際には「高度な診断情報」を「はい」に設定いただく必要がありますので、こちらも合わせてご認識くださいますようお願いいたします。

参考: [Azure サポートと診断情報を共有する](https://docs.microsoft.com/ja-jp/azure/azure-portal/supportability/how-to-manage-azure-support-request#allow-collection-of-advanced-diagnostic-information)
