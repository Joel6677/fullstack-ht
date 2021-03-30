import React, { useContext } from 'react';

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
    backgroundColor: theme.colors.primary,
    zIndex: 2,
    position: 'absolute',
    width: '100%'
  },
  appbar: {
    alignItems: 'center',
    justifyContent: 'space-between', 
  }
});


const AppBar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);

  return (

    <View style={styles.container}>
      <Appbar.Header color={theme.colors.primary} style={styles.appbar} statusBarHeight={Constants.statusBarHeight}>
        <Appbar.Action
          icon="menu"
          onPress={() => dispatch({ type: "SET_OPEN", payload: !state.open })}
        />
        <Appbar.Action
          icon="settings"
          onPress={() => SignOut()}
        />
      </Appbar.Header>
    </View>

  ); 
};

export default AppBar;