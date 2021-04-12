import styles from '../styles/Home.module.css';
import Layout from '../lib/Layout/Layout';
import Head from '../lib/Head/Head';

export default function Home() {

  return <Layout>
      <Head/>
      <h1 className={styles.title}>Tu es en avance !</h1>
  </Layout>
}
