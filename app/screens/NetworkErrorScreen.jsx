import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { COLORS, FONTS, RADIUS, SPACING } from '../constants';

const NetworkErrorScreen = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar style="light" />
    <View style={styles.card}>
      <View style={styles.iconBubble}>
        <Ionicons color={COLORS.errorSoft} name="wifi-outline" size={42} />
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
        <Ionicons color={COLORS.onAccent} name="refresh" size={20} />
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.screen
  },
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.surfaceDeep,
    borderColor: COLORS.outlineVariant,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 520,
    paddingHorizontal: SPACING.screen,
    width: '100%'
  },
  iconBubble: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    height: 90,
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    width: 90
  },
  title: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.bodyBold,
    fontSize: 20,
    lineHeight: 28,
    marginBottom: SPACING.sm,
    textAlign: 'center'
  },
  message: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.huge,
    maxWidth: 280,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.accentContainer,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: SPACING.lg,
    width: '100%'
  },
  buttonText: {
    color: COLORS.onAccent,
    fontFamily: FONTS.bodyBold,
    fontSize: 18,
    lineHeight: 24
  }
});

export default NetworkErrorScreen;
