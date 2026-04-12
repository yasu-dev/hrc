export type PortfolioCategory = 'all' | 'dx' | 'ai' | 'system' | 'web' | 'operation';

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'all'>;
  categoryLabel: string;
  industry: string;
  description: string;
  highlights: string[];
  techStack: string[];
  image: string;
};

export const PORTFOLIO_CATEGORIES: {
  id: PortfolioCategory;
  label: string;
}[] = [
  { id: 'all', label: 'すべて' },
  { id: 'dx', label: 'DX支援' },
  { id: 'ai', label: 'AI活用' },
  { id: 'system', label: 'システム開発' },
  { id: 'web', label: 'Webアプリ' },
  { id: 'operation', label: '運用保守' },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'project-1',
    title: '生産管理DXプラットフォーム',
    category: 'dx',
    categoryLabel: 'DX支援',
    industry: '製造業',
    description:
      '紙帳票・Excel中心の生産管理をフルデジタル化。工程進捗・在庫・品質データを一元管理し、業務効率を40%改善。',
    highlights: [
      '工程管理のリアルタイム可視化',
      '在庫自動発注・アラート通知',
      '品質トレーサビリティ管理',
      'IoTセンサー連携による自動データ収集',
    ],
    techStack: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL', 'IoT Hub'],
    image: '/images/portfolio/sample-1.jpg',
  },
  {
    id: 'project-2',
    title: '配送最適化・動態管理システム',
    category: 'dx',
    categoryLabel: 'DX支援',
    industry: '物流',
    description:
      '全国300台以上の配送車両をリアルタイムに追跡・管理。AIによるルート最適化で燃料コストを25%削減。',
    highlights: [
      'GPS車両リアルタイム追跡',
      'AIルート最適化エンジン',
      '配送実績・KPI分析ダッシュボード',
      'ドライバー向けモバイルアプリ',
    ],
    techStack: ['React Native', 'Node.js', 'Google Maps API', 'AWS', 'Python'],
    image: '/images/portfolio/sample-2.jpg',
  },
  {
    id: 'project-3',
    title: 'AI物件レコメンド・査定エンジン',
    category: 'ai',
    categoryLabel: 'AI活用',
    industry: '不動産',
    description:
      '過去10年分の取引データと物件属性を学習し、類似物件マッチングと自動価格査定を実現。査定精度95%、営業工数を半減。',
    highlights: [
      '類似物件マッチングAI',
      '自動価格査定モデル（誤差±3%）',
      '顧客行動分析・提案自動化',
      '物件データ自動取込（スクレイピング）',
    ],
    techStack: ['Python', 'scikit-learn', 'FastAPI', 'React', 'PostgreSQL'],
    image: '/images/portfolio/sample-3.jpg',
  },
  {
    id: 'project-4',
    title: 'AIカスタマーサポート自動化基盤',
    category: 'ai',
    categoryLabel: 'AI活用',
    industry: 'コールセンター',
    description:
      '生成AIを活用した問い合わせ自動応答システム。月間5万件の問い合わせの70%を自動処理し、対応時間を60%短縮。',
    highlights: [
      '生成AIチャットボット（自動応答）',
      'オペレーター向けAI回答支援',
      'FAQ自動生成・ナレッジベース構築',
      '応対品質スコアリング',
    ],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'React', 'Redis'],
    image: '/images/portfolio/sample-1.jpg',
  },
  {
    id: 'project-5',
    title: '求人・求職マッチング基幹システム',
    category: 'system',
    categoryLabel: 'システム開発',
    industry: '人材サービス',
    description:
      '求職者と求人企業の最適マッチングを実現する基幹システム。候補者スコアリングと自動配信で、マッチング成約率を35%向上。',
    highlights: [
      '候補者スコアリング・ランキング',
      '求人自動配信・レコメンド',
      '選考進捗管理ダッシュボード',
      '求人メディア連携（API取込）',
    ],
    techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'AWS'],
    image: '/images/portfolio/sample-2.jpg',
  },
  {
    id: 'project-6',
    title: '電子カルテ連携・診療支援システム',
    category: 'system',
    categoryLabel: 'システム開発',
    industry: '医療',
    description:
      '既存電子カルテとHL7 FHIR標準で連携し、予約管理から診療記録までをシームレスに統合。医師の事務作業を1日あたり2時間削減。',
    highlights: [
      'HL7 FHIR標準の電子カルテ連携',
      'Web予約管理・リマインダー通知',
      '診療記録テンプレート・音声入力',
      '患者ポータル（検査結果閲覧）',
    ],
    techStack: ['C#', '.NET', 'React', 'SQL Server', 'Azure'],
    image: '/images/portfolio/sample-3.jpg',
  },
  {
    id: 'project-7',
    title: '売上・在庫リアルタイム分析ダッシュボード',
    category: 'web',
    categoryLabel: 'Webアプリ',
    industry: '小売業',
    description:
      '全国50店舗の売上・在庫データをリアルタイムに集約・可視化するWebダッシュボード。経営判断のスピードを大幅に向上。',
    highlights: [
      '多店舗横断リアルタイム分析',
      'AI需要予測・発注推奨',
      '在庫過不足アラート通知',
      'スマートフォン対応レスポンシブUI',
    ],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Chart.js'],
    image: '/images/portfolio/sample-1.jpg',
  },
  {
    id: 'project-8',
    title: 'オンライン研修・LMS（学習管理）プラットフォーム',
    category: 'web',
    categoryLabel: 'Webアプリ',
    industry: '教育',
    description:
      '社員研修をオンライン化するLMSを構築。動画・テスト・進捗管理を一元化し、研修コストを60%削減、受講完了率95%を達成。',
    highlights: [
      'コース作成・動画配信管理',
      '進捗トラッキング・修了証発行',
      'テスト・アンケート機能',
      '管理者向け受講状況レポート',
    ],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'AWS S3'],
    image: '/images/portfolio/sample-2.jpg',
  },
  {
    id: 'project-9',
    title: '大規模ECサイト運用保守・パフォーマンス改善',
    category: 'operation',
    categoryLabel: '運用保守',
    industry: 'EC',
    description:
      '月間100万PVのECサイトに24時間監視体制を構築。ページ表示速度を2倍に改善し、コンバージョン率20%向上を実現。',
    highlights: [
      '24時間365日の有人・自動監視',
      'インフラ自動スケーリング',
      'CI/CDパイプライン構築・運用',
      'パフォーマンスチューニング（Core Web Vitals改善）',
    ],
    techStack: ['AWS', 'CloudWatch', 'Terraform', 'Docker', 'GitHub Actions'],
    image: '/images/portfolio/sample-3.jpg',
  },
  {
    id: 'project-10',
    title: '金融取引システム基盤運用・セキュリティ強化',
    category: 'operation',
    categoryLabel: '運用保守',
    industry: '金融',
    description:
      '金融機関の取引システム基盤を運用。セキュリティ強化施策の導入により、インシデント発生件数をゼロに抑制。',
    highlights: [
      'WAF/IDS運用・チューニング',
      '脆弱性スキャン自動化（週次）',
      'インシデント対応フロー整備',
      'ISMS準拠のセキュリティ運用',
    ],
    techStack: ['AWS', 'WAF', 'GuardDuty', 'Ansible', 'Splunk'],
    image: '/images/portfolio/sample-1.jpg',
  },
];
