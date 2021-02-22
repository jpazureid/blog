---
title: 条件付きアクセスで「準拠済み」や「Hybrid Azure AD 参加が必要」でブロックされる場合の対処法 (Windows 編)
date: 2021-02-19
tags:
  - Azure AD
  - Conditional Access
  - Compliant
  - Hybrid Azure AD Join
---


# 条件付きアクセスで 「準拠済み」 や 「Hybrid Azure AD 参加が必要」 でブロックされる場合の対処法 (Windows 編)

こんにちは。Azure & Identity サポート チームの関口です。

<br>

今回は、ご利用の端末が 「準拠済み」もしくは「Hybrid Azure AD 参加を構成済み」にもかかわらず、条件付きアクセスの「準拠済み」や「Hybrid Azure AD 参加が必要」の設定でブロックされてしまった場合の原因と対処方法をご紹介します。

<br>
<br>

## <なぜブロックされるのか？>

条件付きアクセスの「準拠済み」と「Hybrid Azure AD 参加が必要」の設定は、デバイス ベースのアクセス制御となるため、”どの端末からのアクセスか？” を Azure AD が判断する必要があります。

この判断のために、ご利用のデバイスは Azure AD に対して ”デバイス情報” を提示する必要があります。

ご利用の端末がデバイス情報を Azure AD に提示できない場合、Azure AD は ”どの端末からのアクセスか？” を判断することができません。
つまり「準拠済み」であるかも「Hybrid Azure AD 参加を構成済み」であるかも判断することができず、ブロックされてしまいます。

<br>

ブロックされたアクセスをサインイン ログで確認すると、以下のようにデバイス ID の情報が表示されていないことがわかります。

![](./conditional-access-compliant-windows/deviceid-not-displayed.png)

<br>

ご利用の端末の状況に応じて、以下の二つの観点で確認を行うのがスムーズです。

<br>

**”デバイス情報を提示できているかどうか”**

**”デバイス情報を提示できていない場合は、なぜ提示できていないのか”**

<br>
<br>

## <対処方法>

Windows でデバイス情報が提示できない原因としては、以下が挙げられます。

それぞれの項目ごとに解説します。

<br>


| No.                      | 確認ポイント                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| A                       | Hybrid Azure AD 参加が構成済み？                                                                                                         |
| B                       | 準拠済み？                                                                                                                 |
| C                       | PRT 取得済み？                                                                               |
| D                        | サポートされたブラウザーを使用している？                                                         |
| E                      | Chrome を使用している場合、Windows 10 Accounts 拡張機能をインストールしている？ |
| F | Edge Chromium を使用している場合、ブラウザーにサインインできている？                                               |
| G       | 旧 Edge を利用している場合  
| H       | アプリの実装によりデバイス情報を提示できないこともある 
| I       | その他                             |

<br>
<br>
<br>

## A. Hybrid Azure AD 参加が構成済み？

利用している端末が Hybrid Azure AD 参加構成済みとなっているかを確認します。
Azure Portal のデバイス一覧で、対象の端末の「登録済み」の列に登録日時がセットされていれば OK です。

![](./conditional-access-compliant-windows/registered-set.png)

構成が完了していない場合は、「登録済み」の列に「保留中」と表示がされることになります。
この場合は、まずは Hybrid Azure AD 参加の構成を完了させることから始めてください。

(ここでは、Hybrid Azure AD 参加の構成方法は割愛します)

<br>
<br>

## B. 準拠済み？

利用している端末が準拠済みとなっているかを確認します。
Azure Portal のデバイス一覧で、対象の端末の「準拠している」の列が「はい」にセットされていれば OK です。

![](./conditional-access-compliant-windows/compliant-set.png)

対象の端末が準拠していない場合は、Microsoft Endpoint Manager (Intune) の観点で、なぜ準拠済みとならないのかを調査する必要があります。

<br>
<br>

## C. PRT 取得済み？

[A. Hybrid Azure AD 参加が構成済み？] で Hybrid Azure AD 参加が構成済み、もしくは [B. 準拠済み？] で 準拠済み となっていても、Primary Refresh Token (PRT) を取得できていないと Azure AD にデバイス情報を提示することができません。

<br>

PRT の中にはデバイス情報が含まれており、Azure AD 側が、どの端末からのアクセスなのかを判断するために使用されます。

そのため、ご利用の端末で正常に PRT を取得できているか確認してください。
以下のコマンドの実行結果で [AzureAdPrt : NO] となっている場合は、PRT が取得できていないことになります。

<br>

dsregcmd /status

    +------- SSO State -------+
                AzureAdPrt : NO
       AzureAdPrtAuthority : NO
             EnterprisePrt : NO
    EnterprisePrtAuthority : NO


<br>

この場合は、なぜ PRT が取得できていないのか？という観点で調査を行う必要があります。

PRT が取得できない場合の対処方法としては、以下の記事をご参考ください。
また、サポートによる支援も可能ですので、ご希望の場合はお問い合わせください。

<br>

[Hybrid Azure AD Join 失敗時の初動調査方法について (マネージド編) | Japan Azure Identity Support Blog]((../azure-active-directory/troubleshoot-hybrid-azure-ad-join-managed.md))

<br>

[Hybrid Azure AD Join 失敗の初動調査方法について (フェデレーション編) | Japan Azure Identity Support Blog]((../azure-active-directory/troubleshoot-hybrid-azure-ad-join-federated.md))

<br>
<br>

## D. サポートされたブラウザーを使用している？

以下の表は OS に対応したサポート ブラウザーの一覧です。(情報がアップデートされる可能性があるため、正確な情報は公開情報をご確認ください)

OS によってサポートされるブラウザーは異なるため、ご利用の端末の OS でサポートされているブラウザーを利用されているかご確認をお願いします。

<br>

[サポートされているブラウザー - Azure Active Directory | Microsoft Docs]((https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-conditions#supported-browsers))

<br>
<br>

## E. Chrome を使用している場合、Windows 10 Accounts 拡張機能をインストールしている？

Windows 10 バージョン 1703 以降で Chrome を利用してデバイス情報を提示するためには、Windows 10 Accounts 拡張機能をインストールする必要があります。

Chrome をご利用の場合は、以下の公開情報の案内に沿ってインストールが可能です。

<br>

[Chrome のサポート - Azure Active Directory | Microsoft Docs]((https://docs.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-conditions#chrome-support))


>Windows 10 Creators Update (バージョン 1703) 以降で Chrome をサポートするには、Windows 10 Accounts 拡張機能をインストールしてください。 条件付きアクセス ポリシーでデバイス固有の詳細が必要な場合は、この拡張機能が必要です。

<br>
<br>

## F. Edge Chromium を使用している場合、ブラウザーにサインインしている？

Microsoft Edge Chromium を利用してデバイス情報を提示するためには、ブラウザーにサインインしている必要があります。

<br>

[Microsoft Edge と条件付きアクセス - Azure Active Directory | Microsoft Docs]((https://docs.microsoft.com/ja-jp/deployedge/ms-edge-security-conditional-access))

>エンタープライズ Azure AD 資格情報を使用して Microsoft Edge プロファイルにサインインすると、条件付きアクセスを使用して保護されたエンタープライズ クラウド リソースへのシームレスなアクセスが、Microsoft Edge によって許可されます。

<br>

なお、旧 Edge (Microsoft Edge HTML) の場合は、プロファイルにサインインを行う機能はありません。
あくまで Microsoft Edge Chromium をご利用の場合の確認となります。

<br>
<br>

## G. 旧 Edge を利用している場合

旧 Edge (Microsoft Edge HTML) を使用している場合、デバイス情報を Azure AD に適切に提示できない場合があることを確認しています。

残念ながら、Microsoft Edge HTML は既に開発が終了しており、2021 年 3 月 9 日 にサポートが終了することが予定されているため、Microsoft Edge Chromium を利用いただくことを推奨しています。

<br>
<br>

## H. アプリの実装によりデバイス情報を提示できないこともある

3rd Party 製のアプリケーションの場合、デバイス情報を直接 Azure AD に提示できるような実装か、Microsoft Authenticator 経由で提示できるように実装されている必要があります。

<br>

3rd Party 製のアプリケーションでこのような実装が行われているかどうかは、アプリケーション ベンダーに直接ご確認いただく必要があります。

基本的に、Microsoft 製のアプリケーションは Microsoft Authenticator を使用してデバイス情報を提示するとお考え下さい。
(Outlook などは Microsoft Authenticator を使用しなくてもデバイス情報を提示できるシナリオがあることを確認していますが、基本的には Microsoft Authenticator が使用されるとお考えください)

<br>

なお、モバイル デバイスに Microsoft Authenticator をインストールするだけでは不十分で、アプリケーション側が Microsoft Authenticator を使用するように実装がされている必要があります。

上記の動作については、以下のアプリケーション開発者用の公開情報に記載がありますのでご参照ください。

<br>

[ブローカーを使用するようにアプリケーションを構成する - Azure Active Directory | Microsoft Docs]((https://docs.microsoft.com/ja-jp/azure/active-directory/develop/scenario-mobile-app-configuration#configure-the-application-to-use-the-broker))

<br>

こちらは iOS / Android 端末を利用時の場合の説明となりますが、Windows 端末を使用する場合も類似の動作があります。

<br>

Windows 10 端末上のデスクトップ アプリ (ネイティブ アプリ) を使用してアプリケーションにアクセスする場合、Microsoft Authenticator ではなく、Web Account Manager (WAM) と呼ばれる Windows 10 に既定で実装されているトークン ブローカーを使用して PRT を Azure AD に提示します。

<br>

Microsoft のアプリケーションは基本的に WAM に対応しているため問題ありませんが、3rd Party 製のアプリケーションは WAM に対応した実装となっていないことが考えられ、PRT を提示できないことが想定されます。こちらも正確な実装はアプリケーション ベンダーに確認いただく必要がありますが、このような動作処理が行われるために、Azure AD 側でデバイスを判断できない結果になることがあります。

<br>
<br>

## I. その他

その他サポート チームで確認できている事象や仕様についてです。

<br>

・ 3rd Party 製品によってデバイス情報が提示できない

クライアント端末から Azure AD にデバイス情報を提示する経路上に、プロキシなど一部 3rd Party 製品の動作 (仕様) によって、デバイス情報が提示できない場合があることを確認しております。
もし切り分けの結果、ご利用の 3rd Party 製品を経由する場合のみ事象が発生するということであれば、該当のベンダーに確認のお問い合わせをいただければと思います。

<br>
<br>

## 関連ブログ

[Japan Azure Identity Support Blog: 条件付きアクセスで「準拠済み」でブロックされる場合の対処法 (iOS / Android 編)]((../azure-active-directory/conditional-access-compliant-ios-android.md))

<br>

上記内容が少しでも参考となれば幸いです。製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひサポートサービスまでお問い合わせください。
