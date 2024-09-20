import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Bento from "../components/bentobox";
import Bentof from "../components/bentoflex";
import Hero from "../components/herosection";
import Footer from "../components/footer"
import Nav from "../components/Nav"
import { usePostHog } from 'posthog-js/react'  // Add this import

export default function Home() {
  const posthog = usePostHog()  // Add this line

  useEffect(() => {
    // Track page view
    posthog?.capture('homepage_view')
  }, [posthog])

  const trackComponentView = (componentName) => {
    posthog?.capture('component_view', { component: componentName })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nonito</title>
        <meta name="description" content="| the growth tool for modern marketing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav onClick={() => trackComponentView('Nav')}></Nav>
      <Hero onClick={() => trackComponentView('Hero')}></Hero>
      <Bentof onClick={() => trackComponentView('Bentof')} />
      <Bento onClick={() => trackComponentView('Bento')}></Bento>
      <Footer onClick={() => trackComponentView('Footer')}></Footer>
    </div>
  );
}
