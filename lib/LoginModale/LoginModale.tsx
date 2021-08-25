import classes from "./LoginModale.module.css";
import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import LoaderPoints from "../LoaderPoints/LoaderPoints";
import loginQuery from "../../graphql/queries/login.query";
import Ls from "../../utils/ls";

export default function LoginModale({ setShow, setUser }) {
  const [input, setInput] = useState(""),
    [loading, setLoading] = useState(false),
    [addUser, { data }] = useMutation(loginQuery);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY, {
      locale: "fr",
    });
    await m.auth.loginWithMagicLink({ email: input });
    const didToken = await m.user.getIdToken();
    const ls = new Ls();
    ls.setUserToken(await m.user.generateIdToken({ lifespan: 259200 }));
    try {
      await addUser({
        variables: { didToken },
      });
    } catch (e) {
      toast.error("Impossible de se connecter");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data) {
      setLoading(false);
      setUser({ ...data.login, isConnected: true });
      setShow(false);
      toast.success("connecté.e !");
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <div className={classes.modale}>
        <div className={classes.containerClose}>
          <div className="close" onClick={() => setShow(false)} />
        </div>
        <h2 className={classes.title}>Se connecter</h2>
        <div className={classes.description}>
          <p>
            Entrez votre adresse email pour vous connecter ou vous enregistrer.
          </p>
          <p>
            Vous recevrez un lien vous permettant de finaliser la connexion.
          </p>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            autoFocus
            type="email"
            name="email"
            id="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button disabled={loading}>
            {loading ? (
              <span>
                Veuillez patientez
                <LoaderPoints />
              </span>
            ) : (
              "Envoyer"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
