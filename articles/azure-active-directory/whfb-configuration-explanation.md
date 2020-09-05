---
title: Windows Hello for Business の構成解説
date: 2020-08-31
tags:
  - Azure AD
  - Windows Hello for Business
  - WHfB
---

# Windows Hello for Business の構成解説

こんにちは、Azure & Identity サポート チームの 姚 ( ヨウ ) です。

今回は Windows Hello for Business (以下 WHfB) の構成の種類について整理し、簡単に解説したいと思います。
あくまで、どういう種類の構成があるのかを整理する目的で、それぞれの構成の詳細な手順や動作については今回はカバーしません。

今後 WHfB の構成の把握と利用の検討に活用いただけますと幸いです。

WHfB に関連して、Hybrid、クラウドのみ、オンプレミスのみ、キー信頼や証明書信頼などの言葉をよく耳にすると思います。
それぞれの言葉を理解していないと、何を構成しているのかわかりづらく、混乱すると思います。

では、それぞれについて説明し、整理していきます。

まずは、オンプレミスのみ、クラウドのみ、Hybrid という種類について説明します。

これらはデバイスの登録先を示しています。

WHfB ではユーザーがログオンする Windows 10 デバイスを IdP (Identity Provider, Azure AD や ADFS/オンプレミス AD が該当する) に登録することが必須です。
また、デバイス登録先にはオンプレミスのみ、クラウドのみ、その両方 (これが Hybrid です) の三種類があります。

それぞれの種類について以下に説明いたします。
＊なお、本ブログではオンプレミスのみの構成については、Azure AD が一切利用されないオンプレミス環境に閉じたパターンであり、お問い合わせ状況からも需要は少ない傾向もありますので、詳細については言及しません。

## **デバイスの登録先**

#### **(1) オンプレミスのみ**

オンプレミスのみのデバイス登録は、AD FS サーバーにオンプレミスの Active Directory に参加したデバイスを登録する方法です。

#### **(2) クラウドのみ**

クラウドのみのデバイス登録は、Azure AD にデバイスを参加させる、Azure AD Join のデバイス登録です。
Azure AD テナントでは既定で Azure AD Join したデバイスに対して WHfB が有効に構成されます。
このため、Azure AD Join したデバイスに対して Azure AD のユーザーで一番最初にログオンすると WHfB のプロビジョニングの画面が表示されます。
そのまま、プロビジョニングを完了すれば、WHfB を利用できます。

Azure AD Join の詳細については、以下の公開情報を参照ください。

Azure AD 参加済みデバイス
https://docs.microsoft.com/ja-jp/azure/active-directory/devices/concept-azure-ad-join

方法:Azure AD Join の実装を計画する
https://docs.microsoft.com/ja-jp/azure/active-directory/devices/azureadjoin-plan

#### **(3) Hybrid**
＿＿＿

Hybrid のデバイス登録は、オンプレミスの Active Directory に参加したデバイスを Azure AD にも参加させる、Hybrid Azure AD Join のデバイス登録です。
Hybrid Azure AD Join の詳細については、以下の公開情報を参照ください。

ハイブリッド Azure AD 参加済みデバイス
https://docs.microsoft.com/ja-jp/azure/active-directory/devices/concept-azure-ad-join-hybrid

チュートリアル:マネージド ドメイン用のハイブリッド Azure Active Directory 参加の構成
https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-managed-domains

チュートリアル:フェデレーション ドメイン用のハイブリッド Azure Active Directory 参加の構成
https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-federated-domains

チュートリアル:ハイブリッド Azure Active Directory 参加済みデバイスを手動で構成する
https://docs.microsoft.com/ja-jp/azure/active-directory/devices/hybrid-azuread-join-manual


## **信頼の種類**

ここからは信頼の種類についてです。
信頼の種類には、キー信頼と証明書信頼の二種類があります。

#### **キー信頼:**
Active Directory のドメイン コントローラーとは認証用キーを利用して認証処理を行います。
プロビジョニングの際に認証用のキーが生成されますが、このキーは、ユーザーの個人ストアに自己署名の証明書と紐づきます。

#### **証明書信頼:**
Active Directory のドメイン コントローラーとは認証用キーを含む証明書を利用して認証処理を行います。
プロビジョニングの際に認証用のキーが生成されますが、この認証キーを秘密キーとして、証明機関から証明書の発行を受けます。ユーザーの個人ストアには、その証明書が格納されます。

キー信頼では、直接キーを利用した認証を行うことができるのですが、そのためにはドメイン コントローラーが Windows Server 2016 以上である必要があります。
Windows Server 2016 よりも前のドメイン コントローラーを引き続き利用する必要がある、かつ認証で利用する証明書を管理する必要があるという要件がある場合、証明書信頼を選択します。
ただ、証明書信頼の場合には、必ず Windows Server 2016 以降の AD FS サーバーが必要ですので、 現在フェデレーション環境であるものの、今後、 AD FS とはサヨナラしてマネージド環境に変更することを検討している場合にも AD FS が WHfB のために必要になります。
そのため、Windows Server 2016 以降のドメイン コントローラーへの置き換えが完了しているようでしたらキー信頼が圧倒的にお勧めです。


それぞれの展開方法は以下の公開情報を参照ください。

ハイブリッド Azure AD に参加しているキー信頼の展開
https://docs.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-key-trust

ハイブリッド Azure AD に参加している証明書信頼の展開
https://docs.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-cert-trust


## **認証プロセス**

#### **キー信頼:**
Hybrid の WHfB のキー信頼モデルの場合、Kerberos の TGT の要求時にユーザーの個人ストアの自己署名証明書をドメイン コントローラーに送付します。
この自己署名証明書にユーザー名などの情報が含まれるので、ドメイン コントローラーではこれらの情報をもとにユーザーを特定します。
つまり、パスワードの代わりにユーザーが自己署名証明書を送付していることになります。

次にドメイン コントローラーは自身の Kerberos 認証用の証明書で TGT に署名し、クライアントに TGT を返します。
クライアントは署名を検証し、TGT を発行したドメイン コントローラーが信頼できるかどうかを判断します。

#### **証明書信頼:**
Hybrid の WHfB の証明書信頼モデルの場合、Kerberos の TGT の要求時にユーザーの個人ストアにある "証明機関から発行された証明書" をドメイン コントローラーに送付します。
ドメイン コントローラーではこの証明書の情報をもとにユーザーを特定します。
つまり、パスワードの代わりにユーザーが "証明機関が発行した証明書" を送付していることになります。

次にドメイン コントローラーは自身の Kerberos 認証用の証明書で TGT に署名し、クライアントに TGT を返します。
クライアントは署名を検証し、TGT を発行したドメイン コントローラーが信頼できるかどうかを判断します。


以上がデバイスの登録先、 Hybrid とした場合の信頼の種類についてのご紹介です。

補足としてクラウドのみの構成を実施した場合でもオンプレミスのリソースに対する SSO を実施させる裏技について紹介します。
(公開情報でもご紹介しているものですので裏技でもありませんが)

## **クラウドのみの WHfB の構成においてオンプレミス リソースへの SSO ができるように構成する方法**

クラウドのみの WHfB の構成に対しても、追加でキー信頼または証明書信頼を構成することでオンプレミスのリソースへアクセスするための Kerberos の TGT を取得でき、オンプレミス リソースへの WHfB としてのシングル サインオンを実現することが可能です。

クラウドのみのキー信頼の構成は、クラウドのみの WHfB の構成に対して以下の構成を追加で構築することによって実現できます。
＊以下の追加の構成はユーザーのプロビジョニング後でも問題はありません。

この構成の追加によって、ドメイン コントローラーから返される Kerberos 認証用の証明書を正常に検証できる状態を実現できます。

Windows Hello for Business を使用して Azure AD に参加しているデバイスをオンプレミスのシングル サインオン用に構成する
https://docs.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-aadj-sso-base


一方クラウドのみの証明書信頼の構成の場合、以下の構成を追加構築することによってオンプレミス Active Directory へのシングル サインオンの実現は可能です。
＊証明書信頼の場合、ユーザーの WHfB のプロビジョニング前に以下の追加の構成を完了している必要があります。

この追加構成によって、WHfB 認証用のキーをもとに証明書を発行し、正常に検証できることを実現できます。
同時にドメイン コントローラーから返される Kerberos 認証用の証明書を正常に検証できる構成も実現できます。

AADJ オンプレミス シングル サインオン用の証明書の使用
https://docs.microsoft.com/ja-jp/windows/security/identity-protection/hello-for-business/hello-hybrid-aadj-sso-cert



今後 WHfB の構成の種類の全体像の把握に本ブログの内容が少しでも参考となりますと幸いです。

※本情報の内容（添付文書、リンク先などを含む）は、作成日時点でのものであり、予告なく変更される場合があります。
