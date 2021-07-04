import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Animated, StyleSheet, View, Dimensions, Image,
} from 'react-native';
import {
  Button, Divider, Drawer, useTheme,
} from 'react-native-paper';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/app';
import Text from './Text';

import { StateContext } from '../state';
import CustomButton from './CustomButton';
// import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const styles = StyleSheet.create({
  sidebar: {
    width: Dimensions.get('window').width * 0.85,
    height: '100%',
    // backgroundColor: theme.colors.primary,
    zIndex: 4,
    position: 'absolute',
  },
  topContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    marginRight: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  closeMenu: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
  },
  drawerSection: {
    padding: 5,
  },
  sidemenuButtons: {
    top: 50,
    zIndex: 5,
    alignItems: 'flex-start',
  },
  button: {
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  divider: {
    zIndex: 5,
    marginTop: 10,
    width: '100%',
  },
});

const SideMenu = () => {
  const toggleAnim = useRef(new Animated.Value(Dimensions.get('window').width * -0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { state, dispatch } = useContext(StateContext);
  const history = useHistory();
  const [img, setImg] = useState('');
  const [username, setUsername] = useState('');
  const { colors } = useTheme();

  const route = (route, number) => {
    setActive(number);
    history.push(route);
    dispatch({ type: 'SET_OPEN', payload: !state.open });
  };

  const moveMenu = () => {
    Animated.timing(
      toggleAnim,
      {
        toValue: state.open ? 0 : Dimensions.get('window').width * -0.85,
        useNativeDriver: true,
        duration: 300,
      },
    ).start();
  };

  const fade = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: state.open ? 0.5 : 0,
        duration: 300,
        useNativeDriver: true,
      },
    ).start();
  };

  useEffect(() => {
    moveMenu();
    fade();

    const fetchData = async () => {
      
      const profpic = await firebase.firestore()
      .collection('images')
      .doc(firebase.auth().currentUser.uid)
      .collection('userImages')
      .doc('profilePicture')
      .get()

      setImg(profpic.data().downloadURL)

      const uinfo = await firebase.firestore()
      .collection('userinfo')
      .doc(firebase.auth().currentUser.uid)
      .get()

      setUsername(uinfo.data().name)
    
    }

    firebase.auth().currentUser && fetchData()
  }, [state.open]);

  const [active, setActive] = useState('');

  console.log('currentUser: ', firebase.auth().currentUser);

  return (
    <>
      <Animated.View style={[styles.sidebar, { backgroundColor: colors.primary }, {
        transform: [{
          translateX: toggleAnim,
        }],
      }]}
      >
        <View style={styles.sidemenuButtons}>

          {firebase.auth().currentUser && (
          <View style={styles.topContainer}>
            <Image source={{ uri: img }} style={styles.avatar} />
            <Text style={styles.nameText} fontSize={'subheading'} color={'textSecondary'}>
              {username}
              {' '}
              logged in
            </Text>
          </View>
          )}

          <View style={styles.buttonContainer}>
            {!firebase.auth().currentUser && <Button style={styles.button} raised theme={{ colors: { primary: '#FFFFFF' } }} mode="outlined" onPress={() => route('sign-up')}>Sign up</Button>}
            {!firebase.auth().currentUser && <Button style={styles.button} raised theme={{ colors: { primary: '#FFFFFF' } }} mode="outlined" onPress={() => route('/sign-in-email')}>Sign in</Button>}
          </View>

          <Divider style={styles.divider} />
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon="upload"
              label="Upload new whisky"
              active={active === 'first'}
              onPress={() => route('/upload-whisky', 'first')}
              raised
              theme={{ colors: { text: '#FFFFFF', primary: '#FFFFFF' } }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection, {}}>
            <Drawer.Item
              icon="glass-tulip"
              label="Collections"
              active={active === 'second'}
              onPress={() => route('/collections', 'second')}
              raised
              theme={{ colors: { text: '#FFFFFF', primary: '#FFFFFF' } }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon="account"
              label="Profile"
              active={active === 'third'}
              onPress={() => route('/userpage', 'third')}
              raised
              theme={{ colors: { text: '#FFFFFF', primary: '#FFFFFF' } }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon="account-multiple"
              label="Users"
              active={active === 'fourth'}
              onPress={() => route('/userlist', 'fourth')}
              raised
              theme={{ colors: { text: '#FFFFFF', primary: '#FFFFFF' } }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon="forum"
              label="Posts"
              active={active === 'fifth'}
              onPress={() => route('/posts', 'fifth')}
              raised
              theme={{ colors: { text: '#FFFFFF', primary: '#FFFFFF' } }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon="upload"
              label="Upload post"
              active={active === 'sixdth'}
              onPress={() => route('/upload-post', 'sixdth')}
              raised
              theme={{ colors: { text: '#FFFFFF', primary: '#FFFFFF' } }}
            />
          </Drawer.Section>

        </View>
      </Animated.View>
      <Animated.View
        style={[styles.closeMenu, { opacity: fadeAnim, zIndex: state.open ? 3 : 0 }]}
      >
        {state.open
          && <CustomButton style={{ height: '100%', borderRadius: 0 }} color="" onPress={() => dispatch({ type: 'SET_OPEN', payload: !state.open })} /> }

      </Animated.View>
    </>
  );
};

export default SideMenu;
