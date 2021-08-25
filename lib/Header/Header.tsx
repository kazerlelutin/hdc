
import classes from "./Header.module.css";
import MenuHeader from '../MenuHeader/MenuHeader';
import Image from 'next/image';

export default function Header(){
    return <header className={classes.container}>
       <div className="logo">
           <Image src="/logo.svg" width="60" height="60" alt="logo hokuto de cuisine"/>
       </div>
        <MenuHeader/>
    </header>
}