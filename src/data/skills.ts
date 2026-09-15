import type { SkillGroup } from '@/types/portfolio';

export const topSkills: string[] = ['Full Stack', 'TypeScript', 'React', 'Node.js'];

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend & Mobile',
    icon: 'code',
    description:
      'Interfaces for web, mobile, and desktop — built for the people using them, at a desk or on a warehouse floor.',
    items: [
      'React',
      'React Native',
      'Flutter (desktop)',
      'Next.js',
      'Vite',
      'TypeScript',
      'JavaScript (ES2022+)',
      'Tailwind CSS',
      'HTML5 & CSS3',
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
      'NestJS',
      'Express.js',
      'Fastify',
      'REST API design',
      'Microservices',
      'Background jobs & queues',
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
      'SQLite',
      'Redis',
      'BullMQ',
      'Prisma ORM',
      'Sequelize ORM',
      'TypeORM',
      'Database modelling',
      'Query optimisation',
      'Oracle NetSuite',
      'SAP Business One',
      'SAP ↔ Coretax via Pajak Express',
      'Middleware design',
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
      'Git, GitHub & Bitbucket',
      'Docker & Linux servers',
      'Semi-DevOps deployment',
      'Dev / Staging / Production workflow',
      'Technical Design Documents',
      'Requirement analysis',
      'Performance testing',
      'RPA (Automation Anywhere)',
      'Postman & Insomnia',
      'DBeaver',
    ],
  },
];
