import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const typeEmojis: { [key: string]: string } = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  electric: '⚡',
  grass: '🌱',
  ice: '❄️',
  fighting: '👊',
  poison: '☠️',
  ground: '🏔️',
  flying: '🦅',
  psychic: '🧠',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '✨',
};

interface TypeFilterProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

export const TypeFilter = ({ selectedType, onSelectType }: TypeFilterProps) => {
  const types = Object.keys(typeEmojis);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            selectedType === null && styles.selectedType,
          ]}
          onPress={() => onSelectType(null)}
        >
          <Text style={styles.typeText}>Todos</Text>
        </TouchableOpacity>
        {types.map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              selectedType === type && styles.selectedType,
            ]}
            onPress={() => onSelectType(type)}
          >
            <Text style={styles.typeText}>
              {typeEmojis[type]} {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedType: {
    backgroundColor: '#ffd700',
    borderColor: '#ffd700',
  },
  typeText: {
    textTransform: 'capitalize',
    fontSize: 14,
  },
}); 