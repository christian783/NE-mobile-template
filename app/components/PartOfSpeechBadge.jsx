import { StyleSheet, Text } from 'react-native';

import { COLORS, FONTS, RADIUS, SPACING } from '../constants';

const PartOfSpeechBadge = ({ label }) => (
  <Text style={styles.badge}>{label}</Text>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.accentMuted,
    borderRadius: RADIUS.full,
    color: COLORS.accentLight,
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
