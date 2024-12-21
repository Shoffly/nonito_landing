import React from 'react';
import styles from '../styles/painpoints.module.css';

const PainPoints = () => {
  const points = [
    {
      number: "1",
      text: "Collecting & Organizing customer phone numbers can be hectic with all your sources."
    },
    {
      number: "2",
      text: "You are unsure of how your customers are engaging with your SMS campaigns."
    },
    {
      number: "3",
      text: "Analyzing SMS performance is taking up from your time."
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        SMS campaigns can be very powerful but
      </h2>
      
      <div className={styles.grid}>
        {points.map((point, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.number}>{point.number}</div>
            <p className={styles.text}>{point.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PainPoints;
