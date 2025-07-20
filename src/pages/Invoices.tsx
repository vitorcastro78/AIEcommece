// app/invoices/page.

import { Suspense, lazy } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useInvoices } from '@/hooks/useInvoices'
import { useAnalytics } from '@/hooks/useAnalytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const InvoiceList = lazy(() => import('@/components/InvoiceList'))

export const metadata: Metadata = {
  title: 'Invoices | Subscriptions Ecommerce',
  description: 'View and manage your subscription invoices.',
  openGraph: {
    title: 'Invoices | Subscriptions Ecommerce',
    description: 'View and manage your subscription invoices.',
    url: 'https://www.yoursubscriptionstore.com/invoices',
    type: 'website'
  }
}

export default function InvoicesPage() {
  useAnalytics('page_view', { page: 'invoices' })
  const { invoices, loading, error } = useInvoices()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/account' },
          { label: 'Invoices', href: '/invoices' }
        ]}
      />
      <main>
        <h1>Invoices</h1>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading invoices...</div>}>
            <InvoiceList invoices={invoices} loading={loading} error={error} />
          </Suspense>
        </ErrorBoundary>
        <div>
          <Link href="/account">Back to Account</Link>
        </div>
      </main>
    </>
  )
}

// hooks/useInvoices.ts

import { useState, useEffect } from 'react'

export function useInvoices() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/invoices')
      .then(res => res.json())
      .then(data => {
        if (active) {
          setInvoices(data)
          setLoading(false)
        }
      })
      .catch(e => {
        if (active) {
          setError(e)
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [])

  return { invoices, loading, error }
}

// hooks/useAnalytics.ts

import { useEffect } from 'react'

export function useAnalytics(event: string, data: Record<string, any>) {
  useEffect(() => {
    window?.gtag?.('event', event, data)
  }, [event, data])
}

// components/Breadcrumbs.

import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {items.map((item, idx) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            {idx < items.length - 1 && ' / '}
          </li>
        ))}
      </ol>
    </nav>
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
      return <div>Something went wrong loading invoices.</div>
    }
    return this.props.children
  }
}

// components/InvoiceList.

type Invoice = {
  id: string
  date: string
  amount: number
  status: string
  downloadUrl: string
}

export default function InvoiceList({
  invoices,
  loading,
  error
}: {
  invoices: Invoice[]
  loading: boolean
  error: Error | null
}) {
  if (loading) return <div>Loading invoices...</div>
  if (error) return <div>Failed to load invoices.</div>
  if (!invoices.length) return <div>No invoices found.</div>
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(inv => (
          <tr key={inv.id}>
            <td>{inv.date}</td>
            <td>${inv.amount.toFixed(2)}</td>
            <td>{inv.status}</td>
            <td>
              <a href={inv.downloadUrl} target="_blank" rel="noopener noreferrer">
                PDF
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}