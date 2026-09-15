import { caseStudies } from '@/data/caseStudies';
import { experiences } from '@/data/experiences';
import { yearsSince } from '@/lib/date';
import type { Stat } from '@/types/portfolio';

const CAREER_START = '2021-10';

const systemsHandled = experiences.reduce((total, item) => total + (item.systems ?? 0), 0);
const systemsFloor = systemsHandled >= 10 ? Math.floor(systemsHandled / 5) * 5 : systemsHandled;

export const stats: Stat[] = [
  {
    value: `${yearsSince(CAREER_START)}+`,
    label: 'Years in tech',
    detail: 'Since 2021, across product, consultancy, and enterprise teams.',
  },
  {
    value: String(caseStudies.length),
    label: 'Case studies',
    detail: 'Written end to end — the flow, the integrations, and the decisions behind each system.',
  },
  {
    value: `${systemsFloor}+`,
    label: 'Systems handled',
    detail: 'Warehouse platforms, e-invoicing, ERP and tax integrations, and field apps — more than the archive shows.',
  },
  {
    value: '4',
    label: 'Domains',
    detail: 'Web, mobile, system integration, and robotic process automation.',
  },
];
