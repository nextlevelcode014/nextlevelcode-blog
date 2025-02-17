import { sanityFetch } from '@/sanity/lib/live'
import { POST_QUERY } from '@/sanity/lib/queries'
import { Post } from '@/components/Post'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  })

  if (!post) {
    notFound()
  }

  return (
    <main
      className="w-full max-w-[900px] mx-auto bg-[#1a1a1a] text-gray-100
  px-4 sm:px-6  // Padding lateral responsivo
  hyphens-auto  // Quebra de palavras
  [&>*]:mb-8  // Espaçamento entre elementos filhos
"
    >
      <Post {...post} />
    </main>
  )
}
