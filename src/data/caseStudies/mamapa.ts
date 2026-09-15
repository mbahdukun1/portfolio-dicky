import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/mamapa';

export const mamapaCase: CaseStudy = {
  slug: 'mamapa',
  title: 'mamAPA - Recipe App',
  context: 'Personal project',
  period: '2023',
  role: 'Full-stack & mobile developer',
  platform: 'Mobile app',
  lede: 'A recipe app for the question everyone asks at 6pm — “mau makan apa?” — with search for when you know, and an AI that suggests for when you do not.',

  overview: [
    'mamAPA takes its name from the daily Indonesian stalemate: mau makan apa? What do you want to eat? The app answers it two ways. If you already have something in mind, you search for it and get recipes with photos, ingredients, and steps. If you do not — and most of the time you do not — you tell the app roughly what you feel like and it suggests dishes for you.',
    'The AI half is the reason the project exists. A search box only helps someone who already has a word to type; the recommendation screen takes a vague mood and comes back with actual dishes, each with a sentence on why it fits. It is the difference between a cookbook and someone standing in your kitchen making a suggestion.',
    'Around that sit the ordinary parts a recipe app needs to be usable more than once: an account, favourites, and a place to keep the recipes you have written yourself.',
  ],

  flow: [
    {
      title: 'Open the app',
      detail:
        'An onboarding screen sets the expectation up front — there is a search feature, and it uses AI.',
    },
    {
      title: 'Sign in',
      detail:
        'Email and password, or straight through with Google. An account is what makes favourites and your own recipes persist across devices.',
    },
    {
      title: 'Land on the home feed',
      detail:
        'A featured dish with its cook time, a search field, the “Ask Me!” button, and the latest recipes as a card grid — each with a heart to save it.',
    },
    {
      title: 'Search when you know what you want',
      detail:
        'Typing a dish returns matching recipes with a thumbnail and a short description — ten results for “nasi”, from goreng to padang to kuning.',
    },
    {
      title: 'Ask when you do not',
      detail:
        'The recommendation screen takes what you feel like and answers with a numbered set of dishes and the reasoning behind each. Not happy with it? Ask again.',
    },
    {
      title: 'Cook from the detail page',
      detail:
        'Hero photo, author, cook time, the ingredient list, and numbered steps written the way you would actually follow them — one action per card.',
    },
    {
      title: 'Keep what worked',
      detail:
        'Favourite a recipe from anywhere, and keep your own recipes on your profile alongside them.',
    },
  ],

  chapters: [
    {
      id: 'entry',
      heading: 'Setting the expectation early',
      body: [
        'The onboarding screen does one job: it tells you the app can search, and that the search is AI-backed. That matters because the “Ask Me!” button on the home screen is otherwise easy to read as decoration, and it is the most useful thing in the app.',
        'Login supports email and Google. Google carries most of the traffic — an account should never be the reason someone abandons a recipe app.',
      ],
      shots: ['landing', 'login'],
    },
    {
      id: 'home',
      heading: 'A home screen built around one question',
      body: [
        'The home feed leads with a featured dish and its cook time, because time is the constraint that actually decides dinner. Under it sit the two ways in: a search field for the specific, and “Ask Me!” for the vague.',
        'Below that, the latest recipes as a card grid — photo, title, one line of description, and a heart in the corner. Saving a recipe never takes more than a tap from wherever you find it.',
      ],
      shots: ['home', 'search-results'],
    },
    {
      id: 'ai',
      heading: 'The part that answers “mau makan apa?”',
      body: [
        'The recommendation screen is a conversation with a very narrow scope. You describe what you feel like; the model comes back with a numbered list of dishes and, for each, a sentence on what it is and why it might suit — nasi goreng described by what goes in it and what it is served with, not just named.',
        'A single button reruns it. That was a deliberate choice over a chat thread: nobody wants to negotiate with a chatbot while they are hungry, they want a different suggestion.',
      ],
      shots: ['ai-recommendation'],
    },
    {
      id: 'recipe',
      heading: 'A recipe page you can cook from',
      body: [
        'The detail page is split the way cooking is: what you need, then what you do. Ingredients as a plain checklist with real quantities, then the steps as numbered cards — one action per card, so you can find your place again after looking away.',
        'The header carries the things you check before committing: the photo, who wrote it, how long it takes, and the heart to save it for later.',
      ],
      shots: ['recipe-detail'],
    },
    {
      id: 'profile',
      heading: 'Your own shelf',
      body: [
        'The profile holds the account and, more importantly, “Resep Saya” — the recipes the user has written themselves, sitting next to the ones they saved. A recipe app becomes worth returning to at the point where some of the recipes in it are yours.',
      ],
      shots: ['profile'],
    },
  ],

  gallery: [
    {
      id: 'landing',
      src: `${base}/landing.webp`,
      title: 'Onboarding',
      caption: 'The pitch in one screen: healthy fruit-based food, and a search feature that uses AI.',
    },
    {
      id: 'login',
      src: `${base}/login.webp`,
      title: 'Sign in',
      caption: 'Email and password, or straight through with Google.',
    },
    {
      id: 'home',
      src: `${base}/home.webp`,
      title: 'Home feed',
      caption: 'A featured dish with cook time, the search field, “Ask Me!”, and the latest recipes.',
    },
    {
      id: 'search-results',
      src: `${base}/search-results.webp`,
      title: 'Search results',
      caption: 'Ten results for “nasi”, each with a thumbnail and a one-line description.',
    },
    {
      id: 'ai-recommendation',
      src: `${base}/ai-recommendation.webp`,
      title: 'AI recommendation',
      caption: 'Dishes suggested with the reasoning behind each, and one button to ask again.',
    },
    {
      id: 'recipe-detail',
      src: `${base}/recipe-detail.webp`,
      title: 'Recipe detail',
      caption: 'Photo, author, cook time, ingredients, and numbered steps — one action per card.',
    },
    {
      id: 'profile',
      src: `${base}/profile.webp`,
      title: 'Profile',
      caption: 'The account, and “Resep Saya” — the recipes the user wrote themselves.',
    },
  ],

  outcomes: [
    'Two ways to find a recipe: search for the specific, AI for the vague.',
    'Accounts, favourites, and user-written recipes, so the app is worth opening twice.',
  ],
};
