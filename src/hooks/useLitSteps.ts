import { useEffect, type RefObject } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

export function useLitSteps(list: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const node = list.current;
    if (!node) return;

    const steps = Array.from(node.children);
    const light = (step: Element) => step.setAttribute('data-lit', '');

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      steps.forEach(light);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          light(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -38% 0px', threshold: 0.6 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [list]);
}
