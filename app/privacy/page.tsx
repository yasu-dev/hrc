import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'HRtep株式会社の個人情報保護方針（プライバシーポリシー）です。',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="プライバシーポリシー" />
      <Container>
        <Breadcrumb items={[{ label: 'プライバシーポリシー' }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container className="prose max-w-3xl">
          <p>
            {COMPANY.name}
            （以下「当社」）は、個人情報の保護に関する法律（個人情報保護法）及び関連法令を遵守し、
            以下のとおり個人情報保護方針を定め、適切な管理を行います。
          </p>

          <h2>1. 個人情報の利用目的</h2>
          <p>当社は、お客様からご提供いただいた個人情報を、以下の目的で利用いたします。</p>
          <ul>
            <li>お問い合わせへの対応</li>
            <li>当社サービスに関するご案内</li>
            <li>外国人材紹介サービスの提供</li>
            <li>IT事業（DX支援・AI活用支援・システム開発・Webアプリ開発）に関するサービスの提供</li>
            <li>契約の履行及び管理</li>
            <li>当社サービスの改善及び新サービスの開発</li>
          </ul>

          <h2>2. 個人情報の第三者提供</h2>
          <p>
            当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供いたしません。
          </p>

          <h2>3. 安全管理措置</h2>
          <p>
            当社は、個人情報の漏洩、滅失またはき損を防止するため、適切な安全管理措置を講じます。
            また、個人情報を取り扱う従業者及び委託先に対して、適切な監督を行います。
          </p>

          <h2>4. 開示・訂正・利用停止の請求</h2>
          <p>
            ご本人からの個人情報の開示、訂正、追加、削除、利用停止、消去または第三者提供の停止のご請求については、
            合理的な範囲で速やかに対応いたします。下記の窓口までお申し出ください。
          </p>

          <h2>5. 事業者情報</h2>
          <dl className="not-prose grid gap-1 text-sm sm:grid-cols-[120px_1fr]">
            <dt className="font-semibold">法人名</dt>
            <dd>{COMPANY.name}</dd>
            <dt className="font-semibold">代表者</dt>
            <dd>{COMPANY.ceo}</dd>
            <dt className="font-semibold">所在地</dt>
            <dd>{COMPANY.headquarters.address}</dd>
          </dl>

          <h2>6. お問い合わせ窓口</h2>
          <p>個人情報の取り扱いに関する苦情・相談は、下記までご連絡ください。</p>
          <p>
            {COMPANY.name}
            <br />
            所在地: {COMPANY.headquarters.address}
            <br />
            TEL: {COMPANY.tel}
          </p>

          <h2>7. Cookie・アクセス解析ツールについて</h2>
          <p>
            当サイトでは、利便性の向上やアクセス状況の分析のため、Google Analytics
            4（GA4）を使用しています。
            GA4はCookieを使用してお客様のアクセス情報を収集しますが、個人を特定する情報は含まれません。
            Cookieの使用を望まない場合は、ブラウザの設定により無効化できます。
          </p>

          <h2>8. SSL/暗号化通信について</h2>
          <p>
            当サイトでは、お客様の個人情報を保護するため、SSL（Secure Sockets
            Layer）による暗号化通信を使用しています。
          </p>

          <p className="text-muted-foreground mt-8 text-sm">
            制定日: 2024年4月1日
            <br />
            最終改定日: 2024年4月1日
          </p>
        </Container>
      </section>
    </>
  );
}
