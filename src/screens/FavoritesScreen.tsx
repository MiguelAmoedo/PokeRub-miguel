import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../hooks/useFavorites';
import { Pokemon } from '../types/pokemon';
import { NavigationProp } from '../types/navigation';

export const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { favorites, removeFavorite } = useFavorites();

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity
      style={styles.pokemonCard}
      onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}
    >
      <Image source={{ uri: item.sprites.front_default }} style={styles.pokemonImage} />
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <View style={styles.typesContainer}>
          {item.types.map(type => (
            <Text key={type.type.name} style={styles.typeText}>
              {type.type.name}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeFavorite(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum Pokémon favorito ainda</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderPokemon}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  pokemonImage: {
    width: 80,
    height: 80,
  },
  pokemonInfo: {
    flex: 1,
    marginLeft: 16,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  typeText: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    textTransform: 'capitalize',
  },
  removeButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
}); 