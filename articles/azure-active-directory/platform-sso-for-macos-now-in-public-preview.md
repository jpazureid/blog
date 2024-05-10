---
title: macOS 用のプラットフォーム SSO 機能がパブリック プレビューで利用可能になりました
date: 2024-05-10 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# macOS 用のプラットフォーム SSO 機能がパブリック プレビューで利用可能になりました

こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2024 年 5 月 6 日に米国の Microsoft Entra Blog で公開された [Platform SSO for macOS now in public preview](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/platform-sso-for-macos-now-in-public-preview/ba-p/4051574) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

本日、Microsoft Entra ID における macOS 用のプラットフォーム SSO 機能が **パブリック プレビュー** で利用可能になりましたことを発表いたします。プラットフォーム SSO の機能は、[Apple デバイス用の Microsoft Enterprise SSO プラグイン](https://learn.microsoft.com/ja-jp/entra/identity-platform/apple-sso-plugin) の拡張機能であり、Mac デバイスの利用と管理をよりシームレスに、また安全にするものです。

パブリック プレビューの開始時では、プラットフォーム SSO は Microsoft Intune との組み合わせで動作します。Microsoft Intune 以外の他のモバイル デバイス管理 (MDM) プロバイダーについては、パブリック プレビュー中に追加される予定です。サポートや利用可否の詳細については、各 MDM プロバイダーにお問い合わせください。

このリリースにより、macOS 向けの Microosft Entra 参加と呼べる機能を導入することとなります。この機能は Enterprise SSO プラグインを利用して、ハードウェアに紐づくデバイス情報を Entra ID に作成します。Entra 参加では、Entra ID の組織アカウントの利用が必要です。

さらに、次の 3 つの新しい認証方法が利用可能になり、すべて MDM で構成可能、かつ [Microsoft Entra ID Free](https://www.microsoft.com/ja-jp/security/business/microsoft-entra-pricing) の一部として利用可能となります:

1. **Secure Enclave を用いたパスワードレス認証**: Windows Hello for Business と同様に、この方法を使用すると、ユーザーはローカル アカウントとパスワードを使用してデスクトップに対話的にサインインすることが可能になります。ユーザーがサインインすると、デバイスの Secure Enclave に保存されている、ハードウェアに紐づいた暗号キーが Entra ID の信頼できる資格情報として使用され、認証に Entra ID を使用するアプリケーション間でユーザーに SSO が提供されます。この方法により、ユーザーは Touch ID でパスワードを使用せずにデバイスのロックを解除し、デバイスに紐づいたキーを使用して内部的に Entra ID にサインインできるようになります。セキュリティ キーやカード リーダー、その他のハードウェアを購入する必要がなくなるため、組織のコスト削減に繋がります。当社のセキュリティおよびコンプライアンス基準については、[このガイド](https://learn.microsoft.com/ja-jp/entra/standards/nist-authenticator-types) を参照ください。

2. **スマート カードによるパスワードレス認証**: この方法では、ユーザーは外部のスマート カード (または Yubikey などのスマート カード互換のハード トークン) を使用して Mac にサインインします。デバイスのロックが解除されると、スマートカードがさらに Entra ID に対して利用され、認証に Entra ID を使用するアプリ間では SSO が行われます。
  
3. **ローカル アカウントとのパスワード同期**: この方法により、ユーザーは Entra ID パスワードを使用してローカル マシン アカウントに対話的にサインインでき、Entra ID を使用するアプリ間では SSO が行われます。ユーザーは個別のパスワードを記憶しておく必要がなくなり、Entra ID パスワードへの変更はローカル マシンに同期されます。
  
## 利用を始めるには

本日より、Platform SSO for macOS の最新のドキュメントとチュートリアルを [Microsoft Learn](https://learn.microsoft.com/ja-jp/entra/identity/devices/macos-psso) でご覧いただけます。セットアップや展開、利用方法、トラブルシューティングについては当該資料をご覧ください。

もし、まだお済みでない場合には、以下の手順を実施して、ご準備ください:

1. [Mac OS 用ポータル サイト アプリ 5.2404.0 以降が使用できるようデバイスを更新します。](https://learn.microsoft.com/ja-jp/mem/intune/apps/apps-company-portal-macos)
2. [Enterprise SSO プラグイン](https://learn.microsoft.com/ja-jp/entra/identity-platform/apple-sso-plugin) を展開します。
3. ユーザーが [多要素認証に登録](https://learn.microsoft.com/ja-jp/entra/id-protection/howto-identity-protection-configure-mfa-policy) していることを確認します。多要素認証の方法としては、Microsoft Authenticator の使用をお勧めします。
4. Google Chrome ユーザーの場合は、[Microsoft シングル サインオン拡張機能](https://chromewebstore.google.com/detail/microsoft-single-sign-on/ppnbnpeolgkicgegkbkbjmhlideopiji?pli=1) をインストールします。
5. macOS デバイスを macOS 13** (Ventura) 以降に更新します。最良の UX と機能を実現するには、macOS 14 (Sonoma) をお勧めします。

注意: macOS 13 の非共有キーから共有キー (macOS 14 以降でサポート) に移行する際には、ユーザーによるデバイス再登録が必要であることご注意ください。

## 今後さらに多くの機能が追加されます

パブリック プレビューをとおした段階的なリリースを通じて、制御機能やレポート、監査、およびサインイン ログ機能の追加と、それらを構成、参照、および管理するための Microsoft Graph API を順次導入していきます。Windows Hello for Business のように、一部の機能には Microsoft Entra Premium ライセンスが必要な場合があることにご注意ください。

Brian Melton-Grace  
Senior Product Manager, Microsoft
