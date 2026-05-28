import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const resetRoot = (routeName, params) => {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }]
    })
  );
};

export const resetToLogin = () => {
  resetRoot('Auth', { screen: 'Login' });
};

export const resetToApp = () => {
  resetRoot('App');
};
