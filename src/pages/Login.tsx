// app/login/page.

import { Suspense, lazy } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLoginForm } from '@/hooks/useLoginForm'
import { useAnalytics } from '@/hooks/useAnalytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Login | Subscriptions Ecommerce',
  description: 'Login to manage your subscriptions and access exclusive offers.',
  openGraph: {
    title: 'Login | Subscriptions Ecommerce',
    description: 'Login to manage your subscriptions and access exclusive offers.',
    url: '/login',
    siteName: 'Subscriptions Ecommerce',
    type: 'website',
  },
}

const Breadcrumbs = lazy(() => import('@/components/Breadcrumbs'))
const LoginForm = lazy(() => import('@/components/LoginForm'))

export default function LoginPage() {
  useAnalytics('login_page_view')
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { values, handleChange, handleSubmit, loading } = useLoginForm({
    onSuccess: () => router.push('/dashboard'),
    onError: setError,
  })

  return (
    <>
      <Suspense fallback={null}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Login', href: '/login' },
          ]}
        />
      </Suspense>
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <section className="w-full max-w-md p-8 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-6">Sign in to your account</h1>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm
                values={values}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
              />
            </Suspense>
          </ErrorBoundary>
          <div className="mt-4 text-center">
            <span>Don&apos;t have an account? </span>
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

// hooks/useLoginForm.ts

import { useState } from 'react'

type Props = {
  onSuccess: () => void
  onError: (msg: string) => void
}

export function useLoginForm({ onSuccess, onError }: Props) {
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Replace with real API call
      await new Promise((res, rej) =>
        setTimeout(() => {
          if (values.email === 'user@example.com' && values.password === 'password') res(true)
          else rej(new Error('Invalid credentials'))
        }, 800)
      )
      onSuccess()
    } catch (err: any) {
      onError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { values, handleChange, handleSubmit, loading }
}

// hooks/useAnalytics.ts

import { useEffect } from 'react'

export function useAnalytics(event: string) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', event)
    }
  }, [event])
}

// components/Breadcrumbs.

import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href: string
}

type Props = {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex space-x-2 text-sm text-gray-500">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center">
            {idx > 0 && <span className="mx-1">/</span>}
            <Link href={item.href} className="hover:underline text-gray-700">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// components/LoginForm.

type Props = {
  values: { email: string; password: string }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  error: string | null
}

export default function LoginForm({ values, onChange, onSubmit, loading, error }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={onChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={values.password}
          onChange={onChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

// components/ErrorBoundary.

import { Component, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return <div className="text-red-600">Something went wrong. Please try again.</div>
    }
    return this.props.children
  }
}