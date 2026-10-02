// -----------------------------------------------------------------------------
// IMAGE + CONTENT MANAGEMENT SYSTEM
// -----------------------------------------------------------------------------
// Real (AI-generated) Camila Reyes photos:
//   /public/camila/*.jpg        -> editorial hero/about/fashion/lifestyle/travel
//   /public/camila/album/*.jpg  -> full lifestyle library (café, cosy, athleisure)
// Scenery/object placeholders remain Unsplash/Pexels and are easily swapped.
// -----------------------------------------------------------------------------

export function opt(url, w = 1200) {
  const sep = url.includes('?') ? '&' : '?';
  if (url.includes('pexels')) return `${url}${sep}auto=compress&cs=tinysrgb&w=${w}`;
  return `${url}${sep}auto=format&fit=crop&w=${w}&q=80`;
}

// Camila editorial photos
const HERO_IMG = '/camila/hero.jpg';         // reclining golden-hour coastline (landscape)
const ABOUT_IMG = '/camila/about.jpg';       // over-the-shoulder portrait
const FASHION_IMG = '/camila/fashion.jpg';   // backlit editorial portrait
const LIFESTYLE_IMG = '/camila/lifestyle.jpg'; // relaxed golden-hour (landscape)
const TRAVEL_IMG = '/camila/travel.jpg';     // Positano coastline

// Camila lifestyle library
const A = (n) => `/camila/album/${n}.jpg`;

// Scenery / object placeholders (no person)
const ED5 = 'https://images.unsplash.com/photo-1667400104797-132f6be037ce';
const ED6 = 'https://images.unsplash.com/photo-1527683040093-3a2b80ed1592';
const ED7 = 'https://images.unsplash.com/photo-1601740289404-6d0dca1bc904';
const PX4 = 'https://images.pexels.com/photos/16408792/pexels-photo-16408792.jpeg';
const TRV1 = 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?crop=entropy&cs=srgb&fm=jpg&q=85';
const TRV2 = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=srgb&fm=jpg&q=85';
const TRV3 = 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?crop=entropy&cs=srgb&fm=jpg&q=85';
const WEL1 = 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?crop=entropy&cs=srgb&fm=jpg&q=85';
const YOG = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&q=85';
const WEL3 = 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=srgb&fm=jpg&q=85';
const FIT1 = 'https://images.unsplash.com/photo-1627483298606-cf54c61779a9?crop=entropy&cs=srgb&fm=jpg&q=85';
const FIT2 = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=srgb&fm=jpg&q=85';

export const heroImage = HERO_IMG;
export const aboutImage = ABOUT_IMG;

export const features = [
  { key: 'lifestyle', title: 'Lifestyle', description: 'Slow mornings, cosy corners and the small rituals that make a day feel intentional.', image: A('p16') },
  { key: 'fashion', title: 'Fashion', description: 'Elevated everyday looks, seasonal edits and the accessories that pull it together.', image: FASHION_IMG },
  { key: 'fitness', title: 'Fitness', description: 'Movement as self-care — mindful workouts, wellness rituals and gentle strength.', image: A('p18') },
  { key: 'travel', title: 'Travel', description: 'Dreamy destinations, hidden corners and the stories collected along the way.', image: TRAVEL_IMG },
];

export const latestContent = [
  { category: 'Fashion', title: 'Autumn Layers I’m Loving', date: 'Jun 2, 2025', image: A('p06') },
  { category: 'Travel', title: 'A Slow Morning by the Sea', date: 'May 28, 2025', image: HERO_IMG },
  { category: 'Fitness', title: 'Reset: My Wellness Ritual', date: 'May 21, 2025', image: A('p18') },
  { category: 'Lifestyle', title: 'Blush Tones & Quiet Days', date: 'May 14, 2025', image: A('p16') },
  { category: 'Fashion', title: 'Accessories That Elevate', date: 'May 7, 2025', image: A('p08') },
  { category: 'Travel', title: 'A Morning in the Park', date: 'Apr 30, 2025', image: A('p27') },
];

export const personalityTraits = ['Warm', 'Confident', 'Creative', 'Curious', 'Adventurous', 'Approachable', 'Modern'];

export const categories = {
  lifestyle: {
    key: 'lifestyle', title: 'Lifestyle', tagline: 'The art of a beautifully ordinary day',
    intro: 'From quiet coffee rituals to cosy corners, Camila’s lifestyle stories celebrate intention, softness and the joy found in small everyday moments.',
    hero: LIFESTYLE_IMG,
    grid: [A('p16'), A('p07'), A('p09'), A('p13'), A('p25'), A('p20')],
  },
  fashion: {
    key: 'fashion', title: 'Fashion', tagline: 'Elevated everyday, effortlessly styled',
    intro: 'Seasonal edits, capsule wardrobes and the accessories that finish a look — a refined, feminine take on modern dressing.',
    hero: FASHION_IMG,
    grid: [FASHION_IMG, ABOUT_IMG, A('p05'), A('p06'), A('p08'), A('p12')],
  },
  fitness: {
    key: 'fitness', title: 'Fitness', tagline: 'Movement as a form of self-care',
    intro: 'Mindful workouts, wellness rituals and gentle strength — a balanced approach to feeling good in body and mind.',
    hero: opt(FIT1, 1600),
    grid: [A('p18'), A('p29'), opt(YOG), opt(WEL1), opt(FIT2), opt(WEL3)],
  },
  travel: {
    key: 'travel', title: 'Travel', tagline: 'Collecting stories, one destination at a time',
    intro: 'Dreamy coastlines, quiet corners and city escapes — travel diaries designed to inspire your next slow adventure.',
    hero: opt(TRV3, 1600),
    grid: [TRAVEL_IMG, A('p27'), A('p10'), HERO_IMG, opt(TRV1), opt(TRV2)],
  },
};

export const galleryItems = [
  { id: 'g1', category: 'lifestyle', src: A('p16'), alt: 'Camila reading by the window at golden hour', caption: 'Golden hour' },
  { id: 'g2', category: 'fashion', src: FASHION_IMG, alt: 'Camila in a backlit editorial look', caption: 'Backlit editorial' },
  { id: 'g3', category: 'travel', src: TRAVEL_IMG, alt: 'Camila overlooking the Positano coastline', caption: 'Positano views' },
  { id: 'g4', category: 'lifestyle', src: A('p05'), alt: 'Camila at a Paris café in the evening', caption: 'Paris evenings' },
  { id: 'g5', category: 'fashion', src: A('p06'), alt: 'Camila walking the city in autumn layers', caption: 'Autumn in the city' },
  { id: 'g6', category: 'lifestyle', src: A('p07'), alt: 'Camila reading at a café', caption: 'Slow afternoons' },
  { id: 'g7', category: 'lifestyle', src: A('p09'), alt: 'Camila with cocoa on a rainy café day', caption: 'Rainy-day cocoa' },
  { id: 'g8', category: 'travel', src: HERO_IMG, alt: 'Camila reclining by the coast at sunset', caption: 'By the coast' },
  { id: 'g9', category: 'fashion', src: A('p08'), alt: 'Camila on a coffee run', caption: 'Coffee run' },
  { id: 'g10', category: 'travel', src: A('p10'), alt: 'Camila in a sundress at a sunny café', caption: 'La dolce vita' },
  { id: 'g11', category: 'fashion', src: ABOUT_IMG, alt: 'Soft-light portrait of Camila', caption: 'Soft light' },
  { id: 'g12', category: 'lifestyle', src: A('p13'), alt: 'Camila working from a café', caption: 'Creator life' },
  { id: 'g13', category: 'fashion', src: A('p12'), alt: 'Camila street-style at a coffee counter', caption: 'Street style' },
  { id: 'g14', category: 'fitness', src: A('p18'), alt: 'Camila in athleisure', caption: 'Movement' },
  { id: 'g15', category: 'fitness', src: A('p29'), alt: 'Camila on the go in activewear', caption: 'On the go' },
  { id: 'g16', category: 'lifestyle', src: A('p20'), alt: 'Camila cosy by the window with a mug', caption: 'Cosy mornings' },
  { id: 'g17', category: 'lifestyle', src: A('p25'), alt: 'Camila in soft knits in morning light', caption: 'Quiet light' },
  { id: 'g18', category: 'travel', src: A('p27'), alt: 'Camila at a city park', caption: 'City park' },
  { id: 'g19', category: 'lifestyle', src: LIFESTYLE_IMG, alt: 'Camila relaxing at golden hour', caption: 'Golden glow' },
  { id: 'g20', category: 'fashion', src: A('p11'), alt: 'Camila café style with greenery', caption: 'Café style' },
  { id: 'g21', category: 'lifestyle', src: A('p17'), alt: 'Camila working from a cosy home studio', caption: 'Work from home' },
  { id: 'g22', category: 'fashion', src: A('p15'), alt: 'Camila in a floral top at a café', caption: 'Floral & soft' },
  { id: 'g23', category: 'lifestyle', src: A('p02'), alt: 'Camila in a casual everyday look', caption: 'Everyday ease' },
  { id: 'g24', category: 'lifestyle', src: A('p21'), alt: 'Camila at her vanity with fresh flowers', caption: 'Getting ready' },
  { id: 'g25', category: 'lifestyle', src: A('p23'), alt: 'Camila in soft knits at home', caption: 'Home comforts' },
  { id: 'g26', category: 'lifestyle', src: A('p28'), alt: 'Camila relaxing by candlelight', caption: 'Candlelight' },
  { id: 'g27', category: 'fashion', src: A('p19'), alt: 'Camila styling her wardrobe', caption: 'Wardrobe edit' },
  { id: 'g28', category: 'lifestyle', src: A('p24'), alt: 'Camila in loungewear at home', caption: 'Lazy Sunday' },
];

export const galleryFilters = ['All', 'Lifestyle', 'Fashion', 'Fitness', 'Travel'];

export const blogSeed = [
  {
    id: 'b1', slug: 'morning-coffee-with-camila', title: 'Morning Coffee With Camila',
    category: 'Lifestyle', author: 'Camila Reyes', date: 'Jun 2, 2025', readingTime: '4 min read',
    cover: A('p05'),
    excerpt: 'The small ritual that anchors my day — and why slow mornings are worth protecting.',
    body: [
      'There is a particular kind of quiet that only exists before the world wakes up. I have learned to guard it fiercely. My morning coffee is less about caffeine and more about ceremony — the warmth of the cup, the light stretching across the table, a few minutes that belong entirely to me.',
      'I keep it simple: a slow pour, a good book or none at all, and absolutely no screens for the first thirty minutes. It sounds small, but it changes the tone of everything that follows.',
      'If you are trying to build a gentler morning, start with one thing you genuinely look forward to. Protect it. Everything else can wait a little longer than you think.',
    ],
  },
  {
    id: 'b2', slug: 'autumn-fashion-ideas', title: 'Autumn Fashion Ideas',
    category: 'Fashion', author: 'Camila Reyes', date: 'May 26, 2025', readingTime: '5 min read',
    cover: A('p06'),
    excerpt: 'Warm layers, soft textures and the transitional pieces I reach for every autumn.',
    body: [
      'Autumn is my favourite season to dress for. The palette shifts to caramel, cream and deep rust, and everything feels a little more considered.',
      'This year I am leaning into texture — a cropped jacket over a simple top, relaxed denim, and shoes I can actually walk the city in. The trick is contrast: something soft against something structured.',
      'Build around three hero pieces: a great jacket, one perfect knit and denim that fits just right. Everything else is styling.',
    ],
  },
  {
    id: 'b3', slug: 'fitness-journey', title: 'Fitness Journey',
    category: 'Fitness', author: 'Camila Reyes', date: 'May 19, 2025', readingTime: '6 min read',
    cover: A('p18'),
    excerpt: 'How I reframed movement as self-care instead of punishment — and finally stayed consistent.',
    body: [
      'For a long time I approached fitness as something to endure. The shift happened when I stopped chasing intensity and started chasing consistency.',
      'Now my week is a blend: strength twice, something restorative like yoga, and long walks that double as thinking time. No guilt, no all-or-nothing.',
      'Progress is quieter than the internet suggests. It looks like showing up on the days you least feel like it — and being kind to yourself on the days you do not.',
    ],
  },
  {
    id: 'b4', slug: 'travel-diary', title: 'Travel Diary',
    category: 'Travel', author: 'Camila Reyes', date: 'May 12, 2025', readingTime: '5 min read',
    cover: TRAVEL_IMG,
    excerpt: 'Notes from a slow escape — blue shutters, warm bread and the beauty of doing very little.',
    body: [
      'The best trips, I have decided, are the ones with the least planned. This one was all whitewashed walls, blue shutters and afternoons that stretched on without agenda.',
      'I wandered without a map, followed the smell of fresh bread, and let the days find their own shape. It was the most rested I have felt in months.',
      'Travel does not have to be a checklist. Sometimes the souvenir is simply a slower heartbeat and a head full of light.',
    ],
  },
];

export const productSeed = [
  { id: 'p1', name: 'Mobile Wallpaper Pack', category: 'Wallpapers', type: 'digital', price: 9, image: A('p16'), description: '12 hand-picked blush & cream wallpapers for your phone.' },
  { id: 'p2', name: 'Desktop Wallpaper Set', category: 'Wallpapers', type: 'digital', price: 12, image: HERO_IMG, description: 'A calm, editorial set of desktop backgrounds in 4K.' },
  { id: 'p3', name: 'Everyday Style Guide (eBook)', category: 'Guides', type: 'digital', price: 19, image: FASHION_IMG, description: 'Build an effortless capsule wardrobe, step by step.' },
  { id: 'p4', name: '7-Day Wellness Reset', category: 'Guides', type: 'digital', price: 24, image: A('p18'), description: 'A gentle week of movement, meals and mindful rituals.' },
  { id: 'p5', name: 'Creator Presets Pack', category: 'Creator Resources', type: 'digital', price: 29, image: A('p05'), description: '10 warm, editorial presets for a signature look.' },
  { id: 'p6', name: 'Content Planning Template', category: 'Creator Resources', type: 'digital', price: 15, image: A('p13'), description: 'A ready-to-use template to plan a month of content.' },
  { id: 'p7', name: 'Signature Canvas Tote', category: 'Merchandise', type: 'physical', price: 34, image: opt(PX4, 800), description: 'A sturdy everyday tote in natural cotton canvas.' },
  { id: 'p8', name: 'Minimalist Ceramic Mug', category: 'Merchandise', type: 'physical', price: 22, image: opt(ED6, 800), description: 'Hand-glazed cream ceramic mug for those slow mornings.' },
];

export const gallerySeed = galleryItems;

export const premiumBenefits = [
  { title: 'Exclusive Content', description: 'Full editorials, extended stories and content made only for members.' },
  { title: 'Behind The Scenes', description: 'The process, the outtakes and the unfiltered making-of moments.' },
  { title: 'Early Access', description: 'See new drops, guides and collections before anyone else.' },
  { title: 'Community Updates', description: 'Personal notes, monthly letters and a closer connection.' },
];
