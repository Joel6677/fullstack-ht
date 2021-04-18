import React, { useContext } from 'react';

import {
  StyleSheet, View
} from 'react-native';

import Constants from 'expo-constants';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import { StateContext } from '../state';
import { Appbar } from 'react-native-paper';

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

  const route = (route) => {
    history.push(route);
  };

  return (

    <View style={styles.container}>
      <Appbar.Header color={theme.colors.primary} style={styles.appbar} statusBarHeight={0}>
        <Appbar.Action icon="home" onPress={() => route("/")} />
        <Appbar.Action icon="magnify" onPress={() => route("/")} />
        <Appbar.Action icon="camera" onPress={() => route("/scan-whisky")} />
        <Appbar.Action
          icon="email"
          onPress={() => route('/myMessages')}
        />
      </Appbar.Header>
    </View>

  ); 
};

export default BottomBar;