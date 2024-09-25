---
title: デバイス オブジェクト属性の確認方法と各確認方法で表示される内容の比較について
date: 2024-09-25 09:00
tags:
  - Microsoft Entra ID
  - Graph
  - 条件付きアクセス
  - デバイスのフィルター
toc:
  enabled: true
  min_depth: 1
  max_depth: 3
  list_number: false
---

# デバイス オブジェクト属性の確認方法と各確認方法で表示される内容の比較について

## 1. はじめに

こんにちは、Azure & Identity サポート チームの 西口 です。

今回は Microsoft Entra ID (ME-ID) のデバイス オブジェクトの属性について解説します。

ME-ID に登録できるデバイスの概要については、以下のブログを参照ください。

[Azure AD 登録 と Azure AD 参加 の違い](/azure-active-directory/azure-ad-join-vs-azure-ad-device-registration.md)
        
ある ME-ID のデバイス オブジェクトの属性情報を確認する、と一口に言っても以下のような複数の見方があります。

- Microsoft Entra 管理センターのポータルから参照する
- Graph Explorer で参照する
- Microsoft Graph PowerShell でオブジェクト情報を出力する
        
上記のように、1 つのデバイス オブジェクトを [複数の見方] で把握することが可能ですが、例えば [Microsoft Entra 管理センターから、あるデバイス オブジェクトの情報を参照した時] と [Graph Explorer で同じデバイス オブジェクトの情報を取得した時] で、微妙に表示されている属性名が異なることや表示されている/されていない属性の差があることで、それぞれの見方で得た情報の対応付けで困ったことはありませんか？
        
上記のようなお悩みを抱えている方に向けて、本ブログはデバイス オブジェクトの代表的な確認方法と、それぞれの方法で参照した属性の対応付けについて紹介します。

これらの情報を活用し、たとえば、条件付きアクセスのデバイスのフィルターの作成などのシナリオでご活用ください。 

## 2. デバイス オブジェクトとは

ME-ID というディレクトリ上に登録された、種類がデバイスであるオブジェクト レコードのことを意味します。
以下の公開情報の Microsoft Graph API のデバイス リソース型の説明にも含まれていますが、デバイス オブジェクトには複数のプロパティ情報が含まれています。

[デバイス リソース型 - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/api/resources/device?view=graph-rest-1.0)

## 3. デバイス オブジェクトの確認方法

それでは、以下のデバイス オブジェクトの代表的な 3 つの確認方法をご紹介します。
        
a. Microsoft Entra 管理センターでの確認方法
b. Graph Explorer での確認方法
c. Microsoft Graph PowerShell での確認方法

### a. Microsoft Entra 管理センターでの確認方法

Microsoft Entra 管理センターのポータルからデバイス オブジェクトの情報を参照する手順は以下の通りです。
        
i. ブラウザーから [Microsoft Entra 管理センター](https://entra.microsoft.com/) にアクセスしてサインインします。

ii. 画面左のメニューより [ID] > [デバイス] > [すべてのデバイス] の順に移動します。

iii. 確認したいデバイス オブジェクトの名前をクリックします。
         
上記の操作をすると以下のようにデバイス オブジェクトの情報が表示されます。
以下の表示結果からは、該当デバイス オブジェクトの複数の属性情報 (名前やデバイス ID など) を把握することができますが、実はこれが該当デバイスの属性情報のすべてではありません。

なお、Microsoft Entra 管理センターからでは確認できない属性は、以降にご案内する b. Graph Explorer や c. Microsoft Graph PowerShell の方法から確認できます。

![](device-details-in-entra-admin-center.png)

ME-ID のデバイス オブジェクトの属性の一覧と、上記の [Microsoft Entra 管理センターで確認できるデバイスの属性] との対応付けは、4 章の [デバイス オブジェクト属性の各確認方法で表示される内容の比較表] に記載の表 1 をご確認ください。

### b. Graph Explorer での確認方法

Graph Explorer からデバイス オブジェクトの情報を参照する手順は以下の通りです。
        
i. ブラウザーから [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) にアクセスしてサインインします。
            
ii. 左のブレードの [ID とアクセス] > Azure AD デバイスの一覧を選択します。
            
iii. Modify permissions から Device.Read.All を同意します。
![](modify-permission.png)   

iv. クエリ として、`https://graph.microsoft.com/v1.0/devices/{確認したいデバイスのオブジェクト ID` を指定し、Run query をクリックします。 
![](run-query.png)   
            
上記の操作をすると以下のようにデバイス オブジェクトの情報が表示されます。
以下の表示結果からは、Microsoft Entra 管理センターで確認できるデバイス オブジェクトの属性の数より多くの属性を確認できました。

▼ご参考: 弊社環境での Graph Explorer でのデバイス オブジェクトの情報取得例
クエリ : `https://graph.microsoft.com/v1.0/devices/03305133-d59c-4f4e-b6cb-2ad2c5d1a6f1`

出力結果
![](device-details-in-graph-explorer.png)

ME-ID のデバイス オブジェクトの属性の一覧と、上記の [Graph Explorer で確認できるデバイスの属性] との対応付けは、4 章の [デバイス オブジェクト属性の各確認方法で表示される内容の比較表] に記載の表 1 をご確認ください。

### c. Microsoft Graph PowerShell での確認方法

a. b. はブラウザーを用いて情報が確認できましたが、Microsoft Graph PowerShell でデバイス オブジェクトの情報を取得するには、最初に作業する端末上に PowerShell モジュールのインストールが必要です。
インストール方法についてはこちらの参考情報があります。

[MSOnline / AzureAD PowerShell から Graph PowerShell SDK への移行について 3_インストール・接続編](/azure-active-directory/azuread-module-retirement3.md)

Microsoft Graph PowerShell からデバイス オブジェクトの情報を参照する手順は以下の通りです。
        
i. Windows のスタートボタンから Windows PowerShell を起動します。
  
ii. 以下のコマンドを入力し、Microsoft Graph で ME-ID テナントにサインインします。
Connect-MgGraph -Scopes "Device.Read.All"
認証画面が表示されるので、サインインしたい ME-ID テナントのユーザーとしてサインインします。

iii. Get-MgDevice -DeviceId コマンドで確認したいデバイスのオブジェクト ID を入力します。
Get-MgDevice -DeviceId "オブジェクト ID" | fl
※ 少々紛らわしくて恐縮ですが、-DeviceId パラメーターで指定するのは [(デバイス ID ではなく) オブジェクト ID] です。

補足情報ですが、今回使った Get-MgDevice コマンドの詳細につきましては、英語の公開情報ですが、以下に記載があります。

[Get-MgDevice (Microsoft.Graph.Identity.DirectoryManagement) | Microsoft Learn](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.graph.identity.directorymanagement/get-mgdevice?view=graph-powershell-1.0)

上記の操作をすると以下のようにデバイス オブジェクトの情報が表示されます。
以下の表示結果からは、Microsoft Entra 管理センターより多くの該当デバイス オブジェクトの属性情報を把握することができます。
また、OnPremisesSecurityIdentifier については項目に表示されますが、値は入りません。

▼ご参考: 弊社環境での Microsoft Graph PowerShell でのデバイス オブジェクトの情報取得例

![](device-details-in-graph-powershell.png)

ME-ID のデバイス オブジェクトの属性の一覧と、上記の [Microsoft Graph PowerShell で確認できるデバイスの属性] との対応付けは、4 章の [デバイス オブジェクト属性の各確認方法で表示される内容の比較表] に記載の表 1 をご確認ください。

## 4. デバイス オブジェクト属性の各確認方法で表示される内容の比較表

上記の 3 つの確認方法で得られた情報を、以下の表 1 にまとめました。
N/A の記載は [その項目の表示が存在していない] ことを意味します。
Microsoft Entra 管理センターで表示されている属性名と、実際のオブジェクトの属性名では微妙に表記が異なっていることも確認できます。
これは、ポータル上でオブジェクトの情報を確認する際に、見えている情報の意味が分かりやすいよう表現を変えている場合があるためです。
たとえば、Microsoft Entra 管理センターで見ることができる "準拠している" は、isCompliant に対応していることが以下の表 1 からわかります。
また、Microsoft Entra 管理センターから得ることができない情報については、Graph Explorer / Microsoft Graph PowerShell で確認でき、Graph Explorer / Microsoft Graph PowerShell いずれも同じ情報を得られることがわかりました。
以下の表 1 を元に、お客様のご用途に合うデバイス オブジェクトの確認方法をご利用ください。

![表1. デバイス属性と、Microsoft Entra 管理センター、Graph Explorer、Microsoft Graph PowerShell で確認できる属性の対応表](comparison-table-of-device-objects.png)

## 5. 条件付きアクセスのデバイスのフィルターでデバイス属性を利用する際の比較表

これまで、デバイス オブジェクトの属性情報を確認する複数の方法についてご紹介しました。
この複数の視点での情報の見方がどのような場合に役立つのか、という例として、条件付きアクセス ポリシーでデバイス フィルター条件でのアクセス制御を行う際の設定シナリオを元に例をご紹介します。
条件付きアクセスのデバイスのフィルターに関しては、以下の公開情報にてご案内しております。
        
[条件付きアクセス ポリシーの条件としてのデバイスのフィルター - Microsoft Entra ID | Microsoft Learn](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/concept-condition-filters-for-devices#supported-operators-and-device-properties-for-filters)
        
デバイスのフィルターで利用可能なデバイス属性は複数ありますが、Microsoft Entra 管理センターでデバイス オブジェクトを参照した際は、これまでのご案内の通り一部の属性情報のみが確認可能です。
そこで、Microsoft Graph PowerShell や Graph Explorer も併用いただくことで利用したい属性の情報をご確認いただくことが可能です。
        
以下に [デバイスのフィルターで利用可能な属性] という視点で、抜き出した状態で上記 a. b. c. それぞれの確認方法で取得可能なデバイス オブジェクトの属性情報の対応をおまとめしました。

![表2. デバイスのフィルターで利用可能な属性と各確認方法で確認できる属性の対応表](table-of-device-objects-available-for-filtering-devices.png)

※ mdmAppId は [該当の ME-ID デバイスが MDM 管理されている] 場合、MDM 管理アプリケーションのアプリケーション ID 表示されますので、以下の表 3 に対応表をまとめました。

![表3. MDM と mdmAppId の対応表](table-of-mdm-and-mdmappid.png)

## 6. おわりに

本ブログでは、デバイス オブジェクトの属性の代表的な確認方法と、対応付けについてをまとめ、デバイス情報の活用例をご紹介しました。
これらの情報を条件付きアクセスのデバイスのフィルターの作成などのシナリオでご活用ください。
2024 年 9 月現在の情報を元に本記事を作成しております。
