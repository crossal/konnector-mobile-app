import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button, TextInput } from 'react-native';

export default function LogInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

//   const { signIn } = React.useContext(AuthContext);

  return (

        <View style={styles.container}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
           <Button title="Sign in" onPress={() => signIn({ username, password })} />
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

// export default function LogInScreen() {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');
//
// //   const { signIn } = React.useContext(AuthContext);
//
//   return (
//     <View>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//        <Button title="Sign in" onPress={() => signIn({ username, password })} />
//     </View>
//   );
// }
