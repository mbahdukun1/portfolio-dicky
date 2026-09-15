import { lazy, Suspense, useMemo, useRef, useState, type ReactNode } from 'react';

import { useNearViewport } from '@/hooks/useNearViewport';
import { canRenderScene } from '@/lib/webgl';
import type { Shot } from '@/types/portfolio';

import styles from './PhoneShowcase.module.css';

const PhoneScene = lazy(() =>
  import('./PhoneScene').then((module) => ({ default: module.PhoneScene })),
);

interface PhoneShowcaseProps {
  shots: Shot[];
  onOpen: (shot: Shot) => void;
  className?: string;
  children?: ReactNode;
}

export function PhoneShowcase({ shots, onOpen, className, children }: PhoneShowcaseProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [sceneSupported] = useState(canRenderScene);
  const enabled = sceneSupported && shots.length > 1;
  const near = useNearViewport(stageRef, enabled);
  const [index, setIndex] = useState(0);
  const sources = useMemo(() => shots.map((shot) => shot.src), [shots]);

  if (!enabled) return null;

  const shot = shots[index];
  const step = (by: number) => setIndex((current) => (current + by + shots.length) % shots.length);

  return (
    <section className={className}>
      {children}

      <div className={styles.showcase}>
        <div className={styles.stage} ref={stageRef}>
          {near ? (
            <Suspense fallback={null}>
              <PhoneScene sources={sources} index={index} />
            </Suspense>
          ) : null}
          <span className={styles.hint} aria-hidden="true">
            Drag to turn it over
          </span>
        </div>

        <div className={styles.details} aria-live="polite">
          <p className={styles.counter}>
            {String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
          </p>
          <h3 className={styles.title}>{shot?.title}</h3>
          <p className={styles.caption}>{shot?.caption}</p>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              onClick={() => step(-1)}
              aria-label="Previous screen"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => step(1)}
              aria-label="Next screen"
            >
              →
            </button>
            <button
              type="button"
              className={styles.open}
              onClick={() => {
                if (shot) onOpen(shot);
              }}
            >
              Open full size
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
