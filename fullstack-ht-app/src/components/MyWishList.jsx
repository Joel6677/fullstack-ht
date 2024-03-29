import React, { useState, useEffect } from 'react';
import {
  FlatList, View, StyleSheet, Alert,
} from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Link } from 'react-router-native';
// import * as firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import WhiskyItem from './WhiskyItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    zIndex: 1,
    // position: 'absolute',
    height: '100%',
    width: '100%',
    // paddingTop: 80,
    paddingBottom: 60,
  },
  WishListItemWrapper: {
    padding: 15,
    backgroundColor: '#FFD700',
  },
  separator: {
    height: 10,
  },
  actionsContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  actionButton: {
    flexGrow: 1,
    marginRight: 15,
  },
  lastActionButton: {
    marginRight: 0,
  },
});

const DeleteWishListButton = ({ onPress }) => {
  const alertButtons = [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Delete',
      onPress: () => onPress(),
    },
  ];

  const deleteWithConfirmation = () => {
    Alert.alert(
      'Delete whisky',
      'Are you sure you want to delete this whisky?',
      alertButtons,
      { cancelable: false },
    );
  };

  return (
    <Button onPress={deleteWithConfirmation}>
      Delete whisky
    </Button>
  );
};

const WishListItemWithActions = ({ whisky, onDelete }) => {
  console.log('whiskyID: ', whisky.whiskyID);

  return (
    <View style={styles.WishListItemWrapper}>
      <WhiskyItem whisky={whisky} />
      <Link
        component={Button}
        to={`/whiskies/${whisky.whiskyID}`}
        style={styles.actionButton}
      >
        View whisky
      </Link>
      <DeleteWishListButton
        onPress={onDelete}
        style={[styles.actionButton, styles.lastActionButton]}
      />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyWishList = () => {
  const [myWishList, setMyWishList] = useState([]);
  const [visible, setVisible] = useState(false);

  console.log('myWishList: ', myWishList);

  useEffect(() => {

    const fetchData = async () => {

      const uWishList = await firebase.firestore()
      .collection('wishLists').doc(firebase.auth().currentUser.uid).collection('userWishList')
      .get()
      
      const posts = uWishList.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id
        return { id, ...data };
      })

      setMyWishList(posts)

    }

    firebase.auth().currentUser && fetchData()

  }, []);

  const onDelete = async (id) => {
    firebase.firestore().collection('wishLists').doc(firebase.auth().currentUser.uid).collection('userWishList')
      .doc(id)
      .delete()

    setVisible(true)
  };

  return (
    <>
      <View style={styles.container}>
        <Snackbar visible={visible}>
          Review deleted
        </Snackbar>
        <FlatList
          data={myWishList}
          renderItem={({ item }) => (
            <WishListItemWithActions
              whisky={item}
              onDelete={() => onDelete(item.id)}
            />
          )}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </>
  );
};

export default MyWishList;
