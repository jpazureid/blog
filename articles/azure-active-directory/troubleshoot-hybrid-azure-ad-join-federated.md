---
title: Hybrid Azure AD Join 失敗の初動調査方法について (フェデレーション編)
date: 2020-05-10
tags:
  - Azure AD
  - Hybrid Azure AD Join 
  - Troubleshooting
---

# **Hybrid Azure AD Join 失敗の初動調査方法について (フェデレーション編)**

こんにちは、Azure & Identity サポート チームの 姚 ( ヨウ ) です。

前回の Hybrid Azure AD Join 失敗時の初動調査方法について (マネージド編) に続き、今回は Hybrid Azure AD Join (以下 HAADJ) のフェデレーション環境での初期調査方法を紹介します。

以下にご案内する初動調査によって問題が解決することが一番ですが、問題が解決しない場合もここで案内した初期切り分け情報を含めてお問い合わせをすることで、弊社サポートへスムーズな形で調査を依頼することができます。

はじめに、クライアント端末でフェデレーションの HAADJ として構成が完了するまでの流れを以下にまとめました。

HAADJ として構成が完了するまでの流れ

1. クライアント端末をオンプレミス Active Directory ドメインに参加します。

   ＊この時点でクライアント端末で Hybrid Azure AD Join を実施するタスクが有効になり、ユーザー ログオンのタイミングで実行するように設定されます。

2. Azure AD に同期済みのユーザーでクライアント端末にログオンします。このとき Hybrid Azure AD Join のタスクが動作し、以下のような処理が行われます。

   2-1. オンプレミス Active Directory にある SCP (Service Connection Point) を検出し、SCP にある登録先の Azure AD テナントの情報を取得します。

   2-2. 自己署名の証明書を作成し、クライアント端末のコンピューター オブジェクトの userCertificate 属性に証明書の情報を格納します。

   2-3. AD FS サーバーでデバイスの認証を実施し、Azure AD へデバイスを登録するために必要なトークンを取得します。

   2-4. AD FS サーバーから取得したトークンを Azure AD に渡し、Azure AD Device Registration Service (DRS) で対象デバイスのオブジェクトを作成し、デバイスの登録を完了します。
   
   ＊ フェデレーション環境でも Windows 10 1803 以降であれば Azure AD Connect によるコンピューター オブジェクトの同期による HAADJ の構成も可能です。コンピューターオブジェクトの同期が構成されていれば  2-2 が完了後の次の同期サイクルでコンピューター オブジェクトは Azure AD に同期されます。 2-3 と 2-4 の処理に何らかの事情で失敗した場合 (クレーム ルールの登録が行われていない場合や、コンピューター アカウントによる認証処理に失敗した場合)、 Windows 10 1803 以降のクライアント端末はマネージドの構成と同じように Azure AD でデバイス認証が行われ、デバイスが登録されます。

   ＊この時点で AzureADJoined が YES になります。

3. クライアント端末からログオフし、再度ログオンしたタイミングで Azure AD でのユーザー認証が実施され、AzureADPrt を取得します。
  
   ＊この時点で AzureADPrt が YES になります。

以上の構成が完了するまでの流れを踏まえて Hybrid Azure AD Join に失敗する際の要因となる各症状別に初動調査方法を紹介していきます。

## **(1) オンプレミスのコンピューターが Azure AD のデバイス一覧に存在しない**

フェデレーションの HAADJ 環境では、AD FS を経由したデバイス認証が完了してから、Azure AD にデバイスが登録 (デバイス オブジェクトが生成) されます。
マネージドの HAADJ と同様に、正常に HAADJ できているかの最初の確認としては、 Azure ポータルを開き [Azure Active Directory] ブレードの [デバイス] 欄で結合の種類が 
Hybrid Azure AD Joined となっている状態で対象のコンピューターが存在するか確認します。

![](.\troubleshoot-hybrid-azure-ad-join-federated/device-list-azure-portal.png)

対象のデバイスが [Azure Active Directory] ブレードの [デバイス] 欄に存在しない場合、デバイス登録の処理 ("HAADJ として構成が完了するまでの流れ" の 2 の処理) のどこかで失敗している可能性が考えられます。

その場合、以下の順番に確認を進めてください。

### (1-1) HAADJ の処理で、デバイスを Azure AD Join するタスクが有効になっていない

HAADJ の Join 処理はクライアント端末の以下のタスクによって実施されます。

パス : [タスクスケジューラ] – [タスクスケジューラ ライブラリ] – [Microsoft] – [Windows] – [Workplace Join] 
タスク名 : Automatic-Device-Join

このタスクはオンプレミスの Active Directory に参加するタイミングで有効になりますので、ドメイン参加後にこのタスクは有効かどうかをご確認ください。
もし、オンプレミス Active Directory に参加したにも関わらず、当該タスクが有効ではない場合、この時点でお手数ですが、弊社サポートにお問い合わせいただきますようお願いいたします。

もし、当該タスクが有効の場合、次の (1-2) の確認事項にお進みください。

### (1-2) Service Connection Point (SCP) が正常に構成されていない

SCP はクライアント端末が HAADJ のデバイス登録する先の Azure AD テナントの情報が書き込まれています。

フェデレーションの HAADJ の場合、SCP には Azure AD 側のフェデレーション ドメイン名が書き込まれているべきです。

(1-1) で確認したタスクが、SCP の情報を元に Azure AD へのエンドポイントを確認し、コンピューター オブジェクトの userCertificate 属性に必要な情報を書き込みます。
ここまではマネージドの HAADJ と一緒です。

フェデレーションの HAADJ の場合、SCP のドメイン情報をもとにデバイスの認証を行いますが、フェデレーション ドメインであるため、AD FS へ認証がリダイレクトされます。
もし、SCP が正常に構成されていない場合、userCertificate 属性は書き込まれない可能性もありますし、AD FS へ正常に認証がリダイレクトされない可能性もあります。

はじめに、SCP が設定されている場所を確認します。
SCP は、運用設計に応じてオンプレミス Active Directory の構成パーティションか、またはクライアント端末のレジストリ キー値のいずれかで設定ができます。

以下の手順で SCP がそれぞれの場所に設定されているかどうかを確認してください。

両方に設定されていなくとも Active Directory の構成パーティション、またはクライアント端末のレジストリ キー値のいずれか設定されていれば問題はありません。
もし、SCP の設定に問題はなければ、次の (1-3) の確認事項にお進みください。

#### Active Directory の構成パーティションの確認

1. ドメイン コントローラーに管理者ユーザーのログオンし、管理者で PowerShell を起動します。
2. 以下のコマンドを実行します。

```PowerShell
$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,CN=Configuration,DC=xxxxxxx,DC=xxxxxx"
$scp.Keywords

DC=xxxxxxx,DC=xxxxxx にはオンプレミス Active Directory のドメイン名を入力します。
contoso.com の場合、DC=contoso,DC=com  と入力します。

例 :

$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,CN=Configuration,DC=contoso,DC=com "
$scp.Keywords
```

コマンドの出力結果として、以下のように Azure AD テナントのドメイン名 (azureADName) とテナント ID (azureADId) の情報が表示されていれば、正常に構成されている判断できます。
フェデレーションの HAADJ であるため、azureADName はフェデレーション ドメインが設定されている必要があります。

```PowerShell
azureADName:<フェデレーション ドメイン名>
azureADId:<Azure AD テナント ID>

例 : 
azureADName:microsoft.com
azureADId:72f988bf-86f1-41af-91ab-2d7cd011db47
```

#### クライアント端末のレジストリ キー値の確認

クライアント端末の以下の 2 つのレジストリー値に Azure AD テナントの情報が設定しているかどうかを確認します。

- レジストリー キー : KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CDJ\AAD
  - 値 : TenantId
  - 種類 : REG_SZ
  - 値 : TenantName
  - 種類 : REG_SZ

TenantName にはフェデレーション ドメイン名と TenantId には Azure AD テナント ID の両方が設定されている必要があります。

以上の確認を実施した結果、 SCP が正常に設定されている場合、次の (1-3) にお進みください。

### (1-3) フェデレーションの HAADJ に必要な Azure AD および AD FS サーバーのエンドポイントへアクセスできていない

フェデレーションの HAADJ の場合、正常にデバイス登録が完了するためには、以下の Azure AD および AD FS サーバーのへアクセスできる必要があります。

```
https://enterpriseregistration.windows.net
https://login.microsoftonline.com
https://device.login.microsoftonline.com
<AD FS のフェデレーション サービスのエンドポイント> (例 : https://sts.contoso.com)
```

これらのエンドポイントへの接続にプロキシー サーバーを経由する必要がある環境の場合、マネージド HAADJ と同様クライアント端末の WinHTTP のプロキシー サーバー設定にプロキシー サーバーを設定する必要があります。
復習となりますが、これは HAADJ のタスクがシステム コンテキストで動作し、 WinHTTP の設定を利用するためです。
さらに、AD FS 環境の場合には、AD FS でコンピューターアカウントを認証し、デバイス登録を行うために、SYSTEM アカウントのプロキシについても併せて設定が必要です。
HAADJ のタスクは認証を必要とするプロキシー サーバーには対応していませんので、認証を必要とするようにプロキシ サーバーが構成されている場合、認証を解除する必要があります。

#### WinHTTP プロキシ
クライアント端末で管理者権限でコマンド プロンプトを起動し、以下のコマンドを実行し、適切なプロキシ サーバーが設定されているか確認します。

```
netsh winhttp show proxy
```

プロキシを利用してアクセスすることが必要な環境であるのにも関わらず、設定されていない場合、以下のコマンドを実行し、設定します。

```
netsh winhttp set proxy proxy-server="<プロキシー サーバー>:<ポート>" bypass-list="<バイパスする URL>"
```

<バイパスする URL> はプロキシ サーバーを介さずにアクセスさせるサーバーの一覧です。必要に応じて指定します。
なお、AD FS のフェデレーション サービスのエンドポイントへのアクセスにプロキシー サーバーを利用しない場合、当該エンドポイントをバイパスの URL に含めてください。

例えば、ローカルと .test.com へのアクセスにはプロキシを経由させない場合には、 bypass-list=”test.com” というような記載を行います。
また、AD FS のフェデレーション サービスのエンドポイントは https://sts.contoso.com の場合、bypass-list=”*.sts.contoso..com” というように記載します。


#### SYSTEM アカウントのプロキシ
クライアント端末で管理者権限でコマンド プロンプトを起動し、以下のコマンドを実行し、適切なプロキシ サーバーが設定されているか確認します。

```
bitsadmin /util /getieproxy LOCALSYSTEM
```

プロキシを利用してアクセスすることが必要な環境であるのにも関わらず、設定されていない場合、以下のコマンドを実行し、設定します。

```
bitsadmin /util /setieproxy LOCALSYSTEM MANUAL_PROXY "<プロキシー サーバー>:<ポート> "<バイパスする URL>"
```

上記 WinHTTP Proxy と同じように、プロキシ サーバーとバイパスする URL を指定を行います。

プロキシー サーバーを設定いたしましたら、以下のタスクを手動で実行します。

パス : [タスクスケジューラ] – [タスクスケジューラ ライブラリ] – [Microsoft] – [Windows] – [Workplace Join]
タスク名 : Automatic-Device-Join

再度、Azure ポータルを開き [Azure Active Directory] ブレードの [デバイス] 欄でデバイス オブジェクトが生成されたかどうかを確認します。

もし、引き続きデバイス オブジェクトが生成されない場合には、これまで確認された情報を合わせ、サポートにお問い合わせすることをご検討ください。

## **(2) HAADJ によるシングル サインオンができない (HAADJ が動作していない)**

HAADJ ができたコンピューターにログオンすることにより、ログオンしたユーザーはプライマリー リフレッシュ トークン (以後 PRT) を取得できます。
PRT は HAADJ に通常利用する同期ユーザーがクライアント端末にログオンする際に Azure AD へのユーザー認証に成功し、認証に成功したことを示すキャッシュ情報です。

PRT の詳細については、以下の弊社技術情報をご参照ください。

[プライマリ更新トークンとは](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/concept-primary-refresh-token)

この PRT を正常に取得できない場合、以下のような事象が発生します。

- Intune の自動登録に失敗する
- 条件付きアクセス ポリシーで “ハイブリッド Azure AD 参加済みデバイス” のコントールで拒否される
- Hybrid Azure AD Join の端末からクラウド リソースへ SSO できない

PRT を正常に取得できているか (HAADJ が正しく完了しているか) は以下の確認事項をもとに判断できます。

(2-1) 本ブログにある (1) の事象が発生していないこと
次に、(2-2) PRT を正常に取得しているかどうかを確認します

Azure AD にも同期されているオンプレミスの Active Directory のユーザーで端末にログオンします。
コマンド プロンプトを起動し、dsregcmd /status コマンドを実行します。

dsregcmd コマンドにはほかにもたくさんの出力の情報がありますが、まずは以下の項目をご確認ください。

```
AzureAdJoined : YES <<<<<<<<<<<< AzureAdJoined は YES になっており、Azure AD に正常に Join していると判断できます
DomainJoined : YES <<<<<<<<<<<< DomainJoined は YES になっており、正常にオンプレミスの Active Directory に参加していると判断できます
AzureAdPrt : NO <<<<<<<<<<<< AzureAdPrt は NO になっている場合、PRT を正常に取得できていないと判断できます
```

PRT を正常に取得できない場合の一般的な要因は AD FS によるユーザー認証が正常に完了していないことが考えられます。
この場合、AD FS のログを含めて詳細な調査を必要ですので、以下の事項と合わせましてサポートにお問い合わせをご検討ください。

- 事象は複数のユーザーで発生しているか、または特定のユーザーにのみ発生しているか
- 事象は特定のクライアント端末で発生しているかどうか
- 正常に PRT を取得できるユーザーがいる場合、PRT を取得できないユーザーがログオンしている端末で取得できるかどうか
- PRT は HAADJ を構成してから一度も正常に取得できていないかどうか
- HAADJ にかかわらず、フェデレーション ドメインに所属するユーザーは AD FS サーバーを経由し、正常に Azure ポータルにサインインできるかどうか

以上、HAADJ のフェデレーション構成のトラブシューティングの参考になりましたら幸いです。

製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。
※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。