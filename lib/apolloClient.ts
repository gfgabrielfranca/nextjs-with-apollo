import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

type CustomApolloClient = ApolloClient<NormalizedCacheObject>;

let apolloClient: CustomApolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://rickandmortyapi.com/graphql/', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null): CustomApolloClient {
  const newApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = newApolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    newApolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return newApolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = newApolloClient;

  return newApolloClient;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useApollo(initialState): CustomApolloClient {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
