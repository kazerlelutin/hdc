import classes from "./emailInput.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/usercontext";
import LoaderPoints from "../LoaderPoints/LoaderPoints";
import Image from "next/image";
import { Magic } from "magic-sdk";
import { toast } from "react-toastify";

export default function emailInput() {
  const [user, setUser] = useContext(UserContext),
    [email, setEmail] = useState(""),
    [edit, setEdit] = useState(false),
    [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY, {
      locale: "fr",
    });
    try {
      await m.user.updateEmail({ email });
      const newUser = { ...user };
      newUser.email = email;
      setUser(newUser);
      toast.success("email modifié !");
    } catch {
      // toast.error("Un problème est survenu !")
    }
    setLoading(false);
  }
  return (
    <div className={classes.container}>
      {user ? (
        <>
          {edit ? (
            <form className={classes.form} onSubmit={handleSubmit}>
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={classes.containerButtons}>
                <button type="reset" onClick={() => setEdit(false)}>
                  annuler
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? <LoaderPoints /> : "modifier"}
                </button>
              </div>
            </form>
          ) : (
            <div className={classes.containerEmail}>
              <p>{user.email}</p>
              <Image
                className={classes.edit}
                src="/pen.webp"
                width="20"
                height="20"
                alt="edit"
                onClick={() => setEdit(true)}
              />
            </div>
          )}
        </>
      ) : (
        <LoaderPoints />
      )}
    </div>
  );
}
