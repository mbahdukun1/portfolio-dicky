export type JourneyLayerId = 'interface' | 'services' | 'data';

export interface JourneyLayer {
  id: JourneyLayerId;
  label: string;
  tech: string;
  skillGroup: string;
}

export interface JourneyStep {
  tech: string;
  text: string;
}

export interface JourneyScenario {
  id: string;
  label: string;
  project: string;
  actor: string;
  request: string;
  steps: Record<JourneyLayerId, JourneyStep>;
  response: string;
}

export const journeyLayers: JourneyLayer[] = [
  { id: 'interface', label: 'Interface', tech: 'React · React Native · Flutter', skillGroup: 'frontend' },
  { id: 'services', label: 'Services', tech: 'Node · NestJS · Express', skillGroup: 'backend' },
  { id: 'data', label: 'Data', tech: 'PostgreSQL · Redis · BullMQ', skillGroup: 'data' },
];

export const journeyPlatform = {
  label: 'Platform',
  tech: 'Docker · Linux · Git',
  skillGroup: 'platform',
};

export const journeyScenarios: JourneyScenario[] = [
  {
    id: 'receive',
    label: 'Receive goods',
    project: 'WMS',
    actor: 'A picker scans a delivery',
    request: 'POST /goods-receive',
    steps: {
      interface: { tech: 'React Native', text: 'Scanned quantities checked against the MRN' },
      services: { tech: 'NestJS', text: 'Receipt validated against the purchase order' },
      data: { tech: 'PostgreSQL · BullMQ', text: 'Stored, and a NetSuite job queued' },
    },
    response: '201 Created — receipt on the dock',
  },
  {
    id: 'sync',
    label: 'Sync NetSuite',
    project: 'WMS middleware',
    actor: 'A scheduled sync wakes up',
    request: 'POST /sync/materials',
    steps: {
      interface: { tech: 'React', text: 'Job id returned before the work starts' },
      services: { tech: 'NestJS · BullMQ', text: 'A worker pages through the Oracle Bridge API' },
      data: { tech: 'PostgreSQL · Redis', text: 'Upserted on the ERP doc id — safe to re-run' },
    },
    response: 'Job done — no duplicates written',
  },
  {
    id: 'faktur',
    label: 'Send faktur',
    project: 'SAP DJP',
    actor: 'Finance resends a fixed document',
    request: 'POST /coretax/faktur',
    steps: {
      interface: { tech: 'SAP Business One', text: 'Resend triggered from the SAP record' },
      services: { tech: 'Node.js', text: 'NPWP validated, document mapped for Coretax' },
      data: { tech: 'SAP Business One', text: 'Official number and PDF written back to SAP' },
    },
    response: 'Approved — faktur number issued',
  },
  {
    id: 'order',
    label: 'Order a cake',
    project: 'Juli Cake',
    actor: 'A customer checks out',
    request: 'GET /menu?active=true',
    steps: {
      interface: { tech: 'React Native Web', text: 'Earliest date set by the slowest item' },
      services: { tech: 'Supabase API', text: 'Request checked by row-level security' },
      data: { tech: 'PostgreSQL', text: 'Only active menu items come back' },
    },
    response: 'Order composed for WhatsApp',
  },
];
