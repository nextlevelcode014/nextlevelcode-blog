'use client'

import { loginUser } from '@/services/api'
import { LoginData } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaLock, FaUser } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { loginSchema } from '@/services/schemas'
import { useAuth } from '@/context/auth-context'
import Link from 'next/link'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()
  const { login } = useAuth()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.token)
      router.push('/')
    },
  })

  const handleLogin = (data: LoginData) => {
    loginMutation.mutate({ email: data.email, password: data.password })
  }

  return (
    <div className="bg-[#242424] p-4 sm:p-6 rounded-lg w-full max-w-[90vw] ml-auto mr-auto mt-auto sm:max-w-md relative mx-4">
      <div className="text-center mb-6 sm:mb-8">
        <FaLock className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
          Restricted Access
        </h2>
        {loginMutation.isError ? (
          <p className="text-xs sm:text-sm text-red-500 mt-2 px-2">
            ❌ Invalid credentials! Please check your email and password.
          </p>
        ) : (
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Login to continue
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-4 sm:space-y-6"
      >
        <div className="relative">
          <FaUser className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
          <input
            {...register('email')}
            placeholder="Email"
            autoComplete="email"
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
            disabled={loginMutation.isPending}
          />
          {errors.email && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <FaLock className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            autoComplete="current-password"
            disabled={loginMutation.isPending}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
          />
          {errors.password && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          {loginMutation.isPending ? 'Authenticating...' : 'Continue'}
        </button>
      </form>

      <div className="pt-4 text-center">
        <Link
          href="/confirm-auth/forgot-password"
          className="text-sm sm:text-base text-blue-500 hover:text-blue-400 transition-colors"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  )
}
