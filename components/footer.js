import styles from "../styles/Footer.module.css";
import Image from "next/image";

export default function Footer() {
    return (
        <div className={styles.container}>
            <h1 class="tagline">Take your business to the next level</h1>
            <a
                href="/form"
                class="button cta"
            >
                Get Started
            </a>

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
