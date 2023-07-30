import { z } from 'zod';

export const signinInput = z.object({
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
      /[!@#$%^&*()\-=_+{}[\]|:;"'<>,.?/]/,
      { message: 'A senha deve conter pelo menos um caractere especial' },
    ),
});

export type ISignInInput = z.infer<typeof signinInput>;