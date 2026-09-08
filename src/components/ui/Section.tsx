import { useRef, type ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { usePointerGlow } from '@/hooks/usePointerGlow';
import { cn } from '@/lib/cn';
import type { SectionPattern } from '@/types/portfolio';

import styles from './Section.module.css';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'sunken';
  pattern?: SectionPattern;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  tone = 'default',
  pattern = 'beam',
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = `${id}-heading`;

  usePointerGlow(sectionRef);

  return (
    <section
      id={id}
      ref={sectionRef}
      aria-labelledby={headingId}
      className={cn(styles.section, tone === 'sunken' && styles.sunken, className)}
    >
      <span className={cn(styles.pattern, styles[pattern])} aria-hidden="true" />
      <span className={styles.spotlight} aria-hidden="true" />

      <Container className={styles.body}>
        <header className={styles.header} data-reveal="">
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            {eyebrow}
          </p>

          <h2 className={styles.title} id={headingId}>
            {title}
          </h2>

          {description ? <p className={styles.description}>{description}</p> : null}
        </header>

        {children}
      </Container>
    </section>
  );
}
