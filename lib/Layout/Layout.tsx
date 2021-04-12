import Background from "../Background/Background";
import Rupteur from '../Rupteur/Rupteur';
import classes from "./Layout.module.css";

export default function Layout({children}) {

    return <div className={classes.container}>
        <Background/>
        <Rupteur/>
        {children}
    </div>
}