import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drag & Drop App Builder',
  description: 'Build mobile apps with drag and drop interface',
  keywords: ['app builder', 'drag and drop', 'mobile apps', 'apk', 'react native'],
  authors: [{ name: 'App Builder Team' }],
  openGraph: {
    title: 'Drag & Drop App Builder',
    description: 'Build mobile apps with drag and drop interface',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}