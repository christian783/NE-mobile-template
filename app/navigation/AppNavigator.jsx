import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';
import { navigationRef, resetRoot } from './navigationRef';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    if (isNavigationReady) {
      resetRoot(isAuthenticated ? 'App' : 'Auth');
    }
  }, [isAuthenticated, isNavigationReady]);

  if (isLoading) {
    return <Loader fullScreen message="Preparing your session..." />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setIsNavigationReady(true)}
    >
      <RootStack.Navigator
        initialRouteName={isAuthenticated ? 'App' : 'Auth'}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Auth" component={AuthStack} />
        <RootStack.Screen name="App" component={AppTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
