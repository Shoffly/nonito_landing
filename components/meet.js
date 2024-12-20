import styles from '../styles/meet.module.css';

const Meet = () => {
  return (
    <section className={styles.meetSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>Meet Nonito.</h1>
        <p className={styles.subtitle}>We give SMS campaigns superpowers.</p>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <img src="/audiences campaign.svg" alt="audeinces campaign interface" />
            <div className={styles.featureContent}>
              <h2>Get started with audiences in seconds.</h2>
              <p>Create audiences from your Shopify, Zyda or collect your customer data with Nonito forms and create audiences in a few seconds.</p>
            </div>
          </div>

          <div className={styles.feature}>
            <img src="/SMS Sending.svg" alt="SMS Sending interface" />
            <div className={styles.featureContent}>
              <h2>Send personalized and tracked SMSes at scale.</h2>
              <p>No other tools involved, Nonito will allow you to send personalized SMSes with tracking links in a few clicks.</p>
            </div>
          </div>
          <div className={styles.feature}>
            <img src="/User Data.svg" alt="User Data interface" />
            <div className={styles.featureContent}>
              <h2>Understand every SMS click.</h2>
              <p>Through SMS magic, we can help you collect data and behaviour of your customers who click your SMS link or ignore your SMS.</p>
            </div>
          </div>

          <div className={styles.feature}>
            <img src="/retargeting campaign.svg" alt="Retargeting campaign  interface" />
            <div className={styles.featureContent}>
              <h2>Retarget your customers based on real data.</h2>
              <p>Launch retargeting campaigns based on your customers behaviour and data with your previous SMS campaigns.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Meet;
