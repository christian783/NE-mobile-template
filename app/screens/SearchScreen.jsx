import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import AppHeader from '../components/AppHeader';
import ErrorMessage from '../components/ErrorMessage';
import LoadingDots from '../components/LoadingDots';
import SearchBar from '../components/SearchBar';
import { COLORS, FONTS, SPACING } from '../constants';
import { useDictionary } from '../hooks/useDictionary';

const SearchScreen = ({ navigation }) => {
  const quote = '"The dictionary is the universe in alphabetical order."';
  const [query, setQuery] = useState('');
  const { loading, error, search } = useDictionary();

  const openDrawer = () => navigation.getParent()?.openDrawer();

  const handleSearch = async () => {
    const result = await search(query);

    if (result.wordData) {
      navigation.navigate('WordDetail', { wordData: result.wordData });
      return;
    }

    if (result.errorType === 'WORD_NOT_FOUND') {
      navigation.navigate('NotFound');
    }

    if (result.errorType === 'NETWORK_ERROR') {
      navigation.navigate('NetworkError');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <AppHeader onMenuPress={openDrawer} title="LexiDict" />
        <View style={styles.content}>
          <View style={styles.main}>
            {!loading ? (
              <View style={styles.quoteBlock}>
                <Text style={styles.quote}>{quote}</Text>
                <Text style={styles.subtitle}>
                  Search any English word to explore its meaning.
                </Text>
              </View>
            ) : null}

            <View style={styles.searchCluster}>
              <SearchBar
                error={Boolean(error)}
                loading={loading}
                onChangeText={setQuery}
                onSubmit={handleSearch}
                value={query}
              />
              <ErrorMessage message={!loading ? error : null} />
            </View>

            {loading ? (
              <View style={styles.loading}>
                <LoadingDots />
              </View>
            ) : null}
          </View>

          <View style={styles.hint}>
            <Ionicons color={COLORS.textSecondary} name="information-circle-outline" size={14} />
            <Text style={styles.hintText}>Tap the menu to revisit past searches</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1
  },
  keyboard: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.screen
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  quoteBlock: {
    borderLeftColor: COLORS.accentLight,
    borderLeftWidth: 4,
    marginBottom: SPACING.huge,
    paddingLeft: SPACING.sm
  },
  quote: {
    color: COLORS.outlineVariant,
    fontFamily: FONTS.displayIt,
    fontSize: 32,
    lineHeight: 40
  },
  subtitle: {
    color: COLORS.textTertiary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    marginTop: SPACING.sm
  },
  searchCluster: {
    width: '100%'
  },
  loading: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 108
  },
  hint: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.xs,
    justifyContent: 'center'
  },
  hintText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 12,
    lineHeight: 18
  }
});

export default SearchScreen;
