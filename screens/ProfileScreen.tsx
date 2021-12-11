import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView, ToastAndroid, Platform, AlertIOS } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { styles, colours } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = ({fetchWrapper, userId, handleLogoutCallback, handleLoading}) => {
  const [isLoading, setLoading] = React.useState(1);

  const [user, setUser] = React.useState({});
  const [contactDetails, setContactDetails] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const [newContactDetailType, setNewContactDetailType] = React.useState('');
  const [newContactDetailValue, setNewContactDetailValue] = React.useState('');

  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [emailError, setEmailError] = React.useState(null);
  const [usernameError, setUsernameError] = React.useState(null);
  const [firstNameError, setFirstNameError] = React.useState(null);
  const [lastNameError, setLastNameError] = React.useState(null);
  const [oldPasswordError, setOldPasswordError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  const [newContactDetailTypeError, setNewContactDetailTypeError] = React.useState(null);
  const [newContactDetailValueError, setNewContactDetailValueError] = React.useState(null);

  const [formError, setFormError] = React.useState(null);
  const [newContactDetailFormError, setNewContactDetailFormError] = React.useState(null);
  const [deleteContactDetailFormError, setDeleteContactDetailFormError] = React.useState(null);

  useEffect(() => {
    fetchWrapper.get(apiConstants.BASE_URL + "/api/users/" + userId).then(response => {
      setUser(response.data);
      setLoading(isLoading - 1);
    }).catch(e => {
      setLoading(isLoading - 1);
    });
    getPage(1);
  }, []);

  const getPage = (pageNumber) => {
    setLoading(isLoading + 1);
    fetchWrapper.get(apiConstants.BASE_URL + "/api/contact-details?userId=" + userId + "&pageNumber=" + pageNumber + "&pageSize=" + apiConstants.CONTACT_DETAILS_PAGE_SIZE).then(response => {
      setContactDetails(response.data);
      setLoading(isLoading - 1);
      setTotalPages(Math.floor(response.headers.get(apiConstants.HEADER_TOTAL_COUNT) / apiConstants.CONTACT_DETAILS_PAGE_SIZE) + 1);
      setCurrentPage(pageNumber);
    }).catch(e => {
      setLoading(isLoading - 1);
    });
  }

  const handleSave = () => {
    var validForm = validateForm();
    if (validForm) {
      handleLoading(true);
      fetchWrapper.put(apiConstants.BASE_URL + "/api/users/" + userId, user).then(response => {
        handleLoading(false);
        handleUserUpdated();
      }).catch(e => {
        handleLoading(false);
        setFormError(e.data.error)
      });
    }
  }

  const handleAddNewContactDetail = () => {
    var validForm = validateNewContactDetailForm();
    if (validForm) {
      handleLoading(true);
      fetchWrapper.post(apiConstants.BASE_URL + "/api/contact-details", { userId: userId, type: newContactDetailType, value: newContactDetailValue }).then(response => {
        handleLoading(false);
      }).catch(e => {
        handleLoading(false);
        setNewContactDetailFormError(e.data.error)
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

  const validateNewContactDetailForm = () => {
    var validForm = true;

    if (newContactDetailType == null || newContactDetailType == '') {
      validForm = false;
      setNewContactDetailTypeError('Cannot be empty.');
    }

    if (newContactDetailValue == null || newContactDetailValue == '') {
      validForm = false;
      setNewContactDetailValueError('Cannot be empty.');
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

  const handlePageBack = () => {
    getPage(currentPage - 1);
  }

  const handlePageForward = () => {
    getPage(currentPage + 1);
  }

  const handlePageRefresh = () => {
    getPage(currentPage);
  }

  const onChangeNewContactDetailType = (changedNewContactDetailType) => {
    setFormError(null);
    setNewContactDetailTypeError(null);
    setNewContactDetailType(changedNewContactDetailType);
  }

  const onChangeNewContactDetailValue = (changedNewContactDetailValue) => {
    setFormError(null);
    setNewContactDetailValueError(null);
    setNewContactDetailValue(changedNewContactDetailValue);
  }

  const handleDeleteContactDetail = (contactDetail, index) => {
    handleLoading(true);
    fetchWrapper.delete(apiConstants.BASE_URL + "/api/contact-details/" + contactDetail.id).then(response => {
      handleLoading(false);
      let newContactDetails = [...contactDetails];
      newContactDetails.splice(index, 1);
      setContactDetails(newContactDetails);
    }).catch(e => {
      handleLoading(false);
      setDeleteContactDetailFormError(e.data.error)
    });
  }

  return (
    <View style={[styles.containerLeft, styles.noPadding]}>
      {isLoading > 0 ? <ActivityIndicator size="large" color={colours.primary}/> : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Account Details</Text>
          <Text style={[styles.text, styles.buttonLabel]}>Email</Text>
          <TextInput
            value={user.email}
            placeholder={'Email'}
            style={[styles.input, styles.text]}
            editable={false}
          />
          { emailError != null ? <Text style={styles.formErrorText}>{emailError}</Text> : <View/> }
          <Text style={[styles.text, styles.buttonLabel]}>Username</Text>
          <TextInput
            value={user.username}
            placeholder={'Username'}
            style={[styles.input, styles.text]}
            editable={false}
          />
          { usernameError != null ? <Text style={styles.formErrorText}>{usernameError}</Text> : <View/> }
          <Text style={[styles.text, styles.buttonLabel]}>Password</Text>
          <TextInput
            value={user.oldPassword}
            placeholder={'Password'}
            style={ oldPasswordError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
            onChangeText={onChangeOldPassword}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
          />
          { oldPasswordError != null ? <Text style={styles.formErrorText}>{oldPasswordError}</Text> : <View/> }
          <Text style={[styles.text, styles.buttonLabel]}>New Password</Text>
          <TextInput
            value={user.password}
            placeholder={'New Password'}
            style={ passwordError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
            onChangeText={onChangePassword}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
          />
          { passwordError != null ? <Text style={styles.formErrorText}>{passwordError}</Text> : <View/> }
          <Text style={[styles.text, styles.buttonLabel]}>First Name</Text>
          <TextInput
            value={user.firstName}
            placeholder={'First name'}
            style={ firstNameError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
            onChangeText={onChangeFirstName}
            textContentType="givenName"
          />
          { firstNameError != null ? <Text style={styles.formErrorText}>{firstNameError}</Text> : <View/> }
          <Text style={[styles.text, styles.buttonLabel]}>Last Name</Text>
          <TextInput
            value={user.lastName}
            placeholder={'Last name'}
            style={ lastNameError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
            onChangeText={onChangeLastName}
            textContentType="familyName"
          />
          { lastNameError != null ? <Text style={styles.formErrorText}>{lastNameError}</Text> : <View/> }
          { formError != null ? <Text style={styles.centredFormErrorText}>{formError}</Text> : <View/> }
          <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
            <Text style={[styles.text, styles.white]}>Save</Text>
          </TouchableOpacity>

          <View style={styles.smallSpace}/>

          <Text style={styles.title}>Contact Details</Text>
          {
            contactDetails.map((item, index, array) => {
              return (
                <View key={index} style={[styles.listItem, index == 0 ? styles.listItemTop : styles.empty, index == array.length - 1 ? styles.listItemBottom : styles.empty]}>
                  <Text style={[styles.text, styles.listText]} key={index}>{item.type}: {item.value}</Text>
                  <TouchableOpacity style={[styles.listButton]} onPress={() => handleDeleteContactDetail(item, index)}>
                    <FontAwesome name="remove" style={[styles.text, styles.white]} />
                  </TouchableOpacity>
                </View>
              );
            })
          }

          { newContactDetailFormError != null ? <Text style={styles.centredFormErrorText}>{newContactDetailFormError}</Text> : <View/> }

          <View style={styles.smallSpace}/>

          { contactDetails.length > 0 ? <></> :
            <View>
              <Text style={styles.text}>None</Text>
              <View style={styles.smallSpace}/>
            </View>
          }

          <View style={styles.pagination}>
            { contactDetails.length == 0 || currentPage == 1 ? <></> :
              <TouchableOpacity style={[styles.button, styles.smallSpaceRight]} onPress={() => handlePageBack()}>
                <FontAwesome name="chevron-left" style={[styles.text, styles.white]} />
              </TouchableOpacity>
            }
            { totalPages <= 1 ? <></> :
              <View style={[styles.input, styles.text, styles.smallSpaceRight]}>
                <Text style={styles.text}>{currentPage}</Text>
              </View>
            }
            { contactDetails.length == 0 || currentPage >= totalPages ? <></> :
              <TouchableOpacity style={[styles.button, styles.smallSpaceRight]} onPress={() => handlePageForward()}>
                <FontAwesome name="chevron-right" style={[styles.text, styles.white]} />
              </TouchableOpacity>
            }
            <TouchableOpacity style={[styles.button, styles.smallSpaceRight]} onPress={() => handlePageRefresh()}>
              <FontAwesome name="refresh" style={[styles.text, styles.white]} />
            </TouchableOpacity>
          </View>

          <View style={styles.smallSpace}/>

          <Text style={styles.title2}>New Contact Detail</Text>

          <TextInput
            value={newContactDetailType}
            placeholder={'Type'}
            style={ newContactDetailTypeError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
            onChangeText={onChangeNewContactDetailType}
          />
          { newContactDetailTypeError != null ? <Text style={styles.formErrorText}>{newContactDetailTypeError}</Text> : <View/> }

          <TextInput
            value={newContactDetailValue}
            placeholder={'Value'}
            style={ newContactDetailValueError == null ? [styles.input, styles.text] : [styles.inputWithError, styles.text] }
            onChangeText={onChangeNewContactDetailValue}
          />
          { newContactDetailValueError != null ? <Text style={styles.formErrorText}>{newContactDetailValueError}</Text> : <View/> }
          { newContactDetailFormError != null ? <Text style={styles.centredFormErrorText}>{newContactDetailFormError}</Text> : <View/> }
          <TouchableOpacity style={styles.button} onPress={() => handleAddNewContactDetail()}>
            <Text style={[styles.text, styles.white]}>Add</Text>
          </TouchableOpacity>

          <View style={styles.smallSpace}/>

          <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
            <Text style={[styles.text, styles.white]}>Log Out</Text>
          </TouchableOpacity>

          <View style={styles.smallSpace}/>
        </ScrollView>
      )}
    </View>
  );
}

export default ProfileScreen;
