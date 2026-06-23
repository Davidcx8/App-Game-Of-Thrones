import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { DrawerParamList } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useAppStore } from '../store/useAppStore';

type HomeNavProp = DrawerNavigationProp<DrawerParamList, 'Home'>;
interface Props { navigation: HomeNavProp; }

const { width } = Dimensions.get('window');

// Rotating quotes
const QUOTES = [
  { text: '"When you play the game of thrones, you win or you die."', author: '— Cersei Lannister' },
  { text: '"The man who passes the sentence should swing the sword."', author: '— Eddard Stark' },
  { text: '"A lion does not concern itself with the opinion of sheep."', author: '— Tywin Lannister' },
  { text: '"Chaos isn\'t a pit. Chaos is a ladder."', author: '— Petyr Baelish' },
  { text: '"The night is dark and full of terrors."', author: '— Melisandre' },
  { text: '"Winter is coming."', author: '— House Stark' },
  { text: '"Dracarys."', author: '— Daenerys Targaryen' },
];

const quickLinks = [
  { label: 'Personajes', icon: 'people' as const, screen: 'Characters' as const },
  { label: 'Momentos', icon: 'film' as const, screen: 'Moments' as const },
  { label: 'Quiz', icon: 'game-controller' as const, screen: 'Game' as const },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const quoteFadeAnim = useRef(new Animated.Value(1)).current;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const totalScore = useAppStore(s => s.totalScore);
  const getTitle = useAppStore(s => s.getTitle);
  const soundEnabled = useAppStore(s => s.soundEnabled);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Play background music
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      const playMusic = async () => {
        if (!soundEnabled) return;
        try {
          const { sound } = await Audio.Sound.createAsync(
            require('../../assets/audio/theme-home.mp3'),
            { shouldPlay: true, isLooping: true }
          );
          if (isMounted) {
            soundRef.current = sound;
          } else {
            sound.unloadAsync();
          }
        } catch (error) {
          console.error("Error playing sound", error);
        }
      };

      playMusic();

      return () => {
        isMounted = false;
        if (soundRef.current) {
          soundRef.current.unloadAsync();
          soundRef.current = null;
        }
      };
    }, [soundEnabled])
  );

  // Entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // Rotating quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(quoteFadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
        setQuoteIndex(prev => (prev + 1) % QUOTES.length);
        // Fade in
        Animated.timing(quoteFadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = QUOTES[quoteIndex];

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../assets/images/splash-bg.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[Colors.overlayMid, Colors.background]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={26} color={Colors.gold} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>GAME OF THRONES</Text>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>{totalScore}</Text>
          </View>
        </View>

        {/* Hero */}
        <Animated.View
          style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <Image source={require('../../assets/images/logo.webp')} style={styles.logo} resizeMode="contain" />

          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divDiamond}>◆</Text>
            <View style={styles.divLine} />
          </View>

          {/* Animated rotating quote */}
          <Animated.View style={[styles.quoteBlock, { opacity: quoteFadeAnim }]}>
            <Text style={styles.tagline}>{currentQuote.text}</Text>
            <Text style={styles.taglineAuthor}>{currentQuote.author}</Text>
          </Animated.View>
        </Animated.View>

        {/* Rank card */}
        <View style={styles.rankCard}>
          <Text style={styles.rankLabel}>TU RANGO ACTUAL</Text>
          <Text style={styles.rankTitle}>{getTitle()}</Text>
          <Text style={styles.rankScore}>{totalScore} puntos acumulados</Text>
        </View>

        {/* Quick access */}
        <View style={styles.quickLinks}>
          {quickLinks.map(link => (
            <TouchableOpacity
              key={link.screen}
              style={styles.quickCard}
              onPress={() => navigation.navigate(link.screen)}
              activeOpacity={0.8}
            >
              <Ionicons name={link.icon} size={26} color={Colors.gold} />
              <Text style={styles.quickLabel}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { val: '8', label: 'Temporadas' },
            { val: '73', label: 'Episodios' },
            { val: '38', label: 'Emmys' },
          ].map(s => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  bg: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  menuBtn: { padding: 6 },
  headerTitle: {
    ...Typography.navLabel,
    color: Colors.gold,
    letterSpacing: 3,
    fontSize: 12,
  },
  scoreBadge: {
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  scoreText: {
    ...Typography.loraBold,
    color: Colors.gold,
    fontSize: 13,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  logo: {
    width: width * 0.6,
    height: 80,
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 12,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divDiamond: { color: Colors.gold, fontSize: 12, marginHorizontal: 8 },
  quoteBlock: {
    alignItems: 'center',
    minHeight: 60,
  },
  tagline: {
    ...Typography.italic,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 22,
  },
  taglineAuthor: {
    ...Typography.italicSmall,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  rankCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    padding: 16,
    alignItems: 'center',
  },
  rankLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 3,
    marginBottom: 6,
  },
  rankTitle: {
    ...Typography.sectionTitle,
    color: Colors.gold,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  rankScore: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  quickLinks: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  quickLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.borderSubtle,
  },
  statVal: {
    ...Typography.pageTitle,
    color: Colors.textGold,
    fontSize: 26,
  },
  statLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
});
