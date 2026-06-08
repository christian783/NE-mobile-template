import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import AppHeader from '../components/AppHeader';
import FavoriteCard from '../components/FavoriteCard';
import { FONTS, SPACING } from '../constants';
import { useFavorites } from '../context/FavoritesContext';
import { useSettings } from '../context/SettingsContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useFavorites();
  const { colors, settings } = useSettings();
  const styles = createStyles(colors);
  const openDrawer = () => navigation.getParent()?.openDrawer();

  const removeEntry = async (word) => {
    await removeFavorite(word);
    Toast.show({
      type: 'success',
      text1: 'Removed from favorites',
      position: 'bottom',
      visibilityTime: 2000
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
      <AppHeader
        onMenuPress={openDrawer}
        onRightPress={() => navigation.navigate('Search')}
        title="LexiDict"
      />
      <FlatList
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons color={colors.inactive} name="bookmark-outline" size={60} />
            <Text style={styles.emptyTitle}>No favorites yet.</Text>
            <Text style={styles.emptySubtitle}>
              Tap the bookmark icon on any word to save it here.
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.title}>My Favorites</Text>
            <Text style={styles.subtitle}>
              Your curated collection of linguistic discoveries.
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.emptyListContent
        ]}
        data={favorites}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <FavoriteCard
            entry={item}
            onBookmarkPress={() => removeEntry(item.word)}
            onPress={() => navigation.navigate('WordDetail', { wordData: item.wordData })}
          />
        )}
        showsVerticalScrollIndicator={false}
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
    listContent: {
      paddingBottom: SPACING.huge
    },
    emptyListContent: {
      flexGrow: 1
    },
    hero: {
      paddingBottom: SPACING.xl,
      paddingHorizontal: SPACING.screen,
      paddingTop: SPACING.lg
    },
    title: {
      color: colors.textPrimary,
      fontFamily: FONTS.display,
      fontSize: 32,
      lineHeight: 40,
      marginBottom: SPACING.sm
    },
    subtitle: {
      color: colors.textSecondary,
      fontFamily: FONTS.body,
      fontSize: 13,
      lineHeight: 20
    },
    emptyState: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: SPACING.screen
    },
    emptyTitle: {
      color: colors.textSecondary,
      fontFamily: FONTS.bodyMed,
      fontSize: 15,
      lineHeight: 22,
      marginTop: SPACING.md,
      textAlign: 'center'
    },
    emptySubtitle: {
      color: colors.textSecondary,
      fontFamily: FONTS.body,
      fontSize: 13,
      lineHeight: 20,
      marginTop: SPACING.xs,
      maxWidth: 260,
      textAlign: 'center'
    }
  });

export default FavoritesScreen;
