import classes from "./Rupteur.module.css";
import { useEffect,useState } from 'react';
import { PREFIX } from '../../utils/constants';

type theme = "light" | "dark";

export default function Rupteur() {
    const 
        ls= PREFIX + "theme",    
        [theme, setTheme]= useState <theme> ('light');

    function handleClick() {
        const newTheme = theme === "light" ? "dark": "light";
        setTheme(newTheme);
        document.querySelector('body').setAttribute('data-theme',newTheme);
        localStorage.setItem(ls,newTheme)
    };

    useEffect(()=>{
        const saveTheme = localStorage.getItem(ls);
        if(saveTheme && (saveTheme === "light" || saveTheme === "dark")){
            document.querySelector('body').setAttribute('data-theme', saveTheme);
            setTheme(saveTheme)
        }
    },[]);

    return <div className={classes.container}>
        <div 
            className={classes.rupteur}
            data-testid="rupteur"
            data-theme={theme}
            onClick={handleClick}
        >
            <div className={classes.state}/>
        </div>
    </div>
}
