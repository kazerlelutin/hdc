import { useContext, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { UserContext } from "../../utils/usercontext";
import classes from "./LoginButton.module.css";
import LoginModale from "../LoginModale/LoginModale";
import { User } from "../../utils/interfaces";
import Image from "next/image";
import UserModale from "../UserModale/UserModale";

export default function LoginButton() {
  const [user, setUser] = useContext(UserContext),
    [show, setShow] = useState<boolean>(false),
    ref = useRef(null);

  return user.isConnected ? (
    <>
      <div
        className={classes.avatar}
        onClick={() => setShow(!show)}
        ref={ref}
        data-ignore="true"
      >
        <Image
          src={user.avatar || "/tok.webp"}
          alt="avatar"
          width="40"
          height="40"
          data-ignore="true"
          onError={(e: any) => (e.target.src = "/tok.webp")}
        />
      </div>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="alert"
        unmountOnExit
        mountOnEnter
      >
        <UserModale setShow={setShow} user={user} parentRef={ref} />
      </CSSTransition>
    </>
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
