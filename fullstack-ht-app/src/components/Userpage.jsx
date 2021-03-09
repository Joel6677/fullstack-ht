import React, { useContext, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { StateContext } from '../state';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    flex: 1,
    zIndex: 1
  },
});


const Userpage = () => {


  return (
    <>
       <View style={styles.container}>
           <Text>Profile picture</Text>
           <Text>Bio</Text>
           <Text>Pictures & videos</Text>
           <Text>Interests</Text>
       </View>
    </>

  );
};

export default Userpage;