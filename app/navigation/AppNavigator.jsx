import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import { FavoritesProvider } from '../context/FavoritesContext';
import { HistoryProvider } from '../context/HistoryContext';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import AboutScreen from '../screens/AboutScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import NetworkErrorScreen from '../screens/NetworkErrorScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SplashScreen from '../screens/SplashScreen';
import WordDetailScreen from '../screens/WordDetailScreen';
import WordNotFoundScreen from '../screens/WordNotFoundScreen';
import DrawerContent from './DrawerContent';
import { navigationRef } from './navigationRef';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  const { colors } = useSettings();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="WordDetail" component={WordDetailScreen} />
      <Stack.Screen name="NotFound" component={WordNotFoundScreen} />
      <Stack.Screen name="NetworkError" component={NetworkErrorScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

const DrawerShell = () => {
  const { colors } = useSettings();

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.surfaceDeep,
            width: '75%'
          },
          headerShown: false,
          overlayColor: colors.overlay
        }}
      >
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => (
  <SettingsProvider>
    <FavoritesProvider>
      <HistoryProvider>
        <DrawerShell />
        <Toast />
      </HistoryProvider>
    </FavoritesProvider>
  </SettingsProvider>
);

export default AppNavigator;
