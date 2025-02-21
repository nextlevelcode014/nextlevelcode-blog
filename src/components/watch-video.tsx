'use client'
import { useVideo } from '@/services/queries'
import Loading from './loading'
import UnderConstruction from './under-construction'
import { formatViews } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function WatchVideo({
  youtubeId,
  query,
}: {
  youtubeId: string
  query: string | null
}) {
  const router = useRouter()
  const { data: video, isLoading } = useVideo(youtubeId)

  const search = query || ''
  const categories = search ? search.split(',') : []

  if (isLoading) return <Loading />

  if (!video) return <UnderConstruction />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl bg-gray-900">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-100">{video.title}</h1>

          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">
                {formatViews(video.views)} views
              </span>
            </div>
            <span>•</span>
            <span>{video.duration}</span>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-between gap-2">
              <button
                onClick={router.back}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-green-300 hover:bg-blue-600 transition-colors text-sm"
              >
                <div>
                  <ArrowLeft />
                </div>
                <div>Back</div>
              </button>
              <div className="flex items-center gap-2 ">
                {categories.map((category) => (
                  <div
                    key={category}
                    // href={`/category/${category}`}
                    className=" px-3 py-1 rounded-full bg-gray-800 text-green-300 hover:bg-blue-600 transition-colors text-sm"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
