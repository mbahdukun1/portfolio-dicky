import type { NavItem, SectionId } from '@/types/portfolio';

export const navigation: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export interface PageLink {
  to: string;
  label: string;
  description: string;
}

/** Standalone pages that continue a home section. */
export const pageLinks: PageLink[] = [
  {
    to: '/projects',
    label: 'All projects',
    description: 'The full archive, filterable by technology',
  },
  {
    to: '/experience',
    label: 'The journey',
    description: 'Every role in order, written out long-form',
  },
];

/** Which home section a standalone page belongs to, for nav highlighting. */
export const PAGE_FOR_SECTION: Record<string, SectionId> = {
  '/projects': 'work',
  '/experience': 'experience',
};
