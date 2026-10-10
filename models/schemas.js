// -----------------------------------------------------------------------------
// MONGODB DATA MODELS (documentation + lightweight validation)
// -----------------------------------------------------------------------------
// MongoDB is schema-less, but we document expected shapes here so the data
// layer stays clean and the database can be migrated later if required.
// Every document uses a string UUID `id` (NOT Mongo's ObjectId) for portability.
// -----------------------------------------------------------------------------

export const collections = {
  users: 'users',
  profiles: 'profiles',
  newsletter: 'newsletter_subscribers',
  contact: 'contact_messages',
  collaborations: 'collaboration_enquiries',
  blog: 'blog_posts',
  gallery: 'gallery_items',
  products: 'products',
  memberships: 'memberships',
  premiumContent: 'premium_content',
  analytics: 'analytics_events',
};

// Shapes are for reference/documentation.
export const schemas = {
  User: { id: 'uuid', email: 'string', name: 'string', role: 'user|member|admin', createdAt: 'date' },
  Profile: { id: 'uuid', userId: 'uuid', displayName: 'string', avatarUrl: 'string', bio: 'string' },
  NewsletterSubscriber: { id: 'uuid', email: 'string', consent: 'boolean', source: 'string', createdAt: 'date' },
  ContactMessage: { id: 'uuid', name: 'string', email: 'string', company: 'string', category: 'string', message: 'string', createdAt: 'date' },
  CollaborationEnquiry: { id: 'uuid', name: 'string', company: 'string', email: 'string', campaignType: 'string', message: 'string', createdAt: 'date' },
  BlogPost: { id: 'uuid', slug: 'string', title: 'string', category: 'string', author: 'string', date: 'string', readingTime: 'string', cover: 'string', excerpt: 'string', body: 'string[]' },
  GalleryItem: { id: 'uuid', category: 'string', src: 'string', alt: 'string', caption: 'string' },
  Product: { id: 'uuid', name: 'string', category: 'string', type: 'digital|physical', price: 'number', image: 'string', description: 'string' },
  Membership: { id: 'uuid', userId: 'uuid', tier: 'string', status: 'active|cancelled', startedAt: 'date' },
  PremiumContent: { id: 'uuid', title: 'string', body: 'string', tier: 'string', publishedAt: 'date' },
  AnalyticsEvent: { id: 'uuid', event: 'string', meta: 'object', createdAt: 'date' },
};

export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
