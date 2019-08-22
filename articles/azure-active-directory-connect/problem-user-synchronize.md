---
title: Azure AD Connect でユーザー同期ができない問題
date: 2017-10-24
tags:
  - AAD Connect
  - サポート
  - 情報採取
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/10/24/azure-ad-connect-syncerror-user/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# [調査に有効な採取情報] Azure AD Connect でユーザー同期ができない問題

こんにちは、Azure & Identity サポート チームの後藤です。

今回は Azure AD Connect サーバーでユーザー同期に問題が生じているケースについて取得する情報をご紹介します。
なお、この情報は “ユーザー同期トラブル” に特化していますので、併せて別途紹介しています Azure AD Connect の全般情報の採取もお願いします。

## 採取情報

1. オンプレミス Active Directory に格納されるユーザー オブジェクト情報
2. Azure AD Connect サーバー上のユーザー オブジェクト情報
3. Synchronization Service Manager のエラー画面ショット
4. イベントログ
5. エラーログの出力結果

## 取得手順

### 1. オンプレミス Active Directory に格納されるユーザー オブジェクト情報  

> 同期できないという問題が一部のオブジェクトで生じている場合には、正常に同期が完了しているユーザーと同期に問題が生じているものについて少なくとも 1 つずつを任意に選択の上、取得ください。

- 1-1. ドメイン コントローラーにて管理者権限でコマンド プロンプトを開きます。  
- 1-2. 以下のコマンドをそれぞれのオブジェクトに対して実行します。  

```cmd
ldifde.exe -f <出力ファイル名> -t 3268 -d <同期できないユーザーの DN 名> -p subtree
```

ユーザーの DN 名は、その対象がユーザーの場合であれば、コマンドで dsquery user -name <ユーザー名> で確認できます。

例えば contoso.com ドメインの OU1 という OU に所属している user1 というアカウントの場合には、 dsquery user -name user1 のコマンドの結果、次のように表示されます。

```txt
"CN=user1,OU=OU1,DC=contoso,DC=com"
```

この場合に `c:\user1_ad.txt` に出力するコマンドは次のようになります。

```cmd
ldifde.exe -f c:\user1_ad.txt -t 3268 -d "CN=user1,OU=OU1,DC=contoso,DC=com" -p subtree
```

- 1-3. 出力されたファイルを保存します。

### 2. Azure AD Connect サーバー上のオブジェクト情報

1 の手順で ldifde コマンドにて取得したオブジェクトと同オブジェクトについて採取します。

- 2-1. 既定で “C:\Program Files\Microsoft Azure AD Sync\UIShell” にあります “miisclient.exe” を実行し、[Synchronization Service Manager] を開きます。  
- 2-2. 画面上部の [Metaverse Search] ボタンを押します。  
- 2-3. 画面上部の [Scope by Objects Type] から、[person]を選びます。  
- あまりにも多くのユーザーが [Search Results] として出力され、さらに細かい条件を指定する場合は、[Attribute] に属性を指定し、[Operator]に "Equal" や "Starts with(前方一致)" を選択し、[Value] に検索するユーザーのキーワードをご指定ください。  
- 2-4. 表示された ユーザーをダブルクリックします。  
- 2-5. [Metaverse Object Properties]の画面をひろげ、 [Attributes] タブの設定全体が見えるようにした上で画面キャプチャを取得します。（画面が切れる場合は、スクロールなどして全体の情報を採取します）  
- 2-6. [Connectors]タブを選択します。  
- 2-7. [Distinguished Name] に Azure AD とオンプレ AD の二つの表示を確認します。  
- 2-8. 一方の [Distinguished Name] 設定を選択します。  
- 2-9. 表示された [Connector Space Object Properties] の設定全体が見えるように画面キャプチャを取得します。  
- 2-10 [Close] を押し、先ほど選択しなかった、もう一方の [Connector Space Object Properties] についても画面キャプチャを取得します。  

### 3. Synchronization Service Manager のエラー画面ショット

Azure AD Connect の Synchronization Service Manager にてエラーが発生しているか確認し、エラーが生じている場合にはその画面情報を取得します。

確認する箇所は[Operations] を選択して、[Status]が success でないものについて、画面右下のリンクをクリックしたときのすべての画面ショットを採取します。

### 4. イベント ログ

Azure AD Connect サーバーに管理者権限でサインインし、作業を実施ください。

- 4-1. コマンド プロンプトを管理者として起動して、以下の 2 つのコマンドを実行します。

```cmd
wevtutil epl system %UserProfile%\desktop\SysEvent.evtx
wevtutil epl Application %UserProfile%\desktop\AppEvent.evtx
```

- 4-2. デスクトップに作成された evtx 形式のイベント ログを採取します。

### エラーログの出力確認

Azure AD Connect 上でコマンドプロンプトを管理者権限で実行します。
`C:\Program Files\Microsoft Azure AD Sync\Bin` にある、csexport.exe  を使用して、以下の 4 つのコマンドを実行します。

```cmd
csexport.exe "<コネクター スペース名(Azure AD)>" error_YYYYMMDD_1.xml /f:e 

csexport.exe "<コネクター スペース名(Azure AD)>" error_YYYYMMDD_2.xml /f:i

csexport.exe "<コネクター スペース名(オンプレ AD)>" error_YYYYMMDD_3.xml /f:e 

csexport.exe "<コネクター スペース名(オンプレ AD)>" error_YYYYMMDD_4.xml /f:i
```

※コネクター スペース名については、Synchronization Service Manager [Operations]の [Name] に表示された名前です。

「コミュニティにおけるマイクロソフト社員による発言やコメントは、マイクロソフトの正式な見解またはコメントではありません。」
※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
