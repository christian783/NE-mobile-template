import { Animated, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';

import { FONTS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const ErrorMessage = ({ message, style }) => {
  const { colors } = useSettings();
  const styles = createStyles(colors);
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

const createStyles = (colors) => StyleSheet.create({
  container: {
    marginTop: SPACING.sm
  },
  text: {
    color: colors.error,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  }
});

export default ErrorMessage;
