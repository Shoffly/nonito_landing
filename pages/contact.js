import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/footer';
import styles from '../styles/contact.module.css';

export default function Contact() {
    return (
        <div>
            <Head>
                <title>Contact Us - Nonito</title>
                <meta name="description" content="Get in touch with Nonito" />
            </Head>
            <Nav />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1>Contact Us</h1>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactMethod}>
                            <h2>Email</h2>
                            <p>m@nonito.xyz</p>
                        </div>
                        
                        <div className={styles.contactMethod}>
                            <h2>Phone</h2>
                            <p>+201009727702</p>
                        </div>
                        
                        <div className={styles.contactMethod}>
                            <h2>Address</h2>
                            <p> Sheik Zayed City, Giza, Egypt</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
