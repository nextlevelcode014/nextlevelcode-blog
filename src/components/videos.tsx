'use client'
import NotFound from '@/app/not-found'
import { useSearchParams } from 'next/navigation'

// app/blog/@video/page.tsx
const mockVideos = [
  {
    id: 1,
    title: 'Dominando o Terminal Linux',
    duration: '15:30',
    youtubeId: 'dQw4w9WgXcQ',
    views: '12k',
    category: 'Linux',
  },
  {
    id: 2,
    title: 'Carteira Bitcoin: Guia Completo',
    duration: '20:45',
    youtubeId: 'dQw4w9WgXcQ',
    views: '8k',
    category: 'Bitcoin',
  },
  // Adicione mais vídeos conforme necessário
]

export default function Videos() {
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('search')?.toLowerCase() || ''

  const filteredMock = mockVideos.filter((post) =>
    post.title.toLowerCase().includes(searchQuery),
  )
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Cabeçalho */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">
          Biblioteca de Vídeos
        </h1>
        <p className="text-gray-400 text-lg">
          Tutoriais em vídeo sobre Linux, Bitcoin e Programação
        </p>
      </div>

      {/* Grade de Vídeos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMock && filteredMock.length > 0 ? (
          filteredMock.map((video) => (
            <div
              key={video.id}
              className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Thumbnail do YouTube */}
              <div className="aspect-video relative">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Detalhes do Vídeo */}
              <div className="p-4">
                {/* Categoria */}
                <span className="inline-block mb-2 px-3 py-1 text-sm font-semibold text-teal-400 bg-teal-900/50 rounded-full">
                  {video.category}
                </span>

                {/* Título */}
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {video.title}
                </h3>

                {/* Metadados */}
                <div className="flex justify-between items-center text-gray-400">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>

              {/* Overlay Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
                  Assistir Agora
                </button>
              </div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </div>

      {/* Rodapé da Seção */}
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Novos vídeos toda semana! Inscreva-se no{' '}
          <a
            href="https://youtube.com/@NextLevelCode014"
            target="_blank"
            rel="noopener"
            className="text-teal-400 hover:text-teal-300 underline"
          >
            nosso canal
          </a>
        </p>
      </div>
    </div>
  )
}
