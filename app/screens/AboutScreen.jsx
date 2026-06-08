import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AppHeader from '../components/AppHeader';
import { FONTS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';

const logo = require('../../assets/logo.png');

const AboutScreen = ({ navigation }) => {
  const { colors, settings } = useSettings();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
      <AppHeader
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.getParent()?.openDrawer()}
        showBack
        title="LexiDict"
      />
      <View style={styles.content}>
        <Image resizeMode="contain" source={logo} style={styles.logo} />
        <Text style={styles.title}>LexiDict</Text>
        <Text style={styles.version}>Version 2.4.1</Text>
        <View style={styles.divider} />
        <Text style={styles.paragraph}>
          LexiDict is a free dictionary app built to help you explore the richness
          of the English language. Powered by the Free Dictionary API.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.madeWith}>Made with heart for word lovers.</Text>
      </View>
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
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: SPACING.xl
    },
    logo: {
      height: 80,
      marginBottom: SPACING.md,
      width: 80
    },
    title: {
      color: colors.textPrimary,
      fontFamily: FONTS.display,
      fontSize: 28,
      lineHeight: 36
    },
    version: {
      color: colors.textSecondary,
      fontFamily: FONTS.body,
      fontSize: 14,
      lineHeight: 20,
      marginTop: SPACING.xs
    },
    divider: {
      backgroundColor: colors.border,
      height: StyleSheet.hairlineWidth,
      marginVertical: SPACING.lg,
      width: '100%'
    },
    paragraph: {
      color: colors.textSecondary,
      fontFamily: FONTS.body,
      fontSize: 14,
      lineHeight: 25,
      textAlign: 'center'
    },
    madeWith: {
      color: colors.textSecondary,
      fontFamily: FONTS.body,
      fontSize: 13,
      lineHeight: 20,
      textAlign: 'center'
    }
  });

export default AboutScreen;
