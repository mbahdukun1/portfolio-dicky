import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/wms-mobile';

export const wmsMobileCase: CaseStudy = {
  slug: 'wms-mobile',
  title: 'WMS Mobile — Offline-First Warehouse App',
  context: 'Inline Technology · PT Motor Sights International',
  period: '2026',
  role: 'Mobile engineer',
  platform: 'Android/iOS, offline-first on local SQLite',
  lede: 'The warehouse floor companion to the WMS console — receiving, transfers, and stock counts done on a phone, against a local database that keeps working when the Wi-Fi does not.',

  overview: [
    'WMS Mobile is the handheld half of the warehouse platform. The web console is where supervisors plan and reconcile; this is where the work actually happens — a picker walking the aisles with a phone, receiving a shipment against an MRN, scanning a material into a bin, counting a rack.',
    'The constraint that shaped it is coverage. Warehouse buildings are steel boxes full of steel racking, and the signal drops exactly where the stock is. An app that needs a round trip per scan is an app that stops working halfway down aisle four.',
    'So the app carries its own database. Roughly 9,500 records of master data live locally in SQLite; work is done against that copy and reconciled with the server when there is a connection to reconcile with. The sync state is not hidden away in a settings screen either — it is a first-class page the operator can see and act on.',
  ],

  flow: [
    {
      title: 'Sign in as a warehouse user',
      detail:
        'The same accounts as the console — a picker, an admin, a coordinator — so a scan on the floor is attributable to a person, and the app only opens the sites that user belongs to.',
    },
    {
      title: 'Pull the local database down',
      detail:
        'First run downloads master data into local SQLite. The page shows how many records are held and how long ago they were synced, so a stale device is obvious before it causes a bad scan.',
    },
    {
      title: 'Pick up an inbound task',
      detail:
        'Goods Receive breaks inbound work into its real stages with a live count on each: MRN, GR List, Grouping, Putaway, History. The number is the queue — 28 waiting, 17 to receive, 11 to put away.',
    },
    {
      title: 'Open an MRN',
      detail:
        'Every receipt note carries its ERP doc id, doc type, item count, supplier and owner, searchable by MRN, ERP doc, or supplier — so finding the right one is one search, not a scroll.',
    },
    {
      title: 'Receive against it, line by line',
      detail:
        'The detail screen puts request, received, and remaining quantity side by side per material, with the shipping number, PO, supplier, and a QR button to scan the item rather than type its code.',
    },
    {
      title: 'Run outbound the same way',
      detail:
        'Transfer orders and sales orders with their own counts, and an outbound history behind them.',
    },
    {
      title: 'Work the inventory',
      detail:
        'Six tiles cover the rest of the floor: inventory details, layout, cycle count, discrepancy, reconsolidation, and planning.',
    },
    {
      title: 'Sync back, or start clean',
      detail:
        'Sync pulls the latest; Fresh Init clears and re-downloads when a device has drifted; a database explorer is there for when something needs proving, and Destroy Data for when a device leaves service.',
    },
  ],

  chapters: [
    {
      id: 'offline',
      heading: 'Why the database is on the phone',
      body: [
        'Every design decision here follows from one fact: the signal fails where the stock is. Racking is steel, buildings are big, and the far corner of a warehouse is the worst-connected place in the company. An app that treats the network as available will fail exactly when someone is standing in front of the box they need to scan.',
        'The answer is to invert it. The phone holds its own SQLite copy of the master data — around 9,500 records — and every lookup a scan needs resolves locally, instantly, whether or not there is a connection. The network is used for sync, not for operation.',
        'What makes that honest rather than dangerous is showing the seams. The local database page is a normal screen in the app, not a hidden debug menu: it says how many records are held and how long since the last sync, in plain words. A picker who sees “3 months ago” knows to pull before starting. That one line prevents a whole category of receiving errors.',
      ],
      shots: ['login', 'dashboard', 'local-database'],
    },
    {
      id: 'queues',
      heading: 'The work is the menu',
      body: [
        'Inbound is not presented as a feature list; it is presented as a queue with a count on it. MRN 28, GR List 17, Grouping 0, Putaway 11, History 12. The operator does not choose a module, they choose the pile of work that is largest or most urgent — and an empty stage is visibly empty rather than a dead-end tap.',
        'Outbound uses the same shape with transfer orders and sales orders, and inventory drops to a six-tile grid because those tasks are chosen deliberately rather than worked through in order. Three different navigation patterns for three different kinds of work, each matched to how the task is actually picked up.',
      ],
      shots: ['goods-receive', 'outbound', 'inventory'],
    },
    {
      id: 'receiving',
      heading: 'Receiving, one line at a time',
      body: [
        'The MRN list is dense on purpose. Each card carries the MRN code, ERP doc id, item count, doc type, supplier and owner, with the status called out — closed, pending receipt. That is enough to identify the right document without opening anything, and the search covers MRN, ERP doc, and supplier because operators arrive knowing different things.',
        'The detail screen answers the only question that matters at the shelf: how much was asked for, how much has arrived, how much is still outstanding. Request 100, received 75, remaining 25 — three numbers, colour-coded, per material. Every other field on that screen exists to confirm you have the right document; those three are the work.',
        'Each material carries a QR button. Typing a code like 04.37135.9940 on a phone while holding a box is how mistakes get made, so the default is to scan.',
      ],
      shots: ['mrn-list', 'mrn-detail'],
    },
    {
      id: 'sync',
      heading: 'Sync as a first-class screen',
      body: [
        'The local database page carries the four operations that matter when a device and the server disagree. Sync Data pulls the latest. Fresh Init clears everything and re-downloads, for the device that has drifted far enough that patching is not worth it. Database Explorer opens the local SQLite tables, because on a bad day the fastest way to settle an argument is to look. Destroy Data permanently clears the device.',
        'Putting a destructive action in the app at all is a choice, and it is marked as one — its own Advanced section, in red, described as permanent. Warehouse devices get reassigned and lost; a picker who leaves should not take a copy of the master data with them.',
      ],
      shots: ['local-database'],
    },
  ],

  gallery: [
    {
      id: 'login',
      src: `${base}/login.webp`,
      title: 'Sign in',
      caption: 'The same warehouse accounts as the console, with remember-me for a shared device.',
    },
    {
      id: 'dashboard',
      src: `${base}/dashboard.webp`,
      title: 'Dashboard',
      caption: 'Who is signed in and which warehouse they are working. Nothing else competes for attention.',
    },
    {
      id: 'goods-receive',
      src: `${base}/goods-receive.webp`,
      title: 'Inbound task breakdown',
      caption: 'MRN, GR List, Grouping, Putaway, History — each with the size of its queue.',
    },
    {
      id: 'mrn-list',
      src: `${base}/mrn-list.webp`,
      title: 'MRN list',
      caption: '28 receipt notes with ERP doc id, doc type, item count, supplier and status; searchable by all three.',
    },
    {
      id: 'mrn-detail',
      src: `${base}/mrn-detail.webp`,
      title: 'MRN detail',
      caption: 'Request, received and remaining quantity per material — with a QR button instead of a keyboard.',
    },
    {
      id: 'outbound',
      src: `${base}/outbound.webp`,
      title: 'Outbound',
      caption: 'Transfer orders and sales orders with live counts, and the outbound history behind them.',
    },
    {
      id: 'inventory',
      src: `${base}/inventory.webp`,
      title: 'Inventory',
      caption: 'Details, layout, cycle count, discrepancy, reconsolidation and planning as a chosen-task grid.',
    },
    {
      id: 'local-database',
      src: `${base}/local-database.webp`,
      title: 'Local database',
      caption: '9,548 records held on the device, last sync shown in plain words — plus sync, fresh init, explorer, and destroy.',
    },
  ],

  outcomes: [
    'Scanning keeps working in the dead zones, because lookups resolve against a local database rather than the network.',
    'Sync state is visible to the operator, so a stale device is caught before it causes a bad receipt.',
    'Inbound work is presented as queues with counts, so the next task is obvious without training.',
  ],
};
