---
title: 登録キャンペーンに関する Q&A
date: 2023-10-20 12:00
tags:
    - Azure AD
    - MFA
    - Microsoft Authenticator
---

# 登録キャンペーンに関する Q&A

こんにちは。Azure Identity サポート チームです。
現在、Microsoft Entra ID へのサインイン時に以下のような画面が表示され Microsoft Authenticator アプリのインストールが求められるというお問い合わせを多くいただいております。

![登録キャンペーンのメッセージ](./registration-campaign-qanda/registration-campaign-qanda1.png)

上記の画面は、下記公開情報に記載されている "登録キャンペーン" 機能における [Microsoft マネージド] 値が [有効] に変更されたために表示されています。

[Microsoft Authenticator を設定してもらうための登録キャンペーンを実行する方法 - Microsoft Authenticator](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-registration-campaign)
> サインイン時に Microsoft Authenticator をセットアップするようにユーザーにナッジすることができます。 ユーザーは通常のサインインを行い、いつもどおりに多要素認証を実行した後に、Microsoft Authenticator を設定するように求められます。

こちらのブログでは、お問い合わせの多い登録キャンペーンに関するご質問について Q&A 形式でおまとめいたしました。既存のドキュメントではカバーされていない動作やご質問について今後も適宜内容を拡充していきますので、ご参照いただけますと幸いです。

---

## Q. 登録キャンペーンの今回のアップデートについてはどこで通知されていますか？

A. [Microsoft 365 管理センターのメッセージセンター](https://go.microsoft.com/fwlink/p/?linkid=2070717) で、Microsoft Entra ID P1 または P2 テナントに対しては MC650420 にて、Microsoft Entra ID Free テナントに対しては MC584364 にてアナウンスされております。
Microsoft Entra ID Free テナントを対象とした展開は既に完了しておりますため、MC584364 は 2023 年 8 月 14 日に掲載が終了しております。

## Q. 登録キャンペーンの今回のアップデートはいつから実施されますか？

A. 登録キャンペーン機能の [Microsoft マネージド] 値を [有効] とする変更は、Microsoft Entra ID P1 または P2 テナントに対しては 2023 年 9 月以降、Microsoft Entra ID Free テナントを対象とした展開は 2023 年 7 月以降より開始しております。
Microsoft Entra ID P1 または P2 テナントを対象とした展開は 10 月下旬までに完了することが予定されており、Microsoft Entra ID Free テナントを対象とした展開は既に完了している状態です。

## Q. 登録キャンペーンの今回のアップデートはなぜ実施されるのですか？

A. 以前のブログ記事 ["認証に電話網を使うのはそろそろやめよう (It’s Time to Hang Up on Phone Transports for Authentication)"](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/it-s-time-to-hang-up-on-phone-transports-for-authentication/ba-p/1751752) で、SMS や音声などの多要素認証 (MFA) メカニズムの脆弱性について説明しておりました。
マイクロソフトの最近の MFA に関する調査研究によると、SMS は Microsoft Authenticator アプリと比較して、悪意のある攻撃者を阻止する効果が 40％ 低いと結論づけています。

電話ベースの認証から脱却することには明確な利点があるにもかかわらず、未だ MFA 要求の約 44 % が SMS や音声電話によるものとなっています。
ユーザーが先進的で強力な認証方法として Microsoft Authenticator アプリを設定できるようにするため、登録キャンペーンの既定の有効化が行われました。

## Q. 登録キャンペーンの設定はどこから確認できますか？

A. 登録キャンペーンの設定は、下記の画面よりご確認いただけます。
[Azure ポータル](https://portal.azure.com) > [Microsoft Entra ID] > [セキュリティ] > [認証方法] > [登録キャンペーン]
[Microsoft Entra 管理センター](https://entra.microsoft.com) > [保護] > [認証方法] > [登録キャンペーン]

## Q. 登録キャンペーンのメッセージをユーザーに表示させないようにするにはどうすればよいですか？

A. Microsoft Authenticator アプリの登録を促すメッセージは、上記の設定画面から登録キャンペーンの [Microsoft マネージド] の状態を [無効] とすることで回避することが可能です。
ユーザーが Microsoft Authenticator アプリを利用することが難しい場合は、こちらの設定の変更をご検討いただけますと幸いです。

![登録キャンペーンの [状態] を変更する画面](./registration-campaign-qanda/registration-campaign-qanda2.png)

## Q. 登録キャンペーンのメッセージの [今はしない (残り 3 回)] の上限は変更できますか？

A. 3 回まで延期が可能な設定か、無期限に延期が可能な設定のどちらかを選択いただけます。
[再通知の回数が制限されています] が [有効] な場合は、登録キャンペーンによる Microsoft Authenticator アプリの登録を 3 回まで延期することが可能です。
[無効] な場合は延期する回数に制限はなく [今はしない] という表示となります。

なお、既定の設定は [有効] となっており、3 回以上延期したユーザーは Microsoft Authenticator アプリを登録するまでサインインが不可となります。
[無効] とした場合は [再通知できる日数] で設定した間隔で再度メッセージが表示され続ける動作となりますが、延期する回数に制限はないため、サインインが不可となることはございません。

![登録キャンペーンの [再通知の回数が制限されています] を変更する画面](./registration-campaign-qanda/registration-campaign-qanda3.png)

## Q. 登録キャンペーンのメッセージで Microsoft Authenticator アプリを登録した後も SMS や音声電話は使用できますか？

A. Microsoft Authenticator アプリの登録後に要求される MFA については、Microsoft Authenticator アプリのプッシュ通知に限らず、既に登録済みの SMS や音声電話による認証方法もご使用いただけます。

---

## 関連リンクまとめ
### 本記事で引用・ご紹介した公開情報 (再掲)
- [Microsoft Authenticator を設定してもらうための登録キャンペーンを実行する方法 - Microsoft Authenticator](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/how-to-mfa-registration-campaign)
- [認証に電話網を使うのはそろそろやめよう (It’s Time to Hang Up on Phone Transports for Authentication)](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/it-s-time-to-hang-up-on-phone-transports-for-authentication/ba-p/1751752)


### 登録キャンペーンのアップデートの背景に関する公開情報
- [Microsoft によって管理される設定 - Microsoft Entra ID の認証方法の保護](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-default-enablement#microsoft-managed-settings)
- [登録キャンペーンによる先進的で強力な認証の推進 | Japan Azure Identity Support Blog](https://jpazureid.github.io/blog/azure-active-directory/advancing-modern-strong-authentication/)

上記の内容が少しでもお客様のご参考となりましたら幸いです。
