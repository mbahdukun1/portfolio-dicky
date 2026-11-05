import { useEffect, useMemo, useRef, type CSSProperties } from 'react';

import { navigation } from '@/data/navigation';
import { useRouter } from '@/hooks/useRouter';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { prefersReducedMotion } from '@/lib/motion';

import styles from './Backdrop.module.css';

const AMBIENT: Record<string, [string, string]> = {
  home: ['#2dd4bf', '#3884ff'],
  about: ['#2dd4bf', '#f5b454'],
  work: ['#3884ff', '#2dd4bf'],
  experience: ['#f5b454', '#2dd4bf'],
  skills: ['#22d3ee', '#2dd4bf'],
  education: ['#2dd4bf', '#f5b454'],
  colophon: ['#14b8a6', '#3884ff'],
  contact: ['#2dd4bf', '#f5b454'],
};

export function Backdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { path } = useRouter();
  const ids = useMemo(() => navigation.map((item) => item.id), []);
  const section = useScrollSpy(ids, 320);
  const [first, second] = AMBIENT[path === '/' ? section : 'home'] ?? AMBIENT.home!;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--spot-x', `${event.clientX}px`);
        root.style.setProperty('--spot-y', `${event.clientY}px`);
        root.style.setProperty('--spot-on', '1');
      });
    };
    const leave = () => root.style.setProperty('--spot-on', '0');

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  const style = { '--ambient-1': first, '--ambient-2': second } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.backdrop} style={style} aria-hidden="true">
      <div className={styles.horizon} />
      <div className={styles.auraA} />
      <div className={styles.auraB} />
      <div className={styles.grid} />
      <div className={styles.gridSpot} />
      <div className={styles.grain} />
    </div>
  );
}
