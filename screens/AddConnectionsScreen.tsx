import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView, ToastAndroid, Platform, AlertIOS } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { styles, colours } from '../constants/Style.ts'
import * as apiConstants from '../constants/API.ts';
import { FontAwesome } from '@expo/vector-icons';

const AddConnectionsScreen = ({fetchWrapper, userId, handleLoading, handleAddConnections}) => {

  const [isLoading, setLoading] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [addConnectionFormError, setAddConnectionFormError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [addedUserIds, setAddedUserIds] = React.useState(new Set());
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    getPage(1);
  }, []);

  const getPage = (pageNumber) => {
    console.log("getting page: " + pageNumber)
    setLoading(isLoading + 1);
    fetchWrapper.get(apiConstants.BASE_URL + "/api/users?username=" + searchQuery + "&page-number=" + pageNumber + "&page-size=" + apiConstants.PAGE_SIZE).then(response => {
      setUsers(response.data);
      setLoading(isLoading - 1);
      setTotalPages(getPageCount(response.headers.get(apiConstants.HEADER_TOTAL_COUNT)));
      setCurrentPage(pageNumber);
    }).catch(e => {
      setLoading(isLoading - 1);
    });
  }

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handlePageRefresh();
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const getPageCount = (entryCount) => {
    if (entryCount == 0) {
      return 0;
    }

    let pageCount = Math.floor(entryCount / apiConstants.PAGE_SIZE);
    const leftover = entryCount % apiConstants.PAGE_SIZE;
    if (leftover > 0) {
      pageCount++;
    }

    return pageCount;
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

  const handleAddConnection = (userToConnect, index) => {
    handleLoading(true);
    const newAddedUserIds = new Set(addedUserIds);
    newAddedUserIds.add(userToConnect.id);
    setAddedUserIds(newAddedUserIds);
    fetchWrapper.post(apiConstants.BASE_URL + "/api/connections", { requesterId: userId, requesteeId: userToConnect.id, status: 0 }).then(response => {
      handleLoading(false);
    }).catch(e => {
      handleLoading(false);
      setAddConnectionFormError(e.data.error)
    });
  }

  return (
    <View style={styles.scrollViewContainer}>
      {isLoading > 0 ? <ActivityIndicator size="large" color={colours.primary}/> : (
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollViewContent}>
          <Searchbar
            style={[styles.searchBar]}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          { users.map((item, index, array) => {
              return (
                <View key={index} style={[styles.listItem, index == 0 ? styles.listItemTop : styles.empty, index == array.length - 1 ? styles.listItemBottom : styles.empty]}>
                  <Text style={[styles.text, styles.listText]} key={index}><Text style={{fontWeight: "bold"}}>{item.username}</Text> - {item.firstName} {item.lastName}</Text>
                    { addedUserIds.has(item.id) ?
                      <TouchableOpacity style={[styles.listButton]}>
                        <FontAwesome name="check" style={[styles.text, styles.white]} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={[styles.listButton]} onPress={() => handleAddConnection(item, index)}>
                        <FontAwesome name="plus" style={[styles.text, styles.white]} />
                      </TouchableOpacity>
                    }
                  </View>
                );
              })
          }

          { users.length > 0 ? <></> :
              <View>
                <Text style={styles.text}>None</Text>
                <View style={styles.smallSpace}/>
              </View>
          }

          <View style={styles.smallSpace}/>

          <View style={styles.pagination}>
            { users.length == 0 || currentPage == 1 ? <></> :
                <TouchableOpacity style={[styles.button, styles.smallSpaceRight]} onPress={() => handlePageBack()}>
                  <FontAwesome name="chevron-left" style={[styles.text, styles.white]} />
                </TouchableOpacity>
            }
            { totalPages <= 1 ? <></> :
              <View style={[styles.input, styles.text, styles.smallSpaceRight]}>
                <Text style={styles.text}>{currentPage}</Text>
              </View>
            }
            { users.length == 0 || currentPage >= totalPages ? <></> :
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

export default AddConnectionsScreen;
