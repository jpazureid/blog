---
title: Microsoft Entra ハイブリッド参加の失敗時の初動調査方法について (フェデレーション編)
date: 2020-05-10 09:00
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

# Microsoft Entra ハイブリッド参加の失敗時の初動調査方法について (フェデレーション編)

> [!NOTE]
> 本記事は 2020 年 5 月に公開された記事を、2023 年 7 月の Microsoft Entra ID（旧 Azure Active Directory）への名称変更を反映して更新したものです。技術的な動作や手順に変更はありません。
> 旧名称「Hybrid Azure AD Join」は、現在「Microsoft Entra ハイブリッド参加（Microsoft Entra hybrid join）」に変更されています。

こんにちは、Azure & Identity サポート チームの 姚 ( ヨウ ) です。

前回の [Microsoft Entra ハイブリッド参加の失敗時の初動調査方法について (マネージド編)](../../azure-active-directory/troubleshoot-microsoft-entra-hybrid-join-managed.md) に続き、今回は Microsoft Entra ハイブリッド参加（旧 Hybrid Azure AD Join）のフェデレーション環境での初期調査方法を紹介します。

以下にご案内する初動調査によって問題が解決することが一番ですが、問題が解決しない場合もここで案内した初期切り分け情報を含めてお問い合わせをすることで、弊社サポートへスムーズな形で調査を依頼することができます。

はじめに、クライアント端末でフェデレーションの Microsoft Entra ハイブリッド参加として構成が完了するまでの流れを以下にまとめました。

**Microsoft Entra ハイブリッド参加として構成が完了するまでの流れ**

1. クライアント端末をオンプレミス Active Directory ドメインに参加します。

   ＊この時点でクライアント端末で Microsoft Entra ハイブリッド参加を実施するタスクが有効になり、ユーザー ログオンのタイミングで実行するように設定されます。

2. Microsoft Entra ID に同期済みのユーザーでクライアント端末にログオンします。このとき Microsoft Entra ハイブリッド参加のタスクが動作し、以下のような処理が行われます。

   2-1. オンプレミス Active Directory にある SCP (Service Connection Point) を検出し、SCP にある登録先の Microsoft Entra ID テナントの情報を取得します。

   2-2. 自己署名の証明書を作成し、クライアント端末のコンピューター オブジェクトの userCertificate 属性に証明書の情報を格納します。

   2-3. AD FS サーバーでデバイスの認証を実施し、Microsoft Entra ID へデバイスを登録するために必要なトークンを取得します。

   2-4. AD FS サーバーから取得したトークンを Microsoft Entra ID に渡し、Microsoft Entra Device Registration Service (DRS) で対象デバイスのオブジェクトを作成し、デバイスの登録を完了します。

   ＊ フェデレーション環境でも Windows 10 1803 以降であれば Microsoft Entra Connect（旧 Azure AD Connect）によるコンピューター オブジェクトの同期による Microsoft Entra ハイブリッド参加の構成も可能です。コンピューターオブジェクトの同期が構成されていれば 2-2 が完了後の次の同期サイクルでコンピューター オブジェクトは Microsoft Entra ID に同期されます。2-3 と 2-4 の処理に何らかの事情で失敗した場合 (クレーム ルールの登録が行われていない場合や、コンピューター アカウントによる認証処理に失敗した場合)、Windows 10 1803 以降のクライアント端末はマネージドの構成と同じように Microsoft Entra ID でデバイス認証が行われ、デバイスが登録されます。

   ＊この時点で AzureADJoined が YES になります。

3. クライアント端末からログオフし、再度ログオンしたタイミングで Microsoft Entra ID でのユーザー認証が実施され、AzureADPrt を取得します。

   ＊この時点で AzureADPrt が YES になります。

> [!NOTE]
> 上記の "AzureADJoined" や "AzureADPrt" は dsregcmd コマンドの出力フィールド名であり、旧名称 (Azure AD) に基づく内部的な名称です。現時点では変更されていません。

以上の構成が完了するまでの流れを踏まえて Microsoft Entra ハイブリッド参加に失敗する際の要因となる各症状別に初動調査方法を紹介していきます。

## (1) オンプレミスのコンピューターが Microsoft Entra ID のデバイス一覧に存在しない

フェデレーションの Microsoft Entra ハイブリッド参加環境では、AD FS を経由したデバイス認証が完了してから、Microsoft Entra ID にデバイスが登録 (デバイス オブジェクトが生成) されます。マネージドの Microsoft Entra ハイブリッド参加と同様に、正常に Microsoft Entra ハイブリッド参加できているかの最初の確認としては、[Microsoft Entra 管理センター](https://entra.microsoft.com) を開き **[ID]** > **[デバイス]** > **[すべてのデバイス]** で結合の種類が「Microsoft Entra hybrid joined」となっている状態で対象のコンピューターが存在するか確認します。

![Microsoft Entra 管理センターのデバイス一覧画面](./troubleshoot-microsoft-entra-hybrid-join-federated/entra-admin-center-devices.png)

対象のデバイスが Microsoft Entra 管理センターのデバイス欄に存在しない場合、デバイス登録の処理 ("Microsoft Entra ハイブリッド参加として構成が完了するまでの流れ" の 2 の処理) のどこかで失敗している可能性が考えられます。

その場合、以下の順番に確認を進めてください。

### (1-1) Microsoft Entra ハイブリッド参加の処理で、デバイスを Microsoft Entra ID に参加させるタスクが有効になっていない

Microsoft Entra ハイブリッド参加の Join 処理はクライアント端末の以下のタスクによって実施されます。

パス : [タスクスケジューラ] – [タスクスケジューラ ライブラリ] – [Microsoft] – [Windows] – [Workplace Join]
タスク名 : Automatic-Device-Join

このタスクはオンプレミスの Active Directory に参加するタイミングで有効になりますので、ドメイン参加後にこのタスクは有効かどうかを確認ください。もし、オンプレミス Active Directory に参加したにも関わらず、当該タスクが有効ではない場合、この時点でサポートにお問い合わせを検討ください。

当該タスクが有効の場合、次の (1-2) の確認事項に進みます。

### (1-2) Service Connection Point (SCP) が正常に構成されていない

SCP はクライアント端末が Microsoft Entra ハイブリッド参加のデバイス登録する先の Microsoft Entra ID テナントの情報が書き込まれています。

フェデレーションの Microsoft Entra ハイブリッド参加の場合、SCP には Microsoft Entra ID 側のフェデレーション ドメイン名が書き込まれているべきです。

(1-1) で確認したタスクが、SCP の情報を元に Microsoft Entra ID へのエンドポイントを確認し、コンピューター オブジェクトの userCertificate 属性に必要な情報を書き込みます。ここまではマネージドの Microsoft Entra ハイブリッド参加と一緒です。

フェデレーションの Microsoft Entra ハイブリッド参加の場合、SCP のドメイン情報をもとにデバイスの認証を行いますが、フェデレーション ドメインであるため、AD FS へ認証がリダイレクトされます。もし、SCP が正常に構成されていない場合、userCertificate 属性は書き込まれない可能性もありますし、AD FS へ正常に認証がリダイレクトされない可能性もあります。

はじめに、SCP が設定されている場所を確認します。SCP は、運用設計に応じてオンプレミス Active Directory の構成パーティションか、またはクライアント端末のレジストリ キー値のいずれかで設定ができます。

以下の手順で SCP がそれぞれの場所に設定されているかどうかを確認してください。

両方に設定されていなくとも Active Directory の構成パーティション、またはクライアント端末のレジストリ キー値のいずれか設定されていれば問題はありません。もし、SCP の設定に問題はなければ、次の (1-3) の確認事項に進みます。

#### Active Directory の構成パーティションの確認

1. ドメイン コントローラーに管理者ユーザーでログオンし、管理者で PowerShell を起動します
2. 以下のコマンドを実行します

```powershell
$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,CN=Configuration,DC=xxxxxxx,DC=xxxxxx"
$scp.Keywords
```

DC=xxxxxxx,DC=xxxxxx にはオンプレミス Active Directory のドメイン名を入力します。contoso.com の場合、DC=contoso,DC=com と入力します。

例:

```powershell
$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,CN=Configuration,DC=contoso,DC=com"
$scp.Keywords
```

コマンドの出力結果として、以下のように Microsoft Entra ID テナントのドメイン名 (azureADName) とテナント ID (azureADId) の情報が表示されていれば、正常に構成されていると判断できます。フェデレーションの Microsoft Entra ハイブリッド参加であるため、azureADName はフェデレーション ドメインが設定されている必要があります。

```
azureADName:<フェデレーション ドメイン名>
azureADId:<Microsoft Entra ID テナント ID>

例:
azureADName:microsoft.com
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

TenantName にはフェデレーション ドメイン名と TenantId には Microsoft Entra ID テナント ID の両方が設定されている必要があります。

> [!NOTE]
> レジストリ パスに含まれる "AAD" は旧名称 (Azure Active Directory) の略称に基づくものですが、現時点ではこのパスに変更はありません。

以上の確認を実施した結果、SCP が正常に設定されている場合、次の (1-3) に進みます。

### (1-3) フェデレーションの Microsoft Entra ハイブリッド参加に必要な Microsoft Entra ID および AD FS サーバーのエンドポイントへアクセスできていない

フェデレーションの Microsoft Entra ハイブリッド参加の場合、正常にデバイス登録が完了するためには、以下の Microsoft Entra ID および AD FS サーバーへアクセスできる必要があります。

- `https://enterpriseregistration.windows.net`
- `https://login.microsoftonline.com`
- `https://device.login.microsoftonline.com`
- `<AD FS のフェデレーション サービスのエンドポイント>` (例 : `https://sts.contoso.com`)

これらのエンドポイントへの接続にプロキシー サーバーを経由する必要がある環境の場合、マネージドの Microsoft Entra ハイブリッド参加と同様クライアント端末の WinHTTP のプロキシー サーバー設定にプロキシー サーバーを設定する必要があります。復習となりますが、これは Microsoft Entra ハイブリッド参加のタスクがシステム コンテキストで動作し、WinHTTP の設定を利用するためです。さらに、AD FS 環境の場合には、AD FS でコンピューターアカウントを認証し、デバイス登録を行うために、SYSTEM アカウントのプロキシについても併せて設定が必要です。Microsoft Entra ハイブリッド参加のタスクは認証を必要とするプロキシー サーバーには対応していませんので、認証を必要とするようにプロキシ サーバーが構成されている場合、認証を解除する必要があります。

#### WinHTTP プロキシ

クライアント端末で管理者権限でコマンド プロンプトを起動し、以下のコマンドを実行し、適切なプロキシ サーバーが設定されているか確認します。

```cmd
netsh winhttp show proxy
```

プロキシを利用してアクセスすることが必要な環境であるのにも関わらず、設定されていない場合、以下のコマンドを実行し、設定します。

```cmd
netsh winhttp set proxy proxy-server="<プロキシー サーバー>:<ポート>" bypass-list="<バイパスする URL>"
```

`<バイパスする URL>` はプロキシ サーバーを介さずにアクセスさせるサーバーの一覧です。必要に応じて指定します。なお、AD FS のフェデレーション サービスのエンドポイントへのアクセスにプロキシー サーバーを利用しない場合、当該エンドポイントをバイパスの URL に含めてください。

例えば、test.com ドメインリソースへのアクセスにプロキシを経由させない場合には、`bypass-list="*.test.com"` のように記載します。また、AD FS のフェデレーション サービスのエンドポイントが `https://sts.contoso.com` の場合、`bypass-list="sts.contoso.com"` のように記載します。`bypass-list="*.test.com;sts.contoso.com"` のように記載することで、test.com のドメインリソース、および sts.contoso.com への接続時にプロキシを経由しないようにすることができます。

#### SYSTEM アカウントのプロキシ

クライアント端末で管理者権限でコマンド プロンプトを起動し、以下のコマンドを実行し、適切なプロキシ サーバーが設定されているか確認します。

```cmd
bitsadmin /util /getieproxy LOCALSYSTEM
```

プロキシを利用してアクセスすることが必要な環境であるのにも関わらず、設定されていない場合、以下のコマンドを実行し、設定します。

```cmd
bitsadmin /util /setieproxy LOCALSYSTEM MANUAL_PROXY "<プロキシー サーバー>:<ポート>" "<バイパスする URL>"
```

上記 WinHTTP プロキシと同じように、プロキシ サーバーとバイパスする URL の指定を行います。

プロキシー サーバーを設定しましたら、以下のタスクを手動で実行します。

パス : [タスクスケジューラ] – [タスクスケジューラ ライブラリ] – [Microsoft] – [Windows] – [Workplace Join]
タスク名 : Automatic-Device-Join

再度、[Microsoft Entra 管理センター](https://entra.microsoft.com) を開き **[ID]** > **[デバイス]** > **[すべてのデバイス]** でデバイス オブジェクトが生成されたかどうかを確認します。

もし、引き続きデバイス オブジェクトが生成されない場合には、これまで確認された情報を合わせ、サポートにお問い合わせすることを検討ください。

## (2) Microsoft Entra ハイブリッド参加によるシングル サインオンができない (Microsoft Entra ハイブリッド参加が動作していない)

Microsoft Entra ハイブリッド参加ができたコンピューターにログオンすることにより、ログオンしたユーザーはプライマリ リフレッシュ トークン (以後 PRT) を取得できます。PRT は Microsoft Entra ハイブリッド参加に通常利用する同期ユーザーがクライアント端末にログオンする際に Microsoft Entra ID へのユーザー認証に成功し、認証に成功したことを示すキャッシュ情報です。

PRT の詳細については、以下の弊社技術情報を参照ください。

[プライマリ更新トークンとは](https://learn.microsoft.com/ja-jp/entra/identity/devices/concept-primary-refresh-token)

この PRT を正常に取得できない場合、以下のような事象が発生します。

- Intune の自動登録に失敗する
- 条件付きアクセス ポリシーで "Microsoft Entra ハイブリッド参加済みデバイスが必要" のコントールで拒否される
- Microsoft Entra ハイブリッド参加の端末からクラウド リソースへ SSO できない

PRT を正常に取得できているか (Microsoft Entra ハイブリッド参加が正しく完了しているか) は以下の確認事項をもとに判断できます。

### (2-1) 本ブログにある (1) の事象が発生していないこと

うえの (1) を参照ください。

### (2-2) PRT を正常に取得しているかどうかを確認する

Microsoft Entra ID にも同期されているオンプレミスの Active Directory のユーザーで端末にログオンします。コマンド プロンプトを起動し、`dsregcmd /status` コマンドを実行します。

dsregcmd コマンドにはほかにもたくさんの出力の情報がありますが、まずは以下の項目を確認ください。

```
AzureAdJoined : YES    ← YES の場合、Microsoft Entra ID に正常に参加していると判断できます
DomainJoined  : YES    ← YES の場合、正常にオンプレミスの Active Directory に参加していると判断できます
AzureAdPrt    : NO     ← NO の場合、PRT を正常に取得できていないと判断できます
```

> [!NOTE]
> dsregcmd の出力に含まれる "AzureAdJoined" や "AzureAdPrt" などのフィールド名は旧名称 (Azure AD) に基づくものですが、現時点では変更されていません。

PRT を正常に取得できない場合の一般的な要因は AD FS によるユーザー認証が正常に完了していないことが考えられます。この場合、AD FS のログを含めて詳細な調査が必要ですので、以下の事項と合わせましてサポートにお問い合わせを検討ください。

- 事象は複数のユーザーで発生しているか、または特定のユーザーにのみ発生しているか
- 事象は特定のクライアント端末で発生しているかどうか
- 正常に PRT を取得できるユーザーがいる場合、PRT を取得できないユーザーがログオンしている端末で取得できるかどうか
- PRT は Microsoft Entra ハイブリッド参加を構成してから一度も正常に取得できていないかどうか
- Microsoft Entra ハイブリッド参加にかかわらず、フェデレーション ドメインに所属するユーザーは AD FS サーバーを経由し、正常に Microsoft Entra 管理センターにサインインできるかどうか

以上、Microsoft Entra ハイブリッド参加のフェデレーション構成のトラブルシューティングの参考になりましたら幸いです。

製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。

※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
