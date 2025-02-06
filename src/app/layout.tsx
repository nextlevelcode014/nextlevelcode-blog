import Link from 'next/link'
import './globals.css'
import { Metadata } from 'next'
import Provider from '@/services/provider'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'NextLevelCodeBlog',
  description: 'Next Level Code Blog sobre Linux, programação e Bitcoin',
  icons: {
    icon: '/src/public/assets/favicon.icon',
  },
  openGraph: {
    title: 'NextLevelCodeBlog',
    description: 'Blog educacional sobre Linux, programação e Bitcoin',
    type: 'website',
    url: 'https://nextlevelcodeblog.com',
  },
}

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          {modal}
        </Provider>
        <footer
          id="footer"
          className="bg-[#242424] text-gray-100 text-center p-4 mt-auto border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div>
              <Link
                href="mailto:nextlevelcode014@gmail.com"
                className="text-gray-400 hover:text-gray-200 transition duration-200"
              >
                nextlevelcode014@gmail.com
              </Link>
              <Link
                href="https://github.com/m4rc3l04ugu2t0"
                target="_blank"
                className="text-gray-400 hover:text-gray-200 transition duration-200"
              >
                github.com/m4rc3l04ugu2t0
              </Link>
            </div>
            <p className="text-gray-400">&copy; 2024 NextLevelCodeBlog.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
