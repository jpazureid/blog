---
title: Microsoft Entra Domain Services の AADDS600 アラート表示の内容と対応方法
date: 2025-05-19 09:00
tags:
  - Azure AD
  - Microsoft Entra Domain Services
---


こんにちは、Azure Identity チームです。

弊社サポート チームでは、Microsoft Entra Domain Services (以下、Entra DS) をご利用されている環境において、AADDS600 アラートが表示される状況について、お問い合わせをいただいております。本記事では、このアラートの内容と対処方法をご紹介します。

**アラート内容**

> 名前：The managed domain has detected usage of a deprecated TLS version, which is scheduled for retirement.
>
> 重要度：重大
>
> ID：AADDS600
>
> 発生日時：-
>
> 最終検出日時：-
>
> レプリカ セット：-
>
> イシュー：We have identified that this domain is using TLS 1.0 or 1.1, which is currently deprecated and scheduled for retirement on August 31, 2025. You are required to migrate to TLS 1.2 to avoid service interruption.




## アラート内容の説明

アラート AADDS600 の内容は、ご利用の Entra DS 環境で、現在非推奨の TLS 1.0 または TLS 1.1 の使用が許可されている設定となっていることの注意喚起となります。
Entra DS では 2025 年 8 月 31 日をもって TLS 1.0 および 1.1 の使用が廃止される予定です。
そのため、TLS 1.0 または TLS 1.1 の使用が許可されている設定の環境において、アラートが表示されます。

これは、Entra DS へのアクセスに実際に TLS 1.0 や TLS 1.1 が使用されたかではなく、Entra DS 環境で TLS 1.0 または TLS 1.1 の使用が許可されている設定となっていることを示しています。
そのため、Entra DS 環境で TLS 1.2 およびそれ以上の TLS バージョンのみが使用されるように設定することで、本アラートは収束します。

### 対応方法

Microsoft Azure ポータルから、Entra DS で [TLS 1.2 専用モード] を有効に設定することで、AADDS600 の通知が収束します。

1. Microsoft Azure ポータル (portal.azure.com) から、構成済みの Entra DS インスタンスを開きます。

2. 画面左部のナビゲーション メニューから [セキュリティ設定] を選択します。

3. [TLS 1.2 専用モード] 項の設定を確認します。
    ・無効化 : TLS 1.0 または TLS 1.1 の使用も許可されている設定
    ・有効にする : TLS 1.2 およびそれ以上の TLS バージョンのみが使用される設定

4. [TLS 1.2 専用モード] 項で [有効にする] を設定し、画面上部の [保存] ボタンを押下します。 



以下の公開情報には、この対応方法および PowerShell による [TLS 1.2 専用モード] を有効に設定する手順をご案内していますので、合わせてご参照ください。

https://learn.microsoft.com/ja-jp/entra/identity/domain-services/reference-domain-services-tls-enforcement#how-to-migrate-to-tls-12-only-mode-in-domain-services

### 対応方法における影響

Entra DS へドメイン参加を行う現行の OS (Windows 10 以降、Windows Server 2016 以降) は、既定で TLS 1.2 をサポートしています。
「対応方法」を実施し Entra DS で [TLS 1.2 専用モード] を有効に設定しても、標準的な Entra DS の利用シナリオとしてのドメイン参加における影響はありません。

影響が想定される例として、Entra DS へ Secure LDAP による接続を行っており、 Secure LDAP の送信元プラットフォームやアプリケーションが TLS 1.0 や TLS 1.1 のみの使用となっている際には、[TLS 1.2 専用モード] を有効に設定することで、Secure LDAP による接続が行えなくなります。
その場合は、Secure LDAP の送信元にて TLS 1.2 以降が使用されるよう設定をご確認ください。

Entra DS への Secure LDAP による接続に関する参考情報となります。

https://learn.microsoft.com/ja-jp/entra/identity/domain-services/tutorial-configure-ldaps

## よくある質問

<span style="color:blue">Q.</span> AADDS600 アラートに対して対応をしなくても問題ありませんか？

<span style="color:red">A.</span> AADDS600 アラートは TLS 1.0 または TLS 1.1 の使用が許可されている設定となっていることの注意喚起のため、対応を行わなくても影響はなく問題はありません。
しかし、2025 年 8 月 31 日をもって TLS 1.0 および 1.1 の使用が廃止され、TLS 1.2 以降の使用が必要となりますので、事前に検証期間を設けるため TLS 1.2 以降のみを使用する (上記、対応方法) 対応を実施いただくことをお勧めします。

<span style="color:blue">Q.</span> [TLS 1.2 専用モード] を [有効にする] と設定した後に [無効化] に設定することはできますか？

<span style="color:red">A.</span> [TLS 1.2 専用モード] を [有効にする] と設定した場合、Azure ポータル上の [TLS 1.2 専用モード] の設定箇所はグレーアウトされ、[無効化] に設定することはできません。

PowerShell "Update-AzADDomainService" コマンドレットを使用することで、[TLS 1.2 専用モード] を [無効化] に設定することができます。

- PowerShell を使用して [TLS 1.2 専用モード] を [無効化] に設定する方法

1. Az.ADDomainServices モジュールをインストールします。

   Install-Module -Name Az.ADDomainServices

2. Azure サブスクリプションに接続します。

   Connect-AzAccount -Subscription <Azure サブスクリプション ID>

3. [TLS 1.2 専用モード] の設定を確認します。

Get-AzADDomainService

表示結果から "DomainSecuritySettingTlsV1" の値を確認します。

    Disabled : [TLS 1.2 専用モード] は [有効にする] に設定されています
    Enabled  : [TLS 1.2 専用モード] は [無効化] に設定されています

    *"DomainSecuritySettingTlsV1" の値は、TLS 1.0 または TLS 1.1 での接続が許可されているかの設定を表示します。
       そのため、[TLS 1.2 専用モード] が [有効にする] に設定されている場合には "Disabled" と表示されます。

4. [TLS 1.2 専用モード] を [無効化] に設定します。

Update-AzADDomainService -Name "<Entra DS インスタンス名>" -ResourceGroupName "<リソース グループ名>" -DomainSecuritySettingTlsV1 Enabled

以下の公開情報では、PowerShell を使用して [TLS 1.2 専用モード] を [有効化] に設定する方法が案内されています。

https://learn.microsoft.com/ja-jp/entra/identity/domain-services/reference-domain-services-tls-enforcement#how-to-migrate-to-tls-12-only-mode-in-domain-services

<span style="color:blue">Q.</span> Entra DS へ TLS 1.0 または TLS 1.1 を使用した通信があるか確認できますか？

<span style="color:red">A.</span> Entra DS には、TLS 1.0 または TLS 1.1 を使用した通信があるか確認する機能はありません。
そのため、Secure LDAP による接続など、ドメイン参加の用途以外で Entra DS へ通信している場合には、送信元にてご利用の TLS バージョンをご確認ください。

上記内容が皆様の参考となりますと幸いです。
ご不明な点等がありましたら、ぜひ弊社サポート サービスをご利用ください。
