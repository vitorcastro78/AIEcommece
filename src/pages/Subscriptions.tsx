// app/subscriptions/page.

import { Suspense, lazy } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SubscriptionList = lazy(() => import('../../components/SubscriptionList'))
const SubscriptionFilter = lazy(() => import('../../components/SubscriptionFilter'))
const SubscriptionErrorBoundary = lazy(() => import('../../components/SubscriptionErrorBoundary'))

export const metadata: Metadata = {
  title: 'Subscriptions | ShopName',
  description: 'Browse and manage your subscriptions at ShopName. Flexible plans, exclusive offers, and seamless management.',
  openGraph: {
    title: 'Subscriptions | ShopName',
    description: 'Browse and manage your subscriptions at ShopName. Flexible plans, exclusive offers, and seamless management.',
    url: 'https://www.shopname.com/subscriptions',
    type: 'website'
  }
}

function usePageAnalytics(page: string) {
  useEffect(() => {
    window?.gtag?.('event', 'page_view', { page_path: page })
  }, [page])
}

function useSubscriptions() {
  // Placeholder for fetching subscriptions, replace with actual logic
  return {
    subscriptions: [],
    loading: false,
    error: null
  }
}

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex space-x-2 text-sm text-gray-600">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>/</li>
        <li>
          <span aria-current="page" className="font-semibold text-gray-900">Subscriptions</span>
        </li>
      </ol>
    </nav>
  )
}

export default function SubscriptionsPage() {
  const router = useRouter()
  usePageAnalytics('/subscriptions')
  const { subscriptions, loading, error } = useSubscriptions()

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>
      <Suspense fallback={<div className="mb-4">Loading filters...</div>}>
        <SubscriptionFilter />
      </Suspense>
      <Suspense fallback={<div>Loading subscriptions...</div>}>
        <SubscriptionErrorBoundary>
          <SubscriptionList subscriptions={subscriptions} loading={loading} error={error} />
        </SubscriptionErrorBoundary>
      </Suspense>
    </main>
  )
}
