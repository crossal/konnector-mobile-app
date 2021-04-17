import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button, TextInput } from 'react-native';

export default function ProfileScreen() {
  const [email, onChangeEmail] = React.useState(null);
  const [username, onChangeUsername] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [newPassword, onChangeNewPassword] = React.useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={onChangeEmail}
        placeholder={'Email'}
        style={styles.input}
      />
      <TextInput
        value={username}
        onChangeText={onChangeUsername}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={onChangePassword}
        placeholder={'Password'}
        style={styles.input}
      />
      <TextInput
        value={newPassword}
        onChangeText={onChangeNewPassword}
        placeholder={'New Password'}
        style={styles.input}
      />
      <TextInput
        value={firstName}
        onChangeText={onChangeFirstName}
        placeholder={'First name'}
        style={styles.input}
      />
      <TextInput
        value={lastName}
        onChangeText={onChangeLastName}
        placeholder={'Last name'}
        style={styles.input}
      />
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
