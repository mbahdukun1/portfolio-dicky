import type { CSSProperties, ReactNode } from 'react';

import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/cn';

import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tilt?: boolean;
  revealDelay?: number;
}

export function Card({
  children,
  className,
  interactive = false,
  tilt = false,
  revealDelay,
}: CardProps) {
  const ref = useTilt<HTMLDivElement>(tilt);

  const style = revealDelay
    ? ({ '--reveal-delay': `${revealDelay}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        styles.card,
        interactive && styles.interactive,
        tilt && styles.tilt,
        className,
      )}
      data-reveal=""
      style={style}
    >
      {tilt ? <span className={styles.sheen} aria-hidden="true" /> : null}
      {children}
    </div>
  );
}
