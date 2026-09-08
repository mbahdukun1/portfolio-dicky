import { useEffect } from 'react';

const SELECTOR = '[data-reveal]:not([data-visible])';

function markVisible(element: Element): void {
  element.setAttribute('data-visible', 'true');
}

/**
 * Fades in every `[data-reveal]` element as it enters the viewport.
 *
 * Elements can appear at any time — a route swap, a filter, an expanded list — so a
 * MutationObserver keeps watching for new ones. Without it, anything mounted after the
 * first pass would stay at `opacity: 0` forever.
 *
 * Pass the current route to force a fresh scan on navigation.
 */
export function useReveal(key?: unknown): void {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      const revealAll = () => document.querySelectorAll(SELECTOR).forEach(markVisible);

      revealAll();

      const mutations = new MutationObserver(revealAll);
      mutations.observe(document.body, { childList: true, subtree: true });
      return () => mutations.disconnect();
    }

    const inView = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          markVisible(entry.target);
          inView.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    const observeWithin = (root: ParentNode) => {
      if (root instanceof Element && root.matches(SELECTOR)) inView.observe(root);
      root.querySelectorAll(SELECTOR).forEach((element) => inView.observe(element));
    };

    observeWithin(document);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observeWithin(node as Element);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      inView.disconnect();
    };
  }, [key]);
}
