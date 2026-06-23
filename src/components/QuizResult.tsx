import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface QuizResultProps {
  score: number;
  total: number;
  categoryTitle: string;
  onRetry: () => void;
  onContinue: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  score,
  total,
  categoryTitle,
  onRetry,
  onContinue,
}) => {
  const percentage = Math.round((score / total) * 100);
  const isPerfect = score === total;

  return (
    <View style={styles.container}>
      {/* Gold ornament */}
      <Text style={styles.ornament}>◆</Text>
      <Text style={styles.finishedLabel}>RONDA COMPLETADA</Text>

      {/* Score display */}
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreNum}>{score}</Text>
        <Text style={styles.scoreTotal}>/ {total}</Text>
      </View>

      <Text style={styles.percentage}>{percentage}% de aciertos</Text>
      <Text style={styles.categoryLabel}>{categoryTitle}</Text>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.divLine} />
        <Text style={styles.divDiamond}>◆</Text>
        <View style={styles.divLine} />
      </View>

      {/* Message */}
      <Text style={styles.message}>
        {isPerfect
          ? '¡Hazaña perfecta, Lord Comandante!'
          : score >= 3
          ? 'El Norte recuerda tus respuestas.'
          : 'Los Caminantes Blancos saben más que tú.'}
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.btnPrimary} onPress={onContinue}>
        <Text style={styles.btnPrimaryText}>CONTINUAR →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSecondary} onPress={onRetry}>
        <Text style={styles.btnSecondaryText}>Repetir categoría</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  ornament: {
    color: Colors.gold,
    fontSize: 24,
    marginBottom: 8,
  },
  finishedLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 4,
    marginBottom: 32,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: Colors.backgroundMid,
    flexDirection: 'row',
  },
  scoreNum: {
    ...Typography.heroTitle,
    color: Colors.textGold,
    fontSize: 52,
  },
  scoreTotal: {
    ...Typography.pageTitle,
    color: Colors.textSecondary,
    fontSize: 22,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  percentage: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  categoryLabel: {
    ...Typography.italicSmall,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderDim,
  },
  divDiamond: {
    color: Colors.gold,
    fontSize: 12,
    marginHorizontal: 10,
  },
  message: {
    ...Typography.italic,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 26,
  },
  btnPrimary: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: Colors.gold,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
    borderRadius: 2,
  },
  btnPrimaryText: {
    ...Typography.navLabel,
    color: Colors.gold,
    letterSpacing: 3,
    fontSize: 13,
  },
  btnSecondary: {
    paddingVertical: 8,
  },
  btnSecondaryText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
