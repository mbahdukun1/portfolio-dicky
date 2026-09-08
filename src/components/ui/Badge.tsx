import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Badge.module.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: 'outline' | 'accent' | 'solid';
}

export function Badge({ children, tone = 'outline', className, ...rest }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone], className)} {...rest}>
      {children}
    </span>
  );
}
