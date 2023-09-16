
---
title:  重要: MS Graph Beta API バージョンにおける deviceRegistrationPolicy リソース タイプの変更
date: 2023-09-18 12:00
tags:
  - Azure AD
  - US Identity Blog
---

# 重要: MS Graph Beta API バージョンにおける deviceRegistrationPolicy リソース タイプの変更

こんにちは、Azure Identity サポート チームの 竜 です。
本記事は、2023 年 08 月 31 日に米国の Azure Active Directory Identity Blog で公開された [Important: Update to deviceRegistrationPolicy Resource Type for MS Graph Beta API Version](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/important-update-to-deviceregistrationpolicy-resource-type-for/ba-p/3912000) を意訳したものになります。

----
現在プレビューの beta API バージョンで利用可能な MS Graph Device Registration Policy リソース タイプに関する重要なアップデートをお知らせします。本リソース タイプのプロパティに、いくつかの変更が加えられます。これらの変更は 2023 年 9 月 25 日の週に行われる予定です。機能が継続的に動作するため、ならびに影響を最小限に抑えるために、すべてのお客様がこれらの変更を確認し、本リソース タイプに依存するアプリケーションを優先的に修正することが非常に重要となります。

### なぜ、いつこの変更が行われるのか？

v1.0 API バージョンにおいて devcieRegistrationPolicy リソース タイプを一般提供 (GA) する前に、MS Graph REST API のベスト プラクティスとデザイン パターンに合わせるために本変更を行います。本変更は、2023 年 9 月 25 日の週に、beta エンドポイントに対して行われ、その後、今年の後半に v1.0 エンド ポイントにおいて一般的に利用可能になる予定です。


### どのような対応をする必要があるか？

1. Microsoft Entra ID ポータルを使用してデバイス登録ポリシー設定を構成している場合は、対応は必要ありません。
2. deviceRegistrationPolicy リソース タイプを設定するために独自の MS Graph API リクエストを作成している場合は、リソース タイプの設定において新しいプロパティと廃止予定のプロパティの両方を含めるよう、アプリケーションを早急に更新する必要があります。
3. 2023 年 9 月 25 日の週に新しいプロパティを持つ deviceRegistrationPolicy リソース タイプが展開された後に、GET 呼び出しを使用し、新しいプロパティを確認すると共に、お客様のアプリによりそのプロパティに適切な値が構成されていることを確認ください。
4. 変更が展開された (2023 年 9 月 25 日の週) 後に、お客様のご都合にあわせて、アプリケーションから廃止されたプロパティを削除ください。


### MS Graph deviceRegistrationPolicy リソース タイプに対して具体的にどのような変更が生じるのか？

-  "multiFactorAuthConfiguration" プロパティが数値 (integer) から文字列 (string) に変更されます。以前の数値 "0" は "notRequired (多要素認証を必要としない)" を示し、"1" は "required (多要素認証を必要とする)" を示していました。変更後の文字列では、"notRequired" と "required "の値をサポートします。
-  "azureADJoin" と "azureADRegistration" における "appliesTo"、"allowedUsers"、"allowedGroups" プロパティが廃止されます。これらのプロパティに代わり、"allowedToJoin" プロパティと "allowedToRegister" プロパティが使用されます。"allowedToJoin" プロパティと "allowedToRegister" プロパティは、データ タイプが microsoft.graph.deviceRegistrationMembership となり、"@odata.type” に以下の値のいずれかを含みます:  
    + "#microsoft.graph.allDeviceRegistrationMembership": すべてのユーザーにデバイスの参加または登録が許可されていることを示します。
	+ "#Microsoft.graph.noDeviceRegistrationMembership": すべてのユーザーでデバイスに参加または登録が拒否されることを示します。
	+  "#Microsoft.graph.enumeratedDeviceRegistrationMembership": 選択されたグループ、またはユーザーとグループに、デバイスへの参加または登録が許可されていることを示します。この値に対してのみ、"allowedToJoin" または "allowedToRegister" プロパティに、"users "と "groups" の 2 つの追加プロパティが含まれます。"users" と "groups" の値は、それぞれデバイスへの参加または登録が許可されているユーザーとグループ ID の配列となります。
- この変更は 2023 年 9 月 25 日の週に、MS Graph Beta エンドポイントに導入され、その時点で本リソース タイプにおける廃止されたプロパティは動作しなくなることが想定されます。
- お客様は、できるだけ早めにアプリケーションを更新し、本リソース タイプの新しいプロパティを使用するよう準備を整える必要があります。


### 2023 年 9 月 25 日の週に deviceRegistrationPolicy リソース タイプの新しいプロパティを使用しないと、アプリケーションはどうなるのか？

deviceRegistrationPolicy リソース タイプの構成時に新しいプロパティを使用することが期待されるため、古い形式を利用したアプリケーションにはエラー (Bad Request) が返されることが想定されます。

### 本変更が行われる (2023 年 9 月 25 日の週) 前に、アプリケーションをこの変更に備えるためにどのような対応をすればよいか？

なるべく早くアプリケーションを修正し、deviceRegistrationPolicy リソース タイプを新しいプロパティと廃止予定のプロパティの両方を含めて構成することを推奨いたします。現在の beta エンドポイントで利用可能なリソース タイプは、廃止予定のプロパティと新しいプロパティの両方をサポートしております。2023 年 9 月 25 日の週には、廃止予定のプロパティの使用を停止する予定です。以下は、新しいプロパティと廃止予定のプロパティの両方を含めた設定を行うための PUT を使用する方法の一例となります。

```
{ 
 "@odata.context": https://graph.microsoft.com/beta/$metadata#policies/deviceRegistrationPolicy/$entity, 
 "multiFactorAuthConfiguration": "notRequired", 
 "id": "deviceRegistrationPolicy", 
 "displayName": "Device Registration Policy", 
 "description": "Tenant-wide policy that manages initial provisioning controls using quota restrictions, additional authentication and authorization checks", 
 "userDeviceQuota": 20, 
 "azureADRegistration": { 
 "isAdminConfigurable": false, 
 "allowedToRegister": { 
 "@odata.type": "#microsoft.graph.allDeviceRegistrationMembership" 
}, 
 "appliesTo": "1", 
 "allowedUsers": [], 
 "allowedGroups": [] 
}, 
 "azureADJoin": { 
 "isAdminConfigurable": true, 
 "allowedToJoin": { 
 "@odata.type": "#microsoft.graph.enumeratedDeviceRegistrationMembership", 
 "users": [ 
 "a6aebac8-1faf-4ebd-9a68-727fa53376f4" 
], 
 "groups": [] 
}, 
 "appliesTo": "2", 
 "allowedUsers": [ 
"a6aebac8-1faf-4ebd-9a68-727fa53376f4" 
    ], 
 "allowedGroups": [], 
}, 
 "localAdminPassword": { 
 "isEnabled": true 
} 
} 
```

#### 注意事項
- "multiFactorAuthConfiguration" プロパティは、常に文字列 ("required" または "notRequired" )として送信する必要があります。
- "users" と "groups" プロパティに含まれるリストは、"microsoft.graph.deviceRegistrationMembership" データ タイプを "enumerated" に設定した場合のみ必要となります。

### いつアプリケーションから古い (廃止された) プロパティの設定を削除すればよいのか？

上記の推奨事項に沿って、新しいプロパティと廃止予定のプロパティの両方を使って deviceRegistrationPolicy リソース タイプを構成いただければ、今後任意のタイミングで廃止予定のプロパティを 削除いただいて結構です。 deviceRegistrationPolicy リソース タイプ が 2023 年 9 月 25 日の週に新しいプロパティとともに展開されると、廃止されたプロパティは無視されます。

### アプリケーションから、一部の新しいプロパティだけを設定することはできるか？

現時点では、一部の新しいプロパティのみを設定することはできません。deviceRegistrationPolicy リソース タイプにおけるすべてのプロパティを設定する必要があります。

### GET 呼び出しでは何が返されるのか？

deviceRegistrationPolicy リソース タイプは、2023 年 9 月 25 日の週までは廃止予定のプロパティを返します。変更が行われた後は、新しいプロパティを返します。

Best regards,  
Sandeep Deo (@MsftSandeep)  
Principal Product Manager  
Microsoft Identity Division  
