import { Metadata } from 'next'
import Link from 'next/link'
import { Components } from "@/Components";
import { stylesComponets } from '@/styles';
import { ArchLinuxInstallGuide } from '.';

export const metadata: Metadata = {
  title: 'ArchLinuxInstallGuide',
  description: 'Guia de Instalação do Arch Linux',
  openGraph: {
    title: 'NextLevelCodeBlog',
    description: 'Blog educacional sobre Linux, programação e Bitcoin'
  }
}

export default function Post() {

  return (
    <Components.Div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      <Components.Header />
      {/* Conteúdo Principal */}
      <Components.Main>
        <Components.H1>Arch Linux Install Guide</Components.H1>
        <Components.P className={stylesComponets.baseStyleP}>
          Nesse blog vou esta fazendo a instalação do{' '}
          <Link
            href="https://archlinux.org/"
            className="font-bold text-blue-500 underline"
          >
            Arch Linux
          </Link>
          , veja também o video no{' '}
            <Link href="https://youtu.be/908zigzqQ90?si=CrAxLvhAeIshAzP3">
              You Tube
            </Link>
          . Quero fazer uma instalação limpa com{' '}
          <Link
            href="https://kde.org/plasma-desktop/"
            className="font-bold text-blue-500 underline"
          >
            KDE Plasma
          </Link>
          , melhor insterface decktop que já usei. Vou esta usando{' '}
          <Link
            href="https://wiki.archlinux.org/title/Btrfs"
            className="font-bold text-blue-500 underline"
          >
            Btrfs{' '}
          </Link>
          como sistema de arquivos. Sobre o pendrive bootavel, eu costumo usar{' '}
          <Link
            href="https://www.ventoy.net/en/download.html"
            className="font-bold text-blue-500 underline"
          >
            Ventoy
          </Link>{' '}
          e recomendo, caso não saibam vejão esse video do{' '}
          <Link
            href="https://youtu.be/11CkqZQ3scE?si=yIqjhctwCn8R7pOD"
            className="font-bold text-blue-500 underline"
          >
            Diolinux
          </Link>
          . Com isso so resta baixa a imagem iso no site do{' '}
          <Link
            href="https://archlinux.org/download/"
            className="font-bold text-blue-500 underline"
          >
            Arch Linux
          </Link>
          . Tudo pronto, vamos começar!
        </Components.P>
        <ArchLinuxInstallGuide.Content/>
      </Components.Main>
    </Components.Div>
  )
}
