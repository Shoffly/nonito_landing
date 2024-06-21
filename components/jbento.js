import styles from "../styles/Jbento.module.css"
import Image from 'next/image';
import Jint from '../components/jinteractive.js';

export default function Jbento() {


  return (
    <div className={styles.container}>
        <div className={styles.text}>
            <p className={styles.text1}>Build journeys</p>
            <p className={styles.text2}>Journeys allow you to create step by step campaigns to personalize communication with users.</p>
            <button className={styles.button}>Get in Touch</button>
        </div>
        <div className={styles.interactivity}>
        <Jint></Jint>
        </div>
    </div>

  )
}