import { createContext } from 'react';

const RAW_BASE = import.meta.env.BASE_URL || '/';

/** Vite base without its trailing slash — '' at the root, '/repo-name' on GitHub Pages. */
export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export type RoutePath = '/' | '/projects' | '/experience';

export interface RouteLocation {
  path: string;
  hash: string;
}

export interface RouterContextValue extends RouteLocation {
  navigate: (to: string) => void;
}

/** Strips the Vite base and any trailing slash so routes compare as '/', '/projects', … */
export function normalisePath(pathname: string): string {
  let path = pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

/** Turns an app path ('/projects', '/#work') into a real href honouring the Vite base. */
export function toHref(to: string): string {
  if (to.startsWith('#') || to.startsWith('//') || /^[a-z]+:/i.test(to)) return to;
  return `${BASE}${to}` || '/';
}

export function splitTo(to: string, fallbackPath: string): RouteLocation {
  const index = to.indexOf('#');
  if (index === -1) return { path: normalisePath(to), hash: '' };

  return {
    path: normalisePath(to.slice(0, index) || fallbackPath),
    hash: to.slice(index),
  };
}

export const RouterContext = createContext<RouterContextValue | null>(null);
