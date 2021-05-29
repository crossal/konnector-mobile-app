import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import LogInSignUpScreen from '../screens/LogInSignUpScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountVerificationScreen from '../screens/AccountVerificationScreen';
import SplashScreen from '../screens/SplashScreen';
import FetchWrapper from '../utils/fetchWrapper.tsx';

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
  const [loggingIn, setLoggingIn] = React.useState(false);
  const [signingUp, setSigningUp] = React.useState(false);
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleUnauth = () => {
    setUserId(null);
  }

  const fetchWrapper = new FetchWrapper(handleUnauth);

  const handleLogIn = (navigation) => {
    navigation.push('LogIn')
    setLoggingIn(true);
    setSigningUp(false);
  }

  const handleSignUp = (navigation) => {
    navigation.push('SignUp')
    setSigningUp(true);
    setLoggingIn(false);
  }

  const handleSignedUp = (navigation) => {
    navigation.push('AccountVerification')
  }

  const handleLoggedIn = (userId) => {
    setUserId(userId);
  }

  const handleAccountVerified = (navigation) => {
    navigation.popToTop();
  }

  const handleLogout = () => {
    setUserId(null);
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: userId == null && (loggingIn == true || signingUp == true) ? true : false }}>
      {!dataLoaded ? (
        // We haven't finished checking for the token yet
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : userId == null ? (
        // No token found, user should log in or sign up
        <>
          <Stack.Screen name="LogInSignUp" children={()=><LogInSignUpScreen handleLogIn={handleLogIn} handleSignUp={handleSignUp}/>}
            options={{
              headerShown: false,
              title: 'Log in & Sign up'
            }}
          />
          <Stack.Screen name="LogIn" children={()=><LogInScreen fetchWrapper={fetchWrapper} handleLoggedInCallback={handleLoggedIn}/>}
            options={{
              title: 'Log in'
            }}
          />
          <Stack.Screen name="SignUp" children={()=><SignUpScreen fetchWrapper={fetchWrapper} handleSignedUpCallback={handleSignedUp}/>}
            options={{
              title: 'Sign up'
            }}
          />
          <Stack.Screen name="AccountVerification" children={()=><AccountVerificationScreen fetchWrapper={fetchWrapper} handleAccountVerifiedCallback={handleAccountVerified}/>}
            options={{
              title: 'Account Verification'
            }}
          />
        </>
      ) : (
        // User is signed in
        <>
          <Stack.Screen name="Root" children={()=><BottomTabNavigator fetchWrapper={fetchWrapper} userId={userId} handleLogoutCallback={handleLogout}/>} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
