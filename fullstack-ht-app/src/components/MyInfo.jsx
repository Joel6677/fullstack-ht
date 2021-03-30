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
  containerGaller: {

  }, 
  containerImage: {
    padding: 10

  },
  image: {
    width: 50,
    height: 50
  }
  

});



const MyInfo = () => {

  
  const [userinfo, setUserinfo] = useState([]);


  useEffect(() => {



    firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('userinfo')
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

  },[]);



  return (
    <View style={styles.container}>



      <View style={styles.containerGallery}>


        <FlatList
          numColumns={3}
          horizontal={false}
          data={userinfo}
          renderItem={({ item }) => (
            <View
              style={styles.containerImage}>
              <Text>{item.bio}</Text>
            </View>

          )}
          keyExtractor={({ id }) => id}
        />
      </View>

    </View>
  );
};

export default MyInfo;