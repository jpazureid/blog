---
title: Microsoft Entra ID Governance ライセンスの詳細について
date: 2024-07-31 09:00
tags:
    - US Identity Blog
    - Microsoft Entra ID Governance
---

# Microsoft Entra ID Governance ライセンスの詳細について

こんにちは！ Azure ID チームの小出です。

今回は、2024 年 6 月 19 日に米国の Microsoft Entra (Azure AD) Blog で公開された [Microsoft Entra ID Governance licensing clarifications - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/microsoft-entra-id-governance-licensing-clarifications/ba-p/4164499) を分かりやすく日本語におまとめしなおしたものになります。ご不明点などございましたらお気軽にサポートへお問い合わせをいただけますと幸いです。

---

## はじめに

ここ数週間で、Microsoft Entra External ID と Microsoft Entra ID マルチテナント コラボレーションの一般提供を発表しました。ライセンスに関して、より詳細な情報を知りたいというご要望をいただきましたので、これら 2 つのシナリオについて、さらに明確に説明したいと思います。

## 1 人 1 ライセンス

マルチテナント組織 (MTO) 機能の一般公開にあたり、[マルチテナント組織 (MTO) が一般公開されました！](https://jpazureid.github.io/blog/azure-active-directory/mto-ga/) の中で、Microsoft Entra ID P1 ライセンスは、マルチテナント組織の従業員 1 人につき 1 つだけ必要であると記載しましたが、この記載について詳細を案内します。

「マルチテナント組織」という用語には、2 つ以上のテナントを所有し運営する組織と、これらのテナント間のユーザーのコラボレーション体験を向上させる一連の機能という 2 つの意味があります。複数のテナントを所有し、運営している組織では、それらのテナント全体で従業員 1 人につき 1 つの Entra ID ライセンスが必要です。同じ考え方が Entra ID Governance にも当てはまります。組織は、これらのテナント全体でユーザーの ID を管理するために、1 人につき 1 ライセンスあれば十分です。

このシナリオを説明するために、ZT Tires と Tailspin Toys という二つの組織を所有する Contoso 社という組織を考えてみます。

Contoso という組織は、複数のテナントを管理していて、それぞれ Contoso テナント、 ZT Tires、Tailspin Toys というテナントを持っています。Contoso 社は、Entra ID Governance のライフサイクル ワークフローを使用して、Mallory というユーザーのアカウントをオンボードし、業務に必要なリソースへのアクセス権を付与します。Mallory のアカウントは、ZT Tires の ERP アプリへのエンタイトルメント管理を含むアクセス パッケージを使用して、Tailspin Toys の在庫管理アプリへのアクセスを要求します。このユーザーは、Contoso テナントで Entra ID Governance ライセンスを持っているため、Mallory の ID は ZT Tires テナントと Tailspin Toys テナントで追加の Microsoft Entra ID Governance ライセンスを購入することなくガバナンス機能を利用できます。

補足: まとめると、上記シナリオとなる場合、各テナントで必要なライセンスはそれぞれ下記になります。

| 組織 | ライセンスの必要性 |
|---|---|
| Contoso | ライフサイクル ワークフローを利用する人数分の ID Governance ライセンスを用意する | 
| ZT Tires | 追加のライセンスは不要 | 
| Tailspin Toys | 追加のライセンスは不要 | 

同じ組織内で管理しているテナントのどこかに、人数分の Microsoft Entra Premium P1 / P2 / ID Governance ライセンスが用意されていれば、「1人 1 ライセンス」の法則にしたがい、他のテナントで人数分のライセンスを用意する必要はありません。ただし、テナントにライセンスが 1 つも紐づいていないと有料機能の設定が行えないため、ほかのテナント（上記例では ZT Tires と Tailspin Toys テナント）でも有料機能を利用する場合には、最低 1 つライセンスを購入し紐づける必要はあります。

## Microsoft Entra External ID における Entra ID Governance

もう一つの発表は、Entra External ID についてです。この機能は、お客様とビジネス上のコラボレーション相手が安全にアプリケーションへのアクセスをおこなえるようにする Microsoft のソリューションです。[11 月のブログ](https://jpazureid.github.io/blog/azure-active-directory/Microsoft-Entra-ID-Governance-licensing-for-business-guests/) で、Entra External ID の B2B シナリオにおいて Microsoft Entra ID Governance ライセンスを利用してビジネス ゲストの ID を管理するためのライセンス モデルについて述べ、価格設定がアクティブに管理される ID 1 つにつき月額 $0.75 であることを紹介しました。ビジネス ゲストの ID を管理するための従量制 (使用量ベース) の価格設定は、従業員の ID を管理するための既存のライセンスベースの価格設定モデルとは異なるモデルであるため、詳細を共有したいと思います。

Entra External ID のビジネスゲスト ID は、その ID がアクティブに利用されている月であれば、その ID に対してガバナンスの操作が何回行われたとしても、0.75 ドルの請求が 1 回発生します。たとえば、次のようになります: 

Contoso 社の従業員である Gerhart は、Woodgrove Bank という別の企業の Pradeep と協力して、Contoso の四半期財務諸表を作成しています。Contoso 社は、Woodgrove Bank などのビジネス パートナー向けに Entra External ID を導入しています。4 月に Pradeep は、Gerhart が四半期報告書類を保存している Contoso の Microsoft Teams にアクセスしますが、彼の Entra External ID には ID ガバナンスのアクションが実行されていないため、料金は発生しません。

5 月に、Pradeep が Contoso の会計システムへのエンタイトルメント管理を含むアクセス パッケージを受け取り、Pradeep の Contoso 社の在庫管理データベースへの既存のアクセス状況と、四半期報告文書を含むチームへのアクセス状況を Gerhart がレビューしたとします。Entra External ID の Pradeep の ID に ID ガバナンスの操作が実行されたため、Contoso は 0.75 ドルの課金を発生させます。その月に ID ガバナンスの操作が 3 回行われても、請求は 1 回のみ適用される（アクションごとの追加料金は発生しない）ことに注意ください。

補足: まとめると、上記シナリオとなる場合、ライセンスの課金は下記のようになります。

| 月 | 課金の有無 |
|---|---|
| 4 月 | 課金されない |
| 5 月 | 0.75 ドル |

4 月の段階では、Pradeep は Contoso 社のテナントにアクセスしていますが、ID Governance ライセンスが必要な機能にはアクセスしていないため課金されません。5 月に Pradeep がアクセス パッケージを受け取ったことで ID Governance ライセンスが必要な操作としてカウントされたため、Contoso 側では外部ユーザーが ID Governance の機能を利用したと判断し、0.75 ドルが課金されます。ただし、5 月の間にほかのアクセス パッケージを受け取るなど ID Governance の操作が複数があっても、重ねて 0.75 ドルが課金されるのではなく、月に 1 度のみカウントされます。月が変わり、6 月に再度アクセス パッケージを受け取るなどのアクションがあれば、そのユーザーの利用分として再度 0.75 ドルが課金されます。

Microsoft Entra ID Governance ライセンスの詳細については、ライセンスの基礎のページを参照ください。

[Microsoft Entra ID ガバナンス ライセンスの基礎 - Microsoft Entra ID Governance | Microsoft Learn](https://learn.microsoft.com/ja-jp/entra/id-governance/licensing-fundamentals)
