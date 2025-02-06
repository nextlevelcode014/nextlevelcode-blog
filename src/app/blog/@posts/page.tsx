// app/blog/@posts/page.tsx
import Link from 'next/link'

const mockPosts = [
  {
    id: 1,
    title: 'Introdução ao Linux para Desenvolvedores',
    excerpt: 'Aprenda os fundamentos do Linux para programação...',
    date: '2024-03-15',
    category: 'Linux',
    slug: 'introducao-linux',
  },
  {
    id: 2,
    title: 'Bitcoin: O Futuro das Finanças',
    excerpt: 'Entenda os princípios básicos do Bitcoin e sua importância...',
    date: '2024-03-14',
    category: 'Bitcoin',
    slug: 'bitcoin-futuro-financas',
  },
]

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Últimos Artigos</h2>
      {mockPosts.map((post) => (
        <article
          key={post.id}
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Link href={`/blog/posts/${post.slug}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-blue-600 font-medium">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
              <time className="text-sm text-gray-500 whitespace-nowrap">
                {new Date(post.date).toLocaleDateString('pt-BR')}
              </time>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
