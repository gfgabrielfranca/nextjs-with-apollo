import { initializeApollo } from '../lib/apolloClient';

import ALL_CHARACTERS_QUERY from '../data/allCharacters';

import Home from './Home';

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_CHARACTERS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

export default Home;
