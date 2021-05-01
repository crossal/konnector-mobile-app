import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button, TextInput } from 'react-native';
import { fetchWrapper } from '../utils/fetchWrapper.tsx';

const LogInScreen = ({handleLoggedIn}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleLogin = () => {
    fetchWrapper.post("http://192.168.43.100:8080/api/authenticate", { usernameOrEmail: username, password: password }).then(user => {
      handleLoggedIn(user.id);
    }).catch(e => {
    });
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

  return (
        <View style={styles.container}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
           <Button title="Log in" onPress={() => handleLogin()} />
        </View>
  );
}

export default LogInScreen;

