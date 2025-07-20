// app/cart/page.

import { Suspense, lazy } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const CartSummary = lazy(() => import('@/components/CartSummary'))
const CartItems = lazy(() => import('@/components/CartItems'))
const SubscriptionUpsell = lazy(() => import('@/components/SubscriptionUpsell'))

export const metadata: Metadata = {
  title: 'Your Subscription Cart | Subscribify',
  description: 'Review and manage your subscription cart before checkout.',
  openGraph: {
    title: 'Your Subscription Cart | Subscribify',
    description: 'Review and manage your subscription cart before checkout.',
    url: 'https://subscribify.com/cart',
    type: 'website'
  }
}

export default function CartPage() {
  useAnalytics('cart_view')
  const { items, total, isLoading, error } = useCart()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' }
        ]}
      />
      <main className="container mx-auto max-w-3xl py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Subscription Cart</h1>
        <ErrorBoundary>
          <Suspense fallback={<div className="animate-pulse">Loading cart...</div>}>
            <CartItems items={items} isLoading={isLoading} error={error} />
          </Suspense>
        </ErrorBoundary>
        <div className="my-8">
          <ErrorBoundary>
            <Suspense fallback={<div className="animate-pulse">Calculating summary...</div>}>
              <CartSummary total={total} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <SubscriptionUpsell />
          </Suspense>
        </ErrorBoundary>
        <div className="mt-8 flex justify-between items-center">
          <Link href="/subscriptions" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
          <Link
            href="/checkout"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            prefetch={false}
          >
            Proceed to Checkout
          </Link>
        </div>
      </main>
    </>
  )
}