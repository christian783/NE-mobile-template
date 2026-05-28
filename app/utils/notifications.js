import { Platform } from 'react-native';
import Constants from 'expo-constants';

const isExpoGo = (() => {
  if (Constants.appOwnership === 'expo') {
    return true;
  }

  try {
    return Boolean(Constants.expoGoConfig);
  } catch {
    return false;
  }
})();

export const canUseExpoNotifications =
  !(Platform.OS === 'android' && isExpoGo);

export const configureNotifications = async () => {
  if (!canUseExpoNotifications) {
    return {
      enabled: false,
      reason:
        'Push notifications require a development build or production build on Android.'
    };
  }

  const Notifications = await import('expo-notifications');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.DEFAULT
    });
  }

  const currentPermission = await Notifications.getPermissionsAsync();

  if (currentPermission.status !== 'granted') {
    return Notifications.requestPermissionsAsync();
  }

  return currentPermission;
};
