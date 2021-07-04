---
title: Azure AD ゲストアクセスレビューを活用した、ゲスト ユーザーとの安全なコラボレーション
date: 2021-07-08
tags:
  - Azure AD
  - B2B
  - governance
---

# Azure AD ゲストアクセスレビューを活用した、ゲスト ユーザーとの安全なコラボレーション

> この記事は [Securely collaborate with guests using Azure AD guest access reviews](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/securely-collaborate-with-guests-using-azure-ad-guest-access/ba-p/2466940) の抄訳です。


日々の業務の中で、顧客やパートナー、ベンダーと共同作業 (コラボレーション) をする機会は、沢山ありますよね。
現代では、業務において多くのアプリケーションやソフトウェア、デバイスが活用されています。組織外のユーザーとのコラボレーションにおいても、組織外のユーザーを自社のアプリに招待したり、自社のリソースへのアクセスを許可したりする必要が出てくるでしょう。

このような組織外のユーザー (以下、ゲスト ユーザー) のデジタル アイデンティティは、扱いを間違えれば、セキュリティ リスクにつながる可能性も否めません。

マイクロソフトの調査によると、IT 管理担当者の 40 ％ 以上が、セキュリティ態勢を改善するための、デジタル アイデンティティ管理の最適策を求めている、と回答しています。


![ゲスト アカウントを管理 (チェック、必要に応じてクリーンアップ) するプロセスはありますか？](./secure-collaboration-with-AAD-guest-access-reviews/survey.png)



アンケート回答者の 70％ 以上が、「ゲストアカウントを管理するプロセスがない」、または「手動で管理している」と回答しています。手動での管理は、カスタムスクリプトやミドルウェアに依存していることが多いため、ヒューマン エラーが発生する可能性が高く、セキュリティリスクの増大につながります。

また、IT 管理者は、会社のリソースにアクセスをするすべての外部ユーザーを、余すことなく把握することはできません。ゲスト ユーザーのデジタル アイデンティティとアクセスの管理に最も適した人物は、IT 管理者ではなく、ビジネスマネージャーです。


Azure Active Directory Identity Governance は、組織の境界を越えた安全なコラボレーションを可能にします。

お客様は、直感的なインターフェースによって、定期的な自動アクセスレビューを設定することができます。ゲスト ユーザーは過不足のないリソース / 時間の範囲内でのアクセスが確保されます。

## Azure AD のゲストアクセスレビューを使用して、ゲストとの安全なコラボレーションを

ゲスト ユーザーが機密データへのアクセスを必要としなくなったら、企業は自動的に、ユーザーのアクセス権限を取り消すことができます。
ビジネスオーナーやマネージャーが Azure AD にいない場合、ゲスト ユーザーは自身のグループのメンバーシップを確認することができます。


![図1：アクセスレビュー機能により、ゲストのアクセスを安全に管理することができます。](./secure-collaboration-with-AAD-guest-access-reviews/figure1.png)


 
## ゲスト ユーザーのアクセスを自動で管理しましょう

機密データへのゲスト アクセスのプロビジョニングとデプロビジョニングを自動化することで、従来の管理方法 (カスタムスクリプトやミドルウェア) は不要になります。手動プロセスに伴うエラーを削減することができます。

SaaS アプリケーションへのゲストのアクセスのプロビジョニングとデプロビジョニングを自動化することで、ゲストはアプリへのアクセスに、組織が事前に許可した範囲内でのみアクセスすることができるようになります。IT 管理者がその都度、アクセスの許可を判断する手間はなくなります。

大規模な組織においては、ゲスト ユーザーのアクセス管理をするための最適役は、IT 管理者よりも現場を知る、ビジネスマネージャーである場合が多いでしょう。例えばAzure AD のガバナンス機能では、外部ユーザーのアクセス管理コントロールを、ビジネスマネージャーに委任することができます。

IT 管理者以外の人間にコントロールを委任することで、本当に適した人間が部門の機密データへのアクセスを管理していることを確認できます。
この委任によって、IT ヘルプデスクの負担が軽減されます。IT スタッフはその他の業務に専念できるようになります。

Azure AD Identity Governance のお客様からの評価は良好です。

> "Azure Active Directory のゲストアクセスレビューにより、適切なレベルの管理を行いながら、外部とのコラボレーションを行うことができるようになり、セキュリティ、法務、データプライバシーの担当者も安心しています。" by Avanade 社様

規制の厳しい業界や、政府機関などと連携している場合は、アクセス権に関するコントロールの有効性を、定期的に監査担当者に提示する必要があるでしょう。ゲスト ユーザー用の Azure AD アクセスレビューにより、組織が適切な管理と制御を行っていることを、簡単に証明することができます。

Azure AD は、シンプルなインターフェイスによって、すべてのアクセスレビューを一元的に表示します。IT 管理者は、マルチクラウド、マルチデバイス、アプリケーションごとに、ユーザーのリソースごとのアクセス可否を確認することができます。


Azure AD アクセスレビューの概要については、[公開情報](https://docs.microsoft.com/ja-jp/azure/active-directory/governance/manage-guest-access-with-access-reviews)と[ YouTube 解説](https://www.youtube.com/watch?v=3D2_YW2DwQ8)をぜひご覧ください。Azure AD Identity Governance の詳細については、[当社ウェブサイト](https://www.microsoft.com/ja-jp/security/business/identity-access-management/identity-governance
)をご覧ください。
 

## 参考情報

- 関連投稿 (英語) : [Access Reviews for guests in all Teams and Microsoft 365 Groups is now in public preview](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/access-reviews-for-guests-in-all-teams-and-microsoft-365-groups/ba-p/1994697)

- 当社ウェブサイト : [Azure AD でのアイデンティティ ガバナンス](https://www.microsoft.com/ja-jp/security/business/identity-access-management/identity-governance)
- 公開情報 : [Azure AD のアクセス レビューによるゲスト アクセスの管理](https://docs.microsoft.com/ja-jp/azure/active-directory/governance/manage-guest-access-with-access-reviews)
- YouTube 解説 (英語) : [Review guest user access across all Microsoft 365 groups and Microsoft Teams](https://www.youtube.com/watch?v=3D2_YW2DwQ8&feature=emb_imp_woyt)