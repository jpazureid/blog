---
title: 証明書利用者信頼のセキュア ハッシュ アルゴリズムについて
date: 2017-10-13
tags: 
    - AD FS
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/10/13/%e8%a8%bc%e6%98%8e%e6%9b%b8%e5%88%a9%e7%94%a8%e8%80%85%e4%bf%a1%e9%a0%bc%e3%81%ae%e3%82%bb%e3%82%ad%e3%83%a5%e3%82%a2-%e3%83%8f%e3%83%83%e3%82%b7%e3%83%a5-%e3%82%a2%e3%83%ab%e3%82%b4%e3%83%aa%e3%82%ba/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# 証明書利用者信頼のセキュア ハッシュ アルゴリズムについて

こんにちは、Azure & Identity サポート担当の竹村です。
今回は、AD FS の証明書利用者信頼のプロパティで設定する、セキュア ハッシュ アルゴリズム についてご案内いたします。
ここで設定する セキュア ハッシュ アルゴリズム は、AD FS が、発行したトークンに署名を行う時のハッシュ アルゴリズムです。

以下、簡単に動作をご説明します。

---

認証要求が AD FS にリダイレクトされた後、認証に成功すると、AD FS は 証明書利用者信頼 (AD FS と連携しているサービス、アプリケーションを指します。例えば Office 365 などが該当します。) にアクセスするためのトークンを発行します。
この時、AD FS は、トークンに署名を行います。
クライアントは、証明書利用者信頼にアクセスする際にこのトークンを提示し、証明書利用者信頼は受け取ったトークンの署名を検証します。
つまり、間違いなくフェデレーション信頼を結んでいる AD FS がトークンを発行したこと、および改ざんが無いことを確認するために、デジタル署名のしくみを利用しています。
AD FS のプロパティで設定するセキュア ハッシュ アルゴリズムは、この署名を行う（メッセージダイジェストを作成する）時のハッシュ アルゴリズムになります。

Office 365 をご利用の環境で、このハッシュ アルゴリズムが SHA-1 の場合に、ポータルの管理センターで以下のメッセージを着信することがあります。

MC92255 Secure your federation with SHA-256

> How does this affect me?:
> You are receiving this message because our reporting indicates your organization is using the less secure SHA-1 token signing.
>
> By utilizing the SHA-256 algorithm, your organization will be able to take advantage of a more secure Azure AD authentication.
> What do I need to do to prepare for this change?: Set your token signing algorithm as SHA-256. Follow the instructions given in the Additional Information link below to move to the more secure SHA-256 algorithm for your federation trust.
> We recommend that you act immediately.

これは、上述の署名を検証する Office 365 (Azure AD) が、ハッシュアルゴリズムが SHA-1 であることを検知して、よりセキュアな SHA-256 に変更することをアナウンスしているものです。
Office 365 は、以下のとおり SHA-256 を推奨しておりますので、変更をご検討ください。

Change signature hash algorithm for Office 365 replying party trust

※ 2017 年 7 月 より、Office 365 は SHA-1 に非対応となる可能性があります。
現在 SHA-1 に設定されている環境では、早めに SHA-256 への変更をお願いします。

※ 2017 年 6 月 20 日 更新
現時点では、7 月 1 日より SHA-1 に非対応となることは無いことを確認しております。
また、今後の対応につきまして、現時点では明確なマイルストーンは決定されておりません。
しかしながら、ゆくゆくは廃止される方向で検討が進んでいることは事実であり、セキュリティの観点からもお早目に SHA-256 への変更をお願い申し上げます。

以下に、よくお問合せをいただく内容を Q/A 形式でお纏めします。
<!-- textlint-disable -->
#### Q1.

以下のような、一般的に推進されている SHA-1 証明書の制限措置と関係ありますか。

[https://msrc-blog.microsoft.com/2016/11/25/sha1countdown/](https://msrc-blog.microsoft.com/2016/11/25/sha1countdown/)

#### A1.

直接の関連はありません。
上記は、証明書に含まれる署名ハッシュアルゴリズムに関するものです。
今回ご案内いたしました、AD FS がトークンに付与する署名のハッシュアルゴリズムとは別のものになります。
このトークンの署名ハッシュアルゴリズムが SHA-1 であることにより、ブラウザーアクセス時に警告が表示されるようなこともありません。

#### Q2.

AD FS のプロパティで、セキュア ハッシュ アルゴリズムを変更することの影響を教えてください。

#### A2.

トークンの署名を検証する証明書利用者信頼が、設定したハッシュ アルゴリズムに対応している必要があります。
もし証明書利用者信頼が、設定したアルゴリズムに対応していない場合、署名の検証に失敗し、アクセスが拒否される可能性があります。

Office 365 の場合には、SHA-256 の署名の検証に対応しており、SHA-256 が推奨されておりますので、SHA-1 が設定されている場合には変更をお願いします。
(現状では SHA-1 にも対応しておりますが、2017 年 7 月 1 日 より SHA-1 に非対応となる可能性がございます。)

#### Q3.

該当のハッシュアルゴリズムを変更する時に、AD FS サーバーの再起動は必要ですか?
また、ユーザーの認証が停止するなど、ダウンタイムは生じますか?

#### A3.

設定の際に、AD FS サーバーを変更する必要はありません。
ファーム内のプライマリサーバーで変更してください。(セカンダリ サーバーには自動的に反映されます。)
また、ユーザーの認証が停止するなどのダウンタイムは生じません。

#### Q4.

設定が変更されていることを確認する方法はありますか?

#### A4.

プライマリ AD FS サーバー上で、以下のように Get-AdfsRelyingPartyTrus コマンドレット を使用して確認することができます。

// SHA1 の状態
Get-AdfsRelyingPartyTrust -Name 'Microsoft Office 365 Identity Platform' | select SignatureAlgorithm

SignatureAlgorithm

http://www.w3.org/2000/09/xmldsig#rsa-sha1 ★ <<<

// SHA-256 の状態
Get-AdfsRelyingPartyTrust -Name 'Microsoft Office 365 Identity Platform' | select SignatureAlgorithm

SignatureAlgorithm

http://www.w3.org/2001/04/xmldsig-more#rsa-sha256 ★ <<<

#### Q5.

AD FS Proxy サーバー (WAP サーバー) で何か作業が必要ですか?

#### A5.

AD FS Proxy サーバー (WAP サーバー) で必要な作業はありません。
<!-- textlint-enable -->