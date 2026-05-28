import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { COLORS } from '../../constants/colors';
import useAuth from '../../hooks/useAuth';
import { getErrorMessage, showError, showSuccess } from '../../utils/toast';
import { registerSchema } from '../../utils/validators';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async ({ username, password }) => {
    try {
      await register({ username, password });
      showSuccess('Account created successfully. You can now sign in.');
      navigation.navigate('Login');
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Set up your login details.</Text>
          </View>

          <View style={styles.form}>
            <Input
              control={control}
              name="username"
              label="Username"
              placeholder="Choose a username"
              left={<TextInput.Icon icon="account-outline" />}
            />
            <Input
              control={control}
              name="password"
              label="Password"
              placeholder="Create a password"
              secureTextEntry
              left={<TextInput.Icon icon="lock-outline" />}
            />
            <Input
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Repeat your password"
              secureTextEntry
              left={<TextInput.Icon icon="lock-check-outline" />}
            />
            <Button
              icon="account-plus"
              loading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            >
              Register
            </Button>
            <Button
              mode="text"
              disabled={isSubmitting}
              onPress={() => navigation.navigate('Login')}
              labelStyle={styles.textButtonLabel}
            >
              Back to sign in
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  keyboardView: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24
  },
  header: {
    marginBottom: 28
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800'
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: 16,
    marginTop: 8
  },
  form: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18
  },
  submitButton: {
    marginTop: 4
  },
  textButtonLabel: {
    color: COLORS.primary
  }
});

export default RegisterScreen;
