import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/e-invoice';

export const eInvoiceCase: CaseStudy = {
  slug: 'e-invoice',
  title: 'E-Invoice Platform',
  context: 'BEONE SOLUTION',
  period: '2023 — 2025',
  role: 'Backend & mobile engineer',
  platform: 'Android app + web console',
  lede: 'Billing that starts on a phone: issue an invoice, watch it turn into a virtual account, and get it requested, approved, and settled without a single email thread.',

  overview: [
    'E-Invoice is an electronic invoicing product for companies that already run their books in SAP. Before it existed, an invoice travelled as a PDF attachment: finance emailed it, a manager approved it in a chat thread, someone typed the payment into the bank, and someone else re-keyed the whole thing back into the accounting system. Nothing about that chain could be audited, and nobody could answer “where is this invoice right now?” without asking three people.',
    'The product replaces that chain with one shared record. A supplier raises an A/P invoice in the app and the platform issues a virtual account number for it. Finance groups invoices into a payment request, an approver signs it off from their phone, and settlement closes the loop — every state change written once and visible to everyone who needs it.',
    'It is mobile-first because the people who slow invoices down are rarely at a desk. Approvers get the same screen on the train that they would get in the office; the finance team keeps a wider web console for the bulk work.',
  ],

  flow: [
    {
      title: 'Register the company',
      detail:
        'A new tenant signs up with company details and a user, then attaches a bank account. The account number is checked against the bank before the tenant can transact — no unverified account ever reaches a payment.',
    },
    {
      title: 'Sign in, or come in through SAP',
      detail:
        'Users log in with platform credentials, or point the app at their own SAP instance — API server, company, SAP user — so the app reads and writes against the books the business already keeps.',
    },
    {
      title: 'Watch the dashboard',
      detail:
        'One screen per tenant: paid amount on the A/P side, pending and approved counts on the A/R side, and the live queues of approvals and requests waiting on someone.',
    },
    {
      title: 'Raise an A/P invoice',
      detail:
        'Creating an invoice mints a virtual account number for it. From there the invoice carries a status the whole company can read: pending, approved, rejected, paid.',
    },
    {
      title: 'Batch a payment request',
      detail:
        'Finance selects invoices per business partner and bank account, and the app totals the selection as it goes. Three invoices, one request, one number to approve.',
    },
    {
      title: 'Approve it',
      detail:
        'The approver sees the total and the partners behind it before committing, and the decision is recorded against the request rather than lost in a chat log.',
    },
    {
      title: 'Settle',
      detail:
        'Settlement works on virtual accounts: merge several into a single payment, or split one across the invoices it covers, then post the result back.',
    },
    {
      title: 'Reconcile from the web console',
      detail:
        'The desk view carries the full invoice table with status filters and search by invoice ID, plus tenant management, product licences, and coupon master data.',
    },
  ],

  chapters: [
    {
      id: 'onboarding',
      heading: 'Getting a company on the platform',
      body: [
        'Onboarding is two steps on purpose. The first collects the human and the company. The second collects the bank account — and refuses to move on until the account number comes back valid, because an invoicing platform that lets you type a wrong account is a platform that will eventually pay the wrong person.',
        'The form says as much in plain language: filling in the account is mandatory for the app’s core function. It is the one place where a bit of friction pays for itself.',
      ],
      shots: ['splash', 'register-user', 'register-bank'],
    },
    {
      id: 'auth',
      heading: 'Two doors in',
      body: [
        'Most users sign in with a platform account. Companies that keep everything in SAP take the second door: a settings screen for the API server, the SAP company, and SAP credentials, so the app talks directly to their instance instead of asking them to maintain a second set of master data.',
        'That choice shaped the backend. Every service had to treat “which tenant, against which SAP company” as a first-class part of a request rather than a global setting.',
      ],
      shots: ['login', 'login-sap'],
    },
    {
      id: 'dashboard',
      heading: 'One screen that answers the money question',
      body: [
        'The dashboard is built around the two questions finance actually asks each morning: what have we paid, and what is waiting on us. A period selector scopes both. Under it, A/P shows the paid amount, A/R shows how many documents are pending versus approved, and the approval and request queues list real partners and real numbers rather than a count.',
        'Everything on it is a shortcut. Tapping a queue drops you straight into the document that needs a decision.',
      ],
      shots: ['dashboard', 'ap-invoice'],
    },
    {
      id: 'payments',
      heading: 'Request, approve, settle',
      body: [
        'A payment request starts from the invoice list, not from a blank form. You pick a business partner, pick the bank account, tick the invoices, and the running total updates as you go — three invoices selected, nine million rupiah, one request.',
        'Approval is deliberately the smallest screen in the app. A total, the partners behind it, and a decision. Anything longer and approvers go back to approving over chat.',
        'Settlement is where the virtual accounts earn their keep. Several accounts can be merged into one payment when a partner pays in a lump sum, or a single account split across the invoices it covers when they do not — and the platform keeps the mapping so reconciliation is not a guess.',
      ],
      shots: ['payment-request', 'payment-approval', 'payment-settlement'],
    },
    {
      id: 'console',
      heading: 'The desk view',
      body: [
        'The phone is for decisions; the web console is for volume. It carries the full invoice table with due dates, invoice and reference numbers, amounts and statuses, filtered by status and searchable by invoice ID, paginated for the days when there are hundreds.',
        'Beyond payments it holds the operational side of a multi-tenant product: tenant management, product licences, and coupon master data.',
      ],
      shots: ['web-console'],
    },
    {
      id: 'engineering',
      heading: 'Under the hood',
      body: [
        'The platform is built as microservices so invoicing, payment, and the SAP integration can be scaled and deployed independently — billing traffic is spiky, and a month-end rush should not take the whole product down with it.',
        'A payment gateway handles the money movement itself, which kept card and bank credentials out of our services entirely. I optimised the backend for real-time processing and high availability, then ran performance testing under concurrency and tuned the components that showed up first.',
      ],
    },
  ],

  gallery: [
    {
      id: 'splash',
      src: `${base}/splash.png`,
      title: 'Onboarding',
      caption: 'The promise the product is built on — payment that takes a finger, not a week.',
    },
    {
      id: 'login',
      src: `${base}/login.png`,
      title: 'Sign in',
      caption: 'Platform credentials, remember-me, password recovery, and a link through to SAP login.',
    },
    {
      id: 'login-sap',
      src: `${base}/login-sap.png`,
      title: 'Sign in through SAP',
      caption: 'API server, SAP company, and SAP user — the app connects to the books the company already keeps.',
    },
    {
      id: 'register-user',
      src: `${base}/register-user.png`,
      title: 'Registration — company & user',
      caption: 'Name, email, company, phone, password. Step one of onboarding a new tenant.',
    },
    {
      id: 'register-bank',
      src: `${base}/register-bank.png`,
      title: 'Registration — bank account',
      caption: 'The account number is validated against the bank before registration completes.',
    },
    {
      id: 'dashboard',
      src: `${base}/dashboard.png`,
      title: 'Dashboard',
      caption: 'Period selector, A/P paid amount, A/R pending vs approved, and the live approval and request queues.',
    },
    {
      id: 'ap-invoice',
      src: `${base}/ap-invoice.png`,
      title: 'A/P invoice list',
      caption: 'Every invoice with its amount, virtual account number, and status: pending, rejected, approved, paid.',
    },
    {
      id: 'payment-request',
      src: `${base}/payment-request.png`,
      title: 'Payment request',
      caption: 'Invoices grouped by partner and bank account, with the selected total running at the bottom.',
    },
    {
      id: 'payment-approval',
      src: `${base}/payment-approval.png`,
      title: 'Approval confirmed',
      caption: 'The approved total and the partners behind it, with a link into the detail.',
    },
    {
      id: 'payment-settlement',
      src: `${base}/payment-settlement.png`,
      title: 'Payment settlement',
      caption: 'Virtual accounts selected for settlement, ready to merge into one payment or split across invoices.',
    },
    {
      id: 'web-console',
      src: `${base}/web-console.png`,
      title: 'Web console',
      caption: 'The finance desk view: full A/P table with status filter, invoice search, and the disbursement modules.',
      shape: 'wide',
    },
  ],

  outcomes: [
    'Invoice status moved from an email thread to a single record every party reads the same way.',
    'Approvals happen on a phone, so the approver is no longer the bottleneck.',
    'Virtual accounts made settlement reconcilable — merged or split, the mapping survives.',
  ],
};
