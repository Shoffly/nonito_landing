import React, { useState } from 'react';
import styles from '../styles/nav.module.css';
import Link from 'next/link';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <div className={styles.logo}>
          Nonito<span className={styles.dot}>.</span>
        </div>
      </Link>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
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