import { gql } from '@apollo/client';

export interface Character {
  name: string;
}

export interface CharactersData {
  characters: {
    results: Character[];
  };
}

export default gql`
  query characters {
    characters {
      results {
        name
      }
    }
  }
`;
