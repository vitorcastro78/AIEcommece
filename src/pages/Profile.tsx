// app/profile/page.

import { Suspense, lazy } from 'react'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useProfileData } from '@/hooks/useProfileData'
import { useAnalytics } from '@/hooks/useAnalytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const ProfileDetails = lazy(() => import('@/components/ProfileDetails'))
const SubscriptionList = lazy(() => import('@/components/SubscriptionList'))
const SubscriptionActions = lazy(() => import('@/components/SubscriptionActions'))

export const metadata: Metadata = {
  title: 'Profile | Subscriptio',
  description: 'Manage your subscriptions, profile details, and preferences.',
  openGraph: {
    title: 'Profile | Subscriptio',
    description: 'Manage your subscriptions, profile details, and preferences.',
    url: 'https://subscriptio.com/profile',
    type: 'profile'
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const { profile, subscriptions, isLoading, error } = useProfileData()
  useAnalytics('profile_page_view')

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-xl font-semibold">Unable to load profile</h2>
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Profile', href: '/profile' }
        ]}
      />
      <main className="max-w-3xl mx-auto py-8 px-4">
        <ErrorBoundary>
          <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded" />}>
            <ProfileDetails profile={profile} isLoading={isLoading} />
          </Suspense>
        </ErrorBoundary>
        <section className="mt-8">
          <h2 className="text-lg font-bold mb-4">Your Subscriptions</h2>
          <ErrorBoundary>
            <Suspense fallback={<div className="animate-pulse h-24 bg-gray-100 rounded" />}>
              <SubscriptionList subscriptions={subscriptions} isLoading={isLoading} />
            </Suspense>
          </ErrorBoundary>
        </section>
        <section className="mt-8">
          <ErrorBoundary>
            <Suspense fallback={<div className="animate-pulse h-16 bg-gray-100 rounded" />}>
              <SubscriptionActions />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </>
  )
}