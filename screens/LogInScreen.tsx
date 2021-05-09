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
  const [formError, setFormError] = React.useState(null);

  const handleLogin = () => {
    fetchWrapper.post(apiConstants.BASE_URL + "/api/authenticate", { usernameOrEmail: username, password: password }).then(user => {
      handleLoggedInCallback(user.id);
    }).catch(e => {
      setFormError("Username or password is incorrect.")
    });
  }

  const validateForm = () => {

  }

  const onChangeUsername = (changedUsername) => {
    setFormError(null);
    setUsername(changedUsername);
  }

  const onChangePassword = (changedPassword) => {
    setFormError(null);
    setPassword(changedPassword);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInnerLeft}>
        <Text style={styles.buttonLabel}>Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={onChangeUsername}
          style={styles.centredInput}
          autoCapitalize="none"
          textAlign="left"
          textContentType="username"
        />
        <Text style={styles.baseText}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          style={styles.centredInput}
          autoCapitalize="none"
          textAlign="left"
          textContentType="password"
        />
        { formError != null ? <Text style={styles.centredFormErrorText}>{formError}</Text> : <View/> }
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LogInScreen;
