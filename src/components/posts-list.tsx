'use client'

import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'
import MessageError from './message-error'
import { usePosts } from '@/services/queries'
import NotFound from '@/app/not-found'

interface SearchFormData {
  searchQuery: string
}

export default function PostsList() {
  const posts = usePosts()
  const { register, watch } = useForm<SearchFormData>()
  const searchQuery = watch('searchQuery', '').toLowerCase()

  if (posts.isLoading) {
    return (
      <div className="flex justify-center items-center h-64 space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-teal-500 border-solid"></div>
        <span className="text-teal-500 text-lg font-semibold">
          Carregando posts...
        </span>
      </div>
    )
  }

  console.log(posts.data)
  if (posts.isError) {
    return <MessageError message={posts.error.message} />
  }

  const filteredPosts = posts.data?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery),
  )

  return (
    <>
      <div className="relative mb-8">
        <input
          type="text"
          {...register('searchQuery')}
          className="rounded-full pl-10 pr-4 py-2 bg-[#0f0f0f] text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full placeholder-gray-500"
          placeholder="Pesquisar posts..."
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3.5a7.5 7.5 0 006.65 12.65z"
          />
        </svg>
      </div>

      {/* Exibe os posts filtrados */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#242424] shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                className="w-full h-48 object-cover"
                src={post.cover_image}
                alt={post.title}
                width={1920}
                height={1080}
                quality={75}
                priority
                loading="eager"
              />
              <div className="p-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-100">
                  {post.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4">
                  {post.description.substring(0, 100)}...
                </p>
                <Link
                  href={`/posts/${post.name}`}
                  className="text-teal-500 hover:text-teal-400 transition duration-200 underline"
                >
                  Leia mais
                </Link>
              </div>
            </article>
          ))
        ) : (
          <NotFound />
        )}
      </section>
    </>
  )
}
