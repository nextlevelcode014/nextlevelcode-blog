'use client'
import Link from 'next/link'
import {
  redirect,
  usePathname,
  useSelectedLayoutSegment,
} from 'next/navigation'
import { ReactNode } from 'react'
import { Login } from './login'
import Modal from './model'
import Register from './register'
import { Card } from './card'
import Arch from '@/app/posts/ArchLinuxInstallGuide'

export default function ActiveSegment({
  posts,
  feed,
  videos,
}: {
  posts: ReactNode
  feed: ReactNode
  videos: ReactNode
}) {
  const activeSegment = useSelectedLayoutSegment()
  const router = usePathname()
  const isHome = router === '/'

  if (router == '/login') {
    return (
      <Modal>
        <Login />
      </Modal>
    )
  }

  if (router == '/register') {
    return (
      <Modal>
        <Register />
      </Modal>
    )
  }
  const isValidRoute =
    isHome || ['posts', 'feed', 'videos'].includes(activeSegment || '')

  return (
    <>
      <nav className="flex gap-4 border-b-2 pb-2">
        <Link
          href="/posts"
          className={`px-4 py-2 rounded-lg ${
            activeSegment === 'posts'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          Artigos
        </Link>
        <Link
          href="/feed"
          className={`px-4 py-2 rounded-lg ${
            activeSegment === 'feed'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          Atualizações
        </Link>
        <Link
          href="/videos"
          className={`px-4 py-2 rounded-lg ${
            activeSegment === 'videos'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          Vídeos
        </Link>
      </nav>
      {isValidRoute ? (
        <>
          {activeSegment === 'posts' && posts}
          {activeSegment === 'feed' && feed}
          {activeSegment === 'videos' && videos}
          {isHome && <div>Home</div>}
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
