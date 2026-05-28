import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../api/axios';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { COLORS } from '../../constants/colors';
import { getErrorMessage, showError, showSuccess } from '../../utils/toast';
import { itemSchema } from '../../utils/validators';

const getItemId = (item) => item?.id || item?._id || item?.uuid;

const FormScreen = ({ navigation, route }) => {
  const item = route.params?.item;
  const itemId = route.params?.itemId || getItemId(item);
  const isEditMode = Boolean(itemId);

  const defaultValues = useMemo(
    () => ({
      title: item?.title || item?.name || '',
      amount:
        item?.amount !== undefined && item?.amount !== null
          ? String(item.amount)
          : '',
      description: item?.description || ''
    }),
    [item]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(itemSchema),
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const navigateToList = () => {
    const refreshAt = Date.now();

    navigation.navigate('List', {
      screen: 'ListHome',
      params: { refreshAt }
    });
  };

  const onSubmit = async (values) => {
    const payload = {
      title: values.title.trim(),
      amount: Number(values.amount),
      description: values.description.trim()
    };

    try {
      if (isEditMode) {
        await api.put(`/items/${itemId}`, payload);
        showSuccess('Item updated successfully.');
      } else {
        await api.post('/items', payload);
        showSuccess('Item created successfully.');
        reset({
          title: '',
          amount: '',
          description: ''
        });
      }

      navigateToList();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              {isEditMode ? 'Edit item' : 'Create item'}
            </Text>
            <Text style={styles.subtitle}>
              {isEditMode
                ? 'Update the fields and save your changes.'
                : 'Fill in the fields to add a new record.'}
            </Text>
          </View>

          <Card icon="create-outline" title={isEditMode ? 'Item details' : 'New item'}>
            <Input
              control={control}
              name="title"
              label="Title"
              placeholder="Enter a title"
              autoCapitalize="sentences"
              left={<TextInput.Icon icon="format-title" />}
            />
            <Input
              control={control}
              name="amount"
              label="Amount"
              placeholder="Enter an amount"
              keyboardType="numeric"
              left={<TextInput.Icon icon="cash" />}
            />
            <Input
              control={control}
              name="description"
              label="Description"
              placeholder="Enter a description"
              autoCapitalize="sentences"
              multiline
              left={<TextInput.Icon icon="text-box-outline" />}
            />
            <Button
              icon={isEditMode ? 'content-save' : 'plus'}
              loading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            >
              {isEditMode ? 'Save Changes' : 'Create Item'}
            </Button>
          </Card>
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
    padding: 16,
    paddingBottom: 32
  },
  header: {
    marginBottom: 16
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '800'
  },
  subtitle: {
    color: COLORS.textLight,
    marginTop: 6
  }
});

export default FormScreen;
