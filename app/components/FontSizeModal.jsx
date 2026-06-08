import { Modal, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FONTS, RADIUS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const OPTIONS = ['small', 'medium', 'large'];

const formatLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const FontSizeModal = ({ current, onClose, onSelect, visible }) => {
  const { colors } = useSettings();
  const styles = createStyles(colors);

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <Text style={styles.title}>Font Size</Text>
          {OPTIONS.map((size) => {
            const selected = current === size;

            return (
              <TouchableOpacity
                activeOpacity={0.75}
                key={size}
                onPress={() => onSelect(size)}
                style={[styles.option, selected && styles.optionSelected]}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                  {formatLabel(size)}
                </Text>
                {selected ? (
                  <Ionicons color={colors.accent} name="checkmark" size={20} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    backdrop: {
      backgroundColor: colors.overlay,
      flex: 1,
      justifyContent: 'flex-end'
    },
    sheet: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: SPACING.lg
    },
    title: {
      color: colors.textPrimary,
      fontFamily: FONTS.display,
      fontSize: 18,
      lineHeight: 26,
      marginBottom: SPACING.md
    },
    option: {
      alignItems: 'center',
      borderRadius: RADIUS.sm,
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 48,
      paddingHorizontal: SPACING.md
    },
    optionSelected: {
      backgroundColor: colors.accentMuted
    },
    optionText: {
      color: colors.textPrimary,
      fontFamily: FONTS.body,
      fontSize: 15,
      lineHeight: 22
    },
    optionTextSelected: {
      color: colors.accent,
      fontFamily: FONTS.bodyMed
    }
  });

export default FontSizeModal;
