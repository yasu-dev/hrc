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
      '従業員200名規模の精密部品メーカーにおいて、紙帳票とExcelで運用していた生産管理をフルデジタル化。工程進捗・在庫・品質データをリアルタイムで一元管理し、月次棚卸の作業時間を3日から半日に短縮。現場のタブレット端末から直接データ入力できるUIにより、二重入力によるミスをゼロに。',
    highlights: [
      '工程進捗のリアルタイム可視化（ガントチャート・カンバンボード）',
      '在庫自動発注・安全在庫アラート通知',
      '品質トレーサビリティ管理（ロット追跡・不良率分析）',
      'IoTセンサー連携による設備稼働率の自動データ収集',
    ],
    techStack: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL', 'IoT Hub'],
    image: '/images/portfolio/manufacturing.jpg',
  },
  {
    id: 'project-2',
    title: '配送最適化・動態管理システム',
    category: 'dx',
    categoryLabel: 'DX支援',
    industry: '物流',
    description:
      '全国8拠点・300台以上の配送車両を運行する物流企業向けに、リアルタイム動態管理システムを構築。電話・FAXベースだった配車指示をシステム化し、AIによるルート最適化で1台あたりの配送効率を30%向上。燃料コストを年間25%削減し、ドライバーの残業時間も月平均15時間削減。',
    highlights: [
      'GPS車両リアルタイム追跡（地図上に全車両表示）',
      'AIルート最適化エンジン（交通情報・天候連動）',
      '配送実績・KPI分析ダッシュボード（拠点別・ドライバー別）',
      'ドライバー向けモバイルアプリ（ナビ連携・配送証明撮影）',
    ],
    techStack: ['React Native', 'Node.js', 'Google Maps API', 'AWS', 'Python'],
    image: '/images/portfolio/logistics.jpg',
  },
  {
    id: 'project-3',
    title: 'AI物件レコメンド・査定エンジン',
    category: 'ai',
    categoryLabel: 'AI活用',
    industry: '不動産',
    description:
      '首都圏を中心に年間3,000件以上の仲介実績を持つ不動産会社向けに、過去10年分・50万件の取引データと物件属性を学習したAIエンジンを開発。顧客の希望条件と行動履歴から最適物件を自動レコメンドし、営業担当者の物件提案にかかる工数を半減。自動価格査定の精度は市場価格との乖離±3%を達成。',
    highlights: [
      '類似物件マッチングAI（50万件の学習データ）',
      '自動価格査定モデル（市場価格との乖離±3%）',
      '顧客行動分析による提案物件の自動優先順位付け',
      '物件データ自動取込（ポータルサイト連携・PDF間取り図OCR）',
    ],
    techStack: ['Python', 'scikit-learn', 'FastAPI', 'React', 'PostgreSQL'],
    image: '/images/portfolio/realestate.jpg',
  },
  {
    id: 'project-4',
    title: 'AIカスタマーサポート自動化基盤',
    category: 'ai',
    categoryLabel: 'AI活用',
    industry: 'コールセンター',
    description:
      '月間5万件の問い合わせを受けるBtoC企業のカスタマーサポート部門に、生成AIを活用した自動応答基盤を導入。定型的な問い合わせの70%をAIチャットボットが即時回答し、オペレーターの対応件数を大幅に削減。未解決の問い合わせは会話履歴とともにオペレーターへエスカレーションし、AIが回答候補を提示することで平均対応時間を60%短縮。',
    highlights: [
      '生成AIチャットボット（製品FAQ・手続き案内を即時自動応答）',
      'オペレーター向けAI回答支援（回答候補・関連ナレッジの自動表示）',
      'FAQ自動生成（問い合わせ傾向から頻出質問と回答を自動作成）',
      '応対品質スコアリング（顧客満足度・解決率の自動計測）',
    ],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'React', 'Redis'],
    image: '/images/portfolio/callcenter.jpg',
  },
  {
    id: 'project-5',
    title: '求人・求職マッチング基幹システム',
    category: 'system',
    categoryLabel: 'システム開発',
    industry: '人材サービス',
    description:
      '外国人材を含む年間2,000名以上の求職者と500社以上の求人企業をマッチングする人材紹介会社の基幹システムを刷新。スキル・経験・希望条件に基づく独自スコアリングアルゴリズムにより、従来は営業担当者の経験と勘に頼っていたマッチングを定量化。成約率を35%向上させ、求職者の初回面談から内定までの期間を平均2週間短縮。',
    highlights: [
      '候補者スコアリング・ランキング（スキル・経験・適性の多軸評価）',
      '求人自動配信・レコメンド（求職者の希望条件変更時に即時通知）',
      '選考進捗管理ダッシュボード（面談・面接・内定の各ステージ可視化）',
      '求人メディア連携（主要ポータルサイトからのAPI自動取込）',
    ],
    techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'AWS'],
    image: '/images/portfolio/recruitment.jpg',
  },
  {
    id: 'project-6',
    title: '電子カルテ連携・診療支援システム',
    category: 'system',
    categoryLabel: 'システム開発',
    industry: '医療',
    description:
      '外来患者数1日300名規模のクリニックグループ（3院）に、既存電子カルテとHL7 FHIR標準で連携する診療支援システムを導入。Web予約・受付・診療記録・会計までの一連の業務フローをデジタル化し、医師の1日あたりの事務作業を2時間削減。患者向けポータルで検査結果の閲覧や次回予約が可能になり、電話予約件数を80%削減。',
    highlights: [
      'HL7 FHIR標準の電子カルテ双方向連携',
      'Web予約管理・リマインダー自動通知（SMS/メール）',
      '診療記録テンプレート・音声入力対応',
      '患者ポータル（検査結果閲覧・予約・問診票オンライン記入）',
    ],
    techStack: ['C#', '.NET', 'React', 'SQL Server', 'Azure'],
    image: '/images/portfolio/medical.jpg',
  },
  {
    id: 'project-7',
    title: '売上・在庫リアルタイム分析ダッシュボード',
    category: 'web',
    categoryLabel: 'Webアプリ',
    industry: '小売業',
    description:
      '全国50店舗を展開するアパレルチェーンに、全店舗の売上・在庫データをリアルタイムに集約・可視化するWebダッシュボードを構築。POSデータと倉庫管理システムを連携し、店舗別・商品別・時間帯別の売上推移を即時に把握可能に。AI需要予測による発注推奨機能で在庫回転率を1.4倍に改善し、機会損失と廃棄ロスを大幅に削減。',
    highlights: [
      '多店舗横断リアルタイム分析（売上・客数・客単価を即時反映）',
      'AI需要予測・発注推奨（過去の販売データ・天候・イベント連動）',
      '在庫過不足アラート通知（店舗間移動の自動提案）',
      'スマートフォン対応レスポンシブUI（店長がスマホで確認可能）',
    ],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Chart.js'],
    image: '/images/portfolio/dashboard.jpg',
  },
  {
    id: 'project-8',
    title: 'オンライン研修・LMS（学習管理）プラットフォーム',
    category: 'web',
    categoryLabel: 'Webアプリ',
    industry: '教育',
    description:
      '従業員1,500名規模の企業向けに、全社研修をオンライン化するLMSを構築。集合研修で年間2,000万円かかっていた交通費・会場費を60%削減。動画教材・テスト・進捗管理を一元化し、必須研修の受講完了率を従来の72%から95%に向上。部門別・役職別の研修カリキュラム設計機能により、人事部門の研修計画策定工数も大幅に削減。',
    highlights: [
      'コース作成・動画配信管理（チャプター分割・字幕対応）',
      '進捗トラッキング・修了証PDF自動発行',
      'テスト・アンケート機能（合否判定・再受験・レポート提出）',
      '管理者向け受講状況レポート（部門別・個人別の受講率・スコア集計）',
    ],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'AWS S3'],
    image: '/images/portfolio/education.jpg',
  },
  {
    id: 'project-9',
    title: '大規模ECサイト運用保守・パフォーマンス改善',
    category: 'operation',
    categoryLabel: '運用保守',
    industry: 'EC',
    description:
      '月間100万PV・年商30億円規模のECサイトの運用保守を受託。セール期間のアクセス集中（通常の10倍）に耐えるインフラ基盤を構築し、24時間365日の監視体制を運用。Core Web Vitalsの全指標を「良好」に改善し、LCP（最大コンテンツ描画）を4.2秒から1.8秒に短縮。その結果、直帰率が15%低下し、コンバージョン率20%向上を達成。',
    highlights: [
      '24時間365日の有人・自動監視（障害検知から5分以内に初動対応）',
      'インフラ自動スケーリング（セール時10倍のトラフィックに対応）',
      'CI/CDパイプライン構築・運用（デプロイ頻度を月2回→週3回に向上）',
      'Core Web Vitals改善（LCP 4.2s→1.8s、CLS 0.25→0.05）',
    ],
    techStack: ['AWS', 'CloudWatch', 'Terraform', 'Docker', 'GitHub Actions'],
    image: '/images/portfolio/ecommerce.jpg',
  },
  {
    id: 'project-10',
    title: '金融取引システム基盤運用・セキュリティ強化',
    category: 'operation',
    categoryLabel: '運用保守',
    industry: '金融',
    description:
      '証券会社のオンライン取引システム基盤（日次取引件数10万件超）の運用を受託。FISC安全対策基準に準拠したセキュリティ運用体制を構築し、WAF/IDSの24時間監視・チューニングを実施。週次の自動脆弱性スキャンと四半期ごとのペネトレーションテストにより、重大インシデント発生件数をゼロに維持。ISMS認証の取得・維持もサポート。',
    highlights: [
      'WAF/IDS 24時間監視・ルールチューニング（不正アクセス遮断率99.9%）',
      '脆弱性スキャン自動化（週次実行・自動レポート生成）',
      'インシデント対応フロー整備（検知→分析→封じ込め→復旧の標準化）',
      'FISC安全対策基準・ISMS準拠のセキュリティ運用',
    ],
    techStack: ['AWS', 'WAF', 'GuardDuty', 'Ansible', 'Splunk'],
    image: '/images/portfolio/datacenter.jpg',
  },
];
