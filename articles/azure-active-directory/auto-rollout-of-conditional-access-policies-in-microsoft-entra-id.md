---
title: Microsoft Entra ID の条件付きアクセス ポリシーの自動ロールアウト
date: 2024-03-17 09:00
tags:
    - US Identity Blog
---

# Microsoft Entra ID の条件付きアクセス ポリシーの自動ロールアウト

こんにちは、Azure Identity サポート チームの 山下 です。

本記事は、2024 年 2 月 6 日に米国の Microsoft Entra (Azure AD) Blog で公開された[Auto Rollout of Conditional Access Policies in Microsoft Entra ID](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/auto-rollout-of-conditional-access-policies-in-microsoft-entra/ba-p/4044870) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

> [!Note]
> サポート チームからの補足: Microsoft マネージド条件付きアクセス ポリシーの自動有効化は、下記ポリシーがレポート専用モードで作成されているテナントにおいて、現在順次進められております。自動有効化をご要望でないお客様は、レポート専用モードを無効状態に変更するようご対応ください。

----

2023 年 11 月の [Microsoft Ignite](https://ignite.microsoft.com/en-US/sessions/07952ef8-8603-4a94-8185-975ae95e53bb?source=sessions) にて、Microsoft マネージドのポリシーと、お客様テナントにおける多要素認証 (MFA) 関連の条件付きアクセス [ポリシー](https://ignite.microsoft.com/en-US/sessions/07952ef8-8603-4a94-8185-975ae95e53bb?source=sessions) の自動ロールアウトについて発表されました。それ以降、50 万以上のテナントに対してレポート専用ポリシーを展開しています。これらのポリシーは、セキュリティを向上させるための主要な技術の進歩を含む「Secure Future  Initiative」の一環です。これにより、将来的に増加すると予想されるサイバー脅威に対してお客様を保護することを目的としています。

このブログでは、これらのポリシーについて改めて詳しく説明し、それらがどのように機能するかを包括的に理解できるようにフォローアップすることを目的としています。

## マイクロソフトの管理者ポータルにアクセスする管理者のための多要素認証

高い権限を持つ管理者アカウントは攻撃を受ける可能性が高いため、これらの役割に対して MFA を実施することで、これらの特権管理機能を保護することが望まれます。このポリシーは、特権を付与された 14 の管理者ロールを対象としており、これらのロールを持つユーザーが Microsoft 管理者ポータルにサインインするときに多要素認証を要求します。このポリシーは、セキュリティの既定値群が有効になっていない Microsoft Entra ID P1 および P2 のテナントを対象としています。

## ユーザーごとの MFA を有効にしているユーザーのための多要素認証

ユーザーごとの MFA とは、ユーザーに個別に有効化ができ、サインインするたびに多要素認証を実行するよう求める機能です (信頼できる IP アドレスからサインインする場合や、信頼できるデバイスに MFA を記憶させる機能がオンになっている場合などを除きます)。Entra ID P1 のライセンスを持つお客様にとって、条件付きアクセスは多くの追加機能を備えた管理者向けの優れたオプションです。条件付きアクセスでは、[ユーザー グループ](https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-users-groups) や [アプリケーション](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps) を個別にポリシーの対象とすることや、リスクやデバイスに基づく [さらなる条件](https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-conditions)、[認証強度](https://learn.microsoft.com/entra/identity/authentication/concept-authentication-strengths) との統合、[セッション制御](https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-session)、[報告専用モード](https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-report-only) などが含まれています。これにより、MFA を求める対象をより絞り込むことができ、セキュリティの体制を維持しながら、エンドユーザーの負担を低減することが可能です。

このポリシーは、ユーザーごとの MFA を有効にしているユーザーを対象としています。このポリシーにより、これらのユーザーが条件付きアクセスの対象となり、すべてのクラウド アプリケーションで多要素認証を実行する必要が生じます。これにより、組織は条件付きアクセスへの移行を円滑に行い、エンドユーザーの業務に影響を与えずに高いセキュリティ レベルを維持させることができます。

このポリシーは、 Entra ID P1 および P2 のライセンスを持つユーザーを対象としています。セキュリティ既定値群のポリシーが有効でない場合や、ユーザーごとの MFA が有効になっているユーザーが 500 人未満の場合に適用されます。このポリシーが適用されても、エンドユーザーの体験に変化はございません。

## リスクの高いサインインのための多要素認証と再認証

このポリシーは、高リスクのサインインを検出した場合にのみ、追加のセキュリティ保護を提供することで、お客様が NIST [Zero Trust Maturity Model](https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf) におけるリスク評価の最適レベルを満たせるよう支援します。ここでいう「高リスクのサインイン」とは、特定の認証リクエストが正規の ID 所有者ではない可能性が非常に高いこと、もしくはそのリクエストがブルートフォース攻撃、パスワード スプレー攻撃、トークン リプレイ攻撃であることを意味しています。サインインのリスクに動的に対応することで、ほとんどのユーザーには意識させないまま、(同時に高いサインイン リスクを持たないユーザーには影響を与えないようにしながら) このポリシーは攻撃をリアルタイムで阻止します。ID Protection が攻撃を検出した場合、ユーザーは MFA で自己修復を促され、Entra ID で再認証され、侵害されたセッションはリセットされます。

リスクの高いサインインについて詳しくは[こちら](https://learn.microsoft.com/entra/id-protection/concept-identity-protection-risks%22%20/l%20%22sign-in-risk-detections) をご覧ください。

このポリシーは、Entra ID P2 テナント上のすべてのユーザーを対象としています。ここでは、セキュリティ既定値群が有効でなく、すべてのアクティブ ユーザーが既に MFA を利用しており、そして各ユーザーに十分なライセンスがある状態を想定しています。すべてのポリシーと同様に、自分自身をロックアウトしないように、緊急アクセス用アカウントやサービス アカウントを除外するようにお気を付けください。

Microsoft が管理する上記の条件付きアクセス ポリシーは、すべての対象テナントでレポート専用モードで作成されています。これらのポリシーは、Microsoft が提案しているもので、それぞれの組織の独自の環境に適用させて使用することができます。管理者は、[条件付きアクセスポリシーのブレード](https://entra.microsoft.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Policies/fromNav/Identity) 上で、これらのポリシーの表示および確認が可能です。管理者は [緊急アクセス用アカウントやサービス アカウント](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common?tabs=secure-foundation#user-exclusions) を除外するといったカスタマイズを行うことが推奨されます。準備が整ったら、ポリシーをオンに切り替えください。さらなるカスタマイズが必要な場合は、管理者はポリシーを複製して調整を行うことも可能です。

## 今すぐ行動を

Microsoft が管理する条件付きアクセス ポリシーを有効にし、組織のニーズに合わせてカスタマイズすることを今すぐお試しください。多要素認証ポリシーの実装に積極的に取り組むことは、進化するセキュリティの脅威から組織を守る上で非常に重要です。リソースを保護する方法の詳細については、[こちら](
https://learn.microsoft.com/en-us/entra/identity/conditional-access/managed-policies) の Microsoft 管理ポリシーのドキュメントを参照ください。
