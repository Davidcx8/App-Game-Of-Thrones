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
import { Ionicons } from '@expo/vector-icons';
import { MomentsStackParamList } from '../navigation/types';
import { VideoPlayer } from '../components/VideoPlayer';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

type Props = {
  route: RouteProp<MomentsStackParamList, 'MomentDetail'>;
  navigation: StackNavigationProp<MomentsStackParamList, 'MomentDetail'>;
};

const { width } = Dimensions.get('window');

export const MomentDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { moment } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroWrapper}>
          <Image source={moment.image} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', Colors.background]}
            style={styles.heroGradient}
            start={{ x: 0, y: 0.4 }}
            end={{ x: 0, y: 1 }}
          />
          <TouchableOpacity
            style={[styles.backBtn, { top: insets.top + 10 }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.gold} />
          </TouchableOpacity>
          <View style={styles.numberOverlay}>
            <Text style={styles.numberText}>{moment.number}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{moment.title}</Text>
          <Text style={styles.season}>{moment.season}</Text>

          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divDiamond}>◆</Text>
            <View style={styles.divLine} />
          </View>

          <Text style={styles.detail}>{moment.detail}</Text>

          {/* Video */}
          <Text style={styles.videoLabel}>▶ FRAGMENTO DE YOUTUBE</Text>
          <VideoPlayer videoId={moment.videoId} style={styles.videoPlayer} />
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
    height: 240,
    position: 'relative',
  },
  heroImage: {
    width,
    height: 240,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
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
  numberOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 16,
  },
  numberText: {
    ...Typography.heroTitle,
    color: Colors.gold,
    fontSize: 48,
    opacity: 0.4,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  title: {
    ...Typography.pageTitle,
    color: Colors.textGold,
    marginBottom: 6,
  },
  season: {
    ...Typography.italic,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divDiamond: { color: Colors.gold, fontSize: 12, marginHorizontal: 10 },
  detail: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: 28,
    textAlign: 'justify',
  },
  videoLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 3,
    marginBottom: 10,
  },
  videoPlayer: {
    marginBottom: 40,
  },
});
