import styles from "../styles/Footer.module.css";
import Link from 'next/link';
import ImageCarousel from '../components/ImageCarousel'; // Add this import

export default function Footer() {
    const upsellimages = [
        {
          src: "/sms_button.svg",
          alt: "sms Image",
          width: 345,
          height: 255,
          link: "/sms-excel"
        },
        {
          src: "/retarget_2.svg",
          alt: "retarget Image",
          width: 345,
          height: 255,
          link: "/retargeting"
        },
        {
          src: "/s_button.svg",
          alt: "segments Image",
          width: 345,
          height: 255,
          link: "/segments"
        },
        {
          src: "/Scheduled_b.svg",
          alt: "Scheduled sms Image",
          width: 345,
          height: 255,
          link: "/scheduled"
        },
        {
          src: "/analyze_button_f.svg",
          alt: "analyze Image",
          width: 345,
          height: 255,
          link: "/analysis"
        },
      ];
    
      console.log('Upsell images:', upsellimages); // Add this line for debugging
    return (
        <div className={styles.container}>
         
          <h1 class="tagline">Take your business to the next level</h1>
            <Link
                href="mini.nonito.xyz/signup"
                class="button cta"
            >
                Start for Free
            </Link>
            <div className={styles.carouselSection}>
        
      </div>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLinks}>
                        <Link href="/terms-conditions">Terms & Conditions</Link>
                        <p>© 2024 Nonito</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
