import { useScrollProgress } from '@/hooks/useScrollProgress';

import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
