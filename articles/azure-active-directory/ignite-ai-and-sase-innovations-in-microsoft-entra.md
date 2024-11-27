---
title: Ignite: Microsoft Entra の AI と SASE のイノベーション
date: 2024-11-28 09:00
tags:
  - Azure AD
  - Ignite
  - US Identity Blog
---

# Ignite: Microsoft Entra の AI と SASE のイノベーション

こんにちは、Azure Identity サポート チームの 高田 です。

本記事は、2024 年 11 月 19 日に米国の Microsoft Entra Blog で公開された [Ignite: AI and SASE innovations in Microsoft Entra](https://techcommunity.microsoft.com/blog/identity/ignite-ai-and-sase-innovations-in-microsoft-entra/2747278) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

## ID およびネットワーク アクセスの先進機能に Microsoft Entra の Security Copilot が追加

[Microsoft Ignite](https://ignite.microsoft.com/) に際しセキュリティの専門家がシカゴに集まり、リモートでも世界中から何千もの人がイベントを視聴するなか、ID に関連した様々な脅威から組織を守る立場が如何に難しいものであるかということを思い知らされます。サイバー空間の犯罪者は、攻撃の規模と巧妙さを増し続けています。実際、Microsoft Entra は現在、毎秒 7,000 件以上のパスワード攻撃をブロックしており、これは 1 年前から 75% 以上も増加しています。

このように脅威が増大する中でも、Microsoft は Microsoft Security Copilot により業界をリードする「責任ある AI」など、高度な多層防御の機能を提供することに引き続き取り組んでいます。本日は、ゼロ トラスト戦略の基盤である ID とネットワーク アクセスに関し、セキュリティ保護に役立つ Microsoft Entra の最新ニュースをお届けします。

## Microsoft Entra の Security Copilot でチームを強化

まず、Microsoft Entra の Security Copilot のパブリック プレビューを拡大します。この新しい機能では、Security Copilot が Microsoft Entra 管理センターに直接組み込まれるため、管理センターで Copilot が提供する ID のスキルに直接かつ簡単にアクセスできます。

また、Security Copilot は、皆様が日々の日常的な作業や複雑な作業を実施するときに、Microsoft Entra 管理センターで推奨事項を作成し、分析情報を提供してくれます。これにより以下のような支援が得られます:

- ユーザーに関連する ID データとコンテキスト (場所や認証方法など) を迅速に取得します。
- AI による自動的な検出、分析情報の提示、軽減策の実施により、ユーザーとワークロード ID のリスク調査を自動化します。
- アクセスの問題を迅速にトラブルシューティングし、ユーザーのサインインに関連する条件付きアクセス ポリシーを分析します。

さらに、Microsoft Entra でアプリケーションやワークロード ID を管理しているお客様向けには、12 月に、リスクの特定、理解、修復に役立つ新しいスキル セットが提供されます。例えば、Security Copilot に "攻撃に使用されている可能性のあるアプリや侵害された可能性のあるアプリはどれ？" や "使用されていないアプリを表示して" というプロンプトを送った後、さらに "これらを削除するにはどうすればよい？" というプロンプトを提示することも可能です。

自然言語処理やデータの関連付け、コンテキストに基づく分析情報などの生成 AI の機能により、ID とアクセス管理のワークフローがより簡単かつ効率的になります。[最新のユーザー テスト](https://aka.ms/SecurityCopilotITAdminResearch) では、Microsoft Entra で Security Copilot を使用している管理者は、サインインのトラブルシューティング タスクを 46% も少ない時間で完了し、さらに 47% 高い精度で完了していることもわかりました。

詳細については、[Microsoft Security Copilot is now embedded within the Microsoft Entra admin center](https://aka.ms/Ignite24/CopilotEntra) の記事もご覧ください。

## Security Service Edge を用いて従業員によるアクセスをよりセキュアに

ネットワーク セキュリティに対して ID 中心のアプローチを取ることで、サイバー空間におけるリスクを軽減し、高度な脅威に対する保護を強化するだけでなく、ユーザー体験も向上します。[Microsoft Entra Suite](https://learn.microsoft.com/ja-jp/entra/global-secure-access/overview-what-is-global-secure-access) の一部である [Microsoft Security Service Edge (SSE) ソリューション](https://learn.microsoft.com/ja-jp/entra/global-secure-access/overview-what-is-global-secure-access) は、ネットワーク セキュリティ、ID、エンドポイント全体のアクセス制御を統合することで、ゼロ トラストの実装とネットワーク変革を加速します。

弊社が提供する SSE ソリューションの 2 つの要素である Microsoft Entra Private Access と Microsoft Entra Internet Access は、2024 年 7 月から一般提供されています。本日は、SSE に関していくつかの機能拡張を紹介します。

### Microsoft Entra Private Access により従来の VPN からの移行がよりシンプルに

Microsoft Entra Private Access は、ID 中心のゼロ トラスト ネットワーク アクセス (ZTNA) ソリューションにより、従来の VPN を刷新するとともに、ユーザーをネットワーク全体にアクセスさせるのではなく、任意の社内リソースやアプリケーションにのみ安全に接続できるようにします。新機能により、従来の VPN からの移行がよりシンプルになり、ユーザーがリソースに簡単に接続できるようになります。

- **クイック アクセス ポリシー** (一般公開済み) を使用すると、プライベート アプリを Microsoft Entra に簡単にオンボードできます。
- **App Discovery** (近日パブリック プレビューの予定) を用いると、すべての社内アプリを簡単に探索することができます。
- **プライベート DNS** (パブリック プレビュー中) を使用すると単一のラベル名またはホスト名を構成でき、ユーザーがリソースにシームレスにアクセス可能となります。
- **Azure、AWS、Google Cloud のマーケットプレースで公開中プライベート ネットワーク コネクター** (パブリック プレビュー中) を利用すると、プライベート ネットワーク コネクターの管理体験が向上し、展開も簡単になります。

### Microsoft Entra Interent Access により組織がより安全に

Microsoft Entra Internet Access は、ID 中心のセキュア Web ゲートウェイ (SWG) ソリューションを使用して、すべてのインターネットおよび SaaS アプリケーションとリソースに安全にアクセスできるようにします。新しい機能により、お客様は脅威からより一層守られるのです。

- **継続的アクセス評価 (CAE) サポート** (パブリック プレビュー中) により、[重大なイベントが検出された際](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-continuous-access-evaluation#critical-event-evaluation) に、ほぼリアルタイムでネットワーク アクセスを取り消すことが可能です。これは、ポリシー条件が満たされるまでインターネット接続をオフにする自動緊急スイッチのようなものといえます。これらの制御はネットワーク レベルで動作するため、アプリケーションまたはクライアントが先進認証と CAE をネイティブにサポートしているかどうかに関係なく機能します。
- **TLS インスペクション** (プライベート プレビュー中) は、暗号化されたトラフィックを包括的に可視化し、完全な URL を利用して、より強化された URL Web カテゴリ フィルタリングが可能になります。

### セキュア アクセス サービス エッジに対する統合的なアプローチにを用いてネットワーク変革を実現

もしお客様が現在、オンプレミス ネットワークの簡素化や、高価な機器の最新ネットワーク ソリューションへの置き換えを検討中であれば、セキュア アクセス サービス エッジ (SASE) フレームワークという、ユーザー、システム、エンドポイント、リモート ネットワークをアプリケーションやリソースに安全に接続する仕組みについてもぜひご検討いただきたく思います。

Microsoft Entra は、他の SSE、SASE、およびネットワーク ソリューションとシームレスに連携し、高度な攻撃から組織を保護するための統合管理機能と可視化機能を提供します。例えば、Netskope の Advanced Threat Protection (ATP) と Data Loss Prevention (DLP) を皮切り (プライベート プレビュー中) に、他のプロバイダーの [ネットワーク セキュリティ機能を統合中](https://techcommunity.microsoft.com/blog/identity/microsoft-and-netskope-unified-identity-centric-security/4288492) です。また、大手プロバイダーの [SD-WAN および接続ソリューションを Microsoft Entra と統合](https://techcommunity.microsoft.com/blog/identity/microsoft-partners-for-new-sase-ecosystem/4287444) して、包括的な SASE ソリューションを提供しています。

詳細については、[Enhancing security with Microsoft’s Security Service Edge solution and SASE partners  ](https://aka.ms/Ignite2024/SSEBlog) をご覧ください。

## 新しい認証保護機能で高度な攻撃も回避

毎日 78 兆ものセキュリティ シグナルから得られる分析情報により、Microsoft Entra はパスワード攻撃だけでなく、MFA 攻撃や認証後の攻撃など、より高度で検出が困難な攻撃に対しても、プロアクティブでリアルタイムの保護を提供しています。サイバー攻撃の犯罪者は、パスワード攻撃をより早く、さらに拡大するために AI を使用しており、パスワード攻撃は依然として ID 関連の攻撃の 99% 以上を占めています。悪意のある攻撃者は一連の攻撃の始まりから終わりまでを完全に自動化している状況のため、多層防御の戦略は組織を保護するために必須となっています。

### Microsoft Entra ID Protection を使用してパスワード スプレー攻撃をリアルタイムで検出して防御

従来、セキュリティ管理者はログをくまなく調べ、パスワード スプレー攻撃の有無を特定していました。この度、Microsoft Entra ID Protection を機能強化し、パスワード スプレー攻撃をリアルタイムで検出できるようになりました。サインイン フロー中に攻撃を遮断することで、リスクの修復を数時間から数秒にまで短縮します。

リスクベースの条件付きアクセスはこの新しいシグナルに自動的に応答し、セッション リスクを引き上げるとともに、危険なサインイン試行に対して直ちに MFA などを要求し、パスワード スプレーの試行をその場で遮断します。この最新の検出機能は、近日パブリック プレビューが開始され、AitM (Adversary-in-the-Middle) フィッシングや [トークン窃取](https://jpazureid.github.io/blog/azure-active-directory/how-to-break-the-token-theft-cyber-attack-chain/) などの高度な攻撃に対する既存の検出と連動し、最新の攻撃も包括的にカバーします。

詳細情報: [Microsoft Entra ID Protection](https://learn.microsoft.com/ja-jp/entra/id-protection/overview-identity-protection) は、Microsoft Entra ID P2 プランまたは Microsoft Entra Suite プランで利用でき、どちらも [無料試用版](https://www.microsoft.com/ja-jp/security/business/microsoft-entra-pricing) が利用可能です。

### パスキーでフィッシングの試みを無力化

攻撃者は、多要素認証 (MFA) の採用増加に対応して、AitM フィッシングやソーシャル エンジニアリングの手法を強化してユーザーの認証情報を盗もうとしています。パスキーは、これらの高度な攻撃やパスワード攻撃に対抗すると同時に、サインインをより安全かつシンプルにします。

パスキーは、W3C WebAuthn 標準をサポートする任意のインターネット リソースへのサインインを可能にする、強力でフィッシング耐性のある認証方法です。パスキーは、FIDO2 規格が継続的に発展したものといえます。

Microsoft Authenticator のパスキーは、低コストでフィッシングに強い資格情報を提供し、ユーザーがモバイル デバイスから直接アクセスできるため、個別のセキュリティ キーを購入する必要性が減ります。本日、Microsoft Authenticator for iOS および Android のデバイスに紐づくパスキーのサポートが一般提供となりましたことをお知らせします。併せて、登録とサインインのユーザー体験が向上し、パスキーを登録する前にユーザーのデバイス上の Microsoft Authenticator アプリの正当性を確認するアテステーションのサポートが可能になったことも発表します。

[Microsoft Entra ID でのフィッシングに強いパスワードレス認証のデプロイを開始するにはこちらをどうぞ](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-plan-prerequisites-phishing-resistant-passwordless-authentication)

## 細部までカスタマイズ可能な外部向けアプリをエンタープライズ レベルのセキュリティが組み込まれた状態で構築

[Microsoft Entra External ID](https://learn.microsoft.com/ja-jp/entra/external-id/) を使用すると、社員のアクセスを保護するのと同じように、顧客やビジネス ゲストのアクセスを保護できます。Microsoft Entra ID と ID Governance でおなじみの使い慣れたツールを用いることで、これらの外部 ID をより簡単に保護、管理、および統制可能です。

ブランドやコーポレート アイデンティティに合わせてデザインされたネイティブなユーザー体験は、エンドユーザー体験を向上させ、ブランドのロイヤリティを高め、最終的にビジネスの成長を加速させるために重要です。9 月から一般提供が開始された External ID の [ネイティブ認証](https://devblogs.microsoft.com/identity/native-auth-for-external-id-ga/) により、開発者は細部までカスタマイズされたネイティブ モバイル認証体験を数分で構築できます。

直近で、外部向けの Web アプリとモバイル アプリ向けの新しいセキュリティとカスタマイズのオプションをリリースしました: 

- Email OTP をサポートするための新しいカスタム認証拡張機能
- ユーザー インサイトに紐づく新しいセキュリティ指標
- 既定で提供されるエンタープライズ レベルのコア保護機能がすべての外部向けアプリで有効化
- Facebook、Apple、Google、カスタム OIDC などのソーシャル ログインに対する追加のサポートが近日公開予定

詳細については、[Microsoft Entra External ID のドキュメントおよび開発者向けリソース](https://learn.microsoft.com/ja-jp/entra/external-id/) をご覧ください。

## 正確で信頼性が高くタイムリーな情報で管理者を支援

お客様が統合された Microsoft Entra 管理センターで作業している場合でも、Azure ポータルを使用している場合でも、弊社は [更新、導入、運用の透明性を提供する](https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-delivers-increased-transparency/) ことで、ID とネットワーク アクセスのセキュリティ体制の監視と最適化をより容易にしようと取り組んでいます。お客様からの継続的なフィードバックを組み込んだ次の機能が一般公開されました: 

- **What's new**: Microsoft Entra 管理センターに Microsoft Entra 製品の更新情報をまとめた画面が用意され、ここで情報を得るとともに、最新のイノベーションを評価可能となりますので、手動で更新を追跡する必要性がなくなります。
- **健全性の監視**: 様々なサインインの種類の傾向と統計をわかりやすく見える化したことで、主要なシナリオについて現在の正常性を簡単に調査できます。さらに、高度な検出アルゴリズムによって生成された重要な指標がアラートとして通知されますので、問題に迅速に対処できるようになります。

## Ignite のセッションでさらなる詳細をご覧ください

Ignite に直接参加する場合でも、オンラインで参加する場合でも、[こちらのイベント情報を参考](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/meet-microsoft-entra-at-ignite-2024-november-18-22/ba-p/2520426) に、Microsoft Entra の新しいイノベーションについて是非ご覧ください。

Ignite で Microsoft Entra セッションのライブ配信または録画をぜひご視聴ください:

### Secure access for any identity to any resource with Microsoft Entra

BRK313 – 11 月 20 日 (水) | 午後 1 時 15 分から午後 2 時 00 分 CDT

https://aka.ms/Ignite2024/BRK313 

ゼロ トラストのアクセス制御に加え、従業員、顧客、パートナーのアクセスを保護し、あらゆるクラウドでの安全なアクセスを確立するための ID およびネットワーク セキュリティ ソリューションに関する最新のイノベーションと発表のディープ ダイブのセッションです。さらに、生成 AI と管理センターのツール群がチームの効率とスケーラビリティをどのように向上させるかをご覧いただけます。

### Secure access for your workforce with the new Microsoft Entra Suite

BRK314 – 11 月 20 日 (水) | 午前 9 時 45 分 – 午前 10 時 30 分 CDT

https://aka.ms/Ignite2024/BRK314 

ID は、最初の防衛線です。しかし、ID のソリューションとネットワーク アクセス ソリューションが連携せず単独で運用されている場合、複雑さが増し、ポリシーに一貫性がなくなる懸念があります。ID とネットワークで条件付きアクセスを統合することで、ゼロ トラスト アーキテクチャをよりシンプルに実現する方法を紹介します。Microsoft Entra Suite を使用して、従業員のオンボーディング作業を刷新し、リモート アクセスを最新化するとともに、オンプレミスのアプリケーションやインターネット リソースへのアクセスを保護する方法をご覧ください。

### Accelerate your Zero Trust journey: Unify Identity and Network Access

BRK326 – 11 月 21 日 (木) | 午前 9 時 45 分 – 午前 10 時 30 分 CDT

https://aka.ms/Ignite2024/BRK326 

ID とネットワーク全体で統一されたアプローチを用い、ゼロ トラストの道のりをより加速する方法をご覧ください。このセッションでは、Microsoft の ID 中心のセキュリティ サービス エッジ (SSE) ソリューションを用いることで、プライベート、オンプレミス、インターネット、SaaS のすべてのアプリケーションとリソースへのアクセスをどのようにしてあらゆる面から保護していけるかというのを探ります。Microsoft のテクノロジ パートナーについても説明がありますので、組織のセキュリティ体制をさらに強化いただけます。

Joy Chik  
President of Identity and Network Access at Microsoft
