import type { Profile } from '@/types/portfolio';

export const profile: Profile = {
  name: 'Dicky Maulana',
  headline: 'Software Engineer · Full Stack Developer',
  role: 'Full Stack Developer at Motor Sights International',
  location: 'Jakarta, Indonesia',
  email: 'dicmaulana09@gmail.com',
  tagline:
    'I design and build end-to-end systems — from the interface people touch to the services, databases, and integrations behind them.',
  about: [
    'I am a software engineer based in Jakarta with four years of professional experience across product teams, consultancies, and enterprise delivery. My work sits on both sides of the stack: interfaces built with React, React Native, and TypeScript, and the Node.js and NestJS services — with PostgreSQL, Redis, and BullMQ behind them — that keep those interfaces fed.',
    'Most of what I build has to agree with a system I do not control. Warehouse operations across ~40 sites, kept in step with Oracle NetSuite by a middleware I built; handheld apps that post into SAP Business One from the floor and keep working on a local database when the signal does not; automated tax reporting between SAP and DJP; a microservices e-invoicing platform with a payment gateway behind it. Different ERPs, one lesson — the integration boundary is where the expensive mistakes live, so it is the part I design first.',
    'Today I focus on architecting applications before they are written: leading requirement analysis, writing technical design documents with the system analyst team, and running semi-DevOps deployments across development, staging, and production. I like being the person who connects the plan, the code, and the server it eventually runs on.',
  ],
  avatar: '/portrait.jpg',
  avatarAlt: 'Portrait of Dicky Maulana',
  resume: '/Dicky-Maulana-CV.pdf',
  socials: [
    {
      label: 'Email',
      href: 'mailto:dicmaulana09@gmail.com',
      handle: 'dicmaulana09@gmail.com',
      icon: 'mail',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dicky-maulana-40604113a',
      handle: '/in/dicky-maulana',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/mbahdukun1',
      handle: '@mbahdukun1',
      icon: 'github',
    },
  ],
};
