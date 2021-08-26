import Image from "next/image";
import { useRef, useEffect } from "react";
import classes from "./UserModale.module.css";
import clickOutside from "../../utils/clickOutside";
import Disconnect from "../Disconnect/Disconnect";
import Link from "next/link";

export default function UserModale({ setShow, user, parentRef }) {
  const ref = useRef(null);

  useEffect(() => {
    const topPosition =
      parentRef.current.offsetTop + parentRef.current.offsetHeight + 10;
    ref.current.style.top = `${topPosition}px`;
  }, []);

  useEffect(
    () =>
      clickOutside([ref], () => {
        setShow(false);
      }),
    []
  );

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.containerAvatar}>
        <div className={classes.avatar}>
          <Image
            src={user.avatar.replace("size",'thumb') || "/tok.webp"}
            alt="avatar"
            width="40"
            height="40"
            onError={(e: any) => (e.target.src = "/tok.webp")}
          />
        </div>
        <div className={classes.name}>
          {user.name || user.email.split("@")[0]}
        </div>
        <div className={classes.email}>{user.email}</div>
      </div>
      <Disconnect setShow={setShow} />
      <Link href="/profil" >
        <button className={classes.link} onClick={()=>setShow(false)}>Gérer mon profil</button>
      </Link>
    </div>
  );
}
