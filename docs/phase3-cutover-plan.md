# Phase 3 — DNS 切替着手計画書

**起案日**: 2026-05-01
**対象**: hrtep.com の DNS を旧 WordPress ホスト（`118.27.122.212`）から AWS Amplify Hosting に切替
**前提**: Phase 2 完了（SES Production Access 取得済、Amplify 仮 URL で動作確認済）

---

## 1. 切替の対象

### 1-a. 変更するレコード（A レコード 2 件のみ）

| ホスト名            | 現状               | 切替後                                                                |
| ------------------- | ------------------ | --------------------------------------------------------------------- |
| `hrtep.com`（apex） | A `118.27.122.212` | Amplify が指示する値（CNAME 不可、Apex は ALIAS 化を Amplify が案内） |
| `www.hrtep.com`     | A `118.27.122.212` | CNAME `main.d3561ojkga3nyn.amplifyapp.com.`                           |

> **注意**: お名前.com Navi で apex に CNAME は登録できません。Amplify の Custom Domain 設定機能で発行される A レコード値（または ALIAS）を使う必要があります。

### 1-b. 変更しないレコード（受信メールへの無影響を担保）

- `hrtep.com` の MX レコード（6 件、Google Workspace + onamae.ne.jp）
- `hrtep.com` の SPF（apex の TXT、`v=spf1 include:_spf.onamae.ne.jp include:_spf.google.com ~all`）
- `_dmarc.hrtep.com` の DMARC TXT
- `send.hrtep.com` 配下の DKIM CNAME（Phase 2 で追加済）と SPF TXT

---

## 2. 事前準備（切替日の 3 営業日前まで）

### 2-a. Amplify Custom Domain の事前関連付け

```bash
# Custom Domain を Amplify アプリに追加（DNS 切替前のため Verifying 状態）
aws --profile hrtep --region ap-northeast-1 amplify create-domain-association \
  --app-id d3561ojkga3nyn \
  --domain-name hrtep.com \
  --enable-auto-sub-domain \
  --sub-domain-settings prefix=,branchName=main prefix=www,branchName=main
```

→ Amplify から検証用 CNAME（\_acme-challenge 系）と本番用 ALIAS 値が発行される。

### 2-b. 切替直前 DNS スナップショット取得

`docs/dns-baseline-pre-migration.md` の「Phase 3 切替時の必須確認コマンド」を実行し、現状値を凍結。

```bash
nslookup -type=MX hrtep.com 8.8.8.8 > pre-cutover-mx.txt
nslookup -type=TXT hrtep.com 8.8.8.8 > pre-cutover-txt.txt
nslookup -type=TXT _dmarc.hrtep.com 8.8.8.8 > pre-cutover-dmarc.txt
nslookup -type=A hrtep.com 8.8.8.8 > pre-cutover-a.txt
nslookup -type=A www.hrtep.com 8.8.8.8 > pre-cutover-www-a.txt
```

### 2-c. 安井様への DNS 切替依頼書（Phase 3 用）の作成

`docs/dns-request-yasui-phase3.md` として、Phase 3 用の依頼書を別途起案する（テンプレートは Phase 2 用 [docs/dns-request-yasui.md](dns-request-yasui.md) に準拠）。

依頼内容：

- A レコード変更 2 件（hrtep.com、www.hrtep.com）
- ACM 検証用 CNAME 追加（Amplify が発行する `_acme-challenge` 系）

---

## 3. 切替手順（D-Day）

### 3-a. 切替時刻の設計

- 推奨時間帯: **平日午前 10:00〜11:00**（業務時間内・サイトアクセス少ない時間帯）
- 避けるべき時間帯: 月末月初、繁忙期、金曜午後（問題発生時の対応窓が短い）

### 3-b. 切替の実行順

```
[T-0]  安井様: お名前.com Navi で A レコード 2 件を更新
        ├ hrtep.com → Amplify 提供値
        └ www.hrtep.com → CNAME main.d3561ojkga3nyn.amplifyapp.com.

[T+0〜30 分]  弊社: dig で DNS 伝播状況を 5 分おきに確認
              dig hrtep.com @8.8.8.8
              dig hrtep.com @1.1.1.1
              dig hrtep.com @ns-rs1.gmoserver.jp

[T+30〜60 分] Amplify: ACM 証明書発行 → SSL 有効化を確認
              aws amplify get-domain-association \
                --app-id d3561ojkga3nyn --domain-name hrtep.com \
                --query 'domainAssociation.domainStatus'
              # PENDING_VERIFICATION → AVAILABLE に変わったら成功

[T+60 分〜] hrtep.com / www.hrtep.com にブラウザでアクセス
            ├ HTTPS 接続できるか
            ├ 新サイトが表示されるか
            ├ お問合せフォーム送信が成功するか（ユーザー目線テスト）
            └ Google Search Console で 404 エラーが急増していないか

[T+24h]   切替後 DNS スナップショット取得・差分確認
            （MX / SPF / DMARC が変動していないこと）
```

---

## 4. ロールバック計画

切替後 24 時間以内に以下の事象が発生した場合、即座にロールバック実施：

### ロールバック発火条件

| 事象                                                             | ロールバック判断         |
| ---------------------------------------------------------------- | ------------------------ |
| サイトが HTTPS で表示されない（証明書エラー）                    | 即時                     |
| お問合せフォーム送信が一切成功しない                             | 即時                     |
| MX レコードが意図せず変更された                                  | **即時、最優先**         |
| Google 検索結果での hrtep.com の indexed ページ数が 50% 以上減少 | 検証後判断（24h 様子見） |
| Core Web Vitals が baseline 比 30% 以上悪化                      | 検証後判断               |

### ロールバック手順

1. **安井様に連絡**（緊急連絡経路は事前に確保）
2. お名前.com Navi で A レコードを `118.27.122.212` に戻す
3. `dig` で DNS 伝播確認（1〜24h）
4. 旧 WordPress サイトが復旧することを確認
5. ロールバック原因の調査・対応後、再切替計画を立案

⚠️ **DNS の TTL は 3600 秒（1 時間）設定なので、ロールバック後の伝播完了は最長 1 時間程度。緊急時はそれを織り込んだ判断を行うこと。**

---

## 5. Phase 3 完了判定基準

以下すべてが満たされた時点で Phase 3 完了とする：

- [ ] hrtep.com / www.hrtep.com が HTTPS で新サイトを配信
- [ ] ACM 証明書が `AVAILABLE` 状態
- [ ] 旧 WordPress URL からの 301 リダイレクトが正常動作（`/blog/` → `/`、`/company` → `/about` 等）
- [ ] MX / SPF（apex）/ DMARC が baseline と完全一致
- [ ] お問合せフォーム送信 → SES 経由 → 通知メール受信を E2E で確認
- [ ] Google Search Console での hrtep.com 所有権再確認・新サイトのクロール開始
- [ ] CloudWatch アラーム 4 件すべて `OK` 状態
- [ ] 24 時間以上、404 / 5xx の急増なし

---

## 6. Phase 4（旧 WP 解約）への接続条件

Phase 3 完了から **最低 14 日間** 並行稼働期間を設けた後、Phase 4（旧 WordPress 解約）に進む：

- 14 日間の根拠: DNS の TTL × Google の再クロール周期 × Search Console での新 URL 認識
- この期間内であれば、緊急ロールバックでお名前.com 共用ホスティングに戻すことが可能
- 14 日経過後は Phase 4 着手（お名前.com 共用ホスティング契約解約手続き）

---

## 7. ステークホルダー連絡経路

| 役割              | 担当                 | 連絡経路                           |
| ----------------- | -------------------- | ---------------------------------- |
| 切替実施          | 安井様（お名前.com） | HRｔｅｐ 様経由で取次              |
| 切替監視          | leadx                | tbnkin@gmail.com、AWS Console 直接 |
| サイト運用        | leadx                | 同上                               |
| HRｔｅｐ 社内通知 | 津賀平様             | 切替前後で leadx から状況報告      |
| AWS サポート      | leadx                | AWS Support Plan（必要に応じて）   |
