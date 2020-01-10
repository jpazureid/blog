# Azure AD Domain Services の利用シナリオ

こんにちは、Azure AD サポートチームの高田です。

本日は、Azure AD Domain Services についてその推奨される利用方法やシナリオをご紹介したいと思います。

Azure AD Domain Services は、ユーザーが指定したドメイン名を用いて Azure の仮想ネットワーク上にドメイン コントローラーを自動構築するという機能です。Windows Server の Active Directory と完全に互換性のあるドメイン サービスが構築されることから、ドメイン参加やグループ ポリシーなど従来オンプレミス環境で使用していたテクノロジーをそのまま Azure 上で利用することが可能です。

しかし、利便性が大きい反面、サービスの位置づけが特殊なため、本来想定していない方法で Azure AD Domain Services の利用を検討しているお客様もいらっしゃいます。例えば、多くのお客様では以下のような考えのもと Azure AD Domain Service の利用を検討し、弊社までお問い合わせいただくことがございます。

1. オンプレミスの Active Directory を廃止して、Azure AD Domain Services に移行したい。
2. Azure AD Domain Services を構築し、PC をドメイン参加させることでクライアント デバイスを管理したい。
3. オンプレミスの Active Directory に加えて Azure AD Domain Services を構築し、オンプレミスとクラウドで冗長構成をとりたい。
4. 負荷のかかる LDAP 処理をオンプレミス AD でなく、Azure AD Domain Services に対して行いたい。

大変恐れ入りますが、これらの利用方法は Azure AD Domain Services の期待された利用方法ではありません。以下では Azure AD Domain Services の注意点と利用シナリオとともに、推奨する構成パターンを紹介したいと思います。本記事が Azure AD Domain Services の導入を検討する際の参考になりましたら幸いです。

## Azure AD Domain Services の目的と利点

Azure AD Domain Services は、自動的にドメイン コントローラーをクラウド上に構築し管理するサービスです。内部的には 2 つの仮想マシン (ドメイン コントローラー) が生成され、指定した Azure 仮想ネットワーク上に接続されます。また複製やバックアップが自動的に管理されます。これらのドメイン コントローラーは従来 Windows Server でご利用いただいていたドメイン コントローラーと完全な互換性があるため、ドメイン参加やグループ ポリシー、LDAP、Kerberos 認証、NTLM 認証など従来の Active Directory ドメインに要求していた処理を Azure AD Domain Services に対して行うことが可能です。イメージとしては、Azure 上に仮想マシン (ドメイン コントローラー) を構築し、オンプレミスとは独立したドメインを作成した上で、ドメイン コントローラー自体の健全性などを含む管理はすべてマイクロソフトに委ねるようなものとお考えいただけます。

また、Azure AD Domain Services には、Azure AD 上のユーザーが自動的に同期されます。これにより、Azure AD 上のユーザーと同じパスワードで Azure AD Domain Services のドメインにサインインが可能です。Azure AD Connect を用いてオンプレミスにあるドメイン環境から Azure AD にパスワード ハッシュ同期している環境であれば、Azure AD に同期されたパスワードがさらに Azure AD Domain Services に同期されることとなります。このため、オンプレミスの AD 環境と同じパスワードで、Azure AD Domain Services にもサインインが可能となります。

Azure AD Domain Services は、基本的に Azure 上に構築したサーバーやクラウド上のサービスに、Azure AD のアカウントを利用したドメイン参加や Kerberos 認証、LDAP アクセスを直接許可することを目的として提供されています。この目的のために Azure AD Domain Services を利用しない場合、管理者は以下のいずれかの構成を行い、Azure 上に構築したサーバーやクラウド上のサービスにドメイン コントローラーへのアクセスを提供する必要が生じます。

- Azure 上に Windows Server を構築し、ドメイン コントローラーに昇格させて Azure 上の仮想マシンやクラウド サービスを接続させる (ドメイン コントローラーの冗長性の構成や複製障害などの対応は自身で行う)。
- Azure 上の仮想ネットワークとオンプレミスのネットワークに VPN を張り、既に存在するオンプレミスのドメイン コントローラーに通信ができるようにした上で Azure 上の仮想マシンやクラウド サービスから既存のドメインを利用させる (VPN の構成や接続性のメンテナンスを自身で行う)。

## Azure AD Domain Services の推奨される利用シナリオ

以上を踏まえ、Azure AD Domain Services の推奨される利用方法 (シナリオ) を紹介します。

### 利用パターン 1: Azure 上にクラウド化したサービスに Kerberos/NTLM を用いて SSO したい

本利用パターンは、以下の条件に当てはまるお客様を対象としたものです。

- クラウド化の一環として、オンプレミスで Active Directory と共に動作していたサーバーを Azure 上に仮想マシンとして移行 (リフト アンド シフト) しようと検討している。
- Azure 上に仮想マシンとして移行 (リフト アンド シフト) したサーバーには、Azure AD に同期されているものと同じ ID およびパスワードでサインインしたい。
- Azure 上に仮想マシンとして移行 (リフト アンド シフト) したサーバーのために追加のサーバー構築や機器導入をしたくない。

従来オンプレミスで Active Directory と共に動作していたサーバーをクラウド化 (Azure 上に仮想マシンとして移行) する場合、クラウドからどのようにして Active Directory を利用するかが問題となります。一般的には前述のとおり、Azure 上の仮想ネットワークに自前で Active Directory ドメイン コントローラーを構築するか、オンプレミスのドメインコントローラーに接続できるよう Azure とオンプレミスで VPN を張るかのいずれかが選択肢でした。

しかし、上述の条件に当てはまる利用パターンにおいては、Azure AD Domain Services を活用できます。管理者は自身でドメイン コントローラーを構築および管理する必要はなくなり、VPN の切断など接続性の問題からも解放されます。またユーザーは、オンプレミス Active Directory と同じ ID およびパスワードで、クラウド上に移行したサービスにサインインが可能となります。

### 利用パターン 2: Azure AD アカウントに対する LDAPS 接続を提供したい - 注意: 読み取り専用

本利用パターンは、何らかのクラウドサービスが LDAP (LDAPS) を用いて Azure AD 上のユーザー情報にアクセスする必要のあるお客様が対象です。例えば、LDAPS アクセスによりユーザー情報を取得してメールの配信を行うクラウド サービスがあるとします。このようなサービスが LDAPS で情報を取得するためには、従来であれば、オンプレミスで動作するドメイン コントローラーをインターネットから LDAPS アクセスできるように構成するか、オンプレミス環境と複製したドメインコントローラーをクラウド上に作成して LDAPS を公開する必要がありました。

この利用パターンでも Azure AD Domain Services を利用することにより、簡単にクラウド上のサービスに LDAPS 接続を提供できます。Azure AD Domain Services のセキュリティはマイクロソフトにより自動的に管理されるため、サービスの利用者が LDAPS 接続のセキュリティを確保する必要はなくなります。

ただし、Azure AD Domain Services への LDAPS 接続は、Azure AD から同期されているユーザーについては読み取り専用となる点に注意が必要です。Azure AD から同期されている Azure AD Domain Service 上のユーザーに対して書き込み処理を行いたい場合は、ユーザー情報の大元である Azure AD に対して Graph API を使用する必要があります (オンプレミスから同期しているアカウントは Azure AD 上での更新ができないため、オンプレミスの Active Directory で変更します)。

### 利用パターン 3: パスワードハッシュが同期できないなど特別なセキュリティ要件のある組織において、Azure 上にクラウド化したサービスに Kerberos/NTLM を用いて SSO したい

直近でプレビューとなった Azure AD Domain Services リソース フォレストの機能を利用することで、以下のような条件に当てはまる場合も、Azure AD Domain Services を活用いただけます (特別な要件のある組織向けのシナリオです)。

- クラウド化の一環として、オンプレミスで Active Directory と共に動作していたサーバーを Azure 上に仮想マシンとして移行 (リフト アンド シフト) しようと検討している。
- セキュリティ要件によりオンプレミス AD 上のパスワードハッシュを Azure AD に同期できない、もしくはオンプレミス環境でのユーザー認証にはスマートカードを使用しておりユーザーは自身のアカウントのパスワードを知らないが、クラウド上に移行したサーバーに対し、オンプレミス Active Directory と同じ ID を用いてシングル サインオンしたい。
- オンプレミス環境と Azure との間で Express Route もしくは VPN の構築が可能である。

このシナリオでは、Azure AD Domain Services からオンプレミスの Active Directory に対してドメインの信頼関係を構築します。これにより、オンプレミス環境に存在するアカウントを用いて、Express Route もしくは VPN を経由して Azure AD Domain Service に認証することが可能となり、Azure AD Domain Services と連携するクラウド上のサーバーに SSO することができます。

![Azure AD DS Resource Forest](./azure-ad-ds-scenario/figure.png)

この Azure AD Domain Services リソース フォレストを利用した方法では、Express Route もしくは VPN の構築が必要となりますが、上述のような特別なセキュリティ要件を持つお客様においてはアプリケーション サーバーをクラウド化する際に活用いただけます。弊社としては、接続の安定性からVPN ではなく、ExpressRoute の利用を推奨します。

チュートリアル: Azure Active Directory Domain Services (プレビュー) で、オンプレミスのドメインへの送信フォレストの信頼を作成する  
https://docs.microsoft.com/ja-jp/azure/active-directory-domain-services/tutorial-create-forest-trust

## Azure AD Domain Services の推奨されない利用シナリオ

以下のようなご要望をお持ちのお客様においては、 Azure AD Domain Services の利用は適切ではありません。恐れ入りますが、別のアプローチをご検討ください。環境に応じた最適な方法につきましては、弊社プレミア サポートへのお問い合わせもご検討いただけますと幸いです。

### 非推奨パターン 1: Azure AD Domain Services を構築し、PC をドメイン参加させることでオンプレミス Active Directory を廃止したい

Azure AD Domain Services に対して、オンプレミス ネットワーク上の PC やサーバーをドメイン参加させることは非推奨です。オンプレミス ネットワークと Azure AD Domain Services を展開した仮想ネットワークをサイト間 VPN で接続することで、オンプレミス ネットワーク上の PC やサーバーをドメイン参加させることは技術的には可能です。しかし、 Azure AD Domain Services は基本的にクラウド上に存在する仮想マシンやサービスのために用意されたサービスです。このため開発部門としてもオンプレミス ネットワーク上の PC やサーバーを Azure AD Domain Services にドメイン参加させることは想定していません。

オンプレミスに存在する PC をクラウド連携させたい場合は、以下の方法をご検討ください。

- Azure AD Join もしくはハイブリッド Azure AD Join によるデバイス登録の実施
- Intune などのモバイル デバイス管理 (MDM) ソフトウェアを利用したデバイス管理

### 非推奨パターン 2: Azure 上で動作している仮想マシンに Azure AD のアカウントで単純にサインインしたい

Windows Server 2019 Datacenter エディションおよび Windows 10 1809 以降を実行している Azure 仮想マシンでは、Azure AD 認証を利用できるプレビューが開始されています。これにより、Azure AD 上のアカウントで仮想マシンにサインインでき、さらに Azure のロール ベースのアクセス制御 (RBAC) や Azure AD 条件付きアクセスなどを使用して、VM にアクセスできるユーザーを制御することが可能です。

Azure Active Directory 認証 (プレビュー) を使用して Azure 内の Windows 仮想マシンにサインインする  
https://docs.microsoft.com/ja-jp/azure/active-directory/devices/howto-vm-sign-in-azure-ad-windows

このため、もし Azure 上で動作している仮想マシンに Azure AD のアカウントでサインインしたいというご要望であれば、Azure AD Domain Services を利用する必要はありません。Windows Server 2019 Datacenter エディションおよび Windows 10 1809 以降を実行している Azure 仮想マシンであれば、上述のプレビュー機能を利用して Azure AD のアカウントでサインインできます。

Azure AD Domain Services は、上述の推奨される利用パターンのとおり、Azure 上の仮想マシンやクラウド サービスが Kerberos や LDAP などのプロトコルを利用する必要がある際にご検討ください。

### 非推奨パターン 3: 負荷のかかる LDAP 処理をオンプレミス AD でなく Azure AD Domain Services に対して行いたい

Azure AD Domain Services はパフォーマンス チューニングなど詳細なカスタマイズができません。また、追加のドメインコントローラーを昇格させたり、仮想マシンのサイズを変更したりなどの調整もできません。Azure AD Domain Services はほとんどのお客様に十分なパフォーマンスが提供されるよう管理されておりますが、非常に負荷の高い処理や、既定でインデックス化されていない属性に対する高頻度の LDAP クエリーなどをおこなった場合、応答に長い時間がかかる場合があります。結果としてパフォーマンス要求を満たさない可能性があります。

このことから、特に高負荷な処理については、事前に Azure AD Domain Services 上で十分検証いただくとともに、独自に構築した Active Directory での実施もご検討ください。

## まとめ

Azure AD Domain Services は、既存のオンプレミス Active Directory ドメイン コントローラーを完全に置き換えるものではありません。Azure AD Domain Services は Kerberos や NLTM、LDAP など従来のプロトコルを使用しているオンプレミス サーバーをクラウド (Azure) に移行できるよう促進し、組織のサーバー管理負荷を軽減するためのものです。

上記のとおり整理すると Azure AD Domain Service の効果的な利用シナリオは限られるように感じられるかもしれませんが、今後クラウドへの移行が進む中で、容易に廃止が難しいレガシーなサーバー群を Azure AD Domain Services と連携させ、クラウド化することは非常に効果的です。最終的にオンプレミスのドメイン コントローラーを利用するサービスがレガシーなサーバー群のみとなれば、それらのサーバーを仮想マシンとして Azure 上に移行し、Azure AD Domain Services と連携させることで、オンプレミスのドメイン コントローラーを廃止することも可能となります。これは多くの運用環境において非常に長い道のりとなりますが、そのソリューションの一つとして、Azure AD Domain Services を利用可能であるとご理解いただければ幸いです。

以上の内容でカバーされていない点で何か疑問点などございましたら、ぜひサポートサービスまでお問い合わせください。  
上記内容が参考となりましたら幸いです。
