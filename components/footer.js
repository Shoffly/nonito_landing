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
          <ImageCarousel images={upsellimages} />
          <h1 class="tagline">Take your business to the next level</h1>
            <Link
                href="/form"
                class="button cta"
            >
                Get Demo
            </Link>
            <div className={styles.carouselSection}>
        
      </div>

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
