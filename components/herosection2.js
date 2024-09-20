import React from 'react';
import Link from 'next/link';
import styles from '../styles/Hero2.module.css';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1 className={styles.heroTitle}>
            Sell more with{' '}
            <TypeAnimation
              sequence={[
                'SMS',
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
            Grow your audience, create personalized messaging at scale and unlock the power of tracking links with Nonito.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/form">
              <button className={styles.primaryCta}>Get Demo</button>
            </Link>
            <Link href="/pricing">
              <span className={styles.secondaryCta}>See Plans</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;