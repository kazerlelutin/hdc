import classes from "./Rupteur.module.css";
import { useEffect, useState } from "react";
import { PREFIX } from "../../utils/constants";

type ThemeType = "light" | "dark";
enum Theme {
  light = "light",
  dark = "dark",
}

export default function Rupteur() {
  const ls = PREFIX + "theme",
    dataTheme = "data-theme",
    [theme, setTheme] = useState<ThemeType>(Theme.light);

  function handleClick() {
    const newTheme = theme === Theme.light ? Theme.dark : Theme.light;
    setTheme(newTheme);
    document.querySelector("body").setAttribute(dataTheme, newTheme);
    localStorage.setItem(ls, newTheme);
  }

  useEffect(() => {
    const saveTheme = localStorage.getItem(ls);
    if (saveTheme && (saveTheme === Theme.light || saveTheme === Theme.dark)) {
      document.querySelector("body").setAttribute(dataTheme, saveTheme);
      setTheme(saveTheme);
    }
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={classes.rupteur}
        data-testid="rupteur"
        data-theme={theme}
        onClick={handleClick}
      >
        <div className={classes.state} />
      </div>
    </div>
  );
}
