---
title: セキュリティ既定値群に対するアップデート
date: 2024-11-10 01:00
tags:
  - Azure AD
  - US Identity Blog
---

# セキュリティ既定値群に対するアップデート

こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2024 年 10 月 31 日に米国の Microsoft Entra Blog で公開された [Update to security defaults](https://techcommunity.microsoft.com/blog/identity/update-to-security-defaults/4044868) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

弊社では [Secure Future Initiative](https://www.microsoft.com/en-us/trust-center/security/secure-future-initiative) の一環として、セキュリティに対するアプローチを進化させており、設計の段階からセキュリティ対策を組み込んでおく (Secure by Design) こと、セキュリティ機能が既定の状態で有効になっている (Secure by default) こと、セキュリティを守った運用を行う (Secure Operations) ことという 3 つのセキュリティ原則に沿っています。**セキュリティ機能が既定の状態で有効になっている (Secure by default)** とは、セキュリティによる保護が既定の設定として有効化され、強制されていることを意味します。Microsoft Entra では、セキュリティ既定値群の機能がその例であり、最初からすべての新しいテナントで有効化され、Entra の ID とリソースに対するベースラインとしての保護レベルが提供されます。弊社はセキュリティ既定値群を利用する組織がより十分に保護されるよう、認証方法に関する要件を更新し、セキュリティをさらに向上するよう努めています。 

そこで今回、セキュリティ既定値群が有効な場合、多要素認証 (MFA) の登録を 14 日間スキップするオプションを廃止することにしました。これにより、すべてのユーザーはセキュリティ既定値群が有効になった後の最初のログイン時に MFA を登録する必要があります。この措置により、14 日の間にアカウントが侵害されるリスクを軽減することが可能になります。これは MFA が ID に基づく攻撃の 99.2% 以上をブロックできるためです。この変更は、2024 年 12 月 2 日以降に新しく作成されたテナントに適用され、2025 年 1 月から既存のテナントに展開されます。 

この更新は、皆様に安全で信頼性の高い ID サービスを提供するための継続的な取り組みの一環です。そのため、お客様のテナントで条件付きアクセスを使用していない場合は、セキュリティ既定値群の機能を有効にすることをお勧めします。セキュリティ既定値群は、よくある脅威からユーザーとリソースを保護するためのシンプルで効果的な方法です。 

これらの今後の更新とユーザーが必要とする準備につきましては、[ドキュメント](https://learn.microsoft.com/ja-jp/entra/fundamentals/security-defaults#deployment-considerations) をご覧ください。 

Nitika Gupta  
Group Product Manager, Identity 
