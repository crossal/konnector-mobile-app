import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { styles } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';

const ProfileScreen = ({fetchWrapper, userId, handleLogoutCallback}) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = React.useState({});

  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [emailError, setEmailError] = React.useState(null);

  const [usernameError, setUsernameError] = React.useState(null);

  const [firstNameError, setFirstNameError] = React.useState(null);

  const [lastNameError, setLastNameError] = React.useState(null);

  const [passwordError, setPasswordError] = React.useState(null);

  const [newPasswordError, setNewPasswordError] = React.useState(null);

  useEffect(() => {
    fetchWrapper.get(apiConstants.BASE_URL + "/api/users/" + userId).then(user => {
      setUser(user);
    }).catch(e => {
    });
    setLoading(false);
  }, []);

  const handleSave = () => {
//     fetchWrapper.post("http://192.168.43.100:8080/api/authenticate", { usernameOrEmail: username, password: password }).then(user => {
//       handleLoggedIn(user.id);
//     }).catch(e => {
//     });
  }

  const handleLogout = () => {
    handleLogoutCallback();
  }

  return (
    <View style={styles.containerLeft}>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.buttonLabel}>Email</Text>
          <TextInput
            value={user.email}
            placeholder={'Email'}
            style={styles.input}
          />
          { emailError != null ? <Text style={styles.formErrorText}>{emailError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>Username</Text>
          <TextInput
            value={user.username}
            placeholder={'Username'}
            style={styles.input}
          />
          { usernameError != null ? <Text style={styles.formErrorText}>{usernameError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>Password</Text>
          <TextInput
            value={user.password}
            placeholder={'Password'}
            style={styles.input}
          />
          { passwordError != null ? <Text style={styles.formErrorText}>{passwordError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>New Password</Text>
          <TextInput
            value={user.newPassword}
            placeholder={'New Password'}
            style={styles.input}
          />
          { newPasswordError != null ? <Text style={styles.formErrorText}>{newPasswordError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>First Name</Text>
          <TextInput
            value={user.firstName}
            placeholder={'First name'}
            style={styles.input}
          />
          { firstNameError != null ? <Text style={styles.formErrorText}>{firstNameError}</Text> : <View/> }
          <Text style={styles.buttonLabel}>Last Name</Text>
          <TextInput
            value={user.lastName}
            placeholder={'Last name'}
            style={styles.input}
          />
          { lastNameError != null ? <Text style={styles.formErrorText}>{lastNameError}</Text> : <View/> }
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
