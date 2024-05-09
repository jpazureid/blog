---
title: macOS 用のプラットフォーム SSO 機能が パブリック プレビューで利用可能になりました
date: 2024-05-15 10:00
tags:
  - Azure AD
  - US Identity Blog
---

# macOS 用のプラットフォーム SSO 機能が パブリック プレビューで利用可能になりました

こんにちは、Azure Identity サポート チームの 名取 です。

本記事は、2024 年 5 月 6 日に米国の Microsoft Entra Blog で公開された[Platform SSO for macOS now in public preview](https://techcommunity.microsoft.com/t5/microsoft-entra-blog/platform-sso-for-macos-now-in-public-preview/ba-p/4051574) を意訳したものになります。ご不明点等ございましたらサポート チームまでお問い合わせください。

----

本日、Microsoft Entra ID における macOS 用のプラットフォーム SSO 機能が**パブリック プレビュー**で利用可能になりましたことを発表いたします。プラットフォーム SSO の機能 は、[Apple デバイス用の Microsoft Enterprise SSO プラグイン](https://learn.microsoft.com/ja-jp/entra/identity-platform/apple-sso-plugin)の拡張機能であり、Mac デバイスの利用と管理をよりシームレスに、また安全にするものです。

パブリック プレビューの開始時では、プラットフォーム SSO は Microsoft Intune との組み合わせで動作します。Microsoft Intune 以外の他のモバイル デバイス管理 (MDM) プロバイダーについては、パブリック プレビュー中に追加される予定です。サポートや利用可否の詳細については、各 MDM プロバイダーにお問い合わせください。

このリリースにより、macOS 向けの Microosft Entra 参加と呼べる機能を導入することとなります。この機能は Enterprise SSO プラグインを利用して、Entra ID にハードウェアに紐づくデバイス情報を作成します。Entra 参加では、Entra ID の組織アカウントの利用が必要です。

さらに、次の 3 つの新しい認証方法が利用可能になり、すべて MDM で構成可能、かつ [Microsoft Entra ID Free](https://www.microsoft.com/ja-jp/security/business/microsoft-entra-pricing) の一部として利用可能となります。