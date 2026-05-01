declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

export async function executeRecaptcha(action: string): Promise<string | null> {
  if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') return null;
  if (!window.grecaptcha) return null;
  return new Promise<string | null>((resolve) => {
    window.grecaptcha!.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action });
        resolve(token);
      } catch {
        resolve(null);
      }
    });
  });
}

export type RecaptchaVerifyResult = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  errorCodes?: string[];
};

export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction: string,
  threshold = 0.5
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, reason: 'recaptcha-disabled' };
  if (!token) return { ok: false, reason: 'missing-token' };

  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = (await res.json()) as RecaptchaVerifyResult;

  if (!data.success) return { ok: false, reason: `verify-failed:${data.errorCodes?.join(',')}` };
  if (data.action && data.action !== expectedAction)
    return { ok: false, reason: 'action-mismatch' };
  if (typeof data.score === 'number' && data.score < threshold) {
    return { ok: false, reason: `low-score:${data.score}` };
  }
  return { ok: true };
}
