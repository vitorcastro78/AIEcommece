
// components/AdminLayout.

import React, { createContext, useContext, useState, ReactNode, Suspense, lazy } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumbs = lazy(() => import('@/components/Breadcrumbs'))

type Theme = 'light' | 'dark'
type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          <span aria-label="Subscriptio logo" className="sr-only">Subscriptio</span>
          <svg width={28} height={28} fill="none" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx={16} cy={16} r={16} fill="#2563eb" />
            <text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">S</text>
          </svg>
          Subscriptio
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex gap-6 items-center">
          <Link href="/subscriptions" className="hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Subscriptions</Link>
          <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Products</Link>
          <Link href="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Cart</Link>
          <Link href="/invoices" className="hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Invoices</Link>
          <Link href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Profile</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {theme === 'dark' ? (
              <svg width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor" />
              </svg>
            ) : (
              <svg width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 3v2m0 10v2m7-7h-2M5 10H3m11.07-5.07l-1.42 1.42M6.34 15.66l-1.42 1.42m0-12.02l1.42 1.42M15.66 15.66l-1.42-1.42" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
            )}
          </button>
          <Link href="/login" className="ml-2 px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500">Login</Link>
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button
        aria-label="Open navigation menu"
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setOpen(o => !o)}
      >
        <svg width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-lg z-40"
        >
          <ul className="flex flex-col gap-2 px-4 py-4">
            <li>
              <Link href="/subscriptions" className="block py-2 px-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setOpen(false)}>Subscriptions</Link>
            </li>
            <li>
              <Link href="/products" className="block py-2 px-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setOpen(false)}>Products</Link>
            </li>
            <li>
              <Link href="/cart" className="block py-2 px-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setOpen(false)}>Cart</Link>
            </li>
            <li>
              <Link href="/invoices" className="block py-2 px-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setOpen(false)}>Invoices</Link>
            </li>
            <li>
              <Link href="/profile" className="block py-2 px-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setOpen(false)}>Profile</Link>
            </li>
            <li>
              <Link href="/login" className="block py-2 px-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setOpen(false)}>Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-600 dark:text-blue-400">Subscriptio</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()}</span>
        </div>
        <nav aria-label="Footer navigation" className="flex gap-4">
          <Link href="/privacy" className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Privacy</Link>
          <Link href="/terms" className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Terms</Link>
          <Link href="/contact" className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}

function getBreadcrumbs(pathname: string) {
  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }]
  if (pathname === '/' || pathname === '') return crumbs
  const parts = pathname.split('/').filter(Boolean)
  let href = ''
  for (const part of parts) {
    href += '/' + part
    let label = part.charAt(0).toUpperCase() + part.slice(1)
    if (label === 'Product' && parts.length > 1 && parts[0] === 'product') label = 'Product'
    crumbs.push({ label, href })
  }
  return crumbs
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  return (
    <ThemeProvider>
      <Header />
      <main className="min-h-[70vh] max-w-7xl mx-auto w-full px-4 py-8">
        <Suspense fallback={<div className="h-8 w-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded mb-6" />}>
          <Breadcrumbs items={breadcrumbs} />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center items-center h-40"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" aria-label="Loading" /></div>}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </ThemeProvider>
  )
}

