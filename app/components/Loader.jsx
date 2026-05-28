import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { COLORS } from '../constants/colors';

const Loader = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator animating color={COLORS.primary} size="large" />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  message: {
    color: COLORS.textLight,
    marginTop: 12
  }
});

export default Loader;
