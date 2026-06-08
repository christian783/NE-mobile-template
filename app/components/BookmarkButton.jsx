import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

import { RADIUS } from '../constants';
import { useFavorites } from '../context/FavoritesContext';
import { useSettings } from '../context/SettingsContext';

const BookmarkButton = ({ word, wordData }) => {
  const [scale] = useState(() => new Animated.Value(1));
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const { colors } = useSettings();
  const favorited = isFavorite(word);
  const styles = createStyles();

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 75,
        useNativeDriver: true
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 75,
        useNativeDriver: true
      })
    ]).start();
  };

  const handlePress = async () => {
    try {
      animatePress();

      if (favorited) {
        await removeFavorite(word);
        Toast.show({
          type: 'success',
          text1: 'Removed from favorites',
          position: 'bottom',
          visibilityTime: 2000
        });
        return;
      }

      await addFavorite(wordData);
      Toast.show({
        type: 'success',
        text1: 'Added to favorites',
        position: 'bottom',
        visibilityTime: 2000
      });
    } catch (error) {
      console.error('Failed to toggle favorite', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom'
      });
    }
  };

  return (
    <TouchableOpacity
      accessibilityLabel={favorited ? 'Remove from favorites' : 'Add to favorites'}
      activeOpacity={0.75}
      onPress={handlePress}
      style={styles.button}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          color={favorited ? colors.accent : colors.inactive}
          name={favorited ? 'bookmark' : 'bookmark-outline'}
          size={24}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const createStyles = () =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: RADIUS.full,
      height: 40,
      justifyContent: 'center',
      width: 40
    }
  });

export default BookmarkButton;
