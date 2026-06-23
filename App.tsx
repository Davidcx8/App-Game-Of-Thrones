import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenAPI from 'expo-splash-screen';
import {
  useFonts,
  Cinzel_400Regular,
  Cinzel_700Bold,
  Cinzel_900Black,
} from '@expo-google-fonts/cinzel';
import {
  useFonts as useLoraFonts,
  Lora_400Regular,
  Lora_700Bold,
  Lora_400Regular_Italic,
} from '@expo-google-fonts/lora';
import { RootNavigator } from './src/navigation/RootNavigator';
import { Colors } from './src/theme/colors';

// Prevent auto-hide splash until fonts load
SplashScreenAPI.preventAutoHideAsync();

export default function App() {
  const [cinzelLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    Cinzel_900Black,
  });

  const [loraLoaded] = useLoraFonts({
    Lora_400Regular,
    Lora_700Bold,
    Lora_400Regular_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (cinzelLoaded && loraLoaded) {
      await SplashScreenAPI.hideAsync();
    }
  }, [cinzelLoaded, loraLoaded]);

  if (!cinzelLoaded || !loraLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: Colors.gold,
              background: Colors.background,
              card: Colors.backgroundMid,
              text: Colors.textPrimary,
              border: Colors.borderDim,
              notification: Colors.crimson,
            },
          }}
        >
          <StatusBar style="light" backgroundColor={Colors.background} />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
