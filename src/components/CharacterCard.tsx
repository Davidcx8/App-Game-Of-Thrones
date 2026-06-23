import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface CharacterCardProps {
  character: Character;
  onPress: (character: Character) => void;
}

const houseIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Stark: 'paw',
  Lannister: 'diamond',
  Targaryen: 'flame',
  "Night's Watch": 'snow',
};

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }) => {
  const primaryHouse = character.house.split('/')[0].trim();
  const iconName = houseIcons[primaryHouse] ?? 'shield';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(character)}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image source={character.image} style={styles.image} resizeMode="cover" />
        <View style={styles.imageRing} />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {character.name.toUpperCase()}
      </Text>
      <View style={styles.houseRow}>
        <Ionicons name={iconName} size={11} color={Colors.textSecondary} />
        <Text style={styles.house} numberOfLines={1}>
          {' '}{primaryHouse}
        </Text>
      </View>
      {/* Status dot */}
      <View style={[styles.statusDot, { backgroundColor: character.status === 'alive' ? Colors.aliveLight : Colors.crimsonLight }]} />
      <Text style={[styles.statusText, { color: character.status === 'alive' ? Colors.aliveLight : Colors.crimsonLight }]}>
        {character.status === 'alive' ? 'VIVO' : 'MUERTO'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 14,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 106,
    height: 106,
    borderRadius: 53,
  },
  imageRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  name: {
    ...Typography.cardTitle,
    color: Colors.textGold,
    textAlign: 'center',
    marginBottom: 8,
  },
  houseRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  house: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 4,
  },
  statusText: {
    ...Typography.label,
    letterSpacing: 2,
    fontSize: 10,
  },
});
