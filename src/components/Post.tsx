import { PortableText } from 'next-sanity'
import { components } from '@/sanity/portableTextComponents'
import { POST_QUERYResult } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Author } from './Author'
import { Categories } from './Categories'
import { PublishedAt } from './PublishedAt'

export function Post(props: NonNullable<POST_QUERYResult>) {
  const { title, author, mainImage, body, publishedAt, categories } = props

  return (
    <section
      className="max-w-full mx-auto px-6 py-12 bg-[#1a1a1a] shadow-lg border-gray-800
  [&>*]:relative [&>*]:z-10"
    >
      {/* Cabeçalho */}
      <header className="space-y-8 mb-12 border-b border-gray-800 pb-8">
        <div className="flex flex-wrap gap-3 items-center">
          <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          {title}
        </h1>

        {author && (
          <div className="mt-6 flex items-center gap-4 bg-gray-800/40 p-3 rounded-lg">
            <Author author={author} />
          </div>
        )}
      </header>

      {/* Imagem Principal */}
      {mainImage && (
        <figure className="relative aspect-video rounded-xl overflow-hidden border border-gray-700 mb-12 group">
          <Image
            src={urlFor(mainImage).width(1200).url()}
            alt={mainImage.alt || title || 'Imagem do post'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
        </figure>
      )}

      {body && (
        <section
          className="prose prose-lg dark:prose-invert w-full max-w-none text-gray-200
      prose-pre:mt-1 prose-pre:mb-3"
        >
          {' '}
          {/* Espaçamento específico para pré-formatação */}
          <PortableText value={body} components={components} />
        </section>
      )}

      <footer className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {categories && <Categories categories={categories} />}
          <Link
            href="/blog"
            className="text-green-500 hover:text-green-400 transition-colors flex items-center gap-2"
          >
            ← Voltar para todos os posts
          </Link>
        </div>
      </footer>
    </section>
  )
}
