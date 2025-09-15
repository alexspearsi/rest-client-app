import z from 'zod';

const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(EMAIL_REGEX, 'Invalid email format'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(/\p{L}/u, 'Password must contain at least one letter')
    .regex(/\p{N}/u, 'Password must contain at least one digit')
    .regex(
      /[\p{S}\p{P}]/u,
      'Password must contain at least one special character',
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, 'Name is required'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
