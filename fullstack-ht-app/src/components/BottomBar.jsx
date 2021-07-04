import React from 'react';

import {
  StyleSheet, View,
} from 'react-native';

import { useHistory } from 'react-router-native';
import { Appbar } from 'react-native-paper';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    zIndex: 6,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  appbar: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const BottomBar = () => {
  const history = useHistory();

  const route = (r) => {
    history.push(r);
  };

  return (

    <View style={styles.container}>
      <Appbar.Header color={theme.colors.primary} style={styles.appbar} statusBarHeight={0}>
        <Appbar.Action icon="home" onPress={() => route('/')} />
        <Appbar.Action icon="magnify" onPress={() => route('/')} />
        <Appbar.Action icon="camera" onPress={() => route('/scan-whisky')} />
        <Appbar.Action
          icon="email"
          onPress={() => route('/myMessages')}
        />
      </Appbar.Header>
    </View>

  );
};

export default BottomBar;
