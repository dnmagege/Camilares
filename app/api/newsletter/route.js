import { NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/validation/contact'
import { getSupabaseAdmin } from '@/lib/supabase/server'

export async function POST(request) {
  const payload = await request.json().catch(() => null)
  const parsed = newsletterSchema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ error: 'A valid email and consent are required.' }, { status: 400 })

  const supabase = getSupabaseAdmin()
  if (!supabase) return NextResponse.json({ error: 'Newsletter signups are temporarily unavailable.' }, { status: 503 })

  const { email, source } = parsed.data
  const { error } = await supabase.from('newsletter_subscribers').upsert({
    email: email.toLowerCase(), consent: true, source: source || 'website', consented_at: new Date().toISOString(),
  }, { onConflict: 'email', ignoreDuplicates: true })
  if (error) {
    console.error('Newsletter persistence failed:', error.message)
    return NextResponse.json({ error: 'We could not save your signup. Please try again later.' }, { status: 500 })
  }
  return NextResponse.json({ success: true, message: 'Welcome! You are on the list.' }, { status: 201 })
}
