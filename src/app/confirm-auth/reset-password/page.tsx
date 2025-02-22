// app/reset-password/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaLock, FaCheck } from 'react-icons/fa'
import { resetPasswordSchema } from '@/services/schemas'
import { ResetPasswordData } from '@/types'
import { api_url } from '@/services/api'
import { useState } from 'react'

export default function ResetPasswordPage() {
  const [successMessage, setSuccessMessage] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const token = useSearchParams().get('token')

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordData) =>
      axios.post(`${api_url}/auth/reset-password`, {
        ...data,
        token: token,
      }),
    onSuccess: () => {
      setSuccessMessage(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    },
  })

  const onSubmit = (data: ResetPasswordData) => {
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-400">
            Redefinir Senha
          </h2>
          {successMessage ? (
            <p className="mt-2 text-center text-sm text-green-600">
              ✅ Sucesso!
            </p>
          ) : (
            <p className="mt-2 text-center text-sm text-gray-600">
              Digite sua nova senha.
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="newPassword" className="sr-only">
                Nova Senha
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="newPassword"
                  {...register('newPassword')}
                  placeholder="Nova senha"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-[#242424] border-gray-300 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirme a Senha
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  placeholder="Confirme a senha"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-[#242424] border-gray-300 placeholder-gray-500 text-gray-300 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaCheck className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
              </span>
              {mutation.isPending ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
