import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FONTS, RADIUS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const FavoriteCard = ({ entry, onPress, onBookmarkPress }) => {
  const { colors } = useSettings();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={styles.card}>
      <View style={styles.copy}>
        <Text numberOfLines={1} style={styles.word}>
          {entry.word}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.definition}>
          {entry.firstDefinition}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          accessibilityLabel="Remove from favorites"
          activeOpacity={0.75}
          onPress={onBookmarkPress}
          style={styles.bookmarkButton}
        >
          <Ionicons color={colors.accent} name="bookmark" size={22} />
        </TouchableOpacity>
        <Ionicons color={colors.inactive} name="chevron-forward" size={18} />
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    card: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: RADIUS.sm,
      borderWidth: 1,
      flexDirection: 'row',
      gap: SPACING.md,
      marginBottom: 10,
      marginHorizontal: SPACING.md,
      padding: SPACING.md
    },
    copy: {
      flex: 1
    },
    word: {
      color: colors.textPrimary,
      fontFamily: FONTS.display,
      fontSize: 20,
      lineHeight: 28,
      marginBottom: SPACING.xs
    },
    definition: {
      color: colors.textSecondary,
      fontFamily: FONTS.body,
      fontSize: 13,
      lineHeight: 19
    },
    actions: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: SPACING.sm
    },
    bookmarkButton: {
      alignItems: 'center',
      borderRadius: RADIUS.full,
      height: 38,
      justifyContent: 'center',
      width: 38
    }
  });

export default FavoriteCard;
