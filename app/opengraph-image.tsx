import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export const runtime = 'edge';
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #0f3a8e 0%, #1e5fc7 100%)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          letterSpacing: 8,
          opacity: 0.85,
          marginBottom: 24,
        }}
      >
        HUMAN RESOURCES × TECHNOLOGY
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: 32,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          lineHeight: 1.5,
          opacity: 0.95,
          maxWidth: 980,
        }}
      >
        {SITE_DESCRIPTION}
      </div>
    </div>,
    { ...size }
  );
}
