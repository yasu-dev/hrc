export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  icon: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'hr',
    title: '外国人材事業',
    description:
      'HRtepプラットフォームを活用した外国人材紹介・就労マッチング。有料職業紹介事業として、企業と外国籍人財をつなぐ最適なソリューションを提供します。',
    href: '/services/hr',
    image: '/images/services/hr.jpg',
    icon: 'Users',
  },
  {
    id: 'it',
    title: 'IT事業',
    description:
      'DX支援・AI活用支援・システム開発・Webアプリ開発。企業のデジタル変革を戦略策定から開発・運用まで一貫して支援します。',
    href: '/services/it',
    image: '/images/services/it.jpg',
    icon: 'Monitor',
  },
];

export type HrService = {
  title: string;
  description: string;
};

export const HR_SERVICES: HrService[] = [
  {
    title: 'HRtepプラットフォーム',
    description:
      '企業管理画面、求人情報提供者管理画面、求職者情報提供者管理画面、求職者WEBの4つのサブプロダクトで構成される、外国人材マッチングの統合プラットフォームです。',
  },
  {
    title: '外国人材紹介',
    description:
      '求人・求職者マッチングサービス。有料職業紹介事業として、企業のニーズに合った外国籍人財をご紹介します。',
  },
  {
    title: '受入研修支援',
    description: '外国籍人財の受け入れに必要な研修プログラムの企画・運営をサポートします。',
  },
  {
    title: 'アウトソーシング',
    description:
      '業務委託・請負の取次ぎサービス。企業の業務効率化を外部リソースの活用で支援します。',
  },
];

export type ItService = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
};

export const IT_SERVICES: ItService[] = [
  {
    id: 'dx',
    title: 'DX支援',
    description:
      'IT戦略策定から業務プロセス改善、デジタル化推進まで。企業のデジタルトランスフォーメーションを包括的に支援します。',
    features: ['IT戦略策定', '業務プロセス改善', 'デジタル化推進', 'テクノロジーコンサルティング'],
    icon: 'TrendingUp',
  },
  {
    id: 'ai',
    title: 'AI活用支援',
    description:
      'AI導入コンサルティングから生成AI活用、業務自動化まで。AIの力で企業の生産性を飛躍的に向上させます。',
    features: ['AI導入コンサルティング', '生成AI活用', '業務自動化', 'データ分析基盤構築'],
    icon: 'Brain',
  },
  {
    id: 'system',
    title: 'システム開発',
    description:
      '業務システムから基幹システムまで。モダンな技術スタックで堅牢かつ拡張性の高いシステムを構築します。',
    features: ['業務システム開発', '基幹システム構築', '受託開発', 'モダナイゼーション'],
    icon: 'Server',
  },
  {
    id: 'web',
    title: 'Webアプリ開発',
    description:
      'SaaS開発からWebシステム構築まで。最新のWeb技術を活用し、ユーザー体験に優れたアプリケーションを開発します。',
    features: ['SaaS開発', 'Webシステム構築', 'UI/UXデザイン'],
    icon: 'Globe',
  },
  {
    id: 'operation',
    title: 'システム運用・保守',
    description:
      'ヘルプデスクから保守運用支援、アプリケーション運用管理まで。安定したシステム稼働を継続的にサポートします。',
    features: ['ヘルプデスク', '保守運用支援', 'アプリケーション運用管理'],
    icon: 'Settings',
  },
  {
    id: 'education',
    title: 'IT教育・研修',
    description: 'システム教育からオンライン・集合研修まで。企業の人材育成を支援します。',
    features: ['システム教育', 'オンライン研修', '集合研修'],
    icon: 'GraduationCap',
  },
];

export const HR_FAQ = [
  {
    question: '外国人材の紹介にはどのくらいの期間がかかりますか？',
    answer:
      'ご要望の人材像にもよりますが、通常2〜4週間程度でご紹介が可能です。HRtepプラットフォームを活用し、効率的なマッチングを行います。',
  },
  {
    question: 'どのような在留資格の外国人材を紹介していますか？',
    answer: '技術・人文知識・国際業務、特定技能、技能実習など、幅広い在留資格に対応しています。',
  },
  {
    question: '受入研修ではどのようなプログラムがありますか？',
    answer:
      '日本語研修、ビジネスマナー研修、職場適応研修など、企業のニーズに合わせたカスタマイズプログラムをご用意しています。',
  },
];

export const IT_FAQ = [
  {
    question: 'DX支援ではどのような業種に対応していますか？',
    answer:
      '製造業、小売業、サービス業など幅広い業種に対応しています。業界特有の課題を理解した上で、最適なデジタル化戦略を提案します。',
  },
  {
    question: 'AI導入にはどの程度の予算が必要ですか？',
    answer:
      'プロジェクトの規模や要件により異なりますが、まずは無料相談にてヒアリングし、最適なプランをご提案します。',
  },
  {
    question: 'システム開発の技術スタックは？',
    answer:
      'Next.js、React、TypeScript、Python、AWS等のモダンな技術スタックを採用。プロジェクト要件に応じて最適な技術を選定します。',
  },
];
