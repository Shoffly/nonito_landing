import '../styles/globals.css'
import type { AppProps } from 'next/app'
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'
import GoogleTagManager from '../components/GoogleTagManager'

if (typeof window !== 'undefined') {
  posthog.init('phc_6d3b8MReLeK1h1ZYYPzatmDF4o9kHXedOwd4sUo9Y90', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostHogProvider client={posthog}>
      <GoogleTagManager />
      <Component {...pageProps} />
    </PostHogProvider>
  )
}

export default MyApp
