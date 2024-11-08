---
title: セキュリティ既定値群の最新情報
date: 2024-11-12 09:00
tags:
  - Azure AD
  - US Identity Blog
---

# セキュリティ既定値群の最新情報

こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2024 年 10 月 31 日に米国の Microsoft Entra Blog で公開された [Update to security defaults](https://techcommunity.microsoft.com/blog/identity/update-to-security-defaults/4044868) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----
私たちは [Secure Future Initiative](https://www.microsoft.com/en-us/trust-center/security/secure-future-initiative) の一環として、セキュリティアプローチを進化させ、3 つのセキュリティ原則である、設計時のセキュリティ (Secure by Design)、デフォルトでのセキュリティ (Secure by　Default)、および運用時のセキュリティ (Secure Operations) に基づいて運用しています。セキュリティの既定値とは、セキュリティ保護がデフォルトで有効化され、強制されることを意味します。Microsoft Entra では、セキュリティの既定値群がその例であり、最初からすべての新しいテナントで有効化され、Entra の ID とリソースに対する基本的な保護レベルが提供されます。私たちはセキュリティの既定値群に依存する組織がより十分に保護されるよう、認証方法に関する要件を更新し、セキュリティをさらに向上するよう努めています。

そこで、今回セキュリティ既定値群が有効な場合、14 日間の多要素認証 (MFA) 登録をスキップするオプションを廃止することにしました。これにより、すべてのユーザーはセキュリティ既定値群が有効になった後の最初のログイン時に MFA を登録する必要があります。この変更は、2024 年 12 月 2 日以降に新しく作成されたテナントに適用され、2025 年 1 月から既存のテナントに展開されます。MFA は、アイデンティティに基づく攻撃の 99.2% 以上をブロックできるため、この措置により、14 日間のウィンドウ内でアカウントが侵害されるリスクを軽減することが可能になります。

この更新は、皆様に安全で信頼性の高い ID サービスを提供するための継続的な取り組みの一環となります。そのため、条件付きアクセスを使用していないテナントである場合は、セキュリティ既定値群を有効にすることをお勧めします。セキュリティ既定値群は、一般的な脅威からユーザーとリソースを保護するためのシンプルで効果的な方法です。

これらの今後の更新とユーザーが必要とする準備につきましては、[ドキュメント](https://learn.microsoft.com/ja-jp/entra/fundamentals/security-defaults#deployment-considerations)をご覧ください。

Nitika Gupta
Group Product Manager, Identity
