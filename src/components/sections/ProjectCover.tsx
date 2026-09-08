import { useMemo, useState, type CSSProperties } from 'react';

import { cn } from '@/lib/cn';
import type { WorkItem } from '@/types/portfolio';

import styles from './ProjectCover.module.css';

const VARIANTS = 5;

/** The stack offsets each layer, so a third one climbs out of the cover box. */
const MAX_LAYERS = 2;

function variantOf(id: string): number {
  let sum = 0;
  for (let index = 0; index < id.length; index += 1) sum += id.charCodeAt(index);
  return sum % VARIANTS;
}

function markOf(title: string): string {
  return title
    .split(' ')
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

interface ProjectCoverProps {
  item: WorkItem;
  className?: string;
}

export function ProjectCover({ item, className }: ProjectCoverProps) {
  const sources = useMemo(() => {
    const list = item.images ?? (item.image ? [item.image] : []);
    return list.filter(Boolean).slice(0, MAX_LAYERS);
  }, [item.image, item.images]);

  const [order, setOrder] = useState(() => sources.map((_, index) => index));
  const [broken, setBroken] = useState<number[]>([]);

  const visible = order.filter((index) => !broken.includes(index));

  const bringToFront = (index: number) => {
    setOrder((current) => [index, ...current.filter((item2) => item2 !== index)]);
  };

  const cycle = () => {
    setOrder((current) =>
      current.length < 2 ? current : [...current.slice(1), current[0] as number],
    );
  };

  if (visible.length > 0) {
    return (
      <div
        className={cn(
          styles.cover,
          visible.length > 1 && styles.stack,
          visible.length > 1 && item.coverShape === 'phone' && styles.phones,
          className,
        )}
        data-layers={visible.length}
      >
        {visible.map((sourceIndex, position) => {
          const isFront = position === 0;
          const style = { '--layer': position } as CSSProperties;

          return (
            <button
              key={sources[sourceIndex]}
              type="button"
              className={cn(styles.layer, isFront && styles.front)}
              style={style}
              onClick={() => (isFront ? cycle() : bringToFront(sourceIndex))}
              aria-label={
                isFront
                  ? `Next screenshot of ${item.title}`
                  : `Bring screenshot ${sourceIndex + 1} of ${item.title} to the front`
              }
              tabIndex={visible.length > 1 ? 0 : -1}
            >
              <img
                className={styles.image}
                src={sources[sourceIndex]}
                alt={isFront ? `${item.title} screenshot` : ''}
                loading={item.featured ? 'eager' : 'lazy'}
                decoding="async"
                onError={() => setBroken((current) => [...current, sourceIndex])}
              />
            </button>
          );
        })}
      </div>
    );
  }

  const style = { '--variant': variantOf(item.id) } as CSSProperties;

  return (
    <div className={cn(styles.cover, styles.generated, className)} style={style}>
      <span className={styles.grid} aria-hidden="true" />
      <span className={styles.mark} aria-hidden="true">
        {markOf(item.title)}
      </span>
      <span className={styles.tag} aria-hidden="true">
        {item.stack[0]}
      </span>
    </div>
  );
}
