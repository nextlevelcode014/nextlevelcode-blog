// app/blog/layout.tsx
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function BlogLayout({
  children,
  posts,
  feed,
  videos,
}: {
  children: React.ReactNode
  posts: React.ReactNode
  feed: React.ReactNode
  videos: React.ReactNode
}) {
  const activeSegment = useSelectedLayoutSegment()
  console.log(activeSegment)

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">NextLevelCode Blog</h1>
        <nav className="flex gap-4 border-b-2 pb-2">
          <Link
            href="/blog/posts"
            className={`px-4 py-2 rounded-lg ${
              activeSegment === 'posts'
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            Artigos
          </Link>
          <Link
            href="/blog/feed"
            className={`px-4 py-2 rounded-lg ${
              activeSegment === 'feed'
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            Atualizações
          </Link>
          <Link
            href="/blog/video"
            className={`px-4 py-2 rounded-lg ${
              activeSegment === 'video'
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            Vídeos
          </Link>
        </nav>
      </header>

      <main className="grid grid-cols-1 gap-8">
        {activeSegment === 'posts' && posts}
        {activeSegment === 'feed' && feed}
        {activeSegment === 'video' && videos}
        {children}
      </main>
    </div>
  )
}
