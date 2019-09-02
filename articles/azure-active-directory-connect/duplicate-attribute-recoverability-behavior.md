---
title: 'Azure AD Connect: ID 同期と重複属性の回復性の動作について'
date: 2017-11-08
tags:
  - AAD Connect
  - Azure AD
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/11/08/azure-ad-connect-duplicate-attribute/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Azure AD Connect: ID 同期と重複属性の回復性の動作について

こんにちは、Azure & Identity サポート チームの後藤です。  

2017 年 3 月に多くのテナントで有効化された ID 同期と重複属性の回復性の動作についてご紹介します。  
なお、2017 年 10 月 30 日以降は例外なくすべてのテナントでこの機能は有効になっています。

以下のような流れでご紹介します。

<目次>

1. 以前の動作の概要
2. ID 同期と重複属性の回復性の動作
3. 重複状態からの解消について
4. ID 同期と重複属性の回復性が動作しないケース

## 1. 以前の動作の概要

以前は、ディレクトリ同期の際に UPN または ProxyAddresses の属性が Azure AD 内で重複するようなユーザー オブジェクトを Azure AD に同期を試みた場合、エラーが発生し、ユーザー オブジェクトを Azure AD に作成することができませんでした。

一例 :
Azure AD に、UPN : user01@contoso.com (オリジナル user01) のユーザーが存在します。  
この user01@contoso.com ユーザーは、過去にディレクトリ同期によって登録されたユーザーですが、現在は一度ディレクトリ同期運用をやめており、テナントのディレクトリ同期も無効化しています。  
この状態で、オンプレミス AD ドメインに UPN : user01@contoso.com (新 user01) のユーザーを作成します。  
改めてディレクトリ同期を行う運用になったので、Azure AD Connect で同じテナントに同期を行うと、オリジナル user01 と新 user01 の UPN 重複エラーが発生し、Azure AD へのエクスポートに失敗します。

同じ UPN を持つユーザーであれば UPN ソフトマッチにより [重複ではなく結合] するのでは？と思われる方もいらっしゃるかもしれませんが、オリジナル user01 は [過去にディレクトリ同期で登録されたユーザー] であるため、ImmutableID がすでにセットされています。  
そのため、この例ではソフトマッチは行われず、オリジナル user01 と新 user01 が別のオブジェクトとして扱われ、UPN 値の重複が問題となります。  
なお、ProxyAddresses 属性のメール アドレス (プライマリ , セカンダリ共に) も UPN と同様に重複が問題となります。

このエラーを検知した場合、下記のような内容のメールで技術的通知の連絡先に通知されます。

- "Unable to update this object because the following attributes associated with this object have values that may already be associated with another object in your local directory services: [**UserPrincipalName**user01@contoso.com;]. Correct or remove the duplicate values in your local directory."
(このオブジェクトに紐づく属性値 [**UserPrincipalName** user01@contoso.com;] は、ローカル ディレクトリ サービスの他のオブジェクトに既に紐付けられているため、このオブジェクトを更新できません。ローカル ディレクトリの重複している属性値を変更または削除してください。)
<!-- textlint-disable -->
- Unable to update this object because the following attributes associated with this object have values that may already be associated with another object in your local directory services: [**ProxyAddresses**SMTP:user01@contoso.com;]. Correct or remove the duplicate values in your local directory."
(このオブジェクトに紐づく属性値 [**ProxyAddresses** SMTP:user01@contoso.com;] は、ローカル ディレクトリ サービスの他のオブジェクトに既に紐付けられているため、このオブジェクトを更新できません。ローカル ディレクトリの重複している属性値を変更または削除してください。)
<!-- textlint-eable -->

以降、重複した属性値の状態を解消する対処を実施するまでは、定期的な同期処理が行われる毎に失敗し、このメールが通知されます。  
重複属性の回復性が有効になるまでは！

## 2. ID 同期と重複属性の回復性の動作

前述の例のように、ディレクトリ同期の際に UPN または ProxyAddresses の属性が Azure AD にて重複するようなユーザー オブジェクトを Azure AD に同期しようとしても、重複属性の回復性が有効なテナントでは、Export 処理時のエラーが出力されることなく、ユーザー オブジェクトが Azure AD に作成されます。  
もちろん、値が重複した 2 つのオブジェクトを登録することはできないため、後から同期により生成されるユーザーのプレフィックス部分には 4 桁の数字がつき、サフィックス部分にはイニシャル ドメイン名が付与されます。

一例 :

- Azure AD に、UPN : user01@contoso.com (オリジナル user01) のユーザーが存在します。
- この user01@contoso.com ユーザーは、過去にディレクトリ同期によって登録されたユーザーですが、現在は一度ディレクトリ同期運用をやめており、テナントのディレクトリ同期も無効化しています。
- この状態で、オンプレミス AD ドメインに UPN : user01@contoso.com (新 user01) のユーザーを作成します。
- 改めてディレクトリ同期を行う運用になったので、Azure AD Connect で同じテナントに同期を行うと、オリジナル user01 と新 user01 の UPN 重複状態が検知されます。
- ここで重複属性の回復性の機能により、新 user01 が Azure AD に同期されると UPN : user012457@contoso.onmicrosoft.com のユーザーが同期により作成されます。
(2457 の 4 桁の数字はランダムです)

この重複属性の回復性に該当する同期を検知した場合、下記のような内容のメールで技術的通知の連絡先に通知されます。

- このオブジェクトは Azure Active Directory で更新されましたが、次の属性が他のオブジェクト [UserPrincipalName user01@contoso.com;] と関連付けられているため、一部のプロパティが変更されています。この問題を解決する手順に関しては、https://aka.ms/duplicateattributeresiliency をご覧ください。

- このオブジェクトは Azure Active Directory で更新されましたが、次の属性が他のオブジェクト [ProxyAddresses SMTP:user01@contoso.com;] と関連付けられているため、一部のプロパティが変更されています。この問題を解決する手順に関しては、https://aka.ms/duplicateattributeresiliency をご覧ください。

このメールは検知された初回のみ送信され、以降繰り返される同期のタイミングでは送信されません。  
そのため、後から重複対象のオブジェクトをメールの履歴のみで探すのが困難になることが予想されますが、ご安心ください。  
PowerShell コマンドで重複する属性の競合のエラー状況を DirSyncProvisioningErrors から確認できます。

例 :

```powershell
Get-MsolDirSyncProvisioningError -ErrorCategory PropertyConflict

ExtensionData      : System.Runtime.Serialization.ExtensionDataObject
DisplayName        : user01
ImmutableId        : EVxRjF4MDACb9TViLrGGvA==
LastDirSyncTime    : 2017/10/20 5:02:43
ObjectId           : 87d11ec2-e8ce-4a99-801a-6352d5678a03
ObjectType         : User
ProvisioningErrors : {ProxyAddresses, UserPrincipalName}
ProxyAddresses     : {smtp:user01@contoso.onmicrosoft.com, smtp:user012457@contoso.onmicrosoft.com}
UserPrincipalName  : user012457@contoso.onmicrosoft.com
```

以上は UserPrincipalName が重複する場合の動作ですが ProxyAddresses の値が重複する場合には重複した情報は削除されます。例えば UserPrincpalName と ProxyAddresses の両方が重複している場合には、ディレクトリ同期の結果 UserPricipalName は “+<4DigitNumber>@.onmicrosoft.com”　になり、 ProxyAddresses は null となります。

## 3. 重複状態からの解消について

約一時間に一度のバック グラウンドのタイマー タスクが Azure プラットフォームで動作しており重複が解消されているか確認します。重複属性を持つユーザーの削除、重複属性の値の修正により、重複している属性の値の重複が解消されると、DirSyncProvisioningErrors を消す動作と UPN 及び ProxyAddresses に格納されている “+<*4DigitNumber>@.onmicrosoft.com*”　の値をオンプレミス AD から元々エクスポートしようとしていた UPN 及び ProxyAddresses に格納されている値に自動的に修正する動作が生じます。  
経験則にはなりますが、重複が解消されてから DirSyncProvisioningErrors を消す動作と UPN 及び ProxyAddresses の自動解決には早い場合には 1.5 時間、時間を要する場合では 24 時間ほどかかります。

例 :

1. Azure AD 上のオリジナル user01 である user01@contoso.com というユーザーが削除され、新 user01 との UPN の重複が解消されます。
1. Azure 側で約 1 時間に 1 回行われているバックグラウンドのタイマー タスクで重複が解消されことを検知します。
1. 新 user01 オブジェクトに対する DirSyncProvisioningErrors が消え、Azure AD に存在する UPN が user012457@contoso.onmicrosoft.comのユーザーの UPN が user01@contoso.com に自動変更されます。

## 4. ID 同期と重複属性の回復性が動作しないケース

次のようなケースでは ID 同期と重複属性の回復性は動作しません。

### シナリオ 1. オンプレミス Active Directory 上の UPN 名に含まれるドメイン名が Azure AD にはカスタムドメインとして登録されていない場合

オンプレミス AD ドメイン上でのあるユーザーの UPN の値が user01@contoso.com だとします。  
この AD ドメインのディレクトリ同期先である Azure AD のイニシャル ドメインがonmicrosoft.com であり、カスタム ドメインとして contoso.com を登録していない環境であるとします。

この環境でディレクトリ同期を実施した結果 Azure AD に作成されるユーザーの UPN の値は、呼応するカスタム ドメインが存在しないので user01@contoso.onmicrosoft.com というようになります。  
また、この Azure AD に同期作成されたユーザーに対して属性が重複するユーザーを同期した場合 (前述の 1. 2. のような条件を満たしたケース) が生じた場合には、後から同期されたユーザーはこれまでのご案内と同様に user012547@contoso.onmicrosoft.com というようになります。
しかし、この状況ではオリジナルの user01 が削除されるなど、重複状態が解消されても、user012547@contoso.onmicrosoft.com ユーザーの自動　UPN 変更回復は実行されません。

### シナリオ 2. SipProxyAddress の値が重複する場合

ProxyAddress 属性に SIP: として指定する SipProxyAddress 値は、Azure AD ユーザーに同期されると SipProxyAddress 属性にセットされます。  
この SipProxyAddress は前述の 1. や 2. のような条件で重複するケースの場合は、重複属性の回復性は動作せず、"+<4DigitNumber>@.onmicrosoft.com" のユーザーが Azure AD に作成されることもありません。  
これは、今回の重複属性の回復性の発動対象の値が Azure AD 側のユーザーが保持する UPN と ProxyAddresses のみとなり、SipProxyAddress の重複は発動対象ではないことが原因です。以下で詳細を解説します。

SipProxyAddress とは、下記一例にあるコマンドで確認することができる属性です。

一例 :

1. Connect-AzureAD コマンドで Azure AD にサインインします。
![](./duplicate-attribute-recoverability-behavior/2-1.png)

2. Get-AzureADUser コマンドで対象ユーザーのオブジェクト ID を確認します。
![](./duplicate-attribute-recoverability-behavior/2-2-1.png)
![](./duplicate-attribute-recoverability-behavior/2-2-2.png)

3. Get-AzureADUser コマンドで対象ユーザーについてプロパティを確認します。
![](./duplicate-attribute-recoverability-behavior/2-3.png)
![](./duplicate-attribute-recoverability-behavior/2-3-2.png)

オンプレミス AD のユーザーの ProxyAddresses に “SIP:“ より始まる Lync 及び Skype で利用するアドレスが値として格納されている場合に、ディレクトリ同期をすると Azure AD に生成されるユーザーの SipProxyAddress にこの値が格納されます。

具体的な例は次のとおりです。

- Azure AD に、SipProxyAddress 属性に user01@contoso.com の値を持つユーザーが存在します (オリジナル user01)。
- このオリジナル user01 ユーザーは、過去にディレクトリ同期によって登録されたユーザーですが、現在は一度ディレクトリ同期運用をやめており、テナントのディレクトリ同期も無効化しています。
- この状態で、オンプレミス AD ドメインに ProxyAddresses 属性内に [SIP: user01@contoso.com] の値を持つユーザーを作成します (新 user01)。
- 改めてディレクトリ同期を行う運用になったので、Azure AD Connect で同じテナントに同期を行うと、オリジナル user01 と新 user01 の SipProxyAddress 重複状態が検知されますが、重複属性の回復性機能の対象外であるため、単純に重複エラーとなり、Azure AD へのエクスポートが行われない結果となります。

このエラーを検知した場合、下記のような内容のメールで技術的通知の連絡先に通知されます。  
また、本メールは同期の処理が繰り返し行われ、都度エクスポートが失敗する度に通知されます。

- このオブジェクトを更新できません。このオブジェクトに関連付けられている次の属性の値が、ローカル ディレクトリ サービスの別のオブジェクトに既に関連付けられていることが原因として考えられます: [SipProxyAddress user01@contoso.com ディレクトリで重複している値を修正または削除してください。属性値が重複しているオブジェクトの検出方法については、http://support.microsoft.com/kb/2647098 を参照してください。

### シナリオ 3. 一度同期対象から外したユーザーを再度同期対象に戻した場合

一度同期対象から外した後で、別のユーザーに同じ ProxyAddresses を設定し、同期します。同期対象から外したユーザーは、 Azure AD 上でも削除されますが、完全に削除されるのではなく 30 日間はごみ箱に保存されます。このゴミ箱にユーザー情報が残っていても、この場合には重複は検出されません。その上で、同期対象から外したユーザーを再度同期対象にします。このとき、別のユーザーではすでに ProxyAddresses に同じものが設定されているので重複が生じますが、重複属性の回復性機能が動作すれば、ユーザー自体の同期はされますが、 ProxyAddresses は空になると予測されますが、そうなりません。  
わかりにくいと思いますので、具体例を紹介します。

1. User01@contoso.com というユーザーは ProxyAddresses として SMTP:user01@contoso.com をもち、その情報が Azure AD に同期されています。
2. user01@contoso.com を同期対象から解除します。この後で同期処理が行われることにより user01@contoso.com は Azure AD 上はごみ箱に入ります。
3. user02@contoso.com " をオンプレミス AD に作成し、ProxyAddresses として user01@contoso.com を設定します。ディレクトリ同期をし、Azure AD にユーザーが生成されます。また、 ProxyAddresses user01@contoso.com を持つ削除されておらず有効なアカウントは存在しないため、重複検出機能は動作せずにそのまま作成されます。
4. user01@contoso.com を同期対象に戻します。その後、ディレクトリ同期をしますと、Azure AD のごみ箱にあります user01@contoso.com を再度有効なユーザーアカウントに変更する処理が行われます。しかし、このとき ProxyAddresses が重複しているためエラーが発生しますが、このとき重複検出の回復性の機能は動作せずにユーザーは有効にされず、 Azure AD Connect としても同期のエラーを検出します。

このシナリオに合致するケースでは、下記のようなエラーが記録されます。
![](./duplicate-attribute-recoverability-behavior/31.png)

このエラーを検知した場合も、下記のような内容のメールで技術的通知の連絡先に通知されます。

Unable to update this object because the following attributes associated with this object have values that may already be associated with another object in your local directory services: [**ProxyAddresses**SMTP:user01@contoso.com;]. Correct or remove the duplicate values in your local directory."  
(このオブジェクトに紐づく属性値 [**ProxyAddresses** SMTP:user01@contoso.com;] は、ローカル ディレクトリ サービスの他のオブジェクトに既に紐付けられているため、このオブジェクトを更新できません。ローカル ディレクトリの重複している属性値を変更または削除してください。)

以降、重複した ProxyAddresses の値の状態を解消する対処を実施するまでは、定期的な同期処理が行われる毎に失敗し、このメールが通知されます。

「コミュニティにおけるマイクロソフト社員による発言やコメントは、マイクロソフトの正式な見解またはコメントではありません。」
