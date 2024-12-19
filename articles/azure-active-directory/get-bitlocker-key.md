---
title: Microsoft Entra ID に登録されている BitLocker 回復キーを一括取得する
date: 2024-12-19 09:00
tags:
  - Microsoft Entra
  - Device
  - BitLocker
---
# Microsoft Entra ID に登録されている BitLocker 回復キーを一括取得する

こんにちは、Azure & Identity サポート チームの長谷川です。
Microsoft Entra ID に登録されている BitLocker 回復キーを一括取得する方法のサンプルを紹介します。

BitLocker 回復キーは従来、オンプレミスの AD サーバー上やファイル サーバー上、もしくは紙に印刷して保存されておりました。
Microsoft Entra ID にデバイス登録もしくは参加した Windows デバイスにおいては、従来の方法に加え、Microsoft Entra ID 上のデバイス オブジェクトに紐づける形でクラウド上に BitLocker 回復キーを保存するオプションが用意されております。
本ブログでご案内する方法は、この Microsoft Entra ID 上のデバイス オブジェクトに紐づける形でクラウド上に保存された BitLocker 回復キーをテナント単位で一括取得するというものになります。

現状、Microsoft Entra ID に登録されている BitLocker 回復キーは GUI から一括で取得することができません。そこで Microsoft Graph PowerShell モジュールのコマンドを使用して Microsoft Entra ID に登録されているデバイス一覧および BitLocker 回復キーを含む場合は回復キーも含めて CSV に出力する方法のサンプルを紹介します。


## 出力方法サンプル 
1. PowerShell を管理者権限で起動します。
2. 以下のコマンドを実行し、Microsoft Graph PowerShell モジュールをインストールします。(既にモジュールがインストールされている場合はスキップしてください)
~~~
Install-Module Microsoft.Graph -Force
~~~
 
3. 以下のコマンドを実行し、グローバル管理者でサインインします。([要求されているアクセス許可] という画面が表示された場合は、[承諾] を押下します)
※もしグローバル管理者を利用しない場合は、実行するユーザーに二つのロール (クラウド アプリケーション管理者とクラウド デバイス管理者) が付与されていれば実行可能です。
~~~
Connect-MgGraph -Scopes "Device.Read.All,BitlockerKey.Read.All" 
~~~

4. 以下のコマンドを順に実行して、Bitlocker 回復キーも含むデバイス オブジェクト一覧を CSV としてデスクトップに出力します。(KeyId、KeyCreatedDateTime、Key が出力されていないデバイスは BitLocker 回復キーが Microsoft Entra ID に保存されていないデバイスです。)
~~~
$outfile = "$env:USERPROFILE\Desktop\DevicelistIncludingKey.csv"
$keyList = Get-MgInformationProtectionBitlockerRecoveryKey -All
$BilockerRecoveryKeys = $keyList | %{Get-MgInformationProtectionBitlockerRecoveryKey -BitlockerRecoveryKeyId $_.Id -Property "key"}
$aadDevices = Get-MgDevice -All -Filter "OperatingSystem eq 'Windows'"
$data = @()
foreach ($BilockerRecoveryKey in $BilockerRecoveryKeys) {
    $aadDevice = $aadDevices | ?{$_.DeviceId -eq $BilockerRecoveryKey.DeviceId} 
    $data += $aadDevice | Select AccountEnabled,Id,DeviceId,DisplayName,TrustType,OperatingSystem,OperatingSystemVersion,@{Name="KeyId"; Expression={$BilockerRecoveryKey.Id}},@{Name="KeyCreatedDateTime"; Expression={$BilockerRecoveryKey.CreatedDateTime}},@{Name="Key"; Expression={$BilockerRecoveryKey.Key}}
}
foreach ($aadDevice in $aadDevices) {
    if ($aadDevice.DeviceId -notin $keyList.DeviceId) {
        $data += $aadDevice | Select AccountEnabled,Id,DeviceId,DisplayName,TrustType,OperatingSystem,OperatingSystemVersion
    }
}
$data | Export-Csv $outfile -encoding "utf8" -NoTypeInformation
~~~
5. 作業完了後、以下のコマンドでセッションを切断し作業を終了します。
~~~
Disconnect-MgGraph
~~~


## 出力された CSV のサンプル
下図の赤枠が BitLocker 関連情報で、"Key" の項目が BitLoker 回復キーです。
![](./get-bitlocker-key/get-bitlocker-key01.jpg)



## 免責事項
本サンプル コードは、あくまでも説明のためのサンプルとして提供されるものであり、製品の実運用環境で使用されることを前提に提供されるものではありません。
本サンプル コードおよびそれに関連するあらゆる情報は、「現状のまま」で提供されるものであり、商品性や特定の目的への適合性に関する黙示の保証も含め、明示・黙示を問わずいかなる保証も付されるものではありません。
マイクロソフトは、お客様に対し、本サンプル コードを使用および改変するための非排他的かつ無償の権利ならびに本サンプル コードをオブジェクト コードの形式で複製および頒布するための非排他的かつ無償の権利を許諾します。
但し、お客様は以下の 3 点に同意するものとします。
(1) 本サンプル コードが組み込まれたお客様のソフトウェア製品のマーケティングのためにマイクロソフトの会社名、ロゴまたは商標を用いないこと
(2) 本サンプル コードが組み込まれたお客様のソフトウェア製品に有効な著作権表示をすること
(3) 本サンプル コードの使用または頒布から生じるあらゆる損害（弁護士費用を含む）に関する請求または訴訟について、マイクロソフトおよびマイクロソフトの取引業者に対し補償し、損害を与えないこと


## おわりに
本記事では Microsoft Entra ID 上に保存された BitLocker 回復キーの一括取得方法を紹介しました。製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供しますので、ぜひ弊社サポート サービスをご利用ください。
