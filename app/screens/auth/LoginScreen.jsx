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
import { getErrorMessage, showError } from '../../utils/toast';
import { loginSchema } from '../../utils/validators';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = async ({ username, password }) => {
    try {
      await login(username, password);
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
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue.</Text>
          </View>

          <View style={styles.form}>
            <Input
              control={control}
              name="username"
              label="Username"
              placeholder="Enter your username"
              left={<TextInput.Icon icon="account-outline" />}
            />
            <Input
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              left={<TextInput.Icon icon="lock-outline" />}
            />
            <Button
              icon="login"
              loading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            >
              Sign In
            </Button>
            <Button
              mode="text"
              disabled={isSubmitting}
              onPress={() => navigation.navigate('Register')}
              labelStyle={styles.textButtonLabel}
            >
              Create an account
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

export default LoginScreen;
