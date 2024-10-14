import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Hero2.module.css';
import { TypeAnimation } from 'react-type-animation';
import { getCalApi } from "@calcom/embed-react";
import posthog from 'posthog-js'; // Make sure to import PostHog
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [isTestVariant, setIsTestVariant] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // PostHog feature flag check
    const emailSignUpFlag = posthog.getFeatureFlag('email-sign-up');
    setIsTestVariant(emailSignUpFlag === 'test');

    // Cal.com initialization
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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      // Insert email into Supabase table
      const { data, error } = await supabase
        .from('landing_page_email_collection')
        .insert([{ email: email }]);

      if (error) throw error;

      console.log('Email submitted:', email);
      posthog.capture('demo_scheduled', { email: email });

      // Send email to the user
      const response = await fetch('/api/email-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send email: ${errorData.error}`);
      }

      const responseData = await response.json();
      console.log('Email sent successfully:', responseData.message);

      // Clear the email input and show success message
      setEmail('');
      setSuccessMessage("Thank you! You&apos;ll receive an email in your inbox soon.");
    } catch (error) {
      console.error('Error submitting email:', error);
      setSuccessMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {isTestVariant ? (
              <>
                <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={styles.emailInput}
                    disabled={isSubmitting}
                  />
                  <button type="submit" className={styles.primaryCta} disabled={isSubmitting}>
                    {isSubmitting ? <div className={styles.spinner}></div> : 'Sign up'}
                  </button>
                </form>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
              </>
            ) : (
              <>
                <Link href="https://mini.nonito.xyz/signup" onClick={() => posthog.capture('get_started_clicked')}>
                  <button className={styles.primaryCta}>Get Started</button>
                </Link>
                <button 
                  className={styles.secondaryCta}
                  data-cal-namespace="30min"
                  data-cal-link="nonito/30min"
                  data-cal-config='{"layout":"month_view","theme":"dark"}'
                  onClick={() => posthog.capture('demo_scheduled')}
                >
                  Schedule demo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
