---
title: "Azure AD Connect 移行に伴う設定情報の Export / Import"
date: 2020-09-11
tags:
  - AAD Connect
---

# Azure AD Connect 移行に伴う設定情報の Export / Import

こんにちは、Azure Identity サポート チームの谷です。   
現在ご利用環境のバージョンが 1.5.4x.0 未満、かつ、別のサーバーに新規に Azure AD Connect インストールし、利用環境の設定情報を復元する場合の方法です。   
例えば、現在利用している Azure AD Connect のバージョンが 1.1.647.0 で 1.5.45.0 にスイング アップグレードするために、追加で Azure AD Connect 用にサーバーを構成し、Azure AD Connect の各種設定を行う場合が想定される方法となります。

## 留意事項
予め Azure AD Connect 1.5.4x.0 以降のバージョンをインストールし、スクリプト ファイル [MigrateSettings.ps1](./aadc-import-export-config-upgrade/MigrateSettings.ps1) を取得し、既存の Azure AD Connect サーバーに配置しておく必要があります。
バージョン 1.5.45.0 を弊社環境にてインストールし、取得したファイルをサンプルとして本記事にて掲載させていただきますが、今後の更新等にて不具合等が確認された場合には予告等無く変更させていただくこととなりますので、実際に利用する場合には、最新バージョンに同梱されているスクリプトを利用するようにしてください。
MigrateSettings.ps1 は既定で下記に配置されます。   
 C:\Program Files\Microsoft Azure Active Directory Connect\Tools

## 手順
 本番環境のみで実施する場合での手順として、[アップグレード手順](../how-to-upgrade-details/AADC_Upgrade_B.pptx)の 3. / 4. の順番が変わります。
 4. の手順にてインストール後に、MigrateSettings.ps1 を取得し、既存の Azure AD Connect サーバーに配置します。

1. 既存の Azure AD Connect サーバーにて MigrateSettings.ps1 を配置し、PowerShell を管理者にて起動します。
2. 下記のコマンドを実行します。
```PowerShell
  .\MigrateSettings.ps1
```

 実行例)
 ```txt
 PS C:\temp> .\MigrateSettings.ps1
 
 The downlevel server configuration was successfully exported.  Copy the entire directory to
 your new staging server and select 'MigratedPolicy.json' from the UI to import these settings.
 
     C:\ProgramData\AADConnect\Exported-ServerConfiguration-85885ede-d99a-4c1f-9cec-cc5571b9287a
 
 Please see https://go.microsoft.com/fwlink/?LinkID=2117122 for more information on completing this process.
```

3. 上記メッセージに表示のとおり、C:\ProgramData\AADConnect にディレクトリが生成されますので、同ディレクトリごと新規に構築しているサーバーにコピーします。

4. 設定ファイルの読み込み方法は下記記事にて記載の手順と同様となり、コピーしたディレクトリ内の MigratedPolicy.json を選択し、ウィザードを進めます。  
  Azure AD Connect 設定の Export / Import  
  https://github.com/jpazureid/blog/blob/master/articles/azure-active-directory-connect/aadc-import-export-config/AADC_Config.pptx?raw=true


上記で手順は完了となります。
アップグレードの際に同期ルールなどが多い場合や構成項目が多い場合にご利用いただければ幸いです。

- 参考情報
Migration process  
https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-import-export-config#migration-process
