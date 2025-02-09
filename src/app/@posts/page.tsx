// app/blog/@posts/page.tsx
import PostsList from '@/components/posts-list'
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
  return <PostsList />
}
