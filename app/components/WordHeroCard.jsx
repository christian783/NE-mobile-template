import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { COLORS, FONTS, RADIUS, SPACING } from '../constants';
import { useAudioPlayer } from '../services/audioService';

const WordHeroCard = ({ word, phonetic, audioUrl }) => {
  const [pulse] = useState(() => new Animated.Value(1));
  const { isPlaying, play } = useAudioPlayer();

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
              color={audioUrl ? COLORS.accentLight : COLORS.inactive}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
    padding: SPACING.lg
  },
  glow: {
    backgroundColor: COLORS.accentMuted,
    borderRadius: 80,
    height: 120,
    opacity: 0.32,
    position: 'absolute',
    right: -50,
    top: -50,
    width: 120
  },
  word: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 48,
    lineHeight: 56,
    marginBottom: SPACING.sm
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md
  },
  phonetic: {
    backgroundColor: 'rgba(167, 139, 250, 0.10)',
    borderColor: 'rgba(167, 139, 250, 0.20)',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    color: COLORS.violet,
    fontFamily: FONTS.mono,
    fontSize: 14,
    lineHeight: 20,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  audioButton: {
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: RADIUS.full,
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  audioButtonDisabled: {
    opacity: 0.75
  },
  playing: {
    color: COLORS.accentLight,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20
  }
});

export default WordHeroCard;
