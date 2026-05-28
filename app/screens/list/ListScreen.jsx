import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../api/axios';
import Button from '../../components/Button';
import Card from '../../components/Card';
import EmptyState from '../../components/EmptyState';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import { COLORS } from '../../constants/colors';
import useFetch from '../../hooks/useFetch';
import { getErrorMessage, showError, showSuccess } from '../../utils/toast';

const PAGE_SIZE = 20;

const buildItemsUrl = (page) => `/items?page=${page}&limit=${PAGE_SIZE}`;

const getItemsFromResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
};

const getHasMoreFromResponse = (payload, receivedCount, currentPage) => {
  const meta = payload?.meta || payload?.pagination || {};
  const explicitHasMore = payload?.hasMore ?? meta.hasMore;
  const total = payload?.total ?? meta.total ?? payload?.count ?? meta.count;
  const nextPage = payload?.nextPage ?? meta.nextPage;

  if (typeof explicitHasMore === 'boolean') {
    return explicitHasMore;
  }

  if (nextPage) {
    return true;
  }

  if (typeof total === 'number') {
    return currentPage * PAGE_SIZE < total;
  }

  return receivedCount === PAGE_SIZE;
};

const mergeUniqueItems = (currentItems, nextItems) => {
  const seen = new Set(currentItems.map((item) => getItemId(item)).filter(Boolean));
  const mergedItems = [...currentItems];

  nextItems.forEach((item) => {
    const itemId = getItemId(item);

    if (!itemId || !seen.has(itemId)) {
      mergedItems.push(item);
    }

    if (itemId) {
      seen.add(itemId);
    }
  });

  return mergedItems;
};

const getItemId = (item) => item?.id || item?._id || item?.uuid;

const ListScreen = ({ navigation, route }) => {
  const { data, loading, error, refetch } = useFetch(buildItemsUrl(1));
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (data) {
      const firstPageItems = getItemsFromResponse(data);
      setItems(firstPageItems);
      setPage(1);
      setHasMore(getHasMoreFromResponse(data, firstPageItems.length, 1));
    }
  }, [data]);

  const refreshFirstPage = useCallback(async () => {
    const payload = await refetch();
    const firstPageItems = getItemsFromResponse(payload);

    setItems(firstPageItems);
    setPage(1);
    setHasMore(getHasMoreFromResponse(payload, firstPageItems.length, 1));
  }, [refetch]);

  useEffect(() => {
    if (route.params?.refreshAt) {
      refreshFirstPage();
    }
  }, [refreshFirstPage, route.params?.refreshAt]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshFirstPage();
    setRefreshing(false);
  }, [refreshFirstPage]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || refreshing || !hasMore) {
      return;
    }

    const nextPage = page + 1;

    try {
      setLoadingMore(true);
      const response = await api.get(buildItemsUrl(nextPage));
      const nextItems = getItemsFromResponse(response.data);

      setItems((currentItems) => mergeUniqueItems(currentItems, nextItems));
      setPage(nextPage);
      setHasMore(getHasMoreFromResponse(response.data, nextItems.length, nextPage));
    } catch (loadError) {
      showError(getErrorMessage(loadError));
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loading, loadingMore, page, refreshing]);

  const confirmDelete = useCallback(
    (item) => {
      const itemId = getItemId(item);

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
                setDeletingId(itemId);
                await api.delete(`/items/${itemId}`);
                showSuccess('Item deleted successfully.');
                await refreshFirstPage();
              } catch (deleteError) {
                showError(getErrorMessage(deleteError));
              } finally {
                setDeletingId(null);
              }
            }
          }
        ],
        { cancelable: true }
      );
    },
    [refreshFirstPage]
  );

  const renderRightActions = useCallback(
    (item) => (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.deleteAction}
        onPress={() => confirmDelete(item)}
        disabled={deletingId === getItemId(item)}
      >
        {deletingId === getItemId(item) ? (
          <Loader message="" />
        ) : (
          <Ionicons name="trash-outline" size={24} color={COLORS.surface} />
        )}
      </TouchableOpacity>
    ),
    [confirmDelete, deletingId]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const itemId = getItemId(item);
      const title = item.title || item.name || `Item ${itemId}`;
      const amount = item.amount || item.total || item.value;

      return (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
          <Card
            title={title}
            subtitle={item.description || item.status || 'Tap to view details'}
            icon="document-text-outline"
            onPress={() => navigation.navigate('Detail', { itemId, item })}
            rightContent={
              amount ? <Text style={styles.amount}>${amount}</Text> : null
            }
          />
        </Swipeable>
      );
    },
    [navigation, renderRightActions]
  );

  if (loading && !refreshing && items.length === 0) {
    return <Loader fullScreen message="Loading items..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        {error ? (
          <ErrorMessage message="Items could not be loaded. Pull to refresh or try again." />
        ) : null}

        <FlatList
          data={items}
          keyExtractor={(item, index) => String(getItemId(item) || index)}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.35}
          contentContainerStyle={[
            styles.listContent,
            items.length === 0 && styles.emptyListContent
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <EmptyState
              title="No items yet"
              message="Create the first item from the Add tab."
              actionLabel="Refresh"
              onAction={refreshFirstPage}
            />
          }
          ListFooterComponent={
            loadingMore ? <Loader message="Loading more items..." /> : null
          }
        />
        <Button
          icon="plus"
          onPress={() =>
            navigation.getParent()?.navigate('Form', { mode: 'create' })
          }
          style={styles.floatingButton}
        >
          Add Item
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  container: {
    flex: 1
  },
  listContent: {
    padding: 16,
    paddingBottom: 96
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  amount: {
    color: COLORS.primary,
    fontWeight: '800'
  },
  deleteAction: {
    alignItems: 'center',
    backgroundColor: COLORS.error,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 12,
    marginLeft: 8,
    width: 72
  },
  floatingButton: {
    bottom: 20,
    position: 'absolute',
    right: 16
  }
});

export default ListScreen;
