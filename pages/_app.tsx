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
      token = ls.getUserToken(),
      newUser = { ...userInitialState };
    if (token) {
      console.log("vérif du token et update en DB, en LS et en context");
    }

    newUser.loading = false;
    setUser(newUser);
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
