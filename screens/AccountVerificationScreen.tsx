import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';
import { useNavigation } from '@react-navigation/native';

const AccountVerificationScreen = ({fetchWrapper, handleAccountVerifiedCallback, handleLoading}) => {

  const navigation = useNavigation();

  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
  const [usernameOrEmailError, setUsernameOrEmailError] = React.useState(null);

  const [code, setCode] = React.useState('');
  const [codeError, setCodeError] = React.useState(null);

  const [formError, setFormError] = React.useState(null);

  const handleVerify = () => {
    var validForm = validateForm(navigation);
    if (validForm) {
      handleLoading(true);
      fetchWrapper.post(apiConstants.BASE_URL + "/api/verifications/verify?type=0", { usernameOrEmail: usernameOrEmail, code: code }).then(response => {
        handleLoading(false);
        handleAccountVerifiedCallback(navigation);
      }).catch(e => {
        handleLoading(false);
        setFormError(e.data.error)
      });
    }
  }

  const validateForm = () => {
    var validForm = true;

    if (usernameOrEmail == null || usernameOrEmail == '') {
      validForm = false;
      setUsernameOrEmailError('Cannot be empty');
    }

    if (code == null || code == '') {
      validForm = false;
      setCodeError('Cannot be empty');
    }

    return validForm;
  }

  const onChangeUsernameOrEmail = (changedUsernameOrEmail) => {
    setFormError(null);
    setUsernameOrEmailError(null);
    setUsernameOrEmail(changedUsernameOrEmail);
  }

  const onChangeCode = (changedCode) => {
    setFormError(null);
    setCodeError(null);
    setCode(changedCode);
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
        { usernameOrEmailError != null ? <Text style={styles.formErrorText}>{codeError}</Text> : <View/> }
        <Text style={[styles.buttonLabel, styles.text]}>Code</Text>
        <TextInput
          placeholder="Code"
          value={code}
          onChangeText={onChangeCode}
          style={ codeError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
          autoCapitalize="none"
          textAlign="left"
          textContentType="oneTimeCode"
        />
        { codeError != null ? <Text style={styles.formErrorText}>{codeError}</Text> : <View/> }
        { formError != null ? <Text style={styles.formErrorText}>{formError}</Text> : <View/> }
        <TouchableOpacity style={styles.button} onPress={() => handleVerify()}>
          <Text style={[styles.text, styles.white]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AccountVerificationScreen;
