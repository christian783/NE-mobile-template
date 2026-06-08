import { Animated, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { FONTS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const LoadingDots = () => {
  const { colors } = useSettings();
  const styles = createStyles(colors);
  const [dots] = useState(() => [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]);

  useEffect(() => {
    const animations = dots.map((dot) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -10,
            duration: 320,
            useNativeDriver: true
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 320,
            useNativeDriver: true
          }),
          Animated.delay(280)
        ])
      )
    );

    Animated.stagger(140, animations).start();

    return () => animations.forEach((animation) => animation.stop());
  }, [dots]);

  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        {dots.map((dot, index) => (
          <Animated.View
            key={String(index)}
            style={[styles.dot, { transform: [{ translateY: dot }] }]}
          />
        ))}
      </View>
      <Text style={styles.text}>Looking up your word...</Text>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dots: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm
  },
  dot: {
    backgroundColor: colors.accentLight,
    borderRadius: 6,
    height: 12,
    width: 12
  },
  text: {
    color: colors.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  }
});

export default LoadingDots;
