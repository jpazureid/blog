---
title: 一度 Microsoft Entra ハイブリッド 参加を正しく構成完了したにも関わらず[保留中]と表示される事象について
date: 2024-02-09 08:00
tags:
    - Microsoft Entra
    - device registration
---

# 一度 Microsoft Entra ハイブリッド 参加を正しく構成完了したにも関わらず[保留中]と表示される事象について

こんにちは、Azure Identity サポート チームの 名取 です。

弊社サポートでは、"一度 Microsoft Entra ハイブリッド 参加を正しく構成完了したにも関わらず[保留中]と表示される"というご申告を頂戴することがあります。
この事象については下記公開情報で解説されています。

Title: Microsoft Entra ID の保留中のデバイス - Active Directory | Microsoft Learn
URL: <https://learn.microsoft.com/ja-jp/troubleshoot/azure/active-directory/pending-devices/>

上記公開情報を分かりやすくするため、本ブログを用意しました。

## 本ブログで取り扱うデバイス状態について

まず、本ブログにて取り扱うデバイス状態についてご説明します。
デバイス状態を確認することができるコマンド[dsregcmd /status]の結果が、下図のように表記されている状態が対象です。
![](./workspaces/blog/articles/azure-active-directory/hybrid-pending-device/command.png)
AzureADJoined : YES
DomainJoined : YES
DeviceAuthStatus : FAILED. Device is either disabled or deleted.

また、Microsoft Entra ID 上では登録済み欄が"保留中"となっている状態を表します。
![](./workspaces/blog/articles/azure-active-directory/hybrid-pending-device/Microsoft_Entra.png)

## [登録済み]欄の日付が[保留中]に戻るというのは誤解です!

お客様によっては、前述の登録済み欄が「日付から保留中に変化した」と誤解される方がいます。
しかしながら、 登録済み欄は、[保留中]から[日付]に変化することはあっても、[日付]から[保留中]に変化することはありません。

## この状態が発生する仕組み

では、何故 Microsoft Entra ハイブリッド 参加 を正しく構成したにもかかわらず、その後上図のようなデバイス状態となるのでしょうか。
それは、一度 Microsoft Entra ハイブリッド 参加 が構成完了したあとに、Microsoft Entra ID 上から対象のデバイス オブジェクトが何らか削除された場合です。
Microsoft Entra ID 上から対象のデバイス オブジェクトが削除された後に、再度 Microsoft Entra Connect によってデバイス情報が同期されると、Microsoft Entra ID からの視点では "新たにデバイス オブジェクトが同期された" ことになるため、登録済み欄が[保留中]のデバイス オブジェクトが作成されます。
そのため、Microsoft Entra ID 上に対象デバイスが新規に作成されますが、対象デバイス上ではすでに Microsoft Entra ハイブリッド参加 の構成が完了しているため、参加処理をを改めて開始する動作は発生しません。

つまり、デバイス側は自身を参加済みと認識しており、Microsoft Entra ID 側は参加ステップの開始状態 (デバイスからの参加処理待ち) という矛盾状態になるため、登録済み欄は[日付]へ変更することなく、[保留中]のまま残り続けます。

## この事象が発生するシナリオについて

本事象に該当するデバイス オブジェクトの削除が発生する主なシナリオは下記の 2 つがあります。

・ 1 つ目のシナリオ
  管理者ロールを持つユーザーが、Azure ポータルやコマンドなどで、Microsoft  Entra ID 上から該当デバイスを削除した場合
![](./workspaces/blog/articles/azure-active-directory/hybrid-pending-device/device.png)
・ 2 つ目のシナリオ
　オンプレミス AD 上で該当のコンピューターアカウントが Microsoft Entra Connect の同期対象外 OU に移動された後に、Microsoft Entra Connect の同期が行われた場合
![](./workspaces/blog/articles/azure-active-directory/hybrid-pending-device/users_and_computers.png)

## 本事象の解消方法について

この状態になった場合は、対象デバイスの Microsoft Entra ハイブリッド参加 構成を解除し、その後再構成することで解消します。
再構成の手順は下記の弊社ブログをご参照ください。

Microsoft Entra ハイブリッド参加を再構成する (簡易版)
URL: <https://jpazureid.github.io/blog/azure-active-directory/microsoft-entra-hybrid-joined-re-registration-simplified/>

## おわりに

以上、"一度 Microsoft Entra ハイブリッド 参加を正しく構成完了したにも関わらず[保留中]と表示される"事象について解説いたしました。
上記内容が皆様の参考となりますと幸いです。
ご不明な点等がありましたら、ぜひ弊社サポート サービスをご利用ください。
