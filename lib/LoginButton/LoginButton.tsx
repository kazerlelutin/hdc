import { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { UserContext } from "../../utils/usercontext";
import classes from "./LoginButton.module.css";
import LoginModale from "../LoginModale/LoginModale";
import { User } from "../../utils/interfaces";

export default function LoginButton() {
  const [user, setUser] = useContext(UserContext),
    [show, setShow] = useState<boolean>(false);

  return user.isConnected ? (
    <div className={classes.avatar}>{user.email}</div>
  ) : (
    <>
      <div className={classes.container} onClick={() => setShow(true)}>
        <div className={classes.connect}>Login</div>
        <div className={classes.sub}>inscription</div>
      </div>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="alert"
        unmountOnExit
        mountOnEnter
      >
        <LoginModale
          setShow={setShow}
          setUser={(user: User) => setUser(user)}
        />
      </CSSTransition>
    </>
  );
}
