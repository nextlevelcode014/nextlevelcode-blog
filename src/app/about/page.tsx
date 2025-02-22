import { stylesComponets } from '@/types/style'
import Image from 'next/image'
import Link from 'next/link'
import Me from '../../../public/assets/me.webp'

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-900 to-blue-900/20 py-20">
      <div className="max-w-7xl mx-auto px-4 md:flex md:items-start md:gap-16">
        {/* Seção da Foto */}
        <div className="md:w-1/3 mb-12 md:mb-0">
          <div className="relative group group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl transform rotate-3 group-hover:rotate-2 transition-all" />
            <Image
              src={Me}
              alt="Profile Photo"
              width={600}
              height={800}
              className="rounded-2xl relative z-10 object-cover shadow-2xl"
            />
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold text-gray-100 mb-2">
              Social media:
            </h3>
            <div className="flex justify-center gap-4">
              <Link
                href="github.com/m4rc3l04ugu2t0"
                className={stylesComponets.socialLink}
              >
                GitHub
              </Link>
              <Link
                href="x.com/next_level_code"
                className={stylesComponets.socialLink}
              >
                X
              </Link>
            </div>
          </div>
        </div>

        {/* Conteúdo Textual */}
        <div className="md:w-2/3 space-y-8">
          <h1 className={stylesComponets.headingStyle}>
            Hi, I'm <span className="text-blue-400">Marcelo Augusto</span>
          </h1>

          <div className="space-y-6">
            <p className={`${stylesComponets.baseStyleP} text-lg`}>
              {/*{new Date().getFullYear() - 2025}+ */}
              I've been in the technology business for over a year now, and I've
              become more and more interested and evolved. I can't see a future
              without knowing what goes on behind the software we use and are
              increasingly dependent on.
            </p>

            <div className={stylesComponets.highlightCard}>
              <h2 className={stylesComponets.subheadingStyle}>Main focus</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <li className={stylesComponets.listItemStyle}>
                  <span className="text-blue-400 mr-2">▹</span>
                  Bitcoin
                </li>
                <li className={stylesComponets.listItemStyle}>
                  <span className="text-blue-400 mr-2">▹</span>
                  Mathematics
                </li>
                <li className={stylesComponets.listItemStyle}>
                  <span className="text-blue-400 mr-2">▹</span>
                  Cryptography
                </li>
                <li className={stylesComponets.listItemStyle}>
                  <span className="text-blue-400 mr-2">▹</span>
                  Linux
                </li>
                <li className={stylesComponets.listItemStyle}>
                  <span className="text-blue-400 mr-2">▹</span>
                  IA
                </li>
                <li className={stylesComponets.listItemStyle}>
                  <span className="text-blue-400 mr-2">▹</span>
                  System Development
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={stylesComponets.subheadingStyle}>
                Linha do Tempo Profissional
              </h3>
              <div className="space-y-4">
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-blue-400 font-mono">2025 - Current</p>
                  <p className="text-gray-300">
                    Focused on Rust, low-level programming.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-blue-400 font-mono">
                    December 2023 - 2024
                  </p>
                  <p className="text-gray-300">
                    I studied HTML, CSS, JavaScript, Node.js, Express, Fastify,
                    React, TypeScript, Next.js, Ruby, C, C++, and Rust over the
                    course of a year.
                  </p>
                </div>
              </div>
            </div>

            <div className={stylesComponets.highlightCard}>
              <blockquote className={stylesComponets.quoteStyle}>
                "For wisdom is better than rubies; and all the things that may
                be desired are not to be compared to it. I wisdom dwell with
                prudence, and find out knowledge of witty inventions."
                <span className="block mt-2 text-sm font-semibold text-blue-300">
                  - Proverbs 8:11-12
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
