---
title: AD FS が PDC と通信するケース
date: 2017-10-13
tags: 
    - AD FS
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2017/10/13/ad-fs-%E3%81%8C-pdc-%E3%81%A8%E9%80%9A%E4%BF%A1%E3%81%99%E3%82%8B%E3%82%B1%E3%83%BC%E3%82%B9/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# AD FS が PDC と通信するケース

皆様、こんにちは。Windows プラットフォーム サポート担当の竹村です。
今回は、簡単ですが AD FS が PDC と通信する 3 つのケースについてご案内します。
ドメイン コントローラーが各拠点に散らばっている場合などに、ご留意ください。

- 対象リリース
Windows Server 2012 R2 (AD FS 3.0)

### (1) AD FS 構成ウィザードの実行時

AD FS 構成ウィザード中で、PDC にアクセスいたします。
したがって、PDC と通信できない場合にはウィザードが失敗いたしますので、ご注意ください。

### (2) パスワード更新機能利用時

AD FS には、オンプレミス ドメインのユーザーのパスワードを更新する機能がございます。

(ご参考)

https://docs.microsoft.com/ja-jp/windows-server/identity/ad-fs/operations/update-password-customization

この機能を利用してパスワードを更新する際には、PDC にアクセスいたします。
PDC と通信ができない場合には、パスワードを更新できませんので、ご注意ください。

### (3) エクストラネット ロックアウト機能利用時

AD FS には、外部からの攻撃によりドメイン ユーザーがロックアウトすることを防ぐ目的で、エクストラネット ロックアウトと呼ばれる機能がございます。

(ご参考)

https://docs.microsoft.com/ja-jp/windows-server/identity/ad-fs/operations/configure-ad-fs-extranet-lockout-protection

本機能は、WAP を経由した認証要求については、都度 AD FS が PDC にアクセスし、badPwdCount を確認する動作がございます。
この時、PDC と通信できない状態ですと、認証に失敗いたしますのでご注意ください。

ADFS extranet lockout and PDC requirement

今回のご案内は以上です。

参考になれば幸いです。
