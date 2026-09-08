export interface StackLayer {
  id: string;
  label: string;
  tech: string;
}

export const stackLayers: StackLayer[] = [
  { id: 'interface', label: 'Interface', tech: 'React · React Native · Vue' },
  { id: 'services', label: 'Services', tech: 'Node · NestJS · .NET' },
  { id: 'data', label: 'Data', tech: 'PostgreSQL · Sequelize' },
  { id: 'platform', label: 'Platform', tech: 'Dev · Staging · Production' },
];
