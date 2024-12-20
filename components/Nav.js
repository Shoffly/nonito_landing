import React, { useState } from 'react';
import styles from '../styles/nav.module.css';
import Link from 'next/link';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTools = () => {
    setIsToolsOpen(!isToolsOpen);
  };

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <div className={styles.logo}>
          Nonito<span className={styles.dot}>.</span>
        </div>
      </Link>
      <div className={styles.mobileActions}>
        <Link href="https://mini.nonito.xyz/signup" className={styles.mobileSignUp}>
          <div className={styles.navcall}>Sign up</div>
        </Link>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.toolsDropdown}>
          <button className={styles.toolsButton} onClick={toggleTools}>
            Tools
            <span className={`${styles.arrow} ${isToolsOpen ? styles.up : ''}`}>▼</span>
          </button>
          <div className={`${styles.dropdownContent} ${isToolsOpen ? styles.show : ''}`}>
            <Link href="/tools/zyda-analysis">
              <div className={styles.dropdownItem}>Zyda Analysis</div>
            </Link>
          </div>
        </div>
        <Link href="/pricing">
          <div className={styles.navButton}>Pricing</div>
        </Link>
        <Link href="https://mini.nonito.xyz/signup" className={styles.desktopSignUp}>
          <div className={styles.navcall}>Sign up</div>
        </Link>
      </div>
    </nav>
  );
}