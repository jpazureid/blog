---
title: Azure AD B2C の認可コードと更新トークンのサイズが増加します
date: 2023-04-21 05:00
tags:
    - Azure AD B2C
    - US Identity Blog
---

# Azure AD B2C の認可コードと更新トークンのサイズが増加します

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2023 年 3 月 17 日に米国の Microsoft Entra (Azure AD) の Discussion で公開された [Azure AD B2C authorization code and refresh token size increase update](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad/azure-ad-b2c-authorization-code-and-refresh-token-size-increase/m-p/3770890) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

[Microsoft Entra (Azure Active Directory)](https://www.microsoft.com/ja-jp/security/business/identity-access/azure-active-directory-external-identities) では、継続的なセキュリティ改善の取り組みの一環として、Azure AD B2C に対し、アプリケーションに返される OAuth 2.0 (および OpenID Connect) のフォーマットの変更を展開しました。この結果、Azure AD B2C が発行する認可コードと更新トークンのサイズが増加します。これにより、アプリケーションが OAuth 2.0 の認可コードをクエリ文字列パラメーターまたは URL フラグメントとして受け入れるように構成されている場合、ユーザーに影響が生じる可能性があります。具体的には以下のような場合が挙げられます。

- Internet Explorer などの古いウェブ ブラウザーを使用しているユーザーは、URL の長さの制限に抵触する可能性がある。
- アプリケーションを Web サーバー上で実行している場合、特にアプリが長い URL 文字数を許容しないファイアウォールやリバース プロキシの背後にある場合、URL の長さの制限に抵触する可能性がある。

OAuth 2.0 (および OpenID Connect) プロトコルでは、認可コードがアプリケーションに返される方法を、3 つの応答モード (response_mode) にて指定可能です。**query** および **fragment** モードでは、それぞれ認可コードがクエリ パラメーターおよび URL フラグメントとして返されます。**form_post** モードでは、応答のパラメータは HTML のフォームの値としてエンコードされ、HTML 本文にエンコードされて HTTP POST メソッドで送信されます。詳細については、[Azure Active Directory B2CのOAuth 2.0 認可コード フロー](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/authorization-code-flow) の記事をご確認ください。

認可コードと更新トークンのサイズが増加した結果、URL が長くなることで問題が生じた場合、これを解消するためには以下を検討ください。

- Web アプリケーションの場合、アプリケーションに最も安全にトークンを渡せるよう、OAuth 2.0 の response_mode を form_post に設定する。
- 認可コード フローと PKCE を使用するシングル ページ アプリケーションでは、アプリケーションに渡されるクレームの数を減らす。Azure AD B2C の [ユーザー フロー](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/configure-user-input?pivots=b2c-user-flow#provide-optional-claims-to-your-app) および [カスタム ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/configure-user-input?pivots=b2c-custom-policy#include-a-claim-in-the-token) で、アプリケーションにとって不要なクレームがあれば、それらを削除します。[UserInfo エンドポイント](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/userinfo-endpoint?pivots=b2c-custom-policy) を使用して、認証されたユーザーに関するクレームを返すこともご検討ください。これにより、認可コードと更新トークンのサイズが最小化され、事象を回避できると想定されます。
- この変更は、モバイル アプリやデスクトップ アプリなど、デバイスにインストールされたアプリには影響しないと想定されます。

この変更は、上述のとおり更新トークンのサイズにも影響します。MSAL ライブラリは、トークンを取得した後に [キャッシュ](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/msal-acquire-cache-tokens) します。インメモリ キャッシュや [分散トークン キャッシュ](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/msal-net-token-cache-serialization?tabs=aspnet#distributed-token-caches) を使用している Web アプリケーションでは、キャッシュの仕組みがより大きい更新トークンのサイズを処理できることを確認するか、前節で説明したように更新トークンのサイズを極力小さくするようご対応ください。

Yoel
