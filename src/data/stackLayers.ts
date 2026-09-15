export interface StackLayer {
  id: string;
  label: string;
  tech: string;
  skillGroup: string;
}

export const stackLayers: StackLayer[] = [
  {
    id: 'interface',
    label: 'Interface',
    tech: 'React · React Native · Flutter',
    skillGroup: 'frontend',
  },
  {
    id: 'services',
    label: 'Services',
    tech: 'Node · NestJS · Express',
    skillGroup: 'backend',
  },
  {
    id: 'data',
    label: 'Data',
    tech: 'PostgreSQL · Redis · BullMQ',
    skillGroup: 'data',
  },
  {
    id: 'platform',
    label: 'Platform',
    tech: 'Docker · Linux · Git',
    skillGroup: 'platform',
  },
];
