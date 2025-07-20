// app/register/page.

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRegisterForm } from '../../hooks/useRegisterForm'
import { useAnalytics } from '../../hooks/useAnalytics'
import { ErrorBoundary } from '../../components/ErrorBoundary'

const RegisterForm = dynamic(() => import('../../components/RegisterForm'), { ssr: false, loading: () => <div>Loading...</div> })
const Breadcrumbs = dynamic(() => import('../../components/Breadcrumbs'), { ssr: false })

export default function RegisterPage() {
  const router = useRouter()
  const { trackPageView } = useAnalytics()
  const { formState, handleChange, handleSubmit, error } = useRegisterForm()

  useEffect(() => {
    trackPageView('Register')
  }, [trackPageView])

  return (
    <>
      <Head>
        <title>Register | Subscription Ecommerce</title>
        <meta name="description" content="Create your account to manage your subscriptions and enjoy exclusive offers." />
        <meta property="og:title" content="Register | Subscription Ecommerce" />
        <meta property="og:description" content="Create your account to manage your subscriptions and enjoy exclusive offers." />
        <link rel="canonical" href="https://www.yoursubscriptionstore.com/register" />
      </Head>
      <nav aria-label="Breadcrumb">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Register', href: '/register' }
          ]}
        />
      </nav>
      <main>
        <h1>Register for Subscriptions</h1>
        <ErrorBoundary>
          <RegisterForm
            formState={formState}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
          />
        </ErrorBoundary>
        <div>
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </main>
    </>
  )
}

// hooks/useRegisterForm.ts

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

type FormState = {
  email: string
  password: string
  confirmPassword: string
}

export function useRegisterForm() {
  const [formState, setFormState] = useState<FormState>({ email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push('/subscriptions')
    } catch {
      setError('Registration failed')
    }
  }

  return { formState, handleChange, handleSubmit, error }
}

// hooks/useAnalytics.ts

import { useCallback } from 'react'

export function useAnalytics() {
  const trackPageView = useCallback((page: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'page_view', { page_title: page })
    }
  }, [])
  return { trackPageView }
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
      return <div>Something went wrong. Please try again later.</div>
    }
    return this.props.children
  }
}

// components/Breadcrumbs.

import Link from 'next/link'

type BreadcrumbItem = { label: string; href: string }
type Props = { items: BreadcrumbItem[] }

export default function Breadcrumbs({ items }: Props) {
  return (
    <ol className="breadcrumbs">
      {items.map((item, idx) => (
        <li key={item.href}>
          {idx < items.length - 1 ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  )
}

// components/RegisterForm.

type Props = {
  formState: { email: string; password: string; confirmPassword: string }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  error: string | null
}

export default function RegisterForm({ formState, onChange, onSubmit, error }: Props) {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <label>
        Email
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={onChange}
          required
          autoComplete="email"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={onChange}
          required
          autoComplete="new-password"
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={onChange}
          required
          autoComplete="new-password"
        />
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit">Register</button>
    </form>
  )
}