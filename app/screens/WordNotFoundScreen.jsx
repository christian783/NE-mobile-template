import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import AppHeader from '../components/AppHeader';
import { FONTS, RADIUS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const WordNotFoundScreen = ({ navigation }) => {
  const openDrawer = () => navigation.getParent()?.openDrawer();
  const { colors, settings } = useSettings();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
      <AppHeader onMenuPress={openDrawer} title="LexiDict" />
      <View style={styles.content}>
        <View style={styles.iconBubble}>
          <Ionicons color={colors.errorSoft} name="search" size={40} />
        </View>
        <Text style={styles.title}>Word Not Found</Text>
        <Text style={styles.message}>
          We could not find a definition for this word. Check the spelling and try again.
        </Text>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Try Again</Text>
          <Ionicons color={colors.onAccent} name="refresh" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.screen
  },
  iconBubble: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    height: 90,
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    width: 90
  },
  title: {
    color: colors.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 36,
    lineHeight: 44,
    marginBottom: SPACING.sm,
    textAlign: 'center'
  },
  message: {
    color: colors.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.xl,
    maxWidth: 280,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: SPACING.lg,
    width: '100%'
  },
  buttonText: {
    color: colors.onAccent,
    fontFamily: FONTS.bodyBold,
    fontSize: 18,
    lineHeight: 24
  }
});

export default WordNotFoundScreen;
