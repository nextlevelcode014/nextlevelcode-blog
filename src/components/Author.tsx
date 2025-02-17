import { POST_QUERYResult } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

type AuthorProps = {
  author: NonNullable<POST_QUERYResult>['author']
}

export function Author({ author }: AuthorProps) {
  return (
    <div className="flex items-center gap-3 group">
      {author?.image && (
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-green-500/20 group-hover:border-green-500/40 transition-colors">
          <Image
            src={urlFor(author.image).width(100).url()}
            alt={author.name || 'NextLevelCode'}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div>
        <p className="text-gray-300 font-medium group-hover:text-green-500 transition-colors">
          {author?.name}
        </p>
      </div>
    </div>
  )
}
