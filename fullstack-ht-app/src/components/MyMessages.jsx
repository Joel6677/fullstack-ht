import React, { useState, useEffect } from 'react';
import {
  FlatList, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/app';
import MessageItem from './MessageItem';
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
  <View style={styles.separator} />
);

const getMessages = async () => {
  const { currentUser } = firebase.auth();

  const chatIDs = await firebase.firestore()
    .collection('users')
    .where('email', '!=', currentUser.email)
    .get()
  
  const ids = chatIDs.docs.map((doc) => {
    const { id } = doc;
    const chatIDpre = [];
    chatIDpre.push(currentUser.uid);
    chatIDpre.push(id);
    chatIDpre.sort();
    return chatIDpre.join('_');
  });

  const messages = await firebase.firestore()
    .collection('messages').where('chatID', 'in', ids)
    .get()


  const posts = messages.docs.map((doc) => {
    const data = doc.data();
    const userIDs = doc.id.split('_');
    console.log('userIDs: ', userIDs);
    const id = userIDs.find(userID => userID !== currentUser.uid)
    return { id, ...data };
  })

  return posts

};

const MyMessages = () => {
  const history = useHistory();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages().then((messages) => { setMessages(messages); });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item}
            onPress={() => history.push(`/messenger/${item.id}`)}
          >
            <MessageItem message={item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default MyMessages;
