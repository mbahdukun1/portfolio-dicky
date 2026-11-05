import { useEffect, type RefObject } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

export function useTimelineProgress(list: RefObject<HTMLElement | null>, markerSelector: string): void {
  useEffect(() => {
    const node = list.current;
    if (!node) return;

    const reduced = prefersReducedMotion();
    let frame = 0;

    const update = () => {
      frame = 0;
      const markers = Array.from(node.querySelectorAll<HTMLElement>(markerSelector));
      const first = markers[0];
      const last = markers[markers.length - 1];
      if (!first || !last) return;

      const box = node.getBoundingClientRect();
      const start = first.getBoundingClientRect().top + first.offsetHeight / 2 - box.top;
      const end = last.getBoundingClientRect().top + last.offsetHeight / 2 - box.top;
      const anchor = window.innerHeight * 0.62 - box.top;
      const length = Math.max(end - start, 1);
      const progress = reduced ? 1 : Math.min(Math.max((anchor - start) / length, 0), 1);

      const firstBox = first.getBoundingClientRect();
      node.style.setProperty('--track-x', `${firstBox.left + firstBox.width / 2 - box.left - 1}px`);
      node.style.setProperty('--track-start', `${start}px`);
      node.style.setProperty('--track-length', `${length}px`);
      node.style.setProperty('--track-progress', String(progress));

      markers.forEach((marker) => {
        const center = marker.getBoundingClientRect().top + marker.offsetHeight / 2 - box.top;
        const item = marker.closest('li');
        if (!item) return;
        if (reduced || center <= anchor) item.setAttribute('data-lit', '');
        else item.removeAttribute('data-lit');
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const sizing = new ResizeObserver(schedule);
    sizing.observe(node);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      sizing.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [list, markerSelector]);
}
