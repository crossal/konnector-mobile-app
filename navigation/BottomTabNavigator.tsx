import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/ProfileScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { BottomTabParamList, ProfileTabParamList, ConnectionsTabParamList, NotificationsTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

const BottomTabNavigator = ({fetchWrapper, userId, handleLogoutCallback}) => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="ProfileTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Profile"
        children={()=><ProfileTabNavigator fetchWrapper={fetchWrapper} userId={userId} handleLogoutCallback={handleLogoutCallback}/>}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Connections"
        component={ConnectionsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-friends" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

const ProfileTabNavigator = ({fetchWrapper, userId, handleLogoutCallback}) => {
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="ProfileScreen"
        children={()=><ProfileScreen fetchWrapper={fetchWrapper} userId={userId} handleLogoutCallback={handleLogoutCallback}/>}
        options={{ headerTitle: 'Profile' }}
      />
    </ProfileTabStack.Navigator>
  );
}

const ConnectionsTabStack = createStackNavigator<ConnectionsTabParamList>();

function ConnectionsTabNavigator() {
  return (
    <ConnectionsTabStack.Navigator>
      <ConnectionsTabStack.Screen
        name="ConnectionsScreen"
        component={ConnectionsScreen}
        options={{ headerTitle: 'Connections' }}
      />
    </ConnectionsTabStack.Navigator>
  );
}

const NotificationsTabStack = createStackNavigator<NotificationsTabParamList>();

function NotificationsTabNavigator() {
  return (
    <NotificationsTabStack.Navigator>
      <NotificationsTabStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerTitle: 'Notifications' }}
      />
    </NotificationsTabStack.Navigator>
  );
}
