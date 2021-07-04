import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Moment from 'moment';
import firebase from 'firebase/app';
import Text from './Text';
import 'firebase/auth';
import 'firebase/firestore';

const styles = StyleSheet.create({
  backgroundCountainer: {
    backgroundColor: 'orange',
  },
  container: {
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFD700',
  },
  contentContainer: {
    width: '82%',
    paddingHorizontal: 5,
    flexDirection: 'column',
    backgroundColor: '#f2eecb',
    borderRadius: 2,
  },
  topContainer: {
    width: '100%',
    // backgroundColor: 'green',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    width: '100%',
    // backgroundColor: 'orange'
  },

  avatarContainer: {
    marginRight: 5,
  },
  nameText: {
    marginBottom: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

const MessageItem = ({ message }) => {
  const [userinfo, setUserinfo] = useState('');
  const [img, setImg] = useState();

  useEffect(() => {
  
    const fetchData = async () => {
      
      const mes = await firebase.firestore().collection('userinfo').doc(message.id).get()
      setUserinfo(mes.data())

      const dURL = await firebase.firestore()
      .collection('images')
      .doc(message.id)
      .collection('userImages')
      .doc('profilePicture')
      .get()
      setImg(dURL.data().downloadURL)
    }

    fetchData()

  }, []);

  return (
    <View style={styles.backgroundCountainer}>

      <View style={styles.container}>

        <View style={styles.avatarContainer}>
          <Image source={{ uri: img }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <Text
              style={styles.nameText}
              fontSize="subheading"
            >
              {userinfo.name}
            </Text>
            <Text
              style={styles.nameText}
              fontSize="subheading"
            >
              {Moment(message.createdAt).format('DD-MM-YYYYT-HH-mm')}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text
              style={styles.nameText}
              fontSize="subheading"
              numberOfLines={1}
            >
              {message.text}
            </Text>
          </View>
        </View>

      </View>
    </View>
  );
};

export default MessageItem;
