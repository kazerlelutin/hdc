import LoginButton from "../LoginButton/LoginButton";
import PatreonButton from "../PatreonButton/PatreonButton";
import Rupteur from "../Rupteur/Rupteur";
import classes from "./MenuHeader.module.css";
import LinksMenuDesktop from '../LinksMenu/LinksMenuDesktop';

export default function MenuHeaderDesktop() {
  return (
    <div className={classes.containerDesktop}>
      <LinksMenuDesktop/>
           <Rupteur/>
      <PatreonButton/>
      <LoginButton/>
    </div>
  );
}
