'use client';

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData, INQUIRY_TYPES } from '@/lib/validation';
import { submitContact } from '@/app/contact/actions';
import { RECAPTCHA_SITE_KEY, executeRecaptcha } from '@/lib/recaptcha';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ContactForm() {
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const token = await executeRecaptcha('contact_submit');
    const res = await submitContact({ ...data, recaptchaToken: token ?? undefined });
    setResult(res);
  };

  if (result?.success) {
    return (
      <div className="bg-card rounded-xl border p-8 text-center">
        <h3 className="text-primary text-xl font-bold">お問い合わせありがとうございます</h3>
        <p className="text-muted-foreground mt-3">{result.message}</p>
      </div>
    );
  }

  return (
    <>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {result && !result.success && (
          <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-lg border p-4 text-sm">
            {result.message}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">
              会社名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              {...register('companyName')}
              aria-invalid={!!errors.companyName}
            />
            {errors.companyName && (
              <p className="text-destructive text-sm">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              氏名 <span className="text-destructive">*</span>
            </Label>
            <Input id="name" {...register('name')} aria-invalid={!!errors.name} />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス <span className="text-destructive">*</span>
            </Label>
            <Input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">電話番号</Label>
            <Input id="phone" type="tel" {...register('phone')} />
            {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inquiryType">
            お問い合わせ種別 <span className="text-destructive">*</span>
          </Label>
          <select
            id="inquiryType"
            {...register('inquiryType')}
            className="border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
            defaultValue=""
            aria-invalid={!!errors.inquiryType}
          >
            <option value="" disabled>
              選択してください
            </option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.inquiryType && (
            <p className="text-destructive text-sm">{errors.inquiryType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            お問い合わせ内容 <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            rows={6}
            {...register('message')}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="flex items-start gap-2 text-sm">
            <input
              id="agreement"
              type="checkbox"
              {...register('agreement')}
              aria-invalid={!!errors.agreement}
              className="border-input mt-0.5 size-4 rounded border accent-current"
            />
            <span>
              <Link href="/privacy" target="_blank" rel="noopener" className="underline">
                プライバシーポリシー
              </Link>
              に基づく個人情報の取扱いに同意の上、送信してください{' '}
              <span className="text-destructive">*</span>
            </span>
          </label>
          {errors.agreement && (
            <p className="text-destructive text-sm">{errors.agreement.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '送信する'}
        </Button>

        {RECAPTCHA_SITE_KEY && (
          <p className="text-muted-foreground text-xs">
            このサイトは reCAPTCHA によって保護されており、Google の{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              プライバシーポリシー
            </a>{' '}
            と{' '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              利用規約
            </a>{' '}
            が適用されます。
          </p>
        )}
      </form>
    </>
  );
}
