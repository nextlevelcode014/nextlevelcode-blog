import Link from 'next/link'
import Image from 'next/image'
import { stylesComponets } from '@/types/style'
import BitImage from '../../public/assets/homeimage.webp'

export default function Description() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-950 to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 py-20 md:flex md:items-center md:gap-12">
        <div className="md:w-1/2 space-y-8 mb-12 md:mb-0">
          <h1 className={stylesComponets.headingStyle}>Learning...</h1>

          <div className="space-y-6">
            <p className={`${stylesComponets.baseStyleP} text-lg`}>
              Develop critical and analytical thinking on a variety of topics by
              sharing research and studies.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className={stylesComponets.listItemStyle}>
                <span className="text-blue-400 mr-2">⟁</span>
                Mathematical calculations
              </li>
              <li className={stylesComponets.listItemStyle}>
                <span className="text-blue-400 mr-2">⟁</span>
                Book talk
              </li>
              <li className={stylesComponets.listItemStyle}>
                <span className="text-blue-400 mr-2">⟁</span>
                Brainstorming
              </li>
              <li className={stylesComponets.listItemStyle}>
                <span className="text-blue-400 mr-2">⟁</span>
                Geopolitics
              </li>
            </ul>

            <p className={stylesComponets.baseStyleP}>
              Content published for study, learning and writing purposes.
            </p>
          </div>

          <div className={stylesComponets.highlightCard}>
            <blockquote className={stylesComponets.quoteStyle}>
              "Blessed are those who find wisdom, those who gain understanding."
              <span className="block mt-2 text-sm font-semibold text-blue-300">
                - Proverbs 3:13
              </span>
            </blockquote>
          </div>

          <Link
            href="/news/posts"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Explore
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative group">
          <div className="relative overflow-hidden rounded-2xl border-4 border-blue-500/30 shadow-2xl">
            <Image
              src={BitImage}
              alt="Ilustração de tecnologia blockchain"
              width={800}
              height={600}
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <span className="text-xs font-mono text-blue-300 tracking-widest">
                // NextLevelCode //
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">
                Decentralized Knowledge
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
