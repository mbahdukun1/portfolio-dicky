import type { WorkItem } from '@/types/portfolio';

export const workItems: WorkItem[] = [
  {
    id: 'wms',
    featured: true,
    title: 'WMS — Warehouse Management System',
    context: 'Inline Technology · PT Motor Sights International',
    period: '2026',
    description:
      'A warehouse platform covering the full flow of goods across ~40 sites from one console — what comes in, what goes out, and what is on the shelf — kept in step with Oracle NetSuite by a middleware behind it.',
    contributions: [
      'Built Inbound Management: transfer orders, PIB import declarations, local vendor purchase orders, and customer returns, through receive and putaway.',
      'Built Outbound Management: sales orders and inter-site transfer orders through picking, packing, and delivery tracking.',
      'Implemented Inventory Management down to bin level — available vs reserved vs in-transit stock, bin reallocation, and discrepancy documents.',
      'Built the NestJS middleware to Oracle NetSuite — a direct sync path plus a BullMQ/Redis queue — with Postgres upserts keyed on the ERP document id so a sync is safe to re-run.',
      'Built the approval chain for stock adjustments and the round trip that lets Oracle NetSuite accept or reject each one.',
      'Set up master data, per-site role-based access, and multi-language support for the operations team.',
    ],
    stack: [
      'React',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'BullMQ',
      'Redis',
      'Oracle NetSuite',
      'System Integration',
      'Role-based access',
      'i18n',
    ],

    images: ['/projects/wms/login.jpg', '/projects/wms/dashboard.png'],
    href: '',
    repo: '',
  },
  {
    id: 'wms-mobile',
    title: 'WMS Mobile — Offline-First Warehouse App',
    context: 'Inline Technology · PT Motor Sights International',
    period: '2026',
    description:
      'The handheld companion to the WMS console: receiving, transfers, and stock counts done against a local SQLite database, so scanning keeps working where the signal does not.',
    contributions: [
      'Built the app offline-first on local SQLite — ~9,500 master records held on the device so every scan lookup resolves without a round trip.',
      'Made sync a visible screen: record count, last-sync age, fresh init, a database explorer, and a guarded destroy.',
      'Modelled inbound work as queues with live counts — MRN, GR list, grouping, putaway, history — instead of a feature menu.',
      'Built MRN receiving around request vs received vs remaining quantity per material, with QR scanning in place of typed codes.',
    ],
    stack: ['Mobile', 'Offline-first', 'SQLite', 'REST API', 'Barcode Scanning'],
    coverShape: 'phone',
    images: ['/projects/wms-mobile/login.jpeg', '/projects/wms-mobile/goods-receive.jpeg'],
  },
  {
    id: 'work-order',
    title: 'Work Order — Fleet Maintenance App',
    context: 'Inline Technology',
    period: '2026',
    description:
      'A workshop app that walks every repair through the same nine steps — breakdown to ready-for-use — with a running timer and the next step always named.',
    contributions: [
      'Built the worker dashboard around one question: what am I doing next, split into on-progress and finished jobs.',
      'Fixed the repair lifecycle to nine ordered steps and surfaced the next one on every card, so handovers need no explanation.',
      'Implemented claim-and-run: START stamps the mechanic and begins an elapsed timer; Waiting marks a job blocked rather than stalled.',
      'Wired the app to company single sign-on, with role-based access tied to real employee records.',
    ],
    stack: ['Mobile', 'SSO', 'REST API', 'Role-based access', 'Workflow'],
    coverShape: 'phone',
    images: ['/projects/wo/login.jpeg', '/projects/wo/dashboard-running.jpeg'],
  },
  {
    id: 'e-invoice',
    title: 'E-Invoice Platform',
    context: 'BEONE SOLUTION',
    period: '2023 — 2025',
    description:
      'A mobile-first electronic invoicing product handling billing and payment, built on a microservices architecture designed to hold up under high traffic.',
    contributions: [
      'Designed the microservices architecture for scalability, reliability, and maintainability.',
      'Integrated a payment gateway for secure end-user transactions.',
      'Optimised backend services for real-time processing and high availability.',
      'Ran performance testing and tuned components for high concurrency.',
    ],
    stack: ['Microservices', 'Node.js', 'REST API', 'Payment Gateway', 'Mobile'],
    coverShape: 'phone',
    images: ['/projects/e-invoice/splash.png', '/projects/e-invoice/login.png'],
  },
  {
    id: 'onda-gt',
    title: 'Onda Goods Tracker',
    context: 'BEONE SOLUTION x Onda',
    period: '2023 — 2025',
    description:
      'A barcode-first handheld app for the warehouse floor: receiving, transfers, picking, and stock opname, each posting straight into SAP Business One.',
    contributions: [
      'Built four scanning flows — inbound, inventory transfer, picking and delivery, stock counting — on one shared interaction.',
      'Integrated every flow with SAP Business One so movements post as real documents the moment they happen.',
      'Implemented per-rack location locking so several operators can run a stock opname in parallel without counting the same shelf.',
      'Validated quantities and required fields on the device to stop postings being rejected on the warehouse floor.',
    ],
    stack: ['Mobile', 'SAP', 'System Integration', 'Barcode Scanning', 'REST API'],
    coverShape: 'phone',
    images: ['/projects/onda-gt/landing.png', '/projects/onda-gt/sap-connection.png'],
  },
  {
    id: 'mamapa',
    title: 'mamAPA — Recipe App with AI',
    context: 'Personal project',
    period: '2023',
    description:
      'A recipe app for the daily “mau makan apa?” stalemate — search when you know what you want, and an AI that suggests dishes when you do not.',
    contributions: [
      'Built the AI recommendation flow that turns a vague craving into concrete dishes with reasoning.',
      'Implemented auth with email and Google, favourites, and user-written recipes.',
      'Designed the recipe page around cooking: ingredients as a checklist, steps as one action per card.',
    ],
    stack: ['Mobile', 'AI Integration', 'REST API', 'Authentication'],
    images: ['/projects/mamapa/cover.png'],
  },
  {
    id: 'anniversary',
    title: 'Anniversary — A Page as a Gift',
    context: 'Personal project',
    period: '2026',
    description:
      'A one-year anniversary present built as a single scrolling page: a sealed cover, a counter still running as you read, a timeline of the year, and a letter you have to open.',
    contributions: [
      'Gated the page behind a single “open” interaction so the entrance animation plays once, when it is actually being watched.',
      'Built a live counter that runs up from day one and down to the next anniversary from one source of truth.',
      'Laid the year out as an alternating timeline, and the photos as a masonry album with a tap-to-enlarge viewer.',
      'Held the whole thing to one dark palette, one serif, and motion that never loops visibly.',
    ],
    stack: ['Web App', 'CSS Animation', 'Micro-interactions', 'Responsive'],
    images: ['/projects/anniversary/cover.png', '/projects/anniversary/hero.png'],
  },
  {
    id: 'travelaku',
    comingSoon: true,
    title: 'Travelaku — Visit Indonesia',
    context: 'Personal project',
    period: '2024',
    description: 'A travel platform for exploring Indonesia, from the islands to the itinerary.',
    contributions: [],
    stack: [],
    images: ['/projects/travelaku/cover.png'],
  },
  {
    id: 'healthcare-automation',
    comingSoon: true,
    title: 'Healthcare Workflow Automation',
    context: 'Personal project',
    period: '2025',
    description:
      'Automating the patient encounter end to end — from the front desk through to the back office.',
    contributions: [],
    stack: [],
    images: ['/projects/healthcare/cover.png'],
  },
  {
    id: 'sap-djp',
    title: 'SAP ↔ DJP Tax Integration',
    context: 'BEONE SOLUTION',
    period: '2024 — 2025',
    description:
      'An automated data exchange between enterprise SAP systems and DJP (Direktorat Jenderal Pajak), keeping tax reporting accurate and compliant without manual re-entry.',
    contributions: [
      'Built the interface layer between SAP and the DJP reporting endpoint.',
      'Implemented automated exchange and synchronisation of tax data.',
      'Documented the integration flow for ongoing maintenance.',
    ],
    stack: ['System Integration', 'SAP', 'Data Sync', 'Compliance'],
  },
  {
    id: 'legacy-modernisation',
    draft: true,
    title: 'Legacy Workflow Modernisation',
    context: 'KJPP Karmanto dan Rekan',
    period: '2025',
    description:
      'Rebuilt an appraisal firm’s legacy processes as modern web applications, built and presented directly to the people who use them daily.',
    contributions: [
      'Translated legacy processes into digital workflows with a full-stack approach.',
      'Architected scalable applications across frontend, backend, and database.',
      'Delivered and demonstrated complete web applications to end users.',
    ],
    stack: ['.NET', 'C#', 'REST API', 'Web App'],
  },
  {
    id: 'hris',
    draft: true,
    title: 'HRIS Feature Delivery',
    context: 'Sagara Technology',
    period: '2022 — 2023',
    description:
      'Extended an existing HR information system with new capabilities and connected the client application to the backend services powering them.',
    contributions: [
      'Developed additional HRIS features on an existing codebase.',
      'Connected server and client, then presented the result to users.',
    ],
    stack: ['Node.js', 'REST API', 'PostgreSQL'],
  },
  {
    id: 'rpa-bots',
    draft: true,
    title: 'Process Automation Bots',
    context: 'PT Reycom Document Solusi',
    period: '2021 — 2022',
    description:
      'Automation Anywhere bots replacing repetitive internal document workflows, kept running through active maintenance and troubleshooting.',
    contributions: [
      'Built bots mapped to specific company process requirements.',
      'Maintained and troubleshot bots to keep them running in production.',
    ],
    stack: ['RPA', 'Automation Anywhere', 'Process Design'],
  },
  {
    id: 'sample-inventory',
    draft: true,
    title: 'Inventory & Stock Web App',
    context: 'Freelance',
    period: '2025',
    description:
      'Stock management for a small distributor: incoming goods, outgoing orders, and a live view of what is on the shelf.',
    contributions: [
      'Designed the database schema and the stock movement ledger.',
      'Built the dashboard, filtering, and CSV export.',
      'Handled role-based access for staff and supervisors.',
    ],
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
    href: '',
    repo: '',
  },
  {
    id: 'sample-pos',
    draft: true,
    title: 'Point of Sale Mobile App',
    context: 'Personal project',
    period: '2025',
    description:
      'An offline-first POS for small shops: scan, charge, print, and sync the day once the connection comes back.',
    contributions: [
      'Built the offline queue and the sync-on-reconnect flow.',
      'Integrated a thermal printer over Bluetooth.',
      'Wrote the daily sales summary screen.',
    ],
    stack: ['React Native', 'SQLite', 'REST API'],
    href: '',
    repo: '',
  },
  {
    id: 'sample-cms',
    draft: true,
    title: 'Company Profile & CMS',
    context: 'Freelance',
    period: '2024',
    description:
      'A marketing site with an editor the client can actually use: pages, articles, and media managed without touching code.',
    contributions: [
      'Built the content model and the admin editor.',
      'Set up image optimisation and caching.',
      'Deployed to staging and production with a release checklist.',
    ],
    stack: ['Vue.js', 'NestJS', 'PostgreSQL'],
    href: '',
    repo: '',
  },
  {
    id: 'sample-tasks',
    draft: true,
    title: 'Task Management Dashboard',
    context: 'Personal project',
    period: '2024',
    description:
      'A board for small teams to plan a sprint, assign work, and see where a task is stuck, without the weight of a full project suite.',
    contributions: [
      'Implemented drag-and-drop boards with optimistic updates.',
      'Added activity history and per-task comments.',
      'Wrote the notification service.',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
    href: '',
    repo: '',
  },
];

export const publishedWork: WorkItem[] = workItems.filter((item) => !item.draft);

/** The hero project on the home page. */
export const featuredWork: WorkItem | undefined =
  publishedWork.find((item) => item.featured) ?? publishedWork[0];

/** How many projects sit beside the featured one on the home page. */
const HOME_HIGHLIGHTS = 2;

/** The most recent year a period mentions: '2023 — 2025' → 2025. */
function latestYear(item: WorkItem): number {
  const years = item.period.match(/\d{4}/g) ?? [];
  return years.reduce((newest, year) => Math.max(newest, Number(year)), 0);
}

/**
 * The two most recent projects, shown beside the featured one so the home page
 * always leads with current work. Everything else lives on /projects.
 */
export const highlightedWork: WorkItem[] = publishedWork
  .filter((item) => item.id !== featuredWork?.id && !item.comingSoon)
  .sort((a, b) => latestYear(b) - latestYear(a))
  .slice(0, HOME_HIGHLIGHTS);

/** Technologies ordered by how often they appear, for the /projects filter bar. */
export const workTags: string[] = Object.entries(
  publishedWork.reduce<Record<string, number>>((counts, item) => {
    item.stack.forEach((tech) => {
      counts[tech] = (counts[tech] ?? 0) + 1;
    });
    return counts;
  }, {}),
)
  .filter(([, count]) => count > 1)
  .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
  .map(([tech]) => tech);
