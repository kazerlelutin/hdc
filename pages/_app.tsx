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
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const 
  router = useRouter(),
  userInitialState = {
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
        const newUser = {...data.user};
        newUser.isConnected = true
        newUser.loading = false
        if(!newUser.name ){
          newUser.name = newUser.email.split('@')[0]
        }
        setUser({ ...newUser});
        m.user.isLoggedIn().then(async (isLoggedIn: boolean) => {
          if (isLoggedIn) {
            ls.setUserToken(await m.user.generateIdToken({ lifespan: 259200 }));
          }
        });
      } catch (e) {
        ls.setUserToken("");
        setUser({ ...userInitialState, loading: false });

        console.log('ee')
        if(router.pathname.match(/profil/)){
          router.push('/')
        }
      }
    }else {
      if(router.pathname.match(/profil/)){
        router.push('/')
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
