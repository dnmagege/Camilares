// -----------------------------------------------------------------------------
// IMAGE + CONTENT MANAGEMENT SYSTEM
// -----------------------------------------------------------------------------
// All placeholder imagery + editorial copy live here so they can be swapped for
// approved Camila Reyes assets later WITHOUT touching component code.
// Each image carries metadata: category, caption and alt text.
// -----------------------------------------------------------------------------

// Optimises a raw image URL for delivery (width + format). Handles both
// Unsplash and Pexels query-param conventions.
export function opt(url, w = 1200) {
  const sep = url.includes('?') ? '&' : '?';
  if (url.includes('pexels')) return `${url}${sep}auto=compress&cs=tinysrgb&w=${w}`;
  return `${url}${sep}auto=format&fit=crop&w=${w}&q=80`;
}

// --- Raw source URLs (grouped for clarity) ----------------------------------
const ED1 = 'https://images.unsplash.com/photo-1579809011670-aa21121f5ec6';
const ED2 = 'https://images.unsplash.com/photo-1602595635615-d3af74c8d56c';
const ED3 = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2';
const ED4 = 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58';
const ED5 = 'https://images.unsplash.com/photo-1667400104797-132f6be037ce';
const ED6 = 'https://images.unsplash.com/photo-1527683040093-3a2b80ed1592';
const ED7 = 'https://images.unsplash.com/photo-1601740289404-6d0dca1bc904';
const PX1 = 'https://images.pexels.com/photos/36305657/pexels-photo-36305657.jpeg';
const PX2 = 'https://images.pexels.com/photos/34726645/pexels-photo-34726645.jpeg';
const PX3 = 'https://images.pexels.com/photos/35644544/pexels-photo-35644544.jpeg';
const PX4 = 'https://images.pexels.com/photos/16408792/pexels-photo-16408792.jpeg';
const PX5 = 'https://images.pexels.com/photos/6467628/pexels-photo-6467628.jpeg';
const TRV1 = 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?crop=entropy&cs=srgb&fm=jpg&q=85';
const TRV2 = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=srgb&fm=jpg&q=85';
const TRV3 = 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?crop=entropy&cs=srgb&fm=jpg&q=85';
const WEL1 = 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?crop=entropy&cs=srgb&fm=jpg&q=85';
const YOG = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&q=85';
const WEL2 = 'https://images.unsplash.com/photo-1562751362-404243c2eea3?crop=entropy&cs=srgb&fm=jpg&q=85';
const WEL3 = 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=srgb&fm=jpg&q=85';
const FIT1 = 'https://images.unsplash.com/photo-1627483298606-cf54c61779a9?crop=entropy&cs=srgb&fm=jpg&q=85';
const FIT2 = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=srgb&fm=jpg&q=85';
const FAS1 = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?crop=entropy&cs=srgb&fm=jpg&q=85';
const FAS2 = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=srgb&fm=jpg&q=85';
const FAS3 = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&q=85';

export const heroImage = opt(ED1, 1800);
export const aboutImage = opt(ED3, 1100);

export const features = [
  {
    key: 'lifestyle',
    title: 'Lifestyle',
    description: 'Slow mornings, cosy corners and the small rituals that make a day feel intentional.',
    image: opt(ED6, 900),
  },
  {
    key: 'fashion',
    title: 'Fashion',
    description: 'Elevated everyday looks, seasonal edits and the accessories that pull it together.',
    image: opt(ED2, 900),
  },
  {
    key: 'fitness',
    title: 'Fitness',
    description: 'Movement as self-care — mindful workouts, wellness rituals and gentle strength.',
    image: opt(FIT1, 900),
  },
  {
    key: 'travel',
    title: 'Travel',
    description: 'Dreamy destinations, hidden corners and the stories collected along the way.',
    image: opt(TRV3, 900),
  },
];

export const latestContent = [
  { category: 'Fashion', title: 'Autumn Layers I’m Loving', date: 'Jun 2, 2025', image: opt(ED4, 800) },
  { category: 'Travel', title: 'A Slow Morning by the Sea', date: 'May 28, 2025', image: opt(TRV1, 800) },
  { category: 'Fitness', title: 'Reset: My Wellness Ritual', date: 'May 21, 2025', image: opt(WEL1, 800) },
  { category: 'Lifestyle', title: 'Blush Tones & Quiet Days', date: 'May 14, 2025', image: opt(ED7, 800) },
  { category: 'Fashion', title: 'Accessories That Elevate', date: 'May 7, 2025', image: opt(FAS1, 800) },
  { category: 'Travel', title: 'Mountains on the Mind', date: 'Apr 30, 2025', image: opt(TRV2, 800) },
];

export const personalityTraits = [
  'Warm', 'Confident', 'Creative', 'Curious', 'Adventurous', 'Approachable', 'Modern',
];

export const categories = {
  lifestyle: {
    key: 'lifestyle',
    title: 'Lifestyle',
    tagline: 'The art of a beautifully ordinary day',
    intro:
      'From quiet coffee rituals to considered interiors, Camila’s lifestyle stories celebrate intention, softness and the joy found in small everyday moments.',
    hero: opt(ED6, 1600),
    grid: [opt(ED6), opt(ED7), opt(ED5), opt(PX4), opt(ED4), opt(PX1)],
  },
  fashion: {
    key: 'fashion',
    title: 'Fashion',
    tagline: 'Elevated everyday, effortlessly styled',
    intro:
      'Seasonal edits, capsule wardrobes and the accessories that finish a look — a refined, feminine take on modern dressing.',
    hero: opt(ED2, 1600),
    grid: [opt(ED2), opt(ED4), opt(FAS1), opt(FAS2), opt(FAS3), opt(PX3)],
  },
  fitness: {
    key: 'fitness',
    title: 'Fitness',
    tagline: 'Movement as a form of self-care',
    intro:
      'Mindful workouts, wellness rituals and gentle strength — a balanced approach to feeling good in body and mind.',
    hero: opt(FIT1, 1600),
    grid: [opt(FIT1), opt(FIT2), opt(WEL1), opt(YOG), opt(WEL2), opt(WEL3)],
  },
  travel: {
    key: 'travel',
    title: 'Travel',
    tagline: 'Collecting stories, one destination at a time',
    intro:
      'Dreamy coastlines, quiet mountain towns and city escapes — travel diaries designed to inspire your next slow adventure.',
    hero: opt(TRV3, 1600),
    grid: [opt(TRV3), opt(TRV1), opt(TRV2), opt(WEL3), opt(PX5), opt(ED1)],
  },
};

export const galleryItems = [
  { id: 'g1', category: 'fashion', src: opt(ED1), alt: 'Editorial look with flowing fabric', caption: 'Movement & fabric' },
  { id: 'g2', category: 'fashion', src: opt(ED2), alt: 'White editorial styling', caption: 'Clean whites' },
  { id: 'g3', category: 'lifestyle', src: opt(ED3), alt: 'Warm natural portrait', caption: 'Golden hour' },
  { id: 'g4', category: 'fashion', src: opt(ED4), alt: 'Warm autumn knitwear', caption: 'Autumn warmth' },
  { id: 'g5', category: 'lifestyle', src: opt(ED5), alt: 'Minimal accessory detail', caption: 'The details' },
  { id: 'g6', category: 'lifestyle', src: opt(ED6), alt: 'Coffee flatlay, cream tones', caption: 'Slow mornings' },
  { id: 'g7', category: 'lifestyle', src: opt(ED7), alt: 'Soft blush flatlay', caption: 'Blush tones' },
  { id: 'g8', category: 'fashion', src: opt(PX1), alt: 'Beige tailored suit with coffee', caption: 'Tailored neutrals' },
  { id: 'g9', category: 'fashion', src: opt(PX3), alt: 'White blazer portrait', caption: 'Sharp & soft' },
  { id: 'g10', category: 'lifestyle', src: opt(PX5), alt: 'Relaxed on a sofa in white', caption: 'At ease' },
  { id: 'g11', category: 'travel', src: opt(TRV1), alt: 'Coastal getaway view', caption: 'By the sea' },
  { id: 'g12', category: 'travel', src: opt(TRV2), alt: 'Mountain landscape', caption: 'High places' },
  { id: 'g13', category: 'travel', src: opt(TRV3), alt: 'Whitewashed coastal village', caption: 'Blue & white' },
  { id: 'g14', category: 'fitness', src: opt(FIT1), alt: 'Workout aesthetic', caption: 'Strong & steady' },
  { id: 'g15', category: 'fitness', src: opt(FIT2), alt: 'Fitness movement', caption: 'In motion' },
  { id: 'g16', category: 'fitness', src: opt(WEL1), alt: 'Wellness ritual', caption: 'Reset' },
  { id: 'g17', category: 'fitness', src: opt(YOG), alt: 'Yoga practice', caption: 'Breathe' },
  { id: 'g18', category: 'fashion', src: opt(FAS1), alt: 'Fashion accessories flatlay', caption: 'Finishing touches' },
  { id: 'g19', category: 'fashion', src: opt(FAS2), alt: 'Seasonal fashion edit', caption: 'Seasonal edit' },
  { id: 'g20', category: 'travel', src: opt(WEL3), alt: 'Serene escape', caption: 'Serenity' },
];

export const galleryFilters = ['All', 'Lifestyle', 'Fashion', 'Fitness', 'Travel'];

export const blogSeed = [
  {
    id: 'b1', slug: 'morning-coffee-with-camila', title: 'Morning Coffee With Camila',
    category: 'Lifestyle', author: 'Camila Reyes', date: 'Jun 2, 2025', readingTime: '4 min read',
    cover: opt(ED6, 1400),
    excerpt: 'The small ritual that anchors my day — and why slow mornings are worth protecting.',
    body: [
      'There is a particular kind of quiet that only exists before the world wakes up. I have learned to guard it fiercely. My morning coffee is less about caffeine and more about ceremony — the warmth of the cup, the light stretching across the counter, a few minutes that belong entirely to me.',
      'I keep it simple: freshly ground beans, a slow pour, and absolutely no screens for the first thirty minutes. It sounds small, but it changes the tone of everything that follows.',
      'If you are trying to build a gentler morning, start with one thing you genuinely look forward to. Protect it. Everything else can wait a little longer than you think.',
    ],
  },
  {
    id: 'b2', slug: 'autumn-fashion-ideas', title: 'Autumn Fashion Ideas',
    category: 'Fashion', author: 'Camila Reyes', date: 'May 26, 2025', readingTime: '5 min read',
    cover: opt(ED4, 1400),
    excerpt: 'Warm layers, soft textures and the transitional pieces I reach for every autumn.',
    body: [
      'Autumn is my favourite season to dress for. The palette shifts to caramel, cream and deep rust, and everything feels a little more considered.',
      'This year I am leaning into texture — chunky knits over silk, a tailored coat thrown over relaxed denim. The trick is contrast: something soft against something structured.',
      'Build around three hero pieces: a great coat, one perfect knit and boots you can walk all day in. Everything else is styling.',
    ],
  },
  {
    id: 'b3', slug: 'fitness-journey', title: 'Fitness Journey',
    category: 'Fitness', author: 'Camila Reyes', date: 'May 19, 2025', readingTime: '6 min read',
    cover: opt(FIT1, 1400),
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
    cover: opt(TRV3, 1400),
    excerpt: 'Notes from a slow escape — blue shutters, warm bread and the beauty of doing very little.',
    body: [
      'The best trips, I have decided, are the ones with the least planned. This one was all whitewashed walls, blue shutters and afternoons that stretched on without agenda.',
      'I wandered without a map, followed the smell of fresh bread, and let the days find their own shape. It was the most rested I have felt in months.',
      'Travel does not have to be a checklist. Sometimes the souvenir is simply a slower heartbeat and a head full of light.',
    ],
  },
];

export const productSeed = [
  { id: 'p1', name: 'Mobile Wallpaper Pack', category: 'Wallpapers', type: 'digital', price: 9, image: opt(ED7, 800), description: '12 hand-picked blush & cream wallpapers for your phone.' },
  { id: 'p2', name: 'Desktop Wallpaper Set', category: 'Wallpapers', type: 'digital', price: 12, image: opt(ED5, 800), description: 'A calm, editorial set of desktop backgrounds in 4K.' },
  { id: 'p3', name: 'Everyday Style Guide (eBook)', category: 'Guides', type: 'digital', price: 19, image: opt(ED2, 800), description: 'Build an effortless capsule wardrobe, step by step.' },
  { id: 'p4', name: '7-Day Wellness Reset', category: 'Guides', type: 'digital', price: 24, image: opt(WEL1, 800), description: 'A gentle week of movement, meals and mindful rituals.' },
  { id: 'p5', name: 'Creator Presets Pack', category: 'Creator Resources', type: 'digital', price: 29, image: opt(FAS1, 800), description: '10 warm, editorial Lightroom presets for a signature look.' },
  { id: 'p6', name: 'Content Planning Template', category: 'Creator Resources', type: 'digital', price: 15, image: opt(ED6, 800), description: 'A ready-to-use Notion template to plan a month of content.' },
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
