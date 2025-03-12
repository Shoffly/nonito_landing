import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/footer';
import styles from '../styles/policy.module.css';

export default function PrivacyPolicy() {
    return (
        <div>
            <Head>
                <title>Privacy Policy - Nonito</title>
                <meta name="description" content="Nonito Privacy Policy - Learn how we protect and handle your data" />
            </Head>
            <Nav />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1>Privacy Policy</h1>
                    <div className={styles.content}>
                        <p>Last updated: March 2024</p>
                        
                        <section>
                            <h2>1. Information We Collect</h2>
                            <p>Nonito collects information you provide, such as:</p>
                            <ul>
                                <li>Account details and registration information</li>
                                <li>Campaign data and content</li>
                                <li>Contact lists and subscriber information</li>
                                <li>Payment and billing information</li>
                                <li>Usage statistics and analytics data</li>
                            </ul>
                        </section>
                        
                        <section>
                            <h2>2. How We Use Your Information</h2>
                            <p>Nonito uses this information to:</p>
                            <ul>
                                <li>Provide, improve, and personalize our services</li>
                                <li>Send transactional messages and updates</li>
                                <li>Process payments and maintain billing records</li>
                                <li>Analyze service usage and optimize performance</li>
                                <li>Fulfill legal obligations and enforce our terms</li>
                            </ul>
                        </section>

                        <section>
                            <h2>3. Sharing of Information</h2>
                            <p>We don&apos;t share your information with third parties except for:</p>
                            <ul>
                                <li>Service providers and partners who assist in operating Nonito</li>
                                <li>Legal authorities as required by law</li>
                                <li>Business transfers in case of merger, acquisition, or asset sale</li>
                            </ul>
                        </section>

                        <section>
                            <h2>4. Data Security</h2>
                            <p>We prioritize data security and use industry-standard measures to protect your information, including:</p>
                            <ul>
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security audits and updates</li>
                                <li>Access controls and authentication measures</li>
                            </ul>
                            <p>However, we cannot guarantee complete security of data transmission over the internet.</p>
                        </section>

                        <section>
                            <h2>5. Your Rights</h2>
                            <p>Depending on your location, you may have rights to:</p>
                            <ul>
                                <li>Access your personal information</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to certain data processing</li>
                                <li>Export your data</li>
                            </ul>
                            <p>Please contact us at m@nonito.xyz to exercise these rights.</p>
                        </section>

                        <section>
                            <h2>6. Updates to Privacy Policy</h2>
                            <p>Nonito may update this Privacy Policy. Changes will be effective immediately upon posting on our website. We will notify you of significant changes via email or through our platform.</p>
                        </section>

                        <section>
                            <h2>7. Contact Information</h2>
                            <p>If you have questions about this Privacy Policy or your data, please contact us at m@nonito.xyz.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
