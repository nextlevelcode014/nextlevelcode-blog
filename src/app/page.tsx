import { Header } from '@/components/header'
import PostsList from '@/components/posts-list'
import { stylesComponets } from '@/styles'
import Link from 'next/link'
export const revalidate = 60 // Revalida os dados a cada 60 segundos

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-gray-100 ">
      <Header />
      <main className="container mx-auto p-4 flex-grow bg-[#1a1a1a] text-gray-100">
        <section className="mb-8">
          <h1 className="text-slate-300 text-2xl font-bold">
            Bem-vindo ao meu Blog!
          </h1>
          <p className={stylesComponets.baseStyleP}>
            Blog desenvolvido com fins educacionais e para a propagação de
            ideias e estudos, tanto tecnológicos quanto políticos e sobre
            Bitcoin. As postagens serão sempre uma transcrição dos vídeos
            postados em meu canal do{' '}
            <Link
              href={'https://www.youtube.com'}
              className="font-bold text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </Link>
            ,
            <Link
              href={'https://www.youtube.com/@NextLevelCode014'}
              className="font-bold text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              NextLevelCode
            </Link>
            . Você encontrará, em grande parte, tutoriais sobre
            <Link
              href={'https://www.linux.org/'}
              className="font-bold text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Linux
            </Link>
            , programação e{' '}
            <Link
              href={'https://bitcoin.org/en/'}
              className="font-bold text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bitcoin
            </Link>
            . Espero poder ajudar toda a comunidade assim como fui ajudado um
            dia. Agradeço a quem se interessa e gosta do conteúdo. Divirtam-se
            aprendendo!
          </p>
        </section>
        <h2>Últimos Posts</h2>
        <p className={stylesComponets.baseStyleP}>
          Aqui você encontra as últimas atualizações, artigos e muito mais.
          Escolha um post abaixo para começar a leitura.
        </p>
      </main>
    </div>
  )
}
