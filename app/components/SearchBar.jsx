import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FONTS, RADIUS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const SearchBar = ({ value, onChangeText, onSubmit, error, loading }) => {
  const { colors } = useSettings();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, error && styles.containerError]}>
      <Ionicons color={colors.accentLight} name="search" size={20} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        keyboardAppearance="dark"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Search a word..."
        placeholderTextColor={colors.outline}
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
      <TouchableOpacity
        accessibilityLabel="Search"
        activeOpacity={0.75}
        disabled={loading}
        onPress={onSubmit}
        style={[styles.button, loading && styles.buttonDisabled]}
      >
        <Ionicons color={colors.onAccent} name="arrow-forward" size={18} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 52,
    paddingLeft: SPACING.md,
    paddingRight: 6
  },
  containerError: {
    borderColor: colors.error
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: FONTS.mono,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    borderRadius: RADIUS.full,
    height: 36,
    justifyContent: 'center',
    width: 36
  },
  buttonDisabled: {
    opacity: 0.5
  }
});

export default SearchBar;
