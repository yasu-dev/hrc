'use client';

import { useCallback, useSyncExternalStore } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

const STORAGE_KEY = 'cookie-consent';

type ConsentState = 'accepted' | 'declined' | 'pending';

function getSnapshot(): ConsentState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'true') return 'accepted';
  if (stored === 'false') return 'declined';
  return 'pending';
}

function getServerSnapshot(): ConsentState {
  return 'pending';
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    window.dispatchEvent(new Event('storage'));
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'false');
    window.dispatchEvent(new Event('storage'));
  }, []);

  return (
    <>
      {consent === 'accepted' && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {consent === 'pending' && (
        <div className="bg-background fixed inset-x-0 bottom-0 z-50 border-t p-4 shadow-lg">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-muted-foreground text-sm">
              当サイトではアクセス解析のためCookieを使用しています。詳しくは
              <a href="/privacy" className="underline">
                プライバシーポリシー
              </a>
              をご覧ください。
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={handleDecline}>
                拒否
              </Button>
              <Button size="sm" onClick={handleAccept}>
                同意する
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
