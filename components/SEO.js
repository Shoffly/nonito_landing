import Head from 'next/head'
import { DEFAULT_LOCALE } from '../utils/localeConfig'

export default function SEO({ 
  title = "Nonito | The Modern SMS growth tool",
  description = "Nonito Marketing is a growth marketing tool that helps businesses grow through SMS marketing, retargeting, and automation.",
  pagePath = "",
  locale = DEFAULT_LOCALE.code,
  imageUrl = "/social-card.jpg",
  imageAlt = "Nonito Marketing Platform",
  
}) {
  const baseUrl = 'https://nonito.link'
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="nonito marketing, sms marketing egypt, sms retargeting, sms automation, customr forms, growth marketing MENA" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}${pagePath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content="Nonito" />
      <meta property="og:locale" content={locale} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
   
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="alternate" hrefLang="en-EG" href={`${baseUrl}${pagePath}`} />
      <link rel="alternate" hrefLang="en-AE" href={`${baseUrl}/${pagePath}`} />
      <link rel="alternate" hrefLang="en-SA" href={`${baseUrl}/${pagePath}`} />
    </Head>
  )
}