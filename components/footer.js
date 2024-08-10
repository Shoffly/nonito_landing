import styles from "../styles/Footer.module.css";
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={styles.container}>
            <h1 class="tagline">Take your business to the next level</h1>
            <Link
                href="/form"
                class="button cta"
            >
                Get Started
            </Link>

            <footer>
                <div>
                    <div>
                        <div>
                            <p>© 2024 SRP</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
