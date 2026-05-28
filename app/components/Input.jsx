import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { COLORS } from '../constants/colors';
import ErrorMessage from './ErrorMessage';

const Input = ({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  autoCapitalize = 'none',
  left,
  right,
  style,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            mode="outlined"
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            autoCapitalize={autoCapitalize}
            error={Boolean(error)}
            left={left}
            right={right}
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
            style={[styles.input, multiline && styles.multiline, style]}
            {...props}
          />
          <ErrorMessage message={error?.message} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  input: {
    backgroundColor: COLORS.surface
  },
  multiline: {
    minHeight: 108
  }
});

export default Input;
