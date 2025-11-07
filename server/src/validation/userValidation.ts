import { z } from 'zod';

// Enums from Prisma schema
const RoleEnum = z.enum(['ADMIN', 'USER']);

// User schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstname: z.string().optional(),
  address: z.string().optional(),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
  role: RoleEnum.default('USER')
});

export const updateUserSchema = z.object({
  firstname: z.string().optional(),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
  address: z.string().optional(),
  role: RoleEnum.optional()
});

// Type exports
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;