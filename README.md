# hrc - HRtep Corporate Site

HRステップ株式会社のコーポレートサイト。

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 環境変数

`.env.local` に設定する。Amplify ではコンソールから環境変数として登録する。

| 変数                             | 必須          | 用途                                                                                                                           |
| -------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_ENV`           | ○（本番のみ） | `production` のとき `index, follow` を許可。プレビュー環境では未設定または `preview` にすると `noindex, nofollow` が出力される |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | ✕             | Google Analytics 4 の計測 ID（例: `G-XXXXXXXXXX`）。未設定なら GA 読込み無効                                                   |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | △             | reCAPTCHA v3 サイトキー。Contact フォームで使用。クライアント側で grecaptcha が読み込まれる                                    |
| `RECAPTCHA_SECRET_KEY`           | △             | reCAPTCHA v3 シークレットキー。Server Action でトークン検証に使用。サイトキー or 本キーが未設定だと検証はスキップされる        |
| `RESEND_API_KEY`                 | △             | Resend API キー（Phase 2 後半で SES 移行予定）                                                                                 |
| `CONTACT_EMAIL_TO`               | △             | お問い合わせ通知メールの宛先。未設定の場合フォーム送信は受付完了表示のみで実メール送信は無効化される                           |
