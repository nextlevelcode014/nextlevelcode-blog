'use client'
import Profile from '../../public/assets/profile.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome } from 'react-icons/fa'

export const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const headerStyles = {
    backgroundColor: '#0f0f0f',
    padding: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    borderBottom: '2px solid #1f2937',
  }

  const navContainerStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const logoContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  }

  const navListStyles = {
    display: 'flex',
    gap: '1rem',
    listStyle: 'none',
  }

  const linkBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    color: '#9ca3af',
    textDecoration: 'none',
  }

  const activeLinkStyles = {
    ...linkBaseStyles,
    color: '#60a5fa',
    fontWeight: '700',
  }

  return (
    <header style={headerStyles}>
      <nav style={navContainerStyles}>
        <div style={logoContainerStyles}>
          {isHome && (
            <Image
              src={Profile}
              alt="Imagem de Perfil"
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
              priority
            />
          )}
          <div
            style={{ fontSize: '1.25rem', fontWeight: '700', color: '#e5e7eb' }}
          >
            Next Level Code
          </div>
        </div>

        <ul style={navListStyles}>
          <li>
            <Link href="/" style={isHome ? activeLinkStyles : linkBaseStyles}>
              <FaHome
                style={{
                  marginRight: '0.25rem',
                  height: '1.25rem',
                  width: '1.25rem',
                }}
              />
              Home
            </Link>
          </li>
          <li>
            <Link href="#footer" style={linkBaseStyles}>
              Sobre
            </Link>
          </li>
          <li>
            <Link href="#footer" style={linkBaseStyles}>
              Contato
            </Link>
          </li>
          |
          <li>
            <Link href="/login" style={{ ...linkBaseStyles, color: '#e5e7eb' }}>
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              style={{ ...linkBaseStyles, color: '#e5e7eb' }}
            >
              SingUp
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
