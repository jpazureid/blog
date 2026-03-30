---
title: Microsoft Entra Connect のハードマッチの動作変更について
date: 2026-03-30 12:00:00
tags:
  - Microsoft Entra Connect
---

# Microsoft Entra Connect のハードマッチの動作変更について

こんにちは、 Azure Identity サポート チームの新倉です。

公開情報「Microsoft Entra のリリースとお知らせ」にて、セキュリティ強化のため 2026 年 7 月からMicrosoft Entra Connect (以下 MEC) のハードマッチの動作が変更されることが通知されました。

公開情報　
[Microsoft Entra のリリースとお知らせ - 一般提供 - ユーザー アカウントの引き継ぎを防ぐための Microsoft Entra Connect セキュリティ強化](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---microsoft-entra-connect-security-hardening-to-prevent-user-account-takeover)

本ブログ記事では、動作の変更点と、変更後のハードマッチの手順をご紹介し、お問い合わせの多いご質問 (FAQ) について Q&A 形式で回答いたします。
今後、ハードマッチについてお問い合わせの多いご質問は適宜内容を追記していき、また公開情報では記載されていない点についても補足してまいります。


## 1. Microsoft Entra Connect のハードマッチの変更点について

### 1-1. 2026 年 7 月 1 日以降に変更される点

MEC のハードマッチは、オンプレミス AD から新しいオブジェクトを同期する際、 Microsoft Entra ID 上のアカウントと同期しようとしたオンプレミス AD のアカウントが一致するかを判断する属性として、 sourceAnchor を基に評価する方法を指します。

今回、2026 年  7 月 1 日以降に予定されている変更では、セキュリティ強化のため、オンプレミス AD から新しいオブジェクトを同期する際に sourceAnchor の属性だけではなく OnPremisesObjectIdentifier 属性の検証が追加され、以下のすべての条件が成り立つ場合にのみハードマッチが成功するように動作が変わります。


- a. Microsoft Entra ID アカウントの ImmutableId と、同期しようとするオンプレミス AD の sourceAnchor が一致する
- b. テナントのプロパティ BlockCloudObjectTakeoverThroughHardMatch が Falseである
- **c. 対象の Entra ID アカウントの OnPremisesObjectIdentifier 属性が空である (New)**

**これまでは a. b. の条件を満たせばハードマッチが行われていましたが、今回の動作変更によって c. の条件が追加されます。**

一度でもオンプレミス AD からユーザー同期を行うと、 OnPremisesObjectIdentifier 属性には同期元ユーザーの object ID の値が設定されます。オンプレミス AD から新しいオブジェクトを同期する際に今回の動作変更が適用されますので、OnPremisesObjectIdentifier 属性が空である場合にハードマッチが行われます。


### 1-2. ハードマッチの動作が変更された後のハードマッチ手順について

動作変更後もハードマッチを実施するには、 OnPremisesObjectIdentifier 属性が空である必要があるため、管理者が事前に Microsoft Graph API を用いて同期済みユーザーの OnPremisesObjectIdentifier をクリアする必要があります。
ハードマッチを利用する際の シナリオをもとに、以下でご説明いたします。

補足: 本手順では sourceAnchor は MEC で mS-DS-ConsistencyGuid 属性を指定した環境での手順をご案内しております。 mS-DS-ConsistencyGuid 以外の属性を sourceAnchor としている場合は、 sourceAnchor に指定した属性に置き換えてお読みください。

#### シナリオ: オンプレミス AD の非同期ユーザーと、既存の Entra ID ユーザーを紐づける場合

オンプレミス AD フォレストの移行や出向などの理由により、既存の Entra ID ユーザーに紐づく同期元のオンプレミスユーザーを変更する場合がございます。
このシナリオでは、Entra ID にある既存のユーザー A' について、同期元となっているオンプレミスユーザーをドメイン X にいるユーザー A からドメイン Y にいるユーザー B に交換します。

変更前:
ドメイン X On-prem user A -> Entra ID user A'
ドメイン Y On-prem user B

変更後:
ドメイン X On-prem user A
ドメイン Y On-prem user B -> Entra ID user A'

ハードマッチ手順：

1. 意図しない同期を防ぐため  Entra Connect の [定期同期を無効](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/how-to-connect-sync-feature-scheduler#disable-the-scheduler) にします。

実行する PowerShell :
```powershell
Set-ADSyncScheduler -SyncCycleEnabled $false
```

2. Entra ID ユーザー A' について、ハードマッチを実施できるよう Microsoft Graph API を使って onPremisesObjectIdentifier を null に設定します

> [!NOTE]
> onPremisesObjectIdentifier を null に設定する Graph API は Beta バージョンの API でのリリースが先行されます。
> v1.0 の API でのリリース時期は現時点で未定です。
> ユーザー A' のように同期済みのユーザーでも、SOA を変更することなく onPremisesObjectIdentifier を null にすることができます

必要なアクセス許可:
User-OnPremisesSyncBehavior.ReadWrite.All と User.ReadWrite.All

実行する Graph API :
```http
PATCH https://graph.microsoft.com/beta/users/<UserId>
{ onPremisesObjectIdentifier: null }
```

Microsoft Graph PowerShell の場合の例 :
```powershell
Connect-MgGraph  -Scopes 'User-OnPremisesSyncBehavior.ReadWrite.All','User.ReadWrite.All' -TenantId  contoso.onmicrosoft.com
Invoke-MgGraphRequest -Method GET -Uri "https://graph.microsoft.com/beta/users/12345678-2468-adcd-dcba-1234567890ab"
Invoke-MgGraphRequest -Method PATCH -Uri "https://graph.microsoft.com/beta/users/12345678-2468-abcd-dcba-1234567890ab" -Body '{"onPremisesObjectIdentifier": null }'
```

3. オンプレミスユーザー B を同期対象外の OU に配置し、mS-DS-ConsistencyGuid 属性を、オンプレミスユーザー A の mS-DS-ConsistencyGuid 属性と同じ値になるよう設定します

なお、同期対象外の OU は、MEC の構成ウィザードの [ドメインと OU のフィルター処理](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/how-to-connect-install-custom#domain-and-ou-filtering) であらかじめ用意しておきます。

4. オンプレミスユーザー A を同期対象外 OU に移動します。

5. [差分同期](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/how-to-connect-sync-feature-scheduler#delta-sync-cycle) を 2 回実行し、 MEC 並びに Entra ID ユーザー A' を Entra ID 上から削除します。 Entra ID ユーザー A' は「削除済みユーザー」となります

実行する PowerShell :
```powershell
Start-ADSyncSyncCycle delta
```

6. オンプレミスユーザー B を同期対象の OU に移動します

7. 差分同期を実行し、Entra ID ユーザー A' にオンプレミスユーザー B の情報を同期します

実行する PowerShell :
```powershell
Start-ADSyncSyncCycle delta
```

8. ハードマッチが行われ、Entra ID ユーザー A' とオンプレミスユーザー B が紐づき、以後はオンプレミスユーザー B の変更内容が Entra ID ユーザー A' に同期されるようになります

9. Entra Connect の定期同期を有効に戻します。

実行する PowerShell :
```powershell
Set-ADSyncScheduler -SyncCycleEnabled $true
```

## 2.ハードマッチの動作の変更点についてのよくあるご質問とその回答 (FAQ)

今回のハードマッチの動作変更について、以下によくあるご質問をおまとめしております。

---
### <span style="color: blue; ">Q:</span> この変更は特定のバージョンの MEC でのみ有効になりますか？それとも古いバージョンにも適用されますか？

<span style="color: red; ">A:</span> 
今回の変更は Microsoft Entra ID のサービス側で行われる変更となり、OnPremisesObjectIdentifier 属性の検証はハードマッチ操作時にサービス側で実施されるため、MEC のバージョンには依存しません。
特に MEC のアップグレードは必要なく、2026 年  7 月 1 日以降、全てのサポートされている MEC バージョンに適用されます。

---
### <span style="color: blue; ">Q:</span> OnPremisesObjectIdentifier 属性が空であるかを検証してハードマッチする新しい動作を停止することはできますか？

<span style="color: red; ">A:</span> 
いいえ、ハードマッチを検証する新しい動作を停止することはできません。

---
### <span style="color: blue; ">Q:</span> この変更はいつから各テナントに適用されますか？
 
<span style="color: red; ">A:</span> 
2026 年 7 月 1 日から段階的に各テナントに適用されます。各テナントでの具体的な日程については公開されておりません。


---
### <span style="color: blue; ">Q:</span> 以下の公開情報で、ハード マッチの引き継ぎを無効にするための推奨フラグとありますが、フラグとは何ですか？
 
[一般提供 - ユーザー アカウントの引き継ぎを防ぐための Microsoft Entra Connect セキュリティ強化](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---microsoft-entra-connect-security-hardening-to-prevent-user-account-takeover)
 
<span style="color: red; ">A:</span> 
テナントのプロパティ BlockCloudObjectTakeoverThroughHardMatch を指します。
これはハードマッチを無効化するフラグで、以前から存在する設定であり、既定で ハードマッチを許可する設定 (False) となっています。
今後はセキュリティ強化のため、通常時はハードマッチをブロックする設定 (True) に変更しておくことが推奨されます。
ただし、新しいユーザーとハードマッチで同期する際は、このフラグを False にする必要があります。

---
### <span style="color: blue; ">Q:</span> BlockCloudObjectTakeoverThroughHardMatch の現在の設定を確認する方法を教えてください。
 
<span style="color: red; ">A:</span> 
以下のコマンドで確認が可能です。

```PowerShell
Connect-MgGraph -Scopes "OnPremDirectorySynchronization.Read.All"
(Get-MgBetaDirectoryOnPremiseSynchronization).Features |select BlockCloudObjectTakeoverThroughHardMatchEnabled
```

なお、BlockCloudObjectTakeoverThroughHardMatch の設定を変更する際には以下のようなコマンドで変更することが可能です。(以下の例では BlockCloudObjectTakeoverThroughHardMatch を false に設定しています)

```powershell
Connect-MgGraph -Scopes "OnPremDirectorySynchronization.ReadWrite.All"
$sync = Get-MgBetaDirectoryOnPremiseSynchronization | Select-Object -First 1
Update-MgBetaDirectoryOnPremiseSynchronization -OnPremisesDirectorySynchronizationId $sync.Id -BodyParameter @{features=@{blockCloudObjectTakeoverThroughHardMatchEnabled=$false}}
```


参考：
[Get onPremisesDirectorySynchronization - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/api/onpremisesdirectorysynchronization-get?view=graph-rest-1.0&tabs=powershell)
 
[Get-EntraDirSyncFeature (Microsoft.Entra.DirectoryManagement) | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/microsoft.entra.directorymanagement/get-entradirsyncfeature?view=entra-powershell)

---
### <span style="color: blue; ">Q:</span> OnPremisesObjectIdentifier 属性が同期されていないユーザーには今回の変更は影響ありませんか？
 
<span style="color: red; ">A:</span>
はい、OnPremisesObjectIdentifier 属性が同期されていないユーザーに影響はありません。

---
### <span style="color: blue; ">Q:</span> 以前にハードマッチで同期されていたユーザーについて、今回の動作変更の影響はありますか？
 
<span style="color: red; ">A:</span>
この変更はハードマッチの実行時に評価されるため、既にハードマッチで同期済みのユーザーには影響はありません。

---
### <span style="color: blue; ">Q:</span> 2026 年 7 月以降のロールアウト後も、BlockCloudObjectTakeoverThroughHardMatch を True に設定することは可能ですか？
 
<span style="color: red; ">A:</span>
はい、可能です。

---
### <span style="color: blue; ">Q:</span> サポートブログ [ハードマッチによる同期ユーザーの切り替え方法 (AD フォレスト移行 編) | Japan Azure Identity Support Blog](https://jpazureid.github.io/blog/azure-active-directory-connect/aadc_hardmatch/) の手順は変更されますか？
 
<span style="color: red; ">A:</span>
はい、この手順も同様に OnPremisesObjectIdentifier 属性を空にする必要がありますので、その点を追記する予定です。

---
### <span style="color: blue; ">Q:</span> 
ハードマッチによって同期元が切り替わったユーザーを確認する方法はありますか？
 
<span style="color: red; ">A:</span>
いいえ、確認することはできません。

ただしハードマッチによって同期元が変わったかを判断する一助となる方法として、 sourceAnchor を mS-DS-ConsistencyGUID としている場合に限定されますが、クラウドに同期されたユーザーの sourceAnchor と onPremisesObjectIdentifier を確認する方法が挙げられます。

mS-DS-ConsistencyGUID を sourceAnchor としている場合、 mS-DS-ConsistencyGUID が Null の状態で同期を行うとオンプレミスの Object Guid を基に sourceAnchor が生成され、生成された sourceAnchor が mS-DS-ConsistencyGUID にライトバックされます。

そのため、 mS-DS-ConsistencyGUID に意図的に別の値を入力した状態で同期しない限りは mS-DS-ConsistencyGUID と onPremisesObjectIdentifier は一致します。一致しない場合は、ハードマッチを用いた可能性があると判断可能です。
 
---
### <span style="color: blue; ">Q:</span> 
以下のような MC が通知されました。本ブログでは管理者ユーザーのハードマッチについて言及がありませんが、この MC1262584 は本ブログと関連がありますか？

MC1262584
Upcoming change – Microsoft Entra Connect security update to block hard match for users with Microsoft Entra roles
 
<span style="color: red; ">A:</span>
MC1262584 は、管理者ロールを持つクラウドユーザーを標的としたハードマッチの試みをブロックするというもので、本ブログの内容とは別の通知となります。
 
---


## 3.参考資料

[一般提供 - ユーザー アカウントの引き継ぎを防ぐための Microsoft Entra Connect セキュリティ強化](https://learn.microsoft.com/ja-jp/entra/fundamentals/whats-new#general-availability---microsoft-entra-connect-security-hardening-to-prevent-user-account-takeover)

[マッチングおよびハードマッチについて - Microsoft Entra Connect: 既存のテナントがある場合](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/how-to-connect-install-existing-tenant)

[ハードマッチによる Azure AD (Office 365) 上のユーザーをオンプレミス Active Directory ユーザーと紐付ける方法](https://jpazureid.github.io/blog/azure-active-directory-connect/upn-hard-match/)

[ハードマッチによる同期ユーザーの切り替え方法 (AD フォレスト移行 編) | Japan Azure Identity Support Blog](https://jpazureid.github.io/blog/azure-active-directory-connect/aadc_hardmatch/)

[Get onPremisesDirectorySynchronization - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/api/onpremisesdirectorysynchronization-get?view=graph-rest-1.0&tabs=powershell)
 
[Get-EntraDirSyncFeature (Microsoft.Entra.DirectoryManagement) | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/microsoft.entra.directorymanagement/get-entradirsyncfeature?view=entra-powershell)
