import React, {
  useState, useEffect,
} from 'react';
import {
  StyleSheet, View, Image, ActivityIndicator,
} from 'react-native';
import {
  Button,
} from 'react-native-paper';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',

  },
  topContainer: {

  },
  bottomContainer: {

  },
  normalText: {
    margin: 5,
  },
  bioText: {
    margin: 5,
  },
  separator: {
    height: 5,
  },
  avatarContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  loading: {
    backgroundColor: 'green',
    top: 90,
  },
  button: {
    margin: 5,
  },

});

const MyInfo = () => {
  const [img, setImg] = useState();
  const [loaded, setLoaded] = useState(false);
  const [userinfo, setUserinfo] = useState([]);
  const history = useHistory();

  useEffect(() => {


    const fetchData = async () => {
      const uinfo =  await firebase.firestore().collection('userinfo')
      .doc(firebase.auth().currentUser.uid)
      .get()

      setUserinfo(uinfo.data())

      const profpic = await firebase.firestore()
      .collection('images')
      .doc(firebase.auth().currentUser.uid)
      .collection('userImages')
      .doc('profilePicture')
      .get()

      setImg(profpic.data().downloadURL)
    }
      fetchData()
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.loading}>
        <ActivityIndicator size="large" animating={!loaded} color={theme.colors.primary} />
      </View>
      <Image source={{ uri: img }} style={styles.avatar} onLoadEnd={() => setLoaded(true)} defaultSource={''} />

      <Text
        style={styles.normalText}
        fontSize="subheading"
      >
        Name:
        {' '}
        {userinfo.name}
      </Text>

      <Text
        style={styles.normalText}
        fontSize="subheading"
      >
        Birthdate:
        {' '}
        {userinfo.birthdate}
      </Text>

      <Text
        style={styles.bioText}
        fontSize="subheading"
      >
        Bio:
        {' '}
        {userinfo.bio}
      </Text>

      <Button mode="outlined" style={styles.button} onPress={() => history.push('/upload-userinfo')}>Edit info</Button>
      <Button mode="outlined" style={styles.button} onPress={() => history.push('/upload-media')}>Change profile picture</Button>
    </View>
  );
};

export default MyInfo;
