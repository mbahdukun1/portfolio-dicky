import { deliveredWork } from '@/data/work';
import type { WorkItem } from '@/types/portfolio';

const ALIASES: Record<string, string[]> = {
  'flutter (desktop)': ['flutter'],
  'express.js': ['express'],
  'rest api design': ['rest api'],
  'background jobs & queues': ['bullmq'],
  'payment gateway integration': ['payment gateway'],
  'sap business one': ['sap', 'sap business one'],
  'sap ↔ coretax via pajak express': ['coretax', 'pajak express'],
  'responsive ui': ['responsive'],
};

const normalise = (value: string) => value.trim().toLowerCase();

export function projectsUsing(skill: string): WorkItem[] {
  const key = normalise(skill);
  const tags = ALIASES[key] ?? [key];
  return deliveredWork.filter((item) => item.stack.some((tech) => tags.includes(normalise(tech))));
}

export function shortTitle(item: WorkItem): string {
  return item.title.split(' - ')[0] ?? item.title;
}
