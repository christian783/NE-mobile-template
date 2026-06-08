import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FONTS, SPACING } from '../constants';
import { useHistory } from '../context/HistoryContext';
import { useSettings } from '../context/SettingsContext';

const logo = require('../../assets/logo.png');

const DrawerContent = ({ navigation }) => {
  const { history } = useHistory();
  const { colors } = useSettings();
  const styles = createStyles(colors);

  const openStackScreen = (screen) => {
    navigation.closeDrawer();
    navigation.navigate('Main', { screen });
  };

  const openHistoryWord = (word) => {
    navigation.closeDrawer();
    navigation.navigate('Main', {
      screen: 'WordDetail',
      params: { word }
    });
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => openHistoryWord(item)}
      style={styles.historyItem}
    >
      <View style={styles.historyItemLeft}>
        <Ionicons color={colors.textSecondary} name="time-outline" size={18} />
        <Text numberOfLines={1} style={styles.historyWord}>
          {item}
        </Text>
      </View>
      <Ionicons color={colors.inactive} name="chevron-forward" size={18} />
    </TouchableOpacity>
  );

  const renderNavItem = (icon, label, screen) => (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => openStackScreen(screen)}
      style={styles.navItem}
    >
      <View style={styles.historyItemLeft}>
        <Ionicons color={colors.textSecondary} name={icon} size={19} />
        <Text style={styles.navLabel}>{label}</Text>
      </View>
      <Ionicons color={colors.inactive} name="chevron-forward" size={18} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image resizeMode="contain" source={logo} style={styles.logo} />
        <View>
          <Text style={styles.title}>LexiDict</Text>
          <Text style={styles.subtitle}>Premium Lexicon</Text>
        </View>
      </View>

      <View style={styles.navBlock}>
        {renderNavItem('bookmark-outline', 'My Favorites', 'Favorites')}
        {renderNavItem('settings-outline', 'Settings', 'Settings')}
      </View>

      <View style={styles.labelBlock}>
        <Text style={styles.label}>Search History</Text>
        <View style={styles.divider} />
      </View>

      {history.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={history}
          keyExtractor={(item) => item}
          renderItem={renderHistoryItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons color={colors.textSecondary} name="search" size={48} />
          <Text style={styles.emptyText}>
            No searches yet. Start exploring words!
          </Text>
        </View>
      )}

      <Text style={styles.footer}>LexiDict v1.0.0</Text>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainer,
    flex: 1,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.lg
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.screen
  },
  logo: {
    height: 48,
    width: 48
  },
  title: {
    color: colors.accentLight,
    fontFamily: FONTS.bodyBold,
    fontSize: 20,
    lineHeight: 28
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  },
  navBlock: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.sm
  },
  navItem: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12
  },
  navLabel: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: FONTS.bodyMed,
    fontSize: 15,
    lineHeight: 22
  },
  labelBlock: {
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.screen
  },
  label: {
    color: colors.outline,
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
    letterSpacing: 0.8,
    lineHeight: 16,
    textTransform: 'uppercase'
  },
  divider: {
    backgroundColor: colors.outlineVariant,
    height: StyleSheet.hairlineWidth,
    marginTop: SPACING.sm
  },
  listContent: {
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.xs
  },
  historyItem: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12
  },
  historyItemLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: SPACING.sm
  },
  historyWord: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: FONTS.bodyMed,
    fontSize: 15,
    lineHeight: 22
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.screen
  },
  emptyText: {
    color: colors.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    marginTop: SPACING.md,
    maxWidth: 200,
    textAlign: 'center'
  },
  footer: {
    color: colors.inactive,
    fontFamily: FONTS.body,
    fontSize: 11,
    lineHeight: 16,
    paddingHorizontal: SPACING.screen
  }
});

export default DrawerContent;
