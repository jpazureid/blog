--- 
title: アプリとサービス向けの ID 管理、ガバナンス、そして保護
date: 2022-07-04 10:00 
tags: 
  - Azure AD 
  - US Identity Blog 
--- 

# アプリとサービス向けの ID 管理、ガバナンス、そして保護

こんにちは、Azure Identity サポート チームの 村上 です。

本記事は、2022 年 6 月 9 日に米国の Azure Active Directory Identity Blog で公開された [Managing, governing, and securing identities for apps and services](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/managing-governing-and-securing-identities-for-apps-and-services/ba-p/3402816) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

皆さん、こんにちは。

お客様とお話をしていると、条件付きアクセスや Identity Protection、ID ガバナンスなど、ユーザーを保護するための Azure Active Directory (Azure AD) の主要な機能について、深く掘り下げ解説することがよくあります。多くのお客様にとって、これらの機能をあらゆる ID に適用することは、ゼロ トラストを推進し、ビジネスを保護するための戦略において非常に重要であることを認識しています。  

この度、Microsoft Entra ワークロード ID を発表できることを大変嬉しく思っています。この全く新しい機能は、ユーザー向けに組織が使用しているものをワークロード ID に合わせたて応用したものです。  

## ワークロード ID とは何ですか？  

Microsoft Entra の ID およびアクセス管理ソリューションでは、ID はユーザーだけではありません。Azure AD を含む Microsoft Entra では、従業員やパートナー、顧客といった人間の ID だけでなく、人間以外の (あるいは機械の) ID のアクセス管理も支援します。例えば、デバイスの ID や、アプリやサービスの ID が含まれ、これらは業界では「ワークロード ID」と呼ばれ始めています。Microsoft Entra では、ワークロード ID にはアプリケーションとサービス プリンシパルが含まれます。  

![Microsoft Entra における ID の種類](./managing-governing-and-securing-identities-for-apps-and-services/sdriggers_0-1654268125171.png)

## なぜワークロード ID の管理が重要なのか？

ユーザー ID と同じように、ワークロード ID は有用であると同時に、攻撃の対象となるものでもあります。ワークロード ID は、企業の最も重要なリソースにアクセスする可能性があり、悪意ある行為者にとっては、損害を与えたり、被害を拡大させたりするための攻撃対象となりえます。[同意のフィッシング攻撃](https://docs.microsoft.com/ja-jp/azure/active-directory/manage-apps/protect-against-consent-phishing) のような手口は、悪質なアプリを組織に持ち込む可能性があり、認証情報の漏洩は、攻撃者が既存のアプリケーションやサービスを悪用することを可能にします。このような攻撃は、[最近の有名な事例](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/understanding-quot-solorigate-quot-s-identity-iocs-for-identity/ba-p/2007610) を含め、実際に確認されています。  

企業がクラウドの活用を進めるにつれて、ワークロード ID の数は増え続けています。一方でワークロード ID の特性により、企業のユーザーを管理するよりもはるかに管理が難しくなっています。多くの組織は、従業員の人数が増加していくにつれ、適切なアクセスの傾向がどういったものか一般的な知見を持っています。ほとんどの組織では、人事システムが従業員のマスター データとして利用されます。人間のユーザーであれば、パスワードなどの秘密を守るであろうと信頼することができます。しかし、ワークロード ID には、このような利点がほとんどありません。扱いにくく、気が付けば数が増え、優れたライフ サイクル管理の方法もほとんどありません。 また、その行動パターンも予測しにくく、責任の所在も不明確です。  

これに対して、ユーザー ID の機能を活用する企業も出てきています。組織は、ワークロードをユーザー ID (しばしば「サービス アカウント」と呼ばれます) としてあてはめ、条件付きアクセスのような機能を用いてワークロード ID の安全性を保っています。しかしながら、ワークロード ID の挙動はユーザーとは大きく異なり、異常な挙動にもさまざまなパターンがあるため、これらは解決策として不十分です。それよりも、ワークロード ID のために特別に構築された機能が必要です。

## Microsoft Entra ワークロード ID の紹介  

[ワークロード IDの包括的な機能セット](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/workload-identities-overview) を紹介します。すでにパブリック プレビューで多くのお客様にお試しいただいている機能も以下に含まれています。運用環境での使用が可能になったのは、以下の 3 つです。

- [ワークロード ID の条件付きアクセス](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/workload-identities-overview): ワークロードがリソースにアクセスする際の条件 (IP アドレス範囲など) を定義するポリシーを設定することができます。

- [ワークロード ID の Identity Protection](https://docs.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-workload-identity-risk): 異常な振る舞いやその他のシグナルに基づいて、リスクの高いワークロード ID を特定 (およびブロック) するのに役立ちます。

- [特権的なロールに割り当てられたワークロード ID のアクセス レビュー](https://jpazureid.github.io/blog/azure-active-directory/introducing-azure-ad-access-reviews-for-service-principals/): 特に高い特権的アクセスを監視することができます。

また、組織がワークロード ID の全体像をよりよく理解できるようにするため、より新しい機能についても開発に取り組んでいます。最近使用されていない ID を特定し、削除する可能性がある機能です。これは、組織が自社の資産と攻撃対象領域を適切に評価するために、不可欠な機能です。  

ユーザー ID と同様、この新機能は ID 単位でライセンスされるため、組織は保護する必要のあるワークロード ID に合わせて使用状況を調整することができます。この新しいサービスは、今年後半に購入可能となる予定です。  

本日ご紹介した内容は、ワークロード ID を使用して組織の生産性と安全性を維持するために、私たちが構築していることのほんの始まりに過ぎません。 お客様とともに歩みを進め、フィードバックを頂戴できることを楽しみにしています。  

Ilana Smith  
Group Product Manager  
Azure Active Directory  
@ilanas
