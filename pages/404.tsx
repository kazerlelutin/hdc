import styles from '../styles/Home.module.css';
import Head from '../lib/Head/Head';
import { useContext } from 'react';
import { UserContext } from '../utils/usercontext';

export default function NotFound() {
  const [user] = useContext(UserContext)
  return <>
      <Head/>
      <h1>404 - Page Non trouvée</h1>
      <h2>Promis, elle sera bientôt plus jolie.</h2>
  </>
}
