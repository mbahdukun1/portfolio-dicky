import type { MouseEventHandler, ReactNode } from 'react';

import { Link } from '@/components/ui/Link';
import { cn } from '@/lib/cn';

import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'sm';
  className?: string;
  /** Internal route handled by the client router, e.g. '/projects' or '/#work'. */
  to?: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  external = false,
  download = false,
  onClick,
  ariaLabel,
  leading,
  trailing,
}: ButtonProps) {
  const classes = cn(styles.button, styles[variant], styles[size], className);

  const content = (
    <>
      {leading ? <span className={styles.affix}>{leading}</span> : null}
      <span className={styles.label}>{children}</span>
      {trailing ? <span className={styles.affix}>{trailing}</span> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} ariaLabel={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...(download ? { download: '' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
