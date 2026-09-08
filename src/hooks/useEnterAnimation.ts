import { animate } from 'animejs';
import { useEffect, type RefObject } from 'react';

import { observeOnce } from '@/lib/inView';
import { EASE_OUT, prefersReducedMotion } from '@/lib/motion';

export function useEnterAnimation(
  target: RefObject<HTMLElement | null>,
  duration = 900,
): void {
  useEffect(() => {
    const node = target.current;
    if (!node || prefersReducedMotion()) return;

    node.style.setProperty('--enter', '0');

    const animation = animate(node, {
      '--enter': [0, 1],
      duration,
      ease: EASE_OUT,
      autoplay: false,
    });

    const stopObserving = observeOnce(node, () => animation.play());

    return () => {
      stopObserving();
      animation.revert();
      node.style.removeProperty('--enter');
    };
  }, [target, duration]);
}
