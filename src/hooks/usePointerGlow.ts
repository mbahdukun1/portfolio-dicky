import { useEffect, type RefObject } from 'react';

export function usePointerGlow<T extends HTMLElement>(target: RefObject<T | null>): void {
  useEffect(() => {
    const node = target.current;
    if (!node) return;

    const canGlow =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canGlow) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
        node.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
      });
    };

    const handleEnter = () => node.style.setProperty('--glow-on', '1');
    const handleLeave = () => {
      node.style.setProperty('--glow-on', '0');
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    node.addEventListener('pointermove', handleMove);
    node.addEventListener('pointerenter', handleEnter);
    node.addEventListener('pointerleave', handleLeave);

    return () => {
      node.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerenter', handleEnter);
      node.removeEventListener('pointerleave', handleLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [target]);
}
