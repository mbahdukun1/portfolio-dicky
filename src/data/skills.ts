import type { SkillGroup } from '@/types/portfolio';

export const topSkills: string[] = ['MEAN Stack', 'NestJS', '.NET Framework'];

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'code',
    description:
      'Interactive, responsive interfaces with an eye on usability and accessibility.',
    items: [
      'React',
      'React Native',
      'Vue.js',
      'TypeScript',
      'JavaScript (ES2022+)',
      'HTML5',
      'CSS3',
      'Responsive UI',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    description:
      'Secure, scalable services and APIs — from a single Express app to a microservices estate.',
    items: [
      'Node.js',
      'Express.js',
      'NestJS',
      '.NET Framework',
      'C#',
      'REST API design',
      'Microservices',
      'Payment gateway integration',
    ],
  },
  {
    id: 'data',
    title: 'Data & Integration',
    icon: 'database',
    description:
      'Modelling, optimisation, and moving data reliably between systems that were never designed to talk.',
    items: [
      'PostgreSQL',
      'Sequelize ORM',
      'MongoDB',
      'Database modelling',
      'Query optimisation',
      'SAP ↔ DJP integration',
      'Data synchronisation',
    ],
  },
  {
    id: 'platform',
    title: 'Platform & Practice',
    icon: 'cloud',
    description:
      'How the work gets planned, shipped, and kept alive once it is in production.',
    items: [
      'Git & GitHub',
      'Semi-DevOps deployment',
      'Server maintenance',
      'Dev / Staging / Production workflow',
      'Technical Design Documents',
      'Requirement analysis',
      'Performance testing',
      'RPA (Automation Anywhere)',
    ],
  },
];
