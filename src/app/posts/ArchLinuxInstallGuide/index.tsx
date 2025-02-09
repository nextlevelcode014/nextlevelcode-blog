import Link from 'next/link'

export default function Arch() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Conteúdo Principal */}
      <h1>Arch Linux Install Guide</h1>
      <p>
        Nesse blog vou esta fazendo a instalação do{' '}
        <Link
          href="https://archlinux.org/"
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Arch Linux
        </Link>
        , veja também o video no{' '}
        <Link
          href="https://youtu.be/908zigzqQ90?si=CrAxLvhAeIshAzP3"
          target="_blank"
          rel="noopener noreferrer"
        >
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
          target="_blank"
          rel="noopener noreferrer"
        >
          Btrfs{' '}
        </Link>
        como sistema de arquivos. Sobre o pendrive bootavel, eu costumo usar{' '}
        <Link
          href="https://www.ventoy.net/en/download.html"
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ventoy
        </Link>{' '}
        e recomendo, caso não saibam vejão esse video do{' '}
        <Link
          href="https://youtu.be/11CkqZQ3scE?si=yIqjhctwCn8R7pOD"
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Diolinux
        </Link>
        . Com isso so resta baixa a imagem iso no site do{' '}
        <Link
          href="https://archlinux.org/download/"
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Arch Linux
        </Link>
        . Tudo pronto, vamos começar!
      </p>
    </div>
  )
}
