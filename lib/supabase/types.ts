export type NewsletterSubscriber = {
  id: string
  email: string
  consent: boolean
  source: string
  created_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  company: string | null
  category: string
  message: string
  created_at: string
}

export type CollaborationEnquiry = {
  id: string
  name: string
  company: string | null
  email: string
  campaign_type: string
  message: string
  created_at: string
}
