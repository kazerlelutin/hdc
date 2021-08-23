import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Head from '../lib/Head/Head';
import { useContext } from 'react';
import { UserContext } from '../utils/usercontext';

export default function Home() {
  const [user] = useContext(UserContext)
  return <>
      <Head/>
      <h1 className={styles.title}>Tu es en avance !</h1>

      <Link href="/login"><a>Login</a></Link>
  </>
}
