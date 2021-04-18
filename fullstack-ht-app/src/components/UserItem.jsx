import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import Text from './Text';
// import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const styles = StyleSheet.create({
  backgroundCountainer: {
    backgroundColor: 'orange'
  },
  container: {
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFD700'
  },
  contentContainer: {
    width: '60%',
    flexGrow: 1,

    backgroundColor: '#f2eecb'
  },

  avatarContainer: {
    marginRight: 5,
    justifyContent: 'center'
  },
  nameText: {
    marginBottom: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80
  },
});



const UserItem = ({ user }) => {

  const [userinfo, setUserinfo] = useState('');
  const [img, setImg] = useState();
  const history = useHistory();

  useEffect(() => {

    firebase.firestore().collection('userinfo').doc(user.id)
        .get().then((doc) => {setUserinfo(doc.data());});
    
        firebase.firestore()
        .collection("images")
        .doc(user.id)
        .collection("userImages")
        .doc("profilePicture")
        .get().then((snapshot) => {
          setImg(snapshot.data().downloadURL);
        });
  });

 

  return (
    <View style={styles.backgroundCountainer}>


    <View style={styles.container}>
      
        <View style={styles.avatarContainer}>
          <Image source={{ uri: img}} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontSize='subheading'
            fontWeight='bold'
          >
              Email: {user.email}
          </Text>
          <Text
            style={styles.nameText}
            fontSize='subheading'
            fontWeight='bold'
          >
              Id: {user.id}
          </Text>
          <Text
            style={styles.nameText}
            fontSize='subheading'
            fontWeight='bold'
          >
              Name: {userinfo.name}
          </Text>
         
          <View>
              <Button mode="outlined" icon="message" onPress={()=> history.push(`/messenger/${user.id}`)}>Send message</Button>
          </View>
       
      </View>

    </View>
    </View>
  );
};

export default UserItem;
