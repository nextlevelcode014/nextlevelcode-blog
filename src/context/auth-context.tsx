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
import { apiService } from '@/services/api'
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
  const [token, setToken] = useState<string | null>('')

  const query = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      if (!token) return null
      return await apiService.getMe()
    },
    enabled: !!token,
  })

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    setToken(savedToken || null)
  }, [])

  const login = (newToken: string) => {
    console.log(newToken)
    localStorage.setItem('token', newToken)
    setToken(newToken)
    router.push('/')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
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
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return context
}
