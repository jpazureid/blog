---
title: Staged Rollout について
date: 2023-06-19
tags:
  - Azure AD
  - Staged Rollout
  - Federation
---
# Staged Rollout について

こんにちは、Azure Identity サポート チームの田中です。

今回は、先日 Public Preview として利用可能になった、フェデレーション ドメインに属しているユーザーの一部のみをマネージド 認証に変更できる Staged Rollout 機能についてご紹介します。

> 更新履歴
> 
> 2023/6/19 プレビュー記載の削除。画面ショットの更新

# Staged Rollout とは？

フェデレーションによる認証からマネージド認証 (パスワードハッシュ同期 / パススルー認証) への認証方式の変更に伴うユーザー影響を軽減するための機能を指します。  
これにより、少しずつユーザーの認証方式を変更できるというメリットがあります。

例えば、以下のようなシナリオが挙げられます。

- シナリオ
ユーザー A および ユーザー B は、共に同じ `contoso.com` というフェデレーション ドメインを持つユーザーである。

ユーザー A の UPN : `test.user0001@contoso.com`  
ユーザー B の UPN : `adfstestuser01@contoso.com`

Staged Rollout 機能が割り当てられているユーザー A : マネージド認証 (パスワード ハッシュ同期 / パススルー認証)  
Staged Rollout 機能が割り当てられていないユーザー B : フェデレーションによる認証

詳細については、後述いたします。

# Staged Rollout の構成手順

Staged Rollout の構成手順につきましては、以下の公開情報でもご紹介しております。
そのため、まずは以下の公開情報をご参照いただき、ご不明点などございましたら、弊社サポート チームにお問い合わせいただければ幸いです。

Title : 段階的なロールアウトを使用してクラウド認証に移行する

URL : <https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-staged-rollout>

以下では、上述のシナリオに基づいて、実際の構成手順を一部抜粋して、ご案内します。

\[ドメイン状態\]

- `contoso.com` : Federated

\[グループおよびグループに含まれるユーザーの構成情報\]

|                                              | グループ名<br>TEST0602 |
|----------------------------------------------|----------------------|
| ユーザー A <br>`test.user0001@contoso.com`  | <font color="Red">〇</font> (含まれる)|
| ユーザー B <br>`adfstestuser01@contoso.com` | x  (含まれていない)   |

TEST0602 のグループに対して、以下のように、Staged Rollout 機能におけるパスワード ハッシュ同期を割り当てます。

![](./about-staged-rollout/apply-phs1.png)


![](./about-staged-rollout/apply-phs2.png)


\[認証方式\]

- `test.user0001@contoso.com` のユーザーで認証を試みます。(グループに **含まれる** ユーザー)  
⇒ フェデレーション認証の場合だとリダイレクトされますが、リダイレクトされておらず、パスワード ハッシュ同期による認証方式が適用されていることが、以下の画面キャプチャからもご確認いただけます。  
※なお、[グループおよびグループに含まれるユーザーの構成情報] において、Staged Rollout 機能におけるパススルー認証を割り当てても、以下の画面キャプチャと同様のサインイン画面が表示されます。

![](./about-staged-rollout/input-password.png)

- `adfstestuser01@contoso.com` のユーザーで認証を試みます。 (グループに **含まれていない** ユーザー)  
⇒ AD FS による認証方式が適用されていることが、以下の画面キャプチャからもご確認いただけます。

![](./about-staged-rollout/adfs-signinpage.png)

このように、上記の 2 ユーザー共に、同じフェデレーション ドメイン (例 : `contoso.com`) を使用しているにも関わらず、Staged Rollout 機能を割り当てたグループに含まれるユーザーは、マネージド 認証が適用されます。

# Staged Rollout に関してよくある Q&A 集

**Q. 認証方式の切替を行う際、ユーザー単位での認証方式の変更は必要なく (全ユーザーに対する認証方式を行う想定)、認証方式の変更に要する時間として、ドメイン単位でフェデレーション解除するよりも Staged Rollout 機能を用いた方が、反映時間は短く済むのでしょうか？**

A. いいえ、ドメイン単位でフェデレーション解除をご実施いただいた方が反映時間が短く済みます。  
なお、ドメイン単位でフェデレーション解除するコマンドとして、`Convert-MSOLDomainToStandard` または `Set-MsolDomainAuthentication` がありますが、ユーザーのパスワード リセットを行うような要件がない場合、`Set-MsolDomainAuthentication` をご利用ください。※

※  
`Convert-MSOLDomainToStandard` コマンドは、ユーザーのパスワード リセットを行う要件がある場合に利用します。このコマンドを実行すると、それぞれのユーザー単位での処理を試行するため、ユーザー数に比例して認証方式の切り替えに時間を要します。

一方、`Set-MsolDomainAuthentication` コマンドは、ドメイン単位で認証方式の切り替えのみを行うコマンドであるため、即時的に認証方式の切り替えを行うことができます。なお、過去の事例では、`Set-MsolDomainAuthentication` コマンドによる認証方式の切り替えに伴い一時的に問題が生じる可能性があります。切り替えに要する時間は、 下記の公開情報でご案内しておりますとおり、最大でも 4 時間ですが、この間に一時的にユーザー認証にも問題が発生する可能性がある点についてはご注意ください。

- 参考情報  
Title : メンテナンス期間の計画  
URL : <https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/plan-migrate-adfs-password-hash-sync#plan-deployment-and-support>

> [!WARNING]
> 2023/6/30 以降、 上記にて案内しております Set-MsolDomainAuthentication や Convert-MSOLDomainToStandard コマンドは、 MSOL コマンドのため廃止される予定です。
> 代替として、現在は New-MgDomainFederationConfiguration と Remove-MgDomainFederationConfiguration コマンドを利用します。


> Remove コマンドでは、フェデレーションからマネージドへの切り替えを行います。実行例は下記の通りです。

```Powershell
Get-MgDomainFederationConfiguration -DomainId <カスタム ドメイン名> | fl
Remove-MgDomainFederationConfiguration -DomainId <カスタムドメイン名> -InternalDomainFederationId <Get-MgDomainFederationConfiguration コマンドの Id を入力>
```

> New コマンドでは、各種パラメータを指定することでマネージド ドメインからフェデレーション ドメインへの切り替えが可能です。実行例は下記の通りです。

```Powershell
New-MgDomainFederationConfiguration -DomainId "<カスタム ドメイン名>" -PreferredAuthenticationProtocol "wsFed" -ActiveSignInUri $Active -DisplayName $display -IssuerUri $issuer -MetadataExchangeUri $Meta -NextSigningCertificate $NextCert -PassiveSignInUri $Passive -SignOutUri $SignOUt -SigningCertificate $SignCert -FederatedIdpMfaBehavior $MFA | Format-List
```


**Q. Staged Rollout 機能を対象グループに割り当てたときの反映時間について、教えてください。**

A. ユーザーが段階的ロールアウトの対象になりますと Azure AD の監査イベントが記録され、実際のユーザーの認証方式変更は、その後にバックグラウンドで実施されます。  
この認証方式の変更が有効になるまでに最大 24 時間かかることがあります。


そのため、すべてのユーザーに対する監査イベントが記録されたことを確認後、バックグラウンドの処理が完了するまで約 4 時間をお待ちいただく必要があります。

過去事例におきましては、17,000 ユーザーを Staged Rollout 対象グループに追加した後、最初のユーザーに対して監査イベントが記録されてから、最後のユーザーのイベントが記録されるまでに 1 時間 30 分ほどの時間を要したという情報がございます。


- 参考情報  
監査イベントの記録につきましては、下記の公開情報をご参照ください。  
Title : 監査  
URL : <https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-staged-rollout#auditing>

**Q. Staged Rollout 機能を割り当てている状態において、Hybrid Azure AD Join の構成を行おうとしていますが、このような構成は可能でしょうか。**

A. Windows 10 version 1903 以降であれば、Hybrid Azure AD Join 構成を有効にした状態で、Staged Rollout 機能をご利用いただくことができます。

理由といたしましては、Windows 10 version 1903 より前のバージョンでは、フェデレーション認証の場合、必ず AD FS との通信が発生するのに対し、Windows 10 version 1903 以降では、ユーザーごとにフェデレーション認証を行うかどうかを識別する機能が実装されているためです。

**Q. 検証用にステージロールアウトを有効化しますが、検証完了後は無効化する予定です。無効化した際に正常に戻っていることを確認したいですが、どのように確認すればよいでしょうか。**

A. ロールバックの手順で無効化した後は、同期ユーザーにて Microsoft 365 ポータルや Azure ポータル、マイ アプリ ポータル等にブラウザーでアクセスし、フェデレーション認証方式でサインインができれば正常に戻っているとご判断ください。​

**Q. Staged Rollout はいつ頃 GA されますか。**

A. 2020 年 4 月末時点ではパブリック プレビュー状態でしたが、2023 年 6 月現在、本機能はすでに一般提供が開始されております。
これまでプレビュー機能の利用が難しく利用できなかったお客様も、ぜひご利用ください。

**Q. Staged Rollout 機能を利用するとき、事前に Azure AD Connect のユーザーのサインイン方式として、何が選択されていればいいでしょうか。**

A. \[構成しない\] または \[AD FS とのフェデレーション\] のいずれかが選択されている必要があります。

**Q. 以前にシームレス SSO を構成していた、または PTA を構成していた場合は、コンピューターアカウントを削除し、PTA エージェントも削除しておく必要があるでしょうか。**

A. はい、コンピューター アカウントの削除および PTA エージェントの削除を事前に行う必要があります。

**Q. 最終的にマネージド認証に移行する場合の手順について教えてください。**

A. PowerShell コマンド `New-MgDomainFederationConfiguration` を用いて、該当ドメインをマネージド ドメインに変更、あるいは Azure AD Connect 構成ウィザードにてユーザーのサインイン方式を \[パススルー認証\] または \[パスワード ハッシュの同期\] に設定する (自動的にマネージド ドメインに変更される) 必要があります。

**Q. AD FS とのフェデレーション認証への切り戻し方法について教えてください。**

A. Azure AD Connect にて AD FS を管理する場合と、Azure AD Conneect にて AD FS 管理しない場合で、切り戻し方法が異なります。

- Azure AD Connect にて AD FS を管理する場合
    Azure AD Connect のユーザー のサインイン方式として、\[AD FS とのフェデレーション\] を選択します。

- Azure AD Conneect にて AD FS を管理しない場合
    Azure AD Connect のユーザーのサインイン方式として、\[構成しない\] を選択します。
    その後、 `New-MgDomainFederationConfiguration`を PowerShell にて実行します。

上記内容が少しでも参考となりますと幸いです。
なお、製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。

