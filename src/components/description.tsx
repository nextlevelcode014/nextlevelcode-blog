import { stylesComponets } from '@/styles'
import Link from 'next/link'

export default function Description() {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-slate-300 text-2xl font-bold">
          Bem-vindo ao meu Blog!
        </h1>
        <p className={stylesComponets.baseStyleP}>
          Blog desenvolvido com fins educacionais e para a propagação de ideias
          e estudos, tanto tecnológicos quanto políticos e sobre Bitcoin. As
          postagens serão sempre uma transcrição dos vídeos postados em meu
          canal do{' '}
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
          . Espero poder ajudar toda a comunidade assim como fui ajudado um dia.
          Agradeço a quem se interessa e gosta do conteúdo. Divirtam-se
          aprendendo!
        </p>
      </section>
    </>
  )
}
