---
title: クラウド ファーストの ID 管理 - ユーザー SOA がパブリック プレビューかつグループ SOA も一般公開に
date: 2025-12-10 15:00
tags:
  - Microsoft Entra
  - US Identity Blog
---

# クラウド ファーストの ID 管理: ユーザー SOA がパブリック プレビューかつグループ SOA も一般公開に

こんにちは、Azure Identity サポート チームの三輪です。
本記事は、2025 年 11 月 5 日に米国の Microsoft Entra (Azure AD) Blog で公開された [Driving cloud-first identity: User SOA is now Public Preview and Group SOA is Generally Available](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/driving-cloud-first-identity-user-soa-is-now-public-preview-and-group-soa-is-gen/4462425) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

### ユーザーやグループをクラウドでの管理に移行することで、ハイブリッド管理の複雑さを簡素化し、セキュリティ体制を強化しましょう。

8 月に、グループの Source of Authority（SOA）変換の機能を使用することで、組織がクラウド上でレガシー グループを管理できるようになりました。この機能により、オンプレミス環境をより簡素化でき、Active Directory（AD）に依存するアプリにもガバナンスを拡張できることを紹介しました。本日、ハイブリッド環境のセキュリティ体制の強化に役立つ以下の 2 つの重要なアップデートを発表いたします。

- グループの SOA 変換が一般公開されました。
- ユーザーの SOA 変換がパブリック プレビューとなりました。


## このアップデートが重要な理由
Active Directory (AD) とクラウドの両方で ID を管理する煩雑さは長年の悩みの種でした。以下の新しい機能により、その煩わしさが解消されます。
- [ユーザーの Source of Authority (SOA)](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/user-source-of-authority-overview) 変換を利用すると、AD から同期されたユーザーをクラウド上で編集可能なオブジェクトに変換することができます。この機能により、組織の運用上の負荷が軽減され、クラウド上でのユーザー管理、条件付きアクセス、MFA、パスワードレス認証などの高度な ID の機能が利用できるようになります。
- [グループの Source of Authority(SOA)](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/concept-source-of-authority-overview) 変換を利用すると、AD から同期されたセキュリティ グループを Microsoft Entra ID で編集可能なクラウド オブジェクトに変換することができます。また、この機能を利用しながらも、オプションとしてクラウド同期のライトバックの機能を追加で設定することで、オンプレミスのアプリとの互換性を維持することも可能です。グループの SOA では、メールが有効なセキュリティ グループや配布リストをクラウド上の Exchange で管理されるグループに変換することもでき、不要になったグループを AD から削除するのにも役立ちます。
    
これらの機能を組み合わせて利用することで、組織は AD への投資を最小限に抑えるとともに、ライフサイクル管理がよりシンプルになり、ゼロトラストのセキュリティ体制を強化することができます。


## シナリオ - ユーザーの SOA とグループの SOA を用いたハイブリッド ID のセキュリティ強化
とある組織がクラウド ファーストの ID のモデルへ移行しようとしているとしましょう。しかしその組織は依然として重要なオンプレミスのアプリケーションに依存しています。この組織の ID 担当チームは、クラウドへの完全移行を待つ代わりに、まずリスクの高いユーザーの一部をユーザーの SOA 変換を使ってクラウドで編集可能なユーザー ID に変換することにしました。同時に、それらオンプレミスのアプリケーションに関連する AD 上のセキュリティ グループをグループの SOA 変換を利用してクラウドへ移行し、Microsoft Entra ID 上で完全に管理できるようにすることで、セキュリティとガバナンス機能を強化することが可能となりました。

このユーザーの SOA とグループの SOA を組み合わせたアプローチは、組織に対して即時に利益をもたらします。IT 管理者は Microsoft Entra 管理センターや Microsoft Graph API を用いて、ユーザー ID、グループ、アクセス ポリシーを一元管理でき、運用をシンプルにして複雑さを軽減できます。これまで手動のプロセスによって行われていたガバナンスは、エンタイトルメント管理、アクセス レビュー、ライフサイクル ワークフローによって自動化され、これにより重要なアプリケーションのコンプライアンスがより強化されます。

セキュリティは劇的に向上します。従業員はクラウドとオンプレミスの両方のアプリに対して、Microsoft Entra ID の資格情報（パスワードレス オプションを含む）でサインインできるようになります。リスクベースの条件付きアクセス ポリシーがシームレスに適用されることで、パスワード疲労攻撃や資格情報の乱立を減らし、ゼロトラストの原則が強化されます。

移行は柔軟に進めることができます。一部のユーザーとグループから変換を開始することで、業務が中断されることなく、既存の同期フローも維持できます。時間をかけて独自のペースで Microsoft Graph API や Microsoft Entra 管理センターを使用しながらクラウドへの変換対象を拡大していくことが可能です。

その結果、お客様はレガシーなアプリを意図せず停止させたり、完全な移行を待ったりすることなく、クラウドでの一元管理および自動化されたガバナンス、そしてより強力なセキュリティを手に入れることができるのです。

以下の動画では、詳細な仕組みや実際の動作をご紹介しています。


[![YouTube](https://img.youtube.com/vi/otxp_KIqU4Y/0.jpg)](https://www.youtube.com/watch?v=otxp_KIqU4Y)



これらの新機能は、追加の料金なく無料でご利用いただけます。Microsoft Entra Free ライセンスで利用可能です。ぜひご自身の環境でお試しいただき、その効果を直接体験してみてください。

- 詳細はこちら: https://aka.ms/usersoadocs | https://aka.ms/groupsoadocs
- 解説動画を見る: [Source of Authority](https://www.youtube.com/watch?v=otxp_KIqU4Y) | [Get to cloud-first model with Group Source of Authority: Deep Dive](https://www.youtube.com/watch?v=AcBMPgpIsw4)
- ITアーキテクトへのガイダンス: https://aka.ms/SOAITArchitectsGuidance

また、Micorosft Ignite に直接参加するかオンラインで参加いただき、ディープダイブやデモ、ディスカッションなど Microsoft Entra ID に関わる全てについて是非エキスパートとつながりをお持ちください。

Joe Dadzie – VP Product Management

