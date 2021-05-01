import React, { useEffect, useState } from 'react';
import { Button, TextInput, ActivityIndicator, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { fetchWrapper } from '../utils/fetchWrapper.tsx';

const ProfileScreen = ({userId}) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = React.useState({});

  console.log("ProfileScreen " + userId);

  useEffect(() => {
    fetchWrapper.get("http://192.168.43.100:8080/api/users/" + userId).then(user => {
      setUser(user);
    }).catch(e => {
    });
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
        <>
          <TextInput
            value={user.email}
            placeholder={'Email'}
            style={styles.input}
          />
          <TextInput
            value={user.username}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={user.password}
            placeholder={'Password'}
            style={styles.input}
          />
          <TextInput
            value={user.newPassword}
            placeholder={'New Password'}
            style={styles.input}
          />
          <TextInput
            value={user.firstName}
            placeholder={'First name'}
            style={styles.input}
          />
          <TextInput
            value={user.lastName}
            placeholder={'Last name'}
            style={styles.input}
          />
        </>
      )}
    </View>
  );
}

export default ProfileScreen;

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
