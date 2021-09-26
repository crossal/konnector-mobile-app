import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView, ToastAndroid, Platform, AlertIOS } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { styles, colours } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';

const ProfileScreen = ({fetchWrapper, userId, handleLogoutCallback, handleLoading}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({});

  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [emailError, setEmailError] = React.useState(null);

  const [usernameError, setUsernameError] = React.useState(null);

  const [firstNameError, setFirstNameError] = React.useState(null);

  const [lastNameError, setLastNameError] = React.useState(null);

  const [oldPasswordError, setOldPasswordError] = React.useState(null);

  const [passwordError, setPasswordError] = React.useState(null);

  const [formError, setFormError] = React.useState(null);

  useEffect(() => {
    fetchWrapper.get(apiConstants.BASE_URL + "/api/users/" + userId).then(user => {
      setUser(user);
    }).catch(e => {
    });
    setLoading(false);
  }, []);

  const handleSave = () => {
    var validForm = validateForm();
    if (validForm) {
      handleLoading(true);
      fetchWrapper.put(apiConstants.BASE_URL + "/api/users/" + userId, user).then(user => {
        handleLoading(false);
        handleUserUpdated();
      }).catch(e => {
        handleLoading(false);
        setFormError(e.data.error)
      });
    }
  }

  const validateForm = () => {
    var validForm = true;

    if (user.firstName == null || user.firstName == '') {
      validForm = false;
      setFirstNameError('Cannot be empty.');
    }

    if (user.lastName == null || user.lastName == '') {
      validForm = false;
      setLastNameError('Cannot be empty.');
    }

    if (user.password != null && user.password.length > 0 && (user.oldPassword == null || user.oldPassword.length == 0)) {
      validForm = false;
      setOldPasswordError('Password cannot be empty when setting new password.');
    }

    if (user.password != null && user.password.length > 0 && user.password.length < apiConstants.MIN_PASSWORD_LENGTH) {
      validForm = false;
      setPasswordError('Password must be greater than ' + (apiConstants.MIN_PASSWORD_LENGTH - 1) + ' characters.');
    }

    return validForm;
  }

  const handleUserUpdated = () => {
    const userUpdatedMessage = "User updated.";
    if (Platform.OS === 'android') {
      ToastAndroid.show(userUpdatedMessage, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(userUpdatedMessage);
    }
  }

  const handleLogout = () => {
    handleLogoutCallback();
  }

  const onChangeOldPassword = (changedOldPassword) => {
    setFormError(null);
    setOldPasswordError(null);
    setUser({...user, oldPassword: changedOldPassword});
  }

  const onChangePassword = (changedPassword) => {
    setFormError(null);
    setPasswordError(null);
    setUser({...user, password: changedPassword});
  }

  const onChangeFirstName = (changedFirstName) => {
    setFormError(null);
    setFirstNameError(null);
    setUser({...user, firstName: changedFirstName});
  }

  const onChangeLastName = (changedLastName) => {
    setFormError(null);
    setLastNameError(null);
    setUser({...user, lastName: changedLastName});
  }

  return (
    <View style={styles.containerLeft}>
      {isLoading ? <ActivityIndicator size="large" color={colours.primary}/> : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.buttonLabel}>Email</Text>
          <TextInput
            value={user.email}
            placeholder={'Email'}
            style={styles.input}
            editable={false}
          />
          { emailError != null ? <Text style={styles.formErrorText}>{emailError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>Username</Text>
          <TextInput
            value={user.username}
            placeholder={'Username'}
            style={styles.input}
            editable={false}
          />
          { usernameError != null ? <Text style={styles.formErrorText}>{usernameError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>Password</Text>
          <TextInput
            value={user.oldPassword}
            placeholder={'Password'}
            style={ oldPasswordError == null ? styles.input : styles.inputWithError }
            onChangeText={onChangeOldPassword}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
          />
          { oldPasswordError != null ? <Text style={styles.formErrorText}>{oldPasswordError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>New Password</Text>
          <TextInput
            value={user.password}
            placeholder={'New Password'}
            style={ passwordError == null ? styles.input : styles.inputWithError }
            onChangeText={onChangePassword}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
          />
          { passwordError != null ? <Text style={styles.formErrorText}>{passwordError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>First Name</Text>
          <TextInput
            value={user.firstName}
            placeholder={'First name'}
            style={ firstNameError == null ? styles.input : styles.inputWithError }
            onChangeText={onChangeFirstName}
            textContentType="givenName"
          />
          { firstNameError != null ? <Text style={styles.formErrorText}>{firstNameError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>Last Name</Text>
          <TextInput
            value={user.lastName}
            placeholder={'Last name'}
            style={ lastNameError == null ? styles.input : styles.inputWithError }
            onChangeText={onChangeLastName}
            textContentType="familyName"
          />
          { lastNameError != null ? <Text style={styles.formErrorText}>{lastNameError}</Text> : <View/> }
          { formError != null ? <Text style={styles.centredFormErrorText}>{formError}</Text> : <View/> }
          <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

export default ProfileScreen;
