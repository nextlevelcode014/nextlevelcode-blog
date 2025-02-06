'use client'
import Profile from '../../public/assets/profile.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

export const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Objetos de estilo
  const styles = {
    header: {
      backgroundColor: '#0f0f0f',
      padding: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderBottom: '2px solid #1f2937',
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    navList: {
      display: 'flex',
      gap: '1rem',
      listStyle: 'none',
    },
    linkBase: {
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      color: '#9ca3af',
      textDecoration: 'none',
    },
    activeLink: {
      color: '#60a5fa',
      fontWeight: '700',
    },
    authContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
    },
    authButtonsContainer: {
      display: 'flex',
      gap: '1rem',
      borderLeft: '1px solid #374151',
      paddingLeft: '1rem',
    },
    authButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#d1d5db',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
    },
    icon: {
      width: '1rem',
      height: '1rem',
    },
  }

  return (
    <header style={styles.header}>
      <nav style={styles.navContainer}>
        <div style={styles.logoContainer}>
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
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#e5e7eb',
            }}
          >
            Next Level Code
          </div>
        </div>

        <ul style={styles.navList}>
          <li>
            <Link
              href="/"
              className="icon-hover-effect"
              style={{
                ...styles.linkBase,
                ...(isHome && styles.activeLink),
              }}
            >
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
            <Link
              href="#footer"
              className="icon-hover-effect"
              style={styles.linkBase}
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href="#footer"
              className="icon-hover-effect"
              style={styles.linkBase}
            >
              Contato
            </Link>
          </li>
          <li>
            <div style={styles.authContainer}>
              <div style={styles.authButtonsContainer}>
                <Link
                  href="/login"
                  className="icon-hover-effect"
                  style={styles.authButton}
                >
                  <FaSignInAlt style={styles.icon} />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="icon-hover-effect"
                  style={styles.authButton}
                >
                  <FaUserPlus style={styles.icon} />
                  Registrar
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
