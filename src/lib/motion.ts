export const EASE_OUT = 'out(3)';
export const EASE_COUNT = 'out(4)';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
