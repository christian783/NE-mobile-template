import { Animated, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';

import { COLORS, FONTS, SPACING } from '../constants';

const ErrorMessage = ({ message, style }) => {
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true
    }).start();
  }, [opacity]);

  if (!message) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity }, style]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.sm
  },
  text: {
    color: COLORS.error,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  }
});

export default ErrorMessage;
