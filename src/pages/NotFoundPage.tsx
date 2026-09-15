import { Container } from '@/components/layout/Container';
import { StackVisual } from '@/components/sections/StackVisual';
import { Button } from '@/components/ui/Button';
import { stackLayers, type StackLayer } from '@/data/stackLayers';

import styles from './NotFoundPage.module.css';

const MISSING_INDEX = 2;

const lostStack: StackLayer[] = stackLayers.map((layer, index) =>
  index === MISSING_INDEX
    ? { id: 'missing', label: '404', tech: 'This layer is not here', skillGroup: '' }
    : layer,
);

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <Container className={styles.layout}>
        <StackVisual
          layers={lostStack}
          missingIndex={MISSING_INDEX}
          interactive={false}
          className={styles.visual}
        />

        <div className={styles.body}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page does not exist</h1>
        <p className={styles.lede}>
          The link may be out of date, or the page moved. Everything else is still where
          you left it.
        </p>

        <div className={styles.actions}>
          <Button to="/">Back to home</Button>
          <Button to="/projects" variant="secondary">
            Browse projects
          </Button>
        </div>
        </div>
      </Container>
    </section>
  );
}
