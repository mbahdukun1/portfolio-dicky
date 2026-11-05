export const CASE_TITLE_TRANSITION = 'case-title';

export function claimTransition(element: HTMLElement | null, name: string): void {
  if (!element || typeof document.startViewTransition !== 'function') return;

  document.querySelectorAll<HTMLElement>('[data-transition-claim]').forEach((other) => {
    other.style.viewTransitionName = '';
    other.removeAttribute('data-transition-claim');
  });

  element.style.viewTransitionName = name;
  element.setAttribute('data-transition-claim', '');
}
