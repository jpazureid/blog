
---
title: Azure AD のエンタイトルメント管理におけるカスタム ワークフローの実行
date: 2022-03-07 10:00
tags:
  - Azure AD
  - US Identity Blog
---
# Azure AD のエンタイトルメント管理におけるカスタム ワークフローの実行
こんにちは、Azure Identity サポート チームの 竜 です。
本記事は、2022 年 02 月 24 日に米国の Azure Active Directory Identity Blog で公開された [Run custom workflows in Azure AD entitlement management](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/run-custom-workflows-in-azure-ad-entitlement-management/ba-p/2466938 を意訳したものになります。
----

[Azure Logic Apps を使用したエンタイトルメント管理にカスタム ワーク フロー](https://docs.microsoft.com/ja-jp/azure/active-directory/governance/entitlement-management-logic-apps-integration)が導入されたことにより、ユーザーのアクセス管理における複雑なプロセスの自動化が、さらに容易になりました。今回は、この新しい機能を使用して、ユーザーがアクセス パッケージへオンボーディング (利用開始) およびオフボーディング (利用終了) する際のフローをカスタマイズするいくつかのシナリオをご紹介いたします。これらのプロセスを自動化することで、手動の作業によるミスを減らし、また、その他の優先度の高い事業内容に時間をさけるようになります。

アクセスの付与や削除は、Teams、SharePoint、Groups、アプリなどのリソースへのプロビジョニングだけではありません。電子メールの送信や、データ ベースのレコードの更新など、組織にとって必要となる追加の手順がしばしば発生します。これらの作業は、従来、手動で行われていました。例えば、アクセス パッケージの承認者は、チームに向けて新しいメンバーの参加を知らせる電子メールを送信したり、アクセス パッケージのメンバーシップの変更やさらに関連する変更を行うために、定期的にスクリプトを実行するなどしていました。

アクセス パッケージのリクエストが承認されたときや、ユーザーのアクセス期限が切れたときなど、エンタイトルメント管理の特定のイベントを使用してカスタム ワークフローを起動することで、多数の Microsoft のクラウド アプリケーションに加えて、Salesforce や ServiceNow などの外部アプリケーションにまでエンタイトルメント管理を拡張し、これまで手動で行われていたプロセスを自動化することができます。ここでは、架空の会社である Contoso 社が、これらの機能をどのように活用できるかをいくつか見てみましょう。


## エンタイトルメント管理を外部アプリケーションと連携させる  

例えば、Contoso 社では Salesforce を使用して営業チームの案件や機会を管理しています。営業チームは Azure Active Directory (Azure AD) のエンタイトルメント管理でアクセス パッケージを使用し、営業チームのメンバーに関連リソースや SharePoint サイトへのアクセスを付与し、Salesforce にもアクセス可能なようにしてあります。Salesforce へのアクセスの付与に加え、新しいメンバーが Salesforce の特定の案件や連絡先に割り当てられるようにし、またメンバーがチームを離れる際にはその案件や連絡先がチームの他のメンバーに割り当てられるようにしたいと考えています。

![](./run-custom-workflows-in-azure-ad-entitlement-management\smoorhead_0-1644862613628.png)

##### カスタムの呼び出しを作成し、特定のロジック アプリをカタログに追加することで、ポリシーで定義した特定のアクション (アクセス パッケージの割り当てなど) が生じた際に呼び出すことができます。

従来は手作業で行っていた Salesforce のレコード更新を、カスタム ワークフローを設定することで自動化できるようになりました。新しいユーザーが、営業チームのアクセス パッケージへのアクセスを承認されると、自動的にロジック アプリが起動し、そのユーザーを適切な案件や連絡先に割り当てることができます。同様に、ユーザーがアクセス パッケージから削除されると、別のロジック アプリが自動的に起動し、そのメンバーが担当していた Salesforce リソースなどの再割り当てが行われます。これらのプロセスを自動化することで、チームはアクセスの管理ではなく、実際の業務に集中することができるようになります。

![](./run-custom-workflows-in-azure-ad-entitlement-management\smoorhead_1-1644862613635.png)
![](./run-custom-workflows-in-azure-ad-entitlement-management\smoorhead_2-1644862613641.png)

##### アクセス パッケージの割り当てに紐づいた「Salesforce を編集するロジック アプリ」により、顧客アカウントの連絡先として、営業担当者が追加されます。


## ポリシーと連動したカスタム 電子メールの送信 

また、Contoso 社では、ユーザーが営業チームのアクセス パッケージに承認された際に、営業チームに電子メールを送信し、新しいメンバーがチームに参加したことを知らせたいと考えています。Outlook Web for Office 365 を呼び出すシンプルなロジック アプリを作成し、ユーザーが営業チームのアクセス ペッケージの承認を受けたときにこのロジック アプリが起動されることで、このプロセスをシームレスに自動化することができます。

![](./run-custom-workflows-in-azure-ad-entitlement-management\smoorhead_3-1644862613648.png)
##### ロジック アプリでカスタムメールを作成した例


## リソースとフィードバック 
これらは、Azure Logic Apps で作成したカスタム ワークフローにアクセス パッケージを紐づけることで、エンタイトルメント管理でさらに多くのユース ケースに対応できるようになったシナリオのほんの一例です。ぜひお試しいただき、ご意見をお聞かせください。

詳細につきましては、 [ドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/governance/entitlement-management-logic-apps-integration)や[動画のチュートリアル](https://www.youtube.com/watch?v=Yh_Xl617JkM&ab_channel=JefKazimer-CloudIdentity)をご覧ください。[aka.ms/AzureADFeedback](https://feedback.azure.com/d365community)へのフィードバックもお待ちしております。
