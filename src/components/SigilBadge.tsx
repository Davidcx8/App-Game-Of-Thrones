import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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

  return (
    <View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Image
        source={sigilImages[sigil]}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize / 2,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    backgroundColor: Colors.backgroundMid,
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
