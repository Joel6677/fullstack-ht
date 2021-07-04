import React, { useState, useEffect } from 'react';
import {
  FlatList, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';
import { Searchbar, Divider } from 'react-native-paper';
import firebase from 'firebase/app';
import UserItem from './UserItem';
// import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    paddingTop: 80,
    paddingBottom: 60,
  },
  separator: {
    marginVertical: 5,
  },
  headerContainer: {
    padding: 10,
  },
  searchContainer: {
    marginBottom: 15,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator}>

    {/* <Divider/> */}

  </View>
);

const UserListContainer = ({ users, onUserPress }) => (
  <FlatList
    data={users}
    keyExtractor={({ id }) => id}
    renderItem={({ item }) => (
      // <TouchableOpacity
      // key={item.id}
      // onPress={() => onUserPress(item.id)}
      // >
      <UserItem user={item} />
      // </TouchableOpacity>
    )}
    ItemSeparatorComponent={ItemSeparator}
  />
);

const UserList = () => {
  const history = useHistory();
  const [users, setUsers] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      const allUsers = await firebase.firestore()
        .collection('users').where('email', '!=', firebase.auth().currentUser.email).get()

      const posts = allUsers.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id
        console.log('data: ', data)
        console.log('id: ', id)
        return { id, ...data };
      })

      setUsers(posts)
    }

    fetchData()

  }, []);

  return (
    <View style={styles.container}>
      <UserListContainer
        users={users}
      />
    </View>
  );
};

export default UserList;
