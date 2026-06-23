import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../theme/colors';


interface SigilBadgeProps {
  sigil: string;
  size?: number;
}

const sigilImages: Record<string, number> = {
  stark: require('../../assets/images/sigil-stark.webp'),
  lannister: require('../../assets/images/sigil-lannister.webp'),
  targaryen: require('../../assets/images/sigil-targaryen.webp'),
  nightswatch: require('../../assets/images/sigil-nightswatch.webp'),
};

export const SigilBadge: React.FC<SigilBadgeProps> = ({ sigil, size = 72 }) => {
  const imageSize = size * 0.7;
  const offset = (size - imageSize) / 2;

  return (
    <Svg width={size} height={size} style={styles.container}>
      <Defs>
        <LinearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={Colors.gold} stopOpacity="1" />
          <Stop offset="1" stopColor={Colors.goldDim} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      {/* Outer gold ring */}
      <Circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill={Colors.backgroundMid} stroke="url(#goldGrad)" strokeWidth={2} />
      {/* Inner dark fill */}
      <Circle cx={size / 2} cy={size / 2} r={size / 2 - 4} fill={Colors.background} />
      <Image
        source={sigilImages[sigil]}
        style={{
          position: 'absolute',
          width: imageSize,
          height: imageSize,
          top: offset,
          left: offset,
          borderRadius: imageSize / 2,
        }}
        resizeMode="cover"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
