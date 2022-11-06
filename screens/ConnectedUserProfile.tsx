import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView, ToastAndroid, Platform, AlertIOS } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { styles, colours } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';
import { FontAwesome } from '@expo/vector-icons';

const ConnectedUserProfile = ({fetchWrapper, userId, handleLoading}) => {

  const [isLoading, setLoading] = React.useState(1);

  const [user, setUser] = React.useState({});
  const [contactDetails, setContactDetails] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

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
    fetchWrapper.get(apiConstants.BASE_URL + "/api/contact-details?user-id=" + userId + "&page-number=" + pageNumber + "&page-size=" + apiConstants.PAGE_SIZE).then(response => {
      setContactDetails(response.data);
      setLoading(isLoading - 1);
      setTotalPages(getPageCount(response.headers.get(apiConstants.HEADER_TOTAL_COUNT)));
      setCurrentPage(pageNumber);
    }).catch(e => {
      setLoading(isLoading - 1);
    });
  }

  const handlePageBack = () => {
    getPage(currentPage - 1);
  }

  const handlePageForward = () => {
    getPage(currentPage + 1);
  }

  const handlePageRefresh = () => {
    getPage(1);
  }

  return (
    <View style={styles.scrollViewContainer}>
      {isLoading > 0 ? <ActivityIndicator size="large" color={colours.primary}/> : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollViewContent}>
            <Text style={styles.title}>{user.username}</Text>
            <Text style={[styles.title2]}>{user.firstName} {user.lastName}</Text>

            <View style={styles.smallSpace}/>

            <Text style={styles.title3}>Contact Details</Text>

            {
              contactDetails.map((item, index, array) => {
                return (
                  <View key={index} style={[styles.listItem, index == 0 ? styles.listItemTop : styles.empty, index == array.length - 1 ? styles.listItemBottom : styles.empty]}>
                    <Text style={[styles.text, styles.listText]} key={index}><Text style={{fontWeight: "bold"}}>{item.type}:</Text> {item.value}</Text>
                  </View>
                );
              })
            }

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
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default ConnectedUserProfile;
