import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView, ToastAndroid, Platform, AlertIOS } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { styles, colours } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';
import { FontAwesome } from '@expo/vector-icons';

const NotificationsScreen = ({fetchWrapper, userId, handleLoading}) => {

  const navigation = useNavigation();

  const [isLoading, setLoading] = React.useState(1);
  const [notifications, setNotifications] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  useEffect(() => {
    getPage(1);
  }, []);

  const getPage = (pageNumber) => {
    setLoading(isLoading + 1);
    fetchWrapper.get(apiConstants.BASE_URL + "/api/notifications?user-id=" + userId + "&page-number=" + pageNumber + "&page-size=" + apiConstants.CONTACT_DETAILS_PAGE_SIZE).then(response => {
      setNotifications(response.data);
      setLoading(isLoading - 1);
      setTotalPages(Math.floor(response.headers.get(apiConstants.HEADER_TOTAL_COUNT) / apiConstants.CONTACT_DETAILS_PAGE_SIZE) + 1);
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
    getPage(currentPage);
  }

  const clearNotification = (notification, index) => {
    handleLoading(true);
    fetchWrapper.delete(apiConstants.BASE_URL + "/api/notifications/" + notification.id).then(response => {
      handleLoading(false);
      let newNotifications = [...notifications];
      newNotifications.splice(index, 1);
      setNotifications(newNotifications);
    }).catch(e => {
      handleLoading(false);
    });
  }

  const acceptNotificationAction = (notification, index) => {
    if (notification.type == 0) {
      handleLoading(true);
      const connection = { id: notification.referenceId, requesterId: notification.senderId, requesteeId: notification.recipientId, status: 1 };
      fetchWrapper.put(apiConstants.BASE_URL + "/api/connections/" + connection.id, connection).then(response => {
        handleLoading(false);
        clearNotification(notification, index);
      }).catch(e => {
        handleLoading(false);
      });
    }
  }

  const denyNotificationAction = (notification, index) => {
    if (notification.type == 0) {
      handleLoading(true);
      const connection = { id: notification.referenceId, requesterId: notification.senderId, requesteeId: notification.recipientId, status: 1 };
      fetchWrapper.delete(apiConstants.BASE_URL + "/api/connections/" + connection.id).then(response => {
        handleLoading(false);
        clearNotification(notification, index);
      }).catch(e => {
        handleLoading(false);
      });
    } else if (notification.type == 1) {
      clearNotification(notification, index);
    }
  }

  const getNotificationMessage = (notification) => {
    switch(notification.type) {
      case 0: return notification.sender.username + ' wants to connect.';
      case 1: return notification.sender.username + ' accepted your connection request.';
      default: return 'Unknown notification type..';
    }
  }

  return (
    <View style={[styles.containerLeft, styles.noPadding]}>
      {isLoading > 0 ? <ActivityIndicator size="large" color={colours.primary}/> : (
        <ScrollView style={styles.scrollView}>
          { notifications.map((item, index, array) => {
              return (
                <View key={index} style={[styles.listItem, index == 0 ? styles.listItemTop : styles.empty, index == array.length - 1 ? styles.listItemBottom : styles.empty]}>
                  <Text style={[styles.text, styles.listText]} key={index}>{getNotificationMessage(item)}</Text>
                  { item.type == 0 ?
                      <TouchableOpacity style={[styles.listButton, styles.smallSpaceRight]} onPress={() => acceptNotificationAction(item, index)}>
                        <FontAwesome name="check" style={[styles.text, styles.white]} />
                      </TouchableOpacity>
                      :
                      <></>
                  }
                  <TouchableOpacity style={[styles.listButton]} onPress={() => denyNotificationAction(item, index)}>
                    <FontAwesome name="remove" style={[styles.text, styles.white]} />
                  </TouchableOpacity>
                </View>
              );
            })
          }

          { notifications.length > 0 ? <></> :
              <View>
                <Text style={styles.text}>None</Text>
                <View style={styles.smallSpace}/>
              </View>
          }

          <View style={styles.smallSpace}/>

          <View style={styles.pagination}>
            { notifications.length == 0 || currentPage == 1 ? <></> :
                <TouchableOpacity style={[styles.button, styles.smallSpaceRight]} onPress={() => handlePageBack()}>
                  <FontAwesome name="chevron-left" style={[styles.text, styles.white]} />
                </TouchableOpacity>
            }
            { totalPages <= 1 ? <></> :
                <View style={[styles.input, styles.text, styles.smallSpaceRight]}>
                  <Text style={styles.text}>{currentPage}</Text>
                </View>
            }
            { notifications.length == 0 || currentPage >= totalPages ? <></> :
              <TouchableOpacity style={[styles.button, styles.smallSpaceRight]} onPress={() => handlePageForward()}>
                <FontAwesome name="chevron-right" style={[styles.text, styles.white]} />
              </TouchableOpacity>
            }
            <TouchableOpacity style={[styles.button, styles.smallSpaceRight]} onPress={() => handlePageRefresh()}>
              <FontAwesome name="refresh" style={[styles.text, styles.white]} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default NotificationsScreen;
