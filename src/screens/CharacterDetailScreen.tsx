import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CharactersStackParamList } from '../navigation/types';
import { SigilBadge } from '../components/SigilBadge';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  route: RouteProp<CharactersStackParamList, 'CharacterDetail'>;
  navigation: StackNavigationProp<CharactersStackParamList, 'CharacterDetail'>;
};

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = Math.round(height * 0.45);

export const CharacterDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { character } = route.params;
  const isAlive = character.status === 'alive';
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={[styles.heroWrapper, { height: HERO_HEIGHT }]}>
          <Image
            source={character.image}
            style={[styles.heroImage, { height: HERO_HEIGHT }]}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', Colors.background]}
            style={styles.heroGradient}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
          />
          {/* Back button respects safe area */}
          <TouchableOpacity
            style={[styles.backBtn, { top: insets.top + 10 }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.gold} />
          </TouchableOpacity>
        </View>

        {/* Sigil floating */}
        <View style={styles.sigilRow}>
          <SigilBadge sigil={character.sigil} size={80} />
        </View>

        {/* Name + house */}
        <View style={styles.nameSection}>
          <Text style={styles.characterName}>{character.name.toUpperCase()}</Text>
          <Text style={styles.characterHouse}>{character.house}</Text>

          {/* Status badge */}
          <View style={[styles.statusBadge, { borderColor: isAlive ? Colors.aliveLight : Colors.crimsonLight }]}>
            <View style={[styles.statusDot, { backgroundColor: isAlive ? Colors.aliveLight : Colors.crimsonLight }]} />
            <Text style={[styles.statusText, { color: isAlive ? Colors.aliveLight : Colors.crimsonLight }]}>
              {isAlive ? 'VIVO' : 'MUERTO'}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.divLine} />
          <Text style={styles.divIcon}>⚔</Text>
          <View style={styles.divLine} />
        </View>

        {/* Bio */}
        <Text style={styles.bio}>{character.bio}</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { icon: '🎭', label: 'ACTOR', value: character.actor },
            { icon: '🏰', label: 'CASA', value: character.house.split('/')[0].trim() },
            { icon: '⚡', label: 'LEMA', value: character.motto },
          ].map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue} numberOfLines={2}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroWrapper: {
    width,
    position: 'relative',
  },
  heroImage: {
    width,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT * 0.5,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: Colors.overlayDark,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  sigilRow: {
    alignItems: 'center',
    marginTop: -40,
    zIndex: 2,
  },
  nameSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  characterName: {
    ...Typography.pageTitle,
    color: Colors.gold,
    textAlign: 'center',
    letterSpacing: 3,
  },
  characterHouse: {
    ...Typography.italic,
    color: Colors.textSecondary,
    marginTop: 6,
    marginBottom: 12,
    textAlign: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    ...Typography.label,
    letterSpacing: 2,
    fontSize: 11,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 20,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divIcon: { fontSize: 14, marginHorizontal: 12, color: Colors.gold },
  bio: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginHorizontal: 24,
    lineHeight: 28,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  statIcon: { fontSize: 20, marginBottom: 6 },
  statLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 6,
    textAlign: 'center',
  },
  statValue: {
    ...Typography.cardTitle,
    color: Colors.gold,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
