import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Card from '../../components/Card';
import { COLORS } from '../../constants/colors';
import useAuth from '../../hooks/useAuth';

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(new Date());

  const summaryCards = useMemo(
    () => [
      {
        title: 'Total Items',
        value: '128',
        icon: 'albums-outline',
        subtitle: 'Across all active records'
      },
      {
        title: 'Total Amount',
        value: '$24,580',
        icon: 'cash-outline',
        subtitle: 'Tracked in current cycle'
      },
      {
        title: 'Open Tasks',
        value: '12',
        icon: 'checkmark-done-outline',
        subtitle: 'Ready for review'
      }
    ],
    []
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setLastRefreshedAt(new Date());
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.username || 'User'}</Text>
            <Text style={styles.subheading}>
              Updated {lastRefreshedAt.toLocaleTimeString()}
            </Text>
          </View>
          <Button mode="outlined" icon="logout" onPress={logout} labelStyle={styles.logoutLabel}>
            Logout
          </Button>
        </View>

        <View style={styles.grid}>
          {summaryCards.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            >
              <Text style={styles.metric}>{item.value}</Text>
            </Card>
          ))}
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
    padding: 18,
    paddingBottom: 32
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12
  },
  greeting: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800'
  },
  subheading: {
    color: COLORS.textLight,
    marginTop: 4
  },
  logoutLabel: {
    color: COLORS.primary
  },
  grid: {
    gap: 4
  },
  metric: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800'
  }
});

export default DashboardScreen;
