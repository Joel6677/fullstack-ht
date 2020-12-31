import React, { useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { StateContext } from '../state';
import Button from './Button';
import Constants from 'expo-constants';


const styles = StyleSheet.create({ 
  sidebar: {
    width: 200,
    height: '100%', 
    backgroundColor: "blue",
    zIndex: 1,
    position: 'fixed',
    top: 72
  },
  button: {
    padding: 10,
  }
});


const SideMenu = () => {
  const toggleAnim = useRef(new Animated.Value(0)).current; 
  const { state } = useContext(StateContext);

  const moveMenu = () => {

    Animated.spring(
      toggleAnim,
      {
        toValue: state.open ? 0 : -200
      }
    ).start();
  
  };

  useEffect(() => {
    moveMenu();
  });



  return (
    <>
      <Animated.View style={[styles.sidebar, {
        transform: [{
          translateX: toggleAnim
        }]
      }]}>
        <View style={styles.button}>
          <Button color='error' onPress={() => moveMenu()} >Button1</Button>
        </View>
      </Animated.View>
    </>

  );
};

export default SideMenu;