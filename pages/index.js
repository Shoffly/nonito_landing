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
import LinkMe from '../components/link_me';
import HeroSection from '../components/herosection2';
import FeatureHighlight from '../components/highlightgrid';
import SEO from '../components/SEO';
import PainPoints from '../components/painpoints';
import Meet from '../components/meet';




export default function Home() {
  const posthog = usePostHog()  // Add this line

 

  useEffect(() => {
    // Track page view
    posthog?.capture('homepage_view')
  }, [posthog])

  const tracmpkComponentView = (componentName) => {
    posthog?.capture('coonent_view', { component: componentName })
  }

  return (
    <div className={styles.container}>
      <SEO />
      
      <Nav onClick={() => trackComponentView('Nav')}></Nav>
      <HeroSection onClick={() => trackComponentView('Hero')}></HeroSection>
      <PainPoints onClick={() => trackComponentView('PainPoints')} />
      <Meet onClick={() => trackComponentView('Meet')} />
      <FeatureHighlight onClick={() => trackComponentView('FeatureHighlight')} />
     
      
      
      
     
      <Footer onClick={() => trackComponentView('Footer')}></Footer>
      
    </div>
  );
}

