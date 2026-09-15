import { animate } from 'animejs';
import { useEffect, useRef } from 'react';

import { observeOnce } from '@/lib/inView';
import { EASE_COUNT, prefersReducedMotion } from '@/lib/motion';

interface StatValueProps {
  value: string;
  className?: string;
}

export function StatValue({ value, className }: StatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const match = value.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;

    const prefix = match[1] ?? '';
    const target = Number(match[2]);
    const suffix = match[3] ?? '';
    const counter = { current: 0 };

    const animation = animate(counter, {
      current: target,
      duration: 1500,
      ease: EASE_COUNT,
      autoplay: false,
      onUpdate: () => {
        node.textContent = `${prefix}${Math.round(counter.current)}${suffix}`;
      },
      onComplete: () => {
        node.textContent = value;
      },
    });

    const stopObserving = observeOnce(node, () => animation.play());

    return () => {
      stopObserving();
      animation.revert();
      node.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
