import { z } from 'zod';

export const INQUIRY_TYPES = [
  '外国人材採用支援',
  'DX支援',
  'AI活用支援',
  'システム開発',
  'Webアプリ開発',
  '運用・保守',
  'IT教育・研修',
  'その他',
] as const;

export const contactSchema = z.object({
  companyName: z
    .string()
    .min(1, '会社名を入力してください')
    .max(100, '100文字以内で入力してください'),
  name: z.string().min(1, 'お名前を入力してください').max(50, '50文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
  phone: z.string().max(20, '20文字以内で入力してください').optional().or(z.literal('')),
  inquiryType: z.enum(INQUIRY_TYPES, {
    message: 'お問い合わせ種別を選択してください',
  }),
  message: z
    .string()
    .min(1, 'お問い合わせ内容を入力してください')
    .max(2000, '2000文字以内で入力してください'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
