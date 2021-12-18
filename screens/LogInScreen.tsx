import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../constants/Style.ts';
import * as apiConstants from '../constants/API.ts';
import { useNavigation } from '@react-navigation/native';

const LogInScreen = ({fetchWrapper, handleLoggedInCallback, handleLoginNeedsVerificationCallback, handleLoading}) => {

  const navigation = useNavigation();

  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
  const [usernameOrEmailError, setUsernameOrEmailError] = React.useState(null);

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(null);

  const [formError, setFormError] = React.useState(null);

  const handleLogin = () => {
    var validForm = validateForm();
    if (validForm) {
      handleLoading(true);
      fetchWrapper.post(apiConstants.BASE_URL + "/api/authenticate", { usernameOrEmail: usernameOrEmail, password: password }).then(response => {
        handleLoading(false);
        handleLoggedInCallback(response.data.id);
      }).catch(e => {
        handleLoading(false);
        if (e.status === 422 && e.data.code === 1) {
          handleLoginNeedsVerificationCallback(navigation);
        } else {
          setFormError("Username/email or password is incorrect.");
        }
      });
    }
  }

  const validateForm = () => {
    var validForm = true;

    if (usernameOrEmail == null || usernameOrEmail == '') {
      validForm = false;
      setUsernameOrEmailError('Cannot be empty.');
    }

    if (password == null || password == '') {
      validForm = false;
      setPasswordError('Cannot be empty.');
    }

    return validForm;
  }

  const onChangeUsernameOrEmail = (changedUsernameOrEmail) => {
    setFormError(null);
    setUsernameOrEmailError(null);
    setUsernameOrEmail(changedUsernameOrEmail);
  }

  const onChangePassword = (changedPassword) => {
    setFormError(null);
    setPasswordError(null);
    setPassword(changedPassword);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInnerLeft}>
        <Text style={[styles.buttonLabel, styles.text]}>Username or email</Text>
        <TextInput
          placeholder="Username or email"
          value={usernameOrEmail}
          onChangeText={onChangeUsernameOrEmail}
          style={ usernameOrEmailError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
          autoCapitalize="none"
          textAlign="left"
          textContentType="emailAddress"
        />
        { usernameOrEmailError != null ? <Text style={styles.formErrorText}>{usernameOrEmailError}</Text> : <View/> }
        <Text style={[styles.buttonLabel, styles.text]}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          style={ passwordError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
          autoCapitalize="none"
          textAlign="left"
          textContentType="password"
        />
        { passwordError != null ? <Text style={styles.formErrorText}>{passwordError}</Text> : <View/> }
        { formError != null ? <Text style={styles.centredFormErrorText}>{formError}</Text> : <View/> }
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={[styles.text, styles.white]}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LogInScreen;
