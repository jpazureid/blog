
---
title: シークレットなしで異なるソフトウェア ワークロードから Azure リソースにアクセス
date: 2022-02-08 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# シークレットなしで異なるソフトウェア ワークロードから Azure リソースにアクセス

こんにちは、Azure Identity サポート チームの 村上 です。

本記事は、2022 年 1 月 31 日に米国の Azure Active Directory Identity Blog で公開された [Access Azure resources from software workload in different environments, no secrets necessary](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/access-azure-resources-from-software-workload-in-different/ba-p/2464394) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

皆さん、こんにちは。

誰もが体感しているように、世界全体がデジタル化され、あらゆるものがクラウドに接続されるようになってきています。これは、皆さんの組織がこれまで以上に多くのソフトウェアを作成および使用し、そのほとんどがどこかのクラウドでワークロードとして稼働していることを意味します。

通常、これらのソフトウェア ワークロードは Azure Storage や Key Vault、Microsoft Graph からアクセスできる文書や電子メールなどのクラウド上のリソースにアクセスする必要があります。そしてこれらのソフトウェア ワークロードは、ユーザーと同じように認証する必要があります。しかしこれは開発者や DevOps、管理者にとって大きな課題となります。これはこの認証を行うために必要なシークレットを扱う必要があるからｄえす。これらのシークレットは、安全に保管され、頻繁にローテーションされなければなりません。特に、他のリソースにアクセスする必要のあるソフトウェア ワークロードの数が増えているため、多くの組織でシークレットの管理が難しくなっています。 

そこで私たちは、認証におけるシークレットの必要性を最小限に抑えるために、Azure AD にワークロード ID フェデレーションという新しいパブリック プレビューの機能を追加しました。これは、ソフトウェア ワークロードが Azure のマネージド ID を使用できない環境で動作している場合に特に便利です。この機能により、Azure や Microsoft Graph など Azure AD で保護されたリソースに、シークレットなしでアクセスできるようになります。他の ID プロバイダーからソフトウェア ワークロードに発行されたトークンを信頼するように、Azure AD を構成することができます。ソフトウェア ワークロードは、これらのトークンを使用して Azure AD のトークンを取得し、Azure と Graph リソースにアクセスできます。

以下に、ワークロード ID フェデレーション機能を利用できるシナリオをいくつか紹介します。 

- **GitHub Actions ワークフローで Azure による CI/CD を実現**: GitHub リポジトリに Azure AD シークレットを保存するのではなく、GitHub トークンを使用してサービスを認証し、Azure にデプロイすることが可能です。(詳細は [GitHub のドキュメント](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure) をご覧ください) 
- **Kubernetes クラスタで動作するサービス**: Kubernetes クラスタによりサービス アカウントに発行されるトークンを使用して、Azure リソースにアクセスすることができます。[Azure AD workload identity for Kubernetes](https://github.com/Azure/azure-workload-identity) は、この機能の利用を案内しているオープンソース プロジェクトで、実行場所にかかわらずこの機能を利用いただけます。
- **ワークロード ID に SPIFFE/SPIRE を使用しているサービス**: ソフトウェア ワークロードで利用している ID に SPIFFE/SPIRE を使用している場合、SPIFFE トークンを使用して Azure リソースにアクセスすることができます。 
- **Google Cloud Platform で動作するサービス**: Google サービス アカウントに発行された ID トークンを使用すると、GCP (Google Cloud Platform) で動作するソフトウェア ワークロードは追加のシークレットなしで Azure リソースにアクセスできます。

私のチーム メンバーである [Uday Hegde](https://twitter.com/udayxhegde) のブログにて、それぞれのシナリオについて説明しています。 

- [GitHub Actions CI/CD to Azure](https://blog.identitydigest.com/azuread-federate-github-actions/)
- [Services running in Kubernetes clusters](https://blog.identitydigest.com/azuread-federate-k8s/)
- [Services using SPIFFE/SPIRE for their workload identities](https://blog.identitydigest.com/azuread-federate-spiffe/)
- [Services running in Google Cloud Platform](https://blog.identitydigest.com/azuread-federate-gcp/) 
 
私たちは今後も、このようなシークレットの必要ない認証を実現できるシナリオを拡大していきたいと考えていく予定です。

Azure AD ワークロード ID フェデレーションについては、[こちらの公開情報](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/workload-identity-federation) で詳しく説明していますので併せてごらんください。

いつも通り、ご意見やご感想をお待ちしております。以下のコメント欄、または [Azure AD フィードバック フォーラム]((https://feedback.azure.com/d365community/forum/22920db1-ad25-ec11-b6e6-000d3a4f0789)) でご意見をお聞かせください。

Alex Simons (Twitter: [@alex_a_simons](https://twitter.com/Alex_A_Simons))  
Corporate Vice President Program Management  
Microsoft Identity Division
