import styles from '../styles/Home.module.css';
import Head from '../lib/Head/Head';
import { useContext } from 'react';
import { UserContext } from '../utils/usercontext';

export default function Home() {
  const [user] = useContext(UserContext)
  return <>
      <Head/>
  </>
}
