import Head from '../lib/Head/Head';
import { useContext } from 'react';
import { UserContext } from '../utils/usercontext';
import SpriteReader from '../lib/SpriteReader/SpriteReader';

export default function Creer() {
  const [user] = useContext(UserContext)
  return <>
      <Head/>
      <p>creer</p>
      <SpriteReader linkImg="https://hdc.s3.fr-par.scw.cloud/actions/cruella-Sheet.webp"/>
      <p>Le premier bloc passe en mode update ? </p>
  </>
}
