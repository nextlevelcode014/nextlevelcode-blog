// app/blog/@video/page.tsx
const mockVideos = [
  {
    id: 1,
    title: 'Introdução ao Terminal Linux',
    duration: '15:30',
    thumbnail: '/linux-terminal.jpg',
    url: 'https://youtube.com/watch?v=...',
    views: '12k',
  },
  {
    id: 2,
    title: 'Configurando Wallet Bitcoin',
    duration: '20:45',
    thumbnail: '/bitcoin-wallet.jpg',
    url: 'https://youtube.com/watch?v=...',
    views: '8k',
  },
]

export default function VideoPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Últimos Vídeos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockVideos.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{video.title}</h3>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{video.duration}</span>
                <span>{video.views} visualizações</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
