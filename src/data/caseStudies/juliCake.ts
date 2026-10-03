import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/juli-cake';

export const juliCakeCase: CaseStudy = {
  slug: 'juli-cake',
  title: 'Juli Cake - Bakery Ordering Website',
  context: 'Freelance',
  period: '2026',
  role: 'Design & full-stack build',
  platform: 'Responsive web + admin dashboard',
  lede: 'A storefront for a Jakarta home bakery that bakes to order: browse the menu, fill a cart, pick a date the kitchen can actually make, and send the whole order to WhatsApp in one tap.',

  overview: [
    'Juli Cake is a home kitchen in Sunter, Jakarta, that bakes everything to order — cakes, brownies, pastry, and cookies, with no overnight stock and no preservatives. Before this site, every order started as a WhatsApp chat that went back and forth over sizes, prices, and dates before anyone knew what was actually being ordered.',
    'The site does not try to replace WhatsApp; the bakery’s customers already live there, and that is where payment and delivery get agreed. Instead it does the part the chat was bad at: it shows the menu properly, lets the customer build the order themselves, and hands the bakery a message that is already complete.',
    'Behind the storefront is a small dashboard so the owner can change the menu — photos, prices, sizes, what is on sale this week — from a phone, without calling a developer.',
  ],

  flow: [
    {
      title: 'Land on the kitchen',
      detail:
        'A headline about baking this morning for delivery this afternoon, the best seller with its price, and the four promises that matter to a home-bakery customer: fresh from the oven, no preservatives, city delivery, custom writing.',
    },
    {
      title: 'Browse the menu',
      detail:
        'Nine items as cards with a photo carousel, portion size, the first few ingredients, and size chips that change the price in place. Search and category filters sit above the grid.',
    },
    {
      title: 'Open the detail',
      detail:
        'Full photo set, the story behind the item, portions, how far ahead to order, how to store it, and every ingredient — then add the chosen size straight to the cart.',
    },
    {
      title: 'Build the cart',
      detail:
        'Quantities, the customer’s name, a pickup or delivery date, and a free-text note for the writing on the cake. The cart survives a refresh.',
    },
    {
      title: 'Pick a date that works',
      detail:
        'The date strip starts at the earliest day the slowest item in the cart can be ready, and says why — a rainbow cake needs two days, nastar needs three.',
    },
    {
      title: 'Send it to WhatsApp',
      detail:
        'One button composes the order — every line with size, quantity, and subtotal, the total, name, date, and note — and opens it in a chat with the bakery.',
    },
    {
      title: 'The owner updates the menu',
      detail:
        'At /dashboard the owner signs in and reorders, hides, edits, or adds items, uploads photos, and sets sizes and prices. Changes reach the storefront on the next load.',
    },
  ],

  chapters: [
    {
      id: 'storefront',
      heading: 'A storefront that reads like the kitchen',
      body: [
        'The first screen leads with the thing that makes a home bakery different from a shop — it was baked this morning — and puts the most-ordered cake and its price right next to it. Below the fold, four short promises answer the questions people used to ask in the chat before ordering.',
        'The palette, the serif, and the warm off-white come from the bakery’s own logo, so the site feels like the same place as the Instagram account customers already follow.',
      ],
      shots: ['hero'],
    },
    {
      id: 'catalog',
      heading: 'A menu you can order from',
      body: [
        'Each card carries enough to decide without opening anything: a swipeable photo set, the portion size, the first ingredients, how far ahead it needs ordering, and size chips that swap the price in place. The add button turns into a quantity stepper once something is in the cart, so the card always shows what you already have.',
        'The detail sheet is for the customers who want to know more — what goes into it, how long it keeps, which allergens it carries — and it ends in the same add-to-cart action rather than a separate path.',
      ],
      shots: ['catalog', 'product-detail'],
    },
    {
      id: 'cart',
      heading: 'An order that arrives already complete',
      body: [
        'The cart is where the back-and-forth used to happen, so it asks for exactly what the bakery needs to confirm: name, date, and a note for writing on the cake or a delivery address. Everything else is already known from what was added.',
        'The date strip is the quiet piece of logic that saves the most messages. Every item has its own lead time, and the earliest selectable day is computed from the slowest item in the cart, with a line underneath naming which item is holding it back. A customer can no longer ask for a rainbow cake tomorrow.',
        'Sending does not submit a form. It composes a WhatsApp message — numbered lines, sizes, quantities, subtotals, the total, and the customer’s details — and opens the chat. The bakery replies with delivery cost and payment details, the part that genuinely needs a person.',
      ],
      shots: ['cart'],
    },
    {
      id: 'dashboard',
      heading: 'A menu the owner can change',
      body: [
        'The dashboard lives at /dashboard on the same site. The list order is the storefront order, so arrows move an item up or down the menu; a toggle hides something that is out of season without deleting it.',
        'The editor covers everything a card and its detail sheet show: photos with a chosen cover, name, category, short and long description, sizes and prices, lead time, storage, ingredients, and allergens. Photos are resized in the browser before upload so a picture straight off a phone camera does not slow the storefront down, and deleting a menu item removes its photos from storage too.',
      ],
      shots: ['dashboard', 'product-editor'],
    },
    {
      id: 'backend',
      heading: 'Supabase, with the rules in the database',
      body: [
        'Menu items and photos live in Supabase — a Postgres table and a storage bucket. The public key that ships with the site can only read items marked as active; creating, editing, and deleting are allowed only for the signed-in admin. Those rules are row-level security policies on the table and bucket, not checks in the front end.',
        'The storefront caches the last menu it saw on the device and shows it immediately, then swaps in the fresh one when it arrives. If Supabase cannot be reached at all, it falls back to the built-in menu, so the shop never opens on an empty page.',
      ],
      shots: ['how-to-order'],
    },
    {
      id: 'mobile',
      heading: 'Built for the phone it will be opened on',
      body: [
        'Almost every visitor arrives from an Instagram bio or a forwarded WhatsApp link, so the layout is designed at phone width first. The cart becomes a bottom sheet, a floating bar keeps the running total in reach while browsing, and the date chips scroll sideways under a thumb.',
        'It is one Expo and React Native Web codebase, so the same components would carry over to a native app if the bakery ever wants one.',
      ],
      shots: ['custom-order'],
    },
  ],

  gallery: [
    {
      id: 'hero',
      src: `${base}/hero.webp`,
      title: 'Home',
      caption: 'Baked this morning, delivered this afternoon — with the best seller and its price beside the headline.',
      shape: 'wide',
    },
    {
      id: 'catalog',
      src: `${base}/catalog.webp`,
      title: 'Menu',
      caption: 'Search, category filters, and cards with a photo carousel, portions, ingredients, and size chips.',
      shape: 'wide',
    },
    {
      id: 'product-detail',
      src: `${base}/product-detail.webp`,
      title: 'Product detail',
      caption: 'The full photo set, the story, portions, lead time, storage, and every ingredient.',
      shape: 'wide',
    },
    {
      id: 'cart',
      src: `${base}/cart.webp`,
      title: 'Cart',
      caption: 'Quantities, name, a date strip that starts at the earliest possible day, and a note for the cake.',
      shape: 'wide',
    },
    {
      id: 'how-to-order',
      src: `${base}/how-to-order.webp`,
      title: 'How to order & FAQ',
      caption: 'Three steps from menu to WhatsApp, and the questions customers used to ask in the chat.',
      shape: 'wide',
    },
    {
      id: 'custom-order',
      src: `${base}/custom-order.webp`,
      title: 'Custom orders',
      caption: 'A call-out for birthday and celebration cakes that opens a WhatsApp consultation.',
      shape: 'wide',
    },
    {
      id: 'dashboard',
      src: `${base}/dashboard.webp`,
      title: 'Admin — menu list',
      caption: 'List order is menu order: move items up or down, hide them, edit, or delete.',
      shape: 'wide',
    },
    {
      id: 'product-editor',
      src: `${base}/product-editor.webp`,
      title: 'Admin — edit item',
      caption: 'Photos with a cover, name, category, descriptions, sizes and prices, lead time, and ingredients.',
      shape: 'wide',
    },
    {
      id: 'mobile-home',
      src: `${base}/mobile-home.webp`,
      title: 'Mobile — home',
      caption: 'The same storefront at phone width, where most visitors arrive from Instagram.',
    },
    {
      id: 'mobile-catalog',
      src: `${base}/mobile-catalog.webp`,
      title: 'Mobile — menu',
      caption: 'Full-width cards with swipeable photos and a horizontal category strip.',
    },
    {
      id: 'mobile-cart',
      src: `${base}/mobile-cart.webp`,
      title: 'Mobile — cart',
      caption: 'The cart as a bottom sheet, with date chips and the WhatsApp button in thumb reach.',
    },
  ],

  outcomes: [
    'Orders arrive in WhatsApp already complete — items, sizes, total, name, date, and note.',
    'No more impossible dates: the earliest pickup day follows the slowest item in the cart.',
    'The owner edits the menu, photos, and prices from a phone, without a developer.',
  ],
};
