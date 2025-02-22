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
    <div className="bg-[#242424] p-8 rounded-lg w-full max-w-md relative">
      <div className="text-center mb-8">
        <FaLock className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-teal-400">Restricted Access</h2>
        {loginMutation.isError ? (
          <p className="text-sm text-red-500 mt-1">
            ❌ Invalid data!{' '}
            {loginMutation.error && loginMutation.error.message}
          </p>
        ) : (
          <p className="text-gray-400 mt-2">Login to continue</p>
        )}
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            {...register('email', { required: true })}
            placeholder="Username"
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
            {...register('password', { required: true })}
            disabled={loginMutation.isPending}
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiArrowRight className="w-5 h-5" />
          {loginMutation.isPending ? 'Entering...' : 'Enter'}
        </button>
      </form>
      <div className="pt-4">
        <Link
          href="/confirm-auth/forgot-password"
          className="text-blue-600 hover:text-blue-700"
        >
          forgot password
        </Link>
      </div>
    </div>
  )
}
