export function observeOnce(
  element: Element,
  onEnter: () => void,
  rootMargin = '0px 0px -10% 0px',
): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    onEnter();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onEnter();
        observer.disconnect();
      });
    },
    { rootMargin, threshold: 0.12 },
  );

  observer.observe(element);

  return () => observer.disconnect();
}
