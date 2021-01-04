---
title: Hybrid Azure AD Join とユーザーの UPN 
date: 2021-01-05 //日時 (できれば時刻まで)
tags:
  - Azure AD //タグ
  - HAADJ
  - UPN
---

# Hybrid Azure AD Join とユーザーの UPN

こんにちは、Azure & Identity サポート チームの 姚 (ヨウ) です。

今回は Hybrid Azure AD Join を構成した際の、デバイスにログオンするユーザーの UPN とドメイン名の関係について説明します。
この内容は以下の公開情報で説明されておりますが、今回はより分かりやすい解説を目指します。

[ハイブリッド Azure AD 参加でのオンプレミス AD ユーザー UPN サポートを確認する](https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-plan#review-on-premises-ad-users-upn-support-for-hybrid-azure-ad-join)

ご存じの通り、Hybrid Azure AD Join した端末へユーザーがログオンすると、SSO や条件付きアクセスに利用される PRT を取得します。

PRT を正常に取得するためには、デバイスが正常に Hybrid Azure AD Join した状態として登録されている必要がありますが、ユーザーの UPN も正しく構成されている必要があります。
PRT を正常に取得するために、どのようにユーザーの UPN を構成するべきかをフェデレーション認証とクラウド認証でそれぞれ解説します。
ご参考にいただければと思います。

## クラウド認証のユーザーの場合

- Windows 10 1803 以降のバージョンを対象です。
- ユーザーがいる Azure AD テナントとデバイスが Hybrid Azure AD Join として登録する Azure AD テナントは同じである前提です。
- ユーザーがいる Azure AD テナントとデバイスが Hybrid Azure AD Join として登録する Azure AD テナントは異なる場合、Hybrid Azure AD Join として構成できません。

以下の表にオンプレミス AD と AAD のユーザーの UPN のパターンごとに PRT を正常に取得できるかどうかをまとめいたしました。

|       | パターン A | パターン B | パターン C |
| :---: | :---: | :---: | :---: |
| オンプレミス AD 側の UPN | xxxxx@contoso.local | xxxxx@contoso.co.jp | xxxxx@contoso.com |
| Azure AD 側の UPN | xxxxx@contoso.com | xxxxx@contoso.com | xxxxx@contoso.com |
| Azure AD に登録されているカスタムドメイン | contoso.com<br>contoso.co.jp<br>contoso.jp | contoso.com<br>contoso.co.jp<br>contoso.jp | contoso.com<br>contoso.co.jp<br>contoso.jp |
| PRT を取得 | できない | できる | できる |

上記の表を言葉で説明しますと、以下です。
ユーザーのオンプレミス AD の UPN と Azure AD 側の UPN は同じ場合、正常に PRT を取得できます。
ユーザーのオンプレミス AD の UPN と Azure AD 側の UPN は異なっても、オンプレミス AD の UPN のドメイン名は Azure AD テナントのカスタムドメインとして登録されば、PRT を取得できます。

## フェデレーション認証のユーザーの場合

- Windows 10 1803 以降のバージョンを対象です。
- ユーザーがいる Azure AD テナントとデバイスが Hybrid Azure AD Join として登録する Azure AD テナントは同じである前提です。
- ユーザーがいる Azure AD テナントとデバイスが Hybrid Azure AD Join として登録する Azure AD テナントは異なる場合、Hybrid Azure AD Join として構成できません。

フェデレーション ユーザーの場合は比較的わかりやすいです。

AD FS のフェデレーション環境でオンプレミス AD と AAD のユーザーの UPN が異なっても、代替ログイン ID を構成していれば、ユーザーは正常に PRT を取得できます。
もちろん、ユーザーのオンプレミス AD と Azure AD の UPN は同じで、代替ログイン ID を利用しない構成でも、正常に PRT を取得できます。

クラウド認証と同じく表にまとめてみました。

|       | パターン A | パターン B | パターン C |
| :---: | :---: | :---: | :---: |
| オンプレミス AD 側の UPN | xxxxx@contoso.local | xxxxx@contoso.co.jp | xxxxx@contoso.com |
| Azure AD 側の UPN | xxxxx@contoso.com | xxxxx@contoso.com | xxxxx@contoso.com |
| Azure AD に登録されているカスタムドメイン | contoso.com<br>contoso.co.jp<br>contoso.jp | contoso.com<br>contoso.co.jp<br>contoso.jp | contoso.com<br>contoso.co.jp<br>contoso.jp |
| PRT を取得 | できる | できる | できる |

AD FS のフェデレーション環境での代替ログイン ID の構成は一般的に以下の理由によって利用されます。

・ユーザーのオンプレミス AD の UPN のドメインは Azure AD のカスタムドメインとして登録していない
・ユーザーのオンプレミス AD の UPN とメールドレスが異なり、Office 365 などのクラウド アプリケーションへのサインイン時にメールアドレスを利用する

代替ログイン ID の詳細については、[代替ログイン ID を構成する](https://docs.microsoft.com/ja-jp/windows-server/identity/ad-fs/operations/configuring-alternate-login-id) をご参照ください。

製品動作に関する正式な見解や回答については、お客様環境などを十分に把握したうえでサポート部門より提供させていただきますので、ぜひ弊社サポート サービスをご利用ください。
※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
