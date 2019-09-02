---
title: Azure AD Connect - 属性フロー（変換フロー）のためのカスタム同期ルールの作り方
date: 2018-04-13
tags:
  - AAD Connect
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/04/13/aadconnect-sync-rule-info-how-to-create-a-custom-aadsync-synchronization-rule-for-attribute-flow-transformation-flow/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Azure AD Connect ： 属性フロー（変換フロー）のためのカスタム同期ルールの作り方

こんにちは、Azure & Identity サポート チームの山口です。

本記事は、米国時間 2016 年 2 月 4 日に公開された Support-Tip: (AADCONNECT) How to create a custom sychronization rule for attribute flow (transformation flow) の抄訳です。Azure AD Connect の同期ルール作成についてのチュートリアルが簡単にまとめられており、日本のサポート チームとして皆様にぜひ内容を共有させていただきたいと思います。

Identity and Access Management Support Team Blog
Support-Tip: (AADCONNECT) How to create a custom sychronization rule for attribute flow (transformation flow)

サポートの業務のなかで、さまざまなビジネスの規則に沿うためにカスタマイズされた同期ルールを Azure AD Connect (Azure AD Sync Services (AADSync)) で作成したいというお問い合わせを多くいただきます。そこで、Azure AD Sync Services (AADSync) ツールを使ってカスタム同期ルールをつくる方法をご紹介しようと思い、ブログを書きました。この記事では、givenName と sn の値をもとに displayName 属性を書き換える方法の簡単な説明をします。

## カスタム同期ルールの作成手順

### 1. Synchronization Rules Editor を開きます。

![](./clip_image00211.jpg)

### 2. Directions で [Inbound] を選択します。

- **Inbound Synchronization Rule**: ソースコ ネクター スペースからメタバースへデータを取り出す際のルール
- **Outbound Synchronization Rule**: メタバースからターゲットのコネクター スペースにデータを取り出す際のルール
![](./clip_image0033.jpg) 

### 3. 画面右上にある [Add New Rule] をクリックします。

![](./clip_image0046.jpg) 

### 4. Inbound Synchronization Rule を編集します。

1. Description ページ
   1. Name: from AD - Update displayName attribute

      <span style="background-color: #ffff00;">注意）なるべく Synchronization Rules Editor で使われている命名規則に従うためにこのような名前にしていますが、任意の名前を与えることができます。この同期ルールの目的が理解できるような名前にしておくことが大切です。</span>

   2. Description: displayName 属性を givenName と sn の値で更新します。
   3. Connected System: <オンプレミスの Active Directory>
   4. Connected System Object: user
   5. Metaverse Object Type: person
   6. Link Type: join
   7. Precedence: 93

      <span style="background-color: #ffff00;">注意）優先度を上げるために”小さい”数字を選びました。</span>

      ![](./how-to-create-a-custom-aadsync-synchronization-rule/clip_image0052.jpg)

       ---
      同期ルール (Synchronization Rule) は、ある条件が満たされた場合に流しこまれる属性をいくつか持った構成オブジェクトです。

       このオブジェクトは、コネクター スペースのオブジェクトとメタバースのオブジェクトがどのように関係しているのかを記述するために使われていて、これは join や match として知られています。

       同期ルールには優先度があり、優先度によって同期ルール同士の関係示します。

       precedence の数値が小さい同期ルールのほうが高い優先順位が与えられ、もしルールの衝突が起きた際には、最も優先度が高い同期ルールが採用されます。

       同期ルールの一例として、"In from AD - User AccountEnabled" の同期ルールを見てみましょう。

       Synchronization Rules Editor ウィンドウから該当する同期ルールの行を選択し、[Edit] をクリックします。

       すると、この同期ルールには 4 つの構成項目があることがわかります (Description, Scoping filter, Join rules, Transformations)。
2. 今回のカスタム同期ルールでは、Scoping Filter と Join Rules は何も設定する必要はありません。

3. Transformations Page
    1. [Add Transformation] をクリックします。
    2. Flow Type: Expression
    3. Target Attribute: displayName
    4. Source: [givenName]&" "&[sn]
    5. Apply Once: <空白>
    6. Merge Type: Update
4. [Save] をクリックします。
5. 同期ルールが追加されたことを確認します。
![](./clip_image0066.jpg)

6. 最後に、追加した同期ルールを反映させるために完全同期を行います。

PowerShell コマンドレットで次のコマンドを実行して、手動で同期を行います。

```PowerShell
Start-ADSyncSyncCycle -PolicyType Initial
```

#### 追加情報

- Understanding the default configuration: https://msdn.microsoft.com/en-us/library/azure/dn800963.aspx
- AADSync – Configure Filtering – Part 1: http://blogs.technet.com/b/steady/archive/2015/01/08/aadsync-configure-filtering-part-1.aspx
- AADSync – Configure Filtering – Part 2: http://blogs.technet.com/b/steady/archive/2015/01/09/aadsync-configure-filtering-part-2.aspx
- Azure AD Sync Release Notes: http://social.technet.microsoft.com/wiki/contents/articles/24062.azure-ad-sync-release-notes.aspx
