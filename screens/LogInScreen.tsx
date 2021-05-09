import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';

const LogInScreen = ({fetchWrapper, handleLoggedInCallback}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    fetchWrapper.post(apiConstants.BASE_URL + "/api/authenticate", { usernameOrEmail: username, password: password }).then(user => {
      handleLoggedInCallback(user.id);
    }).catch(e => {
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInnerLeft}>
        <Text style={styles.buttonLabel}>Username</Text>
        <TextInput
          label="Some label"
          theme={{colors: {primary: 'red'}}}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          textAlign="left"
          textContentType="username"
        />
        <Text style={styles.baseText}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          textAlign="left"
          textContentType="password"
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LogInScreen;
