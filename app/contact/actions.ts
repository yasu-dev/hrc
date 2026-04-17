'use server';

import { contactSchema, type ContactFormData } from '@/lib/validation';

export type ContactResult = {
  success: boolean;
  message: string;
};

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'バリデーションエラーが発生しました。' };
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO;

    if (!resendApiKey || !contactEmailTo) {
      console.log('[Contact] メール設定未完了。送信データ:', parsed.data);
      return {
        success: true,
        message: 'お問い合わせを受け付けました。（メール送信は環境設定完了後に有効化されます）',
      };
    }

    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'ＨＲｔｅｐ お問い合わせ <noreply@hrtep.com>',
      to: contactEmailTo,
      subject: `[お問い合わせ] ${parsed.data.inquiryType} - ${parsed.data.companyName}`,
      text: `
会社名: ${parsed.data.companyName}
氏名: ${parsed.data.name}
メール: ${parsed.data.email}
電話: ${parsed.data.phone || '未記入'}
種別: ${parsed.data.inquiryType}

お問い合わせ内容:
${parsed.data.message}
      `.trim(),
    });

    return { success: true, message: 'お問い合わせを受け付けました。' };
  } catch (error) {
    console.error('[Contact] メール送信エラー:', error);
    return {
      success: false,
      message: '送信に失敗しました。時間をおいて再度お試しください。',
    };
  }
}
