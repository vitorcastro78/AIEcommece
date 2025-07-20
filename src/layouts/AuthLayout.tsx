
// app/(auth)/AuthLayout.

import React, { Suspense, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeProvider, ThemeContext } from '@/contexts/ThemeContext'
import dynamic from 'next/dynamic'

const Breadcrumbs = dynamic(() => import('@/components/Breadcrumbs'), { ssr: false, loading: () => <nav className="mb-6 h-6" /> })

type AuthLayoutProps = {
  children: React.ReactNode
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Subscriptions', href: '/subscriptions' },
  { label: 'Products', href: '/products' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' }
]

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          Subscriptio
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex gap-4 items-center">
            {navLinks.slice(0, 3).map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 01.993.883L11 3v1a1 1 0 01-1.993.117L9 4V3a1 1 0 011-1zm4.22 2.22a1 1 0 011.415 1.415l-.707.707a1 1 0 01-1.415-1.415l.707-.707zM18 9a1 1 0 01.117 1.993L18 11h-1a1 1 0 01-.117-1.993L17 9h1zm-2.22 6.78a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 011.415-1.415l.707.707zM10 16a1 1 0 01.993.883L11 17v1a1 1 0 01-1.993.117L9 18v-1a1 1 0 011-1zm-6.22-1.22a1 1 0 011.415-1.415l.707.707a1 1 0 01-1.415 1.415l-.707-.707zM4 9a1 1 0 01.117 1.993L4 11H3a1 1 0 01-.117-1.993L3 9h1zm2.22-6.78a1 1 0 01.707 1.707l-.707.707A1 1 0 014.22 3.22l.707-.707z" /></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
          <Link
            href="/login"
            className="hidden sm:inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="hidden sm:inline-block px-4 py-2 bg-gray-100 text-blue-700 rounded hover:bg-blue-100 transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-900 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 dark:text-gray-400 text-sm">
        <div>
          &copy; {new Date().getFullYear()} Subscriptio. All rights reserved.
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-4">
            <li>
              <Link href="/privacy" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Terms</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

function AuthNavigation() {
  return (
    <nav aria-label="Auth navigation" className="mb-8">
      <ul className="flex justify-center gap-4">
        <li>
          <Link href="/login" className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">Login</Link>
        </li>
        <li>
          <Link href="/register" className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">Register</Link>
        </li>
      </ul>
    </nav>
  )
}

function getBreadcrumbs(pathname: string) {
  if (pathname.startsWith('/login')) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Login', href: '/login' }
    ]
  }
  if (pathname.startsWith('/register')) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Register', href: '/register' }
    ]
  }
  if (pathname.startsWith('/forgot-password')) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Forgot Password', href: '/forgot-password' }
    ]
  }
  return [{ label: 'Home', href: '/' }]
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <Suspense fallback={<div className="mb-6 h-6 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />}>
              <Breadcrumbs items={breadcrumbs} />
            </Suspense>
            <AuthNavigation />
            <div className="bg-white dark:bg-gray-900 rounded shadow p-8">
              <Suspense fallback={<div className="flex justify-center items-center h-32"><svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg></div>}>
                {children}
              </Suspense>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

// contexts/ThemeContext.

import React, { createContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored === 'dark' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      if (next === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

