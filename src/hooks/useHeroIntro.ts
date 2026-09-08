import { createTimeline, splitText, stagger } from 'animejs';
import { useEffect, type RefObject } from 'react';

import { EASE_OUT, prefersReducedMotion } from '@/lib/motion';

const SEQUENCE: Array<[string, number]> = [
  ['headline', 480],
  ['tagline', 580],
  ['meta', 690],
  ['actions', 780],
  ['core', 870],
];

export function useHeroIntro(root: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const node = root.current;
    if (!node || prefersReducedMotion()) return;

    const pick = (name: string) => node.querySelector<HTMLElement>(`[data-hero="${name}"]`);

    const title = pick('title');
    const splitter = title ? splitText(title, { words: true, chars: true }) : null;
    const chars = splitter ? splitter.chars : [];

    const timeline = createTimeline({ defaults: { duration: 700, ease: EASE_OUT } });

    const status = pick('status');
    if (status) {
      timeline.add(status, { opacity: [0, 1], translateY: [-12, 0], scale: [0.94, 1] }, 0);
    }

    if (chars.length > 0) {
      timeline.add(
        chars,
        {
          opacity: [0, 1],
          translateY: [38, 0],
          rotate: [7, 0],
          duration: 820,
          delay: stagger(26),
        },
        100,
      );
    }

    SEQUENCE.forEach(([name, at]) => {
      const element = pick(name);
      if (element) timeline.add(element, { opacity: [0, 1], translateY: [18, 0] }, at);
    });

    return () => {
      timeline.revert();
      splitter?.revert();
    };
  }, [root]);
}
