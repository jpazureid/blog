---
title: Azure AD に関する問題全般
date: 2017-10-24
tags:
  - Azure AD
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/10/24/%e8%aa%bf%e6%9f%bb%e3%81%ab%e6%9c%89%e5%8a%b9%e3%81%aa%e6%8e%a1%e5%8f%96%e6%83%85%e5%a0%b1-azure-ad-%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e5%95%8f%e9%a1%8c%e5%85%a8%e8%88%ac/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# [調査に有効な採取情報] Azure AD に関する問題全般

こんにちは、Azure & Identity サポート チームの後藤です。
今回は Azure AD に関する問題についてサポートに問い合わせる際に問い合わせに含めることを推奨する情報についてご紹介します。

ここでご紹介する情報は Azure AD が関係するようなお問い合わせでは、大体どのようなケースにおいても調査に必要になる情報となります。

<採取情報>

(a) 問題が起きているテナント及び問題に関係しているテナントの Tenant ID かイニシャル ドメイン (******.onmicrosoft.com)

＊この情報は Azure ポータルから問題の発生しているテナントのユーザーでお問い合わせを発行された場合にはこの情報はサポートにて確認できるので不要です。

<!-- textlint-disable -->
(b) 作業対象のユーザーや問題が発生しているユーザーの情報 (UPN, メンバーかゲスト ユーザーか, どのテナントのユーザーか)
<!-- textlint-enable -->

(c) 問題ステップ記録 (PSR) ツール情報

問題ステップ記録 (以降、PSR) は、クリックした場所の説明や、表示される画面のスクリーン ショット、その日時などを自動的にキャプチャするツールです。

PSR 情報から得られた各オペレーションの実行日時を元に、後述の各種情報から調査・追跡を行うために採取していただきます。

PSR の取得手順については後述します。

(d) エラー コード

下記のようなエラー コードがあるとサポート エンジニアは同様のエラーが出力された事例の調査ができます。
また、開発エンジニアの確認が必要になるケースでもエラー コードを元に大まかな要因を特定できる可能性があります。

> AADSTS65005: Invalid resource. The client has requested access to a resource which is not listed in the requested permissions in the client's application registration. Client app ID: f1764360-e0ec-4446-911e-cd6fc0d4dd61. Resource value from request: . Resource app ID: 00000002-0000-0000-c000-000000000000. List of valid resources from app registration: .

> Exception mapped to interrupt error code: Microsoft.AzureAD.Telemetry.Diagnostics.ServiceException: AADSTS65001: The user or administrator has not consented to use the application with ID 'box.net' named 'Windows Azure Active Directory'. Send an interactive authorization request for this user and resource.

(e) Trace ID、または Correlation ID と Timestamp のセット

サインインなどに失敗し、エラー画面が出力される際に、Trace ID か Correlation ID と Timestamp のセットが出力されることがあります。

下記のような Trace ID か Correlation ID と Timestamp のセットが含まれる画面ショットがあると、その情報をもとに Azure のプラットフォームのログを確認できます。

> Trace ID: 5c19f807-1e0b-489e-ae3b-26c975a20500

か

> Correlation ID: e9065a31-0768-44bf-b762-c9e37c9fd8d0

と

> Timestamp: 2017-09-12 06:32:13Z

### PSR を採取する手順

PSR 情報の記録を開始します
不要な情報の採取を避けるために、全てのウィンドウを閉じます。

以下の手順で PSR を起動します。
 2-1. スタート メニューの [ファイル名を指定して実行] にて psr.exe と入力し、[OK] をクリックします。

 2-2. "問題ステップ記録ツール" が起動しましたら、右端の ▼ をクリックし、表示されるメニューから [設定]をクリックします。

 2-3. "保存する最新の取り込み画像数" を 25 から 100 に変更し、OK をクリックします。

以下の手順で PSR 情報の記録を開始します。
 3-1. "問題ステップ記録ツール" の画面を前面に出します。

 3-2. [記録の開始] をクリックします。

 3-3. "問題ステップ記録ツール" の画面を最小化します。

  ※ 目的の画面が隠れないように、必ず最小化します。

事象の発生を確認します

  ※ Azure ポータルや Office ポータルなどで操作する場合には言語設定を英語にしておくことを推奨します。

  ここで取得する情報をグローバルの開発担当エンジニアやデータセンターエンジニアが確認する可能性があるためです。

---

PSR 情報の記録を停止します

以下の手順で PSR 情報の記録を停止して採取します。
 1-1. "問題ステップ記録ツール" の画面を前面に出します。

 1-2. [記録の停止] をクリックします。

 1-3. ファイルの保存場所、ファイル名を指定し、保存致します。

 1-4. 作成されました ZIP ファイルをご提供下さい。

ここでご案内しました情報を事前に取得し、お問い合わせと合わせてご提供いただくことで次のようなメリットがあります。

お問い合わせに対する回答・問題解決をよりはやくできます。
後々、再現できなくなり、問題発生時の情報がないために、問題の発生要因を追及できなくなるケースが減らせます。
サポート エンジニアより情報採取を案内される分のやり取りを減らせます。

「コミュニティにおけるマイクロソフト社員による発言やコメントは、マイクロソフトの正式な見解またはコメントではありません。」

※本情報の内容は、作成日時点でのものであり、予告なく変更される場合があります。
