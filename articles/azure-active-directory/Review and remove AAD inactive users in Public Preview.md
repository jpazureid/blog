
---
title: 非アクティブなユーザーのレビューおよび削除がパブリック プレビューとなりました
date: 2022-05-30 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# 非アクティブ ユーザーのレビューおよび削除がパブリック プレビューとなりました

こんにちは、Azure Identity サポート チームの 村上 です。

本記事は、2022 年 5 月 24 日に米国の Azure Active Directory Identity Blog で公開された [Review and remove AAD inactive users in Public Preview](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/review-and-remove-aad-inactive-users-in-public-preview/ba-p/3290632) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

皆さん、こんにちは。

本日は、Azure Active Directory Identity Governance の一部である、非アクティブなユーザーに対するアクセス レビューがパブリック プレビューとなりましたことを紹介させていただきます。この 2 年間で、組織内ならびに組織間でのコラボレーションが急増しました。 このようなコラボレーションは、生産性の向上につながる一方で、「古い」アカウント (一時期は必要であったが、現在は不要なアカウント) が継続してご利用環境に存在している可能性を高める状況にもなっています。例えば、退職した元従業員や、業務が終了した契約社員などです。このような古いアカウントを発見し、今後利用する必要がない場合は削除することで、簡単かつ強力にセキュリティ リスクを低減することができます。

非アクティブなユーザーに対するアクセス レビューのパブリック プレビューにより、管理者は一定日数サインインしていない古くなったアカウントをレビューし、削除することができます。対話型サインインと非対話型サインインの両方が、サインイン アクティビティに含まれます。レビュー プロセスの一環として、古くなったアカウントは自動的に削除されます。これにより、組織のセキュリティ体制が改善されます。

非アクティブなユーザーのリスクを軽減したいとお考えであれば、今すぐアクセス レビューをお試しください。ゲスト ユーザーまたはすべてのユーザーに対して、最長 2 年間の非アクティブ期間を指定することができます。 
 
![](./review-and-remove-aad-inactive-users-in-public-preview/image01.jpg)

非アクティブなユーザーのレビューのセットアップ方法については、詳しくは [Azure AD アクセス レビューのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/governance/create-access-review) を参照ください。MS Graph API (ベータ版) を使ってこれらのレビューを試すには [MS Graph API のドキュメント](https://docs.microsoft.com/ja-jp/graph/api/accessreviewset-post-definitions?view=graph-rest-beta&tabs=http%22%20%5Cl%20%22example-4-create-an-access-review-on-a-group-with-multiple-stages) をご覧ください。 

Alex Simons (Twitter: [@Alex_A_Simons](https://twitter.com/alex_a_simons))  
Corporate Vice President of Program Management  
Microsoft Identity Division

