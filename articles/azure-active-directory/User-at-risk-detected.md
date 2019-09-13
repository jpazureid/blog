---
title: Microsoft Azure からの "User at risk detected" というメールについて
date: 2019-09-13
tags:
  - Azure AD
  - Security
---

# Microsoft Azure からの "User at risk detected" というメールについて

2019/9/11 に Office 365 / Azure AD の管理者に対して突然 User at risk detected という件名でメールが送信されるという問題が発生しました。

今回の事象は、弊社 Azure AD サービスにおける問題に起因して発生しております。
ご利用の皆様には突然このようなメールが届いてしまったことにより、混乱をまねくこととなり、確認のお手間をおかけしてしまいましたこと深くお詫び申し上げます。

このメールは、Azure AD Identity Protection の機能により送信されたメールとなり、通常は、Azure AD Premium Plan 2 (以降 AAD P2) ライセンスを利用している環境の管理者にのみ送信されるものとなります。しかしながら、Azure AD サービス上の問題により、ライセンスを持たない方にも送信されてしまいました。

通知メールに記載されているリンクをクリックすると、Azure ポータルの Azure AD Identity Protection の画面に遷移しますが、AAD P2 のない環境では、Azure AD Identity Protection を使用することができないため、アクセス権が無いという画面が表示されます。

今回の問題につきましては、すでに開発部門にて問題の修正を実施済みです。
修正後は、これまで通り、AAD P2 を利用されていない環境の管理者にはメールが送信されない動作となっています。

#### <詳細>
このメールは、ご利用の Azure AD ディレクトリにおいて、Azure がリスクがあると判断したユーザー (リスクのフラグ付きユーザー) を検出したことを知らせるメールです。
AAD P2 利用環境では、メールに含まれるリンクをクリックし、確認できる Azure AD Identity Protection のブレードから、この検出の詳細を確認することができます。
そこで確認をした情報を基に、管理者にて、本当に危険であるかどうかを判断して、必要に応じてパスワード リセットなどの対策を行うことを意図しています。
	※ Azure AD で検知したリスクであっても、実際のご利用方法によっては問題のない場合があります。

また、リスクのフラグ付きユーザーは、Azure ポータルの [Azure Active Directory] – [危険なユーザー (リスクのフラグ付きユーザー)] でも確認することができます。
	※ AAD P2 の環境よりも制限された情報量になります。

Azure portal におけるリスクのフラグ付きユーザー レポート
https://docs.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/concept-user-at-risk

また、リスクとして検出されるイベント (リスク イベント) の詳細については、下記の公開情報に記載があります。
	※ リスク イベントとして検出される条件の詳細は、第三者に悪用されないようセキュリティ上非公開となっておりますため、こちらに記載されている情報以上のものはご案内できません。

Azure Active Directory リスク検出
https://docs.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/concept-risk-events

今回誤ってメールが送信されていますが、実際にセキュリティ上のリスクがあるかという点について確認するためには Azure AD Identity Protection のブレードから確認する必要があるのですが、そのためには繰り返しになりますが Azure AD Premium Plan 2 のライセンスが必要です。 Azure AD Premium Plan 2 については試用版も用意されていますので、検出されたリスクに対して詳細を確認されたい場合には次の手順で試用版のサインアップをお願いいたします。試用版の有効期限は 30 日で、試用期限が経過しますと同じテナントでは再試用できないことはご注意ください。

1. 全体管理者で Micrsoft 365 管理センター https://admin.microsoft.com/ にサインインします。

2. 左側のメニューから [課金情報] - [サービスを購入する] を選択します。

![](./azure-active-directory/User-at-risk-detected/step2.png)

3. その他のおすすめカテゴリから [セキュリティ] を選択し、 Azure Active Directory Premium P2 をクリックします。

![](./azure-active-directory/User-at-risk-detected/step3.png)

4. [無料試用版を入手する] をクリックし、次の画面で [無料トライアル] をクリックします。

![](./azure-active-directory/User-at-risk-detected/step4.png)


ご不明な点等ございましたら、是非弊社サポート サービスをご利用ください。
※本情報の内容 (リンク先などを含む) は、作成日時点でのものであり、予告なく変更される場合があります。