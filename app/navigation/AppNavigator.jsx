import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '../constants';
import { HistoryProvider } from '../context/HistoryContext';
import NetworkErrorScreen from '../screens/NetworkErrorScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen';
import WordDetailScreen from '../screens/WordDetailScreen';
import WordNotFoundScreen from '../screens/WordNotFoundScreen';
import DrawerContent from './DrawerContent';
import { navigationRef } from './navigationRef';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.background }
    }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="WordDetail" component={WordDetailScreen} />
    <Stack.Screen name="NotFound" component={WordNotFoundScreen} />
    <Stack.Screen name="NetworkError" component={NetworkErrorScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <HistoryProvider>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: COLORS.surfaceDeep,
            width: '75%'
          },
          headerShown: false,
          overlayColor: 'rgba(0,0,0,0.5)'
        }}
      >
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </HistoryProvider>
  </NavigationContainer>
);

export default AppNavigator;
