'use client'

import { useState } from 'react'
import { registerUser } from '@/services/api'
import { registerSchema } from '@/services/schemas'
import { RegisterData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaLock, FaUser, FaUserPlus } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

export default function Register() {
  const [successMessage, setSuccessMessage] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) })

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setSuccessMessage(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    },
  })

  const handleRegister = (data: RegisterData) => {
    registerMutation.mutate(data)
  }

  return (
    <div className="bg-[#242424] p-8 rounded-lg w-full max-w-md relative">
      <div className="text-center mb-8">
        <FaUserPlus className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-teal-400">Criar Nova Conta</h2>
        {successMessage ? (
          <p className="text-sm text-green-500 mt-1">
            ✅ Cadastro realizado com sucesso! Redirecionando...
          </p>
        ) : registerMutation.isError ? (
          <p className="text-sm text-red-500 mt-1">
            ❌ Dados inválidos!{' '}
            {registerMutation.error && registerMutation.error.message}
          </p>
        ) : (
          <p className="text-gray-400 mt-2">Junte-se à nossa comunidade!</p>
        )}
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            {...register('name')}
            placeholder="Nome de usuário"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            {...register('email')}
            placeholder="E-mail"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            {...register('password')}
            placeholder="Senha"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirmar senha"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full flex justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiArrowRight className="w-5 h-5" />
          {registerMutation.isPending ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  )
}
