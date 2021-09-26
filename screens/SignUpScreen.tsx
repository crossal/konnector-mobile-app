import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = ({fetchWrapper, handleSignedUpCallback, handleLoading}) => {

  const navigation = useNavigation();

  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const usernamePattern = /^[a-zA-Z0-9._]+$/;

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(null);

  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(null);

  const [firstName, setFirstName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(null);

  const [lastName, setLastName] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(null);

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(null);

  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = React.useState(null);

  const [formError, setFormError] = React.useState(null);

  const handleSignUp = () => {
    var validForm = validateForm();
    if (validForm) {
      handleLoading(true);
      fetchWrapper.post(apiConstants.BASE_URL + "/api/users", { email: email, username: username, firstName: firstName, lastName: lastName, password: password }).then(user => {
        handleLoading(false);
        handleSignedUpCallback(navigation);
      }).catch(e => {
        handleLoading(false);
        setFormError(e.data.error);
      });
    }
  }

  const validateForm = () => {
    var validForm = true;

    if (email == null || email == '') {
      validForm = false;
      setEmailError('Cannot be empty.');
    }

    if (!emailPattern.test(email)) {
      validForm = false;
      setEmailError('Invalid email address.');
    }

    if (username == null || username == '') {
      validForm = false;
      setUsernameError('Cannot be empty.');
    } else if (!usernamePattern.test(username)) {
      validForm = false;
      setUsernameError('Invalid username.');
    }

    if (firstName == null || firstName == '') {
      validForm = false;
      setFirstNameError('Cannot be empty.');
    }

    if (lastName == null || lastName == '') {
      validForm = false;
      setLastNameError('Cannot be empty.');
    }

    if (email == null || email == '') {
      validForm = false;
      setEmailError('Cannot be empty.');
    }

    if (email == null || email == '') {
      validForm = false;
      setEmailError('Cannot be empty.');
    }

    if (password == null || password.length < apiConstants.MIN_PASSWORD_LENGTH) {
      validForm = false;
      setPasswordError('Password must be greater than ' + (apiConstants.MIN_PASSWORD_LENGTH - 1) + ' characters.');
    }

    if (passwordConfirmation != password) {
      validForm = false;
      setPasswordConfirmationError('Passwords do not match.');
    }

    return validForm;
  }

  const onChangeEmail = (changedEmail) => {
    setFormError(null);
    setEmailError(null);
    setEmail(changedEmail);
  }

  const onChangeUsername = (changedUsername) => {
    setFormError(null);
    setUsernameError(null);
    setUsername(changedUsername);
  }

  const onChangeFirstName = (changedFirstName) => {
    setFormError(null);
    setFirstNameError(null);
    setFirstName(changedFirstName);
  }

  const onChangeLastName = (changedLastName) => {
    setFormError(null);
    setLastNameError(null);
    setLastName(changedLastName);
  }

  const onChangePassword = (changedPassword) => {
    setFormError(null);
    setPasswordError(null);
    setPassword(changedPassword);
  }

  const onChangePasswordConfirmation = (changedPasswordConfirmation) => {
    setFormError(null);
    setPasswordConfirmationError(null);
    setPasswordConfirmation(changedPasswordConfirmation);
  }

  return (
    <View style={styles.containerLeft}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.buttonLabel}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={onChangeEmail}
          style={ emailError == null ? styles.input : styles.inputWithError }
          autoCapitalize="none"
          textAlign="left"
          textContentType="emailAddress"
        />
        { emailError != null ? <Text style={styles.formErrorText}>{emailError}</Text> : <View/> }
        <Text style={styles.buttonLabel}>Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={onChangeUsername}
          style={ usernameError == null ? styles.input : styles.inputWithError }
          autoCapitalize="none"
          textAlign="left"
          textContentType="username"
        />
        { usernameError != null ? <Text style={styles.formErrorText}>{usernameError}</Text> : <View/> }
        <Text style={styles.buttonLabel}>First name</Text>
        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={onChangeFirstName}
          style={ firstNameError == null ? styles.input : styles.inputWithError }
          textAlign="left"
          textContentType="givenName"
        />
        { firstNameError != null ? <Text style={styles.formErrorText}>{firstNameError}</Text> : <View/> }
        <Text style={styles.buttonLabel}>Last name</Text>
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={onChangeLastName}
          style={ lastNameError == null ? styles.input : styles.inputWithError }
          textAlign="left"
          textContentType="familyName"
        />
        { lastNameError != null ? <Text style={styles.formErrorText}>{lastNameError}</Text> : <View/> }
        <Text style={styles.baseText}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          style={ passwordError == null ? styles.input : styles.inputWithError }
          autoCapitalize="none"
          textAlign="left"
          textContentType="password"
        />
        { passwordError != null ? <Text style={styles.formErrorText}>{passwordError}</Text> : <View/> }
        <Text style={styles.baseText}>Password confirmation</Text>
        <TextInput
          placeholder="Password confirmation"
          value={passwordConfirmation}
          onChangeText={onChangePasswordConfirmation}
          secureTextEntry
          style={ passwordConfirmationError == null ? styles.input : styles.inputWithError }
          autoCapitalize="none"
          textAlign="left"
          textContentType="password"
        />
        { passwordConfirmationError != null ? <Text style={styles.formErrorText}>{passwordConfirmationError}</Text> : <View/> }
        { formError != null ? <Text style={styles.formErrorText}>{formError}</Text> : <View/> }
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default SignUpScreen;
