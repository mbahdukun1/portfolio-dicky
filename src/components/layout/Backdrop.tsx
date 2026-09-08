import styles from './Backdrop.module.css';

export function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.horizon} />
      <div className={styles.auraA} />
      <div className={styles.auraB} />
      <div className={styles.grid} />
      <div className={styles.grain} />
    </div>
  );
}
