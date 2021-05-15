import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';

const SignUpScreen = ({fetchWrapper, handleSignedUpCallback}) => {

  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(null);

  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(null);

  const [firstName, setfirstName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(null);

  const [lastName, setLastName] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(null);

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(null);

  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = React.useState(null);

  const [formError, setFormError] = React.useState(null);

  const handleSignUp = () => {
    fetchWrapper.post(apiConstants.BASE_URL + "/api/users", { email: email, username: username, firstName: firstName, lastName: lastName, password: password }).then(user => {
      handleSignedUpCallback();
    }).catch(e => {
      setFormError("Username or password is incorrect.")
    });
  }

  const validateForm = () => {
    if (email == null || email == '') {
      setEmailError('Cannot be empty');
    }

    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
    }

    if (username == null || username == '') {
      setUsernameError('Cannot be empty');
    }

    if (firstName == null || firstName == '') {
      setFirstNameError('Cannot be empty');
    }

    if (lastName == null || lastName == '') {
      setLastNameError('Cannot be empty');
    }

    if (email == null || email == '') {
      setEmailError('Cannot be empty');
    }

    if (email == null || email == '') {
      setEmailError('Cannot be empty');
    }

    if (password == null || password == '' || password.length < 8) {
      setPasswordError('Password must be greater than 8 characters');
    }

    if (passwordConfirmation != password) {
      setPasswordConfirmationError('Passwords do not match');
    }
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
          placeholder="email"
          value={email}
          onChangeText={onChangeEmail}
          style={styles.input}
          autoCapitalize="none"
          textAlign="left"
          textContentType="emailAddress"
        />
        { emailError != null ? <Text style={styles.formErrorText}>{emailError}</Text> : <View/> }
        <Text style={styles.buttonLabel}>Username</Text>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={onChangeUsername}
          style={styles.input}
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
          style={styles.input}
          textAlign="left"
          textContentType="givenName"
        />
        { firstNameError != null ? <Text style={styles.formErrorText}>{firstNameError}</Text> : <View/> }
        <Text style={styles.buttonLabel}>Last name</Text>
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={onChangeLastName}
          style={styles.input}
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
          style={styles.input}
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
          style={styles.input}
          autoCapitalize="none"
          textAlign="left"
          textContentType="password"
        />
        { passwordConfirmationError != null ? <Text style={styles.formErrorText}>{passwordConfirmationError}</Text> : <View/> }
        { formError != null ? <Text style={styles.ormErrorText}>{formError}</Text> : <View/> }
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default SignUpScreen;
