/* eslint-disable max-len */
import { z } from 'zod';

const UserZodSchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome deve ser uma string',
  })
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Não é permitido uso de números e caracteres especiais em nome.' }),

  surname: z.string({
    required_error: 'O sobrenome é obrigatório',
    invalid_type_error: 'O sobrenome deve ser uma string',
  })
    .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Não é permitido uso de números e caracteres especiais em sobrenome.' }),
    
  email: z.string({
    required_error: 'Email é obrigatório',
    invalid_type_error: 'Email deve ser uma string',
  })
    .email({ message: 'Endereço de Email inválido' }),

  password: z.string({
    required_error: 'Senha é obrigatório',
    invalid_type_error: 'Senha deve ser uma string',
  })
    .min(8, { message: 'Senha deve ter entre 8 e 12 caracteres' })
    .max(12, { message: 'Senha deve ter entre 8 e 12 caracteres' })
    .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
    .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
      { message: 'A senha deve conter pelo menos um caractere especial' },
    ),

  role: z.string({
    required_error: 'A função é obrigatória',
    invalid_type_error: 'A função deve ser uma string',
  })
    .default('user')
    .optional(),
});

export type IUser = z.infer<typeof UserZodSchema>;

export { UserZodSchema };