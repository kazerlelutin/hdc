
import classes from "./Header.module.css";
import MenuHeader from '../MenuHeader/MenuHeader';

export default function Header(){
    return <header className={classes.container}>
       <div className="logo">
           <img src="/logo.svg" width="60" height="60" alt="logo hokuto de cuisine"/>
       </div>
        <MenuHeader/>
    </header>
}