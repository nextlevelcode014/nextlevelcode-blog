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
import { useLoginMuation } from '@/services/muations'
import { useEffect } from 'react'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })
  const loginMuation = useLoginMuation()
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = (data: LoginData) => {
    loginMuation.mutate(data)
  }

  useEffect(() => {
    if (loginMuation.data) {
      login(loginMuation.data.token)
      router.push('/')
    }
  }, [loginMuation.isSuccess])
  return (
    <div className="bg-[#242424] p-4 sm:p-6 rounded-lg w-full max-w-[90vw] ml-auto mr-auto mt-auto sm:max-w-md relative mx-4">
      <div className="text-center mb-6 sm:mb-8">
        <FaLock className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
          Restricted Access
        </h2>
        {loginMuation.isError ? (
          <p className="text-xs sm:text-sm text-red-500 mt-2 px-2">
            ❌ Invalid credentials! Please check your email and password.
          </p>
        ) : (
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Login to continue
          </p>
        )}
      </div>

      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        loginMuation={loginMuation}
        errors={errors}
      />
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
