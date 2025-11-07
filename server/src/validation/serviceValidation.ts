import { z } from 'zod';

// Enums from Prisma schema
const PriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);

// Service schemas
export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  categoryId: z.number().int().positive().optional(),
  categoryTypeId: z.number().int().positive().optional(),
  description: z.string().optional(),
  monthlyPrice: z.number().positive().optional(),
  yearlyPrice: z.number().positive().optional(),
  imageUrl: z.string().url().optional(),
  features: z.array(z.string()).default([]),
  status: z.string().default('active'),
  priority: PriorityEnum.default('LOW'),
  ram: z.string().default(''),
  storage: z.string().default('')
});

export const updateServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').optional(),
  categoryId: z.number().int().positive().nullable().optional(),
  categoryTypeId: z.number().int().positive().nullable().optional(),
  description: z.string().nullable().optional(),
  monthlyPrice: z.number().positive().nullable().optional(),
  yearlyPrice: z.number().positive().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  features: z.array(z.string()).optional(),
  status: z.string().optional(),
  priority: PriorityEnum.optional(),
  ram: z.string().optional(),
  storage: z.string().optional()
});

// Type exports
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;