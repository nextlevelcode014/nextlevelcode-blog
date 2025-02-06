import Modal from '@/components/model'
import { FaLock, FaTimes, FaUser } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

type AuthFormData = {
  username: string
  password: string
}
interface LoginProps {
  setShowLoginModal: (value: boolean) => void
}

export const Login = () => {
  // const { register, handleSubmit } = useForm<AuthFormData>()
  // const handleLogin = (data: AuthFormData) => {
  //   console.log('Dados do login:', data)
  //   setShowLoginModal(false)
  // }
  return (
    <div className="bg-[#242424] p-8 rounded-lg w-full max-w-md relative">
      <div className="text-center mb-8">
        <FaLock className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-teal-400">Acesso Restrito</h2>
        <p className="text-gray-400 mt-2">Entre para continuar</p>
      </div>
      <form className="space-y-6">
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            placeholder="Nome de usuário"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Senha"
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition-colors"
        >
          <FiArrowRight className="w-5 h-5" />
          Entrar
        </button>
      </form>
    </div>
  )
}
