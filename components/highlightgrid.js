import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react'
import styles from '../styles/FeatureHighlight.module.css';

const FeatureHighlight = () => {
  const [activeTab, setActiveTab] = useState('sms');
  const posthog = usePostHog()

  const features = {
    forms: {
      items: [
        { image: '/Forms_1.svg', link: 'https://ni2.co/nonito-form' },
        { image: '/Forms_2.svg', link: 'https://ni2.co/nonito-form' },
        { image: '/Forms_3.svg', link: 'https://ni2.co/nonito-form' },
      ],
    },
    sms: {
      items: [
        { image: '/SMS_value1.svg', link: '/pricing' },
        { image: '/SMS_value2.svg', link: '/form' },
        { image: '/SMS_value3.svg', link: '/form' },
      ],
    },
    links: {
      items: [
        { image: '/link_value_1.svg', link: 'https://mini.nonito.xyz/signup' },
        { image: '/link_value_2.svg', link: 'https://mini.nonito.xyz/signup' },
        { image: '/link_value_3.svg', link: 'https://mini.nonito.xyz/signup' },


      ],
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    posthog?.capture('tab_switch', { tab: tab });
  }

  const handleFeatureClick = (feature, index) => {
    posthog?.capture('feature_click', { 
      feature_type: activeTab,
      feature_index: index,
      feature_link: feature.link
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
      <button 
          className={`${styles.tab} ${activeTab === 'forms' ? styles.active : ''}`}
          onClick={() => handleTabClick('forms')}
        >
          Forms
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'sms' ? styles.active : ''}`}
          onClick={() => handleTabClick('sms')}
        >
          SMS
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'links' ? styles.active : ''}`}
          onClick={() => handleTabClick('links')}
        >
          Links
        </button>
      </div>
      <div className={styles.featureGrid}>
        {features[activeTab].items.map((item, index) => (
          <Link href={item.link} key={index}>
            <div 
              className={styles.featureItem}
              onClick={() => handleFeatureClick(item, index)}
            >
              <div className={styles.imageWrapper}>
                <Image src={item.image} alt={`Feature ${index + 1}`} layout="responsive" width={100} height={100} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlight;
