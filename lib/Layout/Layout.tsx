import Background from "../Background/Background";
import Header from "../Header/Header";
import IconsBar from "../IconsBar/IconsBar";
import classes from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={classes.container}>
      <Background />
      <div className={classes.page}>
        <Header />
        <main className={classes.main}>
          <IconsBar/>
          {children}
          </main>
        <div className={classes.footer}>footer</div>
      </div>
    </div>
  );
}
