import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation/contact'
import { sendSiteEmail } from '@/lib/email/send-site-email'

export async function POST(request) {
  const payload = await request.json().catch(() => null)
  const parsed = contactFormSchema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ error: 'Please check the required fields and try again.' }, { status: 400 })
  if (parsed.data.website) return NextResponse.json({ success: true })

  const { name, email, company, subject, message, projectDetails } = parsed.data
  const delivery = await sendSiteEmail({
    to: process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@camilarevelle.com',
    replyTo: email.toLowerCase(),
    subject: `Website enquiry: ${subject}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company / Brand: ${company || 'Not provided'}`,
      `Subject: ${subject}`,
      '',
      message,
      ...(projectDetails ? ['', 'Project details:', projectDetails] : []),
    ].join('\n'),
  })

  if (!delivery.configured) {
    return NextResponse.json({ error: 'Email delivery is not configured yet. Please use the email link on this page.' }, { status: 503 })
  }
  if (!delivery.sent) return NextResponse.json({ error: 'We could not send your message. Please email us directly.' }, { status: 502 })
  return NextResponse.json({ success: true, message: 'Thank you — your message has been emailed to Camila’s team.' }, { status: 200 })
}
