import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import type { Shot } from '@/types/portfolio';

import styles from './ShotFrame.module.css';

interface ShotFrameProps {
  shot: Shot;
  onOpen: () => void;
  /** Captions are useful in the gallery and noisy inline in an article. */
  showCaption?: boolean;
  className?: string;
}

/** A screenshot thumbnail that opens the lightbox. */
export function ShotFrame({ shot, onOpen, showCaption = true, className }: ShotFrameProps) {
  const isWide = shot.shape === 'wide';

  return (
    <figure className={cn(styles.figure, className)}>
      <button
        type="button"
        className={cn(styles.frame, isWide && styles.frameWide)}
        onClick={onOpen}
        aria-label={`Open ${shot.title} full size`}
      >
        <img className={styles.image} src={shot.src} alt={shot.title} loading="lazy" decoding="async" />

        <span className={styles.veil} aria-hidden="true">
          <span className={styles.zoom}>
            <Icon name="expand" size={17} />
          </span>
        </span>
      </button>

      <figcaption className={styles.meta}>
        <span className={styles.title}>{shot.title}</span>
        {showCaption ? <span className={styles.caption}>{shot.caption}</span> : null}
      </figcaption>
    </figure>
  );
}
