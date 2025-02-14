import { notFound } from 'next/navigation'

const mockVideos = [
  {
    id: '1',
    title: 'Dominando o Terminal Linux',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Aprenda os comandos essenciais do terminal Linux.',
    category: 'Linux',
  },
  {
    id: '2',
    title: 'Carteira Bitcoin: Guia Completo',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Como configurar e usar uma carteira Bitcoin.',
    category: 'Bitcoin',
  },
]

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const video = mockVideos.find((v) => v.id === id)

  if (!video) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">{video.title}</h1>
        <p className="text-gray-400">{video.description}</p>
      </div>
    </div>
  )
}
