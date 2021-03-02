import React, { useContext } from 'react';

import {
  StyleSheet,
} from 'react-native';

import Constants from 'expo-constants';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import { StateContext } from '../state';
import { Appbar } from 'react-native-paper';
import {SignOut} from '../firebase/firebaseFunctions';

const styles = StyleSheet.create({
  appbar: {
    alignItems: 'flex-end',
    justifyContent: 'space-between', 
    paddingTop: Constants.statusBarHeight+50,
    backgroundColor: theme.colors.primary,
    zIndex: 2,
    position: 'absolute',
    width: '100%'
    
  }
});


const AppBar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);


  return (

      <Appbar style={styles.appbar}>
      <Appbar.Action
        icon="menu"
        onPress={() => dispatch({type: "SET_OPEN", payload: !state.open})}
      />
      <Appbar.Action icon="mail" onPress={() => history.push("/sign-up")} />
      <Appbar.Action icon="home" onPress={() => history.push("/")} />
      <Appbar.Action
        icon="magnify"
        onPress={() => history.push('/choose-pic')}
      />
        <Appbar.Action
        icon="account"
        onPress={() => SignOut()}
      />
    </Appbar>

  ); 
};

export default AppBar;