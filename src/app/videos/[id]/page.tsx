'use client'
import WatchVideo from '@/components/watch-video'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { use } from 'react'

export default function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const search = useSearchParams()
  const query = search.get('categories')
  return <WatchVideo youtubeId={id} query={query} />
}
