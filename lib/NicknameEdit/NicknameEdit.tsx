import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import updateNameMutation from "../../graphql/mutations/updateName.mutation";
import Ls from "../../utils/ls";
import { UserContext } from "../../utils/usercontext";
import LoaderPoints from "../LoaderPoints/LoaderPoints";
import classes from "./NicknameEdit.module.css";

export default function NicknameEdit() {
  const [user, setUser] = useContext(UserContext),
    [name, setName] = useState(""),
    [edit, setEdit] = useState(false),
    [upName, { data, loading }] = useMutation(updateNameMutation);

  useEffect(() => {
    if (user.name) {
      setName(user.name);
    }
  }, [user.name]);

  useEffect(() => {
    if (data && data.updateName) {
      const newUser = { ...user };
      newUser.name = data.updateName.name;
      setUser(newUser);
    }
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.name === name) {
      setEdit(false);
    } else {
      try {
        const ls = new Ls();
        await upName({
          variables: {
            didToken: ls.getUserToken(),
            name,
          },
        });
        toast.success("nom modifié !");
        setEdit(false);
      } catch (e) {
        toast.error(e.message.replace("Error: ", ""));
      }
    }
  }
  return (
    <div className={classes.container}>
      {user ? (
        <>
          {edit ? (
            <form className={classes.form} onSubmit={handleSubmit}>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <p>{user.name}</p>
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
