import { StyleSheet } from 'react-native';
import { HelperText } from 'react-native-paper';

import { COLORS } from '../constants/colors';

const ErrorMessage = ({ message, visible = Boolean(message), style }) => {
  if (!visible) {
    return null;
  }

  return (
    <HelperText type="error" visible={visible} style={[styles.text, style]}>
      {message}
    </HelperText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.error,
    paddingHorizontal: 0
  }
});

export default ErrorMessage;
