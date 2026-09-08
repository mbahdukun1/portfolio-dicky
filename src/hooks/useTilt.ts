import { useEffect, useRef } from 'react';

export function useTilt<T extends HTMLElement>(enabled = true, maxDegrees = 7) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    const canTilt =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canTilt) return;

    const handleMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      node.style.setProperty('--tilt-x', `${(0.5 - y) * maxDegrees * 2}deg`);
      node.style.setProperty('--tilt-y', `${(x - 0.5) * maxDegrees * 2}deg`);
      node.style.setProperty('--pointer-x', `${x * 100}%`);
      node.style.setProperty('--pointer-y', `${y * 100}%`);
      node.style.setProperty('--tilt-active', '1');
    };

    const handleLeave = () => {
      node.style.setProperty('--tilt-x', '0deg');
      node.style.setProperty('--tilt-y', '0deg');
      node.style.setProperty('--tilt-active', '0');
    };

    node.addEventListener('pointermove', handleMove);
    node.addEventListener('pointerleave', handleLeave);

    return () => {
      node.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, maxDegrees]);

  return ref;
}
