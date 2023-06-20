"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = void 0;
const zod_1 = require("zod");
const UserZodSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'O nome é obrigatório',
        invalid_type_error: 'O nome deve ser uma string',
    })
        .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
    surname: zod_1.z.string({
        required_error: 'O sobrenome é obrigatório',
        invalid_type_error: 'O sobrenome deve ser uma string',
    })
        .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres' })
        .optional(),
    email: zod_1.z.string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'Email deve ser uma string',
    })
        .email({ message: 'Endereço de Email inválido' }),
    password: zod_1.z.string({
        required_error: 'Senha é obrigatório',
        invalid_type_error: 'Senha deve ser uma string',
    })
        .min(8, { message: 'Senha deve ter 8 caracteres ou mais' })
        .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
        .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
        .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' }),
    role: zod_1.z.string({
        required_error: 'A função é obrigatória',
        invalid_type_error: 'A função deve ser uma string',
    })
        .default('user')
        .optional(),
});
exports.UserZodSchema = UserZodSchema;
