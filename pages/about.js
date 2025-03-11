import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/footer';
import styles from '../styles/About.module.css';

export default function About() {
    return (
        <div>
            <Head>
                <title>About Us - Nonito</title>
                <meta name="description" content="Learn more about Nonito and our mission" />
            </Head>
            <Nav />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1>About Us</h1>
                    <div className={styles.content}>
                        {/* Add your about us content here */}
                        <p>Nonito is dedicated to revolutionizing business communications through innovative SMS & whatsapp solutions. Our platform enables businesses to build stronger relationships with their customers through personalized, timely, and effective communication.</p>
                        
                        <h2>Our Mission</h2>
                        <p>To empower businesses with powerful communication tools that drive growth and enhance customer engagement.</p>
                        
                        {/* Add more sections as needed */}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}