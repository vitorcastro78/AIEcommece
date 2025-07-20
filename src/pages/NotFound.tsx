// app/not-found.

import { Suspense, lazy } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Breadcrumbs = lazy(() => import('@/components/Breadcrumbs'))
const ErrorBoundary = lazy(() => import('@/components/ErrorBoundary'))
const Seo = lazy(() => import('@/components/Seo'))
const AnalyticsTracker = lazy(() => import('@/components/AnalyticsTracker'))

function useTrackNotFound() {
  useEffect(() => {
    window?.gtag?.('event', 'page_not_found', {
      page_location: window.location.href,
      page_path: window.location.pathname,
    })
  }, [])
}

export const metadata: Metadata = {
  title: 'Page Not Found | Subscriptions Store',
  description: 'Sorry, the page you are looking for does not exist. Discover our subscription plans.',
  robots: 'noindex, follow',
  openGraph: {
    title: 'Page Not Found | Subscriptions Store',
    description: 'Sorry, the page you are looking for does not exist. Discover our subscription plans.',
    url: '/not-found',
    type: 'website',
  },
}

export default function NotFoundPage() {
  useTrackNotFound()
  const router = useRouter()
  return (
    <>
      <Suspense fallback={null}>
        <Seo
          title="Page Not Found | Subscriptions Store"
          description="Sorry, the page you are looking for does not exist. Discover our subscription plans."
          noIndex
        />
        <AnalyticsTracker event="not_found" />
      </Suspense>
      <Suspense fallback={null}>
        <ErrorBoundary>
          <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
            <Suspense fallback={null}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: '404 Not Found', href: '/not-found' },
                ]}
              />
            </Suspense>
            <h1 className="text-4xl font-bold mt-8 mb-4 text-center">Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
              Sorry, we couldn’t find the page you’re looking for. Explore our subscription plans and exclusive offers.
            </p>
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Go to Home
              </Link>
              <Link
                href="/subscriptions"
                className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary-dark transition"
              >
                View Subscriptions
              </Link>
            </div>
          </main>
        </ErrorBoundary>
      </Suspense>
    </>
  )
}