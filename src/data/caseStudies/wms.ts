import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/wms';

export const wmsCase: CaseStudy = {
  slug: 'wms',
  title: 'WMS — Warehouse Management System',
  context: 'Inline Technology · PT Motor Sights International',
  period: '2026',
  role: 'Full-stack engineer',
  platform: 'Web console + NetSuite middleware',
  lede: 'One console for 40 warehouses across Indonesia — what comes in, what goes out, and what is on the shelf — kept in step with Oracle NetSuite by a middleware that sits between them.',

  overview: [
    'WMS is the operations console PT Motor Sights International runs its warehouses from. Goods arrive as a transfer order, a customs PIB declaration, a local vendor PO, or a customer return; they leave as a sales order or an inter-site transfer; and in between they sit in a bin somewhere across roughly forty sites, from Jakarta to Kendari to the IMIP and IWIP industrial parks.',
    'The problem was not that the company lacked a system of record — it had one, Oracle NetSuite. The problem was that NetSuite knows a warehouse as a number, not as a place. It cannot tell you which shelf a part is on, which picker is holding it, or that 795 pieces arrived against a PO for 800. So the floor ran on spreadsheets, and the ERP found out days later.',
    'WMS closes that gap from the warehouse side: bins, putaway, picking, packing, discrepancies, and stock adjustments all live here at the level of detail the floor actually works at. A NestJS middleware behind it — queueing through BullMQ and Redis, upserting into Postgres — keeps the two systems talking, so every document the warehouse produces ends up as the matching document in NetSuite, and every adjustment the warehouse proposes has to survive NetSuite before it becomes real.',
  ],

  flow: [
    {
      title: 'Sign in to a site',
      detail:
        'Users belong to warehouses and to a role — picker, admin, coordinator, warehouse manager, finance, super admin — and the console only shows the sites and actions that role holds. The whole UI switches language from the sidebar.',
    },
    {
      title: 'Inbound — record the request',
      detail:
        'Four inbound sources, each with its own queue: transfer orders between sites, PIB customs declarations, local vendor purchase orders, and customer returns. Every row carries its NetSuite ERP Doc ID from the moment it appears.',
    },
    {
      title: 'Inbound — receive and put away',
      detail:
        'Request → Goods Receive → Putaway → History. Receiving validates what physically arrived against what was ordered; putaway assigns each material to a destination bin, and the history keeps request quantity against received quantity per line.',
    },
    {
      title: 'Raise a discrepancy when the numbers disagree',
      detail:
        'A short count or a damaged part becomes a discrepancy document — quantity issue or quality issue — with the material, bin, supplier, and who reported it. It does not silently disappear into a stock figure.',
    },
    {
      title: 'Outbound — from order to delivery',
      detail:
        'Sales orders and transfer orders move through Picking List → Packing List → Delivery Plan, with box numbers recorded, and the outbound history links SDO, picking, packing, and delivery IDs to one ERP document.',
    },
    {
      title: 'Watch stock at bin level',
      detail:
        'The inventory list separates stock on hand from available, reserved, in-transit, and quantities blocked by quality or quantity issues — then breaks each material down per bin, with a transfer-bins tool to reallocate across them.',
    },
    {
      title: 'Adjust stock through approval',
      detail:
        'Stock opname, cycle count, assembly, disassembly, or a discrepancy write-off: choose materials, choose bins, set a signed quantity per bin, and submit. Nothing changes on submission.',
    },
    {
      title: 'Let NetSuite have the last word',
      detail:
        'The warehouse manager approves, the middleware pushes the adjustment to Oracle NetSuite, and the record waits. NetSuite accepts it — the stock moves and the ERP doc ID comes back — or rejects it, and the adjustment is marked Oracle Rejected.',
    },
  ],

  chapters: [
    {
      id: 'shape',
      heading: 'One console, forty warehouses',
      body: [
        'The dashboard is deliberately plain: who you are, which company and site you are working in, the time, and the three modules. Warehouse staff do not need a chart of their own throughput — they need to get into the right queue in one click.',
        'Everything underneath is scoped by two things at once: the warehouse and the ownership. A single site stores material belonging to different owners, so every document in the system carries both, and a user only ever sees the combination their role grants them.',
      ],
      shots: ['login', 'dashboard'],
    },
    {
      id: 'inbound',
      heading: 'Inbound: four doors, one pipeline',
      body: [
        'Goods arrive four ways and each has its own paperwork. A transfer order comes from another IEL site. A PIB is an import that has cleared customs. A local vendor PO is an ordinary purchase. A customer return comes back in with a refund attached to it, which is why those rows carry statuses like Pending Refund and Pending Approval that the other three never see.',
        'Whatever the source, the pipeline is the same four tabs: Request, Goods Receive, Putaway, History. Splitting receipt from putaway matters — the moment a box is accepted and the moment it reaches a shelf are different events, and treating them as one is how stock ends up "in the warehouse" but nowhere findable.',
        'The history is the proof. Each line ties a transaction to its PO number, GR ID, and putaway ID, then puts request quantity next to receive quantity and names the destination bin. Twenty ordered, ten received, bin IELJKT-I-A1-S1-B1 — the whole story on one row.',
      ],
      shots: [
        'inbound-transfer-order',
        'inbound-pib',
        'inbound-po',
        'inbound-customer-return',
        'inbound-history',
      ],
    },
    {
      id: 'outbound',
      heading: 'Outbound: picking, packing, delivery',
      body: [
        'Outbound runs sales orders and inter-site transfer orders through the same three stages — picking list, packing list, delivery plan — because from the warehouse’s point of view they are the same physical work; only the destination differs.',
        'Statuses are borrowed from the ERP rather than invented locally: Pending Fulfillment, Pending Billing, Pending Billing/Partially Fulfilled. That was a deliberate choice. When the warehouse and finance argue about an order, they should at least be arguing in the same vocabulary.',
        'The outbound history is the join table made visible: SDO ID, picking ID, packing ID, delivery ID, box number, and the ERP doc ID that ties the whole chain back to NetSuite.',
      ],
      shots: ['outbound-sales-order', 'outbound-transfer-order', 'outbound-history'],
    },
    {
      id: 'inventory',
      heading: 'Stock, told the truth',
      body: [
        'The inventory list refuses to show a single number. For every material it separates stock on hand from available quantity, then breaks out what is reserved, what is in transit, and what is blocked by a quantity or quality issue. Ten thousand on hand and nine thousand available is a very different situation from ten thousand of each, and a warehouse that cannot see the difference will promise stock it does not have.',
        'Opening a material drops to bin level: every bin holding it, with the same breakdown per bin, plus a transfer history of every movement between them. The transfer-bins tool reallocates a material across bins with a live allocated-versus-remaining counter, so a redistribution has to balance before it can be saved.',
      ],
      shots: ['inventory-list', 'inventory-detail', 'transfer-bins', 'bin-transfer-history'],
    },
    {
      id: 'discrepancy',
      heading: 'Discrepancies are documents, not corrections',
      body: [
        'When what arrived does not match what was ordered — or what came off the shelf is not what the picker expected — the system opens a discrepancy rather than quietly adjusting a number. They are split into quality issues and quantity issues, tracked separately for inbound and outbound, and each one names the source document, the material, the bin, the supplier, and the person who reported it.',
        'That is the piece most warehouse systems skip, and it is the reason the stock figures in this one can be trusted. A discrepancy is a claim someone made and signed; the adjustment that resolves it is a separate, approved act. Keeping them apart is what makes the audit trail worth having.',
      ],
      shots: ['discrepancy-outbound', 'discrepancy-detail'],
    },
    {
      id: 'adjustment',
      heading: 'Adjustments: the flow with the most at stake',
      body: [
        'Inventory adjustment is where the warehouse is allowed to change the truth, so it is the most heavily gated flow in the product. An adjustment declares a type — stock opname, cycle count, assembly, disassembly, or a discrepancy write-off — plus the accounting class and department it belongs to, and a memo explaining itself.',
        'Then it gets specific. Pick materials from the site, and the form lists every candidate bin holding them with the quantity available; set a signed adjustment per bin, positive to add, negative to reduce, with the running total shown at the bottom. A reduction cannot exceed what the bin actually holds, and a selected bin cannot be left at zero.',
        'Adjustments raised from discrepancies work slightly differently: the system already knows which bins have open issues and how many, so it attaches the discrepancy documents to the adjustment automatically. Fifteen open issues on a material, eleven of them in one bin, and the reference documents come along for the ride.',
      ],
      shots: ['inventory-adjustment', 'adjustment-create', 'adjustment-from-discrepancy'],
    },
    {
      id: 'middleware',
      heading: 'The middleware, and why NetSuite gets the last word',
      body: [
        'Behind the console sits a NestJS service whose only job is to keep WMS and Oracle NetSuite in agreement. Every document in the system carries an ERP Doc ID — the inbound requests, the sales orders, the adjustments — because the ERP is the system of record and WMS is the system of detail. Neither is complete on its own.',
        'The service exposes each resource two ways, and the difference matters. The direct path runs controller → service → repository → an axios client against the Oracle Bridge API, and holds the request open until the sync finishes, returning a result object. It is honest, slow, and exactly what you want when a human is debugging one warehouse from Postman.',
        'The queued path is the one that runs in production. The controller pushes a job onto a BullMQ queue backed by Redis and answers 201 with a job id immediately; a worker process picks it up and runs the same service method in the background, paging through the Bridge API and logging as it goes. Nothing blocks on a sync that might take minutes, and a failed job retries on its own with exponential backoff instead of taking a request down with it.',
        'Writes land in Postgres as upserts rather than inserts, keyed on a unique constraint over the ERP document id. That single constraint is what makes the sync safe to re-run: a record that already exists is updated in place — name, active flag, modified timestamp — and one that does not is inserted. Re-syncing the same page twice is a no-op rather than a duplicate, which is the property you need when the network fails halfway through page four of eleven.',
        'The last piece is direction. The integration is not fire-and-forget: an adjustment does not become real when a manager approves it, it becomes real when NetSuite says so. The status trail shows the whole round trip — submitted, approved by the warehouse manager, handed over as Waiting Oracle, then either approved by Oracle and applied, or bounced back as Oracle Rejected with the stock left exactly where it was.',
        'That costs a step, and it buys the one thing an integration like this has to guarantee: the two systems can never disagree about a stock movement, because only one of them is allowed to decide. Making a distributed approval legible to a warehouse clerk — so a rejection reads as “Oracle Rejected” with a history behind it rather than as a silent failure — was most of the work.',
      ],
      shots: ['middleware-flow', 'adjustment-history'],
    },
    {
      id: 'master',
      heading: 'Master data, roles, and the shape of a bin',
      body: [
        'None of the above works without master data, and there is a lot of it: roughly 9,500 materials with categories, types, units of measure and conversion rates; 729 ownership records covering vendors and customers; forty warehouses.',
        'A warehouse here is not a single location — it is a hierarchy of area, aisle, shelf, and bin, which is what lets a bin code like IELJKT-I-A1-S1-B1 mean something specific to a person standing in front of it. Setting that structure up per site is its own screen.',
        'Access is role-based and warehouse-scoped: a picker in Kendari, a warehouse manager who covers four sites, a finance user who sees the billing side. Users can be deactivated without being deleted, because a departed employee still needs to appear on the documents they signed.',
      ],
      shots: [
        'master-users',
        'master-roles',
        'master-ownership',
        'master-warehouse',
        'master-materials',
      ],
    },
  ],

  gallery: [
    {
      id: 'login',
      src: `${base}/login.webp`,
      title: 'Sign in',
      caption: 'The way in. Users belong to a role and to specific sites, and the console follows from there.',
      shape: 'wide',
    },
    {
      id: 'dashboard',
      src: `${base}/dashboard.webp`,
      title: 'Dashboard',
      caption:
        'Company, site, and the three modules. The sidebar carries inbound, outbound, inventory, master data, and the language switch.',
      shape: 'wide',
    },
    {
      id: 'inbound-transfer-order',
      src: `${base}/inbound-transfer-order.webp`,
      title: 'Inbound — transfer order',
      caption: 'Incoming transfers between sites, with origin and destination warehouse and their ERP doc IDs.',
      shape: 'wide',
    },
    {
      id: 'inbound-pib',
      src: `${base}/inbound-pib.webp`,
      title: 'Inbound — PIB goods receive',
      caption: 'Import declarations waiting to be validated and received: 199 shipments, each with a GR ID.',
      shape: 'wide',
    },
    {
      id: 'inbound-po',
      src: `${base}/inbound-po.webp`,
      title: 'Inbound — local vendor PO',
      caption: 'Purchase orders from local vendors, filtered by status and tied to the vendor and site.',
      shape: 'wide',
    },
    {
      id: 'inbound-customer-return',
      src: `${base}/inbound-customer-return.webp`,
      title: 'Inbound — customer return',
      caption: 'Returns carry their own statuses — pending refund, pending approval, cancelled — and link back to the sales order.',
      shape: 'wide',
    },
    {
      id: 'inbound-history',
      src: `${base}/inbound-history.webp`,
      title: 'Inbound history',
      caption: 'Request quantity against receive quantity, per material, with the GR, putaway ID, and destination bin.',
      shape: 'wide',
    },
    {
      id: 'outbound-sales-order',
      src: `${base}/outbound-sales-order.webp`,
      title: 'Outbound — sales order',
      caption: '260 customer orders moving through fulfilment and billing, in the ERP’s own vocabulary.',
      shape: 'wide',
    },
    {
      id: 'outbound-transfer-order',
      src: `${base}/outbound-transfer-order.webp`,
      title: 'Outbound — transfer order',
      caption: 'Stock transfers out to other sites, through the same picking and packing pipeline.',
      shape: 'wide',
    },
    {
      id: 'outbound-history',
      src: `${base}/outbound-history.webp`,
      title: 'Outbound history',
      caption: 'SDO, picking, packing, and delivery IDs joined to one ERP document and box number.',
      shape: 'wide',
    },
    {
      id: 'inventory-list',
      src: `${base}/inventory-list.webp`,
      title: 'Inventory list',
      caption: 'Stock on hand, available, reserved, in transit, and quantities blocked by quality or quantity issues.',
      shape: 'wide',
    },
    {
      id: 'inventory-detail',
      src: `${base}/inventory-detail.webp`,
      title: 'Inventory detail',
      caption: 'One material broken down per bin, with the same holdings breakdown on each.',
      shape: 'wide',
    },
    {
      id: 'transfer-bins',
      src: `${base}/transfer-bins.webp`,
      title: 'Transfer bins allocation',
      caption: 'Reallocating a material across bins — total available, allocated, remaining, and it must balance to save.',
      shape: 'wide',
    },
    {
      id: 'bin-transfer-history',
      src: `${base}/bin-transfer-history.webp`,
      title: 'Bin transfer history',
      caption: 'Every movement between bins: from, to, quantity, and who adjusted it.',
      shape: 'wide',
    },
    {
      id: 'discrepancy-outbound',
      src: `${base}/discrepancy-outbound.webp`,
      title: 'Discrepancy — outbound',
      caption: 'Quality and quantity issues raised during picking and packing, each tied to its source document.',
      shape: 'wide',
    },
    {
      id: 'discrepancy-detail',
      src: `${base}/discrepancy-detail.webp`,
      title: 'Discrepancy detail',
      caption: 'The material list behind a discrepancy: PO, source doc, bin, quantity, supplier, and ownership.',
      shape: 'wide',
    },
    {
      id: 'inventory-adjustment',
      src: `${base}/inventory-adjustment.webp`,
      title: 'Inventory adjustment',
      caption:
        'Stock opname, cycle count, assembly, disassembly — with statuses that include Waiting Oracle and Oracle Rejected.',
      shape: 'wide',
    },
    {
      id: 'adjustment-create',
      src: `${base}/adjustment-create.webp`,
      title: 'Create adjustment',
      caption: 'Type, class, department, memo, then a signed quantity per candidate bin with a running total.',
      shape: 'wide',
    },
    {
      id: 'adjustment-from-discrepancy',
      src: `${base}/adjustment-from-discrepancy.webp`,
      title: 'Adjustment from discrepancies',
      caption: 'Open issues per bin, with the discrepancy documents attached to the adjustment automatically.',
      shape: 'wide',
    },
    {
      id: 'middleware-flow',
      src: `${base}/middleware-flow.webp`,
      title: 'Middleware sync architecture',
      caption:
        'Both paths to the Oracle Bridge API: a direct sync that blocks and returns a result, and a BullMQ/Redis queue that answers with a job id and runs in the background — both upserting into Postgres on the ERP document id.',
      shape: 'wide',
    },
    {
      id: 'adjustment-history',
      src: `${base}/adjustment-history.webp`,
      title: 'Adjustment status trail',
      caption:
        'The full round trip: submitted, approved by the warehouse manager, waiting on Oracle, approved by Oracle, applied.',
      shape: 'wide',
    },
    {
      id: 'master-users',
      src: `${base}/master-users.webp`,
      title: 'User master',
      caption: 'Users bound to roles and to the specific warehouses they may work in — deactivated, never deleted.',
      shape: 'wide',
    },
    {
      id: 'master-roles',
      src: `${base}/master-roles.webp`,
      title: 'Role master',
      caption: 'Super admin, warehouse manager, coordinator, admin, picker, finance, and two virtual roles.',
      shape: 'wide',
    },
    {
      id: 'master-ownership',
      src: `${base}/master-ownership.webp`,
      title: 'Ownership setting',
      caption: '729 owners, suppliers, and customers — every document in the system carries one.',
      shape: 'wide',
    },
    {
      id: 'master-warehouse',
      src: `${base}/master-warehouse.webp`,
      title: 'Warehouse setting',
      caption: 'Forty sites, each modelled down through area, aisle, shelf, and bin.',
      shape: 'wide',
    },
    {
      id: 'master-materials',
      src: `${base}/master-materials.webp`,
      title: 'Material management',
      caption: '9,479 materials with categories, types, units of measure, conversion rates, and dimensions.',
      shape: 'wide',
    },
  ],

  outcomes: [
    'The warehouse floor and Oracle NetSuite hold the same picture, document for document, through one integration layer.',
    'Syncs are safe to re-run: every write is an upsert on the ERP document id, so a job that fails mid-page can simply run again.',
    'Stock is readable at bin level, with reserved, in-transit, and blocked quantities separated from what is actually available.',
    'Discrepancies became signed documents and adjustments became approved acts — so the audit trail survives the correction.',
    'Forty sites, ~9,500 materials, and 729 owners run from one console with role- and warehouse-scoped access.',
  ],
};
