import { NextResponse } from 'next/server'
import { collabSchema } from '@/lib/validation/contact'
import { sendSiteEmail } from '@/lib/email/send-site-email'

export async function POST(request) {
  const payload = await request.json().catch(() => null)
  const parsed = collabSchema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ error: 'Please check the required fields and try again.' }, { status: 400 })
  if (parsed.data.website) return NextResponse.json({ success: true })
  const { name, company, email, campaignType, message } = parsed.data
  const delivery = await sendSiteEmail({
    to: process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@camilarevelle.com',
    replyTo: email.toLowerCase(),
    subject: `Collaboration enquiry: ${campaignType}`,
    text: [
      `Name: ${name}`,
      `Company: ${company || 'Not provided'}`,
      `Email: ${email}`,
      `Campaign type: ${campaignType}`,
      '',
      message,
    ].join('\n'),
  })
  if (!delivery.configured) {
    return NextResponse.json({ error: 'Email delivery is not configured yet. Please use the email link on this page.' }, { status: 503 })
  }
  if (!delivery.sent) return NextResponse.json({ error: 'We could not send your enquiry. Please email us directly.' }, { status: 502 })
  return NextResponse.json({ success: true, message: 'Thank you — your enquiry has been emailed to Camila’s team.' }, { status: 200 })
}
