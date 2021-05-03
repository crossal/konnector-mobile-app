import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { styles } from '../constants/Style.ts'

const ProfileScreen = ({fetchWrapper, userId, handleLogoutCallback}) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    fetchWrapper.get("http://192.168.43.100:8080/api/users/" + userId).then(user => {
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
        <>
          <Text style={styles.buttonLabel}>Email</Text>
          <TextInput
            label="Some label"
            value={user.email}
            placeholder={'Email'}
            style={styles.input}
          />
          <Text style={styles.buttonLabel}>Username</Text>
          <TextInput
            value={user.username}
            placeholder={'Username'}
            style={styles.input}
          />
          <Text style={styles.buttonLabel}>Password</Text>
          <TextInput
            value={user.password}
            placeholder={'Password'}
            style={styles.input}
          />
          <Text style={styles.buttonLabel}>New Password</Text>
          <TextInput
            value={user.newPassword}
            placeholder={'New Password'}
            style={styles.input}
          />
          <Text style={styles.buttonLabel}>First Name</Text>
          <TextInput
            value={user.firstName}
            placeholder={'First name'}
            style={styles.input}
          />
          <Text style={styles.buttonLabel}>Last Name</Text>
          <TextInput
            value={user.lastName}
            placeholder={'Last name'}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default ProfileScreen;
