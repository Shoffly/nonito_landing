import React, { useState } from 'react';
import styles from '/styles/pricing.module.css';
import Nav from "../components/Nav";
import Link from 'next/link';

const PricingPage = () => {
  const [smsCount, setSmsCount] = useState(20000);
  const [smsManagement, setSmsManagement] = useState('nonito');

  const tiers = [
    {
      name: 'Just Links',
      fixedCost: 500,
      features: [
        'Unlimited Tracking Links',
        'Unlimited QR codes',
        'Redirect visitors to different destinations based on their device type (iOS, Android).',
        'Analytics data for 6 months',
      ],
      noSms: true,
      freeTrial: true,
      buttonLink: 'https://mini.nonito.xyz/signup',
      buttonText: 'Sign up now',
    },
    {
      name: 'Mini',
      fixedCost: 3000,
      features: [
        'All of links',
        'SMS Campaigns with Unique Tracking Links',
        'Retargeting Campaigns',
        'Analytics for Links, QR Codes, and SMS',
        'Personalized sms campaigns',
      ],
      freeTrial: true,
      buttonLink: '/form',
      buttonText: 'Contact us now',
    },
    {
      name: 'Mega',
      fixedCost: 10000,
      features: [
        'All Mini features',
        'Integration with Customer Database',
        'Cross-Channel Personalized Customer journeys',
        'Dedicated marketing automation support team',
        'Push notification integration',
      ],
      buttonLink: '/form-mega',
      buttonText: 'Coming Soon',
      disabled: true, // Add this line
    },
  ];

  const smsPricing = [
    { count: 500, existingCost: 0.09, nonitoCost: 0.27 },
    { count: 1000, existingCost: 0.085, nonitoCost: 0.255 },
    { count: 2500, existingCost: 0.08, nonitoCost: 0.24 },
    { count: 5000, existingCost: 0.075, nonitoCost: 0.225 },
    { count: 10000, existingCost: 0.07, nonitoCost: 0.21 },
    { count: 15000, existingCost: 0.065, nonitoCost: 0.195 },
    { count: 20000, existingCost: 0.06, nonitoCost: 0.18 },
    { count: 50000, existingCost: 0.058, nonitoCost: 0.174 },
    { count: 100000, existingCost: 0.056, nonitoCost: 0.168 },
    { count: 200000, existingCost: 0.054, nonitoCost: 0.162 },
    { count: 500000, existingCost: 0.052, nonitoCost: 0.156 },
    { count: 750000, existingCost: 0.051, nonitoCost: 0.153 },
    { count: 1000000, existingCost: 0.05, nonitoCost: 0.15 },
    { count: 2000000, existingCost: 0.05, nonitoCost: 0.15 },
    { count: 3000000, existingCost: 0.05, nonitoCost: 0.15 },
    { count: 4000000, existingCost: 0.05, nonitoCost: 0.15 },
  ];

  const getSmsCost = (count) => {
    const pricing = smsPricing.find(p => p.count >= count) || smsPricing[smsPricing.length - 1];
    return smsManagement === 'existing' ? pricing.existingCost : pricing.nonitoCost;
  };

  const calculateTotalCost = (tier) => {
    if (tier.noSms) {
      return tier.fixedCost;
    }
    const smsCost = getSmsCost(smsCount) * smsCount;
    return tier.fixedCost + smsCost;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  const handleSmsCountChange = (e) => {
    setSmsCount(Number(e.target.value));
  };

  const handleSmsManagementChange = (e) => {
    setSmsManagement(e.target.value);
  };

  const smsCostPerUnit = getSmsCost(smsCount);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.pricingPage}>
        <h1 className={styles.title}>Built to grow with your business. Flexible, transparent pricing.</h1>
        <p className={styles.description}>Whether you&apos;re just starting, scaling up, or on top of your game, Nonito has pricing plans to suit any business size.</p>
        
        <div className={styles.smsControl}>
          <label className={styles.sliderLabel}>
            Do you have an sms provider?
          </label>
          <select
            value={smsManagement}
            onChange={handleSmsManagementChange}
            className={styles.smsDropdown}
          >
            <option value="nonito">I want Nonito to manage my SMS</option>
            <option value="existing">I have an existing SMS provider and I want Nonito to connect it</option>
          </select>
        </div>

        <div className={styles.smsControl}>
          <label className={styles.sliderLabel}>
            How many SMS messages do you send per month?
          </label>
          <select
            value={smsCount}
            onChange={handleSmsCountChange}
            className={styles.smsDropdown}
          >
            {smsPricing.map((option) => (
              <option key={option.count} value={option.count}>
                {option.count.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.pricingTiers}>
          {tiers.map((tier) => (
            <div key={tier.name} className={styles.pricingCard}>
              <div className={styles.cardContent}>
                <h2 className={styles.tierName}>{tier.name}</h2>
                <div className={styles.pricingDetails}>
                  <p className={styles.price}>
                    {tier.noSms ? (
                      `${formatCurrency(tier.fixedCost)}/month`
                    ) : (
                      <>
                        <span className={styles.subtext}>from</span><br />
                        {formatCurrency(calculateTotalCost(tier))}/month
                      </>
                    )}
                  </p>
                  {!tier.noSms && (
                    <span className={styles.subtext2}>
                      EGP {tier.fixedCost} + EGP {smsCostPerUnit.toFixed(2)} per SMS
                      {smsManagement === 'existing' && '*'}
                    </span>
                  )}
                  {tier.freeTrial && (
                    <div className={styles.freeTrialBadge}>1 Month Free Trial</div>
                  )}
                </div>
                <ul className={styles.featureList}>
                  {tier.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.checkmark}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.buttonContainer}>
                {tier.disabled ? (
                  <button className={`${styles.chooseButton} ${styles.disabled}`} disabled>
                    {tier.buttonText}
                  </button>
                ) : (
                  <Link href={tier.buttonLink}>
                    <button className={styles.chooseButton}>{tier.buttonText}</button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        {smsManagement === 'existing' && (
          <p className={styles.disclaimer}>
            * Nonito connects to your SMS provider and will charge you separately per sms.
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingPage;