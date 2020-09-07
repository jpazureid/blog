
---
title: Azure AD Connect アップグレード手順詳細
date: 2020-09-10
tags:
  - AAD Connect
---

# Azure AD Connect アップグレード手順詳細

こんにちは。 Azure Identity サポートの谷です。

Azure AD Connect の非推奨プロセスに伴い、多くのお客様にて推奨バージョンへのアップグレードご検討いただいている状況となり、弊社にも多くのお問い合わせをいただいています。

[インプレース アップグレードの手順](https://jpazureid.github.io/blog/azure-active-directory-connect/how-to-upgrade/)を公開させていただいていましたが、今回改めてシナリオ毎での手順を纏めました。
弊社環境で実施した際の画面キャプチャを含めて記載させていただいておりますので、実際の作業時の参考にしていただければ幸いです。


今回ご紹介する手順のシナリオは下記の 3 パターンとなります。

- A. Azure AD Connect 2 台構成によるスウィング アップグレード
- B. Azure AD Connect 1 台構成に 1 台追加で構成し、アップグレード
- C. Azure AD Connect 1 台構成によるインプレースアップグレード


それぞれの手順の流れと手順内容を pptx ファイルに纏めさせていただいています。
ご利用いただいている環境に応じて、ご参照ください。


## A. Azure AD Connect 2 台構成によるスウィング アップグレード

### <手順概要>

それぞれのサーバーを区別するために、ServerA (ステージング モード無効) 、ServerB (ステージング モード有効) として記載します。

1. それぞれのサーバーで既存環境の動作状況の確認
2. 設定内容の保存
3. ServerB の Azure AD Connect のインプレース アップグレード
4. ServerB の動作状況の確認
5. ServerA にて Azure AD Connect のステージング モードを有効化
6. ServerB にて Azure AD Connect のステージング モード無効化
7. ServerA の Azure AD Connect のインプレース アップグレード
8. ServerA の Azure AD Connect の動作確認

### <手順詳細>  
[Azure AD Connect アップグレード手順 (スイング移行)](articles\azure-active-directory-connect\how-to-upgrade-details\AADC_Upgrade_A.pptx)


手順は 1.1.618.0 からの 2020 年 8 月現在最新バージョンの 1.5.45.0 へのアップグレードを実行したものとなります。



## B. Azure AD Connect 1 台構成に 1 台追加で構成し、アップグレード
### <手順概要>
1. 新規構築サーバーの準備
2. 既存環境の動作状況の確認
3. 設定内容の保存
4. 新規構築サーバーに Azure AD Connect インストール (ステージング モード有効)
5. 新規構築サーバーにて設定、動作状況の確認
6. 既存環境の Azure AD Connect のステージング モードを有効化
7. 新規構築サーバーにてステージング モード無効化
8. 既存環境の Azure AD Connect のインプレース アップグレード
9. 既存環境の Azure AD Connect の動作確認

### <手順詳細>  
[Azure AD Connect アップグレード手順 (スイング移行)](articles\azure-active-directory-connect\how-to-upgrade-details\AADC_Upgrade_B.pptx)

手順は 1.1.618.0 からの 2020 年 8 月現在最新バージョンの 1.5.45.0 へのアップグレードを実行したものとなります。
アップグレード前のバージョンによって表示項目などが異なりますので、予めご留意ください。


## C. Azure AD Connect 1 台構成によるインプレースアップグレード
### <手順概要>
1. 下記の手順で実施します。
2. 既存環境の動作状況の確認
3. 設定内容の保存
4. アップグレード
5. アップグレードの動作確認 (手順1. と同じ)

### <手順詳細>  

[Azure AD Connect アップグレード手順 (Azure AD Connect サーバー 1 台構成)](articles\azure-active-directory-connect\how-to-upgrade-details\AADC_Upgrade_C.pptx)

手順は 2020 年 8 月現在最新バージョンの 1.5.45.0 に日本語対応となった 1.0.8667.0 からのアップグレードとなります。
