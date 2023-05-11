---
title: 認証管理の最新化
date: 2023-05-12 09:00
tags:
    - US Identity Blog
---

# 認証管理の最新化

こんにちは、Azure Identity サポート チームの 長谷川 です。

本記事は、2023 年 5 月 9 日に米国の Microsoft Entra (Azure AD) Blog で公開された [Modernizing Authentication Management](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/modernizing-authentication-management/ba-p/2365669) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。
<!-- more -->
---

私たちは、お客様の認証体験の管理方法に関する 2 つの重要なアップデートを発表できることを嬉しく思っています！統合された認証方法の一般提供開始と、最新の多要素認証 (MFA) の疑わしいアクティビティのレポートのパブリック プレビューです。

統合された認証方法の一般提供により、認証やパスワードリセットに使用されるすべての方法を一元管理し、よりコントロールしやすくなり、ユーザーグループをターゲットにした機能を提供することができるようになりました。

最新の MFA の疑わしいアクティビティのレポートのパブリック プレビューは、設定が認証方法ポリシーに組み込まれ、このユーザーから報告された疑わしい MFA プロンプトの情報を Identity Protection に統合しています。


## **統合された認証方法**
従来は、MFA とセルフサービス パスワード リセットの認証方法を別々に管理する必要がありました。現在では、FIDO2セキュリティキーや証明書ベースの認証のようなパスワードレス認証の方法と一緒に、1 つの画面で両方を管理することができるようになりました。新たに追加された認証方法には、SMS、音声通話、サードパーティ製 OATH ソフトウェア トークン、電子メール ワンタイム パスコード認証があります。
![](./modernizing-authentication-management/modernizing-authentication-management1.png)

認証方法の利用をよりきめ細かく管理できるようになり、すべてのユーザーではなく特定のユーザー グループに対して認証方法を有効にしたり、ユーザーのグループをターゲットから除外したりする機能が追加されました。つまり、試験的なグループで認証方法をトライアル利用したり、SMS や音声通話などのセキュリティ レベルの低い認証方法の利用を少数のユーザー グループに限定したりすることができます。
![](./modernizing-authentication-management/modernizing-authentication-management2.png)

また、従来の MFA および セルフサービス パスワード リセット ポリシーから統合された認証方法に管理を移行する際に役立つ移行コントロールも追加されました。このコントロールを使用すると、従来のポリシーで認証方法を無効にする前に、認証方法を個別に移動およびテストできます。 
 ![](./modernizing-authentication-management/modernizing-authentication-management3.png)

2024年後半には、レガシーポリシーで認証方法を管理する機能を廃止する予定です。統合された認証方法への移行にあたっては、[これを機にセキュリティ対策を強化するために SMS や音声通話の認証を卒業し](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/it-s-time-to-hang-up-on-phone-transports-for-authentication/ba-p/1751752) 、Microsoft Authenticator や FIDO2 セキュリティ キーなど、より安全な認証方法を有効にすることをお勧めします (まだの方は、ぜひご検討ください)。

[認証方法の管理](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-methods-manage) と [認証方法ポリシーへの移行](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-authentication-methods-manage) の詳細を確認し、できるだけ早く移行してください !


## **疑わしいアクティビティのレポート**
Azure Active Directory (Azure AD) では、Microsoft Authenticatorアプリや電話で受け取った疑わしい MFA プロンプトをユーザーが報告できる MFA の不正アクセスのアラート機能がありました。この機能では、ブロック リストに追加されたユーザーはブロック リストから消されるまで MFA プロンプトを受け取らずにすむようになりますが、ブロック リストからの削除は管理者の手動作業でした。また、不正アクセスのアラートとブロック リストの管理にはすべてグローバル管理者権限が必要でした。不正アクセスのアラートを疑わしいアクティビティのレポートと共に最新化し、この機能の設定を認証方法ポリシーに移動して、他の認証関連設定と同じ場所で設定できるようにしました。また、ユーザーが不審なプロンプトを報告した際により包括的で構成可能なアクションをとれるようにアラートイベントを Identity Protection に統合しました。
認証方法の UX にある新しい "設定" を使用するか、または認証方法の MS Graph API を使用することで、疑わしいアクティビティのレポートを有効にすることができます。
![](./modernizing-authentication-management/modernizing-authentication-management4.png)
 
この機能を有効にすると、ユーザーがMFA電話アプリのプッシュ通知や音声MFAプロンプトを疑わしいと報告した場合、そのユーザーアカウントはユーザーリスク高とマークされます。その後、リスクベースのポリシーを使用して、セルフサービスのパスワードリセットによる即時のパスワード変更を要求したり、リスクが改善されるまですべての認証にMFAを要求したり、リスクが改善されるまで認証をブロックするなど、これらのユーザーに対する特定の修復をより細かく制御することができます。

![](./modernizing-authentication-management/modernizing-authentication-management5.png)

もし Azure AD Premium P2 ライセンスをお持ちでない場合は、レガシーMFAブロックリストと同様の機能として、リスクイベントを使用して、リスクが改善されるまでアカウントを無効にすることも可能です。
 
疑わしいアクティビティのレポートは、プレビュー中は従来の MFA の不正なアクセスのアラートと並行して機能するため、不正なアクセスのアラートを有効にして自動ブロックしている場合は、疑わしいアクティビティのレポートの適用範囲内のユーザーのリスクを改善し、MFA ブロックリストからユーザーを削除する必要があります。

疑わしいアクティビティのレポートの構成とリスクベースのポリシーを活用する方法の詳細を確認し、今すぐ疑わしいアクティビティのレポートをお試しください。

いつものように、フィードバックをお聞かせください。
よろしくお願いします。

Alex Weinert (@Alex_T_Weinert)
VP Director of Identity Security, Microsoft  
