// app/product/[productId]/page.

import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { useProductDetail } from '@/hooks/useProductDetail'
import { useAnalytics } from '@/hooks/useAnalytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const ProductSubscriptionOptions = dynamic(() => import('@/components/ProductSubscriptionOptions'), { ssr: false, loading: () => <LoadingSpinner /> })
const ProductInfo = dynamic(() => import('@/components/ProductInfo'), { ssr: false, loading: () => <LoadingSpinner /> })
const ProductReviews = dynamic(() => import('@/components/ProductReviews'), { ssr: false, loading: () => <LoadingSpinner /> })

type ProductDetailPageProps = {
  params: { productId: string }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await fetch(`${process.env.API_URL}/products/${params.productId}`, { cache: 'no-store' }).then(res => res.json())
  if (!product) return {}
  return {
    title: `${product.name} | Subscription`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }]
    }
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { product, isLoading, error } = useProductDetail(params.productId)
  useAnalytics('view_product', { productId: params.productId })

  if (isLoading) return <LoadingSpinner />
  if (error || !product) return notFound()

  return (
    <ErrorBoundary>
      <main>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Subscriptions', href: '/subscriptions' },
            { label: product.name, href: `/product/${product.id}` }
          ]}
        />
        <section>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductInfo product={product} />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductSubscriptionOptions productId={product.id} />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductReviews productId={product.id} />
          </Suspense>
        </section>
      </main>
    </ErrorBoundary>
  )
}