import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

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

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<RouteLocation>(readLocation);
  const mounted = useRef(false);

  useEffect(() => {
    // popstate covers back/forward for both path and hash changes. Plain in-page
    // anchors are deliberately left to the browser so they do not scroll twice.
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

    setLocation(next);
  }, []);

  useEffect(() => {
    const isFirstRender = !mounted.current;
    mounted.current = true;

    if (location.hash) {
      // Wait a frame so a freshly swapped page has painted its anchors.
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
