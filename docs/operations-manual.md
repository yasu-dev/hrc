# HRｔｅｐ コーポレートサイト 運用マニュアル

**対象期間**: Phase 2 SES 本番アクセス取得後〜
**運用主体**: leadx 株式会社
**最終更新**: 2026-05-01

---

## 1. システム構成（クイックリファレンス）

| レイヤー     | サービス                                    | 設定箇所                                    |
| ------------ | ------------------------------------------- | ------------------------------------------- |
| ホスティング | AWS Amplify Hosting                         | App ID `d3561ojkga3nyn`、ブランチ `main`    |
| ドメイン     | hrtep.com（Phase 3 切替後）                 | お名前.com（安井様管理）                    |
| 送信メール   | Amazon SES（送信ドメイン `send.hrtep.com`） | AWS アカウント 688518755365、ap-northeast-1 |
| 受信メール   | Google Workspace + onamae.ne.jp（既存）     | 本作業対象外                                |
| reCAPTCHA    | v3 スコアベース                             | Google reCAPTCHA Admin                      |

すべて AWS プロファイル: `--profile hrtep --region ap-northeast-1`

---

## 2. 日常運用：問合せフォームのログ確認

### 2-a. CloudWatch Logs での確認

Amplify Hosting の SSR ランタイムログには `[Contact]` プレフィックスの記録が残ります。

```bash
# 直近 1 時間の問合せ関連ログを取得
aws --profile hrtep --region ap-northeast-1 logs tail \
  /aws/amplify/d3561ojkga3nyn \
  --since 1h --format short \
  --filter-pattern "[Contact]"
```

ログパターン:

- `[Contact] reCAPTCHA verify rejected: ...` — reCAPTCHA 不正でフォーム送信を拒否
- `[Contact] メール設定未完了。送信データ: ...` — `CONTACT_EMAIL_TO` 未設定時の暫定動作
- `[Contact] SES SendEmail エラー: ...` — SES 送信失敗

### 2-b. SES 送信状況の確認

```bash
# 直近の SES 送信統計
aws --profile hrtep --region ap-northeast-1 sesv2 get-account \
  --query 'SendQuota'

# 送信 24 時間履歴・バウンス苦情件数
aws --profile hrtep --region ap-northeast-1 sesv2 list-recommendations
```

---

## 3. バウンス・苦情対応

### 3-a. バウンス／苦情が発生した場合の自動挙動

1. SES が BOUNCE / COMPLAINT イベントを発火
2. SNS Topic `ses-bounces-complaints` に publish される
3. 購読者（`tbnkin@gmail.com`）にメール通知が届く
4. 同時に Account-level Suppression List に該当アドレスが自動追加され、以後の送信から除外される
5. CloudWatch Alarm（4 件）が `BounceRate` ないし `ComplaintRate` を監視中で、閾値超過時には別 SNS Topic `hrtep-cloudwatch-alarms` 経由で通知

### 3-b. 受信メール確認手順

`tbnkin@gmail.com` の受信トレイで以下のメール件名をチェック：

| 送信元                       | 件名例                                  | 緊急度   |
| ---------------------------- | --------------------------------------- | -------- |
| `no-reply@sns.amazonaws.com` | "AWS Notification" + bounced address    | 中       |
| `no-reply@sns.amazonaws.com` | "ALARM: hrtep-ses-bounce-rate-warning"  | 高       |
| `no-reply@sns.amazonaws.com` | "ALARM: hrtep-ses-bounce-rate-critical" | **最高** |
| `no-reply@sns.amazonaws.com` | "ALARM: hrtep-ses-complaint-rate-\*"    | **最高** |

### 3-c. Critical アラーム発火時の対応フロー

1. **送信を即時停止する** — Amplify 環境変数 `CONTACT_EMAIL_TO` を空に変更し、再デプロイ。フォーム送信は暫定無効化分岐に入り、ユーザーには「お問い合わせを受け付けました（メール送信は環境設定完了後に有効化されます）」表示
2. **原因特定** — CloudWatch Logs で `[Contact]` ログを直近 24 時間分確認、bounce 詳細を SNS 通知で確認
3. **Suppression List で個別解除を検討** — 誤バウンスの場合、特定アドレスを除外

   ```bash
   aws --profile hrtep --region ap-northeast-1 sesv2 \
     get-suppressed-destination --email-address <addr>

   aws --profile hrtep --region ap-northeast-1 sesv2 \
     delete-suppressed-destination --email-address <addr>
   ```

4. **対策完了後に送信再開** — `CONTACT_EMAIL_TO` を再設定して再デプロイ

### 3-d. Suppression List の状態確認

```bash
# 現在の Suppression List 全件
aws --profile hrtep --region ap-northeast-1 sesv2 list-suppressed-destinations \
  --query 'SuppressedDestinationSummaries[].{email:EmailAddress,reason:Reason,lastUpdated:LastUpdateTime}' \
  --output table
```

---

## 4. CloudWatch アラーム閾値（参考）

| アラーム名                          | メトリクス                 | 閾値    | 意味                                  |
| ----------------------------------- | -------------------------- | ------- | ------------------------------------- |
| `hrtep-ses-bounce-rate-warning`     | `Reputation.BounceRate`    | ≥ 4%    | 警告（AWS の自動停止閾値の手前）      |
| `hrtep-ses-bounce-rate-critical`    | `Reputation.BounceRate`    | ≥ 5%    | 重大（AWS が SES を自動停止する閾値） |
| `hrtep-ses-complaint-rate-warning`  | `Reputation.ComplaintRate` | ≥ 0.05% | 警告                                  |
| `hrtep-ses-complaint-rate-critical` | `Reputation.ComplaintRate` | ≥ 0.1%  | 重大                                  |

すべて `arn:aws:sns:ap-northeast-1:688518755365:hrtep-cloudwatch-alarms` への通知を設定済。

### アラーム動作テスト（手動発火）

```bash
# 一時的に ALARM 状態へ
aws --profile hrtep --region ap-northeast-1 cloudwatch set-alarm-state \
  --alarm-name hrtep-ses-bounce-rate-warning \
  --state-value ALARM \
  --state-reason "Manual test"

# 元に戻す
aws --profile hrtep --region ap-northeast-1 cloudwatch set-alarm-state \
  --alarm-name hrtep-ses-bounce-rate-warning \
  --state-value OK \
  --state-reason "Manual test complete"
```

---

## 5. 問合せ送信先アドレスの変更（環境変数 `CONTACT_EMAIL_TO`）

```bash
# 既存の env vars を取得して merge する手順
EXISTING=$(aws --profile hrtep --region ap-northeast-1 amplify get-app \
  --app-id d3561ojkga3nyn --query 'app.environmentVariables' --output json)

# 上書き対象キーを置き換えて update-app に渡す（注意: update-app は全置換）
aws --profile hrtep --region ap-northeast-1 amplify update-app \
  --app-id d3561ojkga3nyn \
  --environment-variables \
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<existing>,RECAPTCHA_SECRET_KEY=<existing>,CONTACT_EMAIL_TO=<new-address>

# 再デプロイ
aws --profile hrtep --region ap-northeast-1 amplify start-job \
  --app-id d3561ojkga3nyn --branch-name main --job-type RELEASE
```

⚠️ **`update-app --environment-variables` は全置換**。既存値を必ず先に取得してから merge すること。

---

## 6. AWS Amplify ビルド履歴・状態確認

```bash
# 直近のビルドジョブ
aws --profile hrtep --region ap-northeast-1 amplify list-jobs \
  --app-id d3561ojkga3nyn --branch-name main \
  --query 'jobSummaries[].{jobId:jobId,status:status,commitId:commitId,startTime:startTime}' \
  --output table

# 特定ジョブの詳細
aws --profile hrtep --region ap-northeast-1 amplify get-job \
  --app-id d3561ojkga3nyn --branch-name main --job-id <ID>
```

---

## 7. 緊急停止（Kill Switch）

完全な送信停止が必要な場合：

1. **フォーム送信のみ停止**: `CONTACT_EMAIL_TO` を空に → 再デプロイ
2. **SES 全送信停止**:
   ```bash
   aws --profile hrtep --region ap-northeast-1 sesv2 put-account-sending-attributes \
     --no-sending-enabled
   ```
3. **サイト全停止**: Amplify Hosting の Branch Disable
   ```bash
   aws --profile hrtep --region ap-northeast-1 amplify delete-branch \
     --app-id d3561ojkga3nyn --branch-name main
   # → メインブランチを削除すると配信停止。再有効化は再 connect が必要
   ```

⚠️ 本セクションの操作はサイト全体を停止する破壊的操作。実施前に必ず関係者の承認を得ること。

---

## 8. 監視ダッシュボード

| ダッシュボード                         | URL（要 AWS Console ログイン）                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| CloudWatch Dashboard `hrtep-corporate` | `https://ap-northeast-1.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-1#dashboards:name=hrtep-corporate` |
| SES Account Dashboard                  | `https://ap-northeast-1.console.aws.amazon.com/ses/home?region=ap-northeast-1#/account`                               |
| Amplify Hosting                        | `https://ap-northeast-1.console.aws.amazon.com/amplify/apps/d3561ojkga3nyn`                                           |

---

## 9. 参考リンク（社外）

- AWS SES ベストプラクティス: https://docs.aws.amazon.com/ses/latest/dg/best-practices.html
- AWS SES 評判の維持: https://docs.aws.amazon.com/ses/latest/dg/monitor-sender-reputation.html
- Google reCAPTCHA Admin Console: https://www.google.com/recaptcha/admin
- AWS Amplify Hosting ドキュメント: https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html
