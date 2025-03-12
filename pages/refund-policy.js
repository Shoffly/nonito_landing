import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/footer';
import styles from '../styles/Policy.module.css';

export default function RefundPolicy() {
    return (
        <div>
            <Head>
                <title>Refund Policy - Nonito</title>
                <meta name="description" content="Nonito Refund Policy - Understanding our refund terms and conditions" />
            </Head>
            <Nav />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1>Refund Policy</h1>
                    <div className={styles.content}>
                        <p>Last updated: March 2024</p>
                        
                        <section>
                            <h2>1. Subscription Fees</h2>
                            <p>All subscription fees for Nonito&apos;s services are non-refundable, except in specific circumstances outlined below. This applies to all our subscription tiers:</p>
                            <ul>
                                <li>Just Links Plan</li>
                                <li>Mini Plan</li>
                                <li>Mega Plan</li>
                            </ul>
                        </section>
                        
                        <section>
                            <h2>2. Refund Eligibility</h2>
                            <p>Refunds may be considered in the following cases:</p>
                            <ul>
                                <li>Verifiable technical errors on Nonito&apos;s end that prevented access to the service</li>
                                <li>Duplicate charges or billing errors</li>
                                <li>Service unavailability exceeding 24 hours</li>
                            </ul>
                            <p>To be eligible for a refund, you must contact us within 7 days of the billing date.</p>
                        </section>
                        
                        <section>
                            <h2>3. Cancellation Policy</h2>
                            <p>You may cancel your subscription at any time through your account settings or by contacting our support team. Please note:</p>
                            <ul>
                                <li>Cancellation will take effect at the end of your current billing period</li>
                                <li>You will not receive a prorated refund for the unused portion of your subscription</li>
                                <li>Access to the service will continue until the end of your billing period</li>
                            </ul>
                        </section>

                        <section>
                            <h2>4. Refund Process</h2>
                            <p>If your refund request is approved:</p>
                            <ul>
                                <li>Refunds will be processed within 5-10 business days</li>
                                <li>The refund will be issued to the original payment method</li>
                                <li>You will receive an email confirmation once the refund is processed</li>
                            </ul>
                        </section>

                        <section>
                            <h2>5. Exceptions</h2>
                            <p>Refunds will not be provided for:</p>
                            <ul>
                                <li>Change of mind or no longer needing the service</li>
                                <li>Misuse of the platform or violation of our terms</li>
                                <li>Issues outside of Nonito&apos;s control</li>
                            </ul>
                        </section>

                        <section>
                            <h2>6. Contact Information</h2>
                            <p>For refund inquiries or to request a refund, please contact us at:</p>
                            <p>Email: m@nonito.xyz</p>
                            <p>We aim to respond to all refund requests within 2 business days.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
