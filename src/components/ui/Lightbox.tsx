import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import type { Shot } from '@/types/portfolio';

import styles from './Lightbox.module.css';

interface LightboxProps {
  shots: Shot[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen screenshot viewer. Wraps around at both ends so arrow keys never
 * dead-end, and traps nothing beyond the close/prev/next controls it renders —
 * the page underneath is inert while it is open.
 */
export function Lightbox({ shots, index, onClose, onNavigate }: LightboxProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const shot = shots[index];
  const total = shots.length;

  const step = useCallback(
    (delta: number) => onNavigate((index + delta + total) % total),
    [index, onNavigate, total],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
      else return;

      event.preventDefault();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, step]);

  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;

    body.dataset.scrollLocked = 'true';
    if (gap > 0) body.style.setProperty('--scroll-lock-gap', `${gap}px`);

    return () => {
      delete body.dataset.scrollLocked;
      body.style.removeProperty('--scroll-lock-gap');
    };
  }, []);

  useEffect(() => {
    dialog.current?.focus();
  }, []);

  if (!shot) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.title} — screenshot ${index + 1} of ${total}`}
      tabIndex={-1}
      ref={dialog}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <header className={styles.bar}>
        <p className={styles.counter}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>

        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} />
        </button>
      </header>

      <div className={styles.stage}>
        {total > 1 ? (
          <button
            type="button"
            className={cn(styles.nav, styles.prev)}
            onClick={() => step(-1)}
            aria-label="Previous screenshot"
          >
            <Icon name="chevron-down" size={22} />
          </button>
        ) : null}

        <figure className={styles.figure}>
          <img
            key={shot.src}
            className={cn(styles.image, shot.shape === 'wide' && styles.wide)}
            src={shot.src}
            alt={shot.title}
          />

          <figcaption className={styles.caption}>
            <span className={styles.captionTitle}>{shot.title}</span>
            <span className={styles.captionText}>{shot.caption}</span>
          </figcaption>
        </figure>

        {total > 1 ? (
          <button
            type="button"
            className={cn(styles.nav, styles.next)}
            onClick={() => step(1)}
            aria-label="Next screenshot"
          >
            <Icon name="chevron-down" size={22} />
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
