import Provider from '@/services/provider'
import { ReactNode } from 'react'
import ActiveSegment from '@/components/active-segment'

export default function NewsLayout({
  children,
  videos,
  posts,
}: {
  children: ReactNode
  videos: ReactNode
  posts: ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-gray-100">
      <main className="grid grid-cols-1 gap-8">
        <Provider>
          <ActiveSegment posts={posts} videos={videos} />
          {children}
        </Provider>
      </main>
    </div>
  )
}
