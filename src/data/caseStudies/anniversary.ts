import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/anniversary';

export const anniversaryCase: CaseStudy = {
  slug: 'anniversary',
  title: 'Anniversary — A Page as a Gift',
  context: 'Personal project',
  period: '2026',
  role: 'Design & build',
  platform: 'Single-page web',
  lede: 'A one-year anniversary present that happens to be a website: a sealed cover, a counter that keeps running while you read it, a timeline of the year, and a letter you have to open.',

  overview: [
    'This one is not a product. It is a gift that took the shape of a web page — a single scrolling site built for a first anniversary, with one reader in mind.',
    'That constraint changed every decision. There is no navigation, because there is only one path through it. There is no hero call-to-action, because nothing is being sold. The whole page is paced like something handed over rather than something browsed: it opens closed, and every section asks you to move forward before it gives you the next thing.',
    'The interesting engineering problem in a page like this is restraint. Everything here — the falling petals, the live counter, the envelope that unseals, the photos that open on tap — could easily tip into noise. Keeping it quiet enough to feel sincere took more editing than building.',
  ],

  flow: [
    {
      title: 'It starts closed',
      detail:
        'The page opens on almost nothing: a name, a thin rule, and a single BUKA button on near-black. Nothing else loads into view until it is pressed — the gift stays wrapped until the reader unwraps it.',
    },
    {
      title: 'The title card',
      detail:
        'Opening reveals the hero: the occasion, the two names set large in a serif, a line about the year, and the date and place. Petals drift down behind it, and a thin SCROLL marker points the way on.',
    },
    {
      title: 'A counter that will not sit still',
      detail:
        'Days, hours, minutes, seconds since the first day — ticking live, with a line that points out the seconds are still moving while you read. Underneath, how far it is to the next anniversary.',
    },
    {
      title: 'The year, in order',
      detail:
        'A timeline of dated moments alternating left and right down a centre line — first date, the day it started, the first trip, a late-night call, a musical, meeting the friends, a birthday, and the anniversary itself.',
    },
    {
      title: 'The album',
      detail:
        'A masonry grid of photos with captions, each one tappable to open larger. Small enough to scan, big enough to stop on.',
    },
    {
      title: 'A letter, sealed',
      detail:
        'A closed envelope with a wax seal and one instruction: tap to open. It unseals into a handwritten-feeling letter, and closes again on request.',
    },
    {
      title: 'The sign-off',
      detail:
        'A last line set in italics, both names, and a link back to the top for the second read.',
    },
  ],

  chapters: [
    {
      id: 'gate',
      heading: 'Why it opens closed',
      body: [
        'The first screen shows a name and a button, and that is all. It would have been easier to drop the reader straight into the hero, but a gift that is already unwrapped is not really a gift. Making the first interaction a deliberate one — press this to begin — turns a scroll into an occasion.',
        'It also solves a practical problem. The page leans on entrance animations, and animations that fire before someone is looking are wasted. Gating on a tap means the hero plays exactly once, at the moment it is being watched.',
      ],
      shots: ['cover', 'hero'],
    },
    {
      id: 'counter',
      heading: 'The section that is never the same twice',
      body: [
        'Days, hours, minutes, seconds — recalculated on a tick and rendered in the same serif as the names. It is the only part of the page that changes while you sit with it, which is precisely the point the copy makes out loud: the seconds are still moving while you read this.',
        'Underneath, the same figure runs the other way: how many days remain to the next anniversary. One number counting up, one counting down, from the same source of truth.',
      ],
      shots: ['counter'],
    },
    {
      id: 'timeline',
      heading: 'A year told in order',
      body: [
        'The timeline alternates photo and text down a centre line with a small marker at each entry, and each moment carries its own date — July 2025, 8 Agustus 2025, February 2026, and on to today.',
        'Alternating sides is doing real work here rather than decoration. It gives every entry the full width of the page to itself, keeps the eye moving down instead of scanning a column, and lets a photo and its story sit at the same height without either one shrinking.',
        'The last entry is deliberately undated. It reads HARI INI — today — so the timeline never actually ends.',
      ],
      shots: ['timeline', 'timeline-2'],
    },
    {
      id: 'album',
      heading: 'The album, and the letter',
      body: [
        'The album is a masonry grid rather than a uniform one, so portrait and landscape photos each keep their own shape, and every tile carries a one-line caption. Tapping opens a photo larger — the same instinct as the case-study lightbox in this portfolio, built for a much smaller set.',
        'The letter is the last thing on the page, and it is the only element that is genuinely hidden. A sealed envelope with a wax dot and one instruction; tapping unseals it. Putting it behind an interaction rather than printing it inline gives it a moment of its own, and lets the reader choose when to have it.',
      ],
      shots: ['album', 'letter'],
    },
    {
      id: 'craft',
      heading: 'Keeping it quiet',
      body: [
        'Everything is built on a single dark palette — near-black, warm off-white, and a muted gold — with one serif for the display type and a light sans for everything else. Two type sizes do most of the work. Colour is used almost nowhere, which is what lets the photos carry it.',
        'The motion follows the same rule. Petals drift slowly and never loop visibly; sections fade up once as they enter view and then stay put; the counter is the only thing that repeats. Restraint is the whole design: a page like this fails by trying too hard, not by doing too little.',
      ],
      shots: ['footer'],
    },
  ],

  gallery: [
    {
      id: 'cover',
      src: `${base}/cover.webp`,
      title: 'The cover',
      caption: 'A name, a rule, and one button. Nothing else until it is pressed.',
      shape: 'wide',
    },
    {
      id: 'hero',
      src: `${base}/hero.webp`,
      title: 'Title card',
      caption: 'The occasion, both names, the date and place — with petals drifting behind it.',
      shape: 'wide',
    },
    {
      id: 'counter',
      src: `${base}/counter.webp`,
      title: 'Live counter',
      caption: 'Days, hours, minutes and seconds since day one, still moving as you read — and the countdown to year two.',
      shape: 'wide',
    },
    {
      id: 'timeline',
      src: `${base}/timeline.webp`,
      title: 'Timeline — the first months',
      caption: 'Dated moments alternating down a centre line, each with its own photo and story.',
      shape: 'wide',
    },
    {
      id: 'timeline-2',
      src: `${base}/timeline-2.webp`,
      title: 'Timeline — through to today',
      caption: 'The year continues to the anniversary itself, and ends on an entry dated only “today”.',
      shape: 'wide',
    },
    {
      id: 'album',
      src: `${base}/album.webp`,
      title: 'Album',
      caption: 'A masonry grid with captions; tapping a photo opens it larger. The sealed envelope waits below.',
      shape: 'wide',
    },
    {
      id: 'letter',
      src: `${base}/letter.webp`,
      title: 'The letter, opened',
      caption: 'The envelope unseals into the letter, and closes again on request.',
      shape: 'wide',
    },
    {
      id: 'footer',
      src: `${base}/footer.webp`,
      title: 'Sign-off',
      caption: 'A closing line, both names, and a way back to the top for the second read.',
      shape: 'wide',
    },
  ],

  outcomes: [
    'A gift that can be re-opened — the counter is different every time it is read.',
    'One path, no navigation: the structure carries the pacing instead of a menu.',
    'Proof that the restrained end of the craft is worth practising too, not just the dashboards.',
  ],
};
