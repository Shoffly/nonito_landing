import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Bento from "../components/bentobox";
import Bentof from "../components/bentoflex";
import Hero from "../components/herosection";
import Footer from "../components/footer"
import Nav from "../components/Nav"



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nonito</title>
        <meta name="description" content="| the growth tool for modern marketing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav></Nav>
      <Hero></Hero>
      <Bentof />
      <Bento></Bento>
      <Footer></Footer>
    </div>
  );
}
