---
title: パスキーを利用したパスワードレスの導入を検討しよう
date: 2026-06-26
tags:
    - Microsoft Entra ID
    - Microsoft Security Blog
    - Passkey
    - Passwordless
---
# パスキーを利用したパスワードレスの導入を検討しよう
こんにちは、Azure & Identity サポート チームの長谷川です。
本記事は、2026 年 5 月 7 日に米国の Microsoft Security Blog で公開された [World Passkey Day: Advancing passwordless authentication](https://www.microsoft.com/en-us/security/blog/2026/05/07/world-passkey-day-advancing-passwordless-authentication/) を意訳したものになります。ご不明点はサポート チームまでお問い合わせください。
<!-- more -->
----

## はじめに
World Passkey Day は、共通の目標に向けた進捗を振り返る機会です。その目標とは、パスキーの導入を加速させることで、パスワードやその他のフィッシング可能な認証手段への依存を減らすことです。サイバー攻撃がより自動化され、AI を活用するようになる中で、各アカウントの安全性は最も弱い認証情報に依存します。真の進展を実現するには、単により強力なサインイン手段を追加するだけでは不十分であり、フィッシング可能な認証情報を排除し、回復フローのような一般的な攻撃経路を強化する必要があります。Microsoft は FIDO アライアンスと連携し、継続的な標準化活動やワーキンググループへの積極的な参加、その他の取り組みを通じて、[パスキーの普及とパスワードレスの未来の実現を推進していきます。](https://www.microsoft.com/ja-jp/security/business/security-101/what-is-fido2?msockid=274c96843e2863a22cb381cf3ff662e6)

[Microsoft Entra が提供する ID およびアクセスのためのソリューションを確認する](https://www.microsoft.com/ja-jp/security/business/microsoft-entra)

パスワードは依然として大きなリスク要因であり、管理が難しく、盗まれやすいという問題があります。さらに、認証強度の低い多要素認証と同様に、パスワードはフィッシング攻撃にも非常に脆弱です。AI を活用した攻撃活動では、クリック率が最大で 54% ※1 に達することもあります。これに対応するため、Microsoft はエコシステム全体でパスキーの導入を拡大しています。従来の認証方式への依存を減らすとともに、アカウント回復機能を強化することで、それがサイバー攻撃者にとっての抜け道 (バックドア) とならないようにしています。

> パスキーは、脆弱なシークレット (秘密情報) や識別可能な個人情報の代わりに、ユーザーのデバイス上に安全に保存された秘密鍵 (プライベート キー) を使用します。パスキーは、その鍵が作成された特定のウェブサイトやアプリでのみ機能し、かつユーザー自身が生体認証や PIN (暗証番号) を使ってロックを解除した場合にのみ使用可能です。そのため、パスキーを利用するユーザーは、悪意のある偽サイトに騙されてサインインしてしまうことがなく、またユーザー本人がその場にいて同意しない限り、パスキーは使用されません。これらの特性により、パスキーは「フィッシング耐性 (phishing-resistant)」を備えた認証方式とされています。
[Microsoft Digital Defense Report](https://www.hmcplus.de/wp-content/uploads/Microsoft-Digital-Defense-Report-2024-klein.pdf) より抜粋


## パスキーの導入は業界全体で拡大し続けている
パスキーの導入は急速に進んでいます。FIDO アライアンスの推定によると、世界中で既に 50 億のパスキーが利用されています。※2 また、OneDrive、Xbox、Copilot などの Microsoft のコンシューマー向けサービス全体で、毎日数億人のユーザーがパスキーを使用してサインインしています。
パスワードではなくパスキーを標準的な認証方法として選ぶ理由は数多くあります。パスキーによるサインインの成功率はパスワードよりも大幅に高く、認証情報に基づく攻撃のリスクも大幅に低くなります。※3 組織も個人ユーザーも、パスキーが提供するよりシンプルで安全なサインイン体験を指示しています。※4
Microsoft 社内では認証強度の低い認証方法の利用を廃止しました。そして、フィッシング耐性のある認証方法を導入し、社内環境のユーザーとデバイスの 99.6% をカバーしています。※5 その結果、サインインの体験は大幅にシンプルになりました。コードを入力する必要も、追加のプロンプトを管理する必要もなく、誰にとっても直感的で分かりやすい操作で利用できるようになっています。


## サインインおよびアカウント回復に関する製品アップデート
Microsoft では、コンシューマー向けアカウントから [Microsoft Entra](https://www.microsoft.com/ja-jp/security/business/microsoft-entra) によるエンタープライズアクセスまで、また [Windows Hello](https://www.microsoft.com/ja-jp/windows/tips/windows-hello) のようなデバイス ベースの認証から [Microsoft パスワードマネージャー](https://www.microsoft.com/ja-jp/edge/features/passkeys?msockid=252e42d5df4363d20f115453de43621a&form=MT0160) に至るまで、ID 利用体験のあらゆる層においてパスキーのサポートを推し進めてきました。この取り組みにより、ユーザーはサインインするあらゆる場所でパスキーを作成・利用でき、デバイス、アプリ、環境を問わず、一貫したフィッシング耐性のある認証体験を得られるようになります。

パスキーをより利用しやすくするため、次の様に利用可能な場所や利用方法を拡大しています：

- Microsoft Entra IDにおける [同期されたパスキー](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-authentication-passkeys-fido2) と [パスキー プロファイル](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-authentication-passkeys-fido2) により、多様な環境全体でパスワードレス サインインを容易に展開・拡張できるようになります。当社は、より大規模で複雑なポリシーへの対応など、クラウドでのパスキー管理の柔軟性を高めるとともに、テナントを統合型パスキー プロファイル モデルへと移行させています。

- [Windows 上の Entra パスキー](https://learn.microsoft.com/ja-jp/entra/identity/authentication/how-to-authentication-entra-passkeys-on-windows) 機能により、ユーザーは Windows Hello を使用して、個人用または未管理の Windows デバイス上でデバイスに紐付いたパスキーを直接作成・利用できるようになります。本機能は 2026 年 5 月下旬に一般提供が開始される予定です。

- [Microsoft Entra 外部 ID](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-external-id) 向けのパスキー機能も 2026 年 5 月下旬に一般提供が開始されるため、顧客向けアプリケーションにおいて、よりシームレスで一般消費者向けサービスにふさわしいサインイン体験を提供できるようになります。

- [Microsoft Entra ID](https://www.microsoft.com/ja-jp/security/business/identity-access/microsoft-entra-id) のパスキー優先認証 (プレビュー) では、登録済みの認証方法を検出し、最も強力な方法を優先的に提示します。パスキーが登録されていれば、ユーザーは即座にそのパスキーによる認証を利用できます。

- コンシューマー向け機能としては、Microsoft パスワードマネージャーを利用することで、Microsoft アカウント (個人アカウント) でサインインしたデバイス間で [パスキーを保存・同期](https://blogs.windows.com/msedgedev/2026/04/22/engineering-secure-passkey-sync-in-microsoft-password-manager/) できるようになりました。Microsoft Edge を通じた iOS および Android への対応もまもなく開始される予定です (Entra アカウントはコンシューマー向け機能ではないためこの機能の対象外です)。

アカウント回復は、アイデンティティ システムの整合性を維持するうえでも非常に重要な役割を担っています。従来、アカウント回復プロセスはサイバー攻撃者に狙われやすく、例えば正規のユーザーになりすまして回復プロセスを乗っ取り新しい資格情報の発行を要求するといった手口が見られてきました。

一般提供 (GA) となっている [Microsoft Entra ID のアカウント回復](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-account-recovery-overview) は、強固な本人確認プロセスを通じてユーザーがアカウントへのアクセスを回復できるようにすることで、回復フローのセキュリティを強化します。
ユーザーは、すべての認証方法を失った場合でも、政府発行の身分証明書や顔認証（バイオメトリクス）を使用してアクセスを回復することができます。また、一般提供にあたり、既存の Au10tix、IDEMIA、TrueCredential に加え、新たに 1Kosmos と CLEAR1 の 2 社が参加し、当社の [本人確認 (identity verification) のエコシステム](https://learn.microsoft.com/ja-jp/entra/verified-id/idv-partners) が拡張されています。


## ユーザー アカウントからフィッシング可能な資格情報を削除する
認証の強化は重要ですが、リスクを低減するためには、フィッシング可能な資格情報そのものを完全に排除することが必要です。Microsoft は従来のレガシーな認証方式の段階的な廃止を進め、ユーザーをフィッシング耐性のある認証方式へ移行させています。セキュリティの質問 (秘密の質問) は推測やソーシャル エンジニア リング攻撃に脆弱であることから、2027 年 1 月から Microsoft Entra ID において [セキュリティの質問 (秘密の質問) はパスワード リセットのオプションから削除されます](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-authentication-security-questions)。
その理由は単純明快です。優れた手法を強化しつつ脆弱な手法を排除することで、攻撃対象領域が縮小するからです。これは、AI エージェントがユーザーに代わって操作を行うようになっている現在、ますます緊急性を増しています。もし ID が侵害された場合、サイバー攻撃者はそれらのエージェントを利用してシステムへアクセスし、ワークフローを実行し、既存の権限の範囲内で活動することが可能になります。そのため、組織はこのリスクに迅速に対処する必要があります。


## より安全で使いやすい未来にむけて
昨年、Microsoft は数十の組織とともに「パスキーの誓約 (Passkey Pledge)」に参加し、フィッシング耐性のある認証の導入を加速し、パスワードに依存しない世界へ移行することを約束しました。それ以来、着実な進展が見られており、数億規模のコンシューマー アカウントがより強固に保護されるようになったほか、Microsoft 自身を含む組織でも大規模な展開が進んでいます。
これまで長期的な変化と思われていたものが、ようやく現実的な勢いを伴って進み始めています。認証はよりシンプルで安全、かつパスワードレスなものへと変わりつつあります。
サイバー攻撃者がフォールバック手法やアカウント復旧プロセスを悪用して認証を回避しようとする手口や、その対策について詳しく知りたい場合は、[こちらの関連​​記事をご覧ください](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/passkeys-aren%E2%80%99t-the-finish-line-eliminating-fallbacks-and-fixing-recovery/3627345)。

## さあ、はじめよう
組織がアイデンティティ セキュリティ体制を強化するには、ユーザー向けにパスキーを有効化し、サインイン時だけでなく回復（リカバリー）シナリオにもポリシー保護を拡張することが重要です。
Microsoft Entra ID におけるフィッシング耐性のあるパスワードレス認証の導入は、フィッシング耐性のあるパスワードレス認証の前提条件を計画することから始めましょう。
また、個人はよりセキュリティと利便性を高めるために、個人アカウントの [パスキーを作成・使用](https://support.microsoft.com/ja-jp/account-billing/create-and-save-a-passkey-e92cd3e0-11fa-4630-a5ea-3ccc0396b3d9)できます。
[Microsoft Entra の詳細はこちら](https://www.microsoft.com/ja-jp/security/business/microsoft-entra)

Microsoft セキュリティ ソリューションの詳細については、当社の [Web サイト](https://www.microsoft.com/ja-jp/security) をご覧ください。
セキュリティに関する専門的な解説を継続的に入手するために、[Security ブログ](https://www.microsoft.com/en-us/security/blog/) をブックマークすることをおすすめします。
また、サイバー セキュリティに関する最新情報やアップデートについては、LinkedIn ([Microsoft Security](https://www.linkedin.com/showcase/microsoft-security/))および X ([@MSFTSecurity](https://x.com/MSFTSecurity)) でもご確認いただけます。

----
※1 [Microsoft Digital Defense Report 2025](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Microsoft-Digital-Defense-Report-2025.pdf#page=1).
※2 [FIDO Alliance reports mainstream global usage on World Passkey Day](https://fidoalliance.org/fido-alliance-reports-accelerating-global-passkey-adoption-on-world-passkey-day-2026/). FIDO Alliance, 2026.
※3 [Synced passkeys and high assurance account recovery](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/synced-passkeys-and-high-assurance-account-recovery/3627343), Microsoft Entra blog. December 16, 2025.
※4 [FIDO Alliance Champions Widespread Passkey Adoption and a Passwordless Future on World Passkey Day 2025](https://fidoalliance.org/fido-alliance-champions-widespread-passkey-adoption-and-a-passwordless-future-on-world-passkey-day-2025/?utm_source=chatgpt.com), FIDO News Center. May 1, 2025.
※5 [Microsoft Security and Future Initiative (SFI) Progress Report—November 2025](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/security/sfi-nov-2025-progress-report.pdf).
