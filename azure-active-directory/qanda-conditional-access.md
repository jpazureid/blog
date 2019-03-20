---
title: Azure AD の条件付きアクセスに関する Q&A
date: 2017-12-04
tags:
  - Azure AD
  - Conditional Access
---

# Azure AD の条件付きアクセスに関する Q&A

こんにちは、Azure & Identity サポート チームの高田です。

今回はお問い合わせをよくいただく、Azure AD の条件付きアクセスについてです。

お問い合わせの多いご質問について、Q&A 形式でおまとめいたしました。既存のドキュメントではカバーされていない動作や質問について今後も適宜内容を拡充していきますので、ご参照いただければと思います。
 
---
 
<span style="color:blue">Q</span>. Office 365 を利用しているが、条件付きアクセスを利用できますか？

<span style="color:red">A</span>. はい、利用可能です。Office 365 をご利用いただいているお客様は、認証基盤として Azure AD をご利用いただいている状態となります。そのため、追加で Azure AD Premium のライセンスを購入いただくことで、利用可能になります。
 
---

<span style="color:blue">Q</span>. Azure AD Application Proxy を利用して公開しているアプリケーションなども条件付きアクセスで制御可能でしょうか。

<span style="color:red">A</span>. はい、条件付きアクセスで制御可能です。Azure AD 上に登録されているアプリケーションであれば、条件付きアクセスで制御できます。Azure AD Application Proxy を利用して公開しているアプリケーションやご自身で開発し Azure AD 上に登録したアプリケーションも制御対象とすることが可能です。

---
 
<span style="color:blue">Q</span>. Azure AD B2B コラボレーション機能により招待されたゲスト ユーザーに対して条件付きアクセスのルールを適用する場合には、Azure AD Premium のライセンスを購入する必要があるのでしょうか。

<span style="color:red">A</span>. いいえ、テナントに割り当てられている Azure AD Premium ライセンス数の 5 倍までのアカウントであれば、ゲスト ユーザーに対して条件付きアクセスを含む Azure AD Premium の機能を利用させることが可能です。詳細は下記公開情報を参照ください。

Azure Active Directory B2B コラボレーションのライセンスに関するガイダンス
https://docs.microsoft.com/ja-jp/azure/active-directory/active-directory-b2b-licensing
 
---
 
<span style="color:blue">Q</span>. Azure AD Premium のライセンスを対象人数分購入すれば、該当ユーザーに割り当てる必要はないでしょうか。

<span style="color:red">A</span>. いいえ、要件として人数分購入いただくだけでなく、ユーザーに対して割り当てる必要がございます。
 
---
 
<span style="color:blue">Q</span>. 条件付きアクセスを利用するためには、Azure AD Premium のライセンス数を何個購入すればよいでしょうか？

<span style="color:red">A</span>. 条件付きアクセスの機能を利用してアプリケーションへのアクセス可否の評価が行われるユーザーに対して、Azure AD Premium (P1 以上) を割り当てる必要があります。現時点の実装では、Azure AD Premium ライセンスを割り当てていないユーザーであっても、ポリシーの対象であれば条件付きアクセス ポリシーの内容に従ってアクセス制限が行われますが、このような状態での利用はライセンス違反となります。
 
---
 
<span style="color:blue">Q</span>. 条件付きアクセスのポリシーを複数作成し、適用の優先順位をつけることは可能でしょうか。

<span style="color:red">A</span>. いいえ、優先順位を作成することはできません。条件付きアクセスではそれぞれのポリシーが独立しており、条件に合致したものが適用されます。各ポリシーで条件が重複しないように構成することを検討ください。
 
---
 
<span style="color:blue">Q</span>. Exchange Online に対して条件付きアクセスを設定したところ Office 365 ポータルに対しても条件付きアクセスが設定されてしまいました。これは想定される動作でしょうか？

<span style="color:red">A</span>. はい、これは想定される動作です。 2017 年 8 月 24 日以降は Exchange Online または SharePoint Online を対象とした条件付きアクセスが Office 365 ポータルにも反映されます。詳細は英語での情報となりますが以下のリンクも参照ください。

An update to Azure AD Conditional Access for Office.com  
https://cloudblogs.microsoft.com/enterprisemobility/2017/08/04/an-update-to-azure-ad-conditional-access-for-office-com/
 
---
 
<span style="color:blue">Q</span>. 条件付きアクセスの [場所] の条件にクライアントの IP アドレス範囲を入れましたが制御されません。どうしてでしょうか？

<span style="color:red">A</span>. 条件付きアクセスの [場所] の条件では、組織が外部と通信する際のグローバル IP アドレス (Azure AD から見た送信元グローバル IP アドレス) を利用します。例えば、社内のクライアントがプライベート IP アドレスを保持しており、外部ネットワークと通信する際にはグローバル IP アドレスを持つゲートウェイを経由して Azure AD と通信する環境があるとします。この場合、Azure AD から見ると、送信元 IP アドレスはグローバル IP アドレスを持つゲートウェイとなります。このような時は、件付きアクセスの [場所] の条件には、ゲートウェイのグローバル IP アドレスを指定ください。
 
---
 
<span style="color:blue">Q</span>. 条件付きアクセスで、X-Forwarded-For HTTP ヘッダーを利用して、組織内のクライアントの送信元 IP アドレスを判断可能ですか？

<span style="color:red">A</span>. いいえ、X-Forwarded-For HTTP ヘッダーを使用し、条件付きアクセスで組織内のクライアントの送信元 IP アドレスを判定することはできません。条件付きアクセスの [場所] の条件では、組織が外部と通信する際のゲートウェイが持つグローバル IP アドレス (Azure AD から見た送信元グローバル IP アドレス) が制御に利用されます。Azure AD には、このグローバル アドレスを場所として利用します。
X-Forwarded-For HTTP ヘッダーは HTTP ヘッダー フィールドの 1 つです。ロード バランサーなどでクライアントの送信元 IP アドレスが変換された場合でも、HTTP ヘッダーに接続元のクライアント IP アドレスの情報を付加することで、接続先サーバーが接続元クライアント IP アドレスを特定できるようにするために利用されます。しかしながら、この X-Forwarded-For HTTP ヘッダーで指定された情報は組織内の IP アドレスであり、場所を示すものではありません。このような理由から、現状 Azure AD では、組織が外部と通信する際のゲートウェイのグローバル IP アドレス (Azure AD から見た送信元グローバル IP アドレス) を制御に利用しています。
 
---
 
<span style="color:blue">Q</span>. クレームルールと条件付きアクセスは併用は可能ですか？

<span style="color:red">A</span>. はい、技術的には可能です。AD FS を利用したフェデレーション環境であれば、クレーム ルールが判定された後、条件付きアクセスが動作します。クレーム ルールで認証が拒否された場合は、その後の条件付きアクセスの処理は動作しません。ただし、類似機能であるため運用の複雑さなどを考慮すると、どちらか一方の機能をメインでご利用いただくのがよいかと存じます。
 
---
 
<span style="color:blue">Q</span>. 条件付きアクセスの設定において、全てユーザーがアクセスできない設定になってしまいました。設定を解除可能でしょうか。

<span style="color:red">A</span>. このような状況の場合は、残念ながらお客様側での解除はできません。そのため、設定の解除をご希望の場合は、お手数ですが弊社サポート サービスをご利用いただけますと幸いです。Azure ポータルにもアクセスができない状況と存じますので、ほかにお持ちのテナントからお問い合わせを発行ください。
サポート サービスをご利用いただくには、Azure ポータル上から、Azure Active Directory を選択し、[新しいサポート要求] を選択ください。以下のような画面からお問い合わせいただければと思います。
 
![](./qanda-conditional-access/create-support-ticket-1.png)

![](./qanda-conditional-access/create-support-ticket-2.png)

上記内容が少しでもお客様の参考となりますと幸いです。