export async function sendSiteEmail({ to, replyTo, subject, text }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  if (!apiKey || !from) return { configured: false, sent: false }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.error('Email delivery provider rejected the message:', response.status)
      return { configured: true, sent: false }
    }

    return { configured: true, sent: true }
  } catch (error) {
    console.error('Email delivery provider request failed:', error instanceof Error ? error.name : 'unknown error')
    return { configured: true, sent: false }
  }
}