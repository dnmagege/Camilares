import { NextResponse } from 'next/server'
import { productSeed } from '@/data/content'
import { getSupabaseAdmin } from '@/lib/supabase/server'

function toProduct(row) {
  return { id: row.id, name: row.name, category: row.category, type: row.product_type, price: Number(row.price), image: row.image, description: row.description }
}

export async function GET(_request, { params }) {
  const { id } = await params
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { data, error } = await supabase.from('products').select('id, name, category, product_type, price, image, description').eq('active', true).eq('id', id).maybeSingle()
    if (data) return NextResponse.json({ product: toProduct(data) })
    if (error) console.error('Product query failed; using reviewed seed content:', error.message)
  }
  const product = productSeed.find((item) => item.id === id)
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  return NextResponse.json({ product })
}
