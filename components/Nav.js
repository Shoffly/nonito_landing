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
      <div className={styles.navLinks}>
        <Link href="/pricing">
          <div className={styles.navButton}>Pricing</div>
        </Link>
        <Link href="https://mini.nonito.xyz/signup">
          <div className={styles.navButton}>Sign up</div>
        </Link>
      </div>
    </nav>
  );
}