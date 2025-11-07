import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstname: z.string().optional(),
  address: z.string().optional(),
  companyName: z.string().optional(),
  gstNumber: z.string().optional()
});


export const registeradminSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});



export const loginUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type RegisteradminSchema = z.infer<typeof registerUserSchema>;
