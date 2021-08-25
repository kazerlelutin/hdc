import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { UserContext } from "../utils/usercontext";
import Layout from "../lib/Layout/Layout";
import { useEffect } from "react";
import { User } from "../utils/interfaces";
import Ls from "../utils/ls";
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/client";
import { Magic } from "magic-sdk";
import LoginBytokenMutation from "../graphql/mutations/LoginByToken.mutation";

export default function MyApp({ Component, pageProps }) {
  const userInitialState = {
      isConnected: false,
      loading: true,
    },
    [user, setUser] = useState<User>(userInitialState);

  useEffect(() => {
    checkIsLoading();
  }, []);

  async function checkIsLoading() {
    const ls = new Ls(),
      token = ls.getUserToken();
    if (token) {
      try {
        const { data } = await client.mutate({
            mutation: LoginBytokenMutation,
            variables: { token },
          }),
          m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY, {
            locale: "fr",
          });
        setUser({ ...data.user, isConnected: true, loading: false });
        m.user.isLoggedIn().then(async (isLoggedIn: boolean) => {
          if (isLoggedIn) {
            ls.setUserToken(await m.user.generateIdToken({ lifespan: 259200 }));
          }
        });
      } catch (e) {
        ls.setUserToken("");
        setUser({ ...userInitialState, loading: false });
      }
    }
  }
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={[user, setUser]}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Layout>
      </UserContext.Provider>
    </ApolloProvider>
  );
}
