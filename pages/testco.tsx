import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Layout from '../lib/Layout/Layout';
import Head from '../lib/Head/Head';

export default function Home() {

  return <Layout>
      <Head/>
      <h1 className={styles.title}>Tu es co</h1>
  </Layout>
}
