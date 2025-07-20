
// app/layouts/MainLayout.

import React, { Suspense, ReactNode, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'

type MainLayoutProps = {
  children: ReactNode
}

type Theme = 'light' | 'dark'
type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Subscriptio</span>
        </Link>
        <nav aria-label="Main Navigation" className="hidden md:flex gap-6 items-center">
          <Link href="/subscriptions" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Subscriptions</Link>
          <Link href="/products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Products</Link>
          <Link href="/cart" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Cart</Link>
          <Link href="/profile" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Profile</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === 'dark' ? (
              <svg width={20} height={20} fill="none" aria-hidden="true" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 0110 3.5a7 7 0 100 13.999A6.5 6.5 0 0110 16.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg width={20} height={20} fill="none" aria-hidden="true" viewBox="0 0 20 20">
                <path d="M10 3.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zm0 10.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm6.5-4.5a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zm-13 0a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zm9.19-4.44a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm-7.78 7.78a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm9.9 1.06a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm-7.78-7.78a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" fill="currentColor" />
              </svg>
            )}
          </button>
          <Link href="/login" className="hidden md:inline text-blue-600 dark:text-blue-400 font-semibold hover:underline">Login</Link>
        </div>
        <button
          aria-label="Open navigation menu"
          className="md:hidden ml-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          id="main-menu-toggle"
          onClick={() => {
            const nav = document.getElementById('mobile-nav')
            if (nav) nav.classList.toggle('hidden')
          }}
        >
          <svg width={24} height={24} fill="none" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile Navigation"
        className="md:hidden hidden px-4 pb-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      >
        <Link href="/subscriptions" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Subscriptions</Link>
        <Link href="/products" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Products</Link>
        <Link href="/cart" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Cart</Link>
        <Link href="/profile" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Profile</Link>
        <Link href="/login" className="block py-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline">Login</Link>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Subscriptio. All rights reserved.
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms</Link>
          <Link href="/contact" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}

function getBreadcrumbs(pathname: string) {
  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }]
  if (pathname === '/' || pathname === '') return crumbs
  const segments = pathname.split('/').filter(Boolean)
  let href = ''
  for (const seg of segments) {
    href += '/' + seg
    let label = seg.charAt(0).toUpperCase() + seg.slice(1)
    if (label === 'Profile') label = 'Profile'
    if (label === 'Cart') label = 'Cart'
    if (label === 'Checkout') label = 'Checkout'
    if (label === 'Subscriptions') label = 'Subscriptions'
    if (label === 'Products') label = 'Products'
    if (label === 'Invoices') label = 'Invoices'
    if (label === 'Login') label = 'Login'
    if (label === 'Register') label = 'Register'
    crumbs.push({ label, href })
  }
  return crumbs
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [theme, setTheme] = React.useState<Theme>('light')
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') setTheme(stored)
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark')
    }
  }, [])
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      window.localStorage.setItem('theme', theme)
    }
  }, [theme])
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Suspense fallback={<div className="h-6 w-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />}>
              <Breadcrumbs items={breadcrumbs} />
            </Suspense>
          </nav>
          <Suspense fallback={<div className="flex justify-center items-center h-40"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" aria-label="Loading" /></div>}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

