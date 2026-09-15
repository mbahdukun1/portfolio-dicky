import { comingSoonSettings } from '@/data/settings';
import type { WorkItem } from '@/types/portfolio';

const entries: WorkItem[] = [
  {
    id: 'wms',
    featured: true,
    title: 'WMS - Warehouse Management System (Web Based)',
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

    images: ['/projects/wms/login.webp', '/projects/wms/dashboard.webp'],
    href: '',
    repo: '',
  },
  {
    id: 'wms-mobile',
    title: 'WMS - Mobile Warehouse App',
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
    images: ['/projects/wms-mobile/login.webp', '/projects/wms-mobile/goods-receive.webp'],
  },
  {
    id: 'work-order',
    title: 'Work Order - Fleet Maintenance App',
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
    images: ['/projects/wo/login.webp', '/projects/wo/dashboard-running.webp'],
  },
  {
    id: 'e-invoice',
    title: 'E-Invoice - Invoicing Platform',
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
    images: ['/projects/e-invoice/splash.webp', '/projects/e-invoice/login.webp'],
  },
  {
    id: 'onda-gt',
    title: 'Onda GT - Warehouse Scanner App',
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
    images: ['/projects/onda-gt/landing.webp', '/projects/onda-gt/sap-connection.webp'],
  },
  {
    id: 'mamapa',
    title: 'mamAPA - Recipe App',
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
    images: ['/projects/mamapa/cover.webp'],
  },
  {
    id: 'anniversary',
    title: 'Anniversary - Personal Web Page',
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
    images: ['/projects/anniversary/cover.webp', '/projects/anniversary/hero.webp'],
  },
  {
    id: 'travelaku',
    comingSoon: true,
    title: 'Travelaku - Travel App',
    context: 'Personal project',
    period: '2024',
    description: 'A travel platform for exploring Indonesia, from the islands to the itinerary.',
    contributions: [],
    stack: [],
    images: ['/projects/travelaku/cover.webp'],
  },
  {
    id: 'healthcare-automation',
    comingSoon: true,
    title: 'Healthcare - Workflow Automation',
    context: 'Personal project',
    period: '2025',
    description:
      'Automating the patient encounter end to end — from the front desk through to the back office.',
    contributions: [],
    stack: [],
    images: ['/projects/healthcare/cover.webp'],
  },
  {
    id: 'barcode-system',
    title: 'Ruby Barcode System - Label Printing App',
    context: 'BEONE SOLUTION',
    period: '2023 — 2025',
    description:
      'A Flutter desktop app for printing barcode price labels in bulk: bring in items and prices from SAP Business One or a spreadsheet, pick what needs a label, and send it to the label printer.',
    contributions: [
      'Built the desktop app in Flutter, from sign-in through to printing.',
      'Integrated with SAP Business One so items and price lists are fetched straight from the ERP through a Data Sync & API dialog.',
      'Built Excel import for the full catalogue or a selection file, handling around 30,000 rows and keeping the table on the device as JSON.',
      'Built a searchable, paginated item table with select all, show selected, and a selection saved automatically as it changes.',
      'Built printer settings — label preset, paper size, columns, orientation — with a live preview of the label being printed.',
      'Tied sign-in to a device ID and surfaced the printer connection status in the header.',
    ],
    stack: ['Flutter', 'Desktop App', 'SAP', 'System Integration', 'Barcode Printing', 'Excel Import'],
    images: [
      '/projects/barcode/catalogue.webp',
      '/projects/barcode/data-sync.webp',
      '/projects/barcode/selection.webp',
      '/projects/barcode/login.webp',
    ],
  },
  {
    id: 'sap-addon-dongjin',
    title: 'DongJin - SAP Integration Add-on',
    context: 'BEONE SOLUTION x PT DongJin',
    period: '2023 — 2025',
    description: 'An integration add-on built on top of SAP for PT DongJin.',
    contributions: [],
    stack: ['SAP', 'SAP Add-on', 'System Integration'],
  },
  {
    id: 'kjpp-hris',
    title: 'K-Appraisal HRIS - HR Information System',
    context: 'KJPP Karmanto dan Rekan',
    period: '2025',
    description: 'An HR information system built for KJPP Karmanto dan Rekan.',
    contributions: [],
    stack: ['React', 'TypeScript', 'Sequelize ORM', 'HRIS'],
  },
  {
    id: 'kjpp-data-pembanding',
    title: 'K-Appraisal Data Pembanding - Comparable Data System',
    context: 'KJPP Karmanto dan Rekan',
    period: '2025',
    description:
      'A system for the comparable data (data pembanding) that the firm’s property valuations are built on.',
    contributions: [],
    stack: ['React', 'TypeScript', 'Web App'],
  },
  {
    id: 'sap-djp',
    title: 'SAP DJP - Tax Integration',
    context: 'BEONE SOLUTION',
    period: '2024 — 2025',
    description:
      'A two-way tax integration between SAP Business One and DJP’s Coretax: documents go from SAP to a Node.js middleware, through Pajak Express to Coretax, and the results come back onto the SAP record.',
    contributions: [
      'Built the Node.js middleware between SAP Business One and Pajak Express, the gateway that carries tax documents on to Coretax.',
      'Covered faktur pajak, bukti potong, SPT reporting data, and NPWP/NIK master data validation.',
      'Wrote Coretax results back into SAP: official document numbers, approval or rejection status, and the issued PDF or QR code.',
      'Ran the sync on a schedule, with manual send and resend for documents that cannot wait or have just been fixed.',
      'Documented the integration flow for ongoing maintenance.',
    ],
    stack: ['System Integration', 'SAP', 'Node.js', 'Middleware', 'Coretax', 'Pajak Express', 'Compliance'],
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
    stack: ['React', 'TypeScript', 'REST API', 'Web App'],
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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

export const workItems: WorkItem[] = entries.map((item) =>
  item.contributions.length === 0 ? { ...item, comingSoon: true } : item,
);

const visibleWork = workItems.filter(
  (item) => !item.draft && (comingSoonSettings.show || !item.comingSoon),
);

export const publishedWork: WorkItem[] =
  comingSoonSettings.placement === 'end'
    ? [...visibleWork.filter((item) => !item.comingSoon), ...visibleWork.filter((item) => item.comingSoon)]
    : visibleWork;

export const deliveredWork: WorkItem[] = publishedWork.filter(
  (item) => !item.comingSoon && !item.placeholder,
);

const upcomingWork: WorkItem[] = workItems.filter((item) => !item.draft && item.comingSoon);

export const upcomingCount = comingSoonSettings.showCount ? upcomingWork.length : 0;

export const featuredWork: WorkItem | undefined =
  publishedWork.find((item) => item.featured) ?? publishedWork[0];

const HOME_HIGHLIGHTS = 2;

function latestYear(item: WorkItem): number {
  const years = item.period.match(/\d{4}/g) ?? [];
  return years.reduce((newest, year) => Math.max(newest, Number(year)), 0);
}

export const highlightedWork: WorkItem[] = publishedWork
  .filter((item) => item.id !== featuredWork?.id && !item.comingSoon)
  .sort((a, b) => latestYear(b) - latestYear(a))
  .slice(0, HOME_HIGHLIGHTS);


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
