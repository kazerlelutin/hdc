import LoginButton from "../LoginButton/LoginButton";
import classes from "./MenuHeader.module.css";

export default function MenuHeaderDesktop() {
  return (
    <div className={classes.containerDesktop}>
      <LoginButton />
    </div>
  );
}
