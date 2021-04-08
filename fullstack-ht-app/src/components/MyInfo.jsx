import React, { useState, useContext, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, ScrollView, Image, FlatList} from 'react-native';
import { Button, Avatar, Divider, IconButton  } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import * as firebase from 'firebase';
import Text from './Text';


const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: 100

  },
  normalText: {

  },
  bioText: {
    
  },
  containerGaller: {

  }, 
  containerImage: {
    padding: 10

  },
  image: {
    width: 50,
    height: 50
  },
  separator: {
    height: 5,
  },
  

});




const MyInfo = () => {

  
  const [userinfo, setUserinfo] = useState([]);
  const [img, setImg] = useState('');
  const history = useHistory();

  useEffect(() => {
    firebase.firestore()
      .collection('userinfo')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let posts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUserinfo(posts);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    firebase.firestore()
    .collection("images")
    .doc(firebase.auth().currentUser.uid)
    .collection("userImages")
    .doc("profilePicture")
    .get().then((snapshot) => {
      setImg(snapshot.data().downloadURL);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

  },[]);

  console.log('userinfo: ', userinfo);

  return (
    <View style={styles.container}>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: img }} style={styles.avatar} />
      </View>
      <View>
        <Text
          style={styles.normalText}
          fontSize="subheading"
        >
          Name: {userinfo.name}
        </Text>

        <Text
          style={styles.normalText}
          fontSize="subheading"
        >
          Birthdate: {userinfo.birhdate}
        </Text>


        <Text
          style={styles.bioText}
          fontSize="subheading"
        >
          Bio: {userinfo.bio}
        </Text>
      </View>
      
    </View>
  );
};

export default MyInfo;