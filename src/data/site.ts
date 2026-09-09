/**
 * Canonical origin, no trailing slash. Change it here and in public/robots.txt,
 * public/sitemap.xml, and the head tags in index.html if the domain moves.
 */
export const SITE_URL = 'https://dicky-portfolio.my.id';

/** Absolute URL for a router path, for canonical and og:url tags. */
export function absoluteUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
