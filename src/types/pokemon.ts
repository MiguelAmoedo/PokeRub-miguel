export interface Pokemon {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChain {
  chain: {
    evolves_to: {
      species: {
        name: string;
      };
      evolves_to: {
        species: {
          name: string;
        };
      }[];
    }[];
    species: {
      name: string;
    };
  };
} 