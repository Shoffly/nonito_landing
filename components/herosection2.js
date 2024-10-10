import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Hero2.module.css';
import { TypeAnimation } from 'react-type-animation';
import { getCalApi } from "@calcom/embed-react";

const HeroSection = () => {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({"namespace":"30min"});
        cal("ui", {
          "theme":"dark",
          "styles":{"branding":{"brandColor":"#4caf50"}},
          "hideEventTypeDetails":false,
          "layout":"month_view"
        });
      } catch (error) {
        console.error("Error initializing Cal API:", error);
      }
    })();
  }, []);

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1 className={styles.heroTitle}>
            Sell more with
          </h1>
          <h1 className={styles.heroTitlehighlight}>
            <TypeAnimation
              sequence={[
                'SMS',
                3000,
                'Forms',
                3000,
                'Links',
                3000,
                'QR codes',
                3000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
              className={styles.highlight}
            />
          </h1>
          <p className={styles.heroSubtitle}>
            Grow your brand, create personalized messaging at scale and unlock the power of tracking links with Nonito.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="https://mini.nonito.xyz/signup">
              <button className={styles.primaryCta}>Get Started</button>
            </Link>
            <button 
              className={styles.secondaryCta}
              data-cal-namespace="30min"
              data-cal-link="nonito/30min"
              data-cal-config='{"layout":"month_view","theme":"dark"}'
            >
              Schedule demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;