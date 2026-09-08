import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <Container className={styles.body}>
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
      </Container>
    </section>
  );
}
