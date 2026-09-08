export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'skills'
  | 'work'
  | 'education'
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: IconName;
}

export type IconName =
  | 'mail'
  | 'linkedin'
  | 'github'
  | 'globe'
  | 'pin'
  | 'arrow-up-right'
  | 'arrow-down'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'code'
  | 'server'
  | 'database'
  | 'cloud';

export interface Profile {
  name: string;
  headline: string;
  role: string;
  location: string;
  email: string;
  tagline: string;
  about: string[];
  avatar: string;
  avatarAlt: string;
  resume: string;
  socials: SocialLink[];
}

export type SectionPattern = 'beam' | 'stripes' | 'rules' | 'dots' | 'rings' | 'glow';

export type ExperienceTrack = 'software' | 'earlier';

export interface Experience {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string | null;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Internship' | 'Part-time';
  track: ExperienceTrack;
  summary: string;
  achievements: string[];
  stack: string[];
  /** Short label for this chapter of the journey page, e.g. 'The architecture chair'. */
  chapter?: string;
  /** Long-form narrative shown on /experience. One string per paragraph. */
  story?: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  items: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  context: string;
  period: string;
  description: string;
  contributions: string[];
  stack: string[];
  href?: string;
  repo?: string;
  image?: string;
  images?: string[];
  /** The single hero project on the home page. */
  featured?: boolean;
  /** Shown alongside the featured project on the home page; the rest live on /projects. */
  highlight?: boolean;
  draft?: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  start: string;
  end: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
}
