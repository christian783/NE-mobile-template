import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { FONTS, RADIUS, SPACING } from '../constants';
import { useSettings } from '../context/SettingsContext';
import { useAudioPlayer } from '../services/audioService';

const WordHeroCard = ({ word, phonetic, audioUrl }) => {
  const [pulse] = useState(() => new Animated.Value(1));
  const { isPlaying, play } = useAudioPlayer();
  const { colors, fontSizes } = useSettings();
  const styles = createStyles(colors, fontSizes);

  useEffect(() => {
    if (!isPlaying) {
      pulse.stopAnimation();
      pulse.setValue(1);
      return undefined;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 600,
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [isPlaying, pulse]);

  const handlePlay = async () => {
    try {
      await play(audioUrl);
    } catch (error) {
      console.error('Audio playback failed', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.glow} />
      <Text style={styles.word}>{word}</Text>
      <View style={styles.meta}>
        {phonetic ? <Text style={styles.phonetic}>{phonetic}</Text> : null}
        <TouchableOpacity
          accessibilityLabel="Play pronunciation audio"
          activeOpacity={0.75}
          disabled={!audioUrl}
          onPress={handlePlay}
          style={[styles.audioButton, !audioUrl && styles.audioButtonDisabled]}
        >
          <Animated.View style={{ opacity: pulse }}>
            <Ionicons
              color={audioUrl ? colors.accentLight : colors.inactive}
              name="volume-high"
              size={22}
            />
          </Animated.View>
        </TouchableOpacity>
        {isPlaying ? <Text style={styles.playing}>Playing...</Text> : null}
      </View>
    </View>
  );
};

const createStyles = (colors, fontSizes) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
    padding: SPACING.lg
  },
  glow: {
    backgroundColor: colors.accentMuted,
    borderRadius: 80,
    height: 120,
    opacity: 0.32,
    position: 'absolute',
    right: -50,
    top: -50,
    width: 120
  },
  word: {
    color: colors.textPrimary,
    fontFamily: FONTS.display,
    fontSize: fontSizes.word,
    lineHeight: fontSizes.word + 8,
    marginBottom: SPACING.sm
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md
  },
  phonetic: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.border,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    color: colors.violet,
    fontFamily: FONTS.mono,
    fontSize: fontSizes.phonetic,
    lineHeight: fontSizes.phonetic + 6,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  audioButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: RADIUS.full,
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  audioButtonDisabled: {
    opacity: 0.75
  },
  playing: {
    color: colors.accentLight,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  }
});

export default WordHeroCard;
