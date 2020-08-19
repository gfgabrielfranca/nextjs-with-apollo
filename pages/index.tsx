import React from 'react';
import { initializeApollo } from '../lib/apolloClient';
import PostList, { ALL_CHARACTERS_QUERY } from '../components/PostList';

const Home: React.FC = () => {
  return (
    <div>
      <PostList />
    </div>
  );
};

export default Home;

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
