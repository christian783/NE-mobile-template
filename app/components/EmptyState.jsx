import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';
import Button from './Button';

const EmptyState = ({
  title = 'No data found',
  message = 'There is nothing to show right now.',
  icon = 'file-tray-outline',
  actionLabel,
  onAction
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={32} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <Button icon="refresh" onPress={onAction} style={styles.action}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    height: 64,
    justifyContent: 'center',
    marginBottom: 16,
    width: 64
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  message: {
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: 'center'
  },
  action: {
    marginTop: 18
  }
});

export default EmptyState;
