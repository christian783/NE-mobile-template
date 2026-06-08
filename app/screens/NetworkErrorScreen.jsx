import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { FONTS, RADIUS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const NetworkErrorScreen = ({ navigation }) => {
  const { colors, settings } = useSettings();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
      <View style={styles.card}>
        <View style={styles.iconBubble}>
          <Ionicons color={colors.errorSoft} name="wifi-outline" size={42} />
        </View>
        <Text style={styles.title}>Network Error</Text>
        <Text style={styles.message}>
          No internet connection. Please check your network and try again.
        </Text>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Ionicons color={colors.onAccent} name="refresh" size={20} />
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.screen
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surfaceDeep,
    borderColor: colors.outlineVariant,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 520,
    paddingHorizontal: SPACING.screen,
    width: '100%'
  },
  iconBubble: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    height: 90,
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    width: 90
  },
  title: {
    color: colors.textPrimary,
    fontFamily: FONTS.bodyBold,
    fontSize: 20,
    lineHeight: 28,
    marginBottom: SPACING.sm,
    textAlign: 'center'
  },
  message: {
    color: colors.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.huge,
    maxWidth: 280,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.accentContainer,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'center',
    minHeight: 48,
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

export default NetworkErrorScreen;
