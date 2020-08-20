---
title: "[情報採取] KeyVault に関わる問題などの際に採取、提供いただきたい情報"
date: 2018-08-06
tags:
  - Azure AD
  - Key Vault
---
Key Vault に関わる問題が発生した場合にテクニカル サポートにお問い合わせいただく際に下記の情報をご提供いただくことで問い合わせがスムーズに行われますので、予め採取をお願いいたします。
調査過程で追加で採取いただく情報が増える可能性があります。予めご了承ください。

a.  エラーの画面またはログ   
b. KeyVault のアクティビティログ   
c. KeyVault の診断ログ (もし設定済でございましたら)   
d. キーコンテナーの設定情報   
e. 補足情報   

# a.  エラーの画面またはログ
エラーを確認いただいた画面やログがございましたらご提供いただけますと幸いです。


# b. KeyVault のアクティビティログ
1. Azure ポータルにて [Key Vault] ->  [対象のキーコンテナー] を選択します。
2. [アクテビティログ] を選択します。
3. フィルター項目である [期間] で ”先月” を選択します。
4.  [CSV 形式でダウンロードする] を選択してダウンロードした CSV ファイルを弊社までご提供ください。


# c. KeyVault の診断ログ (もし設定済でございましたら)
1. Azure ポータルにて [Key Vault] ->  [対象のキーコンテナー] を選択します。
2. [診断設定] でストレージアカウント、イベントハブ、Log Analytics ワークスペースに連携済の情報がございましたら、これらの情報をご提供いただけますと幸いです。
 
ご参考 :
Log Analytics ワークスペースにログを連携している場合、 [Key Vault] ->  [対象のキーコンテナー] -> [ログ] で情報を参照することが可能です。
この場合、下記クエリを実行した後、[CAV へエクスポート - すべての列] でローカルに CSV ファイルとしてダウンロードした後、弊社までご提供いただけますと幸いです。
 
> AzureDiagnostics
 | where ResourceProvider == "MICROSOFT.KEYVAULT"
 | where TimeGenerated >= todatetime('2019-12-28 00:00:13')
 
※todatetime は事象発生日時を含めるように設定ください

# d. キーコンテナーの設定情報
キーコンテナーの設定を頂戴したく、下記どちらかのコマンドの実行結果をテキストファイルに保存しご提供いただけますと幸いです。
 
Azure CLI
> az keyvault show  --name <キーコンテナー名>
az keyvault key list --vault-name <キーコンテナー名>
az keyvault certificate list --vault-name <キーコンテナー名>
az keyvault secret list --vault-name <キーコンテナー名>

Azure PowerShell

> Get-AzKeyVault -VaultName <キーコンテナー名>
Get-AzKeyVaultKey -VaultName <キーコンテナー名>
Get-AzKeyVaultSecret -VaultName <キーコンテナー名>
Get-AzKeyVaultCertificate -VaultName <キーコンテナー名>

# e. 補足情報
以下の情報をテキストファイルにお纏めいただき、ご提供いただけますと幸いです。
・サブスクリプション ID
・キーコンテナー名
・アクセスしたユーザー名 (ManagedID の場合はサービスプリンシパル名)
・キー取得方法 (PowerShell から取得、プログラムから取得など)
・キーにアクセスしたおおよその日時




※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
