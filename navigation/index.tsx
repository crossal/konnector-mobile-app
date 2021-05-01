import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import LogInScreen from '../screens/LogInScreen';
import SplashScreen from '../screens/SplashScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  const [dataLoaded, isDateLoaded] = React.useState(true);
  const [userId, setUserId] = React.useState(null);
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLoggedIn = (userId) => {
    console.log("handleLoggedIn " + userId);
    setUserId(userId);
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!dataLoaded ? (
        // We haven't finished checking for the token yet
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : userId == null ? (
        // No token found, user isn't signed in
        <Stack.Screen name="LogIn" children={()=><LogInScreen handleLoggedIn={handleLoggedIn}/>}
          options={{
            title: 'Log in',
            // When logging out, a pop animation feels intuitive
            animationTypeForReplace: loggingOut ? 'pop' : 'push',
          }}
        />
      ) : (
        // User is signed in
        <>
          <Stack.Screen name="Root" children={()=><BottomTabNavigator userId={userId}/>} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
