import React, { useState, useEffect } from 'react';
import styles from '/styles/pricing.module.css';
import Nav from "../components/Nav";
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react'  // Add this import

const PricingPage = () => {
  const posthog = usePostHog()  // Add this line
  const [smsCount, setSmsCount] = useState(20000);
  const [smsManagement, setSmsManagement] = useState('nonito');
  const [billingCycle, setBillingCycle] = useState('annual');

  useEffect(() => {
    // Track page view
    posthog?.capture('pricing_page_view')
  }, [posthog])

  const tiers = [
    {
      name: 'Nano',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        'Unlimited Tracking Links',
        'Unlimited QR codes',
        'Analytics data for 6 months',
      ],
      summary: 'The complete solution for tracking and managing your links.',
      noSms: true,
      freeTrial: false,
      buttonLink: 'https://mini.nonito.xyz/signup',
      buttonText: 'Sign up now',
    },
     {
      name: 'Micro',
      monthlyPrice: 900,
      annualPrice: 4800, // 10% discount applied
      features: [
        'All of Nano',
'Target users based on device type (iOS, Android)',
'Unlimited Forms without sms automation',
        'Analytics data for 12 months',
      ],
      summary: 'The complete solution for tracking and managing your links.',
      noSms: true,
      freeTrial: false,
      freeDomain: true,
      buttonLink: 'https://mini.nonito.xyz/signup',
      buttonText: 'Sign up now',
    },
   
    {
      name: 'Mini',
      monthlyPrice: 1500,
      annualPrice: 12000, 
      features: [
        'All of Micro',
        'SMS personalization',
        'SMS campaign tracking',
        'Retargeting SMS Campaigns',
        'Unlimited Forms with sms automation',
        'Analytics for Links, QR Codes, and SMS',
      ],
      summary: 'For growing companies looking to perfect sms engagement.',
      freeTrial: true,
      freeDomain: true,
      buttonLink: '/form',
      buttonText: 'Contact us now',
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

  const smsOptions = smsManagement === 'nonito' 
    ? [50000, 100000, 150000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000]
    : smsPricing.map(p => p.count);

  const getSmsCost = (count) => {
    const pricing = smsPricing.find(p => p.count >= count) || smsPricing[smsPricing.length - 1];
    return smsManagement === 'existing' ? pricing.existingCost : pricing.nonitoCost;
  };

  const calculateTotalCost = (tier) => {
    if (tier.noSms) {
      return billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
    }
    const smsCost = getSmsCost(smsCount) * smsCount;
    const monthlyCost = tier.monthlyPrice + smsCost;
    return billingCycle === 'annual' ? (monthlyCost * 12 * 0.9) : monthlyCost;
  };

  const calculateMonthlyPrice = (tier) => {
    if (billingCycle === 'annual') {
      return tier.annualPrice / 12;
    }
    return tier.monthlyPrice;
  };

  const calculateDiscount = (tier) => {
    const monthlyTotal = tier.monthlyPrice * 12;
    const annualTotal = tier.annualPrice;
    return ((monthlyTotal - annualTotal) / monthlyTotal * 100).toFixed(0);
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

  const handleTierClick = (tierName) => {
    posthog?.capture('pricing_tier_clicked', { tier: tierName })
  }

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
            {smsOptions.map((option) => (
              <option key={option} value={option}>
                {option.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
        {/* Move the billing toggle here, just above the pricing cards */}
        <div className={styles.billingToggleContainer}>
          <div className={styles.billingToggle}>
            <span className={billingCycle === 'monthly' ? styles.active : ''}>Monthly</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={billingCycle === 'annual'}
                onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              />
              <span className={styles.slider}></span>
            </label>
            <span className={billingCycle === 'annual' ? styles.active : ''}>
              Annual ({calculateDiscount(tiers[1])}% off)
            </span>
          </div>
        </div>

        <div className={styles.pricingTiers}>
          {tiers.map((tier) => (
            <div key={tier.name} className={styles.pricingCard} onClick={() => handleTierClick(tier.name)}>
              <div className={styles.cardContent}>
                <div className={styles.badgeContainer}>
                  {tier.freeDomain ? (
                    <div className={styles.freeDomainBadge}>FREE branded .link domain</div>
                  ) : (
                    <div className={styles.placeholderBadge}></div>
                  )}
                </div>
                <h2 className={styles.tierName}>{tier.name}</h2>
                <p className={styles.tierSummary}>{tier.summary}</p>
                
                <div className={styles.pricingDetails}>
                  <p className={styles.price}>
                    <span className={styles.subtext}>
                      {tier.monthlyPrice === 0 ? 'completely' : tier.noSms ? 'only' : 'only'}
                    </span>
                    <br />
                    {tier.monthlyPrice === 0 ? (
                      'FREE'
                    ) : (
                      <>
                        {formatCurrency(calculateMonthlyPrice(tier))}
                        <span className={styles.billingPeriod}>/month</span>
                      </>
                    )}
                  </p>
                  {billingCycle === 'annual' && tier.monthlyPrice !== 0 && (
                    <p className={styles.billedAnnually}>
                      billed annually
                    </p>
                  )}
                  {!tier.noSms && tier.monthlyPrice !== 0 && (
                    <span className={styles.subtext2}>
                      + EGP {smsCostPerUnit.toFixed(2)} per SMS
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