import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, } from 'react-native';
import { Button, Avatar, Divider } from 'react-native-paper';
import { useHistory } from 'react-router-native';

import { StateContext } from '../state';
import Text from './Text';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import theme from '../theme';

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1
  },
  container: {
    // flexDirection: 'row',
    alignItems: 'center',
  }, 
  bottomContainer: {
    
  },
  avatar: {
    marginBottom: 50,
    width: 150, 
    height: 150,
    borderRadius: 100
  },
  loading: {
    position: 'absolute',
    top: 245,
    zIndex: 2
  },
  button: {
    marginHorizontal: 50
  },
  button2: {
    marginTop: 20
  },
});


const Userpage = () => {

  const history = useHistory();
  const [img, setImg] = useState();
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    firebase.firestore()
    .collection("images")
    .doc(firebase.auth().currentUser.uid)
    .collection("userImages")
    .doc("profilePicture")
    .get().then((snapshot) => {
      setImg(snapshot.data().downloadURL);
    });
  
  },[history]);

  const linkTo = (link) => {
    history.push(link);
  };

  return (

      <View style={styles.topContainer}>
      <View style={styles.loading}>
        <ActivityIndicator size='large' animating={!loaded} color={theme.colors.primary} />
      </View>
      <Image source={{ uri: img }} style={styles.avatar} onLoadEnd={() => setLoaded(true)} defaultSource={''}/>
      <View style={styles.container}>
        <Button icon="star" mode="outlined" compact="true" style={styles.button} onPress={() => linkTo('my-reviews')}>
         My reviews
          </Button>

        <Button icon="information" mode="outlined" compact="true" style={styles.button} onPress={() => linkTo('my-info')}>
          My info
          </Button>
        
          <Button icon="database" mode="outlined" compact="true" style={styles.button} onPress={() => linkTo('my-info')}>
          My collection
          </Button>

          <Button icon="glass-tulip" mode="outlined" compact="true" style={styles.button} onPress={() => linkTo('my-info')}>
          My wish List
          </Button>


          <Button icon="glass-tulip" mode="outlined" compact="true" style={styles.button} onPress={() => linkTo('my-media')}>
          My media
          </Button>

      </View>
      </View>

  );
};

export default Userpage;