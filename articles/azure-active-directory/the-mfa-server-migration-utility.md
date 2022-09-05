---
title: Azure MFA Server 移行ツール
date: 2022-09-05 00:00
tags:
  - Azure AD
  - US Identity Blog
---

こんにちは、Azure Identity サポート チームの 姚 (ヨウ) です。

本記事は、2022 年 8 月 31 日に米国の Azure Active Directory Identity Blog で公開された [One step closer to modernization: The MFA Server Migration Utility - Microsoft Tech Community](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/one-step-closer-to-modernization-the-mfa-server-migration/ba-p/3614027) を意訳したものになります。
ご不明点等ございましたらサポート チームまでお問い合わせください。

----

皆さん、こんにちは！

私たちは常に安全性と生産性を最大限に発揮でき、進化に合わせたソリューションを可能な限り容易に提供できるように努めています。
Azure AD の利用によって進化に合わせたセキュリティ対策を実施していく中、オンプレミス Azure MFA Server をクラウドベースの Azure MFA へ移行する際の支援が必要である旨を伺うことがあります。
クラウド ベースの MFA に移行することで構成上簡易化できるものがたくさん出てきます。例えば、オンプレミス Azure MFA Server と AD FS サーバーの撤去が挙げられます。
今回紹介します Azure MFA Server 移行ツールにより、移行作業の手助けができることを嬉しく思います。

2019 年 7 月からオンプレミス Azure MFA Server の新規ダウンロードを停止しました。
これはオンプレミス Azure MFA Server と比較した場合、クラウド ベースの Azure MFA が、コストの削減、展開の容易性、安全性の向上、機能の豊富さにおいて優位であることにも起因しています。
Azure MFA Server 移行ツールは管理者に簡単な作業でユーザーをオンプレミス MFA Server から Azure MFA に移行することによって、これらの利点を利用でき、インフラ環境の簡易化へ前進することができます。

このツールには以下の 2 つの特徴があります。

・Azure MFA Server 移行ツールは、エンドユーザーに再登録などの要求をすることなく、オンプレミスに保存時されているユーザーの認証データを Azure AD へ移行します。
このツールは最新バージョンの Azure MFA Server に含まれております。

・ Azure MFA の段階的ロールアウト機能は、フェデレーション設定を変更することなく、一部の対象ユーザーに対して Azure MFA への移行をテストできます。


はじめに

手順 1 : プライマリー Azure MFA Server をアップグレードします。
ここから最新版の Azure MFA Server をダウンロードし、プライマリー Azure MFA Server にインストールします。
もし、ほかにセカンダリ MFA Server が存在している場合、そのバージョンが 6.1.0 より新しいバージョンの場合、その他のサーバーについて追加のアップグレード作業は不要です。

手順 2 :移行対象のユーザーを選択します。
最新版の Azure MFA Server のインストール後、移行ツールを開きます。


![](/articles/azure-active-directory/the-mfa-server-migration-utility/the-mfa-server-migration-utility-01.png)

ユーザーデータの移行は、移行対象ユーザーが含まれる Azure AD グループ (グループのネストも可能です) を選択し、Azure AD へ移行する対象の MFA 方法を定義し、"Migrate Users" をクリックするだけの簡単な手順です。

手順 3 : Azure MFA を利用するユーザーを定義します。
ユーザーデータの移行後、移行対象グループを基に Azure MFA 段階的ロールアウトを利用して Azure MFA を利用するユーザーを設定します。

![](/articles/azure-active-directory/the-mfa-server-migration-utility/the-mfa-server-migration-utility-02.png)

テナントやフェデレーションの設定に対して変更を実施しないため、既存環境へ想定される影響は極めて低いです。また、テスト対象ユーザーについては、最低限のものを指定することができます。

テストおよび移行が完了しましたら、追加のインフラストラクチャーやメンテナンス費用の発生を抑止するために、即時 MFA Server を撤去できます。
移行ツールの詳細は[公開情報](https://docs.microsoft.com/en-us/azure/active-directory/authentication/how-to-mfa-server-migration-utility)も参照ください。
