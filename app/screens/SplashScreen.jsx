import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { FONTS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const logo = require('../../assets/logo.png');

const SplashScreen = ({ navigation }) => {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(20));
  const { colors, settings } = useSettings();
  const styles = createStyles(colors);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true
    }).start();

    const timeout = setTimeout(() => {
      navigation.replace('Search');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation, opacity, translateY]);

  return (
    <View style={styles.container}>
      <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
      <Animated.View
        style={[styles.content, { opacity, transform: [{ translateY }] }]}
      >
        <Image resizeMode="contain" source={logo} style={styles.logo} />
        <Text style={styles.title}>LexiDict</Text>
        <Text style={styles.tagline}>Every word, instantly.</Text>
      </Animated.View>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.screen
  },
  content: {
    alignItems: 'center'
  },
  logo: {
    height: 100,
    marginBottom: SPACING.lg,
    width: 100
  },
  title: {
    color: colors.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 36,
    lineHeight: 44,
    marginBottom: SPACING.xs
  },
  tagline: {
    color: colors.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  }
});

export default SplashScreen;
