---
title: Azure AD のセキュリティを強化するための Quick Wins
date: 2023-05-08 09:00
tags:
    - Azure AD
    - US Identity Blog
---

# Azure AD のセキュリティを強化するための Quick Wins

こんにちは、Azure Identity サポート チームの 五十嵐 です。

本記事は、2023 年 4 月 3 日に米国の Azure Active Directory Identity Blog で公開された [Quick Wins to Strengthen Your Azure AD Security](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/quick-wins-to-strengthen-your-azure-ad-security/ba-p/3767905) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

---

どの組織も、インフラの安全性と信頼性を高めるために、攻撃されうる範囲を縮小するべく取り組んでいらっしゃると存じます。

[Microsoft Global Compromise Recovery Security Practice (CRSP)](https://www.microsoft.com/en-us/security/blog/2021/06/09/crsp-the-emergency-team-fighting-cyber-attacks-beside-customers/) のチーム メンバーとして、セキュリティの態勢を改善し、侵害を平均よりも難しくすることで、低スキルの攻撃者がすぐに攻撃を諦めて次のターゲットに移る事例をこれまで数多く見てきました。

サイバー セキュリティの環境が変化する中、[ID は新しいセキュリティ境界であり](https://learn.microsoft.com/ja-jp/security/ciso-workshop/ciso-workshop-module-3?view=o365-worldwide#part-6-build-an-identity-perimeter-1357)、侵害されたユーザーが壊滅的なサイバー攻撃のきっかけであったという話をよく聞きます。

ID について語るとき、Microsoft Entra 製品群の一部である Azure Active Directory (Azure AD) は、ほとんどの組織で利用されている重要な ID システムであり、アプリケーションやリソースなどに対するユーザーの認証と認可のための中心点として機能します。 これは、組織のゼロ トラスト戦略の中核をなすものです。

このブログでは、Azure AD の攻撃範囲を縮小するための **Quick Win** (すぐに実施できる対応) をいくつかご紹介します。技術的な観点からすると、これらの対応はすぐに実行できるもので、本番で展開するためのテストも最小限のものとなります。

## 1. 作業用とクラウド管理用のアカウントの分離

ID は、新しいセキュリティの境界線です。もし 1 つの鍵で組織に入れてしまうのであれば、攻撃者は簡単にその組織を制圧できてしまいます。普段の業務用と管理用に同じアカウントを使用すると、組織のセキュリティが危険にさらされます。このことを念頭に置いて、普段の業務用と管理用のアカウントを分離する必要があります。普段の業務に使用される ID から特権を剥奪し、クラウドの管理用アカウントは個別に作成したうえで、その ID にも極力特権を与えないようにしましょう。

## 2. 緊急アクセス用アカウントの安全な管理

[緊急アクセス用アカウント](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/security-emergency-access) (**Break-Glass アカウント**) は高度な権限を持ち、他の管理アカウントが使用できないときという緊急のシナリオの時だけ利用されます。[ベスト プラクティス](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/security-emergency-access#create-emergency-access-accounts) に従って少なくとも 2 つ緊急アクセス用アカウントを作成し、それらのアカウントはどのユーザーとも紐づかないようにしてください。

緊急アクセス用アカウントの認証情報は安全に保存され、有効期限がなく、通常の業務に使用されることはありません。少なくとも 1 つの緊急アクセス用アカウントは、電話ベースの多要素認証 (MFA) を使用しないようにし、条件付きアクセスにおいても管理者/ユーザーによるクラウド アプリへのアクセスを制限/許可するポリシーから除外するよう対応ください。Azure AD の監査ログを使用して、サインインとすべての監査アクティビティを [監視する](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/security-emergency-access#monitor-sign-in-and-audit-logs) 必要もあります。

## 3. 特権アカウントの多要素認証

マイクロソフトでは、すべてのユーザーに対して MFA を有効にすることを推奨しています。[MFA はアカウント侵害攻撃の 99.9% 以上をブロックすることができます](https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/)。MFA をすべてのユーザーで有効にする際には、レガシー認証プロトコルに与える影響を徹底的にテストし、最終的にブロックする必要があります。したがって、こちらは中期から長期のセキュリティ強化目標と考えることができるでしょう。

中長期の取り組みが進む中で、クラウド上に管理アカウントを別途用意することになると思われます。当面のステップとして、まず、高い権限を持つすべてのユーザーに対して MFA を適用することから始めましょう。[条件付きアクセス ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/plan-conditional-access) を使用して、これらのユーザーに対して MFA を展開することが可能です。テナントに入れなくなってしまった場合の緊急事態に備えて、[緊急アクセス用管理者アカウントがポリシーから除外されていること](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/security-emergency-access#exclude-at-least-one-account-from-phone-based-multi-factor-authentication) を確認ください。MFA と条件付きアクセス ポリシーの使用は、攻撃者の時間とコストを増加させ、最終的に攻撃者の注目をそらせることにつながります。

## 4. 条件付きアクセスで SaaS (Software-as-a-Service) アプリケーションを管理するためのゼロ トラスト原則

ゼロ トラストのコンセプトは、全体的なセキュリティを強化するのに役立ちます。リソースを保護し、最新の認証の原則に従うことで、組織はリソースのセキュリティをより確実に確保できます。

常に検証を行い、最小限の権限でアクセスし、侵入を想定することが、[ゼロ トラスト](https://www.microsoft.com/ja-jp/security/business/zero-trust) のすべてです。企業ネットワークとカフェの公衆インターネットという単純な例で考えてみましょう。 従来のアプローチでは、企業ネットワークはネットワークの面で多くの投資がなされることで安全な状態にある… とされていました。しかし、新しいゼロ トラストのアプローチでは、ID、場所、デバイス準拠など、利用可能なすべてのデータポイントを明示的に検証することが必要です。

取り急ぎの対応として、すでに Azure AD と統合されているアプリで試験運用を開始することをお勧めします。条件付きアクセス ポリシーとゼロ トラスト原則に基づく強固なアクセス モデルの構築を開始するためには、[展開ガイダンス](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/plan-conditional-access) と [ベスト プラクティス](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/resilience-overview) を確認ください。

## 5. [アプリケーションへの Azure AD SSO](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/five-steps-to-full-application-integration-with-azure-ad) を評価

SSO (**シングル サインオン**) は、ユーザーに利便性と安全性をもたらします。ユーザーが頻繁に認証情報を求められると、毎日何度も認証情報を入力することになり、ユーザーは詳細を確認せずに画面に認証情報を入力してしまうことになります。さらに、すべてのアプリケーションに認証情報の痕跡が残ることになります。

[Azure AD は最新の認証プロトコルと強力な認証機構をサポートしています](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/active-directory-faq#azure-ad----------------------------------------------------)。Cisco のようなデバイスを Azure AD と統合して認証することも可能です。

[Azure AD ギャラリーには、何千ものビジネス生産性アプリケーションがあらかじめ統合されています](https://learn.microsoft.com/ja-jp/azure/active-directory/saas-apps/tutorial-list)。まず最初のステップとして、組織で導入される新しいアプリケーションを [統合する](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/plan-an-application-integration) ことを検討ください。加えて、ID ライフサイクルの管理向上のために、アプリケーションへの Azure AD ユーザー プロビジョニングを利用しましょう。  

次に取り組む作業としては、クレームに基づいて動作しているアプリケーションを確認することです。さらに、複数の ID プロバイダーをサポートするアプリケーションがないかも確認できれば、それを SSO のテストと展開の最初の候補とすることもできます。

## 6. Azure AD で ID ガバナンスを有効化

ID ガバナンスは、組織のセキュリティのバランスをとる確立された方法であり、ID のライフサイクルを標準化された方法で管理することでそれを実現します。ID ガバナンスを活用すると、「誰が何にアクセスできるのか」を体系的に定義できます。このソリューションを活用しても、組織の生産性に悪影響を及ぼすことはありません。

[エンタイトルメント管理](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/entitlement-management-overview) では、アクセス パッケージというものを作成でき、ユーザーが新しいプロジェクト/チームに参加する際に必要となるグループ、アプリ、チーム、SharePoint サイトへのアクセスを、手動で付与するのでなく、ユーザーが自らリクエストできるようになります。エンタイトルメント管理は社外とのコラボレーション シナリオもサポートしておりますので、詳細は [B2B シナリオのためのエンタイトルメント管理](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/entitlement-management-external-users) を参照ください。

さらに、過剰な権限は、セキュリティを脆弱にします。組織のリソースへのアクセス権をレビューして維持や剥奪を判断したい場合は、Azure AD の [アクセス レビュー](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/access-reviews-overview) をぜひ活用ください。

今後新たに付与するアクセス権に対してこの機能の評価を始め、徐々にすべてのビジネスにおいてアクセス パッケージを使用するように移行することがおすすめです。

## 7. Azure AD Identity Protection によるユーザーとサインインのリスク検出

[Identity Protection](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/overview-identity-protection) は、Azure AD、Microsoft アカウント、および XBOX から収集したインテリジェンスを活用する Azure AD の強力な機能です。Identity Protection がサインイン要求を処理すると、お客様ではその結果を使用してアクセスを許可するか拒否するかなどの決定を下すことができます。

Identity Protection はユーザーやサインインのリスクを判断し、組織が適切な対処を実施できるよう支援します。
例えば、ユーザーが匿名 IP アドレスから接続していることが判明したときは、サインイン リスクが中または高の場合に MFA を強制したり、ユーザーの資格情報がダーク ウェブに流出していると Identity Protection が判断したときは、ユーザーにパスワードを変更するよう強制したりすることができます。

お客様においては、[リスク検出をシミュレートする](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/howto-identity-protection-simulate-risk) ことで、[レポート専用モード](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies#enable-policies) で Identity Protection の評価を開始できます。 Identity Protection により検出されたリスクを監視し、その詳細を理解するという意味では、[Identity Protection Risk Analysis ワークブック](https://learn.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/howto-use-azure-monitor-workbooks#identity-protection-risk-analysis) が最適な方法です。

## 8. Azure RBAC による最小特権の適用

[ロールのセキュリティ](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/security-planning) をどのように確保するかは、どの組織にとっても重要です。特権 ID が攻撃の手段として使われることは、セキュリティ侵害のシナリオでよく見られることです。

[特権 ID 管理 (PIM)](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-configure) を用いることで、時間制限のあるアクセスを実現でき、特権ロールを有効にするためにさらに承認手続きを追加することでさらにセキュリティを向上させることができます。例えば「ドメイン名の管理者」ロールは、Azure AD にドメインを登録する際に必要な特権ですが、使用頻度が非常にまれな特権です。ユーザーはこの特権を 24 時間 365 日保持する必要はありません。代わりに、必要なときに有効化することでその業務を行うことができますし、ポリシーに基づいて一定時間後にユーザーは特権を剥奪されます。

PIM は、ロールを有効化する際に、MFA やロールのアクティブ化の正当性の要求、ロールが有効になったときの管理者への通知、アクセス レビューの有効化、アクティビティの監査など、追加の制御や情報を要求できます。さらに、PIM は Microsoft 365 だけでなく、Azure リソースにも使用することができます。

[PIM の導入](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-deployment-plan) は、組織が有効な割り当てと資格ある割り当ての両方を評価する際の重要な最初のステップです。例えば、緊急管理者アカウントはグローバル管理者権限を恒久的に保持すべきですが、その他の役割は必要なときに得られるようにすべきです。

## 9. パスワード保護の機能で弱いパスワードを撤廃

"Summer2022!" は、大文字、数字、特殊文字からなるパスワードで、通常の最小文字数要件を満たしているように見えます。しかしながら、このようなパスワードは辞書ベースのパスワード攻撃に脆弱です。[Azure AD のパスワード保護](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-password-ban-bad-on-premises-deploy) は、組織がこのようなパスワードの使用を阻止できる素晴らしい機能です。パスワード保護では、グローバルおよびカスタムの禁止パスワード リストがご利用いただけます。

この機能は、[軽量エージェントを介してドメイン コントローラー上で](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-password-ban-bad-on-premises-deploy#deployment-requirements) 使用することもできます。セットアップは簡単で、監査モードもサポートしているため、管理者は組織内の安全でないパスワードの使用状況を把握し、パスワード ポリシーやユーザーへのガイダンスへの改善を計画することができます。

## 10. ユーザー同意の制限

ユーザーは、[同意](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/user-admin-consent-overview) の機能を使用して、保護されたリソースにアクセスするためのアクセス許可をアプリケーションに付与することができます。例えば、サポート担当者が問題の説明を電子メールで受け取ると、それに基づいてインシデントを発行するチケット システムを例にとって説明しましょう。これがうまく動くためには、チケット システムはユーザーのメールボックスを読み取る権限が必要です。既定では、ユーザーがアプリケーションに同意しない限り、Azure AD は要求されたアクセス許可をアプリケーションに付与しません。

お客様は管理者として、ユーザーが同意できなくする (同意機能を無効化する)、確認済みの発行元のアプリケーションにのみ同意を許可する、または任意のアプリケーションにユーザーの同意を許可するのいずれかを選択できます。マイクロソフトは、[ユーザーの同意を確認済みの発行元のアプリケーションのみに制限し](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal&pivots=portal)、同意できるアクセス許可を管理者が選択したものに制限することを推奨しています。

お客様におかれましては、[同意のフレームワークとアプリケーションの同意エクスペリエンス](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/application-consent-experience) について把握するべく、まずは管理者の [同意の要求の評価](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/manage-consent-requests) を開始することをお勧めします。管理者にて同意を安全に行う必要性が理解できたら、ユーザーの啓発に加えて、[管理者の同意](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/configure-admin-consent-workflow) が必要なフローについても確認いただき、[テナント全体の管理者の同意要求を評価する](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/manage-consent-requests#evaluate-a-request-for-tenant-wide-admin-consent) などの取り組みも実施いただければと思います。

## 11. Azure AD と接続されたシステムの継続的なモニタリング

ID システムはインフラのバックボーンであるため、Azure AD とそれに付随する Azure AD Connect や AD Federation Services (AD FS) のようなシステムの監視業務はすべてのリソースにとって最も重要であり、継続的なプロセスです。

ユーザーのサインインを監視するための Identity Protection の使用については前述のとおりです。追加のステップとして、Identity Protection を Defender for Cloud Apps と統合することも可能です。統合はすぐに行え、画面上のボタンを有効にするだけです。これにより、Azure AD Identity Protection は Defender for Cloud Apps にシグナルを送信し、Defender for Cloud Apps は情報を処理して **セキュリティ運用チーム** 向けにアラートを生成するようになります。

[Azure AD Connect Health](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-azure-ad-connect#what-is-azure-ad-connect-health) は、監視のためのもう一つの重要な機能です。[重大な AD FS システムの問題](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-health-alert-catalog#alerts-for-active-directory-federation-services)、パフォーマンス、接続性など、重要な健全性のアラートを提供することで、ハイブリッド ID 環境におけるオンプレミス ID システムの信頼性を確保できるようにします。さらに、AD FS サーバーからのサインイン失敗やロックアウトの傾向も提示が可能です。 軽量なエージェントで動作するため、[導入](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-azure-ad-connect#why-use-azure-ad-connect-health) は非常に簡単です。

加えて、[ID セキュリティ スコア](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/identity-secure-score) の推奨事項についても対応ください。ID セキュリティ スコア は、Azure AD の全体的なセキュリティの状態を表示します。片手間で評価しすぐに改善できるような、影響度が低く実装コストが低い項目も中にはあります。定期的に ID セキュリティ スコアをレビューすることで、現在のセキュリティの状態についての見識を得るとともに、その内容を評価して修復するようご計画ください。

セキュリティは組織にとって最優先事項であり、[ID は新たな戦場となります](https://www.microsoft.com/en-us/security/business/security-insider/reports/cyber-signals-issue-1-identity/?culture=en-in&country=IN)。まず、貴社にてセキュリティを担当するチームがございましたら、このブログに記載されているポイントに従って、Azure AD の構成と実際の状況を比較し、問題個所を特定いただければ幸いです。次のステップは、対応の優先順位を決めることです。項目によっては展開に多少の計画が必要かもしれませんが、「作業用とクラウド管理用のアカウントの分離」「緊急アクセス用アカウントの安全な管理」「Azure RBAC による最小特権の適用」は、セキュリティへの影響が大きく、すぐに実施できる項目であるため、重要度が最も高い項目となり得ます。
