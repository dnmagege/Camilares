import { NextResponse } from 'next/server'
import { productSeed } from '@/data/content'
import { getSupabaseAdmin } from '@/lib/supabase/server'

function toProduct(row) {
  return { id: row.id, name: row.name, category: row.category, type: row.product_type, price: Number(row.price), image: row.image, description: row.description }
}

export async function GET() {
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { data, error } = await supabase.from('products').select('id, name, category, product_type, price, image, description').eq('active', true).order('created_at')
    if (!error && data?.length) return NextResponse.json({ products: data.map(toProduct) })
    if (error) console.error('Products query failed; using reviewed seed content:', error.message)
  }
  return NextResponse.json({ products: productSeed })
}
