import type { CaseStudy } from '@/types/portfolio';

import { anniversaryCase } from './anniversary';
import { barcodeSystemCase } from './barcodeSystem';
import { eInvoiceCase } from './eInvoice';
import { mamapaCase } from './mamapa';
import { ondaGtCase } from './ondaGt';
import { sapDjpCase } from './sapDjp';
import { wmsCase } from './wms';
import { wmsMobileCase } from './wmsMobile';
import { workOrderCase } from './workOrder';

export const caseStudies: CaseStudy[] = [
  wmsCase,
  wmsMobileCase,
  ondaGtCase,
  workOrderCase,
  eInvoiceCase,
  barcodeSystemCase,
  sapDjpCase,
  mamapaCase,
  anniversaryCase,
];

const bySlug = new Map(caseStudies.map((study) => [study.slug, study]));

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return bySlug.get(slug);
}

export function hasCaseStudy(slug: string): boolean {
  return bySlug.has(slug);
}
