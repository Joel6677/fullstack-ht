import React, { useContext, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { StateContext } from '../state';
import Button from './Button';

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    height: '100%', 
    backgroundColor: "blue",
  },
  button: {
    padding: 10
  }
});


export class SlidingMenu extends React.Component {

  render() {


    const { state, toggleAnim } = this.props;

    Animated.spring(
      toggleAnim,
      {
        toValue: state ? 0 : -200,
      }
    ).start();

    return (
      <Animated.View style={[styles.sidebar, {
        transform: [{
          translateX: toggleAnim
        }]
      }]}>
        <View style={styles.button}>
          <Button color='error' onPress={() => console.log('Button pressed')} >Button1</Button>
        </View>
        <View style={styles.button}>
          <Button color='error' onPress={() => console.log('Button pressed')} >Button2</Button>
        </View>
      </Animated.View>

    );
  }
}


const Home = () => {
  const { state } = useContext(StateContext);
  const toggleAnim = useRef(new Animated.Value(0)).current;


  return (
    <>
      {/* <SlidingMenu
        state={state.open}
        toggleAnim={toggleAnim}
      /> */}
    </>

  );
};

export default Home;