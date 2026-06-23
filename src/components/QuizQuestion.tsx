import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { QuizQuestion as QuizQuestionType } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useAppStore } from '../store/useAppStore';

const ROMAN = ['I', 'II', 'III', 'IV'] as const;
const TIMER_SECONDS = 15;

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  totalQuestions: number;
  totalScore: number;
  onAnswer: (index: number) => void;
  onTimeout: () => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionIndex,
  totalQuestions,
  totalScore,
  onAnswer,
  onTimeout,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerAnimRef = useRef(new Animated.Value(1));
  const feedbackAnim = useRef(new Animated.Value(1)).current;
  // Track if question is already answered/timed-out to prevent double-fire
  const answeredRef = useRef(false);
  const sfxEnabled = useAppStore(s => s.sfxEnabled);

  // Reset on new question
  useEffect(() => {
    setSelected(null);
    setTimeLeft(TIMER_SECONDS);
    answeredRef.current = false;

    // Reset and restart timer animation
    timerAnimRef.current.setValue(1);
    Animated.timing(timerAnimRef.current, {
      toValue: 0,
      duration: TIMER_SECONDS * 1000,
      useNativeDriver: false,
    }).start();

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          if (!answeredRef.current) {
            answeredRef.current = true;
            onTimeout();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // Only re-run when question changes (use questionIndex as stable key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (answeredRef.current) return;
      answeredRef.current = true;

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const isCorrect = index === question.answer;
      setSelected(index);

      if (sfxEnabled) {
        Haptics.impactAsync(
          isCorrect ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy,
        );
        try {
          const sfxPath = isCorrect 
            ? require('../../assets/audio/sfx-correct.mp3') 
            : require('../../assets/audio/sfx-wrong.mp3');
          Audio.Sound.createAsync(sfxPath, { shouldPlay: true });
        } catch (e) {
          // Ignore
        }
      }

      Animated.sequence([
        Animated.timing(feedbackAnim, { toValue: 1.04, duration: 100, useNativeDriver: true }),
        Animated.timing(feedbackAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();

      // Delay to show feedback before advancing
      setTimeout(() => onAnswer(index), 1000);
    },
    [question.answer, onAnswer, feedbackAnim, sfxEnabled],
  );

  const getOptionStyle = (index: number) => {
    if (selected === null) return [styles.option, styles.optionIdle];
    if (index === question.answer) return [styles.option, styles.optionCorrect];
    if (index === selected && selected !== question.answer) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDim];
  };

  const timerColor = timeLeft <= 3 ? Colors.crimsonLight : timeLeft <= 6 ? Colors.gold : Colors.aliveLight;

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.scrollIcon}>
          <Text style={styles.scrollIconText}>📜</Text>
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scoreLabel}>SCORE </Text>
          <Text style={styles.scoreValue}>{totalScore}</Text>
        </View>
        <View style={[styles.timerCircle, { borderColor: timerColor }]}>
          <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}</Text>
        </View>
      </View>

      {/* Progress strip */}
      <View style={styles.progressStrip}>
        <View
          style={[
            styles.progressFill,
            { width: `${((questionIndex + 1) / totalQuestions) * 100}%` },
          ]}
        />
      </View>

      {/* Question */}
      <View style={styles.questionSection}>
        <Text style={styles.questionIndex}>
          PREGUNTA {questionIndex + 1} DE {totalQuestions}
        </Text>
        <Animated.Text style={[styles.question, { transform: [{ scale: feedbackAnim }] }]}>
          {question.q}
        </Animated.Text>
      </View>

      {/* Options */}
      <View style={styles.optionsSection}>
        {question.options.map((opt: string, i: number) => (
          <TouchableOpacity
            key={i}
            style={getOptionStyle(i)}
            onPress={() => handleAnswer(i)}
            activeOpacity={0.8}
            disabled={selected !== null}
          >
            <Text style={styles.roman}>{ROMAN[i]}.</Text>
            <Text style={styles.optionText}>{opt}</Text>
            {selected !== null && i === question.answer && (
              <Text style={styles.feedbackIcon}>✓</Text>
            )}
            {selected === i && i !== question.answer && (
              <Text style={styles.feedbackIconWrong}>✕</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.backgroundMid,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  scrollIcon: {
    width: 44,
    height: 44,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  scrollIconText: {
    fontSize: 22,
  },
  scorePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundLight,
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderDim,
  },
  scoreLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  scoreValue: {
    ...Typography.loraBold,
    color: Colors.textPrimary,
    fontSize: 18,
  },
  timerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    ...Typography.loraBold,
    fontSize: 18,
  },
  progressStrip: {
    height: 3,
    backgroundColor: Colors.borderSubtle,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.gold,
  },
  questionSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  questionIndex: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 20,
  },
  question: {
    ...Typography.quizQuestion,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  optionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  optionIdle: {
    borderColor: Colors.borderDim,
    backgroundColor: Colors.backgroundMid,
  },
  optionCorrect: {
    borderColor: Colors.aliveLight,
    backgroundColor: 'rgba(46,125,50,0.15)',
  },
  optionWrong: {
    borderColor: Colors.crimsonLight,
    backgroundColor: 'rgba(139,0,0,0.15)',
  },
  optionDim: {
    borderColor: Colors.borderSubtle,
    backgroundColor: Colors.backgroundMid,
    opacity: 0.5,
  },
  roman: {
    ...Typography.romanNumeral,
    color: Colors.gold,
    width: 28,
  },
  optionText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  feedbackIcon: {
    color: Colors.aliveLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackIconWrong: {
    color: Colors.crimsonLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
