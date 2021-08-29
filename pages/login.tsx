import Head from "../lib/Head/Head";
import { useContext } from "react";
import { UserContext } from "../utils/usercontext";
import LoginModale from "../lib/LoginModale/LoginModale";
import { useRouter } from "next/router";
import { User } from "../utils/interfaces";

export default function Home() {
  const [_user, setUser] = useContext(UserContext),
    router = useRouter();

  async function handleLogin(value: User) {
    setUser(value);
    router.push("/");
  }
  return (
    <>
      <Head title="Connexion" />
      <LoginModale setUser={handleLogin} />
    </>
  );
}
