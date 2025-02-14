// context/AuthContext.tsx
'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getMe } from '@/services/api'
import { User } from '@/types'

interface AuthContextType {
  isAuthenticated: boolean
  query: UseQueryResult<User | null, Error>
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  // Busca os dados do usuário usando o token
  const query = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      if (!token) return null
      return await getMe(token)
    },
    enabled: !!token,
  })

  // Inicializa o token do localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    setToken(savedToken || null)
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    query.refetch()
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        query,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
