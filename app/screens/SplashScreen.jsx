import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { COLORS, FONTS, SPACING } from '../constants';

const logo = require('../../assets/logo.png');

const SplashScreen = ({ navigation }) => {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(20));

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
      <StatusBar style="light" />
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
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
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 36,
    lineHeight: 44,
    marginBottom: SPACING.xs
  },
  tagline: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  }
});

export default SplashScreen;
