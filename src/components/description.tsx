import { stylesComponets } from '@/styles'
import Link from 'next/link'

export default function Description() {
  return (
    <section>
      <h1 className="text-slate-300 text-2xl font-bold mb-8">
        Olá, Bitcoinheiros e nerds focados nos estudos!
      </h1>

      <p className={stylesComponets.baseStyleP}>
        Este blog foi criado para compartilhar ideias e aprofundar estudos sobre{' '}
        <strong>Bitcoin</strong>, <strong>criptografia</strong>,{' '}
        <strong>matemática</strong> e <strong>programação</strong>. Aqui, você
        encontrará diversos artigos e fontes de pesquisa para quem está sempre
        em busca de aprendizado e quer colaborar com a comunidade.
      </p>

      <p className={stylesComponets.baseStyleP}>
        Para aqueles que desejam entender o{' '}
        <Link
          href="https://bitcoin.org/en/"
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bitcoin
        </Link>{' '}
        e seu potencial como ferramenta de liberdade, este é o lugar certo! Vou
        explorar não apenas os aspectos técnicos e de programação, mas também
        sua influência na geopolítica e na teoria dos jogos.
      </p>

      <p className={stylesComponets.baseStyleP}>
        Todos os posts são uma documentação da minha jornada de aprendizado, não
        sou nenhuma especialista, aqui é um local onde compartilho ideias e
        sobre o que estou estudando. Se encontrar alguma imprecisão, sinta-se à
        vontade para me enviar um e-mail, ficarei grato pelo feedback!
      </p>

      <p className={stylesComponets.baseStyleP}>
        Espero que o conteúdo seja relevante para você. Se por acaso foi util
        para você, deixe seu comentario nos posts com alguns hindsights sobre o
        que o interessou, talvez assim gerando uma discurção construtiva.
      </p>

      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400">
        "Com sabedoria se constrói a casa, e com discernimento ela se
        consolida.o
        <br />
        Pelo conhecimento, os seus cômodos se enchem do que é precioso e
        agradável."
        <br />
        <span className="text-sm font-semibold">Provérbios 24:3-4</span>
      </blockquote>
    </section>
  )
}
