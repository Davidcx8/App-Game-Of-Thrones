import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

type SplashNavProp = StackNavigationProp<RootStackParamList, 'Splash'>;
interface Props { navigation: SplashNavProp; }

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const btnFade = useRef(new Animated.Value(0)).current;
  const [showButton, setShowButton] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const btnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Fade in logo after 600ms
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 600);

    // Show button after 3s
    btnTimerRef.current = setTimeout(() => {
      revealButton();
    }, 3000);

    return () => {
      if (btnTimerRef.current) clearTimeout(btnTimerRef.current);
    };
  }, []);

  const revealButton = () => {
    setShowButton(true);
    Animated.timing(btnFade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const handleVideoStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      revealButton();
      if (btnTimerRef.current) clearTimeout(btnTimerRef.current);
    }
  };

  const handleEnter = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../../assets/images/splash-bg.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Video overlay */}
        {!videoError && (
          <Video
            source={require('../../assets/videos/splash-intro.mp4')}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isMuted
            isLooping={false}
            onPlaybackStatusUpdate={handleVideoStatus}
            onError={() => setVideoError(true)}
          />
        )}

        {/* Dark overlay */}
        <View style={styles.darkOverlay} />

        {/* Center content */}
        <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
          <Text style={styles.title}>GAME OF</Text>
          <Text style={styles.titleLine2}>THRONES</Text>

          {/* Divider with diamond */}
          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divDiamond}>◆</Text>
            <View style={styles.divLine} />
          </View>

          <Text style={styles.subtitle}>Winter is Coming</Text>
        </Animated.View>

        {/* CTA Button */}
        {showButton && (
          <Animated.View style={[styles.btnContainer, { opacity: btnFade }]}>
            <TouchableOpacity style={styles.enterBtn} onPress={handleEnter} activeOpacity={0.8}>
              <Text style={styles.enterBtnText}>ENTRAR AL REINO</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bg: {
    flex: 1,
    width,
    height,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlayMid,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  title: {
    ...Typography.heroTitle,
    color: Colors.gold,
    fontSize: 44,
    letterSpacing: 10,
  },
  titleLine2: {
    ...Typography.heroTitle,
    color: Colors.gold,
    fontSize: 44,
    letterSpacing: 10,
    marginTop: -8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    marginVertical: 20,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.goldDim,
  },
  divDiamond: {
    color: Colors.gold,
    fontSize: 14,
    marginHorizontal: 10,
  },
  subtitle: {
    ...Typography.italic,
    color: Colors.textPrimary,
    fontSize: 17,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 60,
    left: 28,
    right: 28,
  },
  enterBtn: {
    borderWidth: 1.5,
    borderColor: Colors.gold,
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: 'rgba(26,10,0,0.6)',
  },
  enterBtnText: {
    ...Typography.navLabel,
    color: Colors.gold,
    fontSize: 14,
    letterSpacing: 4,
  },
});
