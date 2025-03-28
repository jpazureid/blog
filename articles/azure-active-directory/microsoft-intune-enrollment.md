---
title: Microsoft Intune Enrollment を Entra ID に登録する
date: 2025-03-25 09:00
tags:
  - Microsoft Entra
  - Conditional Access
  - Device
---

# Microsoft Intune Enrollment を Entra ID に登録する

こんにちは、Azure & Identity サポート チームの長谷川です。本記事では Microsoft Intune Enrollment のサービス プリンシパル (アプリ) を登録する方法を紹介します。

今回紹介しているコマンドは、Microsoft Intune Enrollment に限らず、テナントにまだないアプリを登録する際に利用可能ですので、他のシナリオでもご活用いただければ幸いです。その際は、登録したいアプリのアプリケーション ID をご用意ください。

## はじめに

Microsoft Intune へのデバイス登録を条件付きアクセスの対象 (もしくは対象外) にしたい場合は、ターゲット リソースに Microsoft Intune Enrollment アプリを指定して条件付きアクセス ポリシーを構成します。しかしながら、新規に作成したテナントでは既定では Microsoft Intune Enrollment が登録されていません。こういった場合、次の手順で Microsoft Intune Enrollment のサービス プリンシパル (アプリ) を Entra ID のテナントに登録することで、条件付きアクセスで利用できるようになります。

なお、一度登録した Microsoft Intune Enrollment のサービス プリンシパル (アプリ) は削除することはできないこと、あらかじめご承知おきください。

## Microsoft Intune Enrollment を登録する手順

Microsoft Graph PowerShell を利用した次の手順で Microsoft Intune Enrollment サービス プリンシパル (アプリ) を登録することができます。
 
1. PowerShell を管理者権限で起動します。
2. 以下のコマンドを実行し、Microsoft Graph PowerShell モジュールを作業端末にインストールします (インストール済みの場合はスキップ)。
   
```powershell
Install-Module Microsoft.Graph -Force
```
 
3. 以下のコマンドを実行し、グローバル管理者で認証します。([要求されているアクセス許可] という画面が表示された場合は、[承諾] を押下します)
   
```powershell
Connect-MgGraph -Scopes "Application.ReadWrite.All"
```

4. 以下のコマンドを順番に実行して、"Microsoft Intune Enrollment" のサービス プリンシパル (アプリ) を作成します。

```powershell
New-MgServicePrincipal -AppId "d4ebce55-015a-49b5-a083-c84d1797ae8c"
```

5. 作業が終わりましたら以下のコマンドで PowerShell セッションを切断します。
   
```powershell
Disconnect-MgGraph
```

## おわりに
本記事では Microsoft Intune Enrollment のサービス プリンシパル (アプリ) を Entra ID のテナントに登録する方法を紹介しました。製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供しますので、ぜひ弊社サポート サービスをご利用ください。
