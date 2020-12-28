import React, { useContext, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { StateContext } from '../state';

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    height: 400, 
    backgroundColor: "blue"
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
      <>
        <Animated.View style={[styles.sidebar, {
          transform: [{
            translateX: toggleAnim
          }]
        }]} />

      
      </>
 
    );
  }
}


const ImageList = () => {
  const { state } = useContext(StateContext);
  const toggleAnim = useRef(new Animated.Value(0)).current;


  return (


    <SlidingMenu
      state={state.open}
      toggleAnim={toggleAnim}
    />
  );
};

export default ImageList;