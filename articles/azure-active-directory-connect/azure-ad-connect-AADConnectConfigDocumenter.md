---
title: "Azure AD Connect Sync Configuration Documenter 使用方法"
date: 2020-09-29 19:00
tags:
  - AAD Connect
---

# Azure AD Connect Sync Configuration Documenter 使用方法

こんにちは、Azure Identity サポート チームの谷です。  
Azure AD Connect Sync Configuration Documenter 使用方法をご案内します。  
[Readme](https://github.com/microsoft/AADConnectConfigDocumenter/blob/master/README.md) の内容を和訳、手順となります。
Azure AD Connect サーバーの移行やアップグレードに際し、設定変更内容や差分内容を確認する場合に参考にしてください。  
  
  
## Azure AD Connect Sync Configuration Documenter とは
Azure AD Connect の設定内容や同期ルールを比較するためのツールです。  
各 Azure AD Connect にて設定情報をエクスポートし、HTML レポート ファイルで比較情報を取得することができます。  
  
  
## 使用方法
1. 比較情報を確認するサーバーにて [Azure AD Connect Configuration Documenter](https://github.com/Microsoft/AADConnectConfigDocumenter/releases) をダウンロードします。  
   ページ内の AzureADConnectSyncDocumenter.zip をクリックしてダウンロードします。  
2. ダウンロードした AzureADConnectSyncDocumenter.zip を任意のディレクトリに展開します。
3. 展開した AzureADConnectSyncDocumenter フォルダー配下の Data フォルダーに各サーバー用のフォルダーを作成します。  
　 例) C:\temp\AzureADConnectSyncDocumenter\Data\AADCServer001 , C:\temp\AzureADConnectSyncDocumenter\Data\AADCServer002  
  
4. 各 Azure AD Connect サーバーにて設定ファイルを取得します。
```PowerShell 
Get-ADSyncServerConfiguration -Path "出力先へのパス"
```
(実行例)  
```PowerShell 
Get-ADSyncServerConfiguration -Path "C:\temp\AADC001"
```
5. 手順 4. で出力した下記のフォルダーを 3. で作成したフォルダーにサーバー毎にコピーします。  
     Connectors  
     GlobalSettings  
     SynchronizationRules  

6. 手順 2. で展開したフォルダー内の AzureADConnectSyncDocumenterCmd.exe をテキスト エディターで開きます。
7. 下記箇所を手順 3. で作成したフォルダー名に合わせて、保存します。  
   AzureADConnectSyncDocumenterCmd.exe "Contoso\Pilot" "Contoso\Production"  
   例) AzureADConnectSyncDocumenterCmd.exe "AADCServer001" "AADCServer002"  
8. AzureADConnectSyncDocumenter-contoso.cmd のファイル名を AzureADConnectSyncDocumenter.cmd に変更します。  

9. 下記コマンドを実行します。
   
```PowerShell 
.\AzureADConnectSyncDocumenter.cmd
```

10. コマンド実行後に AzureADConnectSyncDocumenter\Report 配下に HTML ファイルが生成されます。
11. レポート内の Create / Update / Delete 項目で差分内容を確認します。  
    下記の "Only Show Changes" チェックを有効にすることで差分のみ表示可能となります。  
![](./azure-ad-connect-AADConnectConfigDocumenter/AzureADConnectSyncDocumenter01.jpg)
  
  
## 差分内容につきまして

Azure AD Connect のアップグレードでは既定の設定項目などが増えており、差分が生じる可能性があります。  
各バージョンでの更新内容は [こちら](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-version-history) をご参照ください。  


