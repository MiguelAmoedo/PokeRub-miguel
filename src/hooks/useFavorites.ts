import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

const FAVORITES_KEY = '@PokeRub:favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const addFavorite = async (pokemon: Pokemon) => {
    try {
      const newFavorites = [...favorites, pokemon];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
  };

  const removeFavorite = async (pokemonId: number) => {
    try {
      const newFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some(pokemon => pokemon.id === pokemonId);
  };

  const toggleFavorite = async (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      await removeFavorite(pokemon.id);
    } else {
      await addFavorite(pokemon);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}; 