import classes from "./Disconnect.module.css";
import { Magic } from "magic-sdk";
import { useContext } from "react";
import { UserContext } from "../../utils/usercontext";
import Ls from "../../utils/ls";

export default function Disconnect({setShow}:{setShow:Function}) {
  const [_user, setUser] = useContext(UserContext);

  async function handleDisconnect() {
    const ls = new Ls(),
      m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY, {
        locale: "fr",
      });

    await m.user.logout();
    setUser({ isConnect: false, loadin: false });
    ls.setUserToken("");
    setShow(false)
  }
  return <div className={classes.container} onClick={handleDisconnect}>Se déconnecter</div>;
}
