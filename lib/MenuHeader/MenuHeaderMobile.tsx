import classes from "./MenuHeader.module.css";
import { useState } from "react";
import Rupteur from "../Rupteur/Rupteur";
import LoginButton from "../LoginButton/LoginButton";

export default function MenuHeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classes.containerMobile}>
      <div className={classes.hamburger} onClick={() => setIsOpen(true)}>
          {[1,2,3].map((bar:number)=><div className={classes.bar} key={bar}/>)}
      </div>

        <div className={classes.menuMobile} data-isopen={isOpen}>
          <div className="close" onClick={() => setIsOpen(false)}/>
          <div className="d" onClick={() => setIsOpen(false)}>
          <LoginButton />
          </div>
          <nav>
       
              <ul>
                  <li>
                      Faire planning repas
                      many-to-many repas
                  </li>
                  <li>contient le footer</li>
              </ul>
          </nav>
          <div className={classes.footerMenu}>
        <Rupteur/>
            </div>
        </div>
 
    </div>
  );
}
