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
      'A warehouse platform covering the full flow of goods across ~40 sites from one console — what comes in, what goes out, and what is on the shelf — kept in step with Oracle NetSuite by a middleware behind it. NetSuite knows a warehouse as a number; the floor needs to know which bin a part sits in, who is holding it, and that 795 arrived against a PO for 800. WMS holds that detail — bins, putaway, picking, packing, discrepancies, adjustments — and a NestJS middleware makes sure every document the warehouse produces ends up as the matching document in NetSuite, with NetSuite keeping the last word on every stock movement.',
    contributions: [
      'Built Inbound Management: transfer orders, PIB import declarations, local vendor purchase orders, and customer returns, through receive and putaway.',
      'Built Outbound Management: sales orders and inter-site transfer orders through picking, packing, and delivery tracking.',
      'Implemented Inventory Management down to bin level — available vs reserved vs in-transit stock, bin reallocation, and discrepancy documents.',
      'Built the NestJS middleware to Oracle NetSuite — a direct sync path plus a BullMQ/Redis queue — with Postgres upserts keyed on the ERP document id so a sync is safe to re-run.',
      'Built the approval chain for stock adjustments and the round trip that lets Oracle NetSuite accept or reject each one.',
      'Added inventory sales delivery and sales return between the MSO and VHS warehouses — drafts, per-bin remarks, printable delivery notes, and export.',
      'Reworked daily-use screens with remembered filters, date-range search, filtered totals, picking bins on delivery plans, and double-submit guards.',
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
      'The handheld companion to the WMS console: receiving, transfers, and stock counts done against a local SQLite database, so scanning keeps working where the signal does not. The console is where supervisors plan and reconcile; this is where the work actually happens — a picker walking the aisles, receiving a shipment against an MRN, scanning a material into a bin. Warehouse buildings are steel boxes full of steel racking and the signal drops exactly where the stock is, so the app carries its own copy of the master data and reconciles with the server whenever there is a connection to reconcile with.',
    contributions: [
      'Built the app offline-first on local SQLite — ~9,500 master records held on the device so every scan lookup resolves without a round trip.',
      'Made sync a visible screen: record count, last-sync age, fresh init, a database explorer, and a guarded destroy.',
      'Modelled inbound work as queues with live counts — MRN, GR list, grouping, putaway, history — instead of a feature menu.',
      'Built MRN receiving around request vs received vs remaining quantity per material, with QR scanning in place of typed codes.',
      'Covered outbound and inventory from the same device, so one handheld follows the material from the dock to the bin and back out.',
      'Kept the operator honest about freshness: a stale device is visible before it produces a bad receipt, not after.',
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
      'A workshop app that walks every repair through the same nine steps — breakdown to ready-for-use — with a running timer and the next step always named. A truck comes off the road, someone raises a work order against it, and from that moment the repair is a tracked object rather than a conversation: who is on it, which step it has reached, how long it has been running, and what comes next. The sequence is fixed on purpose — breakdown, service request, inspection, inspection report, parts order, parts supply, repair, ground test, ready for use — because a workshop where every job is tracked differently is one where nobody can answer “where is that unit?”.',
    contributions: [
      'Built the worker dashboard around one question: what am I doing next, split into on-progress and finished jobs.',
      'Fixed the repair lifecycle to nine ordered steps and surfaced the next one on every card, so handovers need no explanation.',
      'Implemented claim-and-run: START stamps the mechanic and begins an elapsed timer; Waiting marks a job blocked rather than stalled.',
      'Built work order creation against a unit, so every repair starts from the same record instead of a phone call.',
      'Recorded who started and who finished each job, so the history of a unit reads as names and times rather than guesses.',
      'Wired the app to company single sign-on, with role-based access tied to real employee records.',
    ],
    stack: ['Mobile', 'SSO', 'REST API', 'Role-based access', 'Workflow'],
    coverShape: 'phone',
    images: ['/projects/wo/login.webp', '/projects/wo/dashboard-running.webp'],
  },
  {
    id: 'tid-sparepart',
    title: 'TID - Sparepart & Fleet Maintenance System',
    context: 'Motor Sights International · KFM-TID',
    period: '2025 — 2026',
    description:
      'A sparepart management and fleet maintenance system for KFM-TID: spare parts coming into and going out of the warehouse, and the maintenance work that consumes them. Parts arrive, are relocated, and leave against SPPB documents, while units break down, get worked on, and come back into service — and the people running the operation need both stories on one dashboard. I joined a team already shipping it, working across the React web console and the NestJS services behind it to add outbound modules, document exports, and the maintenance metrics the operation is judged on.',
    contributions: [
      'Built the SPPB outbound module on the React web console, down to the detail table of part numbers and quantities per document.',
      'Added document export for shipping and for relocation, on both the inbound and outbound side.',
      'Built dashboard widgets for maintenance performance: an average handling time table, MTTR, and a donut chart of stock adjustments.',
      'Reworked stock adjustment create and update with schema validation and material-type rules for tools.',
      'Built endpoints on the NestJS service for breakdowns, work order execution, average handling time, weekly greasing and maintenance, and unit population.',
      'Fixed the date logic the reports depend on — UTC conversion, month boundaries, end dates by order type, and rolling windows.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'NestJS', 'TypeORM', 'REST API', 'Dashboard'],
    images: ['/projects/tid/cover.webp'],
  },
  {
    id: 'e-invoice',
    title: 'E-Invoice - Invoicing Platform',
    context: 'BEONE SOLUTION',
    period: '2023 — 2025',
    description:
      'A mobile-first electronic invoicing product handling billing and payment, built on a microservices architecture designed to hold up under high traffic. Before it, an invoice travelled as a PDF attachment — emailed by finance, approved in a chat thread, typed into the bank, then re-keyed into the accounting system — and nobody could say where an invoice was without asking three people. The platform replaces that chain with one shared record: a supplier raises an A/P invoice and gets a virtual account for it, finance groups invoices into a payment request, an approver signs it off from a phone, and settlement closes the loop.',
    contributions: [
      'Designed the microservices architecture so invoicing, payment, and the SAP integration scale and deploy independently — a month-end rush does not take the whole product down.',
      'Built two-step onboarding that will not continue until the bank account number comes back valid.',
      'Supported a second sign-in path straight against a company’s own SAP instance, which made tenant and SAP company a first-class part of every request.',
      'Built the request, approve, and settle flow, with virtual accounts that can be merged or split while keeping the mapping reconcilable.',
      'Integrated a payment gateway so card and bank credentials never touch our services.',
      'Built the web console for volume work: the full invoice table, tenants, product licences, and coupon master data.',
      'Optimised the backend for real-time processing, then ran performance tests under concurrency and tuned what broke first.',
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
      'A barcode-first handheld app for the warehouse floor: receiving, transfers, picking, and stock opname, each posting straight into SAP Business One. Stock used to move hours before anyone typed it in, so SAP was always a little wrong and the corrections happened at month end, when nobody could remember what had actually occurred. Onda Goods Tracker closes that gap by putting the ERP in the operator’s hand — every movement that used to live on a clipboard happens as a scan and lands in SAP as a real document.',
    contributions: [
      'Built four scanning flows — inbound, inventory transfer, picking and delivery, stock counting — on one shared interaction.',
      'Gave every flow the same shape — open a document, scan against it, check the summary, post — so learning one flow means learning all four.',
      'Integrated every flow with SAP Business One so movements post as real documents the moment they happen.',
      'Built receiving against packing lists and purchase orders, with a scanned-versus-expected summary before anything posts.',
      'Implemented per-rack location locking so several operators can run a stock opname in parallel without counting the same shelf.',
      'Validated quantities and required fields on the device to stop postings being rejected on the warehouse floor.',
    ],
    stack: ['Mobile', 'SAP', 'System Integration', 'Barcode Scanning', 'REST API'],
    coverShape: 'phone',
    images: ['/projects/onda-gt/landing.webp', '/projects/onda-gt/sap-connection.webp'],
  },
  {
    id: 'juli-cake',
    title: 'Juli Cake - Bakery Ordering Website',
    context: 'Freelance',
    period: '2026',
    description:
      'A storefront for a Jakarta home bakery that bakes to order: browse the menu, build a cart, pick a date the kitchen can make, and send the finished order to WhatsApp — with a dashboard for the owner to run the menu. Every order used to start as a chat that went back and forth over sizes, prices, and dates before anyone knew what was being ordered. The site does not replace WhatsApp, where the customers already are; it does the part the chat was bad at, and hands the bakery a message that is already complete.',
    contributions: [
      'Built the storefront in Expo and React Native Web: menu cards with photo carousels, size-based pricing, search, and category filters.',
      'Built a persistent cart whose earliest pickup date follows the slowest item’s lead time, and that composes the whole order into a WhatsApp message.',
      'Built the admin dashboard to reorder, hide, edit, and add menu items, with in-browser photo compression before upload.',
      'Put the menu and photos on Supabase with row-level security — public reads only active items, only the signed-in admin can write.',
      'Cached the menu on the device with a built-in fallback, so the shop never opens on an empty page.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Web App', 'Responsive', 'WhatsApp'],
    images: ['/projects/juli-cake/hero.webp', '/projects/juli-cake/catalog.webp'],
    href: '',
  },
  {
    id: 'mamapa',
    title: 'mamAPA - Recipe App',
    context: 'Personal project',
    period: '2023',
    description:
      'A recipe app for the daily “mau makan apa?” stalemate — search when you know what you want, and an AI that suggests dishes when you do not. A search box only helps someone who already has a word to type; the recommendation screen takes a vague mood and comes back with actual dishes, each with a sentence on why it fits. Around that sit the parts that make a recipe app worth opening twice: an account, favourites, and a shelf for the recipes you have written yourself.',
    contributions: [
      'Built the AI recommendation flow that turns a vague craving into concrete dishes with reasoning.',
      'Built search results with photos, so the specific case is as quick as the vague one.',
      'Designed the home screen around the one question the app is named after, rather than a feed.',
      'Designed the recipe page around cooking: ingredients as a checklist, steps as one action per card.',
      'Implemented auth with email and Google, favourites, and user-written recipes.',
      'Set expectations on the landing screen so a first-time user knows what the app will and will not do.',
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
      'A one-year anniversary present built as a single scrolling page: a sealed cover, a counter still running as you read, a timeline of the year, and a letter you have to open. It is not a product, and that changed every decision — no navigation because there is only one path, no call-to-action because nothing is being sold, and a pace closer to something handed over than something browsed. The engineering problem was restraint: falling petals, a live counter, an envelope that unseals, photos that open on tap, all kept quiet enough to feel sincere.',
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
    title: 'Travelaku - Travel App',
    context: 'Personal project',
    period: '2024',
    description:
      'A travel platform for exploring Indonesia, from the islands to the itinerary. Indonesia is seventeen thousand islands, and most travel sites flatten that into a list of hotels; Travelaku starts from the place instead — pick an island, see what is worth going for, and turn the places you like into a trip. Browsing and planning live in the same app, so the destination you saved this morning is already a day on your itinerary by the evening.',
    contributions: [
      'Built destination browsing organised by island and region, from Bali and Lombok to Labuan Bajo and Raja Ampat.',
      'Built destination pages with photos, highlights, and the practical details needed to plan a visit.',
      'Built a day-by-day itinerary planner that turns saved destinations into a trip.',
      'Added search and category filters — beaches, mountains, culture, culinary — so a vague idea becomes a short list.',
      'Made the whole experience responsive, so a trip planned on a laptop can be followed on a phone.',
    ],
    stack: ['Web App', 'React', 'REST API', 'Responsive'],
    images: ['/projects/travelaku/cover.webp', '/projects/travelaku/journey.webp'],
  },
  {
    id: 'healthcare-automation',
    title: 'Healthcare - Workflow Automation',
    context: 'Personal project',
    period: '2025',
    description:
      'Automating the patient encounter end to end — from the front desk through to the back office. A single visit passes through registration, triage, the doctor, billing, and claims, and at every one of those desks the same patient details tend to be typed in again. This project treats the encounter as one workflow instead of five forms: each step hands the next desk a task with the data already attached, and the repetitive parts in between run on their own.',
    contributions: [
      'Mapped the patient encounter as one workflow — registration, triage, encounter, billing, back office — instead of separate forms.',
      'Turned each handoff into a task in the next desk’s queue, so nothing waits on someone remembering to pass it on.',
      'Automated the repetitive steps between desks, so data entered at the front desk is never re-typed downstream.',
      'Built queue and status views so staff can see what is waiting, on whom, and for how long.',
      'Added a daily overview of encounters, automated steps, and items still waiting.',
    ],
    stack: ['Workflow', 'Automation', 'Web App', 'REST API'],
    images: ['/projects/healthcare/cover.webp', '/projects/healthcare/workflow.webp'],
  },
  {
    id: 'barcode-system',
    title: 'Ruby Barcode System - Label Printing App',
    context: 'BEONE SOLUTION',
    period: '2023 — 2025',
    description:
      'A Flutter desktop app for printing barcode price labels in bulk: bring in items and prices from SAP Business One or a spreadsheet, pick what needs a label, and send it to the label printer. Every product needs a label with brand, name, size, price, and a barcode the till can read, across a catalogue of tens of thousands of items. Doing that by hand does not scale, and a generic label tool means retyping data SAP already holds — so the app starts from the data, finds the handful of items that changed, and prints exactly those labels at the size the printer expects.',
    contributions: [
      'Built the desktop app in Flutter, from sign-in through to printing.',
      'Integrated with SAP Business One so items and price lists are fetched straight from the ERP through a Data Sync & API dialog.',
      'Built Excel import for the full catalogue or a selection file, handling around 30,000 rows and keeping the table on the device as JSON.',
      'Built a searchable, paginated item table with select all, show selected, and a selection saved automatically as it changes.',
      'Built printer settings — label preset, paper size, columns, orientation — with a live preview of the label being printed.',
      'Tied sign-in to a device ID and surfaced the printer connection status in the header.',
      'Added a running activity log — file, sheets, rows processed, saves — so a 30,000-row import reads as progress, not a frozen window.',
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
    description:
      'An integration add-on built on top of SAP for PT DongJin, delivered at BEONE SOLUTION alongside the rest of the SAP work — Onda Goods Tracker on the warehouse floor, Ruby Barcode System at the label printer, and the SAP DJP tax integration in finance. An add-on extends SAP from the inside, so the client’s team keeps working in the ERP they already know while the integration runs behind the screens they use.',
    contributions: [
      'Built the add-on inside SAP Business One, so the DongJin team works from the ERP screens they already use.',
      'Added the custom fields and forms the integration needs directly on the SAP documents.',
      'Validated documents before they leave SAP, so errors are caught at entry instead of downstream.',
      'Synced data between SAP and the connected system, with each document’s sync status visible on the record.',
      'Logged every exchange, so a failed transfer can be traced and sent again.',
    ],
    stack: ['SAP', 'SAP Business One', 'SAP Add-on', 'System Integration'],
    images: ['/projects/dongjin/cover.webp'],
  },
  {
    id: 'kjpp-hris',
    title: 'HRIS - HR Information System',
    context: 'KJPP Karmanto dan Rekan',
    period: '2025',
    description:
      'An HR information system built for a property valuation firm as part of moving it off legacy processes and onto modern digital workflows. The old way worked and the people using it understood it, but it was getting more expensive to keep alive every year. The replacement was built full stack — React and TypeScript on the front, Sequelize ORM over the database — with frontend, backend, and schema designed together rather than bolted on, and then presented to the people who would use it every day.',
    contributions: [
      'Built employee master data — personal details, position, department, and employment status — as the one record every other module reads from.',
      'Built attendance tracking with a daily and weekly view of who is present, on leave, or absent.',
      'Built leave and permission requests with an approval flow, so a request has a status instead of living in a chat.',
      'Designed the database with Sequelize ORM models and migrations, with the API and the React screens built against the same schema.',
      'Added role-based access so HR, managers, and employees each see only what their role needs.',
      'Presented the system to the HR team and adjusted it around how they actually work.',
    ],
    stack: ['React', 'TypeScript', 'Sequelize ORM', 'HRIS'],
    images: ['/projects/hris/cover.webp'],
  },
  {
    id: 'kjpp-data-pembanding',
    title: 'Data Pembanding - Comparable Data System',
    context: 'KJPP Karmanto dan Rekan',
    period: '2025',
    description:
      'A system for the comparable data (data pembanding) that the firm’s property valuations are built on — the record of comparable properties an appraiser turns to when putting a value on a new one. Like the HRIS, it replaced a legacy process rather than starting from nothing, so the job was to keep what already worked while moving it onto a modern web application. It was built full stack in React and TypeScript, with the interface, the API, and the database designed together, and presented to the appraisers who rely on it.',
    contributions: [
      'Built a structured record for each comparable: location, property type, land and building area, price, date, and source.',
      'Calculated price per square metre automatically, so comparables line up against each other without a spreadsheet.',
      'Built search and filters by area, property type, and size, so an appraiser finds the relevant comparables in seconds.',
      'Showed comparables on a map around the subject property, so distance is part of the judgement.',
      'Built entry and edit forms with validation, so the data the valuations rest on stays consistent.',
      'Replaced the legacy process and presented the system to the appraisers who use it.',
    ],
    stack: ['React', 'TypeScript', 'Web App'],
    images: ['/projects/data-pembanding/cover.webp'],
  },
  {
    id: 'sap-djp',
    title: 'SAP DJP - Tax Integration',
    context: 'BEONE SOLUTION',
    period: '2024 — 2025',
    description:
      'A two-way tax integration between SAP Business One and DJP’s Coretax: documents go from SAP to a Node.js middleware, through Pajak Express to Coretax, and the results come back onto the SAP record. Without it, someone exported invoices, re-keyed them into a tax application, waited, and copied the resulting numbers back into SAP — every step a chance for the two systems to disagree, and in tax, disagreement is expensive. The middleware keeps SAP the system of record for the business and Coretax the system of record for tax, with the translation between them in one place that can change when the regulations do.',
    contributions: [
      'Chose a middleware over a direct connection, so tax rules stay out of SAP customisations and SAP’s data model stays out of every tax call.',
      'Built the Node.js middleware between SAP Business One and Pajak Express, the gateway that carries tax documents on to Coretax.',
      'Covered faktur pajak, bukti potong, SPT reporting data, and NPWP/NIK master data validation.',
      'Wrote Coretax results back into SAP: official document numbers, approval or rejection status, and the issued PDF or QR code.',
      'Ran the sync on a schedule, with manual send and resend for documents that cannot wait or have just been fixed.',
      'Documented the integration flow for ongoing maintenance.',
    ],
    stack: ['System Integration', 'SAP', 'Node.js', 'Middleware', 'Coretax', 'Pajak Express', 'Compliance'],
    images: ['/projects/sap-djp/cover.webp'],
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
