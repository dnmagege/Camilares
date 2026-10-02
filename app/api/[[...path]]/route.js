import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { blogSeed, gallerySeed, productSeed } from '@/data/content'
import { collections, isValidEmail } from '@/models/schemas'

// --- MongoDB connection (singleton) -----------------------------------------
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

const json = (data, status = 200) => handleCORS(NextResponse.json(data, { status }))
const clean = (docs) => docs.map(({ _id, ...rest }) => rest)

// Seed a collection from static data if it is empty.
async function ensureSeeded(db, name, seed) {
  const count = await db.collection(name).countDocuments()
  if (count === 0 && seed?.length) {
    await db.collection(name).insertMany(seed.map((d) => ({ ...d })))
  }
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Health / root
    if ((route === '/' || route === '/root') && method === 'GET') {
      return json({ message: 'Camila Reyes API', status: 'ok' })
    }

    // --- Public brand config ------------------------------------------------
    if (route === '/config' && method === 'GET') {
      return json({
        name: process.env.NEXT_PUBLIC_CAMILA_NAME || 'Camila Reyes',
        contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@camilares.com',
        premiumUrl: process.env.NEXT_PUBLIC_PREMIUM_URL || 'https://premium.camilares.com',
        social: {
          instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/camilares',
          tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@camilares',
          youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@camilares',
          pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com/camilares',
          x: process.env.NEXT_PUBLIC_X_URL || 'https://x.com/camilares',
        },
      })
    }

    // --- Newsletter ---------------------------------------------------------
    if (route === '/newsletter' && method === 'POST') {
      const body = await request.json()
      if (!isValidEmail(body.email)) return json({ error: 'A valid email is required' }, 400)
      if (!body.consent) return json({ error: 'Consent is required' }, 400)
      const existing = await db.collection(collections.newsletter).findOne({ email: body.email.toLowerCase() })
      if (existing) return json({ success: true, message: 'You are already subscribed.' })
      const doc = {
        id: uuidv4(),
        email: body.email.toLowerCase(),
        consent: true,
        source: body.source || 'website',
        createdAt: new Date(),
      }
      await db.collection(collections.newsletter).insertOne(doc)
      return json({ success: true, message: 'Welcome! You are on the list.' })
    }
    if (route === '/newsletter' && method === 'GET') {
      const subs = await db.collection(collections.newsletter).find({}).limit(1000).toArray()
      return json({ count: subs.length, subscribers: clean(subs) })
    }

    // --- Contact ------------------------------------------------------------
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      if (!body.name || !isValidEmail(body.email) || !body.message) {
        return json({ error: 'Name, a valid email and a message are required' }, 400)
      }
      const doc = {
        id: uuidv4(),
        name: body.name,
        email: body.email.toLowerCase(),
        company: body.company || '',
        category: body.category || 'General enquiry',
        message: body.message,
        createdAt: new Date(),
      }
      await db.collection(collections.contact).insertOne(doc)
      return json({ success: true, message: 'Thank you — your message has been received.' })
    }

    // --- Brand collaboration / business enquiries ---------------------------
    if (route === '/collab' && method === 'POST') {
      const body = await request.json()
      if (!body.name || !isValidEmail(body.email) || !body.message) {
        return json({ error: 'Name, a valid email and a message are required' }, 400)
      }
      const doc = {
        id: uuidv4(),
        name: body.name,
        company: body.company || '',
        email: body.email.toLowerCase(),
        campaignType: body.campaignType || 'General',
        budget: body.budget || '',
        message: body.message,
        createdAt: new Date(),
      }
      await db.collection('collaboration_enquiries').insertOne(doc)
      return json({ success: true, message: 'Thank you — your enquiry has been received. Camila’s team will be in touch shortly.' })
    }

    // --- Blog ---------------------------------------------------------------
    if (route === '/blog' && method === 'GET') {
      await ensureSeeded(db, collections.blog, blogSeed)
      const posts = await db.collection(collections.blog).find({}).toArray()
      const list = clean(posts).map(({ body, ...rest }) => rest)
      return json({ posts: list })
    }
    if (route.startsWith('/blog/') && method === 'GET') {
      await ensureSeeded(db, collections.blog, blogSeed)
      const slug = path[1]
      const post = await db.collection(collections.blog).findOne({ slug })
      if (!post) return json({ error: 'Post not found' }, 404)
      const related = await db.collection(collections.blog)
        .find({ category: post.category, slug: { $ne: slug } }).limit(3).toArray()
      return json({ post: clean([post])[0], related: clean(related).map(({ body, ...r }) => r) })
    }

    // --- Gallery ------------------------------------------------------------
    if (route === '/gallery' && method === 'GET') {
      await ensureSeeded(db, collections.gallery, gallerySeed)
      const items = await db.collection(collections.gallery).find({}).toArray()
      return json({ items: clean(items) })
    }

    // --- Products -----------------------------------------------------------
    if (route === '/products' && method === 'GET') {
      await ensureSeeded(db, collections.products, productSeed)
      const items = await db.collection(collections.products).find({}).toArray()
      return json({ products: clean(items) })
    }
    if (route.startsWith('/products/') && method === 'GET') {
      await ensureSeeded(db, collections.products, productSeed)
      const product = await db.collection(collections.products).findOne({ id: path[1] })
      if (!product) return json({ error: 'Product not found' }, 404)
      return json({ product: clean([product])[0] })
    }

    // --- Analytics (event tracking placeholder) -----------------------------
    if (route === '/analytics' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      await db.collection(collections.analytics).insertOne({
        id: uuidv4(),
        event: body.event || 'unknown',
        meta: body.meta || {},
        createdAt: new Date(),
      })
      return json({ success: true })
    }

    return json({ error: `Route ${route} not found` }, 404)
  } catch (error) {
    console.error('API Error:', error)
    return json({ error: 'Internal server error' }, 500)
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
