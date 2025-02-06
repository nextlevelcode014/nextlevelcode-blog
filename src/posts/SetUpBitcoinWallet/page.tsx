import { Components } from "@/Components";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  let isLoading = false;
  return (
    <Components.Div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      <Components.Header />
      <Components.Main>
        <Components.H1>Configuração de Carteira Bitcoin</Components.H1>
        <Components.P>
          Neste post, vou apresentar um tutorial de como configurar uma carteira de Bitcoin totalmente offline. O que nunca esteve na internet não pode ser hackeado. Vou usar o sistema operacional Tails Linux e algumas ferramentas adicionais, que explicarei a seguir. Precisaremos de alguns softwares focados em segurança e privacidade. Vamos começar!
        </Components.P>
        <br />
        <Components.H2>Pré-requisitos:</Components.H2>
        <ul className="list-disc list-inside text-gray-600 pb-4">
          <li className="pl-4">
            <strong><Components.MyLink name="Tails Linux" href="https://tails.net/install/linux/index.en.html" /></strong>
          </li>
          <li className="pl-4">
            <strong>Dois pendrives USB de 8GB ou mais para a instalação do Tails Linux e para atualizações.</strong>
          </li>
          <li className="pl-4">
            <strong><Components.MyLink href="https://electrum.org/" name="Electrum." /></strong>
          </li>
          <li className="pl-4">
            <strong><Components.MyLink href="https://iancoleman.io/" name="Ian Coleman BIP39 Tool." /></strong>
          </li>
        </ul>

        <Components.H2>Passo a Passo</Components.H2>
        <Components.H3>1. Verificação das Chaves PGP do Tails:</Components.H3>
        <Components.P>
          O Tails Linux é um sistema operacional focado em privacidade e segurança, que usa o Tor para navegação anônima. Ele é projetado para rodar como uma "live session", ou seja, ao desligar o sistema, todas as informações e atividades são apagadas.
        </Components.P>
        <Components.P>
          Ele também permite operações totalmente offline, ideal para o gerenciamento seguro de chaves privadas. Opcionalmente, oferece uma área de "persistência" criptografada para armazenar dados importantes de forma segura. Em resumo, o Tails é perfeito para quem busca um ambiente temporário e seguro para transações de Bitcoin.
        </Components.P>
        <Components.P>
          Ao baixar o Tails Linux, use estes comandos para verificar a integridade do pacote usando as chaves PGP:
          <h4 className="text-lg font-semibold mt-4">Importe a chave pública do Tails:</h4>
          <Components.Clipboard text="gpg --import tails-signing.key;" />
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <div>l</div>
            // <Image
            //   src={post_images![0]}
            //   alt="command_output"
            //   width={800}
            //   height={400}
            //   loading="eager"
            // />
          )}
          <Components.P>Esse comando adiciona a chave pública do Tails ao GPG, permitindo a verificação da assinatura oficial da imagem.</Components.P>
          <h4 className="text-lg font-semibold mt-4">Verifique a assinatura da imagem:</h4>
          <Components.Clipboard text="gpg --verify tails-signing.asc tails-signing.key" />
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <div>l</div>
            // <Image
            //   src={post_images![0]}
            //   alt="command_output"
            //   width={800}
            //   height={400}
            //   loading="eager"
            // />
          )}
          <Components.P>
            Esse comando verifica se a imagem baixada (`tails-amd64-6.9.img`) corresponde à assinatura oficial (`.sig`), confirmando sua integridade e origem.
          </Components.P>
          <h4 className="text-lg font-semibold mt-4 pb-4">Sobre os avisos:</h4>
          <Components.P>
            <strong>"This key is not certified with a trusted signature"</strong>: Este aviso aparece porque a chave pública do Tails não está assinada por outra chave confiável. Isso é comum e pode ser ignorado se você baixou a chave de uma fonte oficial do Tails.
          </Components.P>
          <br />
          <Components.P>
            <strong>"WARNING: This key is not trusted!"</strong>: Esse aviso indica que o GPG não reconhece automaticamente a chave como confiável. Isso ocorre quando você importa uma chave manualmente.
          </Components.P>
        </Components.P>
        <br />

        <Components.H3>2. Instalação do Tails Linux</Components.H3>
        <Components.P>
          Para instalar o Tails Linux, siga o tutorial oficial no site do Tails: <Components.MyLink href="https://tails.net/install/linux/index.en.html" name="Tails Linux" /> ou no YouTube: <Components.MyLink href="https://youtu.be/P6Ws6V8695Q?si=bJn8lImJGLwoxtp2" name="NextLevelCode" />
        </Components.P>

        <Components.H3>Aguarde para os próximos passos...</Components.H3>
      </Components.Main>
    </Components.Div>
  )
}
