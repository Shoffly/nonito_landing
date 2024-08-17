import React from 'react';
import styles from '../styles/nav.module.css';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
      <div className={styles.logo}>
        Nonito<span className={styles.dot}>.</span>
      </div>
        </Link>
      <Link href="/pricing">
        <div className={styles.pricing}>
          Pricing
        </div>
          </Link>
    </nav>
  );
}