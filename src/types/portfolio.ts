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
  | 'expand'
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
  /**
   * How the cover images are framed. 'phone' stands portrait screenshots up side by
   * side; the default lays landscape ones out as an offset stack.
   */
  coverShape?: 'phone' | 'wide';
  /** The single hero project on the home page. */
  featured?: boolean;
  /** Listed with its cover, but the write-up is not ready yet. */
  comingSoon?: boolean;
  draft?: boolean;
}

/** One screenshot in a case study, referenced from a chapter by `id`. */
export interface Shot {
  id: string;
  src: string;
  title: string;
  caption: string;
  /** Frame proportions: a phone screen, or a wide console/diagram. */
  shape?: 'phone' | 'wide';
}

/** One step of the end-to-end walkthrough. */
export interface FlowStep {
  title: string;
  detail: string;
}

export interface CaseChapter {
  id: string;
  heading: string;
  body: string[];
  /** Ids of the shots illustrating this chapter. */
  shots?: string[];
}

/** The long-form article behind a project, rendered at /projects/<slug>. */
export interface CaseStudy {
  /** Matches the `WorkItem.id` it belongs to and the URL segment. */
  slug: string;
  title: string;
  context: string;
  period: string;
  lede: string;
  role: string;
  platform: string;
  /** Opening paragraphs: what the product is and who it is for. */
  overview: string[];
  flow: FlowStep[];
  chapters: CaseChapter[];
  gallery: Shot[];
  outcomes?: string[];
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
