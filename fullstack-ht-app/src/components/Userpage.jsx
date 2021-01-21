import React, { useContext, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { StateContext } from '../state';
import Text from './Text';

const styles = StyleSheet.create({
  home: {
    backgroundColor: "white",
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: 49,
    top: 60
    
  }
});


const Userpage = () => {


  return (
    <>
       <View>
           <Text>User information</Text>
           <Text>Edit profile</Text>
           <Text>My programs</Text>
           <Text>Profile picture</Text>
       </View>
    </>

  );
};

export default Userpage;