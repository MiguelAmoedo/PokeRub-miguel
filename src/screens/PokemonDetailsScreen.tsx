import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getPokemonSpecies, getEvolutionChain } from '../services/api';
import { Pokemon, EvolutionChain } from '../types/pokemon';
import { useFavorites } from '../hooks/useFavorites';
import { NavigationProp } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

type PokemonDetailsRouteProp = RouteProp<{ PokemonDetails: { pokemon: Pokemon } }, 'PokemonDetails'>;

export const PokemonDetailsScreen = () => {
  const route = useRoute<PokemonDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { pokemon } = route.params;
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    loadEvolutionChain();
  }, []);

  const loadEvolutionChain = async () => {
    try {
      const species = await getPokemonSpecies(pokemon.name);
      const chain = await getEvolutionChain(species.evolution_chain.url);
      setEvolutionChain(chain);
    } catch (error) {
      console.error('Erro ao carregar cadeia de evolução:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderEvolutionChain = () => {
    if (!evolutionChain) return null;

    const { chain } = evolutionChain;
    const evolutions = [];

    // Primeira evolução
    evolutions.push(chain.species.name);

    // Segunda evolução
    if (chain.evolves_to.length > 0) {
      evolutions.push(chain.evolves_to[0].species.name);

      // Terceira evolução
      if (chain.evolves_to[0].evolves_to.length > 0) {
        evolutions.push(chain.evolves_to[0].evolves_to[0].species.name);
      }
    }

    return (
      <View style={styles.evolutionContainer}>
        <Text style={styles.sectionTitle}>Cadeia de Evolução</Text>
        <View style={styles.evolutionChain}>
          {evolutions.map((name, index) => (
            <View key={name} style={styles.evolutionItem}>
              <Text style={styles.evolutionName}>{name}</Text>
              {index < evolutions.length - 1 && <Text style={styles.evolutionArrow}>→</Text>}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map(type => (
            <Text key={type.type.name} style={styles.typeText}>
              {type.type.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Características</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Altura:</Text>
          <Text style={styles.statValue}>{pokemon.height / 10}m</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Peso:</Text>
          <Text style={styles.statValue}>{pokemon.weight / 10}kg</Text>
        </View>
      </View>

      <View style={styles.abilitiesContainer}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        {pokemon.abilities.map(ability => (
          <Text key={ability.ability.name} style={styles.abilityText}>
            {ability.ability.name}
          </Text>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        renderEvolutionChain()
      )}

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => {
          if (isFavorite(pokemon.id)) {
            removeFavorite(pokemon.id);
          } else {
            addFavorite(pokemon);
          }
        }}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite(pokemon.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  typeText: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    textTransform: 'capitalize',
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  abilitiesContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  abilityText: {
    fontSize: 16,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  evolutionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  evolutionChain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evolutionItem: {
    alignItems: 'center',
  },
  evolutionName: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  evolutionArrow: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  favoriteButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 