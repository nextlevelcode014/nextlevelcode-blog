import { useMutation } from '@tanstack/react-query'
import { apiService } from './api'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'

export const loginMutation = useMutation({
  mutationFn: apiService.loginUser,
  onSuccess: (data) => {
    const router = useRouter()
    const { login } = useAuth()
    login(data.token)
    router.push('/')
  },
})
