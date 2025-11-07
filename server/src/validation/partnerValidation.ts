import { z } from 'zod';

// Partner schemas
export const createPartnerSchema = z.object({
  name: z.string().min(1, 'Partner name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  logoUrl: z.string().optional().or(z.literal('')),
  website: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  status: z.string().default('pending'),
  partnerType: z.string().optional().or(z.literal(''))
});

export const updatePartnerSchema = z.object({
  name: z.string().min(1, 'Partner name is required').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.string().optional(),
  partnerType: z.string().nullable().optional()
});

export const updatePartnerStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected'])
});

// Type exports
export type CreatePartnerInput = z.infer<typeof createPartnerSchema>;
export type UpdatePartnerInput = z.infer<typeof updatePartnerSchema>;
export type UpdatePartnerStatusInput = z.infer<typeof updatePartnerStatusSchema>;