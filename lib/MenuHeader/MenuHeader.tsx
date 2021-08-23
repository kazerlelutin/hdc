import classes from "./MenuHeader.module.css";
import MenuHeaderMobile from "./MenuHeaderMobile";
import {useState, useEffect} from "react";
import MenuHeaderDesktop from './MenuHeaderDesktop';

export default function MenuHeader(){
  const [isMobile, setIsMobile] = useState(false);
  function handleResize() {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

    return <div className={classes.container}>
      {isMobile ? <MenuHeaderMobile/>:<MenuHeaderDesktop/>}
    </div>
}