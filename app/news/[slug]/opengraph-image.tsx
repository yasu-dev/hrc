import { ImageResponse } from 'next/og';
import { NEWS_ITEMS } from '@/data/news';
import { SITE_NAME } from '@/lib/constants';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'お知らせ';

export async function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function NewsOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = NEWS_ITEMS.find((n) => n.slug === slug);
  const headline = item ? item.title : 'News';
  const date = item ? item.date : '';
  const category = item ? item.category : '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '72px',
        background: 'linear-gradient(135deg, #0f3a8e 0%, #1e5fc7 100%)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          fontSize: 24,
          opacity: 0.85,
          letterSpacing: 6,
        }}
      >
        <div style={{ display: 'flex' }}>NEWS</div>
        {category && (
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.18)',
              padding: '6px 18px',
              borderRadius: 999,
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            {category}
          </div>
        )}
        {date && (
          <div style={{ display: 'flex', fontSize: 22, opacity: 0.9, letterSpacing: 1 }}>
            {date}
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: headline.length > 30 ? 56 : 72,
          fontWeight: 800,
          lineHeight: 1.25,
          marginTop: 40,
          flex: 1,
          alignItems: 'center',
        }}
      >
        {headline}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 22,
          opacity: 0.8,
          letterSpacing: 1,
          paddingTop: 32,
          borderTop: '1px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        <div style={{ display: 'flex' }}>{SITE_NAME}</div>
        <div style={{ display: 'flex' }}>hrtep.com</div>
      </div>
    </div>,
    { ...size }
  );
}
