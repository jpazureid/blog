---
title: Microsoft Entra ハイブリッド参加デバイスを再構成する
date: 2023-04-24 09:00
tags:
  - Microsoft Entra ID
  - Microsoft Entra Hybrid Join 
  - Troubleshooting
toc:
  enabled: true
  min_depth: 1
  max_depth: 4
  list_number: false
---

# Microsoft Entra ハイブリッド参加デバイスを再構成する

こんにちは、Azure & Identity サポート チームの長谷川です。

この記事では、対象デバイスの Microsoft Entra ハイブリッド参加 (略称 MEHJ) を再構成する手順を紹介します。

<!-- more -->

MEHJ の構成を完了した後、例えば何らかの事情で Microsoft Entra ID 上から誤ってデバイス オブジェクトが削除されてしまったという場合があるかと思います。デバイス オブジェクトが削除された後、再度 Microsoft Entra Connect (略称 MEC) でデバイス オブジェクトが Entra ID に同期されると [Entra 管理センター (entra.microsoft.com)] > [Microsoft Entra ID] > [デバイス] > [すべてのデバイス] で対象のデバイス オブジェクトが表示されるようになりますが、[登録済み] の項目は「保留中」のまま遷移しない状態になります。[登録済み] の項目を「保留中」から登録日に遷移させるためには、デバイスで MEHJ を再構成する必要があるものの、デバイス側は既に MEHJ の構成が完了しているため、そのままでは MEHJ を再構成する動作が生じません。こういった場合に、本ブログを参考に MEHJ を再構成いただけると幸いです。

> [!NOTE]
> 本手順は Microsoft Entra ID でデバイスを認証する「Sync Join」、「マネージド」、「クラウド認証」などと呼ばれる構成方法にのみ適用可能です。この構成方法は、オンプレミスの Active Directory サーバーから MEC を介して Microsoft Entra ID にデバイス オブジェクトを同期し、Microsoft Entra ID でデバイスを認証して MEHJ としてデバイスを構成するものです。お客様が AD FS のクレーム ルールを使用して Microsoft Entra ID にデバイスを登録するフェデレーション構成を利用している場合は、この手順を利用することはできません。
> 
> なお、再度 MEHJ を構成するためにはそのデバイス上での管理者権限と、デバイスがオンプレミスの Active Directory にアクセスできる環境 (社外にデバイスがある場合は、オンプレミス AD 環境への VPN 接続) が必要です。

## 1. 事前準備: Windows Hello for Business のリセット

Windows Hello for Business (略称 WHfB) を利用していない場合はこの手順はスキップください。

1. 端末にサインインします。
2. **ユーザー権限** でコマンド プロンプトを起動します (管理者として実行から起動しないようご注意ください)。
3. 以下のコマンドを実行して、WHfB の情報をリセットします。

    ```
    certutil -deletehellocontainer
    ```
    
4. 次のコマンドを実行し、`NgcSet : NO` となっていることを確認します。

    ```
    dsregcmd /status
    ```

## 2. 事前準備: Intune の登録解除

Intune 登録していなければこの手順はスキップください。

1. [Microsoft Intune 管理センター (intune.microsoft.com)] > [デバイス] > [すべてのデバイス] から該当デバイスを検索し、存在する場合は対象デバイスを開いて [削除] ボタンをクリックして削除します (削除完了するまでに少し時間がかかります)。
2. 対象のデバイス上で、[PowerShell] を **管理者権限** で実行します。
3. 以下のコマンドを実行し、Enrollment ID (GUID の形式となる想定) が表示されるかを確認します **<span style="color: red; ">(表示されない場合は以下の 4. から 7. の手順は実施しないでください)</span>**。

    ```
    Get-ChildItem HKLM:\Software\Microsoft\Enrollments | ForEach-Object {Get-ItemProperty $_.pspath} | where-object {$_.DiscoveryServiceFullURL} | Foreach-Object {$_.PSChildName}
    ```

4. 以下のコマンドを実行し、Enrollment ID を変数に格納します。

    ```
    $EnrollmentGUID = Get-ChildItem HKLM:\Software\Microsoft\Enrollments | ForEach-Object {Get-ItemProperty $_.pspath} | where-object {$_.DiscoveryServiceFullURL} | Foreach-Object {$_.PSChildName}
    ```

5. 以下のコマンドを実行し削除対象のレジストリを変数に格納します。(長いですが 1 行のコマンドです)
    ```
    $RegistryKeys = "HKLM:\SOFTWARE\Microsoft\Enrollments", "HKLM:\SOFTWARE\Microsoft\Enrollments\Status","HKLM:\SOFTWARE\Microsoft\EnterpriseResourceManager\Tracked", "HKLM:\SOFTWARE\Microsoft\PolicyManager\AdmxInstalled", "HKLM:\SOFTWARE\Microsoft\PolicyManager\Providers","HKLM:\SOFTWARE\Microsoft\Provisioning\OMADM\Accounts", "HKLM:\SOFTWARE\Microsoft\Provisioning\OMADM\Logger", "HKLM:\SOFTWARE\Microsoft\Provisioning\OMADM\Sessions"
    ```
    
6. 以下のコマンドを実行し、デバイス登録情報に関するレジストリを削除します。

    ```
    foreach ($Key in $RegistryKeys) {if (Test-Path -Path $Key) {Get-ChildItem -Path $Key | Where-Object {$_.Name -match $EnrollmentGUID} | Remove-Item -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue}}
    ```

7. 以下のコマンドを実行し、デバイス登録のタスクを削除します。**<span style="color: red; ">変数 $EnrollmentGUID がブランクの状態で以下のコマンドを実行すると必要なタスクが削除される恐れがありますので注意ください (念のため IF 文で誤削除を予防しています)。</span>**
    ```
    if ($EnrollmentGUID -eq $null) {Write-Warning "EnrollmentGUID is NULL"} elseif ($EnrollmentGUID -eq "") {Write-Warning "EnrollmentGUID is BLANK (but it is not NULL)"} else {Get-ScheduledTask | Where-Object {$_.Taskpath -match $EnrollmentGUID} | Unregister-ScheduledTask -Confirm:$false}
    ```

## 3. MEHJ の再構成: 再構成前の既存情報のクリア

MEHJ の再登録を行うに際して既存の情報をクリアしておきます。

1. 対象のデバイスにて **管理者権限** でコマンド プロンプトを起動し、次のコマンドで MEHJ を解除します。

    ```
    dsregcmd /leave
    ```

2. 次のコマンドで `AzureAdJoined : NO` となっていることを確認します。

    ```
    dsregcmd /status
    ```

3. オンプレミスの Active Directory にて、[Active Directory ユーザーとコンピューター] を開き、[表示(V)] > [拡張機能(V)] を有効にします。(すでに有効であればスキップください)

    ![](./haadj-re-registration/haadj-re-registration4-3.png)

4. [Active Directory ユーザーとコンピューター] にて対象のコンピューター アカウントを探し、右クリックから [プロパティ] を開きます (誤ったオブジェクトを操作しないようご注意ください。)

    ![](./haadj-re-registration/haadj-re-registration4-4.png)

5. [属性エディター] から [userCertificate] を選択し、[編集(E)] を選択します。

    ![](./haadj-re-registration/haadj-re-registration4-5.png)

6. [削除(R)] してから [OK] を選択します。

    ![](./haadj-re-registration/haadj-re-registration4-6.png)

7. [userCertificate] が <未設定> となっていることを確認したら [OK] を選択して閉じます。

    ![](./haadj-re-registration/haadj-re-registration4-7.png)

8. MEC の同期 (既定では 30 分間隔) を待ち、[Entra 管理センター (entra.microsoft.com)] > [デバイス] > [すべてのデバイス] にて対象のデバイス オブジェクトが削除されていることを確認します。

## 4. MEHJ の再構成: 再構成の実施

以下の手順で実際に再構成を行います。

1. 対象のデバイスを再起動したのち、対象のユーザーでサインインします。
2. 対象のデバイスがオンプレミスの Active Directory にアクセスできるネットワーク環境に接続していることを確認します (社内ネットワーク環境に接続するなど)。
3. **管理者権限** でタスク スケジューラーを起動し [タスク スケジューラ ライブラリ] > [Microsoft] > [Windows] > [Workplace Join] を開きます。
4. [Automatic-Device-Join] を右クリックし [実行する(R)] を選択します。

    ![](./haadj-re-registration/haadj-re-registration5-4.png)

5. オンプレミスの Active Directory において対象のコンピューター アカウントに userCertificate に値が書き込まれたことを確認します (上記「3. MEHJ の再構成: 再構成前の既存情報のクリア」の 3 から 5 の手順を参考)。

    ![](./haadj-re-registration/haadj-re-registration5-5.png)

6. MEC の同期 (既定では 30 分間隔) を経て [Entra 管理センター (entra.microsoft.com)] > [デバイス] > [すべてのデバイス] に対象のデバイス オブジェクトが同期されたことを確認します。

    ![](./haadj-re-registration/haadj-re-registration5-6.png)

7. Microsoft Entra ID への同期を確認後、再度 [Automatic-Device-Join] を実行します。(3 から 4 の手順を参考)
8. コマンド プロンプトを起動して次のコマンドを実行し `AzureAdJoined : YES` となっていることを確認します。

    ```
    dsregcmd /status
    ```

9. [Entra 管理センター (entra.microsoft.com)] > [デバイス] > [すべてのデバイス] で対象のデバイス オブジェクトの [登録済み] の項目が「保留中」から現在の日付に遷移したことを確認します。

    ![](./haadj-re-registration/haadj-re-registration5-9.png)

10. 対象デバイスにて 画面のロック > アンロック をすることで プライマリ更新トークン (PRT) を取得します。(画面をロックした後にすぐにアンロックして問題ありません)
11. 対象のデバイスにて **ユーザー権限** でコマンド プロンプトを起動し、次のコマンドを実行して `AzureAdPrt : YES` となっていることを確認します ([管理者として実行] から起動しないよう注意ください)。

    ```
    dsregcmd /status
    ```

## 5. 事後確認: Intune の登録

この手順はデバイスを Intune 登録していなければ不要です。また、実施した場合も反映に時間がかかることがあります。

1. [Entra 管理センター (entra.microsoft.com)] > [デバイス] > [すべてのデバイス] にアクセスします。
2. 該当デバイスを検索し、そのオブジェクトの [MDM] の項目に値が入り [準拠している] が「はい」となっていることを確認します。
3. [Microsoft Intune 管理センター (intune.microsoft.com)] > [デバイス] > [すべてのデバイス] にアクセスします。
4. 対象デバイスの [対応] の項目が「準拠している」となっていることを確認します。

## 6. 事後作業: WHfB の再プロビジョニング

WHfB を利用していなければこの手順は不要です。

1. 端末を再起動します。
2. 対象のユーザーでサインインすると WHfB のプロビジョニングが自動的に始まることを確認します。
3. ウィザードに沿って WHfB をセットアップします (ウィザードの中で多要素認証が要求されます)。

## おわりに

以上、MEHJ の再構成手順が運用の助けになると嬉しく思います。製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供しますので、ぜひ弊社サポート サービスをご利用ください。
