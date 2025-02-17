'use client'

import { POSTS_QUERYResult } from '@/sanity/types'
import { PublishedAt } from '@/components/PublishedAt'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { FiClock, FiTag, FiUser, FiArrowRight } from 'react-icons/fi'

export function PostList({ posts }: { posts?: POSTS_QUERYResult }) {
  return (
    <div className="space-y-8">
      {posts?.length ? (
        posts.map((post) => <PostCard key={post._id} {...post} />)
      ) : (
        <p className="text-gray-400 text-center py-12">
          Nenhum post encontrado.
        </p>
      )}
    </div>
  )
}

function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories, slug } = props

  return (
    <article className="group bg-[#242424] rounded-xl border border-gray-700 hover:border-green-500/20 transition-all duration-300 hover:shadow-xl">
      <Link href={`/posts/${slug?.current}`} className="block p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Imagem */}
          <div className="md:w-64 relative h-48 md:h-36 rounded-lg overflow-hidden border border-gray-700">
            {mainImage && (
              <>
                <Image
                  src={urlFor(mainImage).width(600).url()}
                  alt={mainImage.alt || title || 'Thumbnail do post'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </>
            )}
          </div>

          {/* Conteúdo */}
          <div className="flex-1 space-y-4">
            {/* Categorias */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category._id}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm text-green-500"
                  >
                    <FiTag className="w-4 h-4" />
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Título */}
            <h2 className="text-2xl font-bold text-gray-100 group-hover:text-green-500 transition-colors">
              {title}
            </h2>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              {author && (
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  <Author author={author} />
                </div>
              )}

              {publishedAt && (
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <PublishedAt publishedAt={publishedAt} />
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="flex items-center gap-2 text-green-500 group-hover:text-green-400 transition-colors mt-4">
              <span>Leia o artigo completo</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Componente Author atualizado
function Author({ author }: { author: POSTS_QUERYResult[0]['author'] }) {
  return (
    <div className="flex items-center gap-2 group">
      {author?.image && (
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-600 group-hover:border-green-500 transition-colors">
          <Image
            src={urlFor(author.image).width(48).url()}
            alt={author.name || 'NextLevelCode'}
            fill
            className="object-cover"
          />
        </div>
      )}
      <span className="group-hover:text-gray-200 transition-colors">
        {author?.name || 'Autor desconhecido'}
      </span>
    </div>
  )
}
