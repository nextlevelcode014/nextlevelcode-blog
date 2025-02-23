'use client'

import { useState } from 'react'
import { apiService } from '@/services/api'
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
    reset,
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) })

  const registerMutation = useMutation({
    mutationFn: apiService.registerUser,
    onSuccess: () => {
      setSuccessMessage(true)
      reset()
      setTimeout(() => router.push('/'), 3000) // Reduzido para 3 segundos
    },
  })

  const handleRegister = (data: RegisterData) => {
    registerMutation.mutate(data)
  }

  return (
    <div className="bg-[#242424] p-4 sm:p-6 rounded-lg w-full max-w-[90vw] ml-auto mr-auto mt-auto sm:max-w-md relative mx-4">
      <div className="text-center mb-6 sm:mb-8">
        <FaUserPlus className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
          Create Account
        </h2>
        {successMessage ? (
          <p className="text-xs sm:text-sm text-green-500 mt-2 px-2">
            ✅ Registration successful! Please check your email to verify your
            account.
          </p>
        ) : registerMutation.isError ? (
          <p className="text-xs sm:text-sm text-red-500 mt-2 px-2">
            ❌ Registration failed. Please check your details and try again.
          </p>
        ) : (
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Join our community
          </p>
        )}
      </div>

      <form
        className="space-y-4 sm:space-y-6"
        onSubmit={handleSubmit(handleRegister)}
      >
        {/* Username Input */}
        <div className="relative">
          <FaUser className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
          <input
            {...register('name')}
            placeholder="Full Name"
            autoComplete="name"
            disabled={registerMutation.isPending}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
          />
          {errors.name && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
          <input
            type="email"
            {...register('email')}
            placeholder="Email Address"
            autoComplete="email"
            disabled={registerMutation.isPending}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
          />
          {errors.email && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
          <FaLock className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            autoComplete="new-password"
            disabled={registerMutation.isPending}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
          />
          {errors.password && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <FaLock className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
          <input
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            autoComplete="new-password"
            disabled={registerMutation.isPending}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
          />
          {errors.confirmPassword && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          {registerMutation.isPending ? 'Creating Account...' : 'Register Now'}
        </button>
      </form>
    </div>
  )
}
