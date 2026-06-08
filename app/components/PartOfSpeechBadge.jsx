import { StyleSheet, Text } from 'react-native';

import { FONTS, RADIUS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const PartOfSpeechBadge = ({ label }) => {
  const { colors } = useSettings();
  const styles = createStyles(colors);

  return <Text style={styles.badge}>{label}</Text>;
};

const createStyles = (colors) => StyleSheet.create({
  badge: {
    backgroundColor: colors.accentMuted,
    borderRadius: RADIUS.full,
    color: colors.accentLight,
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
    letterSpacing: 0.8,
    lineHeight: 16,
    overflow: 'hidden',
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    textTransform: 'uppercase'
  }
});

export default PartOfSpeechBadge;
