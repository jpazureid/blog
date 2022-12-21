---
title: Microsoft Entra ワークロード ID の一般提供 
date: 2022-12-30 09:00
tags:
    - Azure AD
    - US Identity Blog
---


# Microsoft Entra ワークロード ID の一般提供 

こんにちは、Azure Identity サポート チームの 三輪 です。 

本記事は、2022 年 11 月 28 日に米国の Azure Active Directory Identity Blog で公開された[Microsoft Entra Workload Identities now generally available - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-workload-identities-now-generally-available/ba-p/3402815)を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。 


---

クラウドの普及に伴い、より多くのワークロードがクラウドに移行し、新しいエンタープライズ ソフトウェアのソリューションがクラウド上で直接展開されるようになっています。その結果、ワークロード用の ID が大量に増加しており、これらの ID に関連するデータやリソースへのアクセス許可が爆発的に増加しました。組織やセキュリティ プロバイダーは、これまで人間の ID についてのセキュリティに注力してきたため、こうした新たに増加している ID を管理するためのアクセス制御やセキュリティ機能は限定的でした。このため、ID セキュリティの担当者の負担はますます大きくなっています。 
 
ゼロ トラストとは、すべての人 (およびすべてのもの) が確実かつ継続的に認証と認可を受けるようにすることです。ワークロードのような新しい要素が組織の環境に導入されるとき、それらの要素もゼロ トラスト戦略に組み込まれなければなりません。このため、私たちは、すべての人とすべてのものをサポートするというミッションの一環として、サポートする ID の種類を拡大し、ワークロード ID をサポートの対象に加えました。

本日、[Microsoft Entra](https://www.microsoft.com/ja-jp/security/business/microsoft-entra?ef_id=d3c1ccf38a5f1ddc6624af9a95fd6a0f:G:s&OCID=AIDcmmdamuj0pc_SEM_d3c1ccf38a5f1ddc6624af9a95fd6a0f:G:s&msclkid=d3c1ccf38a5f1ddc6624af9a95fd6a0f) ポートフォリオの新機能として、[Microsoft Entra ワークロード ID](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-workload-identities) の一般提供（GA）を発表します。Microsoft Entra ワークロード ID は、独立したソリューションとして、1 ワークロード ID あたり月額 3 ドルで本日より提供されます。


## 人間の ID 以外の ID に高度な機能を拡張する  
現在 Microsoft Entra で扱われている、ワークロード ID の数は 2019年の 3 倍以上に増えています。Evaluserve が今年実施した調査では、68% のワークロードが機密データや資産にアクセスできることが判明しています。しかしながら、組織もセキュリティ プロバイダーも、人間の ID のセキュリティばかりに注力しがちです。結果として人間の ID のセキュリティが向上し続けているため、最近のサイバー攻撃では、ワークロード ID が標的環境への侵入口として使われ始めています。そのため、ワークロード ID を管理し保護することは、組織、ユーザー、およびデータを保護するために非常に重要です。Microsoft Entra ワークロード ID を使用すると、条件付きアクセスの実装、脅威の未然防止、ワークロード ID のライフサイクルの把握により、ワークロード ID のセキュリティを強化することができます。 


主な機能 
- [条件付きアクセス](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/workload-identity)：業界で最も強力なアクセス制御の 1 つである条件付きアクセスをワークロード ID に導入することができます。条件付きアクセスは、ワークロード ID の場所ベースまたはリスク ベースのポリシーをサポートします。組織は信頼できる場所以外からのサインイン試行や、Identity Protection によって検出された危険なアプリやサービスによるサインイン試行をブロックすることができます。 
- [Identity Protection](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-workload-identity-risk)：人間の ID とは異なり、ワークロード ID のライフサイクルは十分に定義されていないことが多く、そのため管理が困難です。この問題に対処するため、マイクロソフトではワークロード ID のライフサイクルを横断的に調査し、怪しい兆候がないかを監視しています。Identity Protection は、資格情報の侵害、異常なサインイン、アカウント情報の不審な変更に関するレポートを提供します。危険なユーザーと同様に、危険なワークロード ID のリスク レポートは、ポータル、Microsoft Graph、または、診断設定を使用してデータをエクスポートした先のツールなど、お好みのフォーマットで表示することができます。 
- [アクセスレビュー](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-create-azure-ad-roles-and-resource-roles-review?toc=%2Fazure%2Factive-directory%2Fgovernance%2Ftoc.json)：特権ロールの割り当てに関連するリスクを軽減するために、定期的なアクセス レビューが必要です。この機能により、ワークロード ID に対してアクセス レビューを作成し、最小特権アクセスを強制することができます。 
 
これは、ワークロード ID を使用して組織の生産性と安全性を維持するという私たちの取り組みの始まりにすぎません。未使用のアプリ、期限切れの資格情報、未使用の資格情報などのアプリケーションに関する推奨事項を提供する新機能である [Azure Active Directory の推奨事項](https://learn.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/overview-recommendations)の App Health Recommendations は、11 月末までにパブリック プレビューを開始する予定です。 
 
## Microsoft Entra Workload Identities を今すぐお試しください 
Microsoft Entra Workload Identities の [90 日間無料試用版](https://ms.portal.azure.com/?feature.canmodifyextensions=true&feature.canmodifystamps=true&Microsoft_Azure_ManagedServiceIdentity=test3&Microsoft_AAD_IAM_isWorkloadIdentitiesFreeTrialEnabled=true&Microsoft_Azure_ManagedServiceIdentity_isWorkloadIdentitiesUpsellBannerEnabled=true&Microsoft_Azure_ManagedServiceIdentity_isWorkloadIdentitiesPlaceHolderBannerEnabled=false#view/Microsoft_Azure_ManagedServiceIdentity/WorkloadIdentitiesBlade)では、新しい条件付きアクセス ポリシーを設定し、検出されたリスクのレポートを確認し、最小特権アクセスを適用することができます。 
 
Microsoft Entra ワークロード ID の詳細については、[弊社の Web サイト](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-workload-identities)で[製品ドキュメント](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/workload-identities-overview)をご覧ください。私たちは、この体験をお客様と共にすることを楽しみにしており、お客様からのご連絡をお待ちしております。 
 

Ilana Smith  
Group Product Manager  
Azure Active Directory  
@ilanas  

