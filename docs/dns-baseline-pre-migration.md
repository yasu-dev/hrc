# hrtep.com DNS ベースライン（移行前）

**取得日時**: 2026-05-01（再検証済）
**取得元**: Google Public DNS（8.8.8.8）
**目的**: 計画書 §8.2 検証手段「DNS 切替前後の比較」の **凍結された参照値**

> ⚠️ このファイルは「Phase 3 の DNS 切替前後で MX / SPF（apex）/ DMARC レコードに差分が発生していないことを担保する」ための真正値。**移行作業中は絶対に上書きしないこと**。
>
> 安井氏 DNS 作業（CNAME 3 件 + send.hrtep.com TXT 1 件）後は §8 のみ更新する想定。

---

## 1. A レコード（apex）

```
hrtep.com.   IN  A   118.27.122.212
```

→ Phase 3 で **AWS Amplify Hosting の値に変更する対象**。

## 2. A レコード（www）

```
www.hrtep.com.   IN  A   118.27.122.212
```

→ Phase 3 で **AWS Amplify の値に変更する対象**（apex と同じく）。

## 3. AAAA レコード

apex も www も AAAA レコード**なし**。

## 4. MX レコード（apex）⚠️ 計画書の前提との乖離あり

```
hrtep.com.   1 IN  MX  mail74.onamae.ne.jp
hrtep.com.   1 IN  MX  aspmx.l.google.com
hrtep.com.   5 IN  MX  alt1.aspmx.l.google.com
hrtep.com.   5 IN  MX  alt2.aspmx.l.google.com
hrtep.com.   5 IN  MX  alt3.aspmx.l.google.com
hrtep.com.   5 IN  MX  alt4.aspmx.l.google.com
```

### 異常パターン

- **`mail74.onamae.ne.jp`（preference 1 / 最高優先度）が混在**
- 計画書 §3 では「受信メール: Google Workspace（変更なし）」とあるが、実態は **Google Workspace 一本ではなく、お名前.com メールサーバが優先度 1 で受信を取りに行く構成**
- 受信メールフローは現状以下のいずれか不明：
  - (a) `mail74.onamae.ne.jp` がプライマリ → 何らかの転送経由で Google Workspace に流れている
  - (b) 過去設定の残骸で実態は Google Workspace のみ受信している
  - (c) ハイブリッド受信
- **Phase 3 の DNS 切替時、MX レコードには絶対に手を触れない方針は維持**（受信側に予期せぬ影響を与えないため）

### 要確認事項（HRtep 様 or 安井様への問い合わせ）

- `mail74.onamae.ne.jp` 経由の受信がアクティブか
- もしアクティブなら、Phase 4（旧 WP 解約）で「お名前.com 共用ホスティング」を解約した場合、`mail74.onamae.ne.jp` 経由の受信が止まらないか確認必須

## 5. TXT レコード（apex）

### Google Workspace の検証 TXT

```
hrtep.com.   IN  TXT  "google-site-verification=Ug3jABUVGPbGte0RAFkevh6O5owhVgntGGFWNaXXulc"
```

### SPF（apex）

```
hrtep.com.   IN  TXT  "v=spf1 include:_spf.onamae.ne.jp include:_spf.google.com ~all"
```

→ お名前.com と Google Workspace 両方の送信を許可している状態。**SES 用の SPF 追記は send.hrtep.com サブドメイン配下で行うため、apex SPF には触らない**（計画書 §6.3 推奨方針）。

## 6. DMARC レコード

```
_dmarc.hrtep.com.   IN  TXT  "v=DMARC1; p=none; fo=1; rua=mailto:mori@hrtep.com"
```

- ポリシー: `p=none`（モニタリングのみ。reject / quarantine なし）
- aggregate report 受信先: `mori@hrtep.com`
- **Phase 3 の DNS 切替時、絶対に変更しない**

## 7. NS レコード

```
hrtep.com.   IN  NS  ns-rs1.gmoserver.jp
hrtep.com.   IN  NS  ns-rs2.gmoserver.jp
```

→ GMO/お名前.com 系の DNS サーバ。**変更なし（計画書 §3 で据置）**。

## 8. send.hrtep.com 配下（DKIM / SPF 用）

```
send.hrtep.com.                                                 ← TXT 未登録（Non-existent）
qwfs5s5br25c2c2rjwimt3wqxgyv4cno._domainkey.send.hrtep.com.     ← CNAME 未登録
x4mutpss3vfs5vb4u27cjdxqg2bumxyt._domainkey.send.hrtep.com.     ← CNAME 未登録
u26vbziy4iyaasumb2krlslkwdlqy6nk._domainkey.send.hrtep.com.     ← CNAME 未登録
```

→ 安井様の DNS 設定（[docs/dns-request-yasui.md](dns-request-yasui.md)）で以下 4 件が新規追加される：

- DKIM CNAME 3 件（`*.dkim.amazonses.com` への CNAME）
- SPF TXT 1 件（`v=spf1 include:amazonses.com ~all`、ホスト名 `send`）

---

## Phase 3 切替時の必須確認コマンド

```bash
# 切替直前の MX / SPF / DMARC スナップショット取得
nslookup -type=MX hrtep.com 8.8.8.8 > pre-cutover-mx.txt
nslookup -type=TXT hrtep.com 8.8.8.8 > pre-cutover-txt.txt
nslookup -type=TXT _dmarc.hrtep.com 8.8.8.8 > pre-cutover-dmarc.txt

# 切替後の同レコード取得（24h 後の伝播完了後）
nslookup -type=MX hrtep.com 8.8.8.8 > post-cutover-mx.txt
nslookup -type=TXT hrtep.com 8.8.8.8 > post-cutover-txt.txt
nslookup -type=TXT _dmarc.hrtep.com 8.8.8.8 > post-cutover-dmarc.txt

# 差分が空であることを確認
diff pre-cutover-mx.txt post-cutover-mx.txt
diff pre-cutover-txt.txt post-cutover-txt.txt
diff pre-cutover-dmarc.txt post-cutover-dmarc.txt
```

差分が出たら **Phase 3 の DNS 切替を即座にロールバック**（A レコードを `118.27.122.212` に戻す）。
