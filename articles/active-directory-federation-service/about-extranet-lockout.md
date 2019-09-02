---
title: Extranet Lockout について
date: 2018-10-15
tags:
  - AD FS
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/10/15/extranetlockout%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Extranet Lockout について

こんにちは、 Azure Identity の平形です。
本ブログを参照されている方の中でも、今現在以下のような現象にお悩みの方がいらっしゃたりしませんでしょうか。

- AD FS 環境でオンプレミスの AD アカウントが頻繁にロックアウトされてしまう
- ロックアウトの原因が AD FS サーバーからの認証

アカウント ロックアウトの頻度が非常に高く、様々なアカウントで発生しているのであればパスワード スプレー攻撃によって引き起こされている可能性があります。
また、ロックアウトにつながるログオン失敗が AD FS 経由でされている場合には、インターネットから WAP (Web Application Proxy) に対してパスワード スプレー攻撃を試行していることが疑われます。

今回は AD FS 環境における外部からのパスワード スプレー攻撃に対処する Extranet Lockout 機能についての紹介と設定方法をお伝えします。

### そもそもパスワード スプレー攻撃とは

パスワード スプレー攻撃とは、複数の異なるアカウントに対して多くの人が一般的に設定するようなパスワードでのログオンを試行する攻撃手法です。

詳細につきましては先日ブログを公開しておりますので参照ください。

Azure AD と AD FS のベスト プラクティス: パスワード スプレー攻撃の防御

https://blogs.technet.microsoft.com/jpazureid/2018/03/19/password-spray/

私たちが良く確認するパターンでは、 Office 365 を経由して AD FS に対してパスワード スプレー攻撃をしかけるものがあります。

このような経路での攻撃の特徴として、 IMAP や SMTP 等アクティブ認証を利用しますのでご利用環境の AD FS 上で記録される IP アドレスは Exchange Online で使用する IP アドレスレンジからの認証試行のように見えます。

## Extranet Lockout とは

WAP 経由での認証は、認証要求は AD FS に転送され、その要求に含まれるユーザー名、パスワードを利用してオンプレミスの AD に対して Kerberos での認証を行います。このときにパスワードが異なると認証に失敗し、オンプレミス AD のアカウント ロックアウト カウンターがインクリメントされます。これが繰り返し試行されることで、アカウント ロックアウトが発生し、 WAP 経由ではない認証要求についてもブロックされるようになります。

Extranet Lockout では、社内のアカウント ロックアウトカウンターとは別にロックアウトの閾値を設けることで WAP 経由の外部からの認証要求のみをブロックし、オンプレミス AD のロックアウトを防ぐ機能です。WAP 経由でオンプレミス AD に対して Kerberos 認証を行う前に AD のパスワード間違え回数 (badpwdcount) 回数をチェックします。チェックの結果、 AD FS で設定した Extranet Lockout の閾値と同じか、それ以上の場合には AD FS は AD に対して認証要求を送ることなく認証を失敗させます。

その結果、 ロックアウトを WAP 経由で発生させることを防ぎます。

多くのお客様でもこちらの設定を案内し、効果があったことを確認しております。

### Extranet Lockout 構成時に考慮すべき点

Extranet Lockout の動作概要は上記のとおりですが、実際に構成する際に考慮すべきポイントをお伝えします。

1. AD FS と PDC エミュレーターの役割を持つ DC 間の通信
2. オンプレミス AD のアカウント ロックアウトの閾値
3. AD FS の OS (Windows Server 2012 R2 以降必須)
 
## 1. AD FS と PDC エミュレーターの役割を持つ DC 間の通信

Extranet Lockout では WAP 経由の認証要求が発生した際に AD FS が PDC エミュレーターと通信を行い、ユーザー アカウントの badpwdcount の値をチェックします。

そのため、 AD FS と PDC エミュレーター間での通信が行えるよう構成する必要があります。 ※

## 2. オンプレミスのアカウント ロックアウトの閾値

Extranet Lockout で指定する閾値はオンプレミスのアカウント ロックアウトの値を基に検討する必要があります。
この閾値の設定を誤ると、Extranet Lockout が発生する前に AD 側のアカウント ロックアウトが発生し、意味がなくなってしまいます。
大まかには以下のように設定します。

Extranet Lockout の発生閾値 (ExtranetLockoutThreshold) ・・・ オンプレミスのアカウント ロックアウトの閾値未満とします。

Extranet Lockout の発生時間 (ExtranetObservationWindow) ・・・ オンプレミスのロックアウト カウンターのリセット時間より大きくします。

## 3. AD FS の OS (Windows Server 2012 R2 以降必須)

Extranet Lockout 機能は Windows Server 2012 R2 以上の AD FS にて利用可能です。

※ Windows Server 2016 からは ExtranetLockoutRequirePDC というオプションが増えました。

値を false とすることで、 PDC と通信が出来ない場合は別のドメイン コントローラーと通信を行ってロックアウトの判定を行うようになります。

参考情報

Configure AD FS Extranet Lockout Protection

https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/configure-ad-fs-extranet-soft-lockout-protection

## Extranet Lockout 設定方法

AD FS プライマリ サーバー上で PowerShell を起動し、下記コマンドを実行します。

```
Set-AdfsProperties -EnableExtranetLockout $true -ExtranetLockoutThreshold <回数> -ExtranetObservationWindow (new-timespan -Minutes <時間>)
```

コマンド実行後、即座に適用されます。

特に再起動は不要です。

// 設定例

オンプレミス側のアカウント ロックアウト回数が 10 回、アカウント ロックアウト リセット カウンターが 15 分の場合。

ExtranetLockoutThreshold はアカウント ロック回数の 10 回未満に、 ExtranetObservationWindow はリセット カウンターの 15 分より大きい値にします。

この場合は例えば以下のように設定します。

```
Set-AdfsProperties -EnableExtranetLockout $true -ExtranetLockoutThreshold 5 -ExtranetObservationWindow (new-timespan -Minutes 16)
```

### 参考情報 : 認証失敗ログの見方

AD FS の監査ログを有効化することで、 AD FS への認証がどこからの要求であるかを判断可能です。

// AD FS 上で記録されるパスワード間違え時のセキュリティ イベント ログ

<!-- textlint-disable -->
> ログの名前:         Security
>
> ソース:           Microsoft-Windows-Security-Auditing
>
> 日付:           2018/09/XX XX:XX:XX
>
> イベント ID:       4625
>
> タスクのカテゴリ:     ログオン
>
> レベル:           情報
>
> キーワード:         失敗の監査
>
> ユーザー:         N/A
>
> コンピューター:       ADFS01.contoso.com
>
> アカウントがログオンに失敗しました。
>
> サブジェクト:
> 
> セキュリティ ID:                CONTOSO\gmsa-adfs01$
> 
> アカウント名:                gmsa-adfs01$
> 
> アカウント ドメイン:                CONTOSO
> 
> ログオン ID:                0x64D79
> 
>  
> 
> ログオン タイプ:                        3
> 
>  
> 
> ログオンを失敗したアカウント:
> 
> セキュリティ ID:                NULL SID
> 
> アカウント名:                user01@contoso.com
> 
> アカウント ドメイン:
> 
>  
> 
> エラー情報:
> 
> 失敗の原因:                ユーザー名を認識できないか、またはパスワードが間違っています。
> 
> 状態:                        0xC000006D
> 
> サブ ステータス:                0xC000006A
> 
>  
> 
> プロセス情報:
> 
> 呼び出し側プロセス ID:        0x7a8
> 
> 呼び出し側プロセス名:        C:\Windows\ADFS\Microsoft.IdentityServer.ServiceHost.exe
> 
>  
> 
> ネットワーク情報:
> 
> ワークステーション名:        AZ-ADFS01
> 
> ソース ネットワーク アドレス:        -
> 
> ソース ポート:                -

// AD FS 上で監査ログを有効化した状態でアクティブ認証を実施し、パスワード間違えが発生した時に記録されるイベント ログ

> ログの名前:         Security
> 
> ソース:           AD FS Auditing
> 
> 日付:           2018/09/XX XX:XX:XX
> 
> イベント ID:       411
> 
> タスクのカテゴリ:     (3)
> 
> レベル:           情報
> 
> キーワード:         クラシック,失敗の監査
> 
> ユーザー:         CONTOSO\gmsa-adfs01$
> 
> コンピューター:       ADFS01.contoso.com
> 
>  
> 
>  
> 
> トークンの検証に失敗しました。詳細については内部例外を参照してください。
> 
>  
> 
> 追加データ
> 
>  
> 
> Activity ID: 00000000-0000-0000-0000-000000000000
> 
>  
> 
> トークンの種類:
> 
> http://schemas.microsoft.com/ws/2006/05/identitymodel/tokens/UserName
> 
>  
> 
> クライアント IP:
> 
> 20.188.200.100,40.101.146.181 <<<<<<<<<<<<<< Exchange Online を経由すると、 Exchange Online の IP アドレスとアクセス元> の IP アドレスの 2 つが記録されます。
> 
>  
> 
> エラー メッセージ:
> 
> user01@contoso.com
> 
>  
> 
> 例外情報:
> 
> System.IdentityModel.Tokens.SecurityTokenValidationException: user01@contoso.com
> 
> 場所 Microsoft.IdentityServer.Service.Tokens.MSISWindowsUserNameSecurityTokenHandler.ValidateToken(SecurityToken  token)
<!-- textlint-enable -->

上記内容が少しでもお客様の参考となりますと幸いです。
製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。
