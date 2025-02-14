'use client'
import Profile from '../../public/assets/profile.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import UserMenu from './menu-user'
import { useAuth } from '@/context/auth-context'

export const Header = () => {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="bg-[#0f0f0f] p-4 shadow-md border-b-2 border-gray-800">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Image
            src={Profile}
            alt="Imagem de Perfil"
            width={50}
            height={50}
            className="rounded-full"
            priority
          />
          <div className="text-xl font-bold text-gray-200">Next Level Code</div>
        </div>

        <ul className="flex gap-4 list-none">
          <li>
            <Link
              href="/"
              className={`flex items-center transition-all text-gray-400 hover:text-blue-400 ${
                pathname === '/' ? 'text-blue-400 font-bold' : ''
              }`}
            >
              <FaHome className="mr-1 h-5 w-5" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/news/posts"
              className={`flex items-center transition-all text-gray-400 hover:text-blue-400 ${
                pathname === '/news/posts' ? 'text-blue-400 font-bold' : ''
              }`}
            >
              Posts 📝
            </Link>
          </li>
          <li>
            <Link
              href="/news/feed"
              className={`flex items-center transition-all text-gray-400 hover:text-blue-400 ${
                pathname === '/news/feed' ? 'text-blue-400 font-bold' : ''
              }`}
            >
              Feed 📢
            </Link>
          </li>
          <li>
            <Link
              href="/news/videos"
              className={`flex items-center transition-all text-gray-400 hover:text-blue-400 ${
                pathname === '/news/videos' ? 'text-blue-400 font-bold' : ''
              }`}
            >
              Videos 🎥
            </Link>
          </li>

          {isAuthenticated ? (
            <li className="flex items-center gap-6 border-l border-gray-700 pl-4">
              <UserMenu />
            </li>
          ) : (
            <li className="flex items-center gap-6 border-l border-gray-700 pl-4">
              <Link
                href="/auth/login"
                className={`flex items-center gap-2 text-gray-300 transition-all hover:text-blue-400 ${
                  pathname === '/auth/login' ? 'text-blue-400 font-bold' : ''
                }`}
              >
                <FaSignInAlt className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/auth/register"
                className={`flex items-center gap-2 text-gray-300 transition-all hover:text-blue-400 ${
                  pathname === '/auth/register' ? 'text-blue-400 font-bold' : ''
                }`}
              >
                <FaUserPlus className="w-4 h-4" />
                Registrar
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
