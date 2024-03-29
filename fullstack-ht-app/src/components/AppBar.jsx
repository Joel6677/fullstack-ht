import React, { useContext } from 'react';

import { StyleSheet, View } from 'react-native';

import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';
import { StateContext } from '../state';
import { SignOut } from '../firebase/auth';

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    position: 'absolute',
    width: '100%',
  },
  appbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const AppBar = () => {
  const { state, dispatch } = useContext(StateContext);

  return (

    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} statusBarHeight={Constants.statusBarHeight}>
        <Appbar.Action
          icon="menu"
          onPress={() => dispatch({ type: 'SET_OPEN', payload: !state.open })}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => SignOut()}
        />
      </Appbar.Header>
    </View>

  );
};

export default AppBar;
