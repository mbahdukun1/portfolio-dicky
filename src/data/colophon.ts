export interface ColophonEntry {
  name: string;
  detail: string;
}

/** What this site is built with. Kept honest — every line is in package.json or src/. */
export const stack: ColophonEntry[] = [
  {
    name: 'React 19 + TypeScript',
    detail: 'Strict types end to end, including the content itself.',
  },
  {
    name: 'Vite',
    detail: 'Dev server and build. No framework on top of it.',
  },
  {
    name: 'CSS Modules + design tokens',
    detail: 'No CSS-in-JS, no utility framework. One token layer, two themes.',
  },
  {
    name: 'A hand-written router',
    detail: '~60 lines over history.pushState. No routing library.',
  },
  {
    name: 'anime.js',
    detail: 'The only runtime dependency past React — used for the hero sequence.',
  },
  {
    name: 'Inter + JetBrains Mono',
    detail: 'One sans for reading, one mono for labels and numbers.',
  },
  {
    name: 'Vercel',
    detail: 'With a static-host fallback so deep links survive anywhere.',
  },
];

/** How it is put together — the decisions, not the dependencies. */
export const method: ColophonEntry[] = [
  {
    name: 'Content is typed data',
    detail:
      'Every project, case study, role, and skill is a typed object in src/data. Adding a project is a data edit, not a component edit.',
  },
  {
    name: 'Primitives before pages',
    detail:
      'A small layer — Card, Button, Badge, Section, Icon, Lightbox — that every page composes, so a change lands everywhere at once.',
  },
  {
    name: 'Two themes, one source',
    detail:
      'Light and dark are the same CSS variables with different values. The site follows the system until you choose, then remembers.',
  },
  {
    name: 'Motion that asks permission',
    detail:
      'Reveal-on-scroll runs on one IntersectionObserver, with a MutationObserver so late-mounted content still animates. All of it yields to prefers-reduced-motion.',
  },
  {
    name: 'Keyboard and screen reader first',
    detail:
      'A skip link, a labelled landmark per section, real anchors you can copy and middle-click, and a lightbox driven by arrow keys and Escape.',
  },
  {
    name: 'No analytics, no trackers',
    detail: 'Nothing here follows you. The only requests off this origin are the two that fetch the fonts.',
  },
];
