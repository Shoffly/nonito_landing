import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Bento from "../components/bentobox";
import Bentof from "../components/bentoflex";
import Hero from "../components/herosection";
import Footer from "../components/footer"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Growth Tool</title>
        <meta name="description" content="|Grow your business" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero></Hero>
      <Bentof />
      <Bento></Bento>
      <Footer></Footer>
    </div>
  );
}
