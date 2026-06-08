import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import AppHeader from '../components/AppHeader';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants';

const WordNotFoundScreen = ({ navigation }) => {
  const openDrawer = () => navigation.getParent()?.openDrawer();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <AppHeader onMenuPress={openDrawer} title="LexiDict" />
      <View style={styles.content}>
        <View style={styles.iconBubble}>
          <Ionicons color={COLORS.errorSoft} name="search" size={40} />
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
          <Ionicons color={COLORS.onAccent} name="refresh" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    height: 90,
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    width: 90
  },
  title: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 36,
    lineHeight: 44,
    marginBottom: SPACING.sm,
    textAlign: 'center'
  },
  message: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.xl,
    maxWidth: 280,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'center',
    minHeight: 56,
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

export default WordNotFoundScreen;
