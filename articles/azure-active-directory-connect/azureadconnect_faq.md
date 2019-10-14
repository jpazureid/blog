---
title: Azure AD Connect に関する FAQ
date: 2019-10-14
tags:
  - AAD Connect
---

# Azure AD Connect に関する FAQ
 
Azure AD Connect (AADC) のお問い合わせが多いご質問について、Q&A 形式でおまとめいたしました。   
既存のドキュメントではカバーされていない動作や質問について今後も適宜内容を拡充していきますので、ご参照いただければと思います。  
  
  
### Q. AADC の Active / Stand By (アクティブ / スタンバイ) の構成が行えるか?  
A. いいえ。AADC はクラスタ構成を実装していません。  
AADC を同一フォレスト内で 2 台以上構成した場合でも各 AADC で死活監視を行う実装はありません。  
冗長構成をご検討の場合はステージング モード機能をご利用ください。  
詳細は[こちら](https://github.com/jpazureid/blog/blob/master/azure-active-directory-connect/introduction-staging-server.md) をご参照ください。  
  
  
### Q. AADC のバックアップ / リストア方法はありますか?  
A. いいえ。AADC の構成情報については GUI 画面上から確認し、その情報を保存する方法のみとなります。  
同期ルールについてのみエクスポート、インポートすることは可能です。  
  
  
### Q. AADC からの同期エラーの通知メールを受信した。受信者はどこで設定できるのか？  
A. 同期処理での問題について、通知は 2 通りあります。  
それぞれ通知メールの送信元が異なります。  
 Azure AD Connect Health Agent : azure-noreply@microsoft.com  
 同期エンジン : MSOnlineServicesTeam@MicrosoftOnline.com  
 各設定方法について、下記ドキュメントをご確認ください。  
  - Azure AD Connect Health Agent 通知先設定手順  
  設定箇所 :  [Azure ポータル] - [Azure AD Connect] - [Azure AD Connect Health] - [同期エラー] - [通知設定]  
  設定項目 : 追加の電子メール受信者  
  https://portal.azure.com/#blade/Microsoft_Azure_ADHybridHealth/AadHealthMenuBlade/SyncErros  
  
  [AADCH_alert (PDF)](./azureadconnect_faq/AADCH_alert.pdf)
  
  - 同期エンジン通知先設定手順  
  設定箇所 : [Azure ポータル] – [Azure Active Directory] –[通知の設定]  
  設定項目 : 連絡先の電子メール  
  https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Notifications  
    
  [SyncEngine_alert (PDF)](./azureadconnect_faq/SyncEngine_alert.pdf)
  
### Q. AADC のサポート対応中のバージョン、サポート有効期間は？  
A. 現時点でリリース済みのすべてのバージョンがサポート対象です。  
詳細については下記記事をご参照ください。  
  
Title: Azure AD Connect アップグレード手順  
URL: https://blogs.technet.microsoft.com/jpazureid/2018/08/10/azure-ad-connect-upgrade/  
  
### Q. AADC をインストール時に既定で生成されるグループは？  
A.下記の 4 グループが生成されます。  
 1. **ADSyncAdmins**  
 本グループのメンバーは、Azure AD Connect 同期サービスマネージャーにおけるすべてのアクセス権を持ちます。  
 インストール ウィザードを実行したユーザーは、既定でこのグループに追加されます。  
   
 2. **ADSyncBrowsers**  
 このグループのメンバーは、WMIを使ったパスワードのリセット時にユーザーの情報を集める権限を持ちます。  
  
 3. **ADSyncOperators**  
 このグループのメンバーは、Azure AD Connect 同期サービス マネージャーを操作する権限を持ちます。  
 この操作には例えば次のようなものが含まれます。  
   - 管理エージェントを実行する  
   - 実行した結果（同期状況）の確認する  
   - 実行履歴をファイルにエクスポートする  
 なお、このグループのメンバーは ADSyncBrowsers グループに所属している必要があります。  
  
 4. **ADSyncPasswordReset**  
 このグループのメンバーは、WMI を通して行われるパスワード管理のすべての操作ができる権限を持ちます。 
 なお、このグループのメンバーは ADSyncBrowsers グループに所属している必要があります。
  
  
### Q. AADC の同期間隔を変更する方法は？  
A. 下記コマンドにて変更可能です。 
```PowerShell  
Set-ADSyncScheduler -CustomizedSyncCycleInterval <任意の時間>  
```
例（60 分に設定する場合）  
```PowerShell  
Set-ADSyncScheduler -CustomizedSyncCycleInterval 00:60:00  
```  
  
最も高頻度に同期を行う間隔として 30 分間隔となります。  
CustomizedSyncCycleInterval での設定値が 30 分よりも低い数値 (10 分間隔などに) 設定された場合では、その設定値は無視され、30 分間隔で処理されます。  
  
  
### Q. AADC の定期同期を普段は停止しておき、運用の必要性が生じたタイミングだけ同期させても良いか？  
A. 定期的な同期が維持されるようにしてください。  
  
同期処理を長期間停止している前提で、改めて同期処理を開始しようとした際に、初回の Import 処理に時間がかかり且つ最終的に stopped-server-down で Import 処理が失敗する場合があります。  
これは、数日間同期を行わない期間があった場合、処理されずに滞留していた情報があり、同期の再開時にまとめて処理されることに起因して AAD からの Delta Import 処理が AADC 内部で進まなくなる場合があるためです。
   
数日のような長期にわたって同期を行わないことは想定されていないため、定期的な同期を維持してください。  
どうしても長期的な同期停止後に同期を再開する必要がある場合は、下記コマンドにて完全同期を実施してください。  
  
今すぐ完全同期を開始する場合  
```PowerShell  
Start-AdSyncSyncCycle Initial  
```  
  
次回のスケジュール同期を完全同期として実行する場合
```PowerShell  
Set-ADSyncScheduler -NextSyncCyclePolicyType Initial
```  
  
### Q. Synchronization Service Manager で Operations タブのみ表示されている (Connectors などが表示されない)。  
A. サインインしているユーザーが ADSyncBrowse / ADSyncOperator グループにのみ所属していることが原因となります。  
Synchronization Rules Editor でも操作は制限され、読み取り権限 (Add ボタンは表示されますが、保存不可) のみとなります。  

![](./azureadconnect_faq/ssm_operations.jpg)
