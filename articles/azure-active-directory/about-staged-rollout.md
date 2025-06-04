---
title: Staged Rollout について
date: 2023-06-19
tags:
  - Azure AD
  - Staged Rollout
  - Federation
---
# Staged Rollout について

こんにちは、Azure Identity サポート チームです。

今回は、フェデレーション ドメインに属しているユーザーの一部のみをマネージド認証に変更できる Staged Rollout (段階的ロールアウト) 機能についてご紹介します。

> [!NOTE]
> 2023/06/19 プレビュー記載の削除。画面ショットの更新  
> 2025/06/03 古い表記やリンクなどを修正。

## Staged Rollout とは？

フェデレーションによる認証からマネージド認証 (パスワードハッシュ同期 / パススルー認証) への認証方式の変更に伴うユーザー影響を軽減するための機能を指します。これにより、少しずつユーザーの認証方式を変更できるというメリットがあります。

例えば、同じ `contoso.com` というフェデレーション ドメインに属するユーザーとして、ユーザー A およびユーザー B が存在するとします。

- ユーザー A の UPN: `test.user0001@contoso.com`  
- ユーザー B の UPN: `adfstestuser01@contoso.com`

ここで、Staged Rollout 機能が割り当てられているユーザー A はマネージド認証 (パスワード ハッシュ同期 / パススルー認証) を利用するようになりますが、Staged Rollout 機能が割り当てられていないユーザー B は従来通りフェデレーションによる認証となります。詳細について後述いたします。

## Staged Rollout の構成手順

Staged Rollout の構成手順につきましては、[公開情報](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/how-to-connect-staged-rollout) でもご紹介しております。そのため、まずは以下の公開情報をご参照いただき、ご不明点などございましたら、弊社サポート チームにお問い合わせいただければ幸いです。以下では、上述のシナリオに基づいて、実際の構成手順を一部抜粋して、ご案内します。

まず、グループおよびグループに含まれるユーザーの構成は以下のとおりです。

| ユーザー                                 | グループ名 TEST0602 |
|-----------------------------------------|----------------------|
| ユーザー A: `test.user0001@contoso.com`  | <font color="Red">〇</font> (含まれる)|
| ユーザー B: `adfstestuser01@contoso.com` | x  (含まれていない)   |

TEST0602 のグループに対して、以下のように、Staged Rollout 機能におけるパスワード ハッシュ同期を割り当てます。

![](./about-staged-rollout/apply-phs1.png)

![](./about-staged-rollout/apply-phs2.png)

この状況で、`test.user0001@contoso.com` のユーザーで認証を試みます (グループに **含まれる** ユーザー)。フェデレーション認証の場合だと外部 IdP にリダイレクトされますが、リダイレクトされておらず、パスワード ハッシュ同期による認証方式が適用されていることが以下の画面キャプチャからもご確認いただけます。

> [!NOTE]
> [グループおよびグループに含まれるユーザーの構成情報] において、Staged Rollout 機能におけるパススルー認証を割り当てても、以下の画面キャプチャと同様のサインイン画面が表示されます。

![](./about-staged-rollout/input-password.png)

次に、`adfstestuser01@contoso.com` のユーザーで認証を試みます (グループに **含まれていない** ユーザー)。AD FS による認証方式が適用されていることが以下の画面キャプチャからもご確認いただけます。

![](./about-staged-rollout/adfs-signinpage.png)

このように、上記の 2 ユーザー共に、同じフェデレーション ドメイン (例: `contoso.com`) を使用しているにも関わらず、Staged Rollout 機能を割り当てたグループに含まれるユーザーはマネージド認証が適用されます。

## Staged Rollout に関してよくある Q&A 集

### Q. 認証方式の切替を行う際、ユーザー単位での認証方式の変更は必要なく (全ユーザーに対する認証方式を行う想定)、認証方式の変更に要する時間として、ドメイン単位でフェデレーション解除するよりも Staged Rollout 機能を用いた方が、反映時間は短く済むのでしょうか？

A. いいえ、ドメイン単位でフェデレーション解除をご実施いただいた方が反映時間が短く済みます。

> [!NOTE]
> 現在 MSOL PowerShell は廃止されましたが、ドメイン単位でフェデレーションを解除するコマンドとして、`Convert-MsolDomainToStandard` または `Set-MsolDomainAuthentication` が存在しました。ユーザーのパスワード リセットを行うような要件がない場合は、`Set-MsolDomainAuthentication` の利用をお勧めしておりました。`Convert-MSOLDomainToStandard` コマンドは、ユーザーのパスワード リセットを行う要件がある場合に利用していました。このコマンドを実行すると、それぞれのユーザー単位での処理を試行するため、ユーザー数に比例して認証方式の切り替えに時間を要します。一方、`Set-MsolDomainAuthentication` コマンドは、ドメイン単位で認証方式の切り替えのみを行うコマンドであるため、即時的に認証方式の切り替えを行うことができました。なお、過去の事例では、`Set-MsolDomainAuthentication` コマンドによる認証方式の切り替えに伴い一時的に問題が生じる可能性がありました。

参考情報としては、[メンテナンス期間の計画](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/migrate-from-federation-to-cloud-authentication#plan-the-maintenance-window) をご覧ください。

フェデレーションを解除するコマンドとして、現在は New-MgDomainFederationConfiguration と Remove-MgDomainFederationConfiguration コマンドを利用します。Remove コマンドでは、フェデレーションからマネージドへの切り替えを行います。実行例は下記のとおりです。

```Powershell
Get-MgDomainFederationConfiguration -DomainId <カスタム ドメイン名> | fl
Remove-MgDomainFederationConfiguration -DomainId <カスタムドメイン名> -InternalDomainFederationId <Get-MgDomainFederationConfiguration コマンドの Id を入力>
```

New コマンドでは、各種パラメータを指定することでマネージド ドメインからフェデレーション ドメインへの切り替えが可能です。実行例は下記のとおりです。

```Powershell
New-MgDomainFederationConfiguration -DomainId "<カスタム ドメイン名>" -PreferredAuthenticationProtocol "wsFed" -ActiveSignInUri $Active -DisplayName $display -IssuerUri $issuer -MetadataExchangeUri $Meta -NextSigningCertificate $NextCert -PassiveSignInUri $Passive -SignOutUri $SignOUt -SigningCertificate $SignCert -FederatedIdpMfaBehavior $MFA | Format-List
```

### Q. Staged Rollout 機能を対象グループに割り当てたときの反映時間について教えてください。

A. ユーザーが段階的ロールアウトの対象になりますと Microsoft Entra ID の監査イベントが記録され、実際のユーザーの認証方式変更は、その後にバックグラウンドで実施されます。この認証方式の変更が有効になるまでに最大 24 時間かかることがあります。

### Q. Staged Rollout 機能を割り当てている状態において Microsoft Entra ハイブリッド参加の構成を行おうとしていますがこのような構成は可能でしょうか。

A. Windows 10 version 1903 以降であれば、Microsoft Entra ハイブリッド参加構成を有効にした状態で、Staged Rollout 機能をご利用いただくことができます。これは、Windows 10 version 1903 より前のバージョンでは、フェデレーション認証の場合、必ず AD FS との通信が発生するのに対し、Windows 10 version 1903 以降では、ユーザーごとにフェデレーション認証を行うかどうかを識別する機能が実装されているためです。

### Q. 検証用に Staged Rollout を有効化しますが検証完了後は無効化する予定です。無効化した際に正常に戻っていることを確認したいですがどのように確認すればよいでしょうか。

A. ロールバックの手順で無効化した後は、同期ユーザーにて Microsoft 365 ポータルや Azure ポータル、マイ アプリ ポータル等にブラウザーでアクセスし、フェデレーション認証方式でサインインができれば正常に戻っているとご判断ください。​

### Q. Staged Rollout はいつ頃 GA (一般提供) されますか。

A. 2020 年 4 月末時点ではパブリック プレビュー状態でしたが、2023 年 6 月現在、本機能はすでに GA (一般提供) が開始されております。これまでプレビュー機能の利用が難しく利用できなかったお客様も、ぜひご利用ください。

### Q. Staged Rollout 機能を利用するとき事前に Microsoft Entra Connect のユーザーのサインイン方式として何が選択されていればいいでしょうか。

A. \[構成しない\] または \[AD FS とのフェデレーション\] のいずれかが選択されている必要があります。

### Q. 以前にシームレス SSO を構成していた、またはパススルー認証を構成していた場合は、コンピューターアカウントを削除し、パススルー認証エージェントも削除しておく必要があるでしょうか。

A. はい、コンピューター アカウントの削除およびパススルー認証エージェントの削除を事前に行う必要があります。

### Q. 最終的にマネージド認証に移行する場合の手順について教えてください。

A. PowerShell コマンド `New-MgDomainFederationConfiguration` を用いて、該当ドメインをマネージド ドメインに変更、あるいは Microsoft Entra Connect 構成ウィザードにてユーザーのサインイン方式を \[パススルー認証\] または \[パスワード ハッシュの同期\] に設定する (自動的にマネージド ドメインに変更される) 必要があります。

### Q. AD FS とのフェデレーション認証への切り戻し方法について教えてください。

A. Microsoft Entra Connect にて AD FS を管理する場合と、Microsoft Entra Connect にて AD FS 管理しない場合で、切り戻し方法が異なります。

- Microsoft Entra Connect にて AD FS を管理する場合:  
    Microsoft Entra Connect のユーザー のサインイン方式として、\[AD FS とのフェデレーション\] を選択します。

- Microsoft Entra Connect にて AD FS を管理しない場合:  
    Microsoft Entra Connect のユーザーのサインイン方式として、\[構成しない\] を選択します。その後、 `New-MgDomainFederationConfiguration`を PowerShell にて実行します。

上記内容が少しでも参考となりますと幸いです。なお、製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。
