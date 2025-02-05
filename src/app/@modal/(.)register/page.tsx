'use client'
import Modal from '@/components/model'
import { FaEnvelope, FaLock, FaTimes, FaUser, FaUserPlus } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

type SingUpFormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function InterceptedRegisterPage() {
  // const { register, handleSubmit } = useForm<SingUpFormData>()

  // const handleRegister = (data: SingUpFormData) => {
  //   console.log('Dados do registro:', data)
  //   setShowRegisterModal(false)
  // }

  return (
    <Modal>
      <div className="bg-[#242424] p-8 rounded-lg w-full max-w-md relative">
        <div className="text-center mb-8">
          <FaUserPlus className="w-12 h-12 text-teal-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-teal-400">Criar Nova Conta</h2>
          <p className="text-gray-400 mt-2">Junte-se à nossa comunidade</p>
        </div>
        <form className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              // {...register('username', { required: true })}
              placeholder="Nome de usuário"
              className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              // {...register('email', { required: true })}
              placeholder="E-mail"
              className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              // {...register('password', { required: true })}
              placeholder="Senha"
              className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition-colors"
          >
            <FiArrowRight className="w-5 h-5" />
            Registrar
          </button>
        </form>
      </div>
    </Modal>
  )
}
