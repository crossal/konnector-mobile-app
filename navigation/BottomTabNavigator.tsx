import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/ProfileScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import AddConnectionsScreen from '../screens/AddConnectionsScreen';
import ConnectedUserProfile from '../screens/ConnectedUserProfile';
import NotificationsScreen from '../screens/NotificationsScreen';
import { BottomTabParamList, ProfileTabParamList, ConnectionsTabParamList, NotificationsTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

const BottomTabNavigator = ({fetchWrapper, userId, handleLogoutCallback, handleLoading}) => {
  const colorScheme = useColorScheme();

  const handleAddConnections = (navigation) => {
    navigation.push('AddConnectionsScreen')
  }

  const handleViewConnectedUser = (navigation, connection) => {
    navigation.push('ConnectedUserProfile')
  }

  return (
    <BottomTab.Navigator
      initialRouteName="ProfileTab"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false }}>
      <BottomTab.Screen
        name="Profile"
        children={()=><ProfileTabNavigator fetchWrapper={fetchWrapper} userId={userId} handleLogoutCallback={handleLogoutCallback} handleLoading={handleLoading}/>}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Connections"
        children={()=><ConnectionsTabNavigator fetchWrapper={fetchWrapper} userId={userId} handleLoading={handleLoading} handleAddConnections={handleAddConnections} handleViewConnectedUser={handleViewConnectedUser}/>}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-friends" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        children={()=><NotificationsTabNavigator fetchWrapper={fetchWrapper} userId={userId} handleLoading={handleLoading}/>}
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

const ProfileTabNavigator = ({fetchWrapper, userId, handleLogoutCallback, handleLoading}) => {
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="ProfileScreen"
        children={()=><ProfileScreen fetchWrapper={fetchWrapper} userId={userId} handleLogoutCallback={handleLogoutCallback} handleLoading={handleLoading}/>}
        options={{ headerTitle: 'Profile' }}
      />
    </ProfileTabStack.Navigator>
  );
}

const ConnectionsTabStack = createStackNavigator<ConnectionsTabParamList>();

const ConnectionsTabNavigator = ({fetchWrapper, userId, handleLoading, handleAddConnections, handleViewConnectedUser}) => {
  return (
    <ConnectionsTabStack.Navigator>
      <ConnectionsTabStack.Screen
        name="ConnectionsScreen"
        children={()=><ConnectionsScreen fetchWrapper={fetchWrapper} userId={userId} handleLoading={handleLoading} handleAddConnections={handleAddConnections} handleViewConnectedUser={handleViewConnectedUser}/>}
        options={{ headerTitle: 'Connections' }}
      />
      <ConnectionsTabStack.Screen
        name="AddConnectionsScreen"
        children={()=><AddConnectionsScreen fetchWrapper={fetchWrapper} userId={userId} handleLoading={handleLoading}/>}
        options={{ headerTitle: 'Add Connections' }}
      />
      <ConnectionsTabStack.Screen
        name="ConnectedUserProfile"
        children={()=><ConnectedUserProfile fetchWrapper={fetchWrapper} userId={userId} handleLoading={handleLoading}/>}
        options={{ headerTitle: 'Connection Profile' }}
      />
    </ConnectionsTabStack.Navigator>
  );
}

const NotificationsTabStack = createStackNavigator<NotificationsTabParamList>();

const NotificationsTabNavigator = ({fetchWrapper, userId, handleLoading}) => {
  return (
    <NotificationsTabStack.Navigator>
      <NotificationsTabStack.Screen
        name="NotificationsScreen"
        children={()=><NotificationsScreen fetchWrapper={fetchWrapper} userId={userId} handleLoading={handleLoading}/>}
        options={{ headerTitle: 'Notifications' }}
      />
    </NotificationsTabStack.Navigator>
  );
}
