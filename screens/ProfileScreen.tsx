import React, { useEffect, useState } from 'react';
import { Button, TextInput, ActivityIndicator, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ProfileScreen() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    fetch('http://192.168.8.106:8080/api/health')
      .then((response) => response.json())
      .then((json) => setUser(json))
      .catch((error) => console.error('error: ' + error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
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
