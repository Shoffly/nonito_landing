import React, { useEffect } from 'react';
import styles from '../styles/herosection.module.css';
import Link from 'next/link';


export default function Hero() {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.herocontent} > *`);
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(styles.fadeIn);
      }, index * 500); // Adjust the delay as needed
    });
  }, []);

  return (
    <section className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.herocontent}>
          <h1 className={styles.tagline}>
            Campaigns with <span className={styles.superpowers}>Superpowers</span>
          </h1>
          <p className={styles.subtext}>
            Nonito allows you to automate, personalize, and track SMS and notifications for every user.
          </p>
         <Link href='/form'>
          <button className={`${styles.button} ${styles.fadeIn}`}>Get in Touch</button>
           </Link>
        </div>
      </section>
    </section>
  );
}