---
title: 条件付きアクセスの認証コンテキストを触ってみた
date: 2021-12-07 17:00
tags:
  - Azure AD
  - Conditional Access Policy
---


# 条件付きアクセスの対象にワークロード ID を対象とする機能がプレビューしました

本記事は Azure Tech Advent Calendar 2021 7 日目の記事です。
Japan Azure Identity Support Blog では、お問合せの多い事象へのトラブルシューティング方法や、英文で公開された記事の日本語訳の情報を発信しています。今回の記事では、以下のプレビュー機能の紹介となります。

ワークロード ID 用の条件付きアクセス (プレビュー)
https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/workload-identity

従来、条件付きアクセスは "ユーザー" の "リソース" へのサインインを制御する機能としてお伝えしていました。今回のプレビューによって、"ワークロード ID (アプリケーション)" のサインインに対する IP アドレス ベースの制御を構成することが可能になりました。様々な機能が追加されてきている条件付きアクセスにおいて、遂に、アプリケーションのサインインに対しても制御することができるようになったのかと感慨深い気持ちになったため紹介します。

主に公開情報の内容をなぞって、補足するような内容になります。最新の情報は、公開情報のページを確認ください。

Advent Calendar からこの記事にたどり着いた方は、普段 Azure をご利用いただいてるユーザーの方々かと思いますが、この機能を設定することはできないかもしれません。
条件付きアクセスはサブスクリプションの所有者ではなく、Azure AD (テナント) のグローバル管理者など、組織内における権限を持ったユーザーが設定を行う機能です。組織の管理者ではなく、普段 Azure を利用されているユーザーにおいては、この機能がどういった操作に作用するのか知っておいていただければと思いました。

まずは、この機能の対象について公開情報の内容を抜粋しつつ、Azure の利用者向けの補足になるような情報をまとめています。後半には、Azure AD の管理者寄りの情報を記載しています。

## ワークロード ID に該当するアプリケーションのサインインについて

この機能で制御対象となるのは、例えば、以下の方法を利用したサインインです。

az login --service-principal -u <app-id> -p <password-or-cert> --tenant <tenant>
Azure CLI を使用してサインインする — ログインと認証 | Microsoft Docs

Connect-AzAccount -CertificateThumbprint $Thumbprint -ApplicationId $ApplicationId -Tenant $TenantId -ServicePrincipal
Connect-AzAccount (Az.Accounts) | Microsoft Docs

Connect-AzureAD -TenantId $tenant.ObjectId -ApplicationId  $sp.AppId -CertificateThumbprint $thumb
Connect-AzureAD (AzureAD) | Microsoft Docs

ユーザーの ID とパスワードを入力するのではなく、アプリケーションの資格情報としてシークレットもしくは証明書を利用するサインインを制御することができます。

ただし、すべてのアプリではなく適用対象となるアプリケーションは、シングルテナント アプリケーションのみです。
Azure Portal から登録する方法として、Azure Active Directory > アプリの登録 > + 新規登録  からアプリを追加する際に "この組織ディレクトリのみに含まれるアカウント" を選択して作成されたアプリケーションが対象となります。

![signInAudience の確認](./introducing-ca-for-workload-id/1_signInAudience.png)

上記の方法でサインインを行うようなアプリをワークロード ID と呼び、公開情報ではユーザーとは異なる次の考慮点があるとしています。

> ワークロード ID とは、アプリケーションまたはサービス プリンシパルが (場合によってはユーザーのコンテキストにある) リソースにアクセスすることを可能にする ID です。 これらのワークロード ID は、従来のユーザー アカウントとは次のように異なります。
>
> - 通常、正式なライフサイクル プロセスがありません。
> - 資格情報またはシークレットをどこかに保存する必要があります。
> - アプリケーションで複数の ID を使用することができます。
>
> これらの相違点により、ワークロード ID の管理が困難になり、リークのリスクが高まり、アクセスをセキュリティで保護できる可能性が低くなります。
