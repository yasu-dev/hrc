# お名前.com DNS 設定依頼書 — `hrtep.com` への CNAME / TXT レコード追加

**宛先**: お名前.com 管理者 安井様
**取次**: HRｔｅｐ株式会社
**起案**: leadx 株式会社
**起案日**: 2026-05-01（更新版）

---

## 1. ご依頼内容（要約）

`hrtep.com` の DNS レコード（お名前.com Navi 上）に、**新規レコードを 4 件追加**いただきたく、お願い申し上げます（CNAME 3 件 + TXT 1 件）。

本作業は HRｔｅｐ コーポレートサイトのリニューアルに伴う、Amazon SES の送信ドメイン認証（DKIM および SPF）のためのものです。すべて `send.hrtep.com` という新しいサブドメイン配下への追加で、apex（`hrtep.com`）の既存レコードには一切影響を与えません。

**重要**:

- 既存の MX / SPF（apex の TXT）/ DMARC / A レコードには **一切変更を加えません**
- お名前.com で受信されている各種メール（Google Workspace 利用）への影響は **一切ありません**
- 本依頼は **新規追加のみ** です

---

## 2. 追加いただきたいレコード（CNAME 3 件 + TXT 1 件）

お名前.com Navi の DNS 設定画面で、以下の 4 件を追加してください。

### レコード 1（DKIM CNAME 1/3）

| 項目     | 値                                                    |
| -------- | ----------------------------------------------------- |
| ホスト名 | `qwfs5s5br25c2c2rjwimt3wqxgyv4cno._domainkey.send`    |
| TYPE     | `CNAME`                                               |
| VALUE    | `qwfs5s5br25c2c2rjwimt3wqxgyv4cno.dkim.amazonses.com` |
| TTL      | `3600`（デフォルトのまま）                            |

### レコード 2（DKIM CNAME 2/3）

| 項目     | 値                                                    |
| -------- | ----------------------------------------------------- |
| ホスト名 | `x4mutpss3vfs5vb4u27cjdxqg2bumxyt._domainkey.send`    |
| TYPE     | `CNAME`                                               |
| VALUE    | `x4mutpss3vfs5vb4u27cjdxqg2bumxyt.dkim.amazonses.com` |
| TTL      | `3600`（デフォルトのまま）                            |

### レコード 3（DKIM CNAME 3/3）

| 項目     | 値                                                    |
| -------- | ----------------------------------------------------- |
| ホスト名 | `u26vbziy4iyaasumb2krlslkwdlqy6nk._domainkey.send`    |
| TYPE     | `CNAME`                                               |
| VALUE    | `u26vbziy4iyaasumb2krlslkwdlqy6nk.dkim.amazonses.com` |
| TTL      | `3600`（デフォルトのまま）                            |

### レコード 4（SPF TXT — `send.hrtep.com` 配下）

| 項目     | 値                                  |
| -------- | ----------------------------------- |
| ホスト名 | `send`                              |
| TYPE     | `TXT`                               |
| VALUE    | `v=spf1 include:amazonses.com ~all` |
| TTL      | `3600`（デフォルトのまま）          |

> **補足**: このレコードは **`send.hrtep.com`** 配下の SPF であり、`hrtep.com`（apex）の既存 SPF（`v=spf1 include:_spf.onamae.ne.jp include:_spf.google.com ~all`）には一切影響しません。両者は完全に独立して並行稼働します。

---

## 3. お名前.com Navi での操作手順

1. お名前.com Navi にログイン
2. 「ドメイン」 → 「DNS設定」
3. 対象ドメイン `hrtep.com` の「DNS設定/転送設定」を選択
4. 「DNSレコード設定を利用する」を選択して「次へ」
5. 入力欄に上記 4 件をそれぞれ入力
   - **CNAME 3 件**: ホスト名欄に `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx._domainkey.send` の部分のみを入力（末尾の `.hrtep.com` はお名前.com の画面で自動付加されます）/ TYPE: `CNAME` / VALUE: 上記の値（末尾は `.dkim.amazonses.com`）
   - **TXT 1 件**: ホスト名欄に `send` のみを入力（末尾の `.hrtep.com` は自動付加）/ TYPE: `TXT` / VALUE: `v=spf1 include:amazonses.com ~all`
   - TTL はすべて既定値（3600）でかまいません
6. 4 件分入力したら「追加」を押し、最後に「DNSレコード設定用テンプレート」のチェックを外したまま「確認画面へ進む」
7. 内容確認の上「設定する」を押下

---

## 4. 注意事項（受信メールへの無影響を担保するための留意点）

- **既存レコードの編集・削除は行わないでください**。新規 4 件の追加のみが対象です。
- 特に以下のレコードには絶対に触れないでください：
  - `hrtep.com` の MX レコード（Google Workspace + onamae.ne.jp 受信用、6 件）
  - `hrtep.com` apex の SPF レコード（`v=spf1 include:_spf.onamae.ne.jp include:_spf.google.com ~all`）
  - `_dmarc.hrtep.com` の DMARC レコード（`v=DMARC1; p=none; fo=1; rua=mailto:mori@hrtep.com`）
  - `hrtep.com` の A レコード（現行 WordPress ホスト IP）
- 上記 4 件は `send.hrtep.com` という**新しいサブドメイン配下**への追加であり、apex（`hrtep.com`）のレコードには影響しません。

---

## 5. 設定反映確認のためのご連絡

設定完了後、お手数ですが下記までご一報をお願いいたします。

- 連絡先: （HRtep 様経由で leadx へ取次をお願いいたします）

leadx 側で `dig` コマンドにより DNS 反映状況を確認し、Amazon SES 側で「DKIM 認証完了」のステータスに切り替わったことを確認のうえ、以降の作業を進めさせていただきます。

DNS の反映には通常数時間〜最大 24 時間程度を要します。

---

## 6. 本作業の位置づけ

本作業は HRtep コーポレートサイト Web ホスティング刷新計画（2026-04-30 策定）における **Phase 2（送信メール構築）** の一部です。Phase 3（DNS 切替）における A レコード・CNAME レコードの更新は、別途、後日改めてご依頼させていただきます。

---

ご対応よろしくお願い申し上げます。

leadx 株式会社
