import { experiences } from '@/data/experiences';
import { deliveredWork } from '@/data/work';
import { monthsBetween, yearsSince } from '@/lib/date';
import type { Stat } from '@/types/portfolio';

const CAREER_START = '2021-10';

const softwareRoles = experiences.filter((item) => item.track === 'software');

const longestTenure = softwareRoles.reduce(
  (longest, item) => Math.max(longest, monthsBetween(item.start, item.end)),
  0,
);

export const stats: Stat[] = [
  {
    value: `${yearsSince(CAREER_START)}+`,
    label: 'Years in tech',
    detail: 'Since 2021, across product, consultancy, and enterprise teams.',
  },
  {
    value: `${Math.round(longestTenure / 12)} yrs`,
    label: 'Longest tenure',
    detail: 'Two years on one microservices platform, from build to production.',
  },
  {
    value: String(deliveredWork.length),
    label: 'Systems delivered',
    detail: 'Warehouse platforms, e-invoicing, ERP integration, and mobile field apps.',
  },
  {
    value: '4',
    label: 'Domains',
    detail: 'Web, mobile, system integration, and robotic process automation.',
  },
];
