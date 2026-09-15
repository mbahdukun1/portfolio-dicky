import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/barcode';

export const barcodeSystemCase: CaseStudy = {
  slug: 'barcode-system',
  title: 'Ruby Barcode System - Label Printing App',
  context: 'BEONE SOLUTION',
  period: '2023 — 2025',
  role: 'Flutter & integration engineer',
  platform: 'Flutter desktop app on SAP Business One',
  lede: 'A Flutter desktop workstation for printing barcode price labels in bulk — pull items and prices from SAP Business One or a spreadsheet, choose what needs a label, and send it to the printer.',

  overview: [
    'Ruby Barcode System is the app a retail team uses to put prices on products. Every item needs a label with the brand, the item name, the size, the price, and a barcode a scanner can read at the till, and the catalogue it has to cover runs to tens of thousands of items.',
    'Doing that by hand does not scale, and doing it from a generic label tool means retyping data that already exists in SAP Business One. So the app starts from the data instead: pull the items and their price list from the ERP, or import a spreadsheet, find the handful of items that changed, and print exactly those labels at the size the printer expects.',
    'It is built in Flutter as a desktop app, which keeps the whole workstation in one native window on the machine that sits next to the label printer.',
    'It is organised as one working screen. Printer settings and a live label preview on the left, the item table in the middle, and every action — import, fetch, select, print — one click away along the edges.',
  ],

  flow: [
    {
      title: 'Sign in on a known device',
      detail:
        'Users sign in with a username and password, and the form shows the Device ID the session will be tied to. New users can register from the same screen.',
    },
    {
      title: 'Bring the catalogue in',
      detail:
        'Open Data Sync & API and fetch items with their price list from SAP Business One, or import every item from an Excel file instead.',
    },
    {
      title: 'Narrow it down',
      detail:
        'Search the table, tick the items that need labels, and use Show Selected to review just those before printing.',
    },
    {
      title: 'Update from a selection file',
      detail:
        'XLSX Selection Import matches a smaller file against the loaded table and updates only the rows it names.',
    },
    {
      title: 'Set up the label',
      detail:
        'Choose a preset, paper size, paper columns, and orientation, and check the preview of the label that will come out.',
    },
    {
      title: 'Print',
      detail:
        'The header shows whether the printer is connected. Print sends the selected items to the label printer.',
    },
  ],

  chapters: [
    {
      id: 'sign-in',
      heading: 'Signing in on a known device',
      body: [
        'The login screen asks for more than a username and password: it shows the Device ID the session belongs to. A label workstation is a physical place in a store, and knowing which machine printed which labels is part of the job.',
        'Validation happens on the form itself — an empty username or password is flagged inline before anything is sent — and the Register link sits under the button so a new operator does not need someone else to set them up.',
      ],
      shots: ['login'],
    },
    {
      id: 'catalogue',
      heading: 'A table built for tens of thousands of items',
      body: [
        'The working screen is a table of item code, item name, and barcode, and it has to stay usable at catalogue scale: the import shown here processed 29,998 rows, which pages out to 2,308 pages of items.',
        'Finding things is the whole game at that size. A search box filters the table, Select All and Clear Selected work across the set, and Show Selected collapses the table to only the items that are about to be printed, so a batch can be checked before it wastes a roll of labels.',
        'The selection is not fragile. The activity log records that table data is auto-saved on selection change and written out as JSON, so ticking a few hundred items is not lost to a restart halfway through a shift.',
      ],
      shots: ['catalogue', 'selection'],
    },
    {
      id: 'import',
      heading: 'Two ways in: SAP Business One or a spreadsheet',
      body: [
        'The source of truth for items and prices is SAP Business One, so the ERP is the first-class path. Fetch from API opens a Data Sync & API dialog where the operator picks the API and the SAP price list — API-RBS-PRICELIST and GENERAL_PRICE_LIST in the screenshot — and the items land straight in the table with the prices the business already maintains.',
        'Spreadsheets are the fallback for everything that does not come from the ERP. XLSX Import All loads a whole file; XLSX Selection Import takes a smaller file and updates only the rows it matches — the log reports it plainly, as “Updated 3 rows based on selection file.”',
        'Both paths end in the same place, so everything downstream — search, selection, printing — does not care where the data came from.',
      ],
      shots: ['data-sync'],
    },
    {
      id: 'printing',
      heading: 'Printer settings and a label you can see',
      body: [
        'Label printers are unforgiving about geometry, so the settings panel is explicit: a preset such as Price Label, the paper size in inches — 4.0 × 1.0 here — the number of paper columns, and landscape or portrait orientation.',
        'Above the settings sits a preview of the label itself: brand, price in rupiah, item name, size, and the barcode with its number underneath. What the operator sees is what the printer is about to produce.',
        'The header states the printer connection in words — Printer Disconnected in these screenshots — so a failed print is explained before anyone presses the button.',
      ],
      shots: ['catalogue'],
    },
    {
      id: 'log',
      heading: 'An activity log instead of a spinner',
      body: [
        'Under the printer settings is a running log of what the app is doing: the file name and size, “Decoding Excel file…”, the sheets it found, how many rows it processed, when the table was saved, and when imported data was cleared.',
        'It is a small thing that saves a support call. When an import of thirty thousand rows takes a moment, the operator can watch it progress instead of wondering whether the app has frozen.',
      ],
    },
  ],

  gallery: [
    {
      id: 'login',
      src: `${base}/login.webp`,
      title: 'Sign in',
      caption: 'Username, password, and the Device ID the session is tied to, with inline validation and a register link.',
      shape: 'wide',
    },
    {
      id: 'catalogue',
      src: `${base}/catalogue.webp`,
      title: 'Catalogue and printer settings',
      caption:
        'The item table after an Excel import of 29,998 rows, beside the label preview, printer settings, and the activity log.',
      shape: 'wide',
    },
    {
      id: 'selection',
      src: `${base}/selection.webp`,
      title: 'Selecting items to print',
      caption: 'Three rows selected, with the log confirming the selection is saved as it changes.',
      shape: 'wide',
    },
    {
      id: 'data-sync',
      src: `${base}/data-sync.webp`,
      title: 'Data Sync & API',
      caption: 'Fetching items and a price list from SAP Business One instead of a spreadsheet.',
      shape: 'wide',
    },
  ],
};
