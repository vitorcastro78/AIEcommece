// app/products/page.

import { Suspense, lazy } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProductList = lazy(() => import('@/components/ProductList'))
const Breadcrumbs = lazy(() => import('@/components/Breadcrumbs'))
const ErrorBoundary = lazy(() => import('@/components/ErrorBoundary'))

export const metadata: Metadata = {
  title: 'Subscription Products | Subscriptio',
  description: 'Browse and subscribe to our curated selection of subscription products. Flexible plans, easy management, and exclusive offers.',
  openGraph: {
    title: 'Subscription Products | Subscriptio',
    description: 'Browse and subscribe to our curated selection of subscription products. Flexible plans, easy management, and exclusive offers.',
    url: 'https://www.subscriptio.com/products',
    type: 'website'
  }
}

function useAnalytics(page: string) {
  useEffect(() => {
    window?.gtag?.('event', 'page_view', { page_path: page })
  }, [page])
}

function useSubscriptionProducts() {
  const [products, setProducts] = React.useState<null | Array<any>>(null)
  const [error, setError] = React.useState<null | Error>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch('/api/products?type=subscription')
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setProducts(data)
          setLoading(false)
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError(e)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  return { products, error, loading }
}

export default function ProductsPage() {
  useAnalytics('/products')
  const { products, error, loading } = useSubscriptionProducts()
  const router = useRouter()

  return (
    <>
      <Suspense fallback={null}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' }
          ]}
        />
      </Suspense>
      <main>
        <h1 className="text-3xl font-bold mb-4">Subscription Products</h1>
        <Suspense fallback={<div>Loading products...</div>}>
          <ErrorBoundary>
            <ProductList
              products={products}
              loading={loading}
              error={error}
              onProductClick={(id: string) => router.push(`/products/${id}`)}
            />
          </ErrorBoundary>
        </Suspense>
      </main>
    </>
  )
}
