import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pokemon } from './pokemon';

export type RootStackParamList = {
  Home: undefined;
  PokemonDetails: { pokemon: Pokemon };
  Favorites: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 