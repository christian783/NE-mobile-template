import 'react-native-gesture-handler';

import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold
} from '@expo-google-fonts/dm-sans';
import {
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic
} from '@expo-google-fonts/playfair-display';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';

import AppNavigator from './app/navigation/AppNavigator';

ExpoSplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    JetBrainsMono_400Regular,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic
  });

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync().catch(() => undefined);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
