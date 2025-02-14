'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePosts } from '../services/queries'
import MessageError from './message-error'
import { useSearchParams } from 'next/navigation'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function PostsList() {
  const posts = usePosts()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')?.toLowerCase() || ''

  if (posts.isLoading) {
    return (
      <div className="flex justify-center items-center h-[64vh] gap-4">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-teal-500 text-lg font-bold">
          Carregando posts...
        </span>
      </div>
    )
  }

  if (posts.isError) {
    return <MessageError message={posts.error.message} />
  }

  const filteredPosts = posts.data?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery),
  )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-[#242424] shadow-lg rounded-xl overflow-hidden max-w-[600px] mx-auto hover:transform hover:scale-105 transition-all duration-300"
          >
            <Image
              src={post.cover_image}
              alt={post.title}
              width={800}
              height={600}
              priority
              loading="eager"
              className="w-full h-[250px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-white text-xl font-semibold mb-2">
                {post.title}
              </h3>
              <p className="text-gray-300 text-base mb-4">
                {post.description.substring(0, 150)}...
              </p>
              <Link
                href={`/posts/${post.name}`}
                className="text-teal-500 underline hover:text-teal-400 transition-colors"
              >
                Leia mais
              </Link>
            </div>
          </article>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <ExclamationTriangleIcon className="w-24 h-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">
            Nenhum post encontrado
          </h2>
          <p className="text-gray-400 max-w-md">
            Não encontramos resultados para sua pesquisa. Tente usar termos
            diferentes.
          </p>
        </div>
      )}
    </section>
  )
}
