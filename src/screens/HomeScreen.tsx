import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { Pokemon } from '../types/pokemon';
import { getPokemonDetails } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { TypeFilterModal } from '../components/TypeFilterModal';

export const HomeScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const firstGenPokemons = Array.from({ length: 151 }, (_, i) => i + 1);
      const pokemonDetails = await Promise.all(
        firstGenPokemons.map(id => getPokemonDetails(id.toString()))
      );
      setPokemons(pokemonDetails);
    } catch (error) {
      console.error('Erro ao carregar Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === null || 
      pokemon.types.some(type => type.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const renderPokemonItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity
      style={styles.pokemonItem}
      onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}
    >
      <Image 
        source={{ uri: item.sprites.front_default }} 
        style={styles.pokemonImage}
        resizeMode="contain"
      />
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonNumber}>#{item.id.toString().padStart(3, '0')}</Text>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <View style={styles.typesContainer}>
          {item.types.map(type => (
            <View key={type.type.name} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type.type.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
      >
        <Text style={styles.favoriteButtonText}>
          {favorites.some(fav => fav.id === item.id) ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pokémon..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.favoritesButtonText}>★ Favoritos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsTypeModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>
          {selectedType ? `Filtrando: ${selectedType}` : 'Filtrar por Tipo'}
        </Text>
      </TouchableOpacity>

      <TypeFilterModal
        visible={isTypeModalVisible}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        onClose={() => setIsTypeModalVisible(false)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredPokemons}
          renderItem={renderPokemonItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  favoritesButton: {
    padding: 8,
    backgroundColor: '#ffd700',
    borderRadius: 8,
  },
  favoritesButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  filterButton: {
    margin: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  list: {
    padding: 16,
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pokemonImage: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  pokemonInfo: {
    flex: 1,
  },
  pokemonNumber: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  typeBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteButtonText: {
    fontSize: 20,
    color: '#ffd700',
  },
}); 