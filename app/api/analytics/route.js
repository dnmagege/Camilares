import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase/server'

const eventSchema = z.object({
  event: z.string().trim().min(1).max(80),
  meta: z.record(z.unknown()).optional().default({}),
})

export async function POST(request) {
  const payload = await request.json().catch(() => null)
  const parsed = eventSchema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid analytics event.' }, { status: 400 })

  const supabase = getSupabaseAdmin()
  if (!supabase) return NextResponse.json({ success: true, skipped: true })

  const { error } = await supabase.from('analytics_events').insert(parsed.data)
  if (error) {
    console.error('Analytics persistence failed:', error.message)
    return NextResponse.json({ success: false }, { status: 500 })
  }
  return NextResponse.json({ success: true }, { status: 202 })
}
