import { useEffect, useState, type RefObject } from 'react';

import { observeOnce } from '@/lib/inView';

export function useNearViewport(target: RefObject<HTMLElement | null>, enabled: boolean): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = target.current;
    if (!node || !enabled) return;
    return observeOnce(node, () => setNear(true), '0px 0px 25% 0px');
  }, [target, enabled]);

  return near;
}
