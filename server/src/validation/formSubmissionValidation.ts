import { z } from 'zod';

// FormSubmission schemas
export const createFormSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  type: z.enum(['demo', 'contact', 'get_in_touch']),
  status: z.string().default('pending'),
  userId: z.number().int().positive().optional()
});

export const updateFormSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().nullable().optional(),
  service: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  type: z.string().optional(),
  status: z.string().optional()
});

// Type exports
export type CreateFormSubmissionInput = z.infer<typeof createFormSubmissionSchema>;
export type UpdateFormSubmissionInput = z.infer<typeof updateFormSubmissionSchema>;