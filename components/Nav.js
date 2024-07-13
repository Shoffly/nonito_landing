import React from 'react';
import styles from '../styles/nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        Nonito<span className={styles.dot}>.</span>
      </div>
    </nav>
  );
}