import { StyleSheet, Text } from 'react-native';

import { FONTS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const SectionHeader = ({ label }) => {
  const { colors } = useSettings();
  const styles = createStyles(colors);

  return <Text style={styles.label}>{label}</Text>;
};

const createStyles = (colors) =>
  StyleSheet.create({
    label: {
      color: colors.textSecondary,
      fontFamily: FONTS.bodyMed,
      fontSize: 11,
      letterSpacing: 0.8,
      lineHeight: 16,
      paddingBottom: 6,
      paddingHorizontal: SPACING.md,
      paddingTop: 20,
      textTransform: 'uppercase'
    }
  });

export default SectionHeader;
