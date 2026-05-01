# Amazon SES Production Access 申請 — ＨＲｔｅｐ株式会社 コーポレートサイト

**申請主体**: ＨＲｔｅｐ株式会社
**AWS アカウント ID**: 688518755365
**申請リージョン**: ap-northeast-1（アジアパシフィック (東京)）

---

## 推奨申請経路

```
SES Console (https://ap-northeast-1.console.aws.amazon.com/ses/home?region=ap-northeast-1)
  → 左メニュー「Account dashboard」
  → 右上「Request production access」ボタン
```

Service Quotas の「Sending quota 引き上げリクエスト」より、SES Console 専用フォームの方が AWS Trust and Safety チームに直接届くため、過去事例で審査がスムーズ。

---

## SES Console 専用フォームの選択肢

| 項目                                               | 選択値                             | 根拠                                                                                                                              |
| -------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Mail type**                                      | **Transactional**                  | 送信メールはユーザー（フォーム送信者）の明示的アクションをトリガーとする 1 件 1 通の取引メールに限定。Marketing / Bulk は一切なし |
| **Website URL**                                    | `https://hrtep.com`                | ＨＲｔｅｐ株式会社が運営する日本語コーポレートサイト（移行作業中、Phase 3 切替後も同 URL）                                        |
| **Use case description**                           | 下記「本文」を貼付け               | 1000 語超の詳細記述で AWS が懸念する項目を網羅                                                                                    |
| **Additional contacts**                            | `tbnkin@gmail.com`（弊社運用担当） | カンマ区切り、最大 4 件まで追加可能                                                                                               |
| **Preferred contact language**                     | **Japanese**                       | 申請文も日本語で記載                                                                                                              |
| **AWS Service Terms / Acceptable Use Policy 同意** | チェック                           | 必須                                                                                                                              |

---

## 申請前必須チェックリスト（提出時に必ず確認）

提出ボタンを押す前に、以下がすべて満たされていることを確認すること。1 つでも欠けると AWS Trust & Safety から追加質問が発生し、5 往復化する原因になる。

- [ ] **リージョンが ap-northeast-1（東京）**である（画面右上で確認）
- [ ] **Domain identity `send.hrtep.com` の DKIM Status が `SUCCESS`** である
  - 確認: `aws sesv2 get-email-identity --email-identity send.hrtep.com --profile hrtep --region ap-northeast-1 --query 'DkimAttributes.Status'`
- [ ] **送信ドメイン `send.hrtep.com` の `VerifiedForSendingStatus` が `true`** である
- [ ] **SNS トピック `arn:aws:sns:ap-northeast-1:688518755365:ses-bounces-complaints` が存在し、SES からの publish が許可されている**
- [ ] **SES Configuration Set `hrtep-default` が作成され、Bounce / Complaint / Delivery / DeliveryDelay / Reject イベントを SNS に配信する設定になっている**
- [ ] **SES Account-level Suppression list が `BOUNCE` および `COMPLAINT` で有効化されている**
- [ ] **CloudWatch Alarm 4 件（bounce-rate-warning/critical, complaint-rate-warning/critical）がすべて `OK` 状態で稼働中**
- [ ] **CloudWatch Dashboard `hrtep-corporate` が作成済み**
- [ ] **サンドボックス内でテスト送信 1 件以上を実施し、配信成功 1 件・バウンス 0 件・苦情 0 件の実績がある**（SES Console > Account dashboard の Sending statistics で確認）
- [ ] **プライバシーポリシー URL（`https://hrtep.com/privacy`）が現時点で 200 応答している**（現行 WordPress サイトに `/privacy` ページが既存）
- [ ] **お問合せフォーム URL（`https://hrtep.com/contact`）が現時点で 200 応答している**

---

## 件名（Use case description summary）

```
SES Production Access Request - HRtep Corporate Site Contact Form (B2B Transactional, Single Internal Notification)
```

---

## 本文（Use case description にコピペ・1500 語超）

```
AWS Trust and Safety チーム御中

ＨＲｔｅｐ株式会社（以下「弊社」）コーポレートサイト hrtep.com の B2B 問合せ
フォームに伴うトランザクションメール送信について、Amazon SES の本番アクセス
（Production Access）を申請いたします。

本申請は、不特定多数への送信や Marketing 送信を一切伴わない、極めて限定的
かつ低リスクなユースケースです。送信先は弊社管理下の固定アドレス 1 つに限定
され、サイト訪問者本人に対する SES 経由のメール送信は発生いたしません（後述）。
以下、AWS Trust and Safety チームのご審査に必要となる情報を、項目別に詳細
記載いたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 1. 申請主体（弊社）の概要
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

会社名: ＨＲｔｅｐ株式会社（HRtep Co., Ltd.）
設立: 2021 年 9 月 1 日
代表者: 代表取締役 津賀平 隆浩
本社: 東京都中央区京橋 3-12-1 エコー京橋ビル 5 階
銀座営業所: 東京都中央区銀座 1-16-7 銀座大栄ビル
電話: 03-6228-7866（平日 9:00〜18:00）
コーポレートサイト: https://hrtep.com
事業内容:
  (a) 外国人材の就労促進マッチングサービス（外国人材特化型の
      人材マッチングプラットフォーム「ＨＲｔｅｐプラットフォーム」運営）
  (b) IT 事業（DX 支援、AI 活用支援、システム開発、Web アプリ開発）
ミッション: 「人手不足の課題解消・真の共生社会実現へ」

弊社は設立以来 4 年以上にわたり、東京中央区に本社を構え、人材紹介および
IT サービス事業を継続的に運営している実体ある法人です。本申請対象の AWS
アカウント（ID: 688518755365）でも、人材データベース等の業務システムを
継続運用中であり、新規ベンダーの試用ではなく、既存の AWS 利用実績の中での
スコープ拡張です。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 2. ビジネス背景と本申請の目的
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

弊社は現行 WordPress で運営している hrtep.com を、Next.js 16 + AWS Amplify
Hosting にリニューアル中です。本リニューアルは、外国人材紹介事業に加え、
新たに展開する IT 事業を訴求する目的で実施しております。

本サイトには「お問合せフォーム」（https://hrtep.com/contact）が設置されて
おり、潜在顧客（B2B 顧客企業）が当社サービス（人材紹介もしくは IT 受託）に
関する相談を申し込むためのチャネルとして機能します。

このフォームから送信があった際、弊社問合せ担当者宛に Amazon SES 経由で
通知メールを 1 通送信する経路を構築する目的で、本 Production Access を
申請いたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 3. メールの用途（送信対象は弊社管理下の固定アドレス 1 つのみ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ユーザーが hrtep.com のお問合せフォームから送信ボタンを押した時点に限り、
以下 1 種類のトランザクションメールのみを発火いたします。

【社内通知メール（Internal notification）】
  - From: noreply@send.hrtep.com
  - To: 弊社問合せ担当者宛の固定アドレス 1 つ（弊社管理下、Google Workspace で受信）
  - Reply-To: フォーム送信者本人のメールアドレス（フォーム入力値）
  - Subject 例: [お問い合わせ] 採用に関するご相談 - 株式会社○○
  - 本文サンプル:

      会社名: 株式会社○○
      氏名: 山田 太郎
      メール: yamada@example.co.jp
      電話: 03-XXXX-XXXX
      種別: 採用に関するご相談

      お問い合わせ内容:
      （ユーザーがフォームに入力した本文）

  - 送信タイミング: フォーム送信ボタン押下時に 1 通のみ。再送信は一切なし
  - 件数: 1 フォーム送信 = 1 メール送信（不特定多数送信は物理的に発生しない）

【重要 — 自動返信メールの不存在】
本実装では、フォーム送信者本人に対する SES 経由のメール送信は一切行いません。
代わりに、社内通知メールに Reply-To ヘッダとしてフォーム送信者本人のメール
アドレスを設定しているため、弊社担当者は受信メールクライアント（Google
Workspace）の「返信」操作だけでフォーム送信者本人へ直接返信できます。
これにより、SES の送信先は常に弊社管理下の固定アドレス 1 つに限定されます。

【送信しないメールの明確化】
弊社は SES を使って以下のメール送信は一切行いません:
  - Marketing メール、ニュースレター、プロモーションメール
  - 一括送信、リスト送信、バッチ送信
  - 定期配信、自動配信、再マーケティング
  - Cold email、コールドアウトリーチ
  - 不特定多数への送信、未承諾送信
  - 受信者本人への自動返信（前述）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 4. 受信者リスト管理（リスト不在）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  - 弊社は SES 送信用の受信者リスト（メーリングリスト等）を一切保有して
    おりません。
  - 送信先は弊社管理下の固定アドレス 1 つ（社内担当者宛）のみで、これは
    ハードコードされた値ではなく、AWS Amplify Hosting の環境変数として
    設定されます。
  - 購入リスト、第三者から提供されたデータ、Web スクレイピングで収集
    したアドレス、SNS 等から取得したアドレスは一切使用しません。
  - リスト購入や ESP（Email Service Provider）からのリストインポートは
    一切行いません。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 5. オプトイン取得・スパム対策
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【フォーム送信者本人による情報入力】
  - お問合せフォーム送信者は、サイト上のフォーム（HTML form 要素）で
    自らメールアドレスを含む全情報を入力します。
  - 弊社が能動的にメールアドレスを収集する経路は存在しません。

【プライバシーポリシーへの明示同意】
  - フォーム上に「プライバシーポリシーに基づく個人情報の取扱いに同意の上、
    送信してください」の旨を明示し、同意チェックボックス（必須項目）を
    実装済みです（送信時に Zod スキーマで `agreement: z.literal(true)` を
    必須化、未チェック時は送信不可）。
  - プライバシーポリシー: https://hrtep.com/privacy（既存ページ、移行
    後も同 URL）

【ボット送信排除】
  - Google reCAPTCHA v3 によるスコアベースのボット送信排除を本番稼働
    させております（クライアント側で `grecaptcha.execute()` により
    action='contact_submit' のトークンを取得、サーバー側で Google の
    siteverify エンドポイントに POST し、success=true かつ score ≥ 0.5
    でない場合は送信を拒否）。
  - 加えてサーバー側で Zod スキーマによるバリデーションを実施し、
    異常な入力パターンを排除します。

【送信元の検証】
  - フォームに入力されるメールアドレスは、弊社の社内通知メールの
    Reply-To にのみ使われ、SES からの送信先（To）にはなりません。
  - したがって、悪意あるユーザーが第三者のメールアドレスを入力したと
    しても、その第三者宛に SES からメールが送信されることはありません。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 6. バウンス・苦情処理（自動化済み）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

本申請の前提として、以下のバウンス・苦情処理基盤を構築済みです。

【SES Configuration Set による送信メタデータ取得】
  - Configuration Set 名: hrtep-default
  - Reputation Tracking: 有効
  - 監視対象イベント: BOUNCE / COMPLAINT / DELIVERY /
    DELIVERY_DELAY / REJECT

【SNS トピックによるイベント受信】
  - SNS Topic ARN: arn:aws:sns:ap-northeast-1:688518755365:ses-bounces-complaints
  - Topic Policy: ses.amazonaws.com に sns:Publish を許可（SourceAccount
    条件で 688518755365 に限定）
  - SES Event Destination から上記 5 種のイベントが SNS にリアルタイム
    で配信されます。

【Account-level Suppression List】
  - SES アカウント全体で BOUNCE / COMPLAINT を Suppression 対象として
    有効化済み。
  - バウンスもしくは苦情を受けたアドレスは、AWS が自動的に以後の送信
    対象から除外します（再送信防止）。

【CloudWatch Alarms（4 件、すべて Active）】
  - hrtep-ses-bounce-rate-warning: BounceRate ≥ 4% で発火（警告）
  - hrtep-ses-bounce-rate-critical: BounceRate ≥ 5% で発火（AWS の
    自動停止閾値）
  - hrtep-ses-complaint-rate-warning: ComplaintRate ≥ 0.05% で発火
  - hrtep-ses-complaint-rate-critical: ComplaintRate ≥ 0.1% で発火
  - 通知先: SNS Topic 'hrtep-cloudwatch-alarms'（弊社運用担当
    tbnkin@gmail.com が購読確認済み）

【CloudWatch Dashboard】
  - Dashboard 名: hrtep-corporate
  - SES Email Events / SES Reputation / Amplify Traffic / SNS Activity
    / Alarms を 1 画面で常時監視

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 7. ドメイン認証（送信ドメイン）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【送信ドメイン】
  - 送信ドメイン: send.hrtep.com（apex の hrtep.com とは別のサブドメイン）
  - 設計理由: apex の hrtep.com は受信メール（Google Workspace）用の
    MX / SPF / DMARC が稼働中のため、受信メール経路への影響をゼロにする
    べく、送信専用のサブドメインを採用。

【DKIM】
  - AWS SES Easy DKIM (RSA 2048bit) で認証済み。Verification Status:
    SUCCESS（DNS の CNAME レコード 3 件が反映され、AWS による検証完了）。

【SPF】
  - send.hrtep.com 配下に SES の include を設定（apex には影響を与え
    ません）。

【DMARC】
  - 既存の _dmarc.hrtep.com（v=DMARC1; p=none; fo=1; rua=mailto:mori@hrtep.com）
    が稼働中。本申請に伴う変更はありません。

【DNS 管理】
  - お名前.com（外部 DNS）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 8. 想定送信量・ピーク TPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【期間別】
  - ローンチ初月: 月 30 通以下（1 日 1 通未満）
  - 12 ヶ月以内: 月 60 通以下
  - ピーク時想定: 月 100 通以下、最大でも 1 日 10 通以内

【ピーク時 TPS】
  - 約 0.001 TPS（1 秒あたり 0.001 メッセージ）
  - これは「1 通送信されてから次の 1 通までの平均間隔が 15 分以上」を
    意味します。Amazon SES のデフォルト送信レート（Production 段階で
    通常 14 messages/秒）の 0.0001% 未満です。

【見積根拠】
  - 既存 WordPress + Contact Form 7 における過去 12 ヶ月の問合せ数の
    実績ベース。
  - ＨＲｔｅｐ株式会社の B2B ビジネスモデル（人材紹介・IT 受託）の
    特性上、1 日に多数の問合せが発生する性質ではない。
  - マーケティング施策による急激な問合せ増加の予定はなく、Amazon SES
    の安定運用に十分なバッファがあります。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 9. 技術実装
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【ホスティング】
  - AWS Amplify Hosting（Compute / SSR）
  - リージョン: ap-northeast-1
  - リポジトリ: GitHub
  - フレームワーク: Next.js 16

【SES 呼び出し】
  - AWS SDK for JavaScript v3（@aws-sdk/client-sesv2）
  - Next.js 16 Server Action から SendEmailCommand を呼び出し
  - Configuration Set 'hrtep-default' を経由（イベント追跡）
  - 送信処理は同期処理。バッチ送信、キューイング、スケジュール送信、
    リトライキューは一切使用しません。

【認証】
  - IAM Role 'hrtep-amplify-compute-role'（Amplify SSR 専用、
    AssumeRole 元: amplify.amazonaws.com）
  - 許可アクション: ses:SendEmail / ses:SendRawEmail のみ
  - 許可リソース: send.hrtep.com Identity および hrtep-default
    Configuration Set のみ
  - 弊社の他 IAM ユーザーやリソースへのアクセスは一切なし
  - 長期アクセスキーは使用せず、Amplify SSR 関数が AssumeRole で
    一時クレデンシャルを取得します（漏洩リスクの最小化）。

【ログ】
  - CloudWatch Logs にすべての送信ログを記録（成功・失敗とも）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 10. サンドボックスでのテスト実績
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

サンドボックス段階で以下のテスト送信を実施済みです（SES Console >
Account dashboard の Sending statistics で確認可能）。

  - 配信成功率: 100%
  - バウンス率: 0%
  - 苦情率: 0%
  - 配信遅延: なし

テスト送信先は弊社管理下の検証用アドレス（tbnkin@gmail.com、
SES に Verified Identity として登録済み）に限定しています。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 11. 配信停止について
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

本申請のメールは、CAN-SPAM 法上の Transactional に該当するため、
unsubscribe リンクの法的要件は対象外です。ただし、運用上の以下の
配慮を行います。

  - 1 件のフォーム送信に対し 1 通のみ送信し、再送信は一切なし。
  - 送信先は弊社管理下の固定アドレス 1 つのみ（社内担当者宛）で、
    将来この担当者から「停止希望」の意思表示があった場合は、
    Amplify Hosting の環境変数 CONTACT_EMAIL_TO を別の社内担当者
    アドレスに変更するだけで切り替え可能。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 12. AWS との既存関係
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  - AWS アカウント ID: 688518755365
  - 当該アカウントは弊社の業務システム（人材データベース等）の
    継続運用に使用中（4 年以上の稼働実績）。
  - AWS への支払いは 4 年以上にわたり継続中（請求滞納なし）。
  - 本申請は新規ベンダー追加ではなく、既存 AWS 環境内での
    スコープ拡張です。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 13. 申請対象（再掲）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  - AWS アカウント ID: 688518755365
  - 申請リージョン: ap-northeast-1（アジアパシフィック (東京)）
  - 申請対象: Amazon SES Production Access の付与
  - 想定 Sending quota: Production 標準枠（50,000 通/24h、14 通/秒）
    で十分（弊社想定流量の数百倍のバッファ）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ご審査のほど、何卒よろしくお願い申し上げます。

ＨＲｔｅｐ株式会社
本社: 東京都中央区京橋 3-12-1 エコー京橋ビル 5 階
電話: 03-6228-7866
URL: https://hrtep.com
```

---

## AWS から想定される追加質問と回答準備

過去の SES 申請事例で Trust and Safety チームから追加で求められる代表的な質問と、本申請文では先回りで答えた箇所を以下に整理。追加質問が来た場合の回答素材として活用。

### Q1: DKIM 認証完了の証跡を提示してください

**回答素材**:

> SES Console > Verified identities > send.hrtep.com の画面で「Authentication」セクションを開き、DKIM Status が「Successful」と表示されているスクリーンショットを添付いたします。
> CLI 確認コマンド:
>
> ```
> aws sesv2 get-email-identity --email-identity send.hrtep.com \
>   --profile hrtep --region ap-northeast-1 \
>   --query 'DkimAttributes.Status'
> ```
>
> 結果: `"SUCCESS"`

### Q2: お問合せフォームの opt-in チェックボックスのスクショを送ってください

**回答素材**:

> https://hrtep.com/contact のページで、「プライバシーポリシーに基づく個人情報の取扱いに同意の上、送信してください」のチェックボックス（必須項目）が表示されている画面のスクリーンショットを添付いたします。本フォームは Phase 3（DNS 切替）完了前の現時点では Amplify プレビュー URL（https://main.d3561ojkga3nyn.amplifyapp.com/contact）でも同一実装を確認可能です。

### Q3: バウンス処理の実装コードを見せてください

**回答素材**:

> Amazon SES Account-level Suppression List を有効化（BOUNCE および COMPLAINT を Suppressed Reasons に設定）しているため、AWS が自動的にバウンス・苦情を発生させたアドレスを以後の送信対象から除外します。
>
> 加えて、SES Configuration Set 'hrtep-default' の Event Destination で SNS トピック ARN: arn:aws:sns:ap-northeast-1:688518755365:ses-bounces-complaints へバウンス・苦情イベントを配信し、CloudWatch Alarm 4 件（BounceRate / ComplaintRate × Warning / Critical）で監視しています。
>
> 本申請ユースケースでは送信先が弊社管理下の固定アドレス 1 つに限定されるため、ユーザーリストへの再送信が物理的に発生しません。

### Q4: 想定流量を超える可能性は？

**回答素材**:

> 弊社既存の WordPress + Contact Form 7 における過去 12 ヶ月の問合せ件数は月平均 30 件以下で、現在マーケティング施策による急激な問合せ増加の予定はありません。万一急増した場合でも、CloudWatch Alarms により BounceRate / ComplaintRate を常時監視しており、異常時は CONTACT_EMAIL_TO 環境変数を切り替えて即座に運用を制御できます。

### Q5: お問合せフォーム送信者本人へは SES から自動返信メールを送らないのですか？

**回答素材**:

> はい、SES からはフォーム送信者本人へのメール送信を一切行いません。代わりに、社内通知メールの Reply-To ヘッダにフォーム送信者本人のメールアドレスを設定しているため、弊社担当者は受信した社内通知メールに対して通常の「返信」操作を行うだけで、フォーム送信者本人へ直接返信できます。この返信は弊社の Google Workspace 経由で行われ、SES の送信経路は経由しません。これにより SES の送信先は常に弊社管理下の固定アドレス 1 つに限定されます。

### Q6: 弊社の事業内容と SES 利用との関連性は？

**回答素材**:

> ＨＲｔｅｐ株式会社（2021 年設立、本社: 東京都中央区京橋）は、外国籍人材の就労促進マッチングサービス「HRtep プラットフォーム」と、IT 受託事業（DX 支援、AI 活用支援、システム開発、Web アプリ開発）を展開する B2B 企業です。本 SES 利用は、コーポレートサイト hrtep.com のお問合せフォーム送信に伴う社内通知メール（B2B 顧客企業からの相談を弊社担当者に通知）の単一目的に限定されます。

---

## 補足：審査が通った後

1. AWS Trust and Safety が Production Access を付与すると、Sending quota が自動的に標準値（50,000 通/24h、14 通/秒）に引き上げられる。
2. これは弊社の想定流量（月 100 通以下）を遥かに上回るため、追加の Sending quota 引き上げ申請は不要。
3. 引き上げ後、弊社は `app/contact/actions.ts` の `fix/contact-actions-ses-migration` ブランチを main にマージし、Amplify Hosting の自動デプロイを経て、フォーム送信を SES 経由に切り替える。
4. その後、Phase 3（DNS 切替）に着手する。
