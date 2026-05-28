import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../constants/colors';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DetailScreen from '../screens/detail/DetailScreen';
import FormScreen from '../screens/form/FormScreen';
import ListScreen from '../screens/list/ListScreen';

const Tab = createBottomTabNavigator();
const ListStack = createNativeStackNavigator();

const tabIcons = {
  Dashboard: {
    focused: 'home',
    unfocused: 'home-outline'
  },
  List: {
    focused: 'list',
    unfocused: 'list-outline'
  },
  Form: {
    focused: 'add-circle',
    unfocused: 'add-circle-outline'
  }
};

const ListStackNavigator = () => {
  return (
    <ListStack.Navigator
      initialRouteName="ListHome"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '700' }
      }}
    >
      <ListStack.Screen
        name="ListHome"
        component={ListScreen}
        options={{ title: 'Items' }}
      />
      <ListStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Item Detail' }}
      />
      <ListStack.Screen
        name="EditForm"
        component={FormScreen}
        options={{ title: 'Edit Item' }}
      />
    </ListStack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icon = tabIcons[route.name];
          return (
            <Ionicons
              name={focused ? icon.focused : icon.unfocused}
              size={size}
              color={color}
            />
          );
        }
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="List"
        component={ListStackNavigator}
        options={{ headerShown: false, title: 'List' }}
      />
      <Tab.Screen
        name="Form"
        component={FormScreen}
        initialParams={{ mode: 'create' }}
        options={{ title: 'Add' }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
