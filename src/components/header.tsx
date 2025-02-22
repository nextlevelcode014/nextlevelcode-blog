'use client'

import Profile from '../../public/assets/profile.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
              className={`flex items-center transition-all ${
                pathname === '/'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              <FaHome className="mr-1 h-5 w-5" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/news/posts"
              className={`flex items-center transition-all ${
                pathname === '/news/posts' || pathname === '/news/videos'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              News 📰
            </Link>
          </li>
          <li>
            <Link
              href="/feed"
              className={`flex items-center transition-all ${
                pathname === '/feed'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              Feed 📢
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`flex items-center transition-all ${
                pathname === '/about'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              About ℹ️
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
                className={`flex items-center gap-2 transition-all ${
                  pathname === '/auth/login'
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <FaSignInAlt className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/auth/register"
                className={`flex items-center gap-2 transition-all ${
                  pathname === '/auth/register'
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-300 hover:text-blue-400'
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
