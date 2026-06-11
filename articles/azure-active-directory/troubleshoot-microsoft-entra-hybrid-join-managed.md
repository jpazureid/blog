---
title: Microsoft Entra ハイブリッド参加の失敗時の初動調査方法について (マネージド編)
date: 2020-01-20 09:00
tags:
  - Microsoft Entra ID
  - Microsoft Entra hybrid join
  - Troubleshooting
toc:
  enabled: true
  min_depth: 1
  max_depth: 4
  list_number: false
---

# Microsoft Entra ハイブリッド参加の失敗時の初動調査方法について (マネージド編)

> [!NOTE]
> 本記事は 2020 年 1 月に公開された記事を、2023 年 7 月の Microsoft Entra ID（旧 Azure Active Directory）への名称変更を反映して更新したものです。技術的な動作や手順に変更はありません。
> 旧名称「Hybrid Azure AD Join」は、現在「Microsoft Entra ハイブリッド参加（Microsoft Entra hybrid join）」に変更されています。

こんにちは、Azure & Identity サポート チームです。

多くの方にご利用いただいている Microsoft Entra ハイブリッド参加（旧 Hybrid Azure AD Join）の構成ですが、構成に失敗する場合、Microsoft Entra ID の観点だけでなく、オンプレミス Active Directory と Windows の観点での確認が必要です。今回は、Microsoft Entra ハイブリッド参加の構成時の初動調査について紹介します。

今回の情報により問題が解決すれば越したことはありませんが、問題が解決しない場合も、ここで確認した初期切り分け情報を含めることで、サポートにスムーズな形で調査を依頼できます。

なお、Microsoft Entra ハイブリッド参加には、マネージド構成とフェデレーション構成の 2 種類の構成があります。それぞれの構成については、以下の弊社公開情報を参照ください。

[ID インフラストラクチャに基づいてシナリオを選択する](https://learn.microsoft.com/ja-jp/entra/identity/devices/how-to-hybrid-join)

今回は、まずマネージド構成、Microsoft Entra Connect（旧 Azure AD Connect）のみを利用する Microsoft Entra ハイブリッド参加の構成の初動調査について、構成に失敗する際の代表的な症状 3 つに対する初動調査を紹介します。フェデレーション構成については[フェデレーション編](../../azure-active-directory/troubleshoot-microsoft-entra-hybrid-join-federated.md)を参照ください。

## (1) オンプレミスのコンピューターが Microsoft Entra ID のデバイス一覧に存在しない

Microsoft Entra ハイブリッド参加を構成することでオンプレミスのドメインに所属するコンピューターを示すデバイス オブジェクトが Microsoft Entra Connect により Microsoft Entra ID に同期されます。Microsoft Entra ハイブリッド参加が正常にできているかの最初の確認としては、[Microsoft Entra 管理センター](https://entra.microsoft.com) を開き **[ID]** > **[デバイス]** > **[すべてのデバイス]** で結合の種類が「Microsoft Entra hybrid joined」となっている状態で対象のコンピューターが存在するか確認します。

<!-- TODO: スクリーンショット - [Microsoft Entra 管理センターのデバイス一覧画面] -->

対象のデバイスが Microsoft Entra 管理センターのデバイス欄に存在しない場合、デバイスが Microsoft Entra Connect によって同期されていない可能性が高く、真っ先に確認いただきたいのはオンプレミス Active Directory にある当該コンピューター オブジェクトに userCertificate に何らかの値が書き込まれていないかどうかです。Microsoft Entra Connect はコンピューター オブジェクトの userCertificate 属性に何らかの値が書き込まれている場合に、コンピューター オブジェクトを Microsoft Entra ID に同期します。

その確認方法は、任意のドメイン コントローラーで ADSI エディター ([ファイル名を指定して実行] や検索ボックスから adsiedit.msc) を起動し、対象のコンピューター オブジェクトのプロパティを開きます。以下は userCertificate に値が書き込まれていない場合の例で、この場合、一般的に以下の要因によって発生しますので、それぞれ順番に確認を行います。

<!-- TODO: スクリーンショット - [userCertificate が未設定の ADSI エディター画面] -->

### (1-1) Microsoft Entra ハイブリッド参加の処理で、デバイスを Microsoft Entra ID に参加させるタスクが有効になっていない

Microsoft Entra ハイブリッド参加の Join 処理はクライアント端末の以下のタスクによって実施されます。このタスクが実行されないと Microsoft Entra Connect による同期対象にクライアント コンピューターがなりません。

パス : [タスクスケジューラ] – [タスクスケジューラ ライブラリ] – [Microsoft] – [Windows] – [Workplace Join]
タスク名 : Automatic-Device-Join

タスクはオンプレミスの Active Directory に参加するタイミングで有効になりますので、ドメイン参加後にこのタスクが有効かどうかを確認ください。もし、オンプレミス Active Directory に参加したにも関わらず、当該タスクが有効ではない場合、この時点でサポートにお問い合わせを検討ください。

当該タスクが有効の場合、次の (1-2) の確認事項に進みます。

### (1-2) Service Connection Point (SCP) が正常に構成されていない

SCP はクライアント端末が Microsoft Entra ハイブリッド参加する先の Microsoft Entra ID テナントの情報が書き込まれています。

(1-1) のクライアントうえで実行されるタスクは SCP を元に Microsoft Entra ID へのエンドポイントを確認し、コンピューター オブジェクトの userCertificate 属性に必要な情報を書き込みます。SCP が正常に構成されていない場合、userCertificate 属性は書き込まれず、コンピューター オブジェクトが同期されない結果になるため、SCP が正しく設定されているか確認します。

SCP は、オンプレミス Active Directory の構成パーティションか、クライアント端末のレジストリ キー値のいずれかで設定ができます。以下の手順で SCP が設定されているかどうかを確認します。Active Directory の構成パーティション、またはクライアント端末のレジストリ キー値のいずれか設定されていれば問題はありません。もし、SCP の設定に問題はなければ、次の (1-3) の確認事項に進みます。

#### Active Directory の構成パーティションの確認

1. ドメイン コントローラーに管理者ユーザーでログオンし、管理者で PowerShell を起動します
2. 以下のコマンドを実行します

```powershell
$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,CN=Configuration,DC=xxxxxxx,DC=xxxxxx"
$scp.Keywords
```

DC=xxxxxxx,DC=xxxxxx にはオンプレミス Active Directory のドメイン名 (フォレストに複数ドメインが存在する場合には、フォレスト ルート ドメイン名) を入力します。contoso.com の場合、DC=contoso,DC=com と入力します。

例:

```powershell
$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,CN=Configuration,DC=contoso,DC=com"
$scp.Keywords
```

これらのコマンドの出力結果として、以下のように Microsoft Entra ID テナントのドメイン名 (azureADName) とテナント ID (azureADId) の情報が表示されていれば、正常に構成されていると判断できます。また、マネージドの Microsoft Entra ハイブリッド参加であるため、azureADName は xxxxx.onmicrosoft.com 形式で設定されている必要があります。

```
azureADName:<Microsoft Entra ID テナントドメイン名の xxxxx.onmicrosoft.com 形式>
azureADId:<Microsoft Entra ID テナント ID>

例:
azureADName:microsoft.onmicrosoft.com
azureADId:72f988bf-86f1-41af-91ab-2d7cd011db47
```

> [!NOTE]
> SCP の出力結果に含まれる "azureADName" や "azureADId" というキー名は、旧名称 (Azure AD) に基づく内部的な名称であり、現時点では変更されていません。Microsoft Entra ID に名称変更された後も、これらのキー名はそのまま使用されます。

#### クライアント端末のレジストリ キー値の確認

クライアント端末の以下の 2 つのレジストリー値に Microsoft Entra ID テナントの情報が設定しているかどうかを確認します。

- レジストリー キー : `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CDJ\AAD`
  - 値 : TenantId
  - 種類 : REG_SZ
  - 値 : TenantName
  - 種類 : REG_SZ

TenantName には Microsoft Entra ID のテナント ドメイン名 (xxxx.onmicrosoft.com 形式) と TenantId には Microsoft Entra ID テナント ID の両方が設定されている必要があります。SCP として、いずれかの場所に正常に設定されていることが確認できましたら、次の (1-3) にお進みください。

> [!NOTE]
> レジストリ パスに含まれる "AAD" は旧名称 (Azure Active Directory) の略称に基づくものですが、現時点ではこのパスに変更はありません。

### (1-3) Microsoft Entra ハイブリッド参加に必要な Microsoft Entra ID のエンドポイントへアクセスできていない

クライアントうえで実行される Microsoft Entra ハイブリッド参加のタスクは userCertificate 属性を書き込む前に SCP に指定されている Microsoft Entra ID テナントが実際に存在するか確認します。具体的には Microsoft Entra ハイブリッド参加に必要な以下の Microsoft Entra ID のエンドポイントへのアクセスを試行し、ここにアクセスして指定された Microsoft Entra ID テナントの存在を確認したうえで userCertificate へ情報を書き込みます。

- `https://enterpriseregistration.windows.net`
- `https://login.microsoftonline.com`
- `https://device.login.microsoftonline.com`

インターネットへの接続にプロキシー サーバーを経由する必要がある環境の場合、クライアント端末の WinHTTP のプロキシー サーバー設定にプロキシー サーバーを設定する必要があります。これは Microsoft Entra ハイブリッド参加のタスクがシステム コンテキストで動作し、WinHTTP の設定を利用するためです。Microsoft Entra ハイブリッド参加のタスクは認証を必要とするプロキシー サーバーには対応していませんので、認証を必要とするようにプロキシ サーバーが構成されている場合、認証を解除する必要があります。

クライアント端末で管理者権限でコマンド プロンプトを起動し、以下のコマンドを実行し、WinHTTP のプロキシ サーバーが設定されているか確認します。

```cmd
netsh winhttp show proxy
```

プロキシを利用してアクセスすることが必要な環境であるのにも関わらず、設定されていない場合、以下のコマンドを実行し、設定します。

```cmd
netsh winhttp set proxy proxy-server="<プロキシー サーバー>:<ポート>" bypass-list="<バイパスする URL>"
```

`<バイパスする URL>` はプロキシ サーバーを介さずにアクセスさせるサーバーの一覧です。必要に応じて指定します。例えばローカルと .test.com へのアクセスにはプロキシを経由させない場合には、`bypass-list="<local>;*.test.com"` というような記載を行います。

WinHTTP のプロキシー サーバー設定を実施した場合には、以下のタスクを手動で実行します。

パス : [タスクスケジューラ] – [タスクスケジューラ ライブラリ] – [Microsoft] – [Windows] – [Workplace Join]
タスク名 : Automatic-Device-Join

再度、ドメイン コントローラーで ADSI エディターを利用し、対象のコンピューター オブジェクトの userCertificate に何らかの値が書き込まれたかどうかを確認ください。以下の例は userCertificate に何らかの値が書き込まれた場合です。

<!-- TODO: スクリーンショット - [userCertificate に値が書き込まれた ADSI エディター画面] -->

### (1-4) Microsoft Entra Connect で同期対象になっていない

Microsoft Entra ハイブリッド参加を構成する対象のコンピューター オブジェクトが Microsoft Entra Connect の同期対象 OU に含まれている必要があります。含まれていない場合は同期対象 OU にコンピューター オブジェクトを含め、その後 Microsoft Entra Connect の同期間隔 (既定 30 分) を待って Microsoft Entra ID にデバイスが同期されたかを確認ください。

以上を確認した結果として、特に問題がない場合には、これまで確認された情報を併せサポートにお問い合わせることを検討ください。

## (2) Microsoft Entra ハイブリッド参加の対象のコンピューター オブジェクトが保留中の状態

Microsoft Entra ハイブリッド参加の対象のコンピューター オブジェクトが Microsoft Entra ID に登録されているが、Microsoft Entra 管理センターで以下の図の例のように [登録済み] の欄が "保留中" というステータスになっている場合には Microsoft Entra ハイブリッド参加が完了していない状態を疑います。

<!-- TODO: スクリーンショット - [デバイスが "保留中" の Microsoft Entra 管理センター画面] -->

Microsoft Entra Connect によりコンピューター オブジェクトが Microsoft Entra ID に同期され、その後、クライアントで再度 Automatic-Device-Join タスクが実行されることにより、デバイスの Microsoft Entra ID への登録 (Microsoft Entra ハイブリッド参加の処理) が完了します。コンピューター オブジェクトは同期されたものの、最終的な Join 処理が失敗、あるいはタスクが未実行の場合、Microsoft Entra 管理センターではデバイスはうえのように "保留中" という状態になります。

コンピューター オブジェクトが Microsoft Entra ID に同期された後に、ユーザーがログオフ/ログオンを実行していない場合タスクはまだ未実行であるため、処理が完了していないのは想定される動作です。そのため、一度ユーザーのログオフ、ログオンにより状態が変わるかを確認ください。ログオンすることによって、バックグラウンドで Automatic-Device-Join タスクが実行され、最終的な Join 処理が実施されることが期待できるためです。

もし、ユーザーによるログオフ/ログオンを実施しても、"保留中" の状態が変わらない場合、以下の Microsoft Entra ID 側のエンドポイントにアクセスできないことが原因として考えられます。

- `https://enterpriseregistration.windows.net`
- `https://login.microsoftonline.com`
- `https://device.login.microsoftonline.com`

このため、"(1-3) Microsoft Entra ハイブリッド参加に必要な Microsoft Entra ID のエンドポイントへアクセスできていない" の項を参照のうえ、WinHTTP プロキシの設定が行われているか確認ください。

以上を実施しても、デバイスの状態が "保留中" から変わらない場合、詳細調査が必要ですので、これまで確認された情報と合わせサポートにお問い合わせをすることを検討ください。

## (3) Microsoft Entra ハイブリッド参加によるシングル サインオンができない (Microsoft Entra ハイブリッド参加が動作していない)

Microsoft Entra ハイブリッド参加ができたコンピューターにログオンすることにより、ログオンしたユーザーはプライマリ リフレッシュ トークン (以後 PRT) を取得できます。PRT は Microsoft Entra ハイブリッド参加に通常利用する同期ユーザーがクライアント端末にログオンする際に Microsoft Entra ID へのユーザー認証に成功し、認証に成功したことを示すキャッシュ情報です。PRT の詳細については、以下の弊社技術情報を参照ください。

[プライマリ更新トークンとは](https://learn.microsoft.com/ja-jp/entra/identity/devices/concept-primary-refresh-token)

この PRT を正常に取得できない場合、以下のような事象が発生します。

- Intune の自動登録に失敗する
- 条件付きアクセス ポリシーで "Microsoft Entra ハイブリッド参加済みデバイスが必要" のコントールで拒否される
- Microsoft Entra ハイブリッド参加の端末からクラウド リソースへ SSO できない

PRT を正常に取得できているか (Microsoft Entra ハイブリッド参加が正しく完了しているか) は以下の確認事項を参照ください。

### (3-1) 本ブログにある (1) および (2) の事象が発生していない

うえの (1) および (2) を参照ください。

### (3-2) Microsoft Entra ID に同期されているオンプレミスの Active Directory のユーザーで端末にログオンする

コマンド プロンプトを起動し、`dsregcmd /status` コマンドを実行します。dsregcmd コマンドにはほかにもたくさんの出力の情報がありますが、まずは以下の項目を確認ください。

```
AzureAdJoined : YES    ← YES の場合、Microsoft Entra ID に正常に参加していると判断できます
DomainJoined  : YES    ← YES の場合、正常にオンプレミスの Active Directory に参加していると判断できます
AzureAdPrt    : NO     ← NO の場合、PRT を正常に取得できていないと判断できます
```

> [!NOTE]
> dsregcmd の出力に含まれる "AzureAdJoined" や "AzureAdPrt" などのフィールド名は旧名称 (Azure AD) に基づくものですが、現時点では変更されていません。

PRT を正常に取得できない場合の一般的な要因はユーザーのログオン タイミングで以下の Microsoft Entra ID 側のエンドポイントにアクセスできないことが考えられます。まずは、"(1-3) Microsoft Entra ハイブリッド参加に必要な Microsoft Entra ID のエンドポイントへアクセスできていない" の対応を参照ください。

- `https://enterpriseregistration.windows.net`
- `https://login.microsoftonline.com`
- `https://device.login.microsoftonline.com`

この結果、問題ない場合には詳細調査が必要ですので、以下の事項と合わせましてサポートにお問い合わせを検討ください。

- 事象は複数のユーザーで発生しているか、または特定のユーザーにのみ発生しているか
- 事象は特定のクライアント端末で発生しているかどうか
- 正常に PRT を取得できるユーザーがいる場合、PRT を取得できないユーザーがログオンしている端末で取得できるかどうか
- PRT は Microsoft Entra ハイブリッド参加を構成してから一度も正常に取得できていないかどうか

以上、Microsoft Entra ハイブリッド参加のマネージド構成のトラブルシューティングの参考になりましたら幸いです。

製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。

※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
