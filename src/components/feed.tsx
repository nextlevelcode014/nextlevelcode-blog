'use client'
import { useSearchParams } from 'next/navigation'
import PostNotFound from './search-not-found'

// app/blog/@feed/page.tsx
const mockUpdates = [
  {
    id: 1,
    type: 'youtube',
    content: 'Novo vídeo: Configurando seu ambiente de desenvolvimento Linux',
    date: '2024-03-15T15:30:00',
    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ', // URL real
    author: 'NextLevelCode',
    thumbnail: '/linux-dev-env.jpg',
    views: '1.2k',
    likes: '350',
  },
  {
    id: 2,
    type: 'social',
    content: 'Discussão sobre economia Bitcoin na comunidade',
    date: '2024-03-14T18:45:00',
    url: 'https://twitter.com/NextLevelCode/status/123456789', // URL real
    author: 'CryptoEnthusiast',
    comments: '42',
    upvotes: '120',
  },
  {
    id: 3,
    type: 'blog',
    content: 'Novo artigo: Introdução ao Kernel Linux',
    date: '2024-03-13T10:15:00',
    url: '/blog/introducao-kernel-linux', // URL real
    author: 'LinuxGuru',
    readTime: '8 min',
    tags: ['Linux', 'Kernel'],
  },
  {
    id: 4,
    type: 'event',
    content: 'Live: Desmistificando a Blockchain',
    date: '2024-03-20T19:00:00',
    url: 'https://youtube.com/live/xyz123', // URL real
    location: 'YouTube Live',
    host: 'BlockchainExpert',
  },
]

export default function Feed() {
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('search')?.toLowerCase() || ''

  const filteredMock = mockUpdates.filter((post) =>
    post.content.toLowerCase().includes(searchQuery),
  )
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">
        Feed de Atualizações
      </h1>

      <div className="space-y-6">
        {filteredMock && filteredMock.length > 0 ? (
          filteredMock.map((update) => (
            <a
              key={update.id}
              href={update.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Ícone do Tipo */}
                  <div className="flex-shrink-0">
                    {update.type === 'youtube' && (
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">▶</span>
                      </div>
                    )}
                    {update.type === 'social' && (
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">💬</span>
                      </div>
                    )}
                    {update.type === 'blog' && (
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">📝</span>
                      </div>
                    )}
                    {update.type === 'event' && (
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">🎉</span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo Principal */}
                  <div className="flex-grow">
                    <p className="text-gray-100 text-lg">{update.content}</p>
                    <div className="mt-2 text-sm text-gray-400">
                      <span>{update.author}</span>
                      <span className="mx-2">•</span>
                      <time>
                        {new Date(update.date).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>

                    {/* Metadados Adicionais */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {update.type === 'youtube' && (
                        <>
                          <span className="text-sm text-gray-400">
                            👁️ {update.views} visualizações
                          </span>
                          <span className="text-sm text-gray-400">
                            👍 {update.likes} curtidas
                          </span>
                        </>
                      )}
                      {update.type === 'social' && (
                        <>
                          <span className="text-sm text-gray-400">
                            💬 {update.comments} comentários
                          </span>
                          <span className="text-sm text-gray-400">
                            ⬆️ {update.upvotes} upvotes
                          </span>
                        </>
                      )}
                      {update.type === 'blog' && (
                        <>
                          <span className="text-sm text-gray-400">
                            ⏱️ {update.readTime} de leitura
                          </span>
                          <div className="flex gap-2">
                            {update.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                      {update.type === 'event' && (
                        <>
                          <span className="text-sm text-gray-400">
                            📍 {update.location}
                          </span>
                          <span className="text-sm text-gray-400">
                            🎤 {update.host}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <PostNotFound />
        )}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
          Carregar mais atualizações
        </button>
      </div>
    </div>
  )
}
