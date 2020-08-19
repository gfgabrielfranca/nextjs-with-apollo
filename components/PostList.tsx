import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface Character {
  name: string;
}

interface CharactersData {
  characters: {
    results: Character[];
  };
}

export const ALL_CHARACTERS_QUERY = gql`
  query characters {
    characters {
      results {
        name
      }
    }
  }
`;

const PostList: React.FC = () => {
  const { data, loading } = useQuery<CharactersData>(ALL_CHARACTERS_QUERY);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <ul>
      {data.characters.results.map(character => (
        <li>{character.name}</li>
      ))}
    </ul>
  );
};

export default PostList;
