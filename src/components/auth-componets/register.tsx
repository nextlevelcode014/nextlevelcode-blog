'use client'

import { useEffect, useState } from 'react'
import { registerSchema } from '@/services/schemas'
import { RegisterData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import RegisterForm from './register-form'
import { useRegisterMutation } from '@/services/muations'
import { FaUserPlus } from 'react-icons/fa'

export default function Register() {
  const [successMessage, setSuccessMessage] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const registerMutation = useRegisterMutation()

  const handleRegister = async (data: RegisterData) => {
    registerMutation.mutate(data)
  }

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setSuccessMessage(true)
      reset()
      const timer = setTimeout(() => router.push('/'), 3000)
      return () => clearTimeout(timer)
    }
  }, [registerMutation.isSuccess, reset, router])

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

      <RegisterForm
        registerMutation={registerMutation}
        register={register}
        handleSubmit={handleSubmit}
        handleRegister={handleRegister}
        errors={errors}
      />
    </div>
  )
}
