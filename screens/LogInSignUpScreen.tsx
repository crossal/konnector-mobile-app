import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';
import { useNavigation } from '@react-navigation/native';

const LogInSignUpScreen = ({handleLogIn, handleSignUp}) => {

  const navigation = useNavigation();

  const loginPressed = () => {
    handleLogIn(navigation);
  }

  const signUpPressed = () => {
    handleSignUp(navigation);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => loginPressed()}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => signUpPressed()}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LogInSignUpScreen;
