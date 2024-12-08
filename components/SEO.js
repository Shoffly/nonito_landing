import Head from 'next/head'
import { DEFAULT_LOCALE } from '../utils/localeConfig'

export default function SEO({ 
  title = "Nonito | The Modern SMS growth tool",
  description = "Nonito Marketing is a growth marketing tool that helps businesses grow through SMS marketing, retargeting, and automation.",
  pagePath = "",
  locale = DEFAULT_LOCALE.code
}) {
  const baseUrl = 'https://nonito.link'
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="nonito marketing, sms marketing egypt, sms retargeting, sms automation, customr forms, growth marketing MENA" />
      
      {/* Open Graph with locale */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Nonito" />
      <meta property="og:url" content={`${baseUrl}${pagePath}`} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${baseUrl}/nonito-logo.png`} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="600" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="alternate" hrefLang="en-EG" href={`${baseUrl}${pagePath}`} />
      <link rel="alternate" hrefLang="en-AE" href={`${baseUrl}/${pagePath}`} />
      <link rel="alternate" hrefLang="en-SA" href={`${baseUrl}/${pagePath}`} />
    </Head>
  )
}