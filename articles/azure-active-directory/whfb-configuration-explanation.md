---
title: Windows Hello for Business の構成解説
date: 2020-08-31
tags:
  - Azure AD
  - Windows Hello for Business
  - WHfB
toc:
  enabled: true
min_depth: 1
max_depth: 4
list_number: false
---

# Windows Hello for Business の構成解説

こんにちは、Azure & Identity サポート チームの 姚 ( ヨウ ) です。

今回は Windows Hello for Business (以下 WHfB) の構成の種類について整理し、簡単に解説したいと思います。
あくまで、どういう種類の構成があるのかを整理する目的で、それぞれの構成の詳細な手順や動作については今回はカバーしません。

今後 WHfB の構成の把握と利用の検討に活用いただけますと幸いです。

 WHfB には展開モデル、そして信頼モデルの概念があります。
はじめに展開モデルについて、続いて信頼モデルの順に説明して整理していきます。

## 展開モデルとは

展開モデルはユーザーの認証先を示しており、 (1) クラウドのみ、(2) ハイブリッド、(3) オンプレミスのみ の 3 つに分類されます。それぞれの展開モデルについて以下の表にお纏めしましたのでご参照ください。

＊＊なお、本ブログではオンプレミスのみの構成については、Microsfot Entra ID が一切利用されないオンプレミス環境に閉じたパターンであり、お問い合わせ状況からも需要は少ない傾向もありますので、詳細については言及しません。

| 展開モデル | 概要 |
| :- | :- |
| (1) クラウドのみ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | クラウド移行が完了しており、ユーザーの認証先がクラウド (Microsoft Entra ID) のみで、且つデバイスの登録方法として、Microsoft Entra 登録済み・Microsoft Entra 参加済みが該当します。<br><br>各登録方法の詳細については、以下の公開情報を参照いただけますと幸いです。<br><br>Title:Microsoft Entra 登録済みデバイスとは<br>url:https://learn.microsoft.com/ja-jp/entra/identity/devices/concept-device-registration<br><br>Title:Microsoft Entra 参加済みデバイスとは<br>url:https://learn.microsoft.com/ja-jp/entra/identity/devices/concept-directory-join<br><br>Title:Microsoft Entra 参加デプロイを計画する<br>url:https://learn.microsoft.com/ja-jp/entra/identity/devices/device-join-plan<br> |
| (2) ハイブリッド | クラウド移行がまだ完了しておらず、認証先がクラウドのみではなくオンプレミス環境も含む構成で、且つデバイスの登録方法として、Microsoft Entra 参加済み・ Microsoft Entra ハイブリッド参加済みが該当します。<br>※Microsoft Entra 登録済みもサポートされますが BYOD 向けのソリューションのため省略します。<br><br>Microsoft Entra ハイブリッド参加済みの詳細については、以下の公開情報を参照いただけますと幸いです。<br><br>Title:Microsoft Entra ハイブリッド参加済みデバイスとは<br>url:https://learn.microsoft.com/ja-jp/entra/identity/devices/concept-hybrid-join<br><br>Title:Microsoft Entra ハイブリッド参加デバイスの手動構成<br>url:https://learn.microsoft.com/ja-jp/entra/identity/devices/hybrid-join-manual |
| (3) オンプレミス&nbsp; &nbsp; | クラウド サービスを利用されておらず、ユーザーの認証先がオンプレミス環境のみの構成で、且つデバイスはオンプレミスドメイン参加済みデバイスのみがこのシナリオに該当します。 |


ここまでで、「(2) ハイブリッド」は認証先にクラウドのみではなく、オンプレミス環境を含む WHfB 構成であることがわかります。
この「(2) ハイブリッド」には 3 つの信頼モデルが存在しており、この詳細について続けて説明します。

## 信頼モデルとは

信頼モデルは、 WHfB (PIN または生体認証) を使用して Windows へサインインをおこなったクライアントが、ドメイン コントローラーに対してどのように認証をおこなうかを定義したものとなり、(a) キー信頼と (b) 証明書信頼、そして (c) クラウド Kerberos 信頼の 3 つの種類が存在します。

クラウド アプリへの SSO は Microsoft Entra ID から発行されるトークンにより実現され、オンプレミス環境のリソース (ファイル サーバー等) への SSO はドメイン コントローラーから発行される Kerberos チケットにより実現されます。

Microsoft Entra ID へ同期されたユーザーアカウントの場合、パスワードを使用して Windows へサインインをおこなうと、Microsoft Entra 参加済みであっても、[こちら](https://learn.microsoft.com/ja-jp/entra/identity/devices/device-sso-to-on-premises-resources)の公開情報に記載の通り、Microsoft Entra ID から連携される資格情報を使用してオンプレミスのリソースへの SSO をおこなうことができます。

一方で、パスワードではなく WHfB で Windows へサインインをした場合、Microsoft Entra ハイブリッド参加済みおよび Microsoft Entra ハイブリッド参加済みのデバイスは信頼モデルを構成するまでドメイン コントローラーから Kerberos チケットを取得することができません。これは既定でドメイン コントローラーが WHfB による証明書ベースの Kerberos チケット取得に対応していないためです。

 WHfB で Windows へサインインをした場合、いずれかの信頼モデルを構成することでドメイン コントローラーにて WHfB による証明書ベースの Kerberos チケットの取得要求が可能となり、 Microsoft Entra ハイブリッド参加済みおよび Microsoft Entra ハイブリッド参加済みのデバイスにてオンプレミス環境のリソースへ SSO をおこなうことが可能となります。

各信頼モデルまた Microsoft Entra ハイブリッド参加済みおよび Microsoft Entra ハイブリッド参加済みであるかによっても必要となるインフラストラクチャと展開方法が異なってきます。
下表に信頼モデルの概要および展開方法に関するドキュメントをお纏めします。

|信頼モデル | 概要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
| (a) キー信頼               | WHfB のプロビジョニングの際にデバイスで作成された認証用の秘密鍵を利用して、自己署名証明書を作成しユーザーの個人ストアにます。<br>オンプレミスのリソースへのアクセス時に利用される Kerberos の TGT の要求時にチケットの要求とともに、ユーザーの個人ストアの自己署名証明書をドメイン コントローラーに送付します。<br>この自己署名証明書にユーザー名などの情報が含まれており、ドメイン コントローラーはこれらの情報をもとにユーザーを特定し、TGT を発行します。<br><br>デバイス登録方法ごとに本モデルの展開方法は下記の通りです。<br><br>・Microsoft Entra 参加済み<br>Title:Microsoft Entra参加済みデバイスのシングル サインオン (SSO) を構成する<br>url:https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-aadj-sso<br><br>・Microsoft Entra ハイブリッド参加済み<br>Title:ハイブリッド キー信頼デプロイ ガイド<br>url:https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/deploy/hybrid-key-trust<br>                  | 
| (b) 証明書信頼             | WHfB のプロビジョニングの際にデバイスで作成された認証用の秘密鍵を利用して、証明書機関から発行された証明書をユーザーの個人ストアに保持します。<br>オンプレミスのリソースへのアクセス時に利用される Kerberos の TGT の要求時にチケットの要求とともに、ユーザーの個人ストアの証明書機関から発行された証明書をドメイン コントローラーに送付します。<br>ドメイン コントローラーではこの証明書の情報をもとにユーザーを特定し、TGT を発行します。<br><br>デバイス登録方法ごとに本モデルの展開方法は下記の通りです。<br><br>・Microsoft Entra 参加済み<br>Title:Microsoft Entra 参加済みオンプレミス シングル サインオンの証明書の使用<br>url:https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-aadj-sso-cert<br><br>・Microsoft Entra ハイブリッド参加済み<br>Title:ハイブリッド証明書信頼展開ガイド<br>url:https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/deploy/hybrid-cert-trust<br> | 
| (c) クラウド Kerberos 信頼&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Microsoft Entra ID から PRT とともに発行された Partial TGT (部分的な Kerberos チケット) を保持します。<br>オンプレミスのリソースへのアクセス時に利用される Kerberos の TGT の要求時にチケットの要求とともに、Microsoft Entra ID から発行される Partial TGT をドメイン コントローラーに送付します。<br>ドメイン コントローラーではこの Partial TGT の情報をもとにユーザーを特定し、TGT を発行します。<br><br>デバイス登録方法に関わらず本モデルの展開方法は同じです。<br><br>Title:クラウド Kerberos 信頼デプロイ ガイド<br>url:https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/deploy/hybrid-cloud-kerberos-trust?tabs=intune<br>                                                                                                                                                                                                                                                                                                                | 


WHfB の構成に関する説明は以上となります。今後 WHfB の構成の種類の全体像の把握に本ブログの内容が少しでも参考となりますと幸いです。

なお、ハイブリッド構成においては、特別な要件がない限り、弊社ではクラウド Kerberos 信頼での展開を推奨しております。
クラウド Kerberos 信頼の構築手順については、[公開情報](https://learn.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/deploy/hybrid-cloud-kerberos-trust?tabs=intune)に加えこちらの[ブログ](https://jpazureid.github.io/blog/azure-active-directory/how-to-deploy-cloud-kerberos-trust/)にもお纏めしていますので、是非ご参考いただければと思います。
