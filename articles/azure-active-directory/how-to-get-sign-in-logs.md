---
title: Azure AD サインイン ログ取得方法まとめ
date: 2019-02-04
tags:
  - Azure AD
  - signin log
---

> 本記事は Technet Blog の更新停止に伴い https://blogs.technet.microsoft.com/jpazureid/2019/02/04/signin-log-summary/ の内容を移行したものです。
> 元の記事の最新の更新情報については、本内容をご参照ください。

# Azure AD サインイン ログ取得方法まとめ

こんにちは。Azure Identity チームの三浦です。

Azure AD のサインイン ログは Azure ポータルで確認するほかに次のような方法で確認することができます。

1. ポータルから CSV/JSON 形式のファイルをダウンロード
2. Log Analytics に統合する
3. API を利用して JSON 形式のファイルを取得する
4. データをエクスポートし、 PowerBI で解析する

それぞれ簡単に概要を紹介します。

なお、 Azure ポータルのサインインからログを確認することを含めて Azure AD テナントに Azure AD Premium のライセンスが必要ですのでご注意ください。

## 1. ポータルから CSV もしくは JSON 形式のファイルをダウンロード

Azure のポータルからは CSV もしくは JSON 形式でサインイン ログをダウンロードすることができます。ここで注意しなければいけないことが 2 点あります。

1) 取得できるエントリ数の制限

以前は 5000 件までという制限がありましたが、現在 (2019 年 4 月時点) は 250,000 件までのエントリの入手が可能です。それ以上のエントリについて取得したい場合にはスクリプトを利用する必要があります。

2) 日本語環境で文字化けする

ダウンロードした CSV ファイルには BOM (Byte Order Mark の略で Unicode 判別のために利用する情報) が含まれていません。そのため、ダウンロードしたファイルをそのまま Excel で開くと文字化けします。一旦ダウンロードした CSV ファイルを notepad.exe で開き、上書き保存すると BOM が付与されるため、その後は日本語が正しく表示されます。

## 2. Azure Monitor に統合する

Azure サブスクリプションをお持ちでしたら是非 Azure Monitor と Azure AD のサインインログの統合についても検討してみてください。
Azure Security Center や Application Insights の機能も利用可能です。詳細、具体的な手順については、こちらの公開情報を参照ください。

[Azure AD ログを Azure Monitor ログと統合する](https://docs.microsoft.com/ja-jp/azure/active-directory/reports-monitoring/howto-integrate-activity-logs-with-log-analytics)

## 3. API を利用して JSON 形式のファイルを取得する

2 と同じような目的となりますが、私たちのブログで紹介しているスクリプトでも JSON ファイルとして取得できます。

[Microsoft Graph API を利用して Azure AD のサインイン アクティビティ レポートをファイルに出力する PowerShell スクリプト](../azure-active-directory/microsoft-graph-api-signin-activity-reports.md)

> 以下の手順は廃止予定の Azure AD Graph を利用しており、新規に構成いただくことは推奨しておりません

~~[Azure AD Reporting API を利用して PowerShell より Azure AD のサインイン アクティビティ レポートと監査アクティビティ レポートを CSV ファイルで取得する方法](../azure-active-directory/azure-ad-reporting-api.md)~~ 

## 4. データをエクスポートし、 PowerBI で解析する

PowerBI には Azure AD のサインイン ログを解析するためのコンテンツ パックが用意されています。
このコンテンツ パックを利用することで、簡単に視覚化されたサインインのデータの確認が可能です。具体的な手順については、 Azure Active Directory Power BI コンテンツ パックの使用方法 を参照ください。
