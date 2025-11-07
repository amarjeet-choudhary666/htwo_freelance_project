import { z } from 'zod';

// Category schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional()
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').optional(),
  description: z.string().nullable().optional()
});

// CategoryType schemas
export const createCategoryTypeSchema = z.object({
  name: z.string().min(1, 'Category type name is required'),
  categoryId: z.number().int().positive('Category ID is required')
});

export const updateCategoryTypeSchema = z.object({
  name: z.string().min(1, 'Category type name is required').optional(),
  categoryId: z.number().int().positive('Category ID is required').optional()
});

// Type exports
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateCategoryTypeInput = z.infer<typeof createCategoryTypeSchema>;
export type UpdateCategoryTypeInput = z.infer<typeof updateCategoryTypeSchema>;