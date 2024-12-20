---
title: Microsoft Entra ID に必要な通信先エンドポイントのまとめ
date: 2023-12-01 09:00
tags:
  - Entra ID
  - Network
---

# Entra ID に必要なエンドポイントのまとめ

こんにちは、Azure & Identity サポート チームの大庭です。

今回はよくご質問をいただく Microsoft Entra ID をご利用いただく際に必要となるエンドポイント (URL/IP アドレス) について案内します。Microsoft Entra ID においては認証からアカウント管理、アカウント同期に至るまで複数のサービスを提供しており、ご利用いただく機能によってアクセス先のエンドポイントが異なります。お客様によっては、ネットワーク プロキシにて厳密に接続可能なエンドポイント (URL) 先を制御されている場合があり、そういった制御を行われているお客様では、正常にサービスを利用するために個別にエンドポイント (URL/IP アドレス) への通信を許可する必要があります。

本記事においては、現時点で提供している Microsoft Entra ID の各サービスに関し、必要となるエンドポイントを記載した公開資料へのリンクをまとめます。これにより、「どのエンドポイントに対してアクセス許可をすればいいのかまとめて知りたい！」といったご要望にお応え出来たら幸いです。

> [!NOTE]
> サポート チームにて可能な限り迅速かつ網羅的な情報の更新に努めておりますが、本記事にてすべての情報の網羅ができているわけではありません。サービスが利用するエンドポイントはドキュメントの更新とともに変化する可能性があります。正式な案内については各公開情報を参照いただくか、弊社サポート サービスまでお問い合わせください。

## Microsoft Entra ID で基本的に利用されるエンドポイント

まず初めに Microsoft Entra ID を利用いただく際に基本的に必要となるエンドポイントは、[Office 365 の URL と IP アドレスの範囲](https://learn.microsoft.com/ja-jp/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide#microsoft-365-common-and-office-online) に記載されている ID 56 , ID 59 , ID 97 そして ID 125 になります。こちらは Microsoft Entra ID を利用するシナリオで最低限必要となるエンドポイントをまとめたものです。Microsoft Entra ID をご利用いただく際は、認証を行うクライアントからこれらのエンドポイントについてネットワークの疎通を確保ください。
また、Windows を利用される場合は ctldl.windowsupdate.com および *.windowsupdate.com への許可も実施ください。

## Microsoft Entra ID でデバイス管理に利用するエンドポイント

Entra ID では Microsoft Entra ハイブリッド参加、Microsoft Entra 参加そして Microsoft Entra 登録、という 3 つの方法でデバイスを登録することができます。いずれの方法を利用する場合でも、[Microsoft Entra ハイブリッド参加を構成する](https://learn.microsoft.com/ja-jp/entra/identity/devices/how-to-hybrid-join#network-connectivity-requirements) のページに記載されているエンドポイントを許可ください。

## Microsoft Entra ID にて利用規約を利用するエンドポイント

Microsoft Entra ID にて利用規約を利用する場合は、[Microsoft Entra の利用規約のよく寄せられる質問](https://learn.microsoft.com/ja-jp/entra/identity/conditional-access/terms-of-use#frequently-asked-questions) のページにある "Q: 利用規約サービスにはどのエンドポイントが認証に使用されますか？" に記載されているエンドポイントを許可ください。

## Microsoft Entra Connect に関連するエンドポイント

Microsoft Entra Connect を利用して、ハイブリッド ID ソリューション (オンプレミスからのアカウントの同期) を利用される際に必要な URL と IP アドレスの一覧については上記の「Microsoft Entra ID で基本的に利用されるエンドポイント」の節をご覧ください。また併せて、[Microsoft Entra Connect の接続に関する問題のトラブルシューティング](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/tshoot-connect-connectivity) のページも参照をお勧めします。開放が必要なネットワーク ポートとプロトコルについては、[ハイブリッド ID で必要なポートとプロトコル](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/reference-connect-ports) のページにも説明がありますのでご覧ください。

## Microsoft Entra Connect Health Service に利用するエンドポイント
 
Microsoft Entra Connect Health Service を利用する場合は、[Microsoft Entra Connect Health エージェントのインストール](https://learn.microsoft.com/ja-jp/entra/identity/hybrid/connect/how-to-connect-health-agent-install#outbound-connectivity-to-azure-service-endpoints) ページに記載されているエンドポイントを許可ください。

## Microsoft Entra アプリケーション プロキシ コネクタにて利用されるエンドポイント

Microsoft Entra アプリケーション プロキシ コネクタを利用される際は、[既存のオンプレミス プロキシ サーバーと連携する](https://learn.microsoft.com/ja-jp/entra/identity/app-proxy/application-proxy-configure-connectors-with-proxy-servers#proxy-outbound-rules) ページに記載されているエンドポイントを許可ください。

## Microsoft Entra プロビジョニング サービスを利用する IP アドレスの範囲
 
Microsoft Entra プロビジョニング サービスを利用する場合は、[チュートリアル: Microsoft Entra ID の SCIM エンドポイントのプロビジョニング](https://learn.microsoft.com/ja-jp/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups#ip-ranges) に記載されている IP アドレスの範囲を参照ください。

## Microsoft Private Access 用にアプリケーション プロキシ コネクタにて利用されるエンドポイント

Microsoft Entra Private Access 用にアプリ プロキシ コネクタについては、[Microsoft Entra Private Access 用にアプリ プロキシ コネクタを構成する方法
](https://learn.microsoft.com/ja-jp/entra/global-secure-access/how-to-configure-connectors#allow-access-to-urls) に記載されているエンドポイントを許可ください。

## Azure ポータルに利用されるエンドポイント

Microsoft Entra ID の認証ではないですが、Azure ポータルに必要となるエンドポイントは、[ファイアウォールまたはプロキシ サーバーで Azure portal の URL を許可する](https://learn.microsoft.com/ja-jp/azure/azure-portal/azure-portal-safelist-urls?tabs=public-cloud) のページに記載されているエンドポイントを許可ください。

## Microsoft Entra の証明書ベースの認証 (CBA) に利用されるエンドポイント

Microsoft Entra の証明書ベースの認証 (CBA) をご利用いただいている場合は、[Microsoft Entra の証明書ベースの認証に関する技術的な詳細情報](https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-certificate-based-authentication-technical-deep-dive#how-does-microsoft-entra-certificate-based-authentication-work) に記載されているエンドポイントを許可ください。

今後、Microsoft Entra ID をご利用いただく際に本ブログの内容が少しでも参考となりますと幸いです。
