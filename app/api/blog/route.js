import { NextResponse } from 'next/server'
import { blogSeed } from '@/data/content'
import { getSupabaseAdmin } from '@/lib/supabase/server'

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : ''
}

function toPost(row) {
  return {
    id: row.id, slug: row.slug, title: row.title, category: row.category,
    author: row.author, date: formatDate(row.published_at),
    readingTime: `${row.reading_minutes} min read`, excerpt: row.excerpt,
    cover: row.cover_url, body: row.body || [],
  }
}

export async function GET() {
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { data, error } = await supabase.from('blog_posts').select('id, slug, title, category, author, published_at, reading_minutes, excerpt, cover_url, body').eq('published', true).order('published_at', { ascending: false })
    if (!error && data?.length) return NextResponse.json({ posts: data.map(toPost).map(({ body, ...post }) => post) })
    if (error) console.error('Blog query failed; using reviewed seed content:', error.message)
  }
  return NextResponse.json({ posts: blogSeed.map(({ body, ...post }) => post) })
}
