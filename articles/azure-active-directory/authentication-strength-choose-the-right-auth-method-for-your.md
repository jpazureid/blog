---
title: 認証強度 - シナリオに適した認証方式を選択可能に
date: 2022-11-02 09:00
tags:
    - Azure AD
    - US Identity Blog
---

# 認証強度 - シナリオに適した認証方式を選択可能に

こんにちは、Azure Identity サポート チームの 竜 です。

本記事は、2022 年 10 月 19 日に米国の Azure Active Directory Identity Blog で公開された [Authentication strength – choose the right auth method for your scenario!](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/authentication-strength-choose-the-right-auth-method-for-your/ba-p/2365674) を意訳したものになります。

---- 

管理者が、**条件付きアクセス** にて、リソースへのアクセスに使用できる認証方式を指定できる **認証強度** の機能を発表できることを嬉しく思います。例えば、管理者は、ユーザーがテナント内のリソースにアクセスする際に、任意の多要素認証 (MFA: Multi-Factor Authentication) の方法を要求する一方、特に機密性の高いリソースにアクセスする際にはフィッシング耐性のある認証方法を要求するということが可能となります。

「多要素認証の要求」は、条件付きアクセスで最も利用されているアクセス制御であり、約 35% のポリシーがこのアクセス制御を使用しています。ユーザーは、従来のパスワードに加え、MFA の認証方法である SMS や、より先進的で強力な Authenticator アプリや FIDO2 セキュリティ キーなどの組み合わせを使用することで、この要件を満たすことができます。

すべての MFA の方法が、同じように作られているわけではありません。時間が経つについて、Azure AD には新しい最新の認証方法が追加され、中には他の方法よりも安全なものもあります。認証強度の機能を使用することで、これらの認証方法を区別し、最も機密性の高いリソースには最も安全な認証方法を使用することができるようになります。

条件付きアクセスにおける認証強度の機能は、重要なコンプライアンスや規制の要件を満たすことにおいても有効です。たとえば、大統領令 14028「国家のサイバーセキュリティの改善」を支援するために発行された [米国連邦政府の行政管理予算局 (OMB) の覚書 22-09](https://learn.microsoft.com/ja-jp/azure/active-directory/standards/memo-22-09-multi-factor-authentication) では、従来の MFA の方法の脆弱さを指摘し、フィッシング耐性のある MFA の使用を義務付けています。認証強度の機能は、政府のお客様が、従業員やベンダーにフィッシング耐性のある MFA を施行するのに役立ちます。[Azure AD で覚書 22-09 の MFA の要件を満たす方法の詳細](https://learn.microsoft.com/ja-jp/azure/active-directory/standards/memo-22-09-meet-identity-requirements) については、こちらをご参照ください。

今回は、Microsoft Entra のプロダクト マネージャーである Inbar Cizer Kobrinsky と Namrata Kedia を招き、フィッシング耐性のある MFA の利用に向け、この画期的な機能をどのように活用できるかをご紹介いただきます。

Alex Weinert (twitter: [@Alex](https://techcommunity.microsoft.com/t5/user/viewprofilepage/user-id/15847#profile)_t_weinert)

--  

皆さん、こんにちは。  

Microsoft Ignite で発表された、内部および外部ユーザーを対象とした **条件付きアクセスの「認証強度」** の **パブリック プレビュー** について、詳しくお伝えできることを嬉しく思います。この機能により、管理者は機密性の高いリソースへのアクセスに使用できる認証方法を制御し、フィッシング耐性のある MFA の利用に向けた取り組みを開始することができます。

弊社では、以前より [多要素認証 (MFA) の有効化](https://www.microsoft.com/ja-jp/security/business/identity-access/azure-active-directory-mfa-multi-factor-authentication?rtc=1) を推奨してきました。実際のところ、今年に入ってから、セキュリティの既定値群を自ら有効化していないお客様のテナントにおいて、[セキュリティ既定値群の有効化](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/raising-the-baseline-security-for-all-organizations-in-the-world/ba-p/3299048) を実施しました。MFA の利用が増えるにつれて、[MFA に対する攻撃](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/all-your-creds-are-belong-to-us/ba-p/855124) も多くなっています。今でも、ID 攻撃への攻撃として最も多いのはパスワード攻撃であるため、MFA の有効化を強く推奨します。しかし、MFA に対する攻撃も増えているため、それにも対応できる MFA の方法で主要なリソースを保護することが重要になっています。

最良の選択は、**フィッシング耐性のある MFA** を使用することです。これらの強力な認証方法は、ユーザーが意図せず攻撃者に自身の資格情報を渡してしまったり、ソーシャル エンジニアリングを通じて認証要求を承認するようなフィッシング攻撃に対して有効です。Azure AD では、**証明書ベースの認証** (CBA: Certificate-based authentication) の一般提供に伴い、**Windows Hello for Business**、**FIDO2 セキュリティ キー**、および **CBA** の 3 つの選択肢からフィッシング耐性のある認証方法を選択できるようになりました。 これを踏まえて、ユーザーを保護するための次のステップは、条件付きアクセスの認証強度を使用し、重要なユース ケースで、これらの認証方法を要求することです。  

認証強度の機能の使用を開始するには、どのような条件でも構いませんのでまず条件付きアクセスポリシーを作成し、組み込みの認証強度のいずれかを要求するようにします。

- **多要素認証**
- **パスワードレス多要素認証**
- **フィッシング耐性のある多要素認証**  

今回のシナリオでは、アクセスを許可するためには、認証強度として、既定で用意されている「フィッシング耐性のある MFA」を要求します。このポリシーの適用範囲に含まれるユーザーは、リソースにアクセスする前に、テナントで設定したフィッシング耐性のある認証方法を使用するよう要求されます。  

![図 1: 既定で用意されている「認証強度」を使用した条件付きアクセスポリシーの作成](./Authentication-strength-choose-the-right-auth-method-for-your/01.png)

既定で用意されている認証強度を利用することで、必要な認証方法を迅速に強制することができます。本機能のプライベート プレビュー期間中、ある米国の大手政府機関に対し、AD FS (Active Directory Federation Services) からの移行を支援することができました。この機関は、条件付きアクセス ポリシーの **フィッシング耐性のある MFA** を用いることで、認証強度として CBA の使用を強制できたため、AD FS は不要となりました。

![図 2: テナントにおける認証強度の管理](./Authentication-strength-choose-the-right-auth-method-for-your/02.png)

既定で用意されている認証強度を確認した後、別の認証方法の組み合わせが必要となった場合は、独自のカスタム認証強度を作成し、要件を満たすための認証方法を選択することができます。AAGUIDs (Authenticator Attestation GUIDs) を使用して、特定の FIDO2 キーを要求することで、さらにアクセスを制限することも可能です。

![図 3: FIDO2 の制限を含むカスタム認証強度の作成](./Authentication-strength-choose-the-right-auth-method-for-your/03.png)

お客様にパスワードレスの導入を支援する InSpark のプリンシパル コンサルタント Pim Jacobs 氏は、認証強度を利用して **パスワードレス MFA** を要求し、次のようの述べています。  

> Azure AD 認証強度の機能のリリースにより、ついに我々自身と我々がサポートするお客様に対してパスワードの使用を禁止することができるようになりました。パスワードレスに関するワークショップで最も多く聞かれたフィードバックは「でも、まだパスワードでサインインできるんですよね？」でした。認証強度の機能あれば、それはパスワードでのサインインもブロックできるのです！

## 外部 ID に対する認証強度

条件付きアクセスの **認証強度ポリシー** を使用することで、Microsoft クラウド全体でビジネス パートナー (B2B) のゲストがリソースにアクセスする際に、特定の認証方法を使用するよう要求できるようになりました。これにより、管理者は [クロス テナントのアクセスポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/cross-tenant-access-settings-b2b-collaboration?source=recommendations#to-change-inbound-trust-settings-for-mfa-and-device-claims) を使用して、外部ユーザーがホームテナントで実行する MFA を信頼し、制御を強化することができます。

Glueckkanja-gab A G のクラウド アーキテクトであり、Microsoft Most Valuable Professional (MVP) でもある Fabian Bader 氏は、外部 ID に認証強度を利用し、以下のように述べています。  

> 認証強度は、弊社にとって画期的な機能です。管理者アカウントと機密性の高いアプリケーションに対して FIDO2 セキュリティ キーの使用を強制し、社内の全ユーザーに使用させたい MFA の方法を正確に定義できるようになりました。更に、外部 ID においては、クロステナントのアクセス設定を使用して、安全に MFA を信頼しつつ、認証強度を完全に制御することができています。

認証強度の詳細については、以下の資料をご参照ください。

- 概要: [https://aka.ms/authstrengthdocs](https://aka.ms/authstrengthdocs)
- API: [https://aka.ms/authstrengthAPIdocs ](https://aka.ms/authstrengthAPIdocs)
- 外部 ID: [https://aka.ms/authStrengthExternalUserdocs  ](https://aka.ms/authStrengthExternalUserdocs)

## 今後の予定

今後、数週間のうちに、認証方法のポリシーに新しい制御方法を追加し、Azure AD で利用可能な認証方法を一箇所で簡単に管理できるようにする予定です。このアップデートにより、認証方式をよりきめ細やかに管理することが可能になります。たとえば、認証方法を全ユーザーでオン/オフにするのではなく、認証方法のスコープとして特定のグループを指定することができるようになります。これにより、すべてのシナリオで、SMS のような安全性の低い認証方法の使用を管理し、認証強度を使用してシナリオ固有の要件に対応することが可能になります。これらを組み合わせることで、パスワードレスかつフィッシング耐性のある未来へ踏み出すために必要な制御を行えるようになります。  

ぜひ皆様にもお試しいただきたく思います。フィードバックは authstrengthfeedback@microsoft.com、Azure フォーラム、または Twitter で [@AzureAD](https://twitter.com/azuread) をタグ付けして、意見をお聞かせください。

Inbar and Namrata
