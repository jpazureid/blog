# docs
日本マイクロソフト Azure Identity サポート チームのブログです。

チームの担当製品である Azure Active Directory、Azure AD Connect、AD FS の情報を中心にお届けします。その他の Azure 関連サポートチームのブログへのリンクもありますのでぜひご確認ください。

## Azure Active Directory

- PowerShell にて全ユーザーの最終サインイン日時を一括で取得する方法
- サブスクリプション作成時のエラー「アカウントが Azure サブスクリプションに関連付けられないディレクトリに属しています。別のアカウントでサインインしてください」
- 多要素認証 (MFA) のリセット手順
- Azure AD の OAuth 2.0 における Authorization Code の再利用禁止
- 条件付きアクセスの基本的な考え方
- Azure AD の ディレクトリロールが割り当てられたメンバーの一覧を取得したい
- テナント制限について
- Azure Active Directory への接続で使用する IP アドレス範囲の変更
- Azure MFA の多要素認証設定の統合
- Azure AD におけるロール管理の新しい方法
- 「ユーザーはアプリケーションを登録できる」の設定について
- RBAC のスコープについて
- [Azure AD B2B におけるユーザーの新しい招待方法](azure-active-directory/b2b-invitation.md)
- Azure AD のサインイン画面に関するアップデートのお知らせ
- ハイブリッド Azure Active Directory 参加済みデバイスの構成について
- Azure AD プロビジョニング機能について
- Azure AD が発行するトークンの有効期間について
- Azure AD 有償ライセンスの購入方法
- [クレーム ルールと条件付きアクセスの比較](active-directory-federation-service/claim-rule-conditional-access.md)
- Azure AD Reporting API を利用して PowerShell より Azure AD のサインイン アクティビティ レポートと監査アクティビティ レポートを CSV ファイルで取得する方法
- デバイス ベースのアクセス制御
- [Azure AD の追加・変更・削除](azure-active-directory/add-modify-delete-directory.md)
- [Azure ポータルへのアクセス制限](azure-active-directory/access-restriction-azure-portal.md)
- ACS の移行スケジュール
- [Member ユーザーと Guest ユーザーについて](azure-active-directory/member-and-guest-user.md)
- [Azure AD B2B とは](azure-active-directory/what-is-b2b.md)
- [Azure AD の条件付きアクセスに関する Q&A](azure-active-directory/qanda-conditional-access.md)
- [Azure Active Directory の PowerShell モジュール](azure-active-directory/powershell-module.md)
- [Azure サブスクリプションと Azure AD の管理者](azure-active-directory/subscription-azure-ad-relationship.md)
- 「アクセス権がありません」のエラーについて
- サブスクリプションが見えない
- 招待したユーザーが利用できない
- 招待メールを使用しないユーザーの追加方法
- 登録されたデバイスの管理方法
- [調査に有効な採取情報] Azure AD に関する問題全般
- [調査に有効な採取情報] ブラウザ経由での Azure AD 認証
- “Baseline policy: Require MFA for admins” について
- [Azure AD と AD FS のベスト プラクティス: パスワード スプレー攻撃の防御](azure-active-directory/password-sprey-attack.md)
- Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートを CSV ファイルで取得する PowerShell スクリプト
- Office 365 へのアクセスで iOS Accounts 登録のメッセージが表示され接続できない
- [Azure AD の ExpressRoute サポート変更](azure-active-directory/expressroute-support.md)
- [Microsoft 365 を用いたゼロ トラスト ネットワークの実現](azure-active-directory/zero-trust-network.md)
- 4/6 RCA - Azure Active Directory - 認証エラー (日本語抄訳)
- Azure MFA を求められるタイミングについて
- 入れ子 (ネスト) グループへの権限付与について
- [Azure AD サインイン ログ 取得方法まとめ](azure-active-directory/how-to-get-sign-in-logs.md)

## Azure AD Connect

- Azure AD Connect : ステージング サーバーのすゝめ
- Azure AD Connect : ディレクトリ同期の応用 – オブジェクト間の属性値の移動
- Azure AD Connect : 2018/11/7 以降 AADC 1.0.8641.0 以前では Password Writeback が利用できない
- Office 365 の TLS 1.0/1.1 無効化に伴うAzure AD Connectの対応
- Azure AD Connect サーバーの CPU 使用率が頻繁に 100% になる問題について
- [Azure AD Connect アップグレード手順](azure-active-directory-connect/how-to-upgrade.md)
- Azure AD Connect サーバー : ウィルス対策ソフト除外項目 / 使用する通信ポート
- Azure AD Connect : ディレクトリ同期の基本的なポイント
- Azure AD Connect：属性フロー（変換フロー）のためのカスタム同期ルールの作り方
- “AAD Notification” から送られた DirSync に関するメールについて
- Azure AD Connect Health Notification メールについて
- Azure AD Connect ビルド 1.1.749.0 の注意点
- Azure AD Connect サービスアカウントに関するセキュリティ アドバイザリについて (MC125948)
- Azure AD (Office 365) 上のユーザーをオンプレミス Active Directory ユーザーと紐付ける方法
- Azure AD Connect で実現するシングル サインオン
- DirSync & ADSync – 2017/12/31 で終了のお知らせ
- [Azure AD Connect] ID 同期と重複属性の回復性の動作について
- [自動アップグレード機能の問題](azure-active-directory-connect\auto-upgrade-issue.md)
- [調査に有効な採取情報] Azure AD Connect サーバーの全般情報
- [調査に有効な採取情報] Azure AD Connect でユーザー同期ができない問題

## AD FS

- AD FS クレームルール関連のトラブルシューティング
- AD FS 証明書認証のトラブルシューティング
- Windows Server 2019 AD FS の新機能
- AD FS プロキシの混雑回避アルゴリズムの動作
- クレーム ルールと条件付きアクセスの比較
- [デバイス ベースのアクセス制御](azure-active-directory/device-based-access-control.md)
- Office 365 の TLS 1.0/1.1 無効化に伴う AD FS / WAP (AD FS Proxy) の対応
- [フェデレーション環境 (Windows 統合認証) で [サインインの状態を維持しますか？] の画面が表示されない](active-directory-federation-service/kmsi-not-shown-wia.md)
- AD FS の自動証明書ロールオーバー機能について
- [AD FS の証明書更新手順 (SSLサーバー証明書)](active-directory-federation-service/update-ssl-server-certificate.md)
- [AD FS の証明書更新手順 (トークン署名証明書、トークン暗号化解除証明書)](active-directory-federation-service/update-token-certificate.md)
- AD FS が PDC と通信するケース
- 証明書利用者信頼のセキュア ハッシュ アルゴリズムについて
- Extranet Lockout について

## その他
- サブスクリプションや請求・課金について (Azure サブスクリプション サポートチーム ブログ)
- Azure IaaS、PaaS、Azure Backup について (Azure テクニカル サポートチーム ブログ)