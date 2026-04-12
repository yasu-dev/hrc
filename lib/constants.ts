export const SITE_NAME = 'HRtep株式会社';
export const SITE_NAME_EN = 'HRtep Co., Ltd.';
export const SITE_URL = 'https://hrtep.com';
export const SITE_DESCRIPTION =
  '外国人材紹介とIT事業（DX支援・AI活用支援・システム開発・Webアプリ開発）で企業の成長を支援するHRtep株式会社の公式サイトです。';

export const COMPANY = {
  name: 'ＨＲｔｅｐ株式会社',
  nameEn: 'HRtep Co., Ltd.',
  ceo: '津賀平 隆浩',
  founded: '2021年9月1日',
  tel: '03-6228-7866',
  license: '有料職業紹介事業 許可番号 13-ユ-316533',
  business: [
    '求人・求職者情報提供サービスの企画、運営及び管理業務並びに関連情報の取次ぎサービス',
    '人材紹介に関わる情報提供サービスの運営',
    'アウトソーシング事業の受託、請負及び委託の取次ぎサービス',
    '外国籍人財受け入れ研修のサービス取次ぎ',
    'DX支援・AI活用支援・システム開発・Webアプリ開発',
    'システム運用・保守、IT教育・研修',
  ],
  headquarters: {
    label: '本社',
    postalCode: '〒104-0031',
    address: '東京都中央区京橋3-12-1 エコー京橋ビル 5階',
    note: '1階がファミリーマートのビルの5階',
    nearestStations: ['「宝町」駅 徒歩1分', '「京橋」駅 1番出口 徒歩4分'],
    hours: '平日 9:00〜18:00（土日祝定休）',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1620!2d139.7718015!3d35.6747207!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188be21ec2bf6f%3A0xfd1539d817edc117!2z44Ko44Kz44O85Lqs5qmL44OT44Or!5e0!3m2!1sja!2sjp',
  },
  ginzaOffice: {
    label: '銀座営業所',
    postalCode: '〒104-0061',
    address: '東京都中央区銀座1-16-7 銀座大栄ビル',
    note: '1階がファミリーマートのビル',
    nearestStations: ['「宝町」駅 徒歩2分', '「京橋」駅 徒歩3分', '「銀座一丁目」駅 徒歩3分'],
    hours: '平日 9:00〜18:00（土日祝定休）',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1620!2d139.7704395!3d35.6741347!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188be22b162e8f%3A0x22b2f70fd18e99fc!2z6YqA5bqn5aSn5qCE44OT44Or!5e0!3m2!1sja!2sjp',
  },
} as const;

export const STATS = [
  { label: '設立', value: '2021', suffix: '年' },
  { label: '支援人数', value: '500', suffix: '名+' },
  { label: 'ITプロジェクト', value: '30', suffix: '件+' },
  { label: 'パートナー企業', value: '50', suffix: '社+' },
] as const;
