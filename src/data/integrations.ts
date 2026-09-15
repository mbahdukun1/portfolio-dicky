export type IntegrationDirection = 'in' | 'out' | 'both';

export interface IntegrationNode {
  id: string;
  label: string;
  detail: string;
  direction: IntegrationDirection;
  via?: string;
}

export interface IntegrationMap {
  core: string;
  coreDetail: string;
  nodes: IntegrationNode[];
}

export const integrations: Record<string, IntegrationMap | undefined> = {
  wms: {
    core: 'NestJS middleware',
    coreDetail: 'Direct sync + queued retries',
    nodes: [
      { id: 'console', label: 'WMS console', detail: 'Inbound, outbound, bins', direction: 'in' },
      { id: 'netsuite', label: 'Oracle NetSuite', detail: 'System of record', direction: 'both' },
      { id: 'queue', label: 'BullMQ · Redis', detail: 'Retryable sync jobs', direction: 'both' },
      { id: 'postgres', label: 'PostgreSQL', detail: 'Upsert on ERP doc id', direction: 'out' },
      { id: 'sites', label: '~40 warehouses', detail: 'Per-site roles', direction: 'in' },
    ],
  },
  'onda-gt': {
    core: 'Goods Tracker API',
    coreDetail: 'Validates before it posts',
    nodes: [
      { id: 'handheld', label: 'Handheld scanner', detail: 'Four scanning flows', direction: 'in' },
      { id: 'sap', label: 'SAP Business One', detail: 'Receipts, transfers, deliveries', direction: 'out' },
      { id: 'racks', label: 'Rack locks', detail: 'Parallel stock opname', direction: 'both' },
    ],
  },
  'barcode-system': {
    core: 'Ruby Barcode System',
    coreDetail: 'Flutter desktop workstation',
    nodes: [
      { id: 'excel', label: 'Excel files', detail: 'Full or selection import', direction: 'in' },
      { id: 'sap', label: 'SAP Business One', detail: 'Items and price lists', direction: 'in' },
      { id: 'store', label: 'Local JSON', detail: 'Table and selection saved', direction: 'both' },
      { id: 'printer', label: 'Label printer', detail: 'Preset, size, orientation', direction: 'out' },
    ],
  },
  'sap-djp': {
    core: 'Node.js middleware',
    coreDetail: 'Scheduled sync + manual resend',
    nodes: [
      {
        id: 'sap',
        label: 'SAP Business One',
        detail: 'Documents out, numbers and PDFs back',
        direction: 'both',
      },
      { id: 'pajak-express', label: 'Pajak Express', detail: 'Gateway to Coretax', direction: 'both' },
      {
        id: 'djp',
        label: 'DJP Coretax',
        detail: 'Faktur, bukti potong, SPT',
        direction: 'both',
        via: 'pajak-express',
      },
    ],
  },
  'e-invoice': {
    core: 'Invoice services',
    coreDetail: 'Microservices, one shared record',
    nodes: [
      { id: 'app', label: 'Mobile app', detail: 'Raise, request, approve', direction: 'both' },
      { id: 'console', label: 'Web console', detail: 'Bulk finance work', direction: 'both' },
      { id: 'gateway', label: 'Payment gateway', detail: 'Virtual accounts', direction: 'both' },
      { id: 'bank', label: 'Bank check', detail: 'Account verification', direction: 'out' },
      { id: 'sap', label: 'Tenant SAP', detail: 'The books it already keeps', direction: 'both' },
    ],
  },
};
