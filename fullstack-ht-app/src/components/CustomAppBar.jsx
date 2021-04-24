import React, { useContext, useEffect } from 'react';

import {
  StyleSheet, View
} from 'react-native';

import Constants from 'expo-constants';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import { StateContext } from '../state';
import { Appbar } from 'react-native-paper';
import {SignOut} from '../firebase/auth';

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    position: 'absolute',
    width: '100%'
  },
  appbar: {
    alignItems: 'center',
    justifyContent: 'space-between', 
  }
});


const CustomAppBar = ({...props}) => {
  const history = useHistory();

  return (

    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} statusBarHeight={Constants.statusBarHeight}>
        <Appbar.Action
          icon="logout"
          onPress={() => SignOut()}
        />
      </Appbar.Header>
    </View>

  ); 
};

export default CustomAppBar;