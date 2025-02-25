'use client'

import { LoginData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaLock, FaUser } from 'react-icons/fa'
import { loginSchema } from '@/services/schemas'
import Link from 'next/link'
import LoginForm from './login-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useEffect } from 'react'
import { useLoginMutation } from '@/services/muations'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const loginMutation = useLoginMutation()
  const { login } = useAuth()

  const handleLogin = async (data: LoginData) => {
    try {
      const result = await loginMutation.mutateAsync(data)

      if (result.token) {
        login(result.token)
      }
    } catch (error) {
      return
    }
  }

  // useEffect(() => {
  //   // Fecha o menu de usuário se estiver aberto
  //   return () => {
  //     if (loginMutation.isError) {
  //       loginMutation.reset()
  //     }
  //   }
  // }, [])

  return (
    <div className="bg-[#242424] p-4 sm:p-6 rounded-lg w-full max-w-[90vw] mx-auto mt-8 sm:max-w-md">
      <div className="text-center mb-6 sm:mb-8">
        <FaLock className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
          Restricted Access
        </h2>
        {loginMutation.isError && (
          <p className="text-xs sm:text-sm text-red-500 mt-2 px-2">
            ❌ Invalid credentials! Please check your email and password.
          </p>
        )}
      </div>

      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        loginMutation={loginMutation}
        errors={errors}
      />

      <div className="pt-4 text-center space-y-2">
        <Link
          href="/confirm-auth/forgot-password"
          className="block text-sm sm:text-base text-blue-500 hover:text-blue-400 transition-colors"
        >
          Forgot your password?
        </Link>
        <span className="block text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="text-blue-500 hover:text-blue-400"
          >
            Sign up
          </Link>
        </span>
      </div>
    </div>
  )
}
