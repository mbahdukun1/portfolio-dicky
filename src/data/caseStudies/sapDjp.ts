import type { CaseStudy } from '@/types/portfolio';

export const sapDjpCase: CaseStudy = {
  slug: 'sap-djp',
  title: 'SAP DJP - Tax Integration',
  context: 'BEONE SOLUTION',
  period: '2024 — 2025',
  role: 'Integration engineer',
  platform: 'Node.js middleware between SAP Business One and Coretax',
  lede: 'A two-way bridge between SAP Business One and DJP’s Coretax: tax documents leave SAP on a schedule or on demand, travel through Pajak Express, and come back as official numbers, statuses, and PDFs written onto the original record.',

  overview: [
    'Coretax is the core tax administration system of DJP (Direktorat Jenderal Pajak). Faktur pajak, bukti potong, and the data behind a company’s periodic tax returns all have to be issued and reported there — while the transactions they describe already live in SAP Business One.',
    'Without an integration, that gap is closed by hand: someone exports invoices, re-keys them into a tax application, waits, then copies the resulting numbers back into SAP. Every step is a chance for the two systems to disagree, and in tax, disagreement is expensive.',
    'This project replaced that loop with a Node.js middleware. It picks tax-relevant documents out of SAP Business One, validates and maps them, sends them through Pajak Express — the tax application provider that connects to Coretax — and writes everything that comes back onto the SAP document it started from.',
  ],

  flow: [
    {
      title: 'Pick up documents from SAP Business One',
      detail:
        'A scheduled job collects new and changed tax-relevant documents from SAP Business One. The same path can be triggered manually to send or resend a document on demand.',
    },
    {
      title: 'Validate the counterparty',
      detail:
        'NPWP, NIK, and related master data for the other side of each transaction are checked before anything is sent, so an invalid identity is caught in SAP rather than rejected by Coretax.',
    },
    {
      title: 'Map into tax documents',
      detail:
        'SAP transactions are shaped into what Coretax expects: faktur pajak for VAT, bukti potong for withholding tax, and the data that feeds periodic SPT reporting.',
    },
    {
      title: 'Send through Pajak Express',
      detail:
        'The middleware submits each document to Pajak Express, which carries it on to DJP’s Coretax.',
    },
    {
      title: 'Track the response',
      detail:
        'Every submission is followed until Coretax answers: approved, or rejected with the reason attached.',
    },
    {
      title: 'Write the result back into SAP',
      detail:
        'The official document number, the status, and the issued PDF or QR code are written back onto the original SAP document, so finance never leaves SAP to find them.',
    },
    {
      title: 'Fix and resend',
      detail:
        'A rejected document is corrected at its source in SAP and sent again — automatically on the next run, or immediately by hand.',
    },
  ],

  chapters: [
    {
      id: 'why-middleware',
      heading: 'Why a middleware, and not a direct connection',
      body: [
        'SAP Business One is good at recording transactions and indifferent to how a tax authority wants them described. Coretax is the opposite. Connecting the two directly would have pushed tax rules into SAP customisations or pushed SAP’s data model into every tax call.',
        'A Node.js middleware keeps each side honest. SAP stays the system of record for the business, Coretax stays the system of record for tax, and the translation between them — validation, mapping, submission, and the return trip — lives in one place that can change when the regulations do.',
      ],
    },
    {
      id: 'documents',
      heading: 'Everything tax that SAP produces',
      body: [
        'The integration is not limited to one document type. Faktur pajak covers VAT on sales and purchases. Bukti potong covers the withholding taxes deducted on payments. The data behind SPT reporting is gathered from the same transactions, so the period’s report is built from what was actually issued.',
        'Master data travels too. NPWP, NIK, and the identifiers Coretax uses for each counterparty are validated before documents that depend on them are sent, because a wrong tax ID is the kind of error that surfaces weeks later as a rejected document nobody remembers creating.',
      ],
    },
    {
      id: 'round-trip',
      heading: 'The round trip back into SAP',
      body: [
        'Sending is half the job. A tax document is not finished when it leaves SAP; it is finished when DJP has issued it. So the middleware keeps each submission open until Coretax responds, then brings the outcome home.',
        'What comes back is written onto the original SAP document: the official number, the approval or rejection status with its message, and the issued PDF or QR code. Finance can answer “was this invoice’s faktur issued, and under what number?” from the invoice itself.',
      ],
    },
    {
      id: 'schedule-and-resend',
      heading: 'Scheduled by default, manual when it matters',
      body: [
        'Most documents should flow without anyone thinking about them, so the default path is a scheduled job that picks up what is new and changed and sends it on.',
        'Some moments cannot wait for the next run — a customer asking for their faktur today, or a rejection that has just been fixed. For those, the same pipeline can be triggered by hand to send or resend a single document, going through exactly the same validation and write-back as the scheduled path.',
      ],
    },
  ],

  gallery: [],
};
