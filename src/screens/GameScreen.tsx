import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { quizCategories } from '../data/quiz';
import { QuizCategory } from '../components/QuizCategory';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizResult } from '../components/QuizResult';
import { QuizCategory as QuizCategoryType } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

type GameView = 'categories' | 'quiz' | 'result' | 'final';

export const GameScreen: React.FC = () => {
  const [view, setView] = useState<GameView>('categories');
  const [activeCategory, setActiveCategory] = useState<QuizCategoryType | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const store = useAppStore();
  const totalScore = store.totalScore;
  const completedCount = store.completedCategories.length;
  const allDone = completedCount >= quizCategories.length;

  const startCategory = useCallback((cat: QuizCategoryType) => {
    setActiveCategory(cat);
    setSessionScore(0);
    setQuestionIndex(0);
    store.startSession(cat.id);
    setView('quiz');
  }, [store]);

  const handleAnswer = useCallback((index: number) => {
    if (!activeCategory) return;
    const correct = index === activeCategory.questions[questionIndex].answer;
    const newScore = sessionScore + (correct ? 1 : 0);
    setSessionScore(newScore);
    const nextIndex = questionIndex + 1;
    if (nextIndex >= activeCategory.questions.length) {
      store.completeCategory(activeCategory.id, newScore);
      store.resetSession();
      setView('result');
    } else {
      setQuestionIndex(nextIndex);
    }
  }, [activeCategory, questionIndex, sessionScore, store]);

  const handleTimeout = useCallback(() => {
    handleAnswer(-1); // wrong
  }, [handleAnswer]);

  const handleRetry = useCallback(() => {
    if (activeCategory) startCategory(activeCategory);
  }, [activeCategory, startCategory]);

  const handleContinue = useCallback(() => {
    if (allDone) setView('final');
    else setView('categories');
  }, [allDone]);

  // Final screen
  if (view === 'final') {
    const isVictory = totalScore >= 18;
    const resultImage = isVictory ? require('../../assets/images/daenerys.webp') : require('../../assets/images/nightking.webp');

    return (
      <View style={styles.finalContainer}>
        <Text style={styles.finalOrnament}>◆◆◆</Text>
        <Text style={styles.finalLabel}>CONQUISTA COMPLETADA</Text>
        <Text style={styles.finalTitle}>{store.getTitle()}</Text>
        <Text style={styles.finalScore}>{totalScore} / 25 puntos totales</Text>
        <View style={styles.divider}>
          <View style={styles.divLine} />
          <Text style={styles.divDiamond}>◆</Text>
          <View style={styles.divLine} />
        </View>
        <Image source={resultImage} style={styles.resultImage} resizeMode="cover" />
        <Text style={styles.finalMessage}>
          {totalScore >= 23
            ? 'El Trono de Hierro te pertenece. Los Siete Reinos se inclinan ante ti.'
            : totalScore >= 18
            ? 'Servirás al rey con sabiduría. El reino está en buenas manos.'
            : totalScore >= 13
            ? 'El Norte recuerda tus hazañas. Invernalia orgullosa.'
            : totalScore >= 8
            ? 'Vigilas el Muro. El frío te fortalece.'
            : 'Los Salvajes te han derrotado. Estudia más los archivos.'}
        </Text>
        <TouchableOpacity style={styles.resetBtn} onPress={() => { store.resetAll(); setView('categories'); }}>
          <Text style={styles.resetBtnText}>NUEVA PARTIDA</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Result screen
  if (view === 'result' && activeCategory) {
    return (
      <QuizResult
        score={sessionScore}
        total={activeCategory.questions.length}
        categoryTitle={activeCategory.title}
        onRetry={handleRetry}
        onContinue={handleContinue}
      />
    );
  }

  // Quiz screen
  if (view === 'quiz' && activeCategory) {
    const currentQuestion = activeCategory.questions[questionIndex];
    return (
      <QuizQuestion
        question={currentQuestion}
        questionIndex={questionIndex}
        totalQuestions={activeCategory.questions.length}
        totalScore={totalScore + sessionScore}
        onAnswer={handleAnswer}
        onTimeout={handleTimeout}
      />
    );
  }

  // Categories screen
  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>JUEGA CONMIGO</Text>
          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divDiamond}>◆</Text>
            <View style={styles.divLine} />
          </View>
          <Text style={styles.subtitle}>Pon a prueba tu conocimiento de Westeros</Text>
        </View>

        {/* Score banner */}
        <View style={styles.scoreBanner}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>PUNTUACIÓN GLOBAL</Text>
            <Text style={styles.scoreVal}>{totalScore} / 25</Text>
          </View>
          <View style={styles.scoreSep} />
          <View style={styles.scoreRight}>
            <Text style={styles.scoreLabel}>CATEGORÍAS</Text>
            <Text style={styles.scoreVal}>{completedCount} / {quizCategories.length}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(completedCount / quizCategories.length) * 100}%` }]} />
        </View>

        {/* Category cards */}
        {quizCategories.map(cat => (
          <QuizCategory key={cat.id} category={cat} onPress={startCategory} />
        ))}

        {allDone && (
          <TouchableOpacity style={styles.finalBtn} onPress={() => setView('final')}>
            <Text style={styles.finalBtnText}>VER TÍTULO NOBILIARIO ◆</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 32 },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  title: { ...Typography.pageTitle, color: Colors.textGold },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    marginVertical: 12,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divDiamond: { color: Colors.gold, fontSize: 12, marginHorizontal: 8 },
  subtitle: { ...Typography.italicSmall, color: Colors.textSecondary },
  scoreBanner: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  scoreLeft: { flex: 1, alignItems: 'center', padding: 14 },
  scoreSep: { width: 1, backgroundColor: Colors.borderDim },
  scoreRight: { flex: 1, alignItems: 'center', padding: 14 },
  scoreLabel: { ...Typography.label, color: Colors.textSecondary, letterSpacing: 2, marginBottom: 4 },
  scoreVal: { ...Typography.pageTitle, color: Colors.gold, fontSize: 22 },
  progressBg: {
    height: 3,
    backgroundColor: Colors.borderSubtle,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 2,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },
  finalBtn: {
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: Colors.backgroundMid,
  },
  finalBtnText: { ...Typography.navLabel, color: Colors.gold, letterSpacing: 3 },
  // Final screen
  finalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  finalOrnament: { color: Colors.gold, fontSize: 20, letterSpacing: 8, marginBottom: 16 },
  finalLabel: { ...Typography.label, color: Colors.textSecondary, letterSpacing: 4, marginBottom: 16 },
  resultImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: Colors.gold,
    marginVertical: 20,
  },
  finalTitle: {
    ...Typography.pageTitle,
    color: Colors.gold,
    textAlign: 'center',
    marginBottom: 8,
  },
  finalScore: { ...Typography.body, color: Colors.textSecondary, marginBottom: 24 },
  finalMessage: {
    ...Typography.italic,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 36,
  },
  resetBtn: {
    borderWidth: 1.5,
    borderColor: Colors.gold,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 2,
  },
  resetBtnText: { ...Typography.navLabel, color: Colors.gold, letterSpacing: 3 },
});
