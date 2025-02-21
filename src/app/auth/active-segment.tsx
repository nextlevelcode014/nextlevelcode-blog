'use client'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode } from 'react'

export default function ActiveSegment({
  login,
  register,
}: {
  login: ReactNode
  register: ReactNode
}) {
  const activeSegment = useSelectedLayoutSegment()
  const router = usePathname()
  const isHome = router === '/auth'

  const isValidRoute =
    isHome ||
    ['login', 'register', 'auth', 'verify-email'].includes(activeSegment || '')

  return (
    <>
      {isValidRoute ? (
        <>
          {activeSegment === 'login' && login}
          {isHome && login}
          {activeSegment === 'register' && register}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500">
          <h1 className="text-2xl font-bold">Página não encontrada</h1>
          <p className="text-gray-400">
            A página que você tentou acessar não existe.
          </p>
          <Link
            href="/"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Voltar para Home
          </Link>
        </div>
      )}
    </>
  )
}
