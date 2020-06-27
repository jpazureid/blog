---
title: Azure AD Mailbag: リモート ワークにおいてデバイス ベースの条件付きアクセスを使用する際のよくある質問
date: 2020-06-27
tags:
  - Azure AD
  - Hybrid Azure AD Join
  - Conditional Access
  - AD FS
  - Federated Domain
  - Managed Domain
---

> 本記事は、 2020 年 6 月 12 日に Azure Active Directory Identity Blog に公開された記事 (Azure AD Mailbag: Frequent questions about using device-based Conditional Access for remote work) を翻訳したものです。原文は [こちら](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/azure-ad-mailbag-frequent-questions-about-using-device-based/ba-p/1257344) より参照ください。

# Azure AD Mailbag: リモート ワークにおいてデバイス ベースの条件付きアクセスを使用する際のよくある質問

皆さんこんにちは！今回はデバイス ベースの条件付きアクセスのシナリオに関し、よく頂戴するご質問にお答えしていきたいと思います。ここ数ヶ月間、従業員が安全にリモート ワークを実施できるよう多くの方が新たな課題に取り組まれるとともに、条件付きアクセスが適切な管理を実現するための重要な要素であるということを伺いました。先日の条件付きアクセスに関するベスト プラクティスの [ブログ](https://jpazureid.github.io/blog/azure-active-directory/faq-using-ca-to-secure-remote-access/) に対しても、素晴らしい反響を頂戴しました。もしまだご自身の環境で条件付きアクセス ポリシーを構成中であれば、以下の内容をぜひご覧ください。どのようにしてデバイス アクセスをより安全なものにしていくか、詳細な内容を Teppei から紹介いたします。

----

こんにちは。

Azure Active Directory (Azure AD) の Get-To-Production チームならびに Azure AD デバイス チームに所属する Teppei Yamashita と申します。最近、安全なリモートワークを実現するため、デバイス ベースの条件付きアクセス (条件付きアクセスポリシーを構成する方法の一つ) とハイブリッド Azure AD 参加を構成するお客様が増えてきました。ここで我々 Azure AD デバイス チームがお客様と密に連携する中で得たベスト プラクティスとヒントを共有させていたこうと思います。

## 質問 1: なぜデバイス ベースの条件付きアクセスと Hybrid Azure AD 参加が重要なのか？

これらの機能により、IT およびセキュリティ管理者は、Azure AD と連携しているアプリケーションへのすべてのアクセス要求が信頼されたデバイスから来ているということを確認することができます。ハイブリッド Azure AD 参加したバイスは、Configuration Manager やグループ ポリシーなどの管理ソリューションを使用して制御が実施されていることが前提となっているため、「信頼されたデバイス」となります。これは既存のオンプレミスへの投資をクラウドに拡張するに最適な方法です。

## 質問 2: どのようにすればハイブリッド Azure AD 参加するようにデバイスを構成できますか？

貴社環境で利用している　[認証方法](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/choose-ad-authn#comparing-methods) (フェデレーション認証またはクラウド認証) によって、前提条件に違いがあります。デバイスをハイブリッド Azure AD 参加済みとして構成するには、次のチュートリアルを参照ください。

- [マネージド ドメイン用のハイブリッド Azure Active Directory 参加の構成](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-managed-domains) - 一般的に Sync Join と呼ばれる方法です。
- [フェデレーション ドメイン用のハイブリッド Azure Active Directory 参加の構成](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-federated-domains) - 一般的に Federated Join と呼ばれる方法です。
- [ハイブリッド Azure AD 参加の検証を制御する](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-control) は、ハイブリッド Azure AD 参加を組織全体で一度に有効にする前に、徐々に検証を行うなどの制御を行いたいお客様の参考になります。

## 質問 3: どうすればデバイス ベースの条件付きアクセスを構成できますか？

デバイス ベースの条件付きアクセスを実現するために、2 種類の "許可" のアクセス制御設定が存在します。

**Hybrid Azure AD Join を使用したデバイスが必要**

条件付きアクセス ポリシーで、**Hybrid Azure AD Join を使用したデバイスが必要** を選択することで、ハイブリッド Azure AD 参加デバイスからのみ指定したクラウド アプリにアクセスさせることができます。詳細については、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/require-managed-devices) を参照ください。

![dsregcmd /status](./fq-device-based-ca-for-remote-work/Devices1.png)

**デバイスは準拠しているとしてマーク済みである必要があります**

さらにセキュリティを高めるために、すべての組織で **デバイスは準拠しているとしてマーク済みである必要があります** の設定の利用を検討いただければと思います。このオプションを利用すると、デバイスがモバイル デバイス管理 (例えば Intune) ポリシーに準拠済みであることが要求されます。詳細については、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/require-managed-devices#require-device-to-be-marked-as-compliant) を参照ください。

![dsregcmd /status](./fq-device-based-ca-for-remote-work/Devices1.png)

## 質問 4: ハイブリッド Azure AD 参加のデバイス登録処理はどのような流れで行われますか？VPN 経由でも動作しますか？

ハイブリッド Azure AD 参加のデバイス登録処理では、デバイスが企業ネットワークに接続されている必要があります。VPN 経由でも動作しますが、いくつか注意が必要です。リモート ワークの状況下にて、ハイブリッド Azure AD 参加登録処理にトラブルが生じ、問題解決の支援を要望されたお客様もいらっしゃいます。ここでは、登録処理の実行中に行われている内部処理を掘り下げて解説させていただきます。

### クラウド認証の環境 (Azure AD パスワード ハッシュ同期またはパススルー認証を使用)

この登録フローは Sync Join とも呼ばれます。

1. Windows 10 は、ユーザーがデバイスにログオンすると SCP レコードを探索します。

    - デバイスはまず、レジストリ [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CDJ\AAD] に保存されているクライアント側の CSP を用いてテナント情報を取得しようとします。詳細については、[こちらドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-control) を参照ください。

    - レジストリが取得できなかった場合、デバイスはオンプレミスの Active Directory と通信して、サービス接続ポイント (SCP) からテナントの情報を取得します。SCP の構成については、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-manual#configure-a-service-connection-point) を参照ください。

        注意: Active Directory で SCP を有効にし、クライアント側の SCP は最初の検証作業の時のみ利用することをお勧めします。

2. Windows 10 は、__システムのコンテキスト__ で Azure AD と通信し、Azure AD に対して認証を試行します。

    デバイスがシステム アカウントの下でマイクロソフトのリソースにアクセスできているかについては、[Test Device Registration Connectivity スクリプト](https://gallery.technet.microsoft.com/Test-Device-Registration-3dc944c0) を使用することでご確認いただけます。

3. Windows 10 は自己署名証明書を生成し、オンプレミスの Active Directory 内のコンピューター オブジェクトに格納します。これにはドメイン コントローラーとの通信が必要です。

4. 証明書をもつデバイス オブジェクトが、Azure AD Connect を介して Azure AD に同期されます。同期サイクルは既定で 30 分毎に行われますが、Azure AD Connect の構成によって異なります。詳細については、[このドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-sync-configure-filtering#organizational-unitbased-filtering) を参照ください。

5. この段階で、Azure ポータルの [デバイス] ブレードに [保留中] 状態のデバイスが表示されるはずです。

6. 次回の Windows 10 へのユーザー ログイン時に、ハイブリッド Azure AD 参加のデバイス登録が完了します。

    注意: VPN を使用しており、ログオフ/ログインによってドメインとの接続が切断された場合は、手動で登録を実行することもできます。

    管理者権限で起動したプロンプトから、dsregcmd /join を実行するか、PSExec 経由でリモートから PC に接続して実行ください。  
    例: PsExec -s \\win10client01 cmd, dsregcmd /join

### フェデレーション ドメイン環境 (AD FS またはその他の WS-Fed/WS-Trust に対応した IdP を使用)

この登録フローは　Federataed Join とも呼ばれます。

1. Windows 10 は、ユーザーがデバイスにログインすると SCP レコードを探索します。 

    - デバイスはまず、レジストリ [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CDJ\AAD] からクライアント側にある SCP を用いてテナント情報を取得しようとします。詳細については、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-control) を参照してください。 

    - これに失敗した場合、デバイスはオンプレミスの Active Directory と通信して、サービス接続ポイント (CSP) からテナント情報を取得します。SCP について確認するには、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-manual#configure-a-service-connection-point) を参照ください。

        注意: Active Directory で SCP を有効にし、クライアント側の SCP は最初の検証作業の時のみ利用することをお勧めします。

2. Windows 10 は、__システムのコンテキスト__ で Azure AD と通信し、認証を受けるために AD FS などのフェデレーション サービスの WindowsTransport エンドポイントにリダイレクトされます。この処理は、企業ネットワーク上で行われる必要があり、VPN 経由でも動作します。

    警告: **adfs/services/trust/2005/windowstransport** と **adfs/services/trust/13/windowstransport** は共にイントラネットからアクセスできるエンドポイントとしてのみ有効にし、エクストラネットからアクセスできるエンドポイントとして公開しないようご注意ください。 

    注意: サードパーティの ID プロバイダを使用している場合は、その製品がハイブリッド Azure AD 参加をサポートしているか製造元までご確認ください。

3. もし #2 が何らかの理由で失敗し、その際にデバイスが Windows 10 1803 以上の場合は、上記の Sync Join のフローの手順 #3-5 に記載されている登録フローにフォールバックします。

    注意: デバイスを同期するように Azure AD Connect を設定していない場合、登録処理が Sync Join のフローにフォールバックしません。このため、環境に関係なく Azure AD Connect 経由でデバイスを同期することをおすすめします。詳しくは [こちらの資料](https://docs.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-sync-configure-filtering#organizational-unitbased-filtering) をご参照ください。

4. AD FS への接続に関連し問題がある場合は、登録を完了するために次回の Windows 10 へのユーザー ログイン時にデバイス登録が再試行されます。
  
    注意: VPN を使用しており、ログオフ/ログインによってドメインとの接続が切断された場合は、リモートから PSExec 経由でユーザーのデバイスに以下のコマンドを実行することで、手動で登録を実行することもできます。  
    例: PsExec -s \\win10client01 cmd, dsregcmd /join

ヒント: リモート ユーザーに対して VPN を利用させることに問題がある場合は、ハイブリッド Azure AD 参加ではなく、Azure AD 参加を検討することもお勧めします。このオプションは、特に新しい Windows 10 デバイスに最適です。考慮事項として、例えば Azure AD に参加したデバイスの管理は、グループ ポリシーの代わりに Intune のような MDM (モバイル デバイス管理) を介して提供されます。この方法が貴社に合っているかどうか判断するには、[こちらの Azure AD プランニング ガイド](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/azureadjoin-plan) をご参照ください。

## 質問 5: フェデレーション環境で Sync Join を使用できますか？

はい、使用可能です。しかし、Sync Join ではデバイス オブジェクトを Active Directory から Azure AD に同期させる必要があるため、フェデレーション参加よりも時間がかかる可能性があります。フェデレーション環境で Sync Join を使用するには、既定のドメイン名 (contoso.onmicrosoft.com など) を SCP レコードとして使用することをお勧めします。

## 質問 6: デバイスが適切にハイブリッド Azure AD 参加しているかどうかを確認する方法を教えてください。

以下の資料をご利用いただければと思います。

- [マネージド環境におけるハイブリッド Azure AD 参加の登録確認](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-managed-domains#verify-the-registration )

- [フェデレーション環境におけるハイブリッド Azure AD 参加の登録確認](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-federated-domains#verify-the-registration)

## 質問 7: デバイスが適切にハイブリッド Azure AD 参加しているのに、条件付きアクセスによってデバイスがドメインに参加していないとしてブロックされてしまいます。

条件付きアクセスが失敗する一般的な理由を以下にいくつか示します。

1. デバイス上に Azure AD PRT がない。

    デバイスが Azure AD プライマリ更新トークン (PRT) を保持しているか確認する必要があります。PRT の詳細については、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/concept-primary-refresh-token) を参照ください。

    Azure AD PRT を保持しているか確認するには、デバイスで "dsregcmd /status" コマンドを実行し、"AzureAdPrt" が "YES" であるかどうかを確認します (以下に AzureADPrt が有効な場合の dsregcmd の結果を抜粋してお知らせします)。

    ![dsregcmd /status](./fq-device-based-ca-for-remote-work/Devices3.png)

    AzureAdPrt が NO の場合は、次の点を確認ください。

    - AD FS でフェデレーション環境を構築しており、ユーザーの家庭のネットワークからは AD FS へアクセスできない場合: この場合は、usernamemixed エンドポイントがエクストラネットからアクセス可能であることを確認ください。AD FS へのアクセスが VPN 越しである場合は、ユーザーが VPN に接続していることを確認し、デバイスへの再ログインをお試しください。より詳細については [こちらの資料](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-federated-domains) を参照ください。

    - デバイスの TPM に問題があり、デバイスを認証できない場合: tpm.msc を実行し、TPM の状態が準備完了かどうかを確認ください。もし準備完了となっていない場合は、dsregcmd /leave を実行し、デバイスを Azure AD に再び参加させます。この後改めて状態を確認ください。より詳細については、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/troubleshoot-device-dsregcmd#sso-state) を参照ください。

    - サードパーティの ID プロバイダを使用しているが、WS-Trust プロトコルをサポートしていない場合: ドキュメントに記載されているように、この場合、ハイブリッドAzure AD 参加デバイスは動作しません。サポートについては、ID プロバイダーにお問い合わせください。

2. ユーザーが [Windows 10 Accounts](https://chrome.google.com/webstore/detail/windows-10-accounts/ppnbnpeolgkicgegkbkbjmhlideopiji) もしくは [Chrome 用の Office 拡張](https://chrome.google.com/webstore/detail/office/ndjpnladcallmjemlbaebfadecfhkepb?hl=en) なしで Chrome ブラウザーを使用しているか、これらの拡張が AAD 参加もしくはハイブリッド AAD 参加したデバイス上の PRT を使用していない。結果として、デバイス ベースの条件付きアクセス ポリシーが "未登録デバイス "のエラーで失敗している。Chrome ブラウザーを適切に構成するには、ユーザーの Chrome ブラウザーに SCCM や Intune から Windows 10 Accounts もしくは Office 拡張をインストールください。
 
    拡張機能をリモートでインストールできない場合は、デバイス ベースの条件付きアクセスで保護されたアプリケーションにアクセスできるようにするため、上記のいずれかの拡張機能を手動でインストールするようにユーザーに通知ください。より詳しくは [こちらの資料](https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/require-managed-devices#prerequisites) をご参照ください。 

3. デバイスは正しくハイブリッド Azure AD 参加しているが、Azure AD Connect または Azure ポータルからの設定変更が原因で、デバイスが誤って削除または無効にされた。このような状態となると、AzureAdJoined および PRT の状態がデバイスで有効と表示されても、デバイス オブジェクトは不完全なデバイスとして認識されます。  

    この問題を解決するには、影響を受けたデバイスで dsregcmd /leave を実行し、Azure AD に再度参加させます。詳細については、[こちらのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/faq#q-why-do-my-users-see-an-error-message-saying-your-organization-has-deleted-the-device-or-your-organization-has-disabled-the-device-on-their-windows-10-devices) を参照ください。

    注意: お使いのデバイスに Windows 10 1809 アップデートが適用されており、VPN / クラウド プロキシを使用していて、AzureAdPrt の状態やアプリの SSO に問題がある (PRT を使用しているにもかかわらず Outlook がメールボックスに接続しない) 場合は、更新プログラム [KB4554354](https://support.microsoft.com/en-us/help/4554354/windows-10-update-kb4554354) または 4 月の累積アップデート [KB4549949](https://support.microsoft.com/en-us/help/4549949) を使用し、これらのマシンで PRT の問題が起こらないようご対応ください。

皆様の従業員が安全にリモート ワークを実現できるよう、本情報が参考になれば幸いです。他にもご質問やアイデアがありましたら、Twitter ([@AzureAD](http://twitter.com/azuread)) でお知らせいただくか、コメントをお願いします。