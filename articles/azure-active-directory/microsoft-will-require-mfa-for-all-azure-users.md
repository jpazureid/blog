---
title: "Microsoft は Azure ポータル (および Azure CLI 等) を利用するユーザーに MFA を義務付けます"
date: 2024-05-24 09:00
tags:
    - Microsoft Entra
    - US Identity Blog
---
# Microsoft は Azure ポータル (および Azure CLI 等) を利用するユーザーに MFA を義務付けます

こんにちは、Azure Identity サポート チームの 五十嵐 です。

本記事は、2024 年 5 月 14 日に米国の Core Infrastructure and Security Blog で公開された [Microsoft will require MFA for all Azure users](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/microsoft-will-require-mfa-for-all-azure-users/ba-p/4140391) の抄訳です。ご不明点等ございましたらサポート チームまでお問い合わせください。

> [!NOTE]
> 2024/05/28 更新: 現時点で本変更の適用範囲となる管理ポータルについて、Azure ポータル (<https://portal.azure.com>) のほか、Microsoft Entra 管理センター (<https://entra.microsoft.com>) が含まれることを確認しています。
> 2024/07/01 更新: 本変更に関する最新情報の抄訳ブログについて、[Azure ポータル (および Azure CLI 等) の MFA 義務付けに関する更新情報 (2024/6/27)](https://jpazureid.github.io/blog/azure-active-directory/update-on-mfa-requirements-for-azure-sign-in/) をご参照ください。

----

2024 年 7 月、Azure チームは多要素認証 (MFA) を要求するセキュリティ対策の展開を予定しています。テナントレベルでこのセキュリティのベースラインを確立することで、クラウドへの投資と企業を保護するためのセキュリティがさらに強化されます。

MFA は、クラウド サービス プロバイダーの間で一般的に義務付けられているセキュリティ手法で、サービスやリソースにアクセスする前に 2 つ以上の証拠を提示して、認証しようとしているユーザーが本当にその人であることを確認することをユーザーに要求します。MFA は標準的なユーザー名とパスワードによる認証に、さらなる保護レイヤーを追加するものです。

本変更は、お客様への影響を最小限に抑えるため、段階的かつ計画的に行われる予定です。本ブログでは、MFA が有効化される Azure サービスへのアクセスに対応するための準備に役立つ情報を Azure 製品チームから提供いたします。今後、Azure 製品チームは、ダイレクト メールや Azure ポータルの通知を通じて、具体的な展開の日程についてお知らせします。今後数ヶ月のうちに、このようなお知らせがあることをご承知おきください。

MFA がなぜ、そしてどのように Azure 上のお客様やお客様のワークロード、環境、ユーザーを保護するために重要なのかご理解いただくためには、続きをお読みください。

展開を待ちたくない場合は、[Microsoft Entra](https://aka.ms/EntraIDMFAWizard) の MFA ウィザードを使用して今すぐ MFA を設定ください。

> [!WARNING]
> MFA ウィザードを進めると、MFA を利用するためのテナントで使用できる認証方法の設定や条件付きアクセス ポリシーが自動で展開され、MFA が要求されるユーザーが発生しますので、ご注意ください。

## MFA の仕組み

多要素認証 (MFA) は、サービスまたはリソースにアクセスする前に、ユーザが 2 つ以上の証拠を提示して認証することを要求するセキュリティの仕組みです。証拠とは、ユーザーが知っているもの (パスワードや PIN など)、ユーザーが持っているもの (電話やトークンなど)、またはユーザー自身を示すもの (指紋や顔スキャンなど) です。

MFA は、標準的なユーザー名とパスワードによる認証に保護レイヤーを追加し、攻撃者がアカウントを侵害したりデータを盗んだりするのを難しくします。MFA はまた、フィッシング、クレデンシャル スタッフィング、ブルート フォース、またはパスワードの再利用攻撃による不正アクセスの防止にも役立ちます。

Entra ID は、Microsoft Authenticator アプリ、SMS、音声通話、ハードウェア トークンなど、さまざまな MFA 方式をサポートしています。ユーザーは自分の好みやニーズに合った方法を選択することができます。管理者は、Entra ID の条件付きアクセス ポリシーを使用して、ユーザーの場所、デバイス、役割、リスク レベルなどのシグナルに基づいて、MFA が必要なタイミングを調整することもできます。

## MFA が Azure テナントのセキュリティにとって重要な理由

MFA の必要性は、サイバー攻撃がより頻繁に、より巧妙に、そしてより甚大になりつつある今、これまで以上に重要になっています。[当社のレポート](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RW166lD?culture=en-us&country=us) によると、漏洩したアカウントの 99.9 ％ が MFA を使用していませんでした。同レポートはまた、MFA はアカウント侵害攻撃の 99.2 ％ 以上をブロックすることができ、利用可能な最も効果的なセキュリティ対策の 1 つであることも明らかにしています。

COVID-19 パンデミックによるハイブリッド ワークの台頭と企業のデジタル変革の加速により、従業員と企業はより多くのリスクにさらされています。今日、より多くの人が社外で働き、さまざまなデバイスや場所からデータやアプリケーションにアクセスしています。このため、ユーザーが安全でないネットワークやデバイス、パスワードを使用する可能性があり、攻撃対象が増加することで不正アクセスの可能性が高まっています。MFA は、追加の検証ステップを追加し、不明または疑わしいソースからのアクセスを防止することによって、これらのリスクを軽減するのに役立ちます。

MFA はまた、ID およびアクセス管理の重要なコンポーネントでもあり、認証された正規ユーザーのみがサービスやリソースにアクセスできるようにします。Microsoft の [Secure Future Initiative](https://www.microsoft.com/en/microsoft-cloud/resources/built-in-security) における 3 つのエンジニアリングの進歩分野の 1 つは、新しい ID 保護の実装に重点を置いており、テナント レベルでの MFA は ID 保護に重要です。MFA は、アカウントの漏洩やデータ侵害のリスクを低減するだけでなく、PCI DSS、HIPAA、GDPR、NIST など、さまざまなセキュリティ基準や規制への準拠にも役立ちます。

## MFA を今すぐ設定ください

ユーザーとデータの安全を守るため、テナント レベルで MFA を無料で利用できるようになりました。Microsoft Entra の [MFA ウィザード](https://aka.ms/EntraIDMFAWizard) を使用して、今すぐ MFA を設定できます。

その他のご質問については、Microsoft Learn の [MFA の FAQ](https://learn.microsoft.com/ja-jp/entra/identity/authentication/multi-factor-authentication-faq) をご覧ください。また、Secure Future Initiative と Microsoft 組み込みのセキュリティ機能については、[こちら](https://www.microsoft.com/en/microsoft-cloud/resources/built-in-security) をご覧ください。

## Azure のプロダクト マネージャー Naj Shahid からの補足情報

5/16 に Naj Shahid から追加の補足情報が上記記事にコメントされておりますので、以下に合わせて抄訳を提供します。

- **適用範囲**: **管理目的** で [Azure ポータル](https://portal.azure.com/)、Azure CLI、PowerShell、または Terraform にサインインするすべてのユーザー。
- **エンド ユーザーへの影響**: 学生、ゲスト ユーザーを含むエンド ユーザーは、Azure リソースを **管理するために** Azure ポータル、CLI、PowerShell、または Terraform にサインインする場合にのみ影響を受けます。この実施ポリシーは、Azure 上でホストされているアプリ、Web サイト、サービスには適用されません。MFA を必須とするかは、アプリ、Web サイト、またはサービスの所有者によって管理されます。
- **除外**: サービス プリンシパル、マネージド ID、ワークロード ID、および自動化に使用される同様の [トークンベースのアカウント](https://learn.microsoft.com/ja-jp/azure/automation/automation-security-overview) は除外されます。Microsoft は、緊急用アカウントやその他の特別なリカバリ プロセスなど、除外対象とすべき特定のシナリオに関してお客様の意見を引き続き収集しています。
- **MFA の方法**: [サポートされているすべての MFA メソッド](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-mfa-howitworks#available-verification-methods) を使用できます。
- **例外**: 除外対象を除き、例外は予定していません。どのアカウントでもサインインができなくなるなど回避策がない状況に陥った場合には MFA を介さずにログインする例外の申請手続きを提供する予定です。例外手続きの詳細は、公式通知を通じて共有される予定です。
- **スケジュール**: 2024 年 7 月より、ポータルのみを対象とした本変更の段階的な展開を開始します。ポータルへの展開が完了したら、Azure CLI、PowerShell、Terraform についても同様の段階的な展開を開始する予定です。本変更がユーザー ID を使用する自動化スクリプトに影響を与える可能性があることを理解しておりますので、それに備えるための追加の時間を提供するために、Azure ポータルへの施行を優先しています。
- **コミュニケーション**: Microsoft は、お客様に十分な情報を提供し、準備を整えていただくために、公式の電子メールや通知を通じて、詳細な情報やスケジュールを事前にお知らせします。このブログ記事の目的は、この近々予定されている変更についての認識を高め、多要素認証への移行準備の一助とすることです。

MFA を設定するのを待つ必要はありません。Microsoft Entra の [MFA ウィザード](https://aka.ms/EntraIDMFAWizard) を使って MFA を設定し、ユーザーとデータの安全を守りましょう。Microsoft では、開発・運用や Azure Resource Manager への API アクセスでどの Entra ID が使用されているかを調べることを推奨しています。必要に応じて、ユーザー ID を [サービス プリンシパルとマネージド ID](https://learn.microsoft.com/ja-jp/azure/devops/integrate/get-started/authentication/service-principal-managed-identity?view=azure-devops) に置き換える方法をご確認ください。
