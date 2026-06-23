import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Moment } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface MomentCardProps {
  moment: Moment;
  onPress: (moment: Moment) => void;
}

export const MomentCard: React.FC<MomentCardProps> = ({ moment, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(moment)} activeOpacity={0.85}>
      <ImageBackground source={moment.image} style={styles.image} resizeMode="cover">
        <LinearGradient
          colors={['transparent', 'rgba(26,10,0,0.85)', Colors.background]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.content}>
          <Text style={styles.number}>{moment.number}</Text>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{moment.title}</Text>
            <Text style={styles.season}>{moment.season}</Text>
          </View>
          <View style={styles.playBadge}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'flex-end',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 40,
  },
  number: {
    ...Typography.heroTitle,
    color: Colors.goldDim,
    fontSize: 40,
    marginRight: 14,
    opacity: 0.6,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.textPrimary,
    fontSize: 18,
  },
  season: {
    ...Typography.italicSmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  playBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: Colors.gold,
    fontSize: 14,
    marginLeft: 2,
  },
});
