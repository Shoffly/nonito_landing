import styles from "../styles/bentoflex.module.css";
import Image from "next/image";
import Jbento from "../components/jbento";

export default function Bentof() {
  return (
    <div className={styles.dave}>
      <div className={styles.container}>
        <Image
          src="/stand_out.svg"
          alt="standout Image"
          width={345}
          height={520}
          className={styles.images}
        />
        <Image
          src="/automate_mktg (2).svg"
          alt="automation Image"
          width={345}
          height={520}
          className={styles.images}
        />
        <Image
          src="/broadcast.svg"
          alt="broadcast Image"
          width={345}
          height={255}
          className={styles.images}
        />
        <Jbento />
      </div>
    </div>
  );
}
