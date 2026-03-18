---
title: 今後の条件付きアクセスの変更 リソース除外を含むポリシーの適用強化
date: 2026-02-19 09:00
tags:
    - Microsoft Entra ID
    - US Identity Blog
    - Conditional Access
---

# 今後の条件付きアクセスの変更 リソース除外を含むポリシーの適用強化

こんにちは、Azure & Identity サポート チームの長谷川です。本記事は、2026 年 1 月 28 日に米国の Microsoft Entra Blog で公開された [Upcoming Conditional Access change: Improved enforcement for policies with resource exclusions](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/upcoming-conditional-access-change-improved-enforcement-for-policies-with-resour/4488925) を意訳したものになります。ご不明点はサポート チームまでお問い合わせください。

> [!NOTE]
> 2026/03/18 更新: 原文が更新された点を反映しました。展開開始日が 2026 年 3 月 27 日から 2026 年 5 月 13 日に変更されました。

---

## Microsoft Entra 条件付きアクセスが適用される認証フローを限定的に強化し、セキュリティ態勢の向上を図ります。

[Microsoft セキュア フューチャー イニシアティブ](https://www.microsoft.com/ja-jp/trust-center/security/secure-future-initiative?msockid=22346ecb805f631739b27a6e81726266) に基づき、多層防御のための以下のプロアクティブなセキュリティ対策を実施します。変更内容を確認し、必要な準備を実施ください。

## 何が変更されるのか

- **現在**、クライアント アプリケーションが [OIDC スコープ](https://learn.microsoft.com/ja-jp/entra/identity-platform/scopes-oidc#openid-connect-scopes) または [限定的なディレクトリ スコープ](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-conditional-access-cloud-apps?tabs=powershell#legacy-conditional-access-behavior-when-an-all-resources-policy-has-a-resource-exclusion) **のみ** を要求してユーザーがサインインした場合、**ポリシーに 1 つ以上の除外となるリソースが含まれていると**、「すべてのリソース」を対象とする条件付きアクセス ポリシーは、そのサインインに対して適用されません。
- この変更後は、リソースの除外が設定されている場合でも、これらのサインインに対して「すべてのリソース」を対象とする条件付きアクセスポリシーが適用されます。これにより、アプリケーションによって要求されたスコープに関係なく、ポリシーが一貫して適用されるようになります。[この変更の詳細についてはこちらをご覧ください](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-conditional-access-cloud-apps?tabs=usage-and-insights-report#new-conditional-access-behavior-when-an-all-resources-policy-has-a-resource-exclusion)。

## この変更はいつ反映されるか

展開スケジュールを調整し、展開は 2026 年 5 月 13 日から開始されます。円滑な移行を支援するため、**Microsoft 365 メッセージセンター**のメッセージを通じて追加情報やガイダンスが提供されます。

## この変更の影響を受けるのは誰か

この変更は、[「すべてのリソース」を対象とし、かつ 1 つ以上のリソース除外を含む](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-conditional-access-cloud-apps?tabs=powershell#legacy-conditional-access-behavior-when-an-all-resources-policy-has-a-resource-exclusion) 条件付きアクセス ポリシーを設定しているテナントにのみ影響します。これらのテナントには、[M365 メッセージセンター](https://learn.microsoft.com/ja-jp/microsoft-365/admin/manage/message-center?view=o365-worldwide) を通じて通知が行われます。この構成のポリシーを持たないテナントには影響はありません。

## この変更はお客様の組織にどのような影響を与えるか

ユーザーが上記のスコープのみを要求するクライアント アプリケーションを通じてサインインする場合、これまでは適用されずにアクセスできていた状況でも、今回の変更により条件付きアクセスのチャレンジ（MFA やデバイス準拠など）が求められる可能性があります。具体的にどのような制御が要求されるかは、「すべてのリソース」を対象とするポリシー、またはリソースとして Azure AD Graph を明示的に対象とするポリシーに設定されているアクセス制御の内容に依存します。

## 何を準備する必要があるか

#### ほとんどのお客様: 特に対応は不要です

ほとんどのアプリケーションは、上記のスコープ以外に追加のスコープを要求しており、すでに条件付きアクセスの適用対象となっています。このような場合、動作に変更はありません。また、アプリケーションが条件付きアクセスの要求を適切に処理できるようにするため、更新が必要となる可能性がある主要なソフトウェア ベンダーと協力して対応を進めています。

#### テナントに登録されていて、これらのスコープのみを要求するアプリ: 確認を推奨

上記のスコープ **のみ** を要求するよう意図的に設計されたカスタム アプリケーションがある場合、それらのアプリが MFA やデバイス準拠などの条件付きアクセスの制御に対応できるかどうかを評価ください。**すでに条件付きアクセスの制御に対応している場合** は特に変更は不要です。**対応していない場合は** 更新が必要になる可能性があります。アプリケーションを適切に更新する方法については、[Microsoft Entra 条件付きアクセスの開発者向けガイダンス](https://learn.microsoft.com/ja-jp/entra/identity-platform/v2-conditional-access-dev-guide) を参照ください。

-Swaroop Krishnamurthy

## 補足リソース
- [条件付きアクセス: ターゲット リソース](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-conditional-access-cloud-apps) 
- [Microsoft Entra 条件付きアクセスの開発者向けガイダンス](https://learn.microsoft.com/ja-jp/entra/identity-platform/v2-conditional-access-dev-guide)
- [Microsoft ID プラットフォームでのスコープとアクセス許可](https://learn.microsoft.com/ja-jp/entra/identity-platform/scopes-oidc)
- [条件付きアクセスでのサインインに関する問題のトラブルシューティング](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/troubleshoot-conditional-access#audience-reporting)
- 
