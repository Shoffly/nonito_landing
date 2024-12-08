import '../styles/globals.css'
import type { AppProps } from 'next/app'
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'
import GoogleTagManager from '../components/GoogleTagManager'
import FacebookPixel from '../components/FacebookPixel'
import { Metadata } from 'next'

if (typeof window !== 'undefined') {
  posthog.init('phc_6d3b8MReLeK1h1ZYYPzatmDF4o9kHXedOwd4sUo9Y90', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
  })
}

export const metadata: Metadata ={
  metadataBase: new URL("https://nonito.link"),
  keywords: ["nonito marketing, sms marketing egypt, sms retargeting, sms automation, customr forms, growth marketing MENA"],
  title: {
    default: "Nonito | The Modern SMS growth tool",
    template: "%s | Nonito"
  },
  openGraph: {
    description: "Nonito Marketing is a growth marketing tool that helps businesses grow through SMS marketing, retargeting, and automation.",
    siteName: "Nonito",
    images: [
      {
        url: "/nonito-logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-EG",
    type: "website",
  }

  
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostHogProvider client={posthog}>
      <GoogleTagManager />
      <FacebookPixel />
      <Component {...pageProps} />
    </PostHogProvider>
  )
}

export default MyApp
