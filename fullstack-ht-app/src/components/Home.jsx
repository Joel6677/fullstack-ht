import React, { useContext, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import { useQuery } from '@apollo/client'; 

import { StateContext } from '../state';
import Text from './Text';
import { FILES } from '../queries';

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


const Home = () => {
  const homeAnim = useRef(new Animated.Value(0)).current; 
  const { state } = useContext(StateContext);
  const files = useQuery(FILES);

  const moveMenu = () => {

    Animated.spring(
      homeAnim,
      {
        toValue: state.open ? 600 : 0
      }
    ).start();
  
  };

  useEffect(() => {
    moveMenu();
  });



  return (
    <>
      <Animated.View style={[styles.home, {
        transform: [{
          translateX: homeAnim
        }]
      }]}>
        <View>
          <Image></Image>
          <Text>Homepage</Text>
        </View>
      </Animated.View>
    </>

  );
};

export default Home;