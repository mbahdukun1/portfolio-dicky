import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/onda-gt';

export const ondaGtCase: CaseStudy = {
  slug: 'onda-gt',
  title: 'Onda Goods Tracker — Warehouse Scanner',
  context: 'BEONE SOLUTION x Onda',
  period: '2023 — 2025',
  role: 'Mobile & integration engineer',
  platform: 'Android/iOS handheld app on SAP Business One',
  lede: 'A barcode-first warehouse app that turns a packing list, a picking list, or a stock opname into scans — and posts the result straight into SAP.',

  overview: [
    'Onda Goods Tracker is the handheld app the Onda warehouse team uses on the floor. Every movement of goods that used to happen on a clipboard — receiving a container, moving stock between racks, picking an order, counting the shelves — happens here as a scan, and lands in SAP Business One as a real document.',
    'The problem it solves is the gap between the warehouse and the ERP. Stock physically moved hours before anyone typed it in, so SAP was always a little bit wrong, and the corrections happened at month end when nobody could remember what had actually occurred. Closing that gap meant putting the ERP in the operator’s hand rather than asking them to report to it afterwards.',
    'The app is organised as four tabs, one per flow: Inbound, Inventory Transfer, Delivery, Stock Counting. Each one is the same shape — open a document, scan against it, check the summary, post — so an operator who has learned one flow has effectively learned all four.',
  ],

  flow: [
    {
      title: 'Point the device at SAP',
      detail:
        'A settings screen holds the API server, the SAP company, and the SAP user. The device is configured once and every document it posts belongs to that company.',
    },
    {
      title: 'Inbound — open a packing list',
      detail:
        'The inbound tab lists open transactions by number, date, and packing list. A new one starts by scanning the barcode on the document itself.',
    },
    {
      title: 'Inbound — scan against the PO',
      detail:
        'The packing list opens on the purchase orders behind it. Operators scan each carton; scanned items accumulate with their item code, description, and quantity.',
    },
    {
      title: 'Inbound — check the summary, post the receipt',
      detail:
        'The summary tab compares scanned quantity against expected — 1,200 of 3,600 — before the goods-receipt form collects the import fields (posted by, received by, profit centre, AJU, container, seal) and posts the PO receipt to SAP.',
    },
    {
      title: 'Move stock between locations',
      detail:
        'An inventory transfer opens on its ITR number and branch, scans items into it the same way, and processes the transfer when the list matches.',
    },
    {
      title: 'Outbound — pick and deliver',
      detail:
        'A picking list is scanned open, items are scanned into it, and the summary shows picked against ordered per line before the delivery is processed.',
    },
    {
      title: 'Stock opname — take a rack',
      detail:
        'A stock counting document is split by rack. An operator claims a location, and the app locks it so a second operator cannot count the same shelf.',
    },
    {
      title: 'Stock opname — count, review, save',
      detail:
        'Items are scanned into the claimed rack with quantities nudged up or down by hand, reviewed as a per-item total in the summary tab, and saved back into the counting document.',
    },
  ],

  chapters: [
    {
      id: 'connection',
      heading: 'Wiring a device to the ERP',
      body: [
        'Before anything is scanned, the device has to know which SAP company it belongs to. The settings screen takes the API server, the company name, and SAP credentials, and everything the app does afterwards runs as that user — so a posting is attributable to a person, not to “the warehouse tablet”.',
        'That decision also meant the app could stay thin. It does not keep its own copy of the item master; it asks SAP, which is why a barcode scanned on the floor resolves to the same item code the buyer used on the purchase order.',
      ],
      shots: ['landing', 'sap-connection'],
    },
    {
      id: 'inbound',
      heading: 'Inbound: from a container to a goods receipt',
      body: [
        'Receiving starts with the paperwork that came with the shipment. The operator scans the barcode on the packing list document, and the app opens it with the purchase orders behind it already attached — so the question is never “which PO is this?”, it is only “does what arrived match it?”.',
        'Scanning cartons builds the scanned-items list: item code, batch, description, quantity. The summary tab then does the arithmetic nobody wants to do on a clipboard — 1,200 pieces scanned against 3,600 expected, per line, live.',
        'Only when the count is right does the goods receipt form appear. It carries the fields Indonesian import receiving actually needs: who posted it, who received it, the profit centre, the AJU customs number, the container number, and the seal. Saving posts a Goods Receipt PO into SAP, and the information tab keeps those references on the document for anyone who has to trace the shipment later.',
      ],
      shots: [
        'inbound',
        'scan-packing-list',
        'packing-list-po',
        'packing-list-scanned',
        'packing-list-summary',
        'goods-receipt-form',
        'packing-list-information',
      ],
    },
    {
      id: 'transfer',
      heading: 'Moving stock without losing it',
      body: [
        'Inventory transfers are the movements most likely to go unrecorded: stock shifts between branches or racks because someone needed the space, and the system finds out later. The transfer tab gives that movement a document — an ITR number, a branch, and a scanned list — and processes it as a real transfer once the items match.',
        'It is the same interaction as inbound on purpose. The operator is not learning a new screen at the moment they are already carrying something heavy.',
      ],
      shots: ['inventory-transfer', 'inventory-transfer-scanned'],
    },
    {
      id: 'outbound',
      heading: 'Outbound: picking to delivery',
      body: [
        'Outbound runs the flow in reverse. The picking list is scanned open, items are scanned as they come off the shelf, and the summary shows what has actually been picked against what the order asked for — 1,200 of 3,600 on one line, 300 of 480 on another.',
        'Processing the delivery is the last action in the flow, and it is deliberately gated behind that summary. The app will show you a short pick; it just will not let you pretend it was complete.',
      ],
      shots: ['scan-picking-list', 'picking-list-scanned', 'picking-summary', 'delivery'],
    },
    {
      id: 'opname',
      heading: 'Stock opname without two people counting the same shelf',
      body: [
        'Stock counting was the hardest flow to get right, because it is the only one where several people work inside the same document at the same time. A counting document covers the whole warehouse; the racks — V1, V2, V3 and up — are counted in parallel by whoever is free.',
        'The app models a location as something you claim. Picking a rack locks it to your user for as long as you are counting it; a second operator who reaches for the same shelf gets told, in plain language, that the location is already taken and to try another one. The location list shows who holds what, so a supervisor can see the whole floor at a glance.',
        'Inside a claimed rack, items are scanned in and quantities adjusted with plus and minus — because a count is a human number, not a scan count, and the operator is allowed to correct it. The summary tab totals each item across the scans before anything is saved back to the counting document and the lock is released.',
        'The flow diagram below is the working sketch behind it: the endpoints that claim and release a location, what happens when two users collide, and where the per-item quantities are written.',
      ],
      shots: [
        'stock-counting',
        'stock-counting-locations',
        'stock-counting-pick-rack',
        'stock-counting-rack-locked',
        'stock-counting-input',
        'stock-counting-summary',
        'stock-opname-flow',
      ],
    },
    {
      id: 'engineering',
      heading: 'What it took',
      body: [
        'The interesting engineering is not the scanning — it is the contract with SAP. Every flow had to produce a document SAP would accept on the first try, which meant validating quantities, batches, and required fields on the device before a posting was ever attempted. A rejection on the warehouse floor is expensive; the operator has already put the box down.',
        'The location locking is the other piece worth calling out. It is a small amount of state, but it is shared state across devices, and it is the difference between a stock opname you can trust and one you have to run twice.',
      ],
    },
  ],

  gallery: [
    {
      id: 'landing',
      src: `${base}/landing.png`,
      title: 'App entry',
      caption: 'Onda Sanitary & Plumbing, built with BEONE SOLUTION. Settings live behind the gear icon.',
    },
    {
      id: 'sap-connection',
      src: `${base}/sap-connection.png`,
      title: 'SAP connection',
      caption: 'API server, SAP company, and SAP credentials — configured once per device.',
    },
    {
      id: 'inbound',
      src: `${base}/inbound.png`,
      title: 'Inbound list',
      caption: 'Open inbound transactions by number, date, and packing list number.',
    },
    {
      id: 'scan-packing-list',
      src: `${base}/scan-packing-list.png`,
      title: 'Scan the packing list',
      caption: 'The document barcode opens the packing list — no typing a number off a printout.',
    },
    {
      id: 'packing-list-po',
      src: `${base}/packing-list-po.png`,
      title: 'Purchase orders behind the list',
      caption: 'A packing list opens on the POs it fulfils, so the match is already made.',
    },
    {
      id: 'packing-list-process',
      src: `${base}/packing-list-process.png`,
      title: 'Ready to process',
      caption: 'Once the POs are confirmed, the receipt can be processed from the same tab.',
    },
    {
      id: 'packing-list-scanned',
      src: `${base}/packing-list-scanned.png`,
      title: 'Scanned items',
      caption: 'Each scan adds an item code, batch, description, and quantity to the list.',
    },
    {
      id: 'packing-list-summary',
      src: `${base}/packing-list-summary.png`,
      title: 'Receipt summary',
      caption: 'Scanned quantity against expected, per line — 1,200 of 3,600 before anything is posted.',
    },
    {
      id: 'goods-receipt-form',
      src: `${base}/goods-receipt-form.png`,
      title: 'Goods receipt form',
      caption: 'Posted by, received by, profit centre, AJU, container and seal numbers — then post to SAP.',
    },
    {
      id: 'packing-list-information',
      src: `${base}/packing-list-information.png`,
      title: 'Document information',
      caption: 'The import references stay on the document for anyone tracing the shipment later.',
    },
    {
      id: 'inventory-transfer',
      src: `${base}/inventory-transfer.png`,
      title: 'Inventory transfer',
      caption: 'Open transfers by date and ITR number.',
    },
    {
      id: 'inventory-transfer-scanned',
      src: `${base}/inventory-transfer-scanned.png`,
      title: 'Transfer scanned items',
      caption: 'Items scanned into an ITR document, ready to process against the destination branch.',
    },
    {
      id: 'scan-picking-list',
      src: `${base}/scan-picking-list.png`,
      title: 'Scan the picking list',
      caption: 'The same scanner opens an outbound document.',
    },
    {
      id: 'picking-list-scanned',
      src: `${base}/picking-list-scanned.png`,
      title: 'Picked items',
      caption: 'Items scanned off the shelf accumulate against the picking list.',
    },
    {
      id: 'picking-summary',
      src: `${base}/picking-summary.png`,
      title: 'Picking summary',
      caption: 'Picked against ordered, per line, before the delivery is processed.',
    },
    {
      id: 'delivery',
      src: `${base}/delivery.png`,
      title: 'Delivery',
      caption: 'Processed picking lists become deliveries, tracked by picklist number.',
    },
    {
      id: 'stock-counting',
      src: `${base}/stock-counting.png`,
      title: 'Stock counting',
      caption: 'Open stock counting documents — the warehouse-wide opname.',
    },
    {
      id: 'stock-counting-locations',
      src: `${base}/stock-counting-locations.png`,
      title: 'Locations in progress',
      caption: 'Rack V1, V2, V3 — each showing the operator currently counting it.',
    },
    {
      id: 'stock-counting-pick-rack',
      src: `${base}/stock-counting-pick-rack.png`,
      title: 'Claim a rack',
      caption: 'Choosing a location claims it for your user before counting starts.',
    },
    {
      id: 'stock-counting-rack-locked',
      src: `${base}/stock-counting-rack-locked.png`,
      title: 'Location already taken',
      caption: 'Two operators cannot count the same shelf — the app says so, in plain language.',
    },
    {
      id: 'stock-counting-input',
      src: `${base}/stock-counting-input.png`,
      title: 'Counting a rack',
      caption: 'Scan an item, then nudge the quantity up or down. A count is a human number.',
    },
    {
      id: 'stock-counting-summary',
      src: `${base}/stock-counting-summary.png`,
      title: 'Count summary',
      caption: 'Per-item totals across every scan in the rack, before saving back to the document.',
    },
    {
      id: 'stock-opname-flow',
      src: `${base}/stock-opname-flow.png`,
      title: 'Stock opname flow',
      caption:
        'The working design: how locations are claimed and released, what happens on a collision, and where quantities are written.',
      shape: 'wide',
    },
  ],

  outcomes: [
    'Warehouse movements post to SAP as they happen instead of at the end of the day.',
    'Receiving, transfer, picking, and counting share one interaction, so training is one flow, not four.',
    'Parallel stock opname became possible — locations are claimed, so no shelf is counted twice.',
  ],
};
