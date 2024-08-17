import React, { useEffect, useState } from 'react';
import styles from '../styles/herosection.module.css';
import Link from 'next/link';
import StarField from './StarField';

export default function Hero() {
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.herocontent} > *`);
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(styles.fadeIn);
      }, index * 500);
    });

    // Show scroll down arrow after a delay
    setTimeout(() => {
      setShowScrollDown(true);
    }, 3000); // Adjust this value to change when the arrow appears
  }, []);

  return (
    <section className={styles.wrapper}>
      <StarField />
      <section className={styles.hero}>
        <div className={styles.herocontent}>
          <h1 className={styles.tagline}>
            Campaigns with <span className={styles.superpowers}>Superpowers</span>
          </h1>
          <p className={styles.subtext}>
            Nonito allows you to automate, personalize, and track SMS and notifications for every user.
          </p>
         <Link href='/form'>
          <button className={`${styles.button} ${styles.fadeIn}`}>Get Demo</button>
         </Link>
        </div>
        {showScrollDown && (
          <div className={styles.scrollDown}>
            <span>Scroll Down</span>
            <div className={styles.arrow}></div>
          </div>
        )}
      </section>
    </section>
  );
}