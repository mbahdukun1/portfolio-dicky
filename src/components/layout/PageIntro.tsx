import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';

import styles from './PageIntro.module.css';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  lede: string;
  backTo?: string;
  backLabel?: string;
  meta?: { value: string; label: string }[];
  children?: ReactNode;
}

export function PageIntro({
  eyebrow,
  title,
  lede,
  backTo = '/',
  backLabel = 'Back to home',
  meta,
  children,
}: PageIntroProps) {
  return (
    <header className={styles.intro}>
      <span className={styles.pattern} aria-hidden="true" />

      <Container className={styles.body}>
        <Link to={backTo} className={styles.back}>
          <Icon name="arrow-up-right" size={14} className={styles.backIcon} />
          {backLabel}
        </Link>

        <p className={styles.eyebrow}>
          <span className={styles.rule} aria-hidden="true" />
          {eyebrow}
        </p>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{lede}</p>

        {meta && meta.length > 0 ? (
          <dl className={styles.meta}>
            {meta.map((entry) => (
              <div key={entry.label}>
                <dt>{entry.label}</dt>
                <dd>{entry.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children}
      </Container>
    </header>
  );
}
