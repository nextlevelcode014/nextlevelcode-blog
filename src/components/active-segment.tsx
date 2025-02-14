'use client'

import { usePosts } from '@/services/queries'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode } from 'react'
import SearchBar from './search-bar'

interface SearchFormData {
  searchQuery: string
}

export default function ActiveSegment({
  posts,
  feed,
  videos,
}: {
  posts: ReactNode
  feed: ReactNode
  videos: ReactNode
}) {
  const activeSegmentSearch = useSelectedLayoutSegment()
  const activeSegment = activeSegmentSearch?.replace('search', '')
  const router = usePathname()
  const isHome = router === '/'

  const isValidRoute =
    isHome || ['posts', 'feed', 'videos'].includes(activeSegment || '')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <nav className="flex justify-center gap-4 border-b-2 border-gray-700 pb-2 mb-6">
        <Link
          href="/news/posts"
          className={`px-4 py-2 rounded-lg text-gray-400 transition-colors ${
            activeSegment === 'posts'
              ? 'bg-gray-800 text-blue-500'
              : 'hover:bg-gray-800 hover:text-blue-400'
          }`}
        >
          Artigos
        </Link>
        <Link
          href="/news/feed"
          className={`px-4 py-2 rounded-lg text-gray-400 transition-colors ${
            activeSegment === 'feed'
              ? 'bg-gray-800 text-blue-500'
              : 'hover:bg-gray-800 hover:text-blue-400'
          }`}
        >
          Atualizações
        </Link>
        <Link
          href="/news/videos"
          className={`px-4 py-2 rounded-lg text-gray-400 transition-colors ${
            activeSegment === 'videos'
              ? 'bg-gray-800 text-blue-500'
              : 'hover:bg-gray-800 hover:text-blue-400'
          }`}
        >
          Vídeos
        </Link>
      </nav>

      <SearchBar />

      {/* Content Area */}
      {isValidRoute ? (
        <div className="mt-8">
          {activeSegment === 'posts' && posts}
          {activeSegment === 'feed' && feed}
          {activeSegment === 'videos' && videos}
          {isHome && (
            <div className="text-center text-gray-400">
              Selecione uma categoria acima
            </div>
          )}
        </div>
      ) : (
        /* Error State */
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500">
          <h1 className="text-xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-gray-500 mb-8">
            A página que você tentou acessar não existe.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Voltar para Home
          </Link>
        </div>
      )}
    </div>
  )
}
