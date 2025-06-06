import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

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

interface TypeFilterModalProps {
  visible: boolean;
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  onClose: () => void;
}

export const TypeFilterModal = ({
  visible,
  selectedType,
  onSelectType,
  onClose,
}: TypeFilterModalProps) => {
  const types = Object.keys(typeEmojis);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtrar por Tipo</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.typesContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === null && styles.selectedType,
              ]}
              onPress={() => {
                onSelectType(null);
                onClose();
              }}
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
                onPress={() => {
                  onSelectType(type);
                  onClose();
                }}
              >
                <Text style={styles.typeText}>
                  {typeEmojis[type]} {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: Dimensions.get('window').height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  typesContainer: {
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  typeButton: {
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedType: {
    backgroundColor: '#ffd700',
    borderColor: '#ffd700',
  },
  typeText: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
}); 