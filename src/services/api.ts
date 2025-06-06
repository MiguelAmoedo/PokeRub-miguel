import axios from 'axios';
import { Pokemon, PokemonSpecies, EvolutionChain } from '../types/pokemon';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getPokemonDetails = async (name: string): Promise<Pokemon> => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};

export const getPokemonSpecies = async (name: string): Promise<PokemonSpecies> => {
  const response = await api.get(`/pokemon-species/${name}`);
  return response.data;
};

export const getEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  const response = await api.get(url);
  return response.data;
}; 