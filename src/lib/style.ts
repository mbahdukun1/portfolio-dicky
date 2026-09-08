import type { CSSProperties } from 'react';

export function revealDelay(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties;
}

export function depthIndex(index: number): CSSProperties {
  return { '--depth-index': index } as CSSProperties;
}
