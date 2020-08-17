---
title: Azure AD Domain Services のよくあるご質問と対処策
date: 2020-08-17 09:00
tags:
  - Azure AD
  - Azure AD Domain Services
---

# Azure AD Domain Services のよくあるご質問と対処策

こんにちは、Azure & Identity サポート チームの平形です。
最近 Windows Virtual Desktop や Azure Files などと合わせて導入されることも増えている Azure AD Domain Services のよくある質問につきまして Q&A 形式でおまとめいたしました。

これから Azure AD Domain Services の導入を検討される場合には先に公開しております下記ブログをご覧ください。

[Azure AD Domain Services の利用シナリオ](https://jpazureid.github.io/blog/azure-active-directory/azure-ad-ds-scenario/)


## Q&A タイトル
1. [Azure AD Domain Services を構築し、 Windows をドメイン参加させようとしたがエラーが発生してサインインできません。](#anchor1)
2. [Azure AD Domain Services にサインインする際に NetBIOS ドメイン名と UPN どちらでサインインすればよいですか。](#anchor2)
3. [Azure AD Domain Services への同期スコープをグループに設定しています。入れ子のグループに対応していますか。](#anchor3)
4. [Azure AD 上でユーザー オブジェクトの作成・変更を行いました。 Azure AD Domain Services へ変更が反映されるまでにどれくらい時間がかかりますか。](#anchor4)
5. [Azure AD Domain Services のネットワーク要件を教えてください。](#anchor5)
6. [グループ ポリシーのセントラル ストアの利用ができるか教えてください。](#anchor6)
7. [Azure AD Domain Services が存在するサブスクリプションを別テナントに移動しようと考えていますが移動できますか。](#anchor7)
8. [Azure AD Domain Services を複数作成することはできますか。](#anchor8)
9. [Azure AD Domain Services を導入するにあたってどのようなドメイン名にすればよいか教えてください。](#anchor9)
10. [Azure AD Domain Services 上のイベント ログを閲覧することは可能ですか。](#anchor10)

<a id="anchor1"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services を構築し、 Windows をドメイン参加させようとしたがエラーが発生してサインインできません。

<span style="color:red">A</span>. 以下の 3 つのいずれかに該当する可能性があります。

1. ユーザー名・パスワードが誤っている
2. Azure AD Domain Services を構築する前から Azure AD 上に存在するユーザーを利用している (そしてパスワード ハッシュが Azure AD Domain Services に同期されていない)
3. アカウント ロックアウトが発生している

以下それぞれの詳細です。

***1. ユーザー名・パスワードが誤っている***

ドメイン参加時に指定したアカウントが Azure AD Domain Services に同期されているアカウントであるか、並びにパスワードが正しいかをご確認ください。
いずれも問題がない場合には一度 Azure AD 上でパスワードの変更・リセットをご実施ください。

また、 Azure AD Domain Services に Azure AD から同期したユーザーでサインインを試行する場合には、 NetBIOS 形式 (contoso\user) ではなく、 UPN 形式 (user@contoso.onmicrosoft.com 等) でサインインしてください。
Azure AD から Azure AD Domain Services に同期したユーザーは Azure AD の UPN と同じ UPN を持ちます。
NetBIOS 名の場合、名前の長さなどが要因で Azure AD 上のユーザー名と異なる名前が設定されている可能性があります。

Azure AD から Azure AD Domain Services に同期される属性や内容は次のリンクの情報を参照ください。

[属性の同期と Azure AD DS へのマッピング](https://docs.microsoft.com/ja-jp/azure/active-directory-domain-services/synchronization#attribute-synchronization-and-mapping-to-azure-ad-ds)


***2. Azure AD Domain Services を構築する前から Azure AD 上に存在するユーザーを利用している (そしてパスワード ハッシュが Azure AD Domain Services に同期されていない)***

Azure AD Domain Services 構築しても Azure AD Domain Services 上に同期された既存アカウントについては Azure AD が保持するパスワード情報が同期されません。

Azure AD Domain Services 構築後に Azure AD 側でパスワードを変更・リセットすることで Azure AD 上に Kerberos/NTLM 認証で利用するパスワード ハッシュが生成・格納されるようになります。
Kerberos/NTLM 認証で利用するパスワード ハッシュが Azure AD に格納された後、 Azure AD から Azure AD Domain Services にパスワード ハッシュが同期され、 Azure AD Domain Services 上でサインインできるようになります。

Azure AD Connect を用いて同期しているアカウントの場合には Azure AD Domain Services を構築後、オンプレミス AD 上でパスワード変更を行い Azure AD 上のパスワード ハッシュを更新ください。
もしくは下記公開情報記載の手順に従って Azure AD Connect 上で同期対象のユーザーのパスワード ハッシュを再同期するよう強制することでも、 Azure AD 上のパスワード ハッシュが更新されます。

[チュートリアル:ハイブリッド環境の Azure Active Directory Domain Services でパスワード同期を有効にする](https://docs.microsoft.com/ja-jp/azure/active-directory-domain-services/tutorial-configure-password-hash-sync)

こちらは 1 回のみの実施で問題ございません。
Azure AD Domain Services 構築後は Azure AD 上でパスワード更新が発生すると自動で Kebreros/NTLM 認証で利用可能なパスワード ハッシュが Azure AD 上に格納されるようになります。


***アカウント ロックアウトが発生している。***

Azure AD Domain Services は既定で 2 分で 5 回のパスワード入力に失敗すると 30 分間ロックアウトされます。
連続で間違えた場合にはアカウント ロックアウトが発生している可能性があるため、 30 分経過するのを待ち、サインインをお試しください。


<a id="anchor2"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services にサインインする際に SAMAccountName と UPN どちらでサインインすればよいですか。

<span style="color:red">A</span>. どちらでもサインイン可能です。注意点として、 Azure AD Domain Services に Azure AD からアカウントが同期された際に SAMAccountName の名前の長さの制限などによってランダムな文字列に変更されて同期される可能性がございます。 UPN であれば Azure AD の UPN と一致した状態で同期されるため、 SAMAccountName でのサインインに失敗するといった場合には、 UPN 形式でのサインインをお試しください。

<a id="anchor3"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services への同期スコープをグループに設定しています。入れ子のグループに対応していますか。

<span style="color:red">A</span>. いいえ、入れ子のグループには対応していません。同期したいユーザーを直接グループに割り当てる必要があります。

入れ子のグループについては下記をご覧ください。

[入れ子 (ネスト) グループへの権限付与について](https://jpazureid.github.io/blog/azure-active-directory/nesting-group/)


<a id="anchor4"></a>


---

<span style="color:blue">Q</span>. Azure AD 上でユーザー オブジェクトの作成・変更を行いました。 Azure AD Domain Services へ変更が反映されるまでにどれくらい時間がかかりますか。

<span style="color:red">A</span>. 変更が完了するまでの時間は公開されていませんが、検証ベースでは 30 分から 1 時間程度で変更が完了することを確認しています。(今後変更される可能性もありますので、あくまでも参考数値です)


<a id="anchor5"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services のネットワーク要件を教えてください。

<span style="color:red">A</span>. 下記公開情報をご覧ください。

[Azure Active Directory Domain Services の仮想ネットワーク設計の考慮事項と構成オプション](https://docs.microsoft.com/ja-jp/azure/active-directory-domain-services/network-considerations)

Express Route を利用し、強制トンネリング構成を行ってデフォルト ルート (0.0.0.0) を書き換えている構成、ネットワーク セキュリティ グループ (NSG) を変更し、 Azure AD Domain Services が必要とするポートが解放されていない構成に起因して問題が生じるというお問い合わせが多くあります。

ネットワーク構成を変更する際には必ず上記公開情報記載の要件を満たしているかをご確認ください。


<a id="anchor6"></a>

---

<span style="color:blue">Q</span>. グループ ポリシーのセントラル ストアの利用ができるか教えてください。

<span style="color:red">A</span>. はい、利用可能です。設定方法はオンプレミス AD の場合と同じです。

<a id="anchor7"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services を導入するにあたってどのようなドメイン名にすればよいか教えてください。

<span style="color:red">A</span>. 基本的にはルーティング (名前解決) 可能なドメイン名であり、かつ自組織で管理しているドメイン名の利用が望ましいです。.local を含むドメイン名やオンプレミスのドメイン名といった名前も利用できますが、これらのドメイン名を利用する場合には注意が必要です。
その例として、 Azure AD Domain Services で LDAPS を利用する場合が挙げられます。

LDAPS を利用する場合には証明書が必要です。証明書のサブジェクト名は *.contoso.com といった、 Azure AD Domain Services のドメイン名を含むワイルドカード形式である必要があります。
そのため、 LDAPS の利用が予定されている場合にはワイルドカード証明書を発行できるドメイン名で Azure AD Domain Services を構成する必要がございます。
ドメイン名検討にあたっての考慮事項の詳細は下記公開情報をご覧ください。

[マネージド ドメインの作成](https://docs.microsoft.com/ja-jp/azure/active-directory-domain-services/tutorial-create-instance#create-a-managed-domain)



<a id="anchor8"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services が存在するサブスクリプションを別テナントに移動しようと考えていますが移動出来ますか。

<span style="color:red">A</span>. 再構築が必要になります。サブスクリプションの移動の操作はできますが、 Azure AD Domain Services の同期が行えなくなります。サブスクリプションの移動を行った場合には Azure AD Domain Services は一度削除し、改めて再構築を行う必要があります。

このように Azure AD Domain Services は一度展開するとサブスクリプションを移動させたり、ドメイン名の変更が行えないなどの制約があるため、十分に検討の上で展開先サブスクリプションやドメイン名などを決定ください。



<a id="anchor9"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services を複数作成することはできますか。

<span style="color:red">A</span>. いいえ、できません。 1 つのテナントにつき 1 つの Azure AD Domain Services しか展開することはできません。


<a id="anchor10"></a>

---

<span style="color:blue">Q</span>. Azure AD Domain Services 上のサインイン ログ等を閲覧することは可能ですか。

<span style="color:red">A</span>. Azure AD Domain Services 上のイベント ログを直接参照することはできませんが、診断設定を構成することでストレージ アカウントに出力し、 Log Analytics 等で閲覧することが可能です。


[Azure Active Directory Domain Services でセキュリティ監査を有効にする](https://docs.microsoft.com/ja-jp/azure/active-directory-domain-services/security-audit-events)


以上の内容でカバーされていない点で何か疑問点などございましたら、ぜひサポートサービスまでお問い合わせください。
上記内容が参考となりましたら幸いです。

