import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

import AppHeader from '../components/AppHeader';
import FontSizeModal from '../components/FontSizeModal';
import SectionHeader from '../components/SectionHeader';
import SettingsRow from '../components/SettingsRow';
import { FONTS, RADIUS, SPACING } from '../constants';
import { useHistory } from '../context/HistoryContext';
import { useSettings } from '../context/SettingsContext';

const formatFontSize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const SettingsScreen = ({ navigation }) => {
  const [fontSizeModalVisible, setFontSizeModalVisible] = useState(false);
  const { clearHistory } = useHistory();
  const { colors, settings, setFontSize, toggleDarkMode } = useSettings();
  const styles = createStyles(colors);

  const confirmClearHistory = () => {
    Alert.alert(
      'Clear History',
      'This will permanently delete all your search history.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            Toast.show({
              type: 'success',
              text1: 'History cleared',
              position: 'bottom',
              visibilityTime: 2000
            });
          }
        }
      ]
    );
  };

  const openPrivacyPolicy = async () => {
    try {
      await Linking.openURL('https://lexidict.app/privacy');
    } catch (error) {
      console.error('Failed to open privacy policy', error);
      Alert.alert('Could not open link. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
      <AppHeader
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.getParent()?.openDrawer()}
        showBack
        title="LexiDict"
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>

        <SectionHeader label="PREFERENCES" />
        <View style={styles.section}>
          <SettingsRow
            icon="moon-outline"
            iconColor={colors.textSecondary}
            label="Dark Mode"
            onPress={toggleDarkMode}
            rightElement={
              <Switch
                onValueChange={toggleDarkMode}
                thumbColor={colors.textPrimary}
                trackColor={{ false: colors.border, true: colors.accent }}
                value={settings.darkMode}
              />
            }
          />
          <SettingsRow
            icon="text-outline"
            iconColor={colors.textSecondary}
            label="Font Size"
            onPress={() => setFontSizeModalVisible(true)}
            rightLabel={formatFontSize(settings.fontSize)}
            showBorder={false}
          />
        </View>

        <SectionHeader label="DATA & PRIVACY" />
        <View style={styles.section}>
          <SettingsRow
            danger
            icon="trash-outline"
            iconColor={colors.error}
            label="Clear Search History"
            onPress={confirmClearHistory}
            showBorder={false}
          />
        </View>

        <SectionHeader label="ABOUT" />
        <View style={styles.section}>
          <SettingsRow
            icon="information-circle-outline"
            iconColor={colors.textSecondary}
            label="About LexiDict"
            onPress={() => navigation.navigate('About')}
            rightLabel="v2.4.1"
          />
          <SettingsRow
            icon="shield-outline"
            iconColor={colors.textSecondary}
            label="Privacy Policy"
            onPress={openPrivacyPolicy}
            showBorder={false}
          />
        </View>
      </ScrollView>
      <FontSizeModal
        current={settings.fontSize}
        onClose={() => setFontSizeModalVisible(false)}
        onSelect={(size) => {
          setFontSize(size);
          setFontSizeModalVisible(false);
        }}
        visible={fontSizeModalVisible}
      />
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
      flex: 1
    },
    content: {
      paddingBottom: SPACING.huge,
      paddingHorizontal: SPACING.screen
    },
    title: {
      color: colors.textPrimary,
      fontFamily: FONTS.display,
      fontSize: 32,
      lineHeight: 40,
      marginBottom: SPACING.sm,
      marginTop: SPACING.sm
    },
    section: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: RADIUS.md,
      borderWidth: 1,
      overflow: 'hidden'
    }
  });

export default SettingsScreen;
