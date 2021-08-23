import Background from "../Background/Background";
import Header from "../Header/Header";
import classes from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={classes.container}>
      <Background />
      <div className={classes.page}>
        <Header />
        <main>{children}</main>
        <div className="div">footer</div>
      </div>
    </div>
  );
}
