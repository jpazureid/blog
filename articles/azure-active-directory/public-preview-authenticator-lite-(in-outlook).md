---
title: パブリック プレビュー Authenticator Lite (Outlook)
date: 2023-5-15
tags:
    - Azure AD
    - US Identity Blog
---



こんにちは、Azure Identity サポート チームの 張替 です。
本記事は、2023 年 4 月 18 日に米国の Azure Active Directory Identity Blog で公開された [Public Preview: Authenticator Lite (in Outlook) - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/public-preview-authenticator-lite-in-outlook/ba-p/3773139) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。


2 年前、私たちは ["認証に電話を使うのはそろそろやめよう"](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/it-s-time-to-hang-up-on-phone-transports-for-authentication/ba-p/1751752) と題した記事を公開しました。本日、テキスト メッセージ (SMS) や音声ベースの認証からの移行を支援するツールとして、Authenticator Lite のパブリック プレビューを開始します。弊社としては、パスワードレス、フィッシング対策、使いやすさ、進化する攻撃への適応性など、最新の強力な認証ですべてのユーザーがサインインできるようにすることを重要視しています。

最新の強力な認証で弊社が最も推奨するのは、最も堅牢なセキュリティ機能を提供し、最も頻繁に更新され、加えて無料の [Authenticator](https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-authenticator-app) です。Microsoft Authenticator アプリは、安全で簡単な認証方法として世界中で 1 億人以上のユーザーに信頼されており、Azure にサインインする際の強力な認証方法として最も一般的なものとなっています。

先進的かつ強力な認証は非常に重要であるため、これをより利用しやすくするために、この度 Outlook クライアントに直接その機能を組み込みました！この Outlook に組み込まれたユーザー体験は [Authenticator Lite](https://learn.microsoft.com/en-us/azure/active-directory/authentication/how-to-mfa-authenticator-lite) と呼ばれ、このパブリック プレビューが開始されたことをここで発表いたします！まだ Authenticator をダウンロードしていないユーザーは、iOS または Android デバイスの Outlook アプリを使用して、職場や学校のアカウントの MFA を無料で完了できるようになりました。ユーザーは認証要求を承認し、TOTP コードを受け取ることができるようになります。これにより、電話網に依存する認証からユーザーをスムーズに移行させつつ、Authenticator の安全性を享受できるようになります。

パブリック プレビューでは、管理者はユーザーのグループに対してこの機能を有効または無効にするか、Microsoft managed (Microsoft に設定を任せる) の状態のままにするかを選択できます。Authenticator Lite を有効にするグループを設定するには、Entra ポータルの Authenticator 設定ページから行います。 また、[Microsoft Graph](https://learn.microsoft.com/en-us/azure/active-directory/authentication/how-to-mfa-authenticator-lite) を使用して機能を有効にすることも可能です。

> [!NOTE]
> サポートチームによる補足: 以下の画面にあるコンパニオン アプリケーションとは Outlook のこと、つまり Authenticator Lite が組み込まれたアプリのことを示しています。

![](./public-preview-authenticator-lite-(in-outlook)\public-preview-authenticator-lite-(in-outlook)1.png)


Authenticator Lite は、その名のとおり、Authenticator の機能の一部を Outlook に拡張するものです。認証時の通知では、番号一致のプロンプトに加え、デバイスで有効な場合は生体認証または PIN 認証が含まれます。Authenticator Lite の通知設定の詳細については、[こちら](https://learn.microsoft.com/en-us/azure/active-directory/authentication/how-to-mfa-authenticator-lite#enable-authenticator-lite) をご覧ください。
 
Authenticator Liteが有効になると、Authenticator アプリを搭載していない[最新バージョンの Outlook](https://learn.microsoft.com/en-us/azure/active-directory/authentication/how-to-mfa-authenticator-lite#prerequisites) を使用しているユーザーは、デバイスでアプリを起動する際に、MFA の方法として Outlook を登録するよう促されます。



ユーザーが登録されると、次回の認証時に、Outlook アプリでプッシュ通知を使って認証するよう促されます。
![](./public-preview-authenticator-lite-(in-outlook)\public-preview-authenticator-lite-(in-outlook)2.png)


登録済みのユーザーは、Outlook の設定の「Authenticator」から TOTP コードを取得することもできます。
![](./public-preview-authenticator-lite-(in-outlook)\public-preview-authenticator-lite-(in-outlook)3.png)


ユーザーに対してこの機能を有効にするための詳細については、[こちら](https://learn.microsoft.com/en-us/azure/active-directory/authentication/how-to-mfa-authenticator-lite#prerequisites) を参照ください。Outlookでこの機能を利用するための展開処理が現在進行中であり、お客様は順次本機能を利用可能となります。
 
本機能は、[「Microsoft managed」](https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-default-enablement) の状態でテナントに展開されます。パブリック プレビューの期間中は機能を「Microsoft managed」のままにしてもユーザーへの影響はなく、明示的に状態を有効に変更しない限り、この機能はオフのままです。2023 年 4 月下旬、プレビューの表示を削除し、一般提供 (GA) 開始となります。2023 年 5 月 26 日、この機能が「Microsoft managed」に設定されたままであれば、お客様のテナントでは Microsoft によって Authenticator Lite が有効になります。5 月 26 日にこの機能が有効になることを望まない場合は、5 月 26 日より前に状態を「無効」に設定するか、有効にしたいユーザーと無効にしたいユーザーをそれぞれグループに割り当てるよう対応ください。 
 
ご質問やご意見がございましたら、下記コメント欄、または [aka.ms/AzureADFeedback](https://feedback.azure.com/d365community) までご連絡くださいますようお願いいたします。
 
Regards, 
Alex Weinert
VP Director of Identity Security, Microsoft   
Microsoft Identity Division 
