import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email(),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  subject: z.string().trim().min(3).max(180),
  message: z.string().trim().min(10).max(5000),
  projectDetails: z.string().trim().max(5000).optional().or(z.literal('')),
  website: z.string().max(0).optional().default(''),
})

export const newsletterSchema = z.object({
  email: z.string().trim().email(),
  source: z.string().trim().max(100).optional(),
  consent: z.boolean().refine((value) => value === true, {
    message: 'Consent is required',
  }),
})

export const collabSchema = z.object({
  name: z.string().trim().min(2).max(150),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  email: z.string().trim().email(),
  campaignType: z.string().min(1).max(200).default('Brand collaboration'),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().default(''),
})
