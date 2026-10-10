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

export async function GET(_request, { params }) {
  const { slug } = await params
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { data, error } = await supabase.from('blog_posts').select('id, slug, title, category, author, published_at, reading_minutes, excerpt, cover_url, body').eq('published', true).eq('slug', slug).maybeSingle()
    if (data) {
      const { data: relatedData } = await supabase.from('blog_posts').select('id, slug, title, category, author, published_at, reading_minutes, excerpt, cover_url').eq('published', true).eq('category', data.category).neq('slug', slug).limit(3)
      return NextResponse.json({ post: toPost(data), related: (relatedData || []).map(toPost) })
    }
    if (error) console.error('Blog detail query failed; using reviewed seed content:', error.message)
  }

  const post = blogSeed.find((item) => item.slug === slug)
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  const related = blogSeed.filter((item) => item.category === post.category && item.slug !== slug).slice(0, 3).map(({ body, ...item }) => item)
  return NextResponse.json({ post, related })
}
