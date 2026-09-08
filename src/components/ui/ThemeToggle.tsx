import { useTheme } from '@/hooks/useTheme';

import { Icon } from './Icon';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span className={styles.icons} data-theme-state={theme}>
        <Icon name="sun" size={17} />
        <Icon name="moon" size={17} />
      </span>
    </button>
  );
}
