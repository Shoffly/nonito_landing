import React, { useEffect } from 'react';
import styles from '../styles/herosection.module.css';
import Image from 'next/image';

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
        <h1 className={styles.tagline}>Personalize your communication</h1>
        <h1 className={styles.tagline}>Delight your customers</h1>
        <h1 className={styles.tagline}>Increase your revenue</h1>
       
          <button className={styles.button}>Get in Touch</button>
        
      </div>
      </section>
    </section>
  );
}
