import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import { COLORS } from '../constants/colors';

const Button = ({
  children,
  mode = 'contained',
  icon,
  loading = false,
  disabled = false,
  style,
  contentStyle,
  labelStyle,
  ...props
}) => {
  return (
    <PaperButton
      mode={mode}
      icon={icon}
      loading={loading}
      disabled={disabled || loading}
      style={[styles.button, style]}
      contentStyle={[styles.content, contentStyle]}
      labelStyle={[styles.label, labelStyle]}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8
  },
  content: {
    minHeight: 48
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.surface
  }
});

export default Button;
