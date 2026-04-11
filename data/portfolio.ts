export type PortfolioCategory = 'all' | 'dx' | 'ai' | 'system' | 'web' | 'operation';

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'all'>;
  categoryLabel: string;
  description: string;
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
    title: '製造業向け業務DXプラットフォーム',
    category: 'dx',
    categoryLabel: 'DX支援',
    description:
      '紙ベースの業務フローをデジタル化し、生産管理から在庫管理までを一元化。業務効率を40%改善。',
    techStack: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    image: '/images/portfolio/sample-1.jpg',
  },
  {
    id: 'project-2',
    title: 'AI活用カスタマーサポートシステム',
    category: 'ai',
    categoryLabel: 'AI活用',
    description:
      '生成AIを活用した問い合わせ自動応答システム。対応時間を60%短縮し、顧客満足度を向上。',
    techStack: ['Python', 'OpenAI API', 'React', 'FastAPI'],
    image: '/images/portfolio/sample-2.jpg',
  },
  {
    id: 'project-3',
    title: '小売業向けデータ分析ダッシュボード',
    category: 'web',
    categoryLabel: 'Webアプリ',
    description:
      'リアルタイムの売上・在庫データを可視化するWebダッシュボード。経営判断のスピードアップに貢献。',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    image: '/images/portfolio/sample-3.jpg',
  },
  {
    id: 'project-4',
    title: '人事管理基幹システム刷新',
    category: 'system',
    categoryLabel: 'システム開発',
    description: 'レガシーな人事管理システムをモダンアーキテクチャで再構築。運用コストを50%削減。',
    techStack: ['Java', 'Spring Boot', 'React', 'AWS'],
    image: '/images/portfolio/sample-1.jpg',
  },
  {
    id: 'project-5',
    title: 'ECサイト運用保守・パフォーマンス改善',
    category: 'operation',
    categoryLabel: '運用保守',
    description:
      '大規模ECサイトの24時間監視体制を構築。ページ表示速度を2倍に改善し、コンバージョン率20%向上。',
    techStack: ['AWS', 'CloudWatch', 'Terraform', 'Node.js'],
    image: '/images/portfolio/sample-2.jpg',
  },
];
