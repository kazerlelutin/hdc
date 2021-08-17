import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const username = process.env.WP_USERNAME
const password =  process.env.WP_PASS

const httpLink = createHttpLink({
    uri:process.env.NEXT_PUBLIC_WP_GRAPHQL,
  });

const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Basic ${Buffer.from(username + ':' +password , 'binary').toString('base64')}`,
      }
    }
  });

export const wpClient  = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
