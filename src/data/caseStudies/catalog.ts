import catalog from 'virtual:case-study-catalog';

export interface CaseStudyEntry {
  slug: string;
  title: string;
  screens: number;
}

export const caseStudyCatalog: CaseStudyEntry[] = catalog;

const bySlug = new Map(caseStudyCatalog.map((entry) => [entry.slug, entry]));

export function findCaseStudyEntry(slug: string): CaseStudyEntry | undefined {
  return bySlug.get(slug);
}

export function hasCaseStudy(slug: string): boolean {
  return bySlug.has(slug);
}

export const documentedScreens = caseStudyCatalog.reduce((total, entry) => total + entry.screens, 0);
