---
title: Azure AD Connect サーバーの CPU 使用率が頻繁に 100% になる問題について
date: 2018-08-10
tags: 
 - AAD Connect
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2018/08/10/aadc-high-cpu-usage/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Azure AD Connect サーバーの CPU 使用率が頻繁に 100% になる問題について

こんにちは、Azure ID チームの松枝です。  
本記事では、Azure AD Connect サーバーの CPU 使用率が頻繁に 100% になる問題について、次のとおりご案内いたします。  
先日より同様の事象について、多くのお問い合わせをいただいております (ご迷惑をお掛けしまして申し訳ありません)。  
先日修正を含む Azure AD Connect のバージョンがリリースされましたので、もし本問題事象が発生しましたら、下記の対処方法を実施ください。

## 本事象の概要

”バージョン 1.1.819.0 以前” の Azure AD Connect の不具合が原因で、 .NET Framework に関するセキュリティ更新プログラムの適用が行われた後、 Azure AD Connect サーバーの CPU 使用率 が常に 100% に近い高負荷状態になります。

### 事象発生が報告されている更新プログラム

- KB4338420
- KB4338606
- KB4054542
- KB4054566
- KB4054590
- KB4338814
- KB4338419
- KB4338605
- KB4345418

### 参考情報

- [High CPU issue in Azure Active Directory Connect Health for Sync](https://support.microsoft.com/en-us/help/4346822/high-cpu-usage-in-azure-active-directory-connect-health-for-sync)

もし、高負荷状態にあるプロセスが ”Microsoft.Identity.Health.AadSync.MonitoringAgent.Startup.exe” の場合、本事象に該当する可能性が高いと考えられます。

## 根本的な対処方法

Azure AD Connect を、本事象に対する修正を含む最新バージョン Azure AD Connect 1.1.880.0 にアップグレードします。  
バージョン 1.1.880.0 における修正内容につきましては、下記の弊社技術情報をご参照ください。

- [Azure AD Connect: Version release history - 1.1.880.0](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-version-history#118800)

## 暫定的な対処方法

運用上の理由で上記の根本的な対処が難しい場合、本事象の原因となっているサービス「Azure AD Connect Health Sync Monitoring Service」を停止することでも回避できます。アップグレードするまでの暫定的な対処方法としてご検討ください。  
なお、このサービスを停止した場合、Azure AD Connect Health for Sync の機能は利用できなくなりますが、Azure AD Connect の同期処理や認証処理に影響はありません。

上記内容が少しでも参考となりますと幸いです。  
製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。

## 関連する記事

- [Azure AD Connect アップグレード手順](../azure-active-directory-connect/how-to-upgrade.md)
