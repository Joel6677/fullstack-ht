import React, { useContext } from 'react';

import {
  StyleSheet, View
} from 'react-native';

import Constants from 'expo-constants';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import { StateContext } from '../state';
import { Appbar } from 'react-native-paper';
import {SignOut} from '../firebase/firebaseFunctions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  appbar: {
    alignItems: 'center',
    justifyContent: 'space-around', 
  }
});


const BottomBar = () => {
  const history = useHistory();


  return (

    <View style={styles.container}>
      <Appbar.Header color={theme.colors.primary} style={styles.appbar} statusBarHeight={0}>
        <Appbar.Action icon="home" onPress={() => history.push("/")} />
        <Appbar.Action icon="magnify" onPress={() => history.push("/")} />
        <Appbar.Action icon="camera" onPress={() => history.push("/")} />
        <Appbar.Action
          icon="email"
          onPress={() => history.push('/choose-pic')}
        />
      </Appbar.Header>
    </View>

  ); 
};

export default BottomBar;