'use client'

import { Components } from "@/Components"
import CopyToClipboardButton from "@/Components/Clipboard"
import ErrorMessage from "@/Components/ErrorMessage"
import { Video } from "@/Components/Video"
import { usePostImage, usePostVideo } from "@/services/queries"
import Image from "next/image"

export default function Main() {
  const { data: post_images, isLoading, isError, error  } = usePostImage(process.env.NEXT_PUBLIC_POST_ARCHLINUX_INSTALL_GUIDE!);
  const { data: post_videos } = usePostVideo(process.env.NEXT_PUBLIC_POST_ARCHLINUX_INSTALL_GUIDE!);

  if (isError) {
    return <ErrorMessage message="Ocorreu um erro ao carregar o post." />
  }

  return (
    <>
        <Components.H2 className="responsive-reading text-3xl font-bold mb-4">
          Passo a Passo
        </Components.H2>

        <Components.H2>1. Configurar o teclado</Components.H2>
        <Components.P>
          Set o teclado de acordo com o seu, meu no caso é{' '}
          <strong>br-abnt2</strong>. Esta configuração é apenas para a ISO, não
          afetara seu sistema pos instalado.
        </Components.P>
        <CopyToClipboardButton text={'loadkeys br-abnt2'} />

        <Components.H2>2. Conectar ao Wi-Fi</Components.H2>
        <Components.P>
          É importante dizer que estou em uma virtual machine, provavelmente
          esse nome de interface de rede não vai ser a sua a não ser que seja um
          VM, provavelmente será algo como <strong>wlan0</strong> ou{' '}
          <strong>wlp1s0</strong>. Minha interface de rede é{' '}
          <strong>enp0s3</strong> no caso da sua ser diferente é so executar o
          seguinte comando e no lugar de onde tem <strong>enp0s3</strong>{' '}
          aparecera sua interface.
        </Components.P>

        <CopyToClipboardButton text="ip a" />
        <Components.Div className="pb-4">
          <Components.P>Output do comando:</Components.P>
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <Image
              src={post_images![0]}
              alt="command_output"
              width={800}
              height={400}
              loading="eager"
            />
          )}
        </Components.Div>
        <Components.P>Mas em geral costumos sempre seguir essa sequencia de comandos.</Components.P>
        <CopyToClipboardButton text="rfkill unblock all" className="mt-2" />
        <br />
        <CopyToClipboardButton text="iwctl station list" className=" " />
        <br />
        <CopyToClipboardButton text="iwctl" className=" " />
        <br />
        <br />
        <Components.P>Dentro do iwctl: </Components.P>
        <CopyToClipboardButton text="station list" className="mt-2" />
        <br />
        <CopyToClipboardButton
          text="station wlan0 get-networks"
          className=" "
        />
        <br />
        <CopyToClipboardButton
          text="station wlan0 connect nome-da-rede"
          className="mb-4"
        />

        <Components.Div className="responsive-text pb-2">
          <h3 className="text-xl font-semibold mb-4">
            Explicação do comando <strong>rfkill unblock all</strong>
          </h3>
          <Components.P>
            O comando rfkill unblock all no Linux é usado para desbloquear todas
            as interfaces de rádio do sistema que foram bloqueadas por software
            ou hardware. O comando rfkill é utilizado para gerenciar
            dispositivos que têm transmissões de rádio, como:
          </Components.P>
          <ul className="list-disc list-inside">
            <li className="pl-4">Wi-Fi (Wireless LAN)</li>

            <li className="pl-4">Bluetooth</li>

            <li className="pl-4">Modems de banda larga móvel (3G, 4G)</li>

            <li className="pl-4">NFC (Near Field Communication)</li>
          </ul>

          <Components.H2>Detalhamentos:</Components.H2>
          <ul className="list-disc list-inside">
            <li className="pl-4">
              {' '}
              <strong>rfkill</strong>: Utilitário de gerenciamento de bloqueios
              de rádio no Linux.
            </li>
            <li className="pl-4">
              <strong>unblock</strong>: O comando para desbloquear o(s)
              dispositivo(s).
            </li>
            <li className="pl-4">
              <strong>all</strong>: Especifica que todos os dispositivos devem
              ser desbloqueados.
            </li>
          </ul>
        </Components.Div>
        <Components.H2>3. Atualizar o relógio do sistema</Components.H2>
        <Components.P>
          Comando <strong>set-ntp true</strong> habilita o NTP, que sincroniza o
          relógio do sistema com servidores de tempo na internet ou na rede
          local, garantindo que a hora do sistema esteja sempre correta.
        </Components.P>
        <CopyToClipboardButton text="timedatectl set-ntp true" />

        <Components.H2>
          4. Conferir discos usando lsblk e particionar o disco usando fdisk
        </Components.H2>
        <Components.P>
          O meu disco será esse <strong>sda</strong> de 37.5G. O seu
          provavelmente será diferente, mas não importa, escolha o seu e siga os
          passos. Para qualquer duvida mande um email!
        </Components.P>
        <CopyToClipboardButton text="lsblk" />
         <Components.Div className="pb-4">
          <Components.P>Output do comando:</Components.P>
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <Image
              src={post_images![1]}
              alt="command_output"
              width={800}
              height={400}
              loading="eager"
            />
          )}
        </Components.Div>
        <Components.P>
          Agora vamos usar o comando a baixo e particionar nosso disco. Não
          esqueça de seleciona o caminho correto da sua partição, se encontra em{' '}
          <strong>/dev/nomedaparticao</strong>.
        </Components.P>
        <CopyToClipboardButton text="fdisk /dev/sda" />
        <Components.Div className="pb-4">
          <Components.P>Output do comando:</Components.P>
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <Video src={post_videos![0]} />
          )}
        </Components.Div>
        <Components.H3>Partições criadas: </Components.H3>
         <Components.Div className="pb-4">
          <Components.P>Output do comando:</Components.P>
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <Image
              src={post_images![2]}
              alt="command_output"
              width={800}
              height={400}
              loading="eager"
            />
          )}
        </Components.Div>

        <Components.H2>5. Formatar as partições</Components.H2>
        <Components.P>
          Usando <strong>mkfs</strong> para formata as partições de acordo com o
          sistema de arquivos que você quiser. A flag <strong>-L</strong> é para
          expecifica o nome da partição.
        </Components.P>
        <CopyToClipboardButton text="mkfs.fat -F32 /dev/sda1" />
        <CopyToClipboardButton text="mkfs.btrfs -L ArchLinux /dev/sda2" />

        <Components.H2>6. Criar subvolumes Btrfs</Components.H2>
        <Components.P>
          Montando a partição que contera todos os subvolumes em{' '}
          <strong>/mnt</strong>.
        </Components.P>
        <CopyToClipboardButton text="mount /dev/sda2 /mnt" />
        <Components.P>
          Agora cria os subvolumes que contera todos os arquivos do seu sistema.
          Nessa parte é algo mais pessoal, então fique a vontade, eu costumava
          usar esse esquema, mas no video optei por criar apenas um subvolume{' '}
          <strong>/</strong> e <strong>/home</strong>.
        </Components.P>
        <CopyToClipboardButton text="btrfs su cr /mnt/@" />
        <CopyToClipboardButton text="btrfs su cr /mnt/@home" />
        <CopyToClipboardButton text="btrfs su cr /mnt/@snapshots" />
        <CopyToClipboardButton text="btrfs su cr /mnt/@var" />
        <CopyToClipboardButton text="btrfs su cr /mnt/@log" />
        <CopyToClipboardButton text="btrfs su cr /mnt/@cache" />
        <CopyToClipboardButton text="umount /mnt" />

        <Components.H2>7. Montar os subvolumes corretamente</Components.H2>
        <CopyToClipboardButton text="mount -o subvol=@ /dev/nvme0n1p2 /mnt" />
        <CopyToClipboardButton text="mkdir -p /mnt/{boot,home,.snapshots,var,log,cache}" />
        <CopyToClipboardButton text="mount /dev/nvme0n1p1 /mnt/boot" />
        <CopyToClipboardButton text="mount -o subvol=@home /dev/nvme0n1p2 /mnt/home" />
        <CopyToClipboardButton text="mount -o subvol=@snapshots /dev/nvme0n1p2 /mnt/.snapshots" />
        <CopyToClipboardButton text="mount -o subvol=@var /dev/nvme0n1p2 /mnt/var" />
        <CopyToClipboardButton text="mount -o subvol=@log /dev/nvme0n1p2 /mnt/log" />
        <CopyToClipboardButton text="mount -o subvol=@cache /dev/nvme0n1p2 /mnt/cache" />

        <Components.H2>8. Instalar o sistema base do Arch Linux</Components.H2>
        <Components.P>
          Esses pacotes fornecem as bases para um sistema Arch Linux funcional e
          permitem que você comece a personalizá-lo conforme suas necessidades.
        </Components.P>
        <CopyToClipboardButton text="pacstrap /mnt base linux linux-firmware base-devel vim dhcpcd" />

        <Components.H2>9. Gerar o fstab</Components.H2>
        <Components.P>
          O comando genfstab é usado para gerar um arquivo fstab, que é um
          arquivo de configuração do sistema que informa ao Linux como montar as
          partições durante a inicialização.
        </Components.P>

        <CopyToClipboardButton text="genfstab -U /mnt >> /mnt/etc/fstab" />
        <CopyToClipboardButton text="cat /mnt/etc/fstab" />

        <Components.H2>10. Entrar no novo sistema</Components.H2>
        <CopyToClipboardButton text="arch-chroot /mnt" />

        <Components.H2>11. Configurar o timezone</Components.H2>
        <Components.P>
          Isso configuraria corretamente o fuso horário, sincronizaria o relógio
          do hardware e exibiria a data e a hora atuais.
        </Components.P>
        <CopyToClipboardButton text="ln -sf /usr/share/zoneinfo/Region/City /etc/localtime" />
        <CopyToClipboardButton text="hwclock --systohc" />
        <CopyToClipboardButton text="date" />

        <Components.H2>12. Configurar localização</Components.H2>
        <Components.P>
          Esses passos garantem que seu sistema esteja configurado para o idioma
          e o layout de teclado corretos.
        </Components.P>
        <CopyToClipboardButton text="vim /etc/locale.gen" />
        <CopyToClipboardButton text="locale-gen" />
        <CopyToClipboardButton text="echo KEYMAP=br-abnt2 > /etc/vconsole.conf" />

        <Components.H2>13. Configurar hostname</Components.H2>
        <Components.P>
          Essas configurações são importantes para a identificação do seu
          sistema na rede e para a resolução de nomes de host.
        </Components.P>
        <CopyToClipboardButton text="echo arch > /etc/hostname" />
        <CopyToClipboardButton text='echo "127.0.0.1 localhost" >> /etc/hosts' />
        <CopyToClipboardButton text='echo "::1 localhost" >> /etc/hosts' />
        <CopyToClipboardButton text='echo "127.0.1.1 meu-hostname.localdomain meu-hostname" >> /etc/hosts' />

        <Components.H2>14. Definir senha de root</Components.H2>
        <CopyToClipboardButton text="passwd" />

        <Components.H2>15. Criar usuário</Components.H2>
        <Components.P>
          Após a execução desses comandos, você terá um novo usuário arch
          configurado com as permissões apropriadas e pronto para ser utilizado.{' '}
        </Components.P>
        <CopyToClipboardButton text="useradd -m -g users -G wheel,video,audio,kvm -s /bin/bash arch" />
        <CopyToClipboardButton text="passwd arch" />

        <Components.H2>16. Instalar pacotes essenciais</Components.H2>
        <Components.P>
          Ao executar este comando, você estará instalando ferramentas
          essenciais para gerenciamento de arquivos, redes, e configuração do
          sistema, facilitando tanto a administração quanto o uso diário do Arch
          Linux. Fique a vontade para adicionar seus pacotes pessoais, como um
          terminal, gerenciador de arquivos e até um navegador.
        </Components.P>
        <CopyToClipboardButton text="pacman -Sy dosfstools os-prober mtools networkmanager wpa_supplicant wireless_tools dialog sudo" />

        <Components.H2>17. Instalar o GRUB</Components.H2>
        <Components.P>
          Após executar esses comandos, o GRUB estará instalado e configurado,
          permitindo que você inicialize seu sistema Arch Linux (e outros
          sistemas operacionais, se instalados) corretamente.
        </Components.P>
        <CopyToClipboardButton text="pacman -S grub efibootmgr" />
        <CopyToClipboardButton text="grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=arch --recheck" />
        <CopyToClipboardButton text="grub-mkconfig -o /boot/grub/grub.cfg" />

        <Components.H2>18. Finalizar e reiniciar</Components.H2>
        <CopyToClipboardButton text="exit" />
        <CopyToClipboardButton text="umount -R /mnt" />
        <CopyToClipboardButton text="reboot" />

        <Components.H2>19. Conceder privilégios de root ao usuário</Components.H2>
        <Components.P>
          Após essas etapas, os usuários que pertencem ao grupo wheel poderão
          usar o sudo para executar comandos com privilégios elevados. Isso é
          útil para a administração do sistema, permitindo que você conceda
          permissões temporárias a usuários sem dar a eles a senha do root.
        </Components.P>
        <CopyToClipboardButton text="su -" />
        <CopyToClipboardButton text="EDITOR=vi visudo" />
        <Components.P>
          Descomentar a linha <strong>%wheel ALL=(ALL:ALL) ALL</strong>
        </Components.P>
         <Components.Div className="pb-4">
          <Components.P>Output do comando:</Components.P>
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <Image
              src={post_images![3]}
              alt="command_output"
              width={800}
              height={400}
              loading="eager"
            />
          )}
        </Components.Div>

        <Components.H2>21. Configurar idioma</Components.H2>
        <CopyToClipboardButton text='echo "LANG=pt_BR.UTF8" > /etc/locale.conf' />

        <Components.H2>22. Ativar serviços essenciais</Components.H2>
        <Components.P>
          Em muitos casos, o NetworkManager pode gerenciar conexões de rede de
          forma mais eficiente do que o dhcpcd. Se você optar por usar o
          NetworkManager, pode não ser necessário habilitar o dhcpcd, pois o
          NetworkManager já é capaz de lidar com a configuração de rede. Para
          evitar conflitos, é recomendável desabilitar um deles se estiver
          utilizando o outro.
        </Components.P>
        <CopyToClipboardButton text="systemctl enable NetworkManager --now" />
        <CopyToClipboardButton text="systemctl enable dhcpcd --now" />
        <Components.H2>23. Verificar conexão com a internet</Components.H2>
        <CopyToClipboardButton text="ping google.com" />

         <Components.Div className="pb-4">
          <Components.P>Output do comando:</Components.P>
          {isLoading ? (
            <Components.Div className="w-full h-[200px] bg-gray-300 animate-pulse" />
          ) : (
            <Image
              src={post_images![4]}
              alt="command_output"
              width={800}
              height={400}
              loading="eager"
            />
          )}
        </Components.Div>

        <Components.H2>23. Configurar zRAM para swap</Components.H2>
        <Components.P>
          Após executar esses comandos, o ZRAM estará configurado para ser usado
          como espaço de swap, ajudando a otimizar o desempenho do seu sistema
          Arch Linux.{' '}
        </Components.P>
        <CopyToClipboardButton text="pacman -S zramswap" />
        <CopyToClipboardButton text="systemctl enable zramswap.service" />

        <Components.H2>24. Instalar codecs e ajustar o sistema</Components.H2>
        <Components.P>
          Não deixem de instalar! Esses comandos instalam pacotes de multimídia,
          atualizam o sistema, instalam uma ferramenta para gerenciar espelhos e
          configuram uma lista de espelhos mais rápidos no Brasil.
        </Components.P>
        <CopyToClipboardButton text="pacman -Sy gstreamer ffmpeg gst-plugins-ugly gst-plugins-good gst-plugins-base gst-plugins-bad gst-libav" />
        <CopyToClipboardButton text="pacman -Syyuu" />
        <CopyToClipboardButton text="pacman -S reflector" />
        <CopyToClipboardButton text="reflector -c Brazil --save /etc/pacman.d/mirrorlist" />

        <Components.H2>25. Instalar drivers e ambiente gráfico</Components.H2>
        <Components.P>
          Os comandos fornecidos são utilizados para instalar drivers gráficos e
          configurar um ambiente gráfico no Arch Linux com o KDE Plasma.
          Primeiro, são instalados os drivers para placas AMD com o comando sudo
          pacman -S xf86-video-amdgpu mesa, que inclui o driver gráfico AMD e as
          bibliotecas Mesa para suporte a gráficos 3D. Em seguida, o servidor X
          e o ambiente gráfico KDE Plasma são instalados usando o comando pacman
          -S xorg-server xorg-xinit plasma-wayland-session plasma xorg-xwayland,
          que configura o ambiente de desktop e permite a execução de
          aplicativos X11 em Wayland. Por fim, o gerenciador de exibição SDDM é
          habilitado com systemctl enable sddm.service, garantindo que ele
          inicie automaticamente na inicialização do sistema.{' '}
        </Components.P>
        <CopyToClipboardButton text="sudo pacman -S xf86-video-amdgpu mesa" />
        <Components.P>
          Se você estiver utilizando placas de vídeo de outras marcas (como
          NVIDIA ou Intel), precisará instalar os drivers correspondentes. Por
          exemplo:
        </Components.P>
        <Components.P>Para NVIDIA:</Components.P>
        <CopyToClipboardButton text="sudo pacman -S nvidia nvidia-utils" />
        <Components.P>Para Intel:</Components.P>
        <CopyToClipboardButton text="sudo pacman -S xf86-video-intel" />
        <CopyToClipboardButton text="pacman -S xorg-server xorg-xinit plasma-wayland-session plasma xorg-xwayland" />
        <CopyToClipboardButton text="systemctl enable sddm.service" />

        <Components.H2>26. Corrigir erros com LightDM</Components.H2>
        <CopyToClipboardButton text="sudo pacman -S sddm" />
        <CopyToClipboardButton text="systemctl disable lightdm.service" />
        <CopyToClipboardButton text="systemctl enable sddm.service" />

        <Components.H2>27. Reiniciar</Components.H2>
        <Components.P>
          Obrigado por ter ficado até o fim e espero ter agregado algum
          conhecimento. Caso tenha algum problemas é só entra em contato por
          e-mail. Por fim apenas reiniciar e aproveitar seu novo sistema!
        </Components.P>
        <CopyToClipboardButton text="reboot" />
      </>
  )
}