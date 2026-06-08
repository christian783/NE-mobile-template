import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FONTS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const AppHeader = ({
  onBackPress,
  onMenuPress,
  onRightPress,
  rightElement,
  showBack,
  title = 'LexiDict'
}) => {
  const { colors } = useSettings();
  const styles = createStyles(colors);
  const hasRightAction = showBack ? Boolean(onMenuPress) : Boolean(onRightPress);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        accessibilityLabel={showBack ? 'Go back' : 'Open menu'}
        activeOpacity={0.75}
        onPress={showBack ? onBackPress : onMenuPress}
        style={styles.iconButton}
      >
        <Ionicons
          color={colors.accentLight}
          name={showBack ? 'arrow-back' : 'menu'}
          size={24}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {rightElement || (hasRightAction ? (
        <TouchableOpacity
          accessibilityLabel={showBack ? 'Open menu' : 'Search'}
          activeOpacity={0.75}
          onPress={showBack ? onMenuPress : onRightPress}
          style={styles.iconButton}
        >
          <Ionicons
            color={colors.accentLight}
            name={showBack ? 'menu' : 'search'}
            size={22}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      ))}
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.screen
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  title: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: FONTS.display,
    fontSize: 28,
    lineHeight: 36,
    paddingHorizontal: SPACING.md,
    textAlign: 'center'
  }
});

export default AppHeader;
