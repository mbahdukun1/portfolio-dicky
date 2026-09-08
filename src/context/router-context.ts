import { createContext } from 'react';

const RAW_BASE = import.meta.env.BASE_URL || '/';

export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export type RoutePath = '/' | '/projects' | '/experience';

export interface RouteLocation {
  path: string;
  hash: string;
}

export interface RouterContextValue extends RouteLocation {
  navigate: (to: string) => void;
}

export function normalisePath(pathname: string): string {
  let path = pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

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
