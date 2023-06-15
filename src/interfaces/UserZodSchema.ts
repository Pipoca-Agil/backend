import { z } from 'zod';

const UserZodSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
    .min(3, { message: 'Name must be 3 or more characters long' }),

  surname: z.string({
    required_error: 'Surname is required',
    invalid_type_error: 'Surname must be a string',
  })
    .min(3, { message: 'Surname must be 3 or more characters long' })
    .optional(),

  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
    .email({ message: 'Invalid email address' }),

  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
    .min(8, { message: 'Password must be 8 or more characters long' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' }),

  role: z.string({
    required_error: 'Role is required',
    invalid_type_error: 'Role must be a string',
  })
    .default('user')
    .optional(),
});

export type IUser = z.infer<typeof UserZodSchema>;

export { UserZodSchema };