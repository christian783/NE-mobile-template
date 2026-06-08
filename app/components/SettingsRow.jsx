import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FONTS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const SettingsRow = ({
  danger,
  icon,
  iconColor,
  label,
  onPress,
  rightElement,
  rightLabel,
  showBorder = true
}) => {
  const { colors } = useSettings();
  const styles = createStyles(colors, danger, showBorder);

  return (
    <TouchableOpacity activeOpacity={0.75} disabled={!onPress} onPress={onPress} style={styles.row}>
      <View style={styles.left}>
        <Ionicons color={iconColor || colors.textSecondary} name={icon} size={20} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.right}>
        {rightLabel ? <Text style={styles.rightLabel}>{rightLabel}</Text> : null}
        {rightElement || <Ionicons color={colors.inactive} name="chevron-forward" size={18} />}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors, danger, showBorder) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
      borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
      flexDirection: 'row',
      height: 54,
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.md
    },
    left: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      gap: SPACING.md
    },
    label: {
      color: danger ? colors.error : colors.textPrimary,
      fontFamily: FONTS.body,
      fontSize: 15,
      lineHeight: 22
    },
    right: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: SPACING.xs
    },
    rightLabel: {
      color: colors.textSecondary,
      fontFamily: FONTS.body,
      fontSize: 14,
      lineHeight: 20
    }
  });

export default SettingsRow;
