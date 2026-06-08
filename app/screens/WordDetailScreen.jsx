import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';

import AppHeader from '../components/AppHeader';
import LoadingDots from '../components/LoadingDots';
import MeaningSection from '../components/MeaningSection';
import WordHeroCard from '../components/WordHeroCard';
import { COLORS, FONTS, SPACING } from '../constants';
import { useDictionary } from '../hooks/useDictionary';

const getPhonetic = (wordData) =>
  wordData?.phonetic || wordData?.phonetics?.[0]?.text || '';

const getAudioUrl = (wordData) => {
  const phonetics = Array.isArray(wordData?.phonetics) ? wordData.phonetics : [];
  const audioEntry = phonetics.find(
    (item) => typeof item.audio === 'string' && item.audio.trim()
  );

  return audioEntry?.audio || null;
};

const WordDetailScreen = ({ navigation, route }) => {
  const [detailData, setDetailData] = useState(route.params?.wordData || null);
  const { loading, search } = useDictionary();
  const word = route.params?.word;
  const openDrawer = () => navigation.getParent()?.openDrawer();

  useEffect(() => {
    let mounted = true;

    const searchHistoryWord = async () => {
      if (!word || detailData) {
        return;
      }

      const result = await search(word);

      if (!mounted) {
        return;
      }

      if (result.wordData) {
        setDetailData(result.wordData);
        return;
      }

      if (result.errorType === 'WORD_NOT_FOUND') {
        navigation.replace('NotFound');
      } else if (result.errorType === 'NETWORK_ERROR') {
        navigation.replace('NetworkError');
      }
    };

    searchHistoryWord().catch((error) => console.error('History search failed', error));

    return () => {
      mounted = false;
    };
  }, [detailData, navigation, search, word]);

  const meanings = useMemo(
    () => (Array.isArray(detailData?.meanings) ? detailData.meanings : []),
    [detailData]
  );

  if (loading || !detailData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <AppHeader
          onBackPress={() => navigation.goBack()}
          onMenuPress={openDrawer}
          showBack
          title={word || 'LexiDict'}
        />
        <View style={styles.loading}>
          <LoadingDots />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <AppHeader
        onBackPress={() => navigation.goBack()}
        onMenuPress={openDrawer}
        showBack
        title={detailData.word || 'LexiDict'}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <WordHeroCard
          audioUrl={getAudioUrl(detailData)}
          phonetic={getPhonetic(detailData)}
          word={detailData.word}
        />
        {meanings.length ? (
          meanings.map((meaning, index) => (
            <MeaningSection key={`${meaning.partOfSpeech}-${index}`} meaning={meaning} />
          ))
        ) : (
          <Text style={styles.emptyText}>No definitions are available for this word.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1
  },
  scrollContent: {
    paddingBottom: SPACING.huge,
    paddingHorizontal: SPACING.screen,
    paddingTop: SPACING.sm
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  }
});

export default WordDetailScreen;
