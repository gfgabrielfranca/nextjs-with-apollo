import React from 'react';
import { useQuery } from '@apollo/client';

import ALL_CHARACTERS_QUERY, { CharactersData } from '../../data/allCharacters';

import * as S from './styles';

const Home: React.FC = () => {
  const { data, loading } = useQuery<CharactersData>(ALL_CHARACTERS_QUERY);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <S.Container>
      <ul>
        {data.characters.results.map(character => (
          <li>{character.name}</li>
        ))}
      </ul>
    </S.Container>
  );
};

export default Home;
