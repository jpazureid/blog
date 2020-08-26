---
title: "Azure AD Connect 設定の Export / Import"
date: 2020-08-24
tags:
  - AAD Connect
---

# Azure AD Connect 設定の Export / Import

こんにちは、Azure Identity サポート チームの田中です。
今回は、先日 Public Preview 版となった、Azure AD Connect のバージョン 1.5.42.0 から利用可能な Azure AD Connect 設定の Export / Import についてご紹介します。

## **Azure AD Connect 設定の Export/Import を使うメリット**

下記の弊社公開情報でもご案内しているとおり、2020 年 11 月 1 日以降、18 か月以上前にリリースされた Azure AD Connect のバージョンが非推奨となる、非推薦プロセスの運用が開始されます。

 Title : Azure AD Connect:バージョンのリリース履歴
 URL : https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-version-history

上記の非推奨プロセスの運用開始に伴い、多くのお客様が、既存の Azure AD Connect のバージョンのアップグレードをご検討いただいているかと思います。

しかし、Azure AD Connect のバージョンのアップグレードを行う際、Azure AD Connect のバージョン 1.5.30.0 までは、下記の弊社技術ブログでもご案内しているとおり、Azure AD Connect の設定情報および同期ルールについては、下記のバックアップ方法を推奨しており、両方の情報をまとめてバックアップすることができませんでした。

### Azure AD Connect のバージョン 1.5.30.0 までの弊社推奨バックアップ方法

設定情報および同期ルールのバックアップ方法は、以下の通りです。

- Azure AD Connect の設定情報 : 画面ショットによる記録
- Azure AD Connect の同期ルール : Synchronization Rules Editor を用いた Export

詳細については、下記ブログもご参照ください。

  Title : Azure AD Connect アップグレード手順
  URL : https://jpazureid.github.io/blog/azure-active-directory-connect/how-to-upgrade/

Azure AD Connect のバージョンのアップグレードにおいて、Azure AD Connect のバージョン 1.5.30.0 までは、Azure AD Connect の設定情報および同期ルールの両方の情報をまとめてバックアップすることができず、お客様側の作業工数が多くなってしまうため、今回の機能のご要望をお客様から多くいただいていました。

そこで今回、Public Preview 版として公開されたのが、「Azure AD Connect 設定の Export/Import」です。

この機能は、冒頭でご紹介したとおり、Azure AD Connect のバージョン 1.5.42.0 から利用可能となっており、Azure AD Connect 構成ウィザードからまとめて、Azure AD Connect の設定情報※1 および同期ルールの Export/Import が行えるようになりました。

#### Azure AD Connect のバージョン 1.5.42.0 から利用可能なバックアップ方法

- Azure AD Connect の設定情報 ※1 : Azure AD Connect 構成ウィザードからの Export
- Azure AD Connect の同期ルール : Azure AD Connect 構成ウィザードからの Export

※1 ただし、Azure AD Connect 構成ウィザード上で設定する一部の項目は、Azure AD Connect 構成ウィザードからの Export が行えないため、下記の情報を参照しつつ、注意が必要です。

#### 〇 : Export/Import できる情報

- Azure AD Connect インストール ウィザード内の設定情報
    - [ユーザー サインイン] 画面の情報
    - [Azure AD に接続] 画面で入力するテナント情報 (テナントのパスワードは Export した情報には含まれません)
    - [Azure AD サインインの構成] 画面の情報
- 同期ルール (カスタム ルール含む)


#### × : Export/Import できない情報

- Azure AD Connect インストール ウィザード内の設定情報
    - [ディレクトリの接続] 画面で入力するオンプレミス AD 側の管理者の資格情報
    - [ドメインと OU のフィルタリング] 画面の情報
    - [フィルタリング] 画面の情報
    - [オプション機能] 画面の情報
        - デバイス ライトバックの設定
        - AD FS のインストール設定

Azure AD Connect のバージョンのアップグレードにおいて、「Azure AD Connect 設定の Export/Import」は、お客様側の作業工数を少しでも減らすことができる有効な機能と考えています。

 Title : Azure AD Connect 構成設定のインポートとエクスポート (パブリック プレビュー)
 URL : https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-import-export-config

### Azure AD Connect 設定の Export/Import を用いるシナリオおよびその手順

Azure AD Connect 設定の Export/Import を用いるシナリオとしては、主に下記のシナリオ例が考えられます。

#### 1. Azure AD Connect のバージョンのアップグレード時

既存の Azure AD Connect サーバーの設定を Export し、その Export した設定内容を新しい Azure AD Connect  ステージング サーバーに適用させる際に、Azure AD Connect 設定の Export/Import は有効的な方法です。  
なお、既存の Azure AD Connect から Azure AD Connect 設定を移行する際の詳細手順につきましては、下記の弊社公開情報をご参照ください。

Title : 既存のサーバーから設定を移行する
URL : https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-import-export-config#migrating-settings-from-an-existing-server

#### 2. 設定変更前の環境に切り戻すための バックアップ / リストア を行いたい時

Azure AD Connect 設定の変更を行い障害が生じた場合に、環境の切り戻しをスムーズに行う際に、Azure AD Connect 設定の Export/Import は有効的な方法です。
なお、Azure AD Connect のバックアップ取得からリストアまでの詳細手順につきましては、[Azure AD Connect 設定ファイルの復元 (1.5.42.0 以降)](https://github.com/jpazureid/blog/blob/master/articles/azure-active-directory-connect/aadc-import-export-config/AADC_Config.pptx) にてお纏めしておりますので、必要に応じて該当 ppt ファイルをご参照ください。

上記内容が少しでも参考となりますと幸いです。

なお、製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。
