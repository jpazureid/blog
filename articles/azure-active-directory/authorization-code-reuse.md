---
title: Azure AD の OAuth 2.0 における Authorization Code の再利用禁止
date: 2018-10-4
tags:
  - Azure AD
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/10/04/authorization-code-reuse/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Azure AD の OAuth 2.0 における Authorization Code の再利用禁止

こんにちは、Azure & Identity サポート チームの小野です。
今回は、2018 年 10 月 10 日 (水) 以降に変更を予定しています Azure AD の OAuth 2.0 における Authorization Code の再利用禁止についてご紹介します。
変更のアナウンスについては以下の資料をご確認ください。

変更通知: 承認コードを再利用できなくなる
https://docs.microsoft.com/ja-jp/azure/active-directory/fundamentals/whats-new#change-notice-authorization-codes-will-no-longer-be-available-for-reuse

本変更の影響を受けるのは、Azure AD より Authorization Code を取得し、この Authorization Code を繰り返し使用してアクセス トークンをリクエストする処理を含むアプリケーションです。Azure AD へのログイン、Azure PowerShell 、Azure CLI や SDK を利用したトークン取得については、特に影響ありませんので、ご安心ください。

まず、OAuth 2.0 における Authorization Code について簡単に説明します。

Authorization Code は、Azure AD にて利用されている OAuth 2.0 の Authorization Code Grant Flow の中でユーザーがリソースへのアクセスを承認したことを示するために、Authorization Server (Azure AD) が発行するものです。以下の図のとおり Authorization Code は Azure AD から発行されます (③)。その後、Web アプリケーションに渡され (④)、Web アプリケーションがこの Authorization Code を利用してアクセス トークンを取得 (⑤ ⑥) し、リソースへのアクセスを行います。

![](./authorization-code-reuse/AuthorizationCodeFlow.png)

Azure AD が発行した Authorization Code (③) は、従来は 15 分間 (10 分間の有効期限に加えて時刻ずれを考慮して 5 分の猶予が与えられている) 有効です。つまり、15 分以内であれば同じ Authorization Code を提示することで何度でもトークンを取得することが可能でした。現在、15 分を経過して Authorization Code を提示した場合、以下のエラーが返されます。

"error": "invalid_grant"
"error_description": "AADSTS70008: The provided authorization code or refresh token is expired. Send a new interactive authorization request for this user and resource.

今回の変更では従来の時間 (15 分) による制限に加え、同じ Authorization Code の利用は一度までという回数の制限が追加されました。本動作変更は、OAuth 2.0 フレームワークの標準的な仕様 (RFC 6749) に準拠するためのものです。

現在、Azure AD に対して、Authorization Code Grant Flow を利用 (一連の流れを独自に実装) されている開発者の方は、Authorization Code の再利用を行わないようご注意ください。

長期間にわたりアクセス トークンの利用が必要な場合は、Authorization Code の提示により得られるリフレッシュ トークンを用いて、アクセス トークンを再取得するように実装をお願いします。

上記動作変更の影響について懸念がありましたら、弊社サポートまでお気軽にお問い合わせください。

上記内容が少しでも皆様の参考となりますと幸いです。
※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
