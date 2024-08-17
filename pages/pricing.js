import React, { useState } from 'react';
import styles from '/styles/pricing.module.css';
import Nav from "../components/Nav";

const PricingPage = () => {
  const [smsCount, setSmsCount] = useState(20000); // Default value from your image

  const tiers = [
    {
      name: 'Mini',
      fixedCost: 1500,
      features: [
        'Unlimited Tracking Links',
        'Unlimited QR Codes',
        'SMS Campaigns with Unique Tracking Links',
        'Retargeting Campaigns',
        'Analytics for Links, QR Codes, and SMS',
      ],
    },
    {
      name: 'Mega',
      fixedCost: 5000,
      features: [
        'All Mini features',
        'Integration with Customer Database',
        'Personalized Automated Marketing',
        'Push notification integration',
      ],
    },
  ];

  const smsPricing = [
    { count: 500, cost: 0.15 },
    { count: 1000, cost: 0.14 },
    { count: 2500, cost: 0.13 },
    { count: 5000, cost: 0.12 },
    { count: 10000, cost: 0.12 },
    { count: 20000, cost: 0.12 }, // Adjusted this value to match the default
    { count: 50000, cost: 0.11 },
    { count: 100000, cost: 0.11 },
    { count: 200000, cost: 0.11 },
    { count: 500000, cost: 0.10 },
    { count: 750000, cost: 0.10 },
    { count: 1000000, cost: 0.10 },
    { count: 2000000, cost: 0.09 },
    { count: 3000000, cost: 0.09 },
    { count: 4000000, cost: 0.09 },
  ];

  const getSmsCost = (count) => {
    const pricing = smsPricing.find(p => p.count >= count) || smsPricing[smsPricing.length - 1];
    return pricing.cost;
  };

  const calculateTotalCost = (tier) => {
    const smsCost = getSmsCost(smsCount) * smsCount;
    return tier.fixedCost + smsCost;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  const handleSmsCountChange = (e) => {
    setSmsCount(Number(e.target.value));
  };

  const smsCostPerUnit = getSmsCost(smsCount);

  return (
    <>
      <Nav />
      <div className={styles.pricingPage}>
        <h1 className={styles.title}>Built to grow with your business. Flexible, transparent pricing.</h1>
        <p className={styles.description}>Whether you’re just starting, scaling up, or on top of your game, Nonito has pricing plans to suit any business size.</p>
        <div className={styles.pricingTiers}>
          {tiers.map((tier) => (
            <div key={tier.name} className={styles.pricingCard}>
              <h2 className={styles.tierName}>{tier.name}</h2>
              <p className={styles.price}>
                <span className={styles.subtext}>from</span><br></br>{formatCurrency(calculateTotalCost(tier))}/month
              </p>
              <span className={styles.subtext2}>EGP {tier.fixedCost} + EGP {smsCostPerUnit.toFixed(2)} per SMS</span>
              <ul className={styles.featureList}>
                {tier.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.checkmark}>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <div className={styles.smsControl}>
                <label className={styles.sliderLabel}>
                  How many SMS messages will you need?
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
              <button className={styles.chooseButton}>Choose {tier.name}</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingPage;
