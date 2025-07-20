// app/checkout/page.

import { Suspense, lazy } from 'react'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useCheckout } from '@/hooks/useCheckout'
import { useAnalytics } from '@/hooks/useAnalytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const CheckoutForm = lazy(() => import('@/components/CheckoutForm'))
const OrderSummary = lazy(() => import('@/components/OrderSummary'))

export const metadata: Metadata = {
  title: 'Checkout | Subscriptions Store',
  description: 'Complete your subscription purchase securely.',
  openGraph: {
    title: 'Checkout | Subscriptions Store',
    description: 'Complete your subscription purchase securely.',
    url: 'https://www.subscriptions-store.com/checkout',
    type: 'website'
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, loading, error } = useCheckout()
  useAnalytics('checkout_page_view')

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="text-red-500 text-center mt-10">An error occurred. Please try again.</div>

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Subscriptions', href: '/subscriptions' },
          { label: 'Checkout', href: '/checkout' }
        ]}
      />
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <ErrorBoundary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={<div>Loading Order Summary...</div>}>
            <OrderSummary cart={cart} />
          </Suspense>
          <Suspense fallback={<div>Loading Checkout Form...</div>}>
            <CheckoutForm cart={cart} onSuccess={() => router.push('/success')} />
          </Suspense>
        </div>
      </ErrorBoundary>
    </main>
  )
}
