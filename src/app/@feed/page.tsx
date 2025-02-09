import Link from 'next/link'

// app/blog/@feed/page.tsx
const mockUpdates = [
  {
    id: 1,
    type: 'youtube',
    content: 'Novo vídeo: Configurando seu ambiente de desenvolvimento Linux',
    date: '2024-03-15T15:30:00',
    url: '#',
  },
  {
    id: 2,
    type: 'social',
    content: 'Discussão sobre economia Bitcoin na comunidade',
    date: '2024-03-14T18:45:00',
    url: '#',
  },
]

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Atualizações Recentes</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {mockUpdates.map((update) => (
          <div key={update.id} className="py-4 border-b last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {update.type === 'youtube' ? (
                  <span className="text-red-500">▶</span>
                ) : (
                  <span className="text-blue-500">💬</span>
                )}
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">{update.content}</p>
                <time className="text-sm text-gray-500">
                  {new Date(update.date).toLocaleDateString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
        Carregar mais atualizações
      </button>
    </div>
  )
}
