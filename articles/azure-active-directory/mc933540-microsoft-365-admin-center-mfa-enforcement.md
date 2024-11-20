---
title: MC933540 - Microsoft 365 admin center multifactor authentication enforcement の通知について
date: 2024-11-21 09:00
tags:
  - Microsoft Entra
---

# MC933540 - Microsoft 365 admin center multifactor authentication enforcement の通知について

こんにちは、Azure Identity サポート チームの 五十嵐 です。

Microsoft では [Secure Future Initiative](https://www.microsoft.com/en/microsoft-cloud/resources/secure-future-initiative) の取り組みのひとつとして、ID とシークレットの保護を継続的に強化するために取り組みを進めています。 
今回、取り組みの一環として 2024 年 11 月 11 日に以下のブログにて発表を行い、続けて Microsoft 365 管理センターのメッセージ センターより 「MC933540 : Microsoft 365 admin center multifactor authentication enforcement」 の通知を実施させていただきました。

[Announcing mandatory multifactor authentication for the Microsoft 365 admin center](https://techcommunity.microsoft.com/blog/microsoft_365blog/announcing-mandatory-multifactor-authentication-for-the-microsoft-365-admin-cent/4232568)

通知内容の概要としましては、2025 年 2 月 3 日以降、Microsoft 365 管理センターにアクセスするすべてのユーザー アカウントに MFA (Multifactor Authentication) の要求を開始するという内容であり、これはテナント レベルで段階的にロールアウトされます。

メッセージ センターで通知した MC933540 の内容について抄訳したものを以下に記載いたしますので、確認いただければ幸いです。

## MC933540 の抄訳 

>Microsoft 365 管理センターの多要素認証の施行
>
>Microsoft 365 管理センターへのアクセスに対して多要素認証 (MFA) を実装することにより、管理アカウントの侵害リスクを大幅に軽減し、不正なアクセスを防ぎ、機密データを保護します。 
>標準のユーザー名とパスワード認証に加えて、追加の認証を要求する MFA の制御を有効化することで、攻撃者によるデータの盗難を困難にし、フィッシング、クレデンシャル スタッフィング攻撃、ブルートフォース攻撃、パスワード再利用攻撃などの不正なアクセスを防ぎます。 
>当社および製品全体でサイバー セキュリティを向上させるための継続的な取り組みの一環として、2025 年 2 月 3 日から、Microsoft は Microsoft 365 管理センターへのサインイン時にすべてのユーザーに MFA の使用を求めるようになります。この要件は、今後数週間のうちにテナントレベルで段階的に展開されます。
>
>今すぐ実施いただきたいこと : 
>- グローバル管理者: 組織内における MFA の設定を完了してください。組織での MFA 設定は、aka.ms/MFAWizard の MFA 設定ガイドを参照するか、[Microsoft 365 Business Premium の多要素認証を設定する](https://learn.microsoft.com/ja-jp/microsoft-365/admin/security-and-compliance/set-up-multi-factor-authentication?view=o365-worldwide) を参照してください。
>- Microsoft 365 管理センターにアクセスするユーザー: aka.ms/mfasetup にアクセスして、MFA に利用可能な認証方法が登録されているか確認ください。
>
>本通知の変更が組織に与える影響 : 
>Microsoft 365 管理センターにサインインできるようにするために、管理者に対して MFA の方法を追加し、必要に応じてテナントに対して MFA を有効にする必要があります。
>
>準備のためにできること : 
>- MFA の方法を設定していない場合は、2025 年 2 月 3 日までに MFA を設定してください。 
>- 既に MFA を設定している場合は、特に追加の操作は必要ありません。Microsoft 365 管理センターにアクセスするすべてのユーザーが MFA 用の認証方法を追加していることを確認することをお勧めします。 
>- グローバル管理者：組織内における MFA の設定を完了してください。組織での MFA 設定は、aka.ms/MFAWizard の MFA 設定ガイドを参照するか、[Microsoft 365 Business Premium の多要素認証を設定する](https://learn.microsoft.com/ja-jp/microsoft-365/admin/security-and-compliance/set-up-multi-factor-authentication?view=o365-worldwide) を参照してください。
>- Microsoft 365 管理センターにアクセスするユーザー: aka.ms/mfasetup にアクセスして、MFA に利用可能な認証方法が登録されているか確認ください。
>- 2025 年 2 月 3 日までに MFA 要件の準備が整わない場合、管理者は https://aka.ms/managemfaforazure のページから施行日の延期を申請することができます。Azure ポータルの MFA 施行延期は Microsoft 365 管理センターにも適用されることに注意してください。
>
>詳細については、[こちら](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-will-require-mfa-to-access-the-microsoft-365-admin/ba-p/4232568)のブログ記事の FAQ を参照してください。
>
>[追加情報](https://learn.microsoft.com/entra/identity/authentication/concept-mandatory-multifactor-authentication)
>[ヘルプとサポート](https://learn.microsoft.com/microsoft-365/admin/security-and-compliance/multi-factor-authentication-microsoft-365?view=o365-worldwide)

なお、以下の弊社サポート ブログでお伝えした Azure Portal へのサインインに対して MFA を義務付ける取り組みとは、MFA が要求され始めるタイミングが異なります。

[Microsoft は Azure ポータル(および Azure CLI 等) を利用するユーザーに MFA を義務付けます | Japan Azure Identity Support Blog](https://jpazureid.github.io/blog/azure-active-directory/microsoft-will-require-mfa-for-all-azure-users/)

[Azure ポータル (および Azure CLI 等) の MFA 義務付けに関する更新情報 (2024/6/27) | Japan Azure Identity Support Blog](https://jpazureid.github.io/blog/azure-active-directory/update-on-mfa-requirements-for-azure-sign-in/)

Azure Portal などのリソースに対する MFA の要求は、フェーズ 1 が 2024 年 10 月 15 日より順次ロールアウトしており、各テナントへの展開を開始しておりますが、本ブログの対象となる Microsoft 365 管理センターに対しては、2025 年 2 月 3 日がロールアウトの開始日となっております。

一方で、ロールアウトの開始日を延期するための申請は同じ仕組みを利用しております。
そのため、Azure Portal などのリソースに対する MFA の要求 (フェーズ 1) に関して延長申請を既に実施いただいているお客様は、Microsoft 365 管理センターも併せて延期が適用された状態となります。

なお、Microsoft 365 管理センターの延長申請後のロールアウトの開始日は 2025 年 3 月 15 日です。これは、Azure Portal などのリソースに対する MFA の要求を延長した場合と同じ日程となります。
延長申請のための操作に関しましては、以下のブログをご参照ください。

[MC862873 - Azure ポータル (および Azure CLI 等) の MFA 義務付けの延長申請について | Japan Azure Identity Support Blog](https://jpazureid.github.io/blog/azure-active-directory/MC862873-azure-portal-mfaenforcement-update-grace-period/)

仮に本通知の適用を待たずに Azure Portal や Microsoft 365 管理センターへのアクセスに対して MFA を要求されたい場合、条件付きアクセスの機能を利用することで実現可能です。
設定方法に関しては、以下の公開情報をご参考ください。

[Microsoft 管理ポータルに多要素認証を要求する - Microsoft Entra ID | Microsoft Learn](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/policy-old-require-mfa-admin-portals)

本通知に関する補足情報を Q & A 形式で記載いたします。参考になりましたら幸いです。

#### Q. 複数の Microsoft 365 テナントを利用しています。Microsoft 365 管理センターの MFA 適用は、すべてのテナントに同時にロールアウトされますか? 

A.
いいえ、2025 年 2 月 3 日からテナント レベルで段階的に展開されます。複数の Microsoft 365 テナントを持つ組織の場合、テナントごとに異なる日程で適用される場合があります。

#### Q. 延長申請ではなく、変更が適用されないようにすることは可能か？

A.
いいえ。このセキュリティ対策は、Microsoft 365 を利用する組織とユーザーを保護するために必要な設定となるため、すべてのテナントに適用され、回避する設定、および方法はございません。

#### Q. 特定のユーザーに対しては MFA を強制しないようにすることは可能か？

A.
いいえ、Microsoft 365 管理センターへのアクセスするユーザー全てに強制されます。組織で緊急アクセス用アカウントを用意いただいている場合、このアカウントに対しても MFA が要求されます。緊急アクセス用アカウントに対してはセキュリティキーを利用した MFA の方法などを設定することも併せてご検討いただけますと幸いです。

#### Q. Azure Portal などのリソースに対する MFA 要求を既に延長申請している、Microsoft 365 管理センターに対する MFA 要求はどうなるのか？

A.
Azure Portal などのリソースに対する MFA の要求に関して延長申請を既に実施いただいているお客様は、Microsoft 365 管理センターに対する MFA 要求も併せて延長申請された状態となります。
延長申請後のロールアウトの開始日は 2025 年 3 月 15 日であり、Azure Portal などのリソースに対する MFA の要求を延長した場合と同じ日程となります。

#### Q. この通知は、すべてのユーザーに対して MFA を要求しますか？

A.
いいえ、本通知によって影響のある操作は Microsoft 365 管理センターへのアクセスとなります。
Microsoft 365 管理センターにアクセス可能なユーザーは、管理者ロールを持つユーザーのみです。アクセス可能なロールに関する説明は以下の公開情報をご参考ください。

[Microsoft 365 管理センターの管理者ロールについて - Microsoft 365 admin | Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide)

#### Q. Microsoft Graph PowerShell または API に影響しますか? 

A. 
いいえ。この要件は、現時点では Microsoft Graph PowerShell または API の使用には影響しません。 
