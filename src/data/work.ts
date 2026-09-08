import type { WorkItem } from '@/types/portfolio';

export const workItems: WorkItem[] = [
  {
    id: 'wms',
    featured: true,
    title: 'WMS — Warehouse Management System',
    context: 'Inline Technology',
    period: '2026',
    description:
      'A warehouse platform for PT Indonesia Equipment Line covering the full flow of goods from one console per site: what comes in, what goes out, and what is on the shelf right now.',
    contributions: [
      'Built Inbound Management: transfer orders, PIB import declarations, local vendor purchase orders, and customer returns.',
      'Built Outbound Management: sales orders and inter-site transfer orders through picking, packing, and delivery tracking.',
      'Implemented Inventory Management for real-time stock levels, component lookup, and storage bin allocation.',
      'Set up master data, per-site role-based access, and multi-language support for the operations team.',
    ],
    stack: ['React', 'TypeScript', 'REST API', 'Role-based access', 'i18n'],
    images: ['/projects/wms-login.jpg', '/projects/wms-dashboard.jpg'],
    href: '',
    repo: '',
  },
  {
    id: 'e-invoice',
    highlight: true,
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
  },
  {
    id: 'sap-djp',
    highlight: true,
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
    highlight: true,
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

/** The short list shown on the home page — everything else lives on /projects. */
export const highlightedWork: WorkItem[] = publishedWork.filter(
  (item) => item.highlight && item.id !== featuredWork?.id,
);

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
