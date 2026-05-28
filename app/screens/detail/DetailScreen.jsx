import { useCallback, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../api/axios';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import { COLORS } from '../../constants/colors';
import useFetch from '../../hooks/useFetch';
import { getErrorMessage, showError, showSuccess } from '../../utils/toast';

const unwrapItem = (payload) => payload?.data || payload?.item || payload;
const getItemId = (item) => item?.id || item?._id || item?.uuid;

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

const prettifyKey = (key) =>
  key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());

const DetailScreen = ({ navigation, route }) => {
  const routeItem = route.params?.item;
  const routeItemId = route.params?.itemId || getItemId(routeItem);
  const { data, loading, error, refetch } = useFetch(
    routeItemId ? `/items/${routeItemId}` : null,
    {
      enabled: Boolean(routeItemId),
      initialData: routeItem || null
    }
  );
  const [deleting, setDeleting] = useState(false);

  const item = useMemo(() => unwrapItem(data) || routeItem || {}, [data, routeItem]);
  const itemId = routeItemId || getItemId(item);

  const fields = useMemo(
    () =>
      Object.entries(item).filter(
        ([key]) => !['password', 'token', 'accessToken', 'access_token'].includes(key)
      ),
    [item]
  );

  const navigateToList = useCallback(() => {
    navigation.navigate('ListHome', { refreshAt: Date.now() });
  }, [navigation]);

  const confirmDelete = useCallback(() => {
    if (!itemId) {
      showError('This item cannot be deleted because it has no id.');
      return;
    }

    Alert.alert(
      'Delete item',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              await api.delete(`/items/${itemId}`);
              showSuccess('Item deleted successfully.');
              navigateToList();
            } catch (deleteError) {
              showError(getErrorMessage(deleteError));
            } finally {
              setDeleting(false);
            }
          }
        }
      ],
      { cancelable: true }
    );
  }, [itemId, navigateToList]);

  if (loading && !data) {
    return <Loader fullScreen message="Loading item details..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        {error ? (
          <Card title="Unable to load latest data" icon="alert-circle-outline">
            <ErrorMessage message="Showing available item data. Pull back and try again if needed." />
            <Button mode="outlined" icon="refresh" onPress={refetch} labelStyle={styles.outlineLabel}>
              Retry
            </Button>
          </Card>
        ) : null}

        <Card
          title={item.title || item.name || `Item ${itemId || ''}`.trim()}
          subtitle="Complete item record"
          icon="document-text-outline"
        >
          {fields.map(([key, value], index) => (
            <View key={key}>
              <View style={styles.row}>
                <Text style={styles.label}>{prettifyKey(key)}</Text>
                <Text style={styles.value}>{formatValue(value)}</Text>
              </View>
              {index < fields.length - 1 ? <Divider style={styles.divider} /> : null}
            </View>
          ))}
        </Card>

        <View style={styles.actions}>
          <Button
            icon="pencil"
            onPress={() => navigation.navigate('EditForm', { item, itemId })}
            style={styles.actionButton}
          >
            Edit
          </Button>
          <Button
            icon="trash-can"
            loading={deleting}
            onPress={confirmDelete}
            style={[styles.actionButton, styles.deleteButton]}
          >
            Delete
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    padding: 16,
    paddingBottom: 32
  },
  row: {
    gap: 6,
    paddingVertical: 10
  },
  label: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  value: {
    color: COLORS.text,
    fontSize: 16
  },
  divider: {
    backgroundColor: COLORS.border
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8
  },
  actionButton: {
    flex: 1
  },
  deleteButton: {
    backgroundColor: COLORS.error
  },
  outlineLabel: {
    color: COLORS.primary
  }
});

export default DetailScreen;
