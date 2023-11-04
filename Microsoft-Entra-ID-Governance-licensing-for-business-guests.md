---
title: ビジネス ゲスト向けの Microsoft Entra ID Governance ライセンスについて
date: 2023-11-05 01:00
tags:
  - Azure AD
  - US Identity Blog
---

# ビジネス ゲスト向けの Microsoft Entra ID Governance ライセンスについて

こんにちは、Azure Identity サポート チームの 竜 です。

本記事は、2023 年 11 月 3 日に米国の Azure Active Directory Identity Blog で公開された [Microsoft Entra ID Governance licensing for business guests](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/microsoft-entra-id-governance-licensing-for-business-guests/ba-p/3575579) を意訳したものになります。

----

2023 年 7 月 1 日に Microsoft Entra ID Governance がリリースされて以来、何千ものお客様が従業員の ID を管理することの重要性を実感し、Microsoft Entra ID Governance をテストまたは導入されています。その中で多くのお客様から、このガバナンス機能を請負業者、パートナー、および社外の共同作業者などのビジネス ゲストの ID に拡張し、シームレスなコラボレーションを可能にしながらも、最小特権アクセスの原則に十分に従う方法についてご質問をいただいていました。

組織がこの状況をより簡単に管理できるようにするために、この度、ビジネス ゲスト向けの新しい ID Governance のライセンス体系を発表いたします。このライセンスは、月間アクティブ ユーザー (MAU: Monthly Active Usage) モデルで運用されます。お客様は、予想されるビジネス ゲスト の MAU に合わせてライセンスを取得することができます。

お客様がビジネス ゲストへの最小特権アクセスを拡大できるよう、ビジネス ゲスト向け ID Governance ライセンスの価格は MAU あたり0.75 ドルとし、2024 年春に提供を開始する予定です。それまでの間、ID Governance 機能で従業員の ID を管理している組織は、追加のコストなしにビジネス ゲストの ID を管理いただけます。既存の Microsoft Entra External ID のお客様は、Entra ID P1 および P2 に含まれる ID Governance 機能の一部を引き続き使用することができます。

## ビジネス ゲストの ID を管理する理由 

ビジネス ゲストは、特定の目的および期間にて、組織のリソースやアプリケーションへのアクセスを必要とする外部の協力者のことを指します。ビジネス ゲストには、請負業者、コンサルタント、ベンダー、パートナーなどが含まれます。ビジネス ゲストは多くの場合、社内リソースへのアクセスの要件が動的で予測不可能であり、社内のポリシーや標準に従っていない可能性があるため、ID のガバナンスが困難になりがちです。適切なガバナンスがなければ、ビジネス ゲストは過剰な特権アカウント、利用されず放置されたアカウント、不正アクセスなどのアクセス リスクを引き起こす可能性があります。

Microsoft Entra ID Governance を用いると、以下のような機能により課題に対処できます: 

- スポンサー、承認、認証の必要性など、ビジネス ゲストに対するアクセス ポリシーを定義し実施する
- プロジェクトまたは契約期間に基づいて、ビジネス ゲストのアカウントのプロビジョニングとデプロビジョニングを自動化する
- ビジネス ゲストによるアクセス状況や行動を監視および監査し、異常や違反を検出して修復する
- 社内スポンサーがリクエストをレビューし、承認する方法を提供する
 
このステップにより、お客様は組織内のすべての ID を確実に管理することができます。お客様のデジタル資産を保護するために弊社をお選びくださり感謝申し上げます。

Kaitlin Murphy  
Director, Product Marketing
