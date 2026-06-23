import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuizCategory as QuizCategoryType } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useAppStore } from '../store/useAppStore';

interface QuizCategoryProps {
  category: QuizCategoryType;
  onPress: (category: QuizCategoryType) => void;
}

type IoniconName = keyof typeof Ionicons.glyphMap;

const iconMap: Record<string, IoniconName> = {
  shield: 'shield-outline',
  skull: 'skull-outline',
  map: 'map-outline',
  flame: 'flame-outline',
  movie: 'film-outline',
};

export const QuizCategory: React.FC<QuizCategoryProps> = ({ category, onPress }) => {
  const completedCategories = useAppStore(s => s.completedCategories);
  const categoryScores = useAppStore(s => s.categoryScores);
  const isCompleted = completedCategories.includes(category.id);
  const score = categoryScores[category.id];

  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.cardCompleted]}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <View style={[styles.iconCircle, isCompleted && styles.iconCircleCompleted]}>
        <Ionicons
          name={iconMap[category.icon] ?? 'help-circle-outline'}
          size={28}
          color={isCompleted ? Colors.background : Colors.gold}
        />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.sub}>{isCompleted ? `Completado · ${score ?? 0}/5` : '5 preguntas'}</Text>
      </View>
      {isCompleted && (
        <Ionicons name="checkmark-circle" size={22} color={Colors.aliveLight} />
      )}
      {!isCompleted && (
        <Ionicons name="chevron-forward" size={20} color={Colors.gold} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
  },
  cardCompleted: {
    borderColor: Colors.gold,
    backgroundColor: Colors.backgroundLight,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconCircleCompleted: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  sub: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
});
