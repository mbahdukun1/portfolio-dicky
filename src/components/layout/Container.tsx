import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Container.module.css';

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Container({ as: Tag = 'div', children, className }: ContainerProps) {
  return <Tag className={cn(styles.container, className)}>{children}</Tag>;
}
