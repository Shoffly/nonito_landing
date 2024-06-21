import { useEffect, useRef } from 'react';
import styles from '../styles/bentobox.module.css';
import Image from 'next/image';
import Jbento from '../components/jbento';

export default function Bento() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const items = containerRef.current.querySelectorAll(`.${styles.fadeIn}`);
    items.forEach(item => {
      observer.observe(item);
    });

    return () => {
      items.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className={styles.dave}>
      <div ref={containerRef} className={styles.container}>
        <div className={`${styles.automate} ${styles.fadeIn}`}>
          <Image
            src="/automate_mktg (1).svg"
            alt="automate Image"
            width={777}
            height={307}
          />
        </div>
        <div className={`${styles.journey} ${styles.fadeIn}`}>
          <Jbento />
        </div>
        <div className={`${styles.standout} ${styles.fadeIn}`}>
          <Image
            src="/stand_out.svg"
            alt="standout Image"
            width={345}
            height={520}
          />
        </div>
        <div className={`${styles.broadcast} ${styles.fadeIn}`}>
          <Image
            src="/broadcast.svg"
            alt="broadcast Image"
            width={345}
            height={255}
          />
        </div>
      </div>
    </div>
  );
}
