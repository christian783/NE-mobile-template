import 'react-native-gesture-handler';

import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import AppNavigator from './app/navigation/AppNavigator';
import { AuthProvider } from './app/context/AuthContext';
import { COLORS } from './app/constants/colors';
import { configureNotifications } from './app/utils/notifications';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.surface,
    error: COLORS.error,
    onSurface: COLORS.text,
    outline: COLORS.border
  }
};

export default function App() {
  useEffect(() => {
    configureNotifications().catch(() => undefined);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <StatusBar style="dark" />
            <AppNavigator />
            <Toast />
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
