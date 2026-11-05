import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

import { prefersReducedMotion } from '@/lib/motion';

import {
  normalisePath,
  RouterContext,
  splitTo,
  toHref,
  type RouteLocation,
} from './router-context';

function readLocation(): RouteLocation {
  if (typeof window === 'undefined') return { path: '/', hash: '' };
  return { path: normalisePath(window.location.pathname), hash: window.location.hash };
}

function pageSettled(timeout = 400): Promise<void> {
  const main = document.getElementById('main');
  if (!main || main.childElementCount > 0) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => {
      observer.disconnect();
      window.clearTimeout(timer);
      resolve();
    };
    const observer = new MutationObserver(() => {
      if (main.childElementCount > 0) done();
    });
    const timer = window.setTimeout(done, timeout);
    observer.observe(main, { childList: true });
  });
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<RouteLocation>(readLocation);
  const mounted = useRef(false);
  const currentPath = useRef(location.path);

  useEffect(() => {
    currentPath.current = location.path;
  }, [location.path]);

  useEffect(() => {
    const sync = () => setLocation(readLocation());

    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = splitTo(to, window.location.pathname);
    const target = `${toHref(next.path)}${next.hash}`;

    const unchanged =
      next.path === normalisePath(window.location.pathname) &&
      next.hash === window.location.hash;

    if (unchanged) window.history.replaceState(null, '', target);
    else window.history.pushState(null, '', target);

    const animate =
      !next.hash &&
      next.path !== currentPath.current &&
      typeof document.startViewTransition === 'function' &&
      !prefersReducedMotion();

    if (!animate) {
      setLocation(next);
      return;
    }

    document.startViewTransition(async () => {
      flushSync(() => setLocation(next));
      window.scrollTo(0, 0);
      await pageSettled();
    });
  }, []);

  useEffect(() => {
    const isFirstRender = !mounted.current;
    mounted.current = true;

    if (location.hash) {
     
      const frame = requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({
          behavior: isFirstRender ? 'auto' : 'smooth',
          block: 'start',
        });
      });
      return () => cancelAnimationFrame(frame);
    }

    if (!isFirstRender) window.scrollTo(0, 0);
    return undefined;
  }, [location]);

  const value = useMemo(() => ({ ...location, navigate }), [location, navigate]);

  return <RouterContext value={value}>{children}</RouterContext>;
}
