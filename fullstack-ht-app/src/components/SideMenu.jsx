import React, { useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';

import { StateContext } from '../state';
import Button from './Button';
import theme from '../theme';

const styles = StyleSheet.create({ 
  sidebar: {
    width: 600,
    height: '100%', 
    backgroundColor: theme.colors.primary,
    position: 'fixed',
    zIndex: 101
  },
  button: {
    padding: 10,
  },
  closeMenu: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: 2
  }
});




const SideMenu = () => {
  const toggleAnim = useRef(new Animated.Value(-600)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current ;
  const { state, dispatch } = useContext(StateContext);

  const moveMenu = () => {

    Animated.timing(
      toggleAnim,
      {
        toValue: state.open ? 0 : -600,
        duration: 300
      }
    ).start();
  
  };
  
  const fade = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: state.open ? 0.25 : 0,
        duration: 300,
      }
    ).start();
  };

  useEffect(() => {
    moveMenu();
    fade();
  },[state.open]);

  return (
    <>
      <Animated.View style={[styles.sidebar, {
        transform: [{
          translateX: toggleAnim
        }]
      }]}>
        <View style={styles.button}>
          <Text>User name</Text>
          <Text> Create new program </Text>
          <Text> Search for programs </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.closeMenu, {opacity: fadeAnim, zIndex: state.open ? 100 : 0} ]}
      >
          {state.open &&
          <Button style={{height: "100%"}} onPress={() => dispatch({type: "SET_OPEN", payload: !state.open})} ></Button> }
     
      </Animated.View>
    </>
  );
};

export default SideMenu;