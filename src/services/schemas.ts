// src/schemas/auth.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const registerSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'A senha deve conter pelo menos um caractere especial',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'], // Indica onde o erro deve ser exibido
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido!'),
})

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, 'A senha atual deve ter pelo menos 6 caracteres'),
    newPassword: z
      .string()
      .min(6, 'A nova senha deve ter pelo menos 6 caracteres')
      .max(60),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'As senhas não coincidem',
    path: ['newPasswordConfirm'],
  })

export const changeUsernameSchema = z.object({
  password: z.string().min(6, 'A senha atual deve ter pelo menos 6 caracteres'),
  name: z
    .string()
    .min(6, 'A nova senha deve ter pelo menos 6 caracteres')
    .max(10),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
