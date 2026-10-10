// Public-facing editorial content only. Private/unreviewed originals live in
// the git-ignored private-media folder and must never be referenced here.
import { publicCategoryImages } from './public-image-manifest'
import { heroImages } from './hero-image-manifest'
import { blogSeed } from './journal'

export { heroImages, blogSeed }

const AUTUMN_CAFE = '/camila/lifestyle/autumn-cafe.jpg'
const AUTUMN_ONE = '/camila/lifestyle/autumn-1.webp'
const AUTUMN_TWO = '/camila/lifestyle/autumn-2.webp'
const AUTUMN_PARK = '/camila/lifestyle/autumn-park.webp'
const CHRISTMAS_MARKET = '/camila/lifestyle/christmas-market.webp'
const SNOWY_CAFE = '/camila/lifestyle/snowy-cafe.webp'
const HOLIDAY_MARKET = '/camila/lifestyle/holiday-market.webp'
const WINTER_WALK = '/camila/lifestyle/winter-walk.webp'
const SNOWY_COFFEE = '/camila/lifestyle/snowy-coffee.webp'
const RAINY_STREET = '/camila/fashion/rainy-street.jpg'
const FASHION_CAFE = '/camila/fashion/p09.jpg'
const FITNESS_STRENGTH = '/camila/fitness/gym-4.webp'
const FITNESS_DUMBBELLS = '/camila/fitness/gym-1.webp'
const FITNESS_MACHINE = '/camila/fitness/gym-2.webp'
const FITNESS_RECOVERY = '/camila/fitness/gym-3.webp'
const FITNESS_FORM = '/camila/fitness/gym-4.webp'
const FITNESS_STEPUP = '/camila/fitness/gym-6.webp'
const TRAVEL_POSITANO = '/camila/travel/travel1.webp'
const TRAVEL_CITY = '/camila/travel/travel3.webp'

const TRAVEL_COAST = TRAVEL_POSITANO
const TRAVEL_LAKE = TRAVEL_CITY
const TRAVEL_PARK = TRAVEL_CITY
const TRAVEL_BEACH = TRAVEL_POSITANO
const TRAVEL_SAILING = TRAVEL_CITY
const COFFEE = AUTUMN_CAFE
const BOOKS = SNOWY_COFFEE
const FITNESS = FITNESS_STEPUP

export const categoryTitles = {
  fashion: 'Fashion',
  fitness: 'Fitness',
  lifestyle: 'Lifestyle',
  'private-review': 'Private Review',
  travel: 'Travel',
  unclassified: 'Other',
}

export const heroImage = heroImages[0].src
export const aboutImage = WINTER_WALK
export const homeAboutImage = AUTUMN_TWO
export const homePremiumImage = CHRISTMAS_MARKET

export const galleryHeroImage = TRAVEL_SAILING
export const blogHeroImage = BOOKS
export const shopHeroImage = SNOWY_COFFEE
export const contactHeroImage = HOLIDAY_MARKET
export const premiumHeroImage = AUTUMN_PARK
export const aboutGalleryImages = [RAINY_STREET, TRAVEL_COAST, AUTUMN_CAFE]

export const features = [
  { key: 'lifestyle', title: categoryTitles.lifestyle, description: 'Slow mornings, cosy corners and the small rituals that make a day feel intentional.', image: AUTUMN_ONE },
  { key: 'fashion', title: categoryTitles.fashion, description: 'Thoughtful layers, refined details and elevated everyday styling.', image: FASHION_CAFE },
  { key: 'fitness', title: categoryTitles.fitness, description: 'Movement as self-care — mindful workouts, wellness rituals and gentle strength.', image: FITNESS_RECOVERY },
  { key: 'travel', title: categoryTitles.travel, description: 'Dreamy destinations, hidden corners and stories collected along the way.', image: TRAVEL_POSITANO },
]

export const latestContent = blogSeed.map((post) => ({
  slug: post.slug,
  category: post.category,
  title: post.title,
  date: post.date,
  image: post.cover,
}))

export const personalityTraits = ['Warm', 'Confident', 'Creative', 'Curious', 'Adventurous', 'Approachable', 'Modern']

const publicSourcesFor = (category, hero, excludedSources = []) =>
  publicCategoryImages[category]
    .map((image) => image.src)
    .filter((src) => src !== hero && !excludedSources.includes(src))

export const categories = {
  lifestyle: {
    key: 'lifestyle', title: categoryTitles.lifestyle, tagline: 'The art of a beautifully ordinary day',
    intro: 'Quiet coffee rituals, cosy corners and the joy found in small everyday moments.',
    hero: AUTUMN_CAFE, grid: publicSourcesFor('lifestyle', AUTUMN_CAFE),
  },
  fashion: {
    key: 'fashion', title: categoryTitles.fashion, tagline: 'Elevated everyday, thoughtfully styled',
    intro: 'A refined, wearable take on modern dressing, considered layers and timeless details.',
    hero: RAINY_STREET, grid: publicSourcesFor('fashion', RAINY_STREET),
  },
  fitness: {
    key: 'fitness', title: categoryTitles.fitness, tagline: 'Movement as a form of self-care',
    intro: 'Mindful movement, wellness rituals and gentle strength — a balanced approach to feeling good.',
    hero: FITNESS_STRENGTH, grid: publicSourcesFor('fitness', FITNESS_STRENGTH),
  },
  travel: {
    key: 'travel', title: categoryTitles.travel, tagline: 'Collecting stories, one destination at a time',
    intro: 'Dreamy coastlines, quiet corners and city escapes for your next slow adventure.',
    hero: TRAVEL_CITY, grid: publicSourcesFor('travel', TRAVEL_CITY),
  },
}

export const galleryItems = Object.entries(publicCategoryImages).flatMap(([category, images]) =>
  images.map((image) => ({
    id: image.id,
    category,
    src: image.src,
    alt: image.alt,
    caption: image.caption,
  }))
)

export const galleryFilters = ['All', categoryTitles.fashion, categoryTitles.fitness, categoryTitles.lifestyle, categoryTitles.travel, categoryTitles.unclassified]

export const productSeed = [
  { id: 'p1', name: 'Slow Morning Guide', category: 'Guides', type: 'digital', price: 9, image: COFFEE, description: 'A practical, gentle guide to building a calmer morning routine.' },
  { id: 'p2', name: 'Everyday Style Notes', category: 'Guides', type: 'digital', price: 19, image: RAINY_STREET, description: 'A concise guide to thoughtful layers and a versatile wardrobe.' },
  { id: 'p3', name: 'Mindful Movement Planner', category: 'Wellness', type: 'digital', price: 14, image: FITNESS, description: 'A flexible planner for a balanced week of movement and rest.' },
  { id: 'p4', name: 'Travel Journal Pages', category: 'Travel', type: 'digital', price: 12, image: TRAVEL_COAST, description: 'Printable prompts for collecting the details of a trip.' },
]

export const gallerySeed = galleryItems

export const premiumBenefits = [
  { title: 'Exclusive Editorials', description: 'Extended stories and carefully produced content for the separate premium community.' },
  { title: 'Behind The Scenes', description: 'Creative process notes and selected outtakes from public editorial projects.' },
  { title: 'Early Access', description: 'Preview public releases and digital guides before they appear on the main site.' },
  { title: 'Community Updates', description: 'Personal notes and monthly updates from the creator team.' },
]
