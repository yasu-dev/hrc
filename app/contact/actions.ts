'use server';

import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

import { contactSchema, type ContactFormData } from '@/lib/validation';

export type ContactResult = {
  success: boolean;
  message: string;
};

const FROM_ADDRESS = 'ＨＲｔｅｐ お問い合わせ <noreply@send.hrtep.com>';
const CONFIGURATION_SET = 'hrtep-default';
const AWS_REGION = 'ap-northeast-1';

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'バリデーションエラーが発生しました。' };
  }

  const contactEmailTo = process.env.CONTACT_EMAIL_TO;
  if (!contactEmailTo) {
    console.log('[Contact] メール設定未完了。送信データ:', parsed.data);
    return {
      success: true,
      message: 'お問い合わせを受け付けました。（メール送信は環境設定完了後に有効化されます）',
    };
  }

  try {
    const ses = new SESv2Client({ region: AWS_REGION });

    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: FROM_ADDRESS,
        Destination: { ToAddresses: [contactEmailTo] },
        ConfigurationSetName: CONFIGURATION_SET,
        ReplyToAddresses: [parsed.data.email],
        Content: {
          Simple: {
            Subject: {
              Data: `[お問い合わせ] ${parsed.data.inquiryType} - ${parsed.data.companyName}`,
              Charset: 'UTF-8',
            },
            Body: {
              Text: {
                Data: `
会社名: ${parsed.data.companyName}
氏名: ${parsed.data.name}
メール: ${parsed.data.email}
電話: ${parsed.data.phone || '未記入'}
種別: ${parsed.data.inquiryType}

お問い合わせ内容:
${parsed.data.message}
                `.trim(),
                Charset: 'UTF-8',
              },
            },
          },
        },
      })
    );

    return { success: true, message: 'お問い合わせを受け付けました。' };
  } catch (error) {
    console.error('[Contact] SES 送信エラー:', error);
    return {
      success: false,
      message: '送信に失敗しました。時間をおいて再度お試しください。',
    };
  }
}
