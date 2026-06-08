import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, SPACING } from '../constants';

const AppHeader = ({ title = 'LexiDict', onMenuPress, onBackPress, showBack }) => (
  <View style={styles.header}>
    <TouchableOpacity
      accessibilityLabel={showBack ? 'Go back' : 'Open menu'}
      activeOpacity={0.75}
      onPress={showBack ? onBackPress : onMenuPress}
      style={styles.iconButton}
    >
      <Ionicons
        color={COLORS.accentLight}
        name={showBack ? 'arrow-back' : 'menu'}
        size={24}
      />
    </TouchableOpacity>
    <Text numberOfLines={1} style={styles.title}>
      {title}
    </Text>
    <TouchableOpacity
      accessibilityLabel={showBack ? 'Open menu' : 'Search'}
      activeOpacity={0.75}
      onPress={showBack ? onMenuPress : undefined}
      style={styles.iconButton}
    >
      <Ionicons
        color={COLORS.accentLight}
        name={showBack ? 'menu' : 'search'}
        size={22}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
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
    color: COLORS.textPrimary,
    flex: 1,
    fontFamily: FONTS.display,
    fontSize: 28,
    lineHeight: 36,
    paddingHorizontal: SPACING.md,
    textAlign: 'center'
  }
});

export default AppHeader;
