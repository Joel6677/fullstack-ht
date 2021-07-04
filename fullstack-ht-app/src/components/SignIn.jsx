import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },

  heading: {
    paddingBottom: 17,
    alignSelf: 'center',
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} color={'primary'} fontSize={'heading'} fontWeight={'bold'}>
        Sign in
      </Text>
    </View>
  );
};

export default SignIn;
