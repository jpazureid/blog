---
title: MFA の既定の認証方法がパスキーに移行 (SMS / 音声通話の既定での提供が終了)
date: 2026-07-15
tags:
    - Microsoft Entra ID
    - Microsoft Security Blog
    - Passkey
    - Passwordless
    - MFA
---
# MFA の既定の認証方法がパスキーに移行 (SMS / 音声通話の既定での提供が終了)
こんにちは、Azure & Identity サポート チームの 田辺 です。
本記事は、2026 年 7 月 13 日に米国の Microsoft Security Blog で公開された [Microsoft Entra ID security updates: Passkeys are the default authentication method in Entra ID](https://www.microsoft.com/en-us/security/blog/2026/07/13/microsoft-entra-id-security-updates-passkeys-are-the-default-authentication-method-in-entra-id/) を意訳したものになります。ご不明点はサポート チームまでお問い合わせください。
<!-- more -->
----

## はじめに
AI 時代を迎え、ID を狙う攻撃はますます巧妙になっています。こうした状況では、フィッシングや資格情報の窃取、ソーシャル エンジニアリングからユーザーを守る、より強固な認証方法が組織に求められます。この進化する脅威に対応するため、[Microsoft Entra ID](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-id) は認証エクスペリエンスを見直し、フィッシングに強い認証方法であるパスキーを既定とすることで、SMS や音声通話といったフィッシング可能な方法への依存を減らせるようにします。

2026 年 9 月 1 日より、Microsoft は Microsoft Entra ID における既定の認証エクスペリエンスとしてパスキーの段階的な展開を開始します。各組織に展開が適用されると、SMS または音声通話による認証が有効になっているユーザーは自動的にパスキーが有効化され、次回の多要素認証 (MFA) の際にパスキーの登録を促されるようになります。

この移行に続き、2027 年 2 月 1 日には、Microsoft が提供する SMS および音声通話認証向けの通信サービスを廃止し、SMS と音声通話を [Microsoft Entra](https://www.microsoft.com/ja-jp/security/business/microsoft-entra) のネイティブ機能としては提供しなくなります。引き続き SMS や音声通話による認証が必要な組織は、Microsoft Security Store を通じて通信事業者パートナーのいずれかを選択することができます。その際、通信事業者パートナーから請求される通信関連の費用はお客様のご負担となります。

できるだけ早い段階で、ユーザーの MFA の認証方法を、SMS や音声通話などフィッシングに弱い方法から、パスキーなどフィッシングに強い認証方法へ移行させることを強くおすすめします。

## AI 時代になぜより強固な認証が重要なのか
SMS や音声通話による認証は、共有シークレットや通信経路に依存しています。攻撃者は、これらを傍受したり、フィッシングでだまし取ったり、不正に操作したりする手口を年々増やしています。[パスキー](https://www.microsoft.com/ja-jp/security/business/security-101/what-is-passkey) は共有シークレットではなく公開鍵暗号方式を利用するため、設計上フィッシングに強い特性を備えています。加えて、ユーザーにとってより高速でシンプルなサインイン体験を提供します。

SMS や音声通話から脱却すべき理由は、もはや攻撃者がこれらを傍受したりソーシャル エンジニアリングで悪用したりするという点だけにとどまりません。脅威を取り巻く環境は、速度、規模、巧妙さの面で変化しています。Microsoft Threat Intelligence は、AI を活用したフィッシング攻撃活動でクリック率が最大 54% に達する事例を観測しており、これは従来型の攻撃活動のおよそ 12% と比べて大幅に高い値です ※1。その結果、盗まれたパスワードや、フィッシングで突破できてしまう 2 つ目 (MFA) の認証要素が、差し迫ったリスクとなっています。同時に、SIM スワップや MFA バイパスといった手口も、以前より容易かつ再現しやすいものになっています。

AI を活用したサイバー攻撃では、侵害された ID を用いて、探索、権限昇格、横方向の移動といった一連の動作を、人間の攻撃者が手作業で行うよりもはるかに高速に自動化できます。だからこそ、フィッシングに強い認証方法が非常に重要になります。

パスキーを既定の認証エクスペリエンスとすることで、組織はフィッシング可能な認証方法への依存を減らし、資格情報の窃取やフィッシングに対する防御を強化できます。

## SMS や音声通話が引き続き必要な場合は Microsoft Security Store で通信事業者を選択
現在、SMS および音声通話認証の背後にある通信サービスは、Microsoft が Entra ID 内でネイティブに提供しています。今回の移行の一環として、Microsoft はこのネイティブな通信サービスの提供から一歩引くことで、フィッシングに強い認証方法をすべての人にとっての標準とすることを後押しします。

多くの組織にとって、推奨される移行方法はシンプルです。追加費用なしでユーザーをパスキーへ移行するというものです。

規制、技術、業務上の理由で SMS や音声通話を維持する必要がある場合は、Microsoft Security Store を通じてサードパーティの通信事業者を選択、構成、管理できるようになります。Microsoft Security Store は、対応する通信事業者と直接契約できるパートナー マーケットプレースです。

2026 年 9 月 18 日には、対応する事業者に関する情報、展開ガイダンス、技術ドキュメントを公開する予定です。料金や取引条件は Microsoft Security Store を通じて確認できるようになります。

## 移行の準備
サインイン体験の変更に向けてユーザーが備えられるよう、また組織に最適な展開方法を選択できるよう、今のうちから移行の計画を始めましょう。

1. **SMS や音声通話を今も利用しているユーザーを特定する。** 認証方法ポリシーを確認し、SMS または音声通話認証が有効になっているユーザーやグループを洗い出します。
2. **パスキーの展開を計画する。** [パスキー](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-authentication-passkeys-fido2) を有効化し、ユーザーのデバイスや業務に合った種類を選択します。Microsoft Entra ID は以下をサポートしています。
    - 同期されたパスキー (iCloud キーチェーンや Google パスワード マネージャーなど、プラットフォームの資格情報マネージャーに保存されるパスキー)
    - デバイスにバインドされたパスキー (Microsoft Authenticator のパスキー、Windows 上の Entra パスキー、FIDO2 セキュリティ キーなど)
3. **[登録キャンペーン](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-mfa-registration-campaign) を活用して導入を促進する。** Microsoft Entra ID は、多要素認証によるサインイン時にパスキーの登録を促すことで、組織が大規模にユーザーを移行させる手助けをします。
4. **ユーザーへの案内を準備する。** 何が変わるのか、いつパスキー登録のプロンプトが表示されるのか、デバイスでどのように登録を完了するのかを、対象ユーザーに伝えます。

パスキーの計画、展開、管理に関する手順の詳細は、Microsoft Learn のドキュメントおよびパスキー展開ガイドをご覧ください。

- [既定でのパスキーと、Microsoft が提供する SMS および音声認証の廃止](https://aka.ms/passkeybydefault)
- [Microsoft Entra ID でフィッシングに強いパスワードレス認証の展開を始める](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-plan-prerequisites-phishing-resistant-passwordless-authentication)

規制、技術、運用上のシナリオで引き続き SMS や音声通話が必要な場合は、次のように進めます。

1. 影響を受けるユーザー セグメントを特定し、記録します。
2. 2026 年 10 月 30 日以降、Microsoft Security Store を通じて対応する通信事業者を選択、構成します。
3. 本格展開の前に、パイロット グループで構成をテストします。

## タイムライン
| 日付 | 内容 |
| --- | --- |
| 2026 年 9 月 1 日 | SMS または音声通話が有効なすべてのユーザーが自動的に有効化され、多要素認証によるサインイン時にパスキー登録を促されます。パスキー展開ガイドを利用して、パスキー利用に向けた環境を準備してください。対象ユーザーに今後の変更を通知してください。すべてのユーザーが、パスキー、Windows 上の Entra パスキー、FIDO2 セキュリティ キーなど、フィッシングに強い認証方法を備えていることを確認してください。 |
| 2026 年 9 月 18 日 | 料金、取引条件、対応する通信事業者の一覧が公開されます。SMS や音声通話認証の継続利用を予定している場合は、利用可能な事業者の選択肢を確認し、影響を受けるユーザーを特定してください。 |
| 2026 年 10 月 30 日 | 管理者は Microsoft Security Store を通じて対応する通信事業者を選択、構成できるようになります。 |
| 2027 年 2 月 1 日 | Microsoft が提供する SMS および音声通話認証が終了します。特定のユーザーに引き続き SMS や音声通話が必要な場合は、この日までに対応する通信事業者を構成してください。 |
| 2027 年 2 月 1 日以降 | SMS または音声通話を多要素認証に利用しているユーザーは、サインイン前にパスキーの登録が必須となります。パスキー登録を促す自動プロンプトが、すべてのテナントのすべてのユーザーに対して強制されます。オプトアウトの選択肢はありません。 |

注: 本記事に記載した日付は、パブリック クラウドの Microsoft Entra ID にのみ適用されます (日本の大部分のお客様はこちらに該当します)。その他のクラウド環境 (米国政府向けの Azure Government など) への対応は別のタイムラインで行われ、追加のガイダンスと日付は事前に案内されます。

SMS や音声通話はこれまで十分にその役割を果たし、そうでなければ多要素認証を利用できなかったであろう何十億もの人々に MFA を届けてきました。しかし、脅威を取り巻く環境はこれらの能力を超えて進化しており、私たちもそれに合わせて進化する必要があります。

Microsoft がパスキーを Entra ID の既定とするのは、パスキーがユーザーにとってはより良く、サイバー攻撃者にとってはより不都合だからです。この移行では、何がいつ起きるかを見通せるよう、明確な日付を示し、移行期間中はフォールバックの手段を用意し、フィッシング可能な資格情報に頼らない [アカウント回復](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-account-recovery-overview) を提供します。

詳細は [既定でのパスキーと、Microsoft が提供する SMS および音声認証の廃止](https://aka.ms/passkeybydefault) をご覧ください。

[Microsoft Entra の ID およびアクセス ソリューションの詳細はこちら](https://www.microsoft.com/ja-jp/security/business/microsoft-entra)

Microsoft セキュリティ ソリューションの詳細については、当社の [Web サイト](https://www.microsoft.com/ja-jp/security) をご覧ください。
セキュリティに関する専門的な解説を継続的に入手するために、[Security ブログ](https://www.microsoft.com/en-us/security/blog/) をブックマークすることをおすすめします。
また、サイバー セキュリティに関する最新情報やアップデートについては、LinkedIn ([Microsoft Security](https://www.linkedin.com/showcase/microsoft-security/)) および X ([@MSFTSecurity](https://x.com/MSFTSecurity)) でもご確認いただけます。

----
※1 [Microsoft Digital Defense Report 2025](https://aka.ms/mddr).
