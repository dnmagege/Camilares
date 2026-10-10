import { NextResponse } from 'next/server'
import { gallerySeed } from '@/data/content'
import { getSupabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { data, error } = await supabase.from('gallery_items').select('id, category, src, alt, caption').eq('published', true).order('sort_order')
    if (!error && data?.length) return NextResponse.json({ items: data })
    if (error) console.error('Gallery query failed; using reviewed seed content:', error.message)
  }
  return NextResponse.json({ items: gallerySeed })
}
