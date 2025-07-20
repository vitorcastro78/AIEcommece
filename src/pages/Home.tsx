// app/home/page.

import { Suspense, lazy } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SubscriptionList = lazy(() => import('@/components/SubscriptionList'))
const FeaturedBanner = lazy(() => import('@/components/FeaturedBanner'))
const NewsletterSignup = lazy(() => import('@/components/NewsletterSignup'))

function useAnalytics(page: string) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', { page_path: page })
    }
  }, [page])
}

function useBreadcrumbs(paths: { name: string; href: string }[]) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex space-x-2 text-sm text-gray-500">
        {paths.map((p, i) => (
          <li key={p.href}>
            <Link href={p.href} className="hover:underline">
              {p.name}
            </Link>
            {i < paths.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false)
  if (hasError) return <div className="text-red-600">Something went wrong.</div>
  return (
    <React.ErrorBoundary
      fallbackRender={() => <div className="text-red-600">Something went wrong.</div>}
      onError={() => setHasError(true)}
    >
      {children}
    </React.ErrorBoundary>
  )
}

export const metadata: Metadata = {
  title: 'Home | Subscriptio',
  description: 'Discover and manage your favorite subscriptions. Curated plans, exclusive deals, and seamless management for all your recurring needs.',
  openGraph: {
    title: 'Home | Subscriptio',
    description: 'Discover and manage your favorite subscriptions.',
    url: 'https://www.subscriptio.com/',
    siteName: 'Subscriptio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Subscriptio Home',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Subscriptio',
    description: 'Discover and manage your favorite subscriptions.',
    images: ['/og-image.png'],
  },
}

export default function Home() {
  const router = useRouter()
  useAnalytics('/home')
  const breadcrumbs = useBreadcrumbs([
    { name: 'Home', href: '/' },
  ])
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {breadcrumbs}
      <ErrorBoundary>
        <Suspense fallback={<div className="h-48 flex items-center justify-center">Loading...</div>}>
          <FeaturedBanner />
        </Suspense>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Popular Subscriptions</h2>
          <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading subscriptions...</div>}>
            <SubscriptionList />
          </Suspense>
        </section>
        <section className="mt-12">
          <Suspense fallback={null}>
            <NewsletterSignup />
          </Suspense>
        </section>
      </ErrorBoundary>
    </main>
  )
}