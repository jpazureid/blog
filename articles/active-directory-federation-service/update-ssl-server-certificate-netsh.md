---
title: netsh コマンドで AD FS サーバーの SSL 証明書更を更新する手順
date: 2023-02-20
tags:
  - AD FS
---

# netsh コマンドで AD FS サーバーの SSL 証明書更を更新する手順

皆様、こんにちは。Azure & Identity サポート担当の竹村です。

本ブログでは、netsh コマンドで AD FS サーバーの SSL 証明書更を更新する手順をご案内いたします。
バージョンに依らず、汎用的に利用できる手順ですので、Powershell のコマンドによる更新がエラーで失敗する場合などにご利用いただければと思います。

以下の流れで更新作業を行います。

## 手順の概要

1. 証明書の取得
2. SSL サーバー証明書、ルート証明書、中間証明書のインストール
3. SSL サーバー証明書のアクセス権設定
4. AD FS のサービス通信証明書へ SSL サーバー証明書を設定
5. AD FS の SSL サーバー証明書を更新
6. WAP サーバーを再構成

それぞれの詳細を後述致します。

## 1. 証明書の取得

ご利用になる認証機関から SSL サーバー証明書とルート証明書、中間証明書を取得します。
認証機関によって CSR 作成・送信、証明書受領手順が異なるため、手順は省略します。

## 2. SSL サーバー証明書、ルート証明書、中間証明書のインストール

ご利用になる認証機関から取得した SSL サーバー証明書、ルート証明書、中間証明書を以下手順でインストールします。

※ インポートする中間証明書の有無や数は、ご利用の認証機関によって異なります。

全 AD FS サーバー、全 WAP サーバーにて以下を実施します。

1. [スタート] - [ファイル名を指定して実行] から certlm.msc と入力し、[OK] をクリックします。

2. 画面左側から以下のストアを展開します。

    [証明書 (ローカル コンピューター)] - [信頼されたルート証明機関] - [証明書]

3. [証明書] を右クリックし、[すべてのタスク] - [インポート] を選択し、ウィザードに従って SSL サーバー証明書の発行元証明機関のルート証明書をインストールします。

4. 続けて、画面左側から以下のストアを展開します。

    [証明書 (ローカル コンピューター)] - [中間証明機関] - [証明書]

5. [証明書] を右クリックし、[すべてのタスク] - [インポート] を選択し、ウィザードに従って SSL サーバー証明書の発行元証明機関の中間証明書をインストールします。

6. 続けて、画面左側から以下のストアを展開します。
[証明書 (ローカル コンピューター)] - [個人] - [証明書]

7. [証明書] を右クリックし、[すべてのタスク] - [インポート] を選択し、ウィザードに従って SSL サーバー証明書 (秘密鍵付き) をインストールします。

## 3. SSL サーバー証明書のアクセス権設定

証明書に、AD FS サービス アカウントに必要なアクセス許可を付与します。
全 AD FS サーバーにて以下を実施します。

1. [スタート] - [ファイル名を指定して実行] から certlm.msc と入力し、[OK] をクリックします。

2. 画面左側から以下のストアを展開します。

    [証明書 (ローカル コンピューター)] - [個人] - [証明書]

3. 中央から、手順 2. でインストールした SSL サーバー証明書を右クリックして、[すべてのタスク] - [秘密キーの管理] をクリックします。

    ※ もし [秘密キーの管理] を実行できない場合は、次のコマンドを実行してください。このコマンドを実行することにより、個人ストアのすべての証明書のキーの関連付けの修復、または証明書プロパティやキーのセキュリティ記述子の更新を行います。

    ```cmd
    certutil -repairstore my *
    ```

4. NT SERVICE\ADFSSRV と NT SERVICE\DRS (場所はローカルを指定します) を [追加] して、各アカウントに読み取りアクセス許可を付与します。

    ※ NT SERVICE\DRS アカウントが存在しない場合には、NT SERVICE\ADFSSRV のみにアクセス許可を付与します。
    ※ バージョン 2016 以降の場合、NT SERVICE\DRS アカウントは存在しないため、NT SERVICE\ADFSSRV のみにアクセス許可を付与します。


## 4. AD FS のサービス通信証明書へ SSL サーバー証明書を設定

AD FS のサービス通信証明書として SSL サーバー証明書を設定します。
プライマリ AD FS サーバーにて以下を実施します。

1. スタート画面などから [AD FS の管理] コンソールを開きます。

2. 画面左側から [AD FS] - [サービス] - [証明書] を右クリックし、 [サービス通信証明書の設定] をクリックします。

3. 証明書の選択画面から手順 2. でインストールした SSL サーバー証明書を選択します。

4. [OK] をクリックします。

    ※ 警告が表示されましたら、[OK] をクリックします。

## 5. AD FS の SSL サーバー証明書を更新

AD FS の SSL サーバー証明書を更新します。全 AD FS サーバーにて以下を実施します。

1. 管理者権限で Powershell を起動し、以下のように実行します。

```powershell
netsh http show ssl
```

以下のように、バインドされている <ホスト名>:<ポート番号> 毎に状態が表示されます。

```cmd
Hostname:port               : localhost:443
Certificate Hash             : <既存の証明書の拇印>
Application ID               : {5d89a20c-beab-4389-9447-324788eb944a}
Certificate Store Name       : MY
Verify Client Certificate Revocation : Enabled
Verify Revocation Using Cached Client Certificate Only : Disabled
Usage Check                 : Enabled
Revocation Freshness Time   : 0
URL Retrieval Timeout       : 0
Ctl Identifier               : (null)
Ctl Store Name               : (null)
DS Mapper Usage             : Disabled
Negotiate Client Certificate : Enabled
```
更新前後で、証明書の拇印以外の項目が同一になっていることを確認するために、事前にこのコマンド結果をテキストファイルに出力し、取得しておきます。

(例)
netsh http show ssl > c:\temp\ssl.txt


2. 更新を行うバインドを特定します。
Application ID の項目が、{5d89a20c-beab-4389-9447-324788eb944a} であるものが対象です。
({5d89a20c-beab-4389-9447-324788eb944a} は、AD FS で利用されていることを示します。)
既定では、以下が対象になりますが、環境によって変わる可能性がございますので、Application ID の値で判断してください。
```cmd
   ・ localhost:443
   ・ <フェデレーションサービス名>:443
   ・ <フェデレーションサービス名>:49443、 もしくは certauth.<フェデレーションサービス名>:443
```

3. 更新対象のバインドを削除します。
Powershell で、以下のように実行します。
```powershell
netsh http delete sslcert hostnameport=localhost:443
netsh http delete sslcert hostnameport=<フェデレーションサービス名>:443
netsh http delete sslcert hostnameport=<フェデレーションサービス名>:49443
```
※ 上記は、一例となります。実際には、お客さまの環境に合わせて、手順 2 で特定した対象の <ホスト名>:<ポート番号> を指定して削除してください。


4. 更新対象のバインドを追加します。
Powershell で、以下のように実行します。
```powershell
netsh http add sslcert hostnameport=localhost:443 certhash=<新しい証明書の拇印> appid='{5d89a20c-beab-4389-9447-324788eb944a}' certstorename=MY
netsh http add sslcert hostnameport=<フェデレーションサービス名>:443 certhash=<新しい証明書の拇印> appid='{5d89a20c-beab-4389-9447-324788eb944a}' certstorename=MY sslctlstorename=AdfsTrustedDevices
netsh http add sslcert hostnameport=<フェデレーションサービス名>:49443 certhash=<新しい証明書の拇印> appid='{5d89a20c-beab-4389-9447-324788eb944a}' certstorename=MY clientcertnegotiation=Enable
```
※ 上記は、一例となります。実際には、お客さまの環境に合わせて、手順 2 で特定した対象の <ホスト名>:<ポート番号> を指定して追加してください。

※ 新しい証明書の拇印 (Thumbprint) は、以下のコマンドでご確認頂けます。
```powershell
dir Cert:\LocalMachine\My\ | FL Thumbprint, Subject, NotBefore, NotAfter
```

※ <フェデレーションサービス名>:443 に関しては、sslctlstorename=AdfsTrustedDevices を付与する必要があります。

※ <フェデレーションサービス名>:49443、もしくは certauth.<フェデレーションサービス名>:443 に関しては、clientcertnegotiation=Enable を付与する必要があります。


5. 更新したバインドを確認し、事前に手順 1 で取得しておいたものと比較します。

```powershell
netsh http show ssl
```

更新対象のバインドすべてに対し、Certificate Hash のみが新しい証明書のものに変わっており、その他のパラメータは事前に取得したものと合致していることをご確認ください。

```cmd
Hostname:port               : localhost:443
Certificate Hash             : <新しい証明書の拇印> ★ <<< ここだけが変わっていることを確認します。
Application ID               : {5d89a20c-beab-4389-9447-324788eb944a}
Certificate Store Name       : MY
Verify Client Certificate Revocation : Enabled
Verify Revocation Using Cached Client Certificate Only : Disabled
Usage Check                 : Enabled
Revocation Freshness Time   : 0
URL Retrieval Timeout       : 0
Ctl Identifier               : (null)
Ctl Store Name               : (null)
DS Mapper Usage             : Disabled
Negotiate Client Certificate : Enabled
```


## 6. WAP サーバーを再構成

WAP サーバーを再構成します。全 WAP サーバーにて以下を実施します。

1. レジストリ エディターを開きます。

2. [HKEY_LOCAL_MACHINE\Software\Microsoft\ADFS] を選択します。

3. [ProxyConfigurationStatus] をダブル クリックします。

4. [値のデータ] を 1 にして [OK] をクリックします。

5. スタート画面などから [リモート アクセス管理] コンソールを開きます。

6. 画面左側から [構成] - [Web Application Proxy] をクリックします。

7. 画面中央から [Web アプリケーション プロキシ構成ウィザードの実行] をクリックします。

8. 初期構成時と同様に、WAP サーバーを構成します。

    ※ [AD FS プロキシの証明書] 画面では、手順 2. でインストールした SSL サーバー証明書を選択します。

> (注意) WAP サーバーの再構成を行う際には、hosts ファイルでフェデレーションサービス名がプライマリ AD FS サーバーに名前解決されるように設定ください。
AD FS サーバーと WAP サーバーとの間にロードバランサーが存在するような環境の場合、明示的にプライマリ AD FS サーバーに対して接続されるように設定しておきませんと、再構成に失敗することがございます。

手順は以上の通りとなります。上記手順は過去にも同様のお問い合わせをお受けした際、多くのお客様にご案内しております実績のある手順となっておりますので、ご参考いただけますと幸いです。